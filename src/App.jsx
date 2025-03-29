import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import MainLayout from "./layouts/MainLayout";
import JobsPage from "./Pages/JobsPage";
import NotFoundPage from "./Pages/NotFoundPage";
import JobPage, { jobLoader } from "./Pages/JobPage";
import Spinner from "./components/Spinner";
import { Suspense } from "react";
import AddJobPage from "./Pages/AddJobPage";
import EditeJobPage from "./Pages/EditeJobPage";

const App = () => {
  const addJob = async (newJob) => {
    const res = await fetch("/api/jobs", {
      method: "POST",
      headers: {
        "Content-type": "appliction/json",
      },
      body: JSON.stringify(newJob),
    });
    return;
  };

  const updateJob = async (updateJob) => {
    const res = await fetch(`/api/jobs/${updateJob.id}`, {
      method: "Put",
      headers: {
        "Content-type": "appliction/json",
      },
      body: JSON.stringify(updateJob),
    });
    return;
  };

  const deletJob = async (id) => {
    const res = await fetch(`/api/jobs/${id}`, {
      method: "DELETE",
    });
    return;
  };

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
          path: "edit-job/:id",
          element: <EditeJobPage updateJobSubmit={updateJob} />,
          loader: jobLoader,
        },
        {
          path: "jobs",
          element: <JobsPage />,
          errorElement: <NotFoundPage />,
        },
        {
          path: "jobs/:id",
          element: <JobPage deletJob={deletJob} />,
          loader: jobLoader,
          errorElement: <NotFoundPage />,
        },
        {
          path: "*",
          element: <NotFoundPage />,
        },
        { path: "add-job", element: <AddJobPage addJobSubmit={addJob} /> },
      ],
    },
  ]);

  return (
    <Suspense fallback={<Spinner />}>
      <RouterProvider router={router} />
    </Suspense>
  );
};

export default App;
