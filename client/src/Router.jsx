import { createBrowserRouter, RouterProvider } from "react-router";
import App from "./App";
import { HomePage } from "./pages/HomePage";
//import { FeedPage } from "./pages/FeedPage";
//import { MyProfilePage } from "./pages/MyProfilePage";
//import { UserProfilePage } from "./pages/UserProfilePage";

export const Router = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      Component: App,
      children: [
        {
          index: true,
          Component: HomePage,
        },
        /*{
          path: "feed",
          Component: FeedPage,
        },
        {
          path: "profile",
          Component: MyProfilePage,
        },
        {
          path: "users/:userId",
          Component: UserProfilePage,
        },*/
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};