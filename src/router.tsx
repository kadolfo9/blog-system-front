import { createBrowserRouter } from "react-router";

import { HomePage } from "@/pages/home";
import { AuthPage } from "@/pages/auth";
import { ProtectedRoute } from "@/components/global/protected";
import BaseElement from "@/components/global/base";
import { ProfileScreen } from "@/pages/profile";
import { PostPage } from "@/pages/post";
import { PostEditorScreen } from "@/pages/post/editor";
import { PostCreatorScreen } from "@/pages/post/creator";
import { AboutPage } from "@/pages/about";

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
        path: '/about',
        element: <AboutPage />
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
        path: '/posts',
        children: [
          { path: ':postId', element: <PostPage /> },
          { path: ':postId/edit', element: <ProtectedRoute children={<PostEditorScreen />} /> },
          { path: 'create', element: <ProtectedRoute children={<PostCreatorScreen />} /> }
        ]
      }
    ]
  }
]);
