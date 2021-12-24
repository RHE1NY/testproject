import React, {useEffect, useState} from 'react';
import db from "../../firebase.config";
import Loader from "../Loader/Loader";
import {Link, useNavigate} from "react-router-dom";

const Pageshop = () => {
        const [jewelryList, setJewelryList] = useState([]);
        const [isLoading, setIsLoading] = useState(false);
        const [productItems, setProductItems] = useState([]);
        const [limit, setLimit] = useState(5);
        const [pagesCount, setPagesCount] = useState(1);
        const [page, setPage] = useState(1);
        const [visibleItems, setVisibleItems] = useState([]);
        const indexOfLastItem = page * limit;
        const indexOfFirstItem = indexOfLastItem - limit;
        const pageItems = visibleItems.slice(indexOfFirstItem, indexOfLastItem);
        const [searchProducts, setSearchProducts] = useState('');


        async function fetchProducts() {
            setIsLoading(true);
            const jewelryCollection = db.collection('products');
            const jewelryResponse = await jewelryCollection.get();
            let jewelryList = [];
            jewelryResponse.docs.forEach(item => {
                jewelryList.push({
                    id: item.id,
                    name: item.data().name,
                    count: item.data().count,
                })
            })
            setJewelryList(jewelryList)
            const productsCollection = db.collection('productItems');
            const productsResponse = await productsCollection.get();
            let productsList = [];
            productsResponse.docs.forEach(prodItems => {
                productsList.push({
                    id: prodItems.id,
                    uniqid: prodItems.data().uniqid,
                    name: prodItems.data().name,
                    count: prodItems.data().count,
                    price: prodItems.data().price,
                    description: prodItems.data().description,
                })
            })
            setProductItems(productsList)
            setVisibleItems(productsList);
            setIsLoading(false);
        }

        async function getSortedItems(id) {
            const productsCollection = db.collection('productItems');
            const productsResponse = await productsCollection.where('uniqid', '==', id).get();
            if (productsResponse.empty) {
                console.log('No matching documents.');
                setVisibleItems([]);
            } else {
                let productsList = [];
                productsResponse.docs.forEach(prodItems => {
                    productsList.push({
                        id: prodItems.id,
                        uniqid: prodItems.data().uniqid,
                        name: prodItems.data().name,
                        count: prodItems.data().count,
                        price: prodItems.data().price,
                        description: prodItems.data().description,
                    })
                })
                setVisibleItems(productsList);
            }
        }



    useEffect(() => {
        setVisibleItems(productItems.filter(shop => (shop.name && shop.description.toLowerCase().includes(searchProducts))))
    }, [searchProducts])

        const changePage = (page) => {
            setPage(page);
        }

        useEffect(async () => {
            await fetchProducts();
        }, [])

        useEffect(() => {
            setPagesCount(Math.ceil(visibleItems.length / limit))
        }, [visibleItems])


        return (
            <div>
                <div>
                    <br/>
                    <span>Поиск товаров</span>
                    <input type="text"
                           value={searchProducts}
                           onChange={e => setSearchProducts(e.target.value)}
                           placeholder={"Введите значение"}
                    />
                    <div className="jewelry-panel">
                        {isLoading ? <Loader/> :
                            jewelryList.map(item =>
                                <div key={item.id} className="jewelry-product-panel">
                                    <div className="jewelry-product-item">
                                    <span className="jewelry-product-panel-name"
                                          onClick={() => getSortedItems(item.id)}>
                                        {item.name}
                                        <div className="arrow-2">
                                            <div className="arrow-2-top"/>
                                            <div className="arrow-2-bottom"/>
                                                </div>
                                    </span>
                                    </div>
                                </div>)
                        }
                    </div>
                    <br/>
                    <div className="products-section">
                        {pageItems.length===0
                            ? <h1>Товаров нет</h1>
                            : pageItems.map(productItem =>
                            <div key={productItem.id} className="product-item">
                                <Link className="product-name" to={`/Shop/${productItem.id}`}>
                                <span >
                                    {productItem.name}
                                </span>
                                </Link>
                                    <br/>
                                    <span className="product-price"> Цена: {productItem.price}</span>
                                <br/>
                                <span className="product-description"> {productItem.description}</span>
                            </div>)}
                    </div>
                </div>
                <div className={"pagination"}>
                    {[...Array(pagesCount).keys()].map(i => i + 1).map(p =>
                        <button key={p} className={`pageBtn ${p === page ? 'pageBtn_active' : ''}`}
                                onClick={() => changePage(p)}
                        >{p}</button>
                    )}</div>
            </div>
        );
    }

export default Pageshop;