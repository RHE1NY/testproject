import React from 'react';
import {Link} from "react-router-dom";
import logo from '../../img/download.png'

const Navbar = () => {
    return (
        <header>
            <div className="container">
                <div className="logo"><img src={logo} width="70px" height="70px"></img>
                </div>
                <Link  to="/Shop" className="logo-text">
                  TEST
                </Link>
                <nav className="menu">
                    <Link to="/Shop" className="menu-item active">Товары</Link>
                    <Link to="/About" className="menu-item">О нас</Link>
                </nav>
            </div>
        </header>
    );
};

export default Navbar;