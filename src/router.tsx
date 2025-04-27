import { createBrowserRouter } from "react-router";

import { HomePage } from "@/pages/home";
import { AuthPage } from "@/pages/auth";
import { ProtectedRoute } from "@/components/global/protected";
import { BaseElement } from "@/components/global/base";
import { ProfileScreen } from "./pages/profile";
import { PostPage } from "./pages/post";

export const Router = createBrowserRouter([
  {
    path: '/',
    element: <BaseElement />,
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
        path: '/profile',
        element: <ProtectedRoute children={<ProfileScreen />} />
      },
      {
        path: '/posts/:postId',
        element: <ProtectedRoute children={<PostPage />} />
      }
    ]
  }
]);
