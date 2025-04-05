import { createBrowserRouter } from "react-router";

import { HomePage } from "@/pages/home";
import { AuthPage } from "@/pages/auth";
import { ProtectedRoute } from "@/components/global/protected";
import { PostPage } from "@/pages/post";

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
      },
      {
        path: '/dashboard',
        element: <ProtectedRoute children={<HomePage />} />
      },
      {
        path: '/posts/:postId',
        element: <ProtectedRoute children={<PostPage />} />
      }
    ]
  }
]);
