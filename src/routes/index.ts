import { Application, Router } from "express";
import { HeathRouter } from "./health";
import { ProductRouter } from "./product";


const _routes: Array<[string, Router]> = [
    ["/health", HeathRouter],
    ["/product", ProductRouter]
];

export const routes = (app:Application) => {
    _routes.forEach((route) => {
        const [url, router] = route
        app.use(url, router);
    })
}