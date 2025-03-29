import { React, useState, useEffect } from "react";
import { FaMapMarker } from "react-icons/fa";
import { Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase"; // Adjust path as needed

const JobListing = () => {
  const [jobs, setJobs] = useState([]);
  const [showFullDesc, setShowFullDesc] = useState({});

  // Fetch jobs from Firestore
  useEffect(() => {
    const fetchJobs = async () => {
      const querySnapshot = await getDocs(collection(db, "jobs"));
      const jobsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setJobs(jobsData);

      // Initialize showFullDesc state for each job
      const descState = {};
      jobsData.forEach((job) => {
        descState[job.id] = false;
      });
      setShowFullDesc(descState);
    };

    fetchJobs();
  }, []);

  const toggleDescription = (jobId) => {
    setShowFullDesc((prev) => ({
      ...prev,
      [jobId]: !prev[jobId],
    }));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {jobs.map((job) => {
        let description = job.description;
        if (!showFullDesc[job.id]) {
          description = description.substring(0, 90) + "...";
        }

        return (
          <div key={job.id} className="bg-white rounded-xl shadow-md relative">
            <div className="p-4">
              <div className="mb-6">
                <div className="text-gray-600 my-2">{job.type}</div>
                <h3 className="text-xl font-bold">{job.title}</h3>
              </div>

              <div className="mb-5">{description}</div>
              <button
                onClick={() => toggleDescription(job.id)}
                className="text-indigo-500 mb-5 hover:text-indigo-600"
              >
                {showFullDesc[job.id] ? "Less" : "More"}
              </button>
              <h3 className="text-indigo-500 mb-2">{job.salary} / Year</h3>

              <div className="border border-gray-100 mb-5"></div>

              <div className="flex flex-col lg:flex-row justify-between mb-4">
                <div className="text-orange-700 mb-3">
                  <FaMapMarker className="inline text-lg mr-1 mb-1" />
                  {job.location}
                </div>
                <Link
                  to={`/jobs/${job.id}`}
                  className="h-[36px] bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg text-center text-sm"
                >
                  Read More
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default JobListing;
