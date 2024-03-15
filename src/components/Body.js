import React, { Suspense } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Loader from "./Loader";
import { useSelector } from "react-redux";
const Login = React.lazy(() => import("./Login"));
const SignUp = React.lazy(() => import("./SignUp"));
const Header = React.lazy(() => import("./Header"));
const Editor = React.lazy(() => import("./editor/Editor"));
const Browse = React.lazy(() => import("./Browse"));
const Preview = React.lazy(() => import("./Preview"));

const Body = () => {
  const loaderCount = useSelector((store) => store.loader.count);
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: (
        <Suspense
          fallback={
            <div>
              <Loader />
            </div>
          }
        >
          <Login />
        </Suspense>
      ),
    },
    {
      path: "/signup",
      element: (
        <Suspense
          fallback={
            <div>
              <Loader />
            </div>
          }
        >
          <SignUp />
        </Suspense>
      ),
    },
    {
      path: "/editor/:id?",
      element: (
        <Suspense
          fallback={
            <div>
              <Loader />
            </div>
          }
        >
          <>
            <Header />
            <Editor />
          </>
        </Suspense>
      ),
    },
    {
      path: "/preview/:id",
      element: (
        <Suspense
          fallback={
            <div>
              <Loader />
            </div>
          }
        >
          <>
            <Header />
            <Preview />
          </>
        </Suspense>
      ),
    },
    {
      path: "/browse",
      element: (
        <Suspense
          fallback={
            <div>
              <Loader />
            </div>
          }
        >
          <>
            <Header />
            <Browse />
          </>
        </Suspense>
      ),
    },
  ]);

  return (
    <div>
      {loaderCount > 0 && <Loader />}
      <RouterProvider router={appRouter} />
    </div>
  );
};

export default Body;
