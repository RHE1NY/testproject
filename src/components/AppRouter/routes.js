import Login from './Login'
import About from "../pageshop/About";
import Pageshop from "../pageshop/Pageshop";

export const publicRoutes = [
    {
        path: "/Shop",
        Component: Pageshop,
    }
]

export const privateRoutes = [
    {
        path: "/about",
        Component: About
    }
]
