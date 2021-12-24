import React from 'react';
import { Routes ,Route, Navigate } from 'react-router-dom';
import About from "../pageshop/About";
import PageShop from "../pageshop/PageShop";
import ProductItem from "../ProductItem";



const AppRouter = () => {
    return (
        <Routes>
            <Route path="/About" element={<About/>} />
            <Route exact path="/Shop" element={<PageShop/>}/>
            <Route exact path="/Shop/:id" element={<ProductItem/>} />
            <Route path="*" element={<Navigate to ="/Shop" />}/>
        </Routes>
    );
};

export default AppRouter;
