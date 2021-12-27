import React, {useContext, useState} from 'react';
import {Routes, Route, Navigate, Router, Switch} from 'react-router-dom';
import About from "../pageshop/About";
import Pageshop from "../pageshop/Pageshop";
import ProductItem from "../ProductItem";
import {privateRoutes, publicRoutes} from "./routes";
import Login from "./Login";
import {ContextGlobal} from "../../firebase.config";
import {useAuthState} from "react-firebase-hooks/auth";
import Loader from "../Loader/Loader";
import UserPage from "./UserPage";

const AppRouter = () => {
   const  {aunty} = useContext(ContextGlobal)
    const {user} = useAuthState(aunty)


    /*    <Route exact path="/Shop" element={<Pageshop/>}/>
            <Route exact path="/Shop/:id" element={<ProductItem/>} />
            <Route path="*" element={<Navigate to ="/Login"/>}/>


            <Route exact path="/login" element={<Login/>} />
            <Route path="*" element={<Navigate to ="/Login"/>}/>

            */

    return user ?
        (
        <Routes>
                <Route exact path="/shop" element={<Pageshop/>}/>
            <Route exact path="/about" element={<About/>}/>
                <Route exact path="/shop/:id" element={<ProductItem/>} />
            <Route exact path="/user/:l" element={<UserPage/>} />
            <Route path="*" element={<Navigate to="/shop" />} />
                 </Routes>
        )
        :
        (
                <Routes>
                <Route exact path="/shop" element={<Pageshop/>}/>
                <Route exact path="/shop/:id" element={<ProductItem/>} />
                    <Route exact path="/login" element={<Login/>} />
                    <Route path="*" element={<Navigate to="/login" />} />

            </Routes>
        );
};

export default AppRouter;