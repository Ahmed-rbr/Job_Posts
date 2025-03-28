import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import MainLayout from "./layouts/MainLayout";
import JobsPage from "./Pages/JobsPage";
import NotFoundPage from "./Pages/NotFoundPage";
import JobPage, { jobLoader } from "./Pages/JobPage";
import Spinner from "./components/Spinner";
import { Suspense } from "react";
import AddJobPage from "./Pages/AddJobPage";
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
        path: "jobs",
        element: <JobsPage />,
        errorElement: <NotFoundPage />,
      },
      {
        path: "jobs/:id",
        element: <JobPage />,
        loader: jobLoader,
        errorElement: <NotFoundPage />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
      { path: "add-job", element: <AddJobPage /> },
    ],
  },
]);

const App = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <RouterProvider router={router} />
    </Suspense>
  );
};

export default App;
