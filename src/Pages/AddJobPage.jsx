import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddJobPage = ({ addJobSubmit }) => {
  const [formData, setFormData] = useState({
    title: "",
    type: "Full-Time",
    location: "",
    description: "",
    salary: "Under 100,000 MAD",
    company: {
      name: "",
      description: "",
      contactEmail: "",
      contactPhone: "",
    },
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("company_")) {
      const companyField = name.replace("company_", "");
      setFormData((prev) => ({
        ...prev,
        company: {
          ...prev.company,
          [companyField]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const submitForm = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await addJobSubmit({
        ...formData,
        createdAt: new Date().toISOString(),
      });
      toast.success("Job added successfully!");
      navigate("/jobs");
    } catch (error) {
      toast.error(error.message || "Failed to add job");
      console.error("Error adding job:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-indigo-50">
      <div className="container m-auto max-w-2xl py-24">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <form onSubmit={submitForm}>
            <h2 className="text-3xl text-center font-semibold mb-6">Add Job</h2>

            <div className="mb-4">
              <label
                htmlFor="type"
                className="block text-gray-700 font-bold mb-2"
              >
                Job Type
              </label>
              <select
                id="type"
                name="type"
                className="border rounded w-full py-2 px-3"
                required
                value={formData.type}
                onChange={handleChange}
              >
                <option value="Full-Time">Full-Time</option>
                <option value="Part-Time">Part-Time</option>
                <option value="Remote">Remote</option>
                <option value="Internship">Internship</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Job Listing Name
              </label>
              <input
                type="text"
                id="title"
                name="title"
                className="border rounded w-full py-2 px-3 mb-2"
                placeholder="eg. Senior React Developer"
                required
                value={formData.title}
                onChange={handleChange}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-gray-700 font-bold mb-2"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                className="border rounded w-full py-2 px-3"
                rows="4"
                placeholder="Add any job duties, expectations, requirements, etc"
                required
                value={formData.description}
                onChange={handleChange}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="salary"
                className="block text-gray-700 font-bold mb-2"
              >
                Salary
              </label>
              <select
                id="salary"
                name="salary"
                className="border rounded w-full py-2 px-3"
                required
                value={formData.salary}
                onChange={handleChange}
              >
                <option value="Under 100,000 MAD">Under 100,000 MAD</option>
                <option value="100,000 - 130,000 MAD">
                  100,000 - 130,000 MAD
                </option>
                <option value="130,000 - 190,000 MAD">
                  130,000 - 190,000 MAD
                </option>
                <option value="190,000 - 230,000 MAD">
                  190,000 - 230,000 MAD
                </option>
                <option value="230,000 - 275,000 MAD">
                  230,000 - 275,000 MAD
                </option>
                <option value="275,000 - 320,000 MAD">
                  275,000 - 320,000 MAD
                </option>
                <option value="Over 320,000 MAD">Over 320,000 MAD</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Location
              </label>
              <input
                type="text"
                id="location"
                name="location"
                className="border rounded w-full py-2 px-3 mb-2"
                placeholder="eg. Casablanca, Morocco"
                required
                value={formData.location}
                onChange={handleChange}
              />
            </div>

            <h3 className="text-2xl mb-5">Company Info</h3>

            <div className="mb-4">
              <label
                htmlFor="company_name"
                className="block text-gray-700 font-bold mb-2"
              >
                Company Name
              </label>
              <input
                type="text"
                id="company_name"
                name="company_name"
                className="border rounded w-full py-2 px-3"
                placeholder="Company Name"
                required
                value={formData.company.name}
                onChange={handleChange}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="company_description"
                className="block text-gray-700 font-bold mb-2"
              >
                Company Description
              </label>
              <textarea
                id="company_description"
                name="company_description"
                className="border rounded w-full py-2 px-3"
                rows="4"
                placeholder="What does your company do?"
                value={formData.company.description}
                onChange={handleChange}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="company_contactEmail"
                className="block text-gray-700 font-bold mb-2"
              >
                Contact Email
              </label>
              <input
                type="email"
                id="company_contactEmail"
                name="company_contactEmail"
                className="border rounded w-full py-2 px-3"
                placeholder="Email address for applicants"
                required
                value={formData.company.contactEmail}
                onChange={handleChange}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="company_contactPhone"
                className="block text-gray-700 font-bold mb-2"
              >
                Contact Phone
              </label>
              <input
                type="tel"
                id="company_contactPhone"
                name="company_contactPhone"
                className="border rounded w-full py-2 px-3"
                placeholder="Optional phone for applicants"
                value={formData.company.contactPhone}
                onChange={handleChange}
              />
            </div>

            <div>
              <button
                className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline disabled:opacity-50"
                type="submit"
                disabled={loading}
              >
                {loading ? "Adding..." : "Add Job"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AddJobPage;
