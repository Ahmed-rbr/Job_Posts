import Hero from "../components/Hero";
import HomeCards from "../components/HomeCards";
import JobListnings from "../components/JobLIstnings";
import ViewAllJobs from "../components/ViewAllJobs";
const HomePage = () => {
  return (
    <>
      <Hero />
      <HomeCards />
      <JobListnings isHome={true} />
      <ViewAllJobs />
    </>
  );
};

export default HomePage;
