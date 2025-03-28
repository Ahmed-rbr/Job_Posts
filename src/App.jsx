import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import MainLayout from "./layouts/MainLayout";
import JobsPage from "./Pages/JobsPage";
import NotFoundPage from "./Pages/NotFoundPage";
import JobPage, { jobLoader } from "./Pages/JobPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "jobs/:id",
        element: <JobPage />,
        loader: jobLoader,
        errorElement: <NotFoundPage />,
      },

      { path: "*", element: <NotFoundPage /> },
      { path: "/jobs/:id", element: <JobPage />, loader: { jobLoader } },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
