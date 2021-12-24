import React, {useEffect, useState} from 'react';
import db from "../../firebase.config";
import Loader from "../Loader/Loader";
import {useNavigate} from "react-router-dom";

const Pageshop = () => {
    const navigate = useNavigate();
  /*  const [nameValue, setNameValue] = useState('');
    const [countValue, setCountValue] = useState(''); */
    const [productJewerly, setProductJewerly] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
   /* const [nameProduct, setNameProduct] = useState('');
    const [priceProduct, setPriceProduct] = useState('');
    const [countProduct, setCountProduct] = useState('');
    const [descriptionProduct, setDescriptionProduct] = useState(''); */
    const [productItems, setProductItems] = useState([]);
    const [limit, setLimit] = useState(5);
    const [pagesCount, setPagesCount] = useState(1);
    const [page, setPage] = useState(1);
    const [visibleItems, setVisibleItems] = useState([]);
    const indexOfLastItem = page * limit;
    const indexOfFirstItem = indexOfLastItem - limit;
    const pageItems = visibleItems.slice(indexOfFirstItem, indexOfLastItem);
    const [searchProducts, setSearchProducts] = useState('');


   /* function addProducts() {
        if (nameValue.length===0|| countValue.length===0) {
            alert("Заполните поля")
        } else {
            db.collection("products").add(
                {
                    name: nameValue,
                    count: countValue,
                }, setProductJewerly([...productJewerly, {name:nameValue, count: countValue}])
            )
                .then((docRef) => {
                    console.log("Document written with ID: ", docRef.id);
                })
                .catch((error) => {
                    console.error("Error adding document: ", error);
                });
        }
        setNameValue('');
        setCountValue('');
    }

    function addProductItem () {
        if (nameProduct.length===0|| descriptionProduct.length===0 || priceProduct.length===0) {
            alert("Заполните поля")
        } else {
            db.collection("productItems").add({
                    name: nameProduct,
                    uniqid: uniqIndex,
                    description: descriptionProduct,
                    price: priceProduct,
                    count: countProduct,
                },
            )
                .then((docRef) => {
                    console.log("Document written with ID: ", docRef.id);
                })
                .catch((error) => {
                    console.error("Error adding document: ", error);
                });
        }
        setNameProduct('');
        setDescriptionProduct('');
        setPriceProduct('');
        setCountProduct('');
    } */



    async function fetchProducts() {
        setIsLoading(true);
        const response=db.collection('products');
        const data=await response.get();
        data.docs.forEach(item=>{
            setProductJewerly.toString(productJewerly.push({
                id: item.id,
                name: item.data().name,
                count: item.data().count,
            }))

        })
        const responsive=db.collection('productItems');
        const productData = await responsive.get();
        productData.docs.forEach(prodItems=>{
            setProductItems.toString(productItems.push({
                id: prodItems.id,
                uniqid: prodItems.data().uniqid,
                name: prodItems.data().name,
                count: prodItems.data().count,
                price: prodItems.data().price,
                description: prodItems.data().description,
            }))
        })
        const productDataVisible = await responsive.get();
        productDataVisible.docs.forEach(prodItems=>{
            setVisibleItems.toString(visibleItems.push({
                id: prodItems.data(),
                uniqid: prodItems.data().uniqid,
                name: prodItems.data().name,
                count: prodItems.data().count,
                price: prodItems.data().price,
                description: prodItems.data().description,
            }))
        })
        console.log(visibleItems[7]);
        console.log(visibleItems);
        console.log(productJewerly);
        setIsLoading(false);

    }

     async function getsortedItems (id) {
        const product = db.collection('productItems');
        const snapshot = await product.where('uniqid', '==', id).get();
        if (snapshot.empty) {
            console.log('No matching documents.');
        }
        snapshot.forEach(finditems => {
            console.log(finditems.data())
        });
    }


    const changePage = (page) => {
        setPage(page);
    }




    useEffect(() => {
        fetchProducts();
        setPagesCount(Math.ceil(visibleItems.length / limit))
    },[visibleItems])


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
                <div className="jewerlypanel">
                {isLoading
                    ?
                    <div><Loader/></div>
                    :
                    productJewerly.map(items =>
                        <div key={items.id} className="jewerlyproductpanel">
                            <div className="jewerlyproductitems"> <span className="jewerlyproductpanelname" onClick={() => getsortedItems(items.id)}> {items.name}
                                <div className="arrow-2">
    <div className="arrow-2-top"></div>
    <div className="arrow-2-bottom"></div>
</div> {items.count}    </span> </div></div>)
                    }</div>
<br/>
                <div className="sectionproducts">
                {pageItems.map(productItem =>
                        <div key={productItem.id} className="jewerlyproductname">
                            <span className="productitemname"   onClick={() => navigate(`/Shop/${productItem.id}`)}> {productItem.name} </span> <br/> <span className="productitemprice"> Цена: {productItem.price} </span> <br/>
                            <span className="productitemprice"> {productItem.description}  </span> </div>)}
            </div></div>
            <div className={"pagination"}>
                {[...Array(pagesCount).keys()].map(i => i+1).map(p =>
                    <button key={p} className={p === page ? "pageBtn pageBtn_active" : "pageBtn"}
                            onClick={() => changePage(p)}
                    >{p}</button>
                )}</div>
        </div>
    );
}

export default Pageshop;