import React, {useEffect, useState} from 'react';
import {useLocation, useParams} from "react-router-dom";
import db from "../firebase.config";

const ProductItem = () => {
    const params = useParams();
    const [productItemPage, setProductItemPage] = useState({});
    async function getItem(id) {
        const prodItem = db.collection('productItems').doc(id);
        const doc = await prodItem.get();
        setProductItemPage(doc.data())
        console.log(doc.data());
        console.log(productItemPage);
    }


    useEffect(() => {
        getItem(params.id);
    }, [])
    return (

        <div className={"shop-Item-Page"}>
            <label  className={"shop-Item-Title"}>{productItemPage.name}</label> <br/><label className={"shop-Item-Description"}>{productItemPage.description}</label>
            <br/>  <label  className={"shop-Item-Price"}>Цена {productItemPage.price}</label>
        </div>
    );
};

export default ProductItem;