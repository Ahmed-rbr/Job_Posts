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
import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

import firebaseConfig from "./firebase-config.js";
import { db } from "./firebase.js";
const App = () => {
  const addJob = async (newJob) => {
    try {
      const docRef = await addDoc(collection(db, "jobs"), newJob);
      return { id: docRef.id, ...newJob };
    } catch (error) {
      throw new Error("Failed to add job: " + error.message);
    }
  };

  const updateJob = async (updatedJob) => {
    try {
      await updateDoc(doc(db, "jobs", updatedJob.id), updatedJob);
      return updatedJob;
    } catch (error) {
      throw new Error("Failed to update job: " + error.message);
    }
  };

  const deleteJob = async (id) => {
    try {
      await deleteDoc(doc(db, "jobs", id));
    } catch (error) {
      throw new Error("Failed to delete job: " + error.message);
    }
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
          path: "/edit-job/:id",
          element: <EditeJobPage updateJobSubmit={updateJob} />,
          loader: jobLoader,
        },
        {
          path: "jobs",
          element: <JobsPage />,
          errorElement: <NotFoundPage />,
        },
        {
          path: "/jobs/:id",
          element: <JobPage deleteJob={deleteJob} />,
          loader: jobLoader,
          errorElement: <NotFoundPage />,
        },
        {
          path: "*",
          element: <NotFoundPage />,
        },
        {
          path: "add-job",
          element: <AddJobPage addJobSubmit={addJob} />,
        },
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
