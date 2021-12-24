import React, {useContext} from 'react';
import {Link, NavLink} from "react-router-dom";
import logo from '../../img/download.png'
import {ContextGlobal} from "../../firebase.config";
import {useAuthState} from "react-firebase-hooks/auth";

const Navbar = () => {
   const  {aunty} = useContext(ContextGlobal)
    const {user} = useAuthState(aunty)
    console.log(user);
    return (
        <header>
            <div className="container">
                <div className="logo"><img src={logo} width="70px" height="70px"></img>
                </div>
                <Link  to="/shop" className="logo-text">
                  TEST
                </Link>
                <nav className="menu">
                    <Link to="/shop" className="menu-item active">Товары</Link>
                    <Link to="/about" className="menu-item">О нас</Link>
                    {user
                        ?
                        <button onClick={()=>aunty.signOut()} className="menu-item">
                            Выйти
                        </button>
                        :
                        <NavLink className="menu-item" to="/login">
                            Логин
                        </NavLink>
                    }
                </nav>
            </div>
        </header>
    );
};

export default Navbar;