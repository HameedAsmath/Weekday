import { useEffect, useState } from "react";
import JobCard from "./components/JobCard";
import ShimmerCard from "./components/Shimmer";
import { useFetchJobs } from "./custom-hooks/useFetchJobs";
import { Job } from "./types";
import DropdownSelect from "./components/Dropdown";

function App() {
  const { isLoading, jobs, error, fetchJobs } = useFetchJobs();
  const [filteredJobs, setFilteredJobs] = useState<Job[]>(jobs);
  useEffect(() => setFilteredJobs(jobs), [jobs]);
  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight ||
      isLoading
    ) {
      return;
    }
    fetchJobs(jobs.length);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLoading]);
  return (
    <div className="font-sans text-gray-700 m-6 mt-10">
      <div className="filters">
        <DropdownSelect options={["hello", "world", "test"]} />
      </div>
      <div className="cards-container mt-8 flex gap-10 flex-wrap justify-center align-middle">
        {filteredJobs.map((job, index) => (
          <JobCard job={job} key={job.jdUid + index} />
        ))}
      </div>
      {isLoading && (
        <div className="cards-container mt-8 flex gap-10 flex-wrap justify-center align-middle">
          {[...Array(9)].map((_, index) => (
            <ShimmerCard key={index} />
          ))}
        </div>
      )}
      {error && <p> "Something went wrong"</p>}
    </div>
  );
}

export default App;
