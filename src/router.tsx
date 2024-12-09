import { createBrowserRouter, Outlet } from "react-router";
import Home from "./pages/home/page";
import Login from "./pages/login/page";
import Dashboard from "./pages/dashboard/page";
import Header from "./components/header/page";

export const Router = createBrowserRouter([
    {
        element: (
            <>
                <Header />
                <div style={{ marginTop: '35px' }}>
                    <Outlet />
                </div>
            </>
        ),
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/dashboard',
                element: <Dashboard />
            }
        ]
    }
])