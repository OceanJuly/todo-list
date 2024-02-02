import type { RouteObject } from "react-router-dom"
import Todo from "../views/todo-list";

const routes: RouteObject[] = [
    {
        path: "/",
        element: <Todo />,
    },
    {
        path: "/todo",
        element: <Todo />,
    },
];

export default routes;