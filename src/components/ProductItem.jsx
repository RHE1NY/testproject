import React, {useEffect, useState} from 'react';
import {useLocation} from "react-router-dom";
import db from "../firebase.config";

const ProductItem = () => {
    const location = useLocation();
    const [productItemPage, setProductItemPage] = useState({});

    async function getItem(id) {
        const prodItem = db.collection('productItems').doc(id);
        const doc = await prodItem.get();
        console.log(id);
        if (!doc.exists) {
            console.log('No such document!');
            } else {
                console.log("No such document!123");
            }
    }


    useEffect(() => {
        getItem(location.id);
    }, [])
    return (

        <div className={"shop-Item-Page"}>
            <img src={productItemPage.image} alt={'shop'}/>
            <label  className={"shop-Item-Title"}>{productItemPage.name}</label> <br/><label className={"shop-Item-Description"}>{productItemPage.description}</label>
            <br/>  <label  className={"shop-Item-Price"}>Цена {productItemPage.price}</label>
        </div>
    );
};

export default ProductItem;
