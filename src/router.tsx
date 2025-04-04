import { createBrowserRouter } from "react-router";

import { HomePage } from "@/pages/home";
import { AuthPage } from "./pages/auth";

export const Router = createBrowserRouter([
  {
    path: '/',
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: '/auth',
        element: <AuthPage />
      }
    ]
  }
]);
