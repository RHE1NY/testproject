import Login from './Login'
import About from "../pageshop/About";
import Pageshop from "../pageshop/Pageshop";
import {LOGIN_ROUTE, ABOUT_ROUTE} from "./utils";

export const publicRoutes = [
    {
        path: LOGIN_ROUTE,
        element: Login,
    }
]

export const privateRoutes = [
    {
        path: ABOUT_ROUTE,
        element: <About/>
    }
]
