import React, {useEffect, useMemo, useState} from 'react';
import axios from "axios";
import getShop from "../API/getShop";
import '../../main.css';
import Loader from "../Loader/Loader";
import Select from "./Select";
import Basket from "./Basket";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from 'react-router-dom'

const Shop = () => {

    const router = useHistory();
    const [allItems, setAllItems] = useState([]);
    const [limit, setLimit] = useState(5);
    const [pagesCount, setPagesCount] = useState(1);
    const [page, setPage] = useState(1);
    const [loader, setLoader] = useState(false)
    const [searchTerm, setSearchTerm] = useState('');
    const [visibleItems, setVisibleItems] = useState([]);
    const basketItems = useSelector(state => state.basket.basket);
    const [sortedItems, setSortedItems] = useState('');
    const [sortedItemsPrice, setSortedItemsPrice] = useState('');
    const dispatch = useDispatch();
    const indexOfLastItem = page * limit;
    const indexOfFirstItem = indexOfLastItem - limit;
    const pageItems = visibleItems.slice(indexOfFirstItem, indexOfLastItem);

    useEffect(() => {
        setPagesCount(Math.ceil(visibleItems.length / limit))
    }, [visibleItems])


    async function getItems() {
        setLoader(true);
        const response = await getShop.getItems();
        setAllItems(response.data)
        setVisibleItems(response.data)
        setLoader(false);
    }

    const changePage = (page) => {
        setPage(page);
    }

    function addBasket(id) {
        dispatch({type: "ADD_BASKET", payload: id})
    }

    const sortItems = (sort) => {
        setSortedItems(sort)
        setVisibleItems(visibleItems.sort((a, b) => a[sort].localeCompare(b[sort])));
    }


    const sortItemsPrice = (sort) => {
        setSortedItemsPrice(sort)
        setVisibleItems(visibleItems.sort((a, b) => a[sort] < b[sort] ? 1 : -1));
    }

    useEffect(() => {
        setVisibleItems(allItems.filter(shop => shop.title.toLowerCase().includes(searchTerm)))
    }, [searchTerm])


    useEffect(() => {
        getItems()
    }, [page])

    return (
        <div>
            <div className={"basket"}>
                <Basket />
            </div>
            <Select
                value={sortedItems}
                onChange={sortItems}
                defaultValue={"Сортировка"}
                options={[
                    {value: 'title', name: 'По названию'},
                ]}
            />
            <Select
                value={sortedItemsPrice}
                defaultValue={"Сортировка"}
                onChange={sortItemsPrice}
                options={[
                    {value: 'price', name: 'По цене'},
                ]}
            />
            <span>Поиск товаров</span>
            <input type="text"
                   value={searchTerm}
                   onChange={e => setSearchTerm(e.target.value)}
                   placeholder={"Введите значение"}
            />
            <div>{loader
                ? <div><Loader/></div>
                :
                pageItems.map((item) => {
                    return <div className={"product-section"} key={item.title}>
                        <div className={"products"}>
                            <div className={"product-image"}>
                                <img src={item.image}></img>
                            </div>
                            <div className={"products-title"}>
                                <label>{item.id} <span
                                    onClick={() => router.push(`/Shop/${item.id}`)}>{item.title}</span>
                                </label>
                            </div>
                            <div className={"product-description"}>
                                <label> {item.description} </label>
                                <div className={"product-count"}>
                                    <label className={"product-price"}>Цена: {item.price}$</label>
                                    <label> В наличии {item.rating.count} шт</label>
                                </div>
                                <span onClick={() => addBasket(item.id)} className={"addBasket"}>Добавить в корзину</span>
                            </div>
                        </div>
                    </div>;
                })}</div>
            <div className={"pagination"}>
                {[...Array(pagesCount).keys()].map(i => i+1).map(p =>
                    <button key={p} className={p === page ? "pageBtn pageBtn_active" : "pageBtn"}
                            onClick={() => changePage(p)}
                    >{p}</button>
                )}</div>
        </div>

    );
};

export default Shop;
