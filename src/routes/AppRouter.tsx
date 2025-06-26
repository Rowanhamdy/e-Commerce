import { createBrowserRouter, RouterProvider } from "react-router-dom";
// layouts
import MainLayout from "@layouts/MainLayout/MainLayout";
// pages
import Error from "@pages/NotFound";
//lazy loading
import { lazy, Suspense } from "react";
import NewArrivals from "@pages/NewArrivals";
import Details from "@pages/Details";
const Home = lazy(() => import("@pages/Home"));
const AboutUs = lazy(() => import("@pages/About"));
const Login = lazy(() => import("@pages/Login"));
const Register = lazy(() => import("@pages/Register"));
const Cart = lazy(() => import("@pages/Cart"));
const Wishlist = lazy(() => import("@pages/Wishlist"));
const Categories = lazy(() => import("@pages/Categories"));
const Products = lazy(() => import("@pages/Products"));
const Account = lazy(() => import("@pages/Account"));
const ProfileLayout = lazy(
  () => import("@layouts/ProfileLayout/ProfileLayout")
);
const Orders = lazy(() => import("@pages/Orders"));
// protect route
import ProtectedRoute from "@components/Auth/ProtectedRoute";

import { LottieHandler } from "@components/feedback";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense
        fallback={
          <div style={{ marginTop: "10%" }}>
            <LottieHandler type="load" message="Loading please wait..." />
          </div>
        }
      >
        <MainLayout />
      </Suspense>
    ),
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: (
          <Suspense
            fallback={
              <LottieHandler type="load" message="loading please wait ..." />
            }
          >
            <Home />
          </Suspense>
        ),
      },
      {
        path: "/cart",
        element: (
          <ProtectedRoute>
            <Suspense
              fallback={
                <LottieHandler type="load" message="loading please wait ..." />
              }
            >
              <Cart />{" "}
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "/new",
        element: (
          <Suspense
            fallback={
              <LottieHandler type="load" message="loading please wait ..." />
            }
          >
            <NewArrivals />
          </Suspense>
        ),
      },
      {
        path: "/details/:prefix?/:id",
        element: (
          <Suspense
            fallback={
              <LottieHandler type="load" message="loading please wait ..." />
            }
          >
            <Details />
          </Suspense>
        ),
      },
      {
        path: "/details/:id",
        element: (
          <Suspense
            fallback={
              <LottieHandler type="load" message="loading please wait ..." />
            }
          >
            <Details />
          </Suspense>
        ),
      },
      {
        path: "/wishlist",
        element: (
          <ProtectedRoute>
            <Suspense
              fallback={
                <LottieHandler type="load" message="loading please wait ..." />
              }
            >
              <Wishlist />{" "}
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "/categories",
        element: (
          <Suspense
            fallback={
              <LottieHandler type="load" message="loading please wait ..." />
            }
          >
            <Categories />
          </Suspense>
        ),
      },
      {
        path: "/categories/products/:prefix",
        element: (
          <Suspense
            fallback={
              <LottieHandler type="load" message="loading please wait ..." />
            }
          >
            <Products />
          </Suspense>
        ),
        loader: ({ params }) => {
          if (
            typeof params.prefix !== "string" ||
            !/^[a-z]+$/i.test(params.prefix)
          ) {
            throw new Response("Bad Request", {
              statusText: "Category not found",
              status: 400,
            });
          }
          return true;
        },
      },
      {
        path: "about-us",
        element: (
          <Suspense
            fallback={
              <LottieHandler type="load" message="loading please wait ..." />
            }
          >
            <AboutUs />
          </Suspense>
        ),
      },
      {
        path: "login",
        element: (
          <Suspense
            fallback={
              <LottieHandler type="load" message="loading please wait ..." />
            }
          >
            <Login />
          </Suspense>
        ),
      },
      {
        path: "register",
        element: (
          <Suspense
            fallback={
              <LottieHandler type="load" message="loading please wait ..." />
            }
          >
            <Register />
          </Suspense>
        ),
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <Suspense
              fallback={
                <LottieHandler type="load" message="loading please wait ..." />
              }
            >
              <ProfileLayout />
            </Suspense>
          </ProtectedRoute>
        ),
        children: [
          {
            index: true,
            element: (
              <Suspense
                fallback={
                  <LottieHandler
                    type="load"
                    message="loading please wait ..."
                  />
                }
              >
                <Account />
              </Suspense>
            ),
          },
          {
            path: "orders",
            element: (
              <Suspense
                fallback={
                  <LottieHandler
                    type="load"
                    message="loading please wait ..."
                  />
                }
              >
                <Orders />
              </Suspense>
            ),
          },
        ],
      },
    ],
  },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
