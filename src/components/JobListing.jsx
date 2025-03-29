import { FaMapMarker } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState } from "react";
const JobListing = ({ job }) => {
  const [showFullDesc, setShowFullDesc] = useState(false);

  const toggleDescription = () => {
    setShowFullDesc((prev) => !prev);
  };

  const description = showFullDesc
    ? job.description
    : `${job.description.substring(0, 90)}...`;

  return (
    <div className="bg-white rounded-xl shadow-md relative hover:shadow-lg transition-shadow">
      <div className="p-4">
        <div className="mb-6">
          <span className="inline-block bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full mb-2">
            {job.type}
          </span>
          <h3 className="text-xl font-bold">{job.title}</h3>
        </div>

        <div className="mb-5 min-h-[4rem]">{description}</div>

        <div className="flex items-center justify-between mb-4">
          <button
            onClick={toggleDescription}
            className="text-indigo-500 hover:text-indigo-600 text-sm font-medium"
          >
            {showFullDesc ? "Show Less" : "Show More"}
          </button>
          <span className="text-indigo-500 font-medium">{job.salary}</span>
        </div>

        <div className="border border-gray-100 mb-4"></div>

        <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
          <div className="text-orange-700 flex items-center">
            <FaMapMarker className="inline mr-1" />
            {job.location}
          </div>
          <Link
            to={`/jobs/${job.id}`}
            className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg text-center text-sm transition-colors w-full lg:w-auto"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default JobListing;
