import { createBrowserRouter } from "react-router";
import HomePage from "@/pages/home";
import LoginPage from "@/pages/login";
import DashboardPage from "@/pages/dashboard";
import PostPage from "@/pages/posts";
import { 
  Error, 
  ProtectedRoute,
  BaseElement
} from "@/components/global";


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
        path: '*',
        element: <Error />
      },
      {
        path: '/login',
        element: <LoginPage />
      },
      {
        path: '/dashboard',
        element: <ProtectedRoute children={<DashboardPage />} />
      },
      {
        path: '/posts/:postId',
        element: <ProtectedRoute children={<PostPage />} />
      }
    ]
  }
]);
