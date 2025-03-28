import JobListing from "./JobListing";
import { useState, useEffect } from "react";
import Spinner from "./Spinner";

const JobListings = ({ isHome = false }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const apiUrl = isHome ? "/api/jobs" : "/api/jobs";
        const res = await fetch(apiUrl);

        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

        const data = await res.json();
        setJobs(data);
      } catch (error) {
        console.error("Fetch error:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
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
