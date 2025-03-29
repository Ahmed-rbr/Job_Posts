import { useState, useEffect } from "react";
import { collection, query, limit, onSnapshot } from "firebase/firestore";
import { db } from "./firebaseInit";
import Spinner from "./Spinner";
import JobListing from "./JobListing";

const JobListings = ({ isHome = false }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let unsubscribe;

    const fetchJobs = async () => {
      try {
        const q = isHome
          ? query(collection(db, "jobs"), limit(3))
          : collection(db, "jobs");

        unsubscribe = onSnapshot(
          q,
          (querySnapshot) => {
            const jobsData = querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            setJobs(jobsData);
            setLoading(false);
          },
          (error) => {
            setError(error.message);
            setLoading(false);
          }
        );
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchJobs();

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [isHome]);

  return (
    <section className="bg-blue-50 px-4 py-10">
      <div className="container-xl lg:container m-auto">
        <h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">
          {isHome ? "Recent Jobs" : "Browse Jobs"}
        </h2>

        {error ? (
          <div className="text-center text-red-500">
            Error loading jobs: {error}
          </div>
        ) : loading ? (
          <div className="flex items-center justify-center h-64">
            <Spinner loading={loading} />
          </div>
        ) : jobs.length === 0 ? (
          <div className="text-center">No jobs found</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
            {jobs.map((job) => (
              <JobListing key={job.id} job={job} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default JobListings;
