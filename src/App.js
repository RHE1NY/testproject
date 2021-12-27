import './main.css'
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter/AppRouter";
import Navbar from "./components/navbar/Navbar";
import React, {useContext, useState} from "react";
import {ContextGlobal} from "./firebase.config";
import {useAuthState} from "react-firebase-hooks/auth";
import Loader from "./components/Loader/Loader";

function App() {
    const  {aunty} = useContext(ContextGlobal)
    const {user, load, err} = useAuthState(aunty)

    if(load) {
        return <Loader/>
    }

    return (
        <BrowserRouter>
                <Navbar/>
                <AppRouter/>
        </BrowserRouter>
        );
};

export default App;
