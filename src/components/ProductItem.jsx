import React, {useEffect, useState} from 'react';
import {useLocation, useParams} from "react-router-dom";
import db from "../firebase.config";
import Loader from "./Loader/Loader";

const ProductItem = () => {
    const params = useParams();
    const [productItemPage, setProductItemPage] = useState({});
    const [loading, setLoading] = useState(false);
    async function getItem(id) {
        setLoading(true);
        const prodItem = db.collection('productItems').doc(id);
        const doc = await prodItem.get();
        setProductItemPage(doc.data())
        console.log(doc.data());
        setLoading(false);
    }

    useEffect(() => {
        getItem(params.id);
    }, [])
    return (
        <div>
            {loading
            ?
                <Loader/>
                :
        <div className={"shop-Item-Page"}>
            <label  className={"shop-Item-Title"}>{productItemPage.name}</label> <br/><label className={"shop-Item-Description"}>{productItemPage.description}</label>
            <br/>  <label  className={"shop-Item-Price"}>Цена {productItemPage.price}</label>
        </div>}</div>

    );
};

export default ProductItem;