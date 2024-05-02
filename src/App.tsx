import { useEffect, useState } from "react";
import JobCard from "./components/JobCard";
import ShimmerCard from "./components/Shimmer";
import { useFetchJobs } from "./custom-hooks/useFetchJobs";
import { Job } from "./types";
import DropdownSelect from "./components/Dropdown";
import {
  NoInputData,
  basePayOptions,
  experienceOptions,
  modeOfWorkOptions,
  rolesOptions,
} from "./helpers/constants";
import { filterJobs } from "./helpers/filterJobs";
import useThrottle from "./custom-hooks/useThrottle";

function App() {
  const { isLoading, jobs, error, fetchJobs } = useFetchJobs();
  const [role, setRole] = useState("");
  const [experience, setExperience] = useState("");
  const [mode, setMode] = useState("");
  const [basePay, setBasePay] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredJobs, setFilteredJobs] = useState<Job[]>(jobs);
  const [isNoJobsFound, setIsNoJobsFound] = useState(false);
  const handleClearFilter = () => {
    setFilteredJobs(jobs);
    setExperience("");
    setRole("");
    setBasePay("");
    setMode("");
    setSearchTerm("");
  };
  useEffect(() => {
    const filtered = filterJobs(
      jobs,
      role,
      experience,
      mode,
      [basePay],
      searchTerm
    );
    if (filtered.length === 0 && !isLoading) {
      setIsNoJobsFound(true);
      return;
    } else {
      setFilteredJobs(filtered);
      setIsNoJobsFound(false);
    }
    setFilteredJobs(
      filterJobs(jobs, role, experience, mode, [basePay], searchTerm)
    );
  }, [jobs, role, experience, mode, basePay, searchTerm]);
  const handleScroll = () => {
    const isAtBottom =
      window.innerHeight + document.documentElement.scrollTop + 100 >=
      document.documentElement.offsetHeight;

    if (isAtBottom && !isLoading) {
      fetchJobs(jobs.length);
    }
  };
  const throttledHandleScroll = useThrottle(handleScroll, 200);

  useEffect(() => {
    window.addEventListener("scroll", throttledHandleScroll);
    return () => window.removeEventListener("scroll", throttledHandleScroll);
  }, [isLoading, throttledHandleScroll]);

  return (
    <div className="font-sans text-gray-700 m-6 mt-10">
      <div className="flex gap-3 justify-center flex-wrap items-center">
        <div className="filters">
          <DropdownSelect
            options={rolesOptions}
            placeholder="Roles"
            searchTerm={role}
            setSearchTerm={setRole}
          />
        </div>
        <div className="filters">
          <DropdownSelect
            options={experienceOptions}
            placeholder="Experience"
            searchTerm={experience}
            setSearchTerm={setExperience}
          />
        </div>
        <div className="filters">
          <DropdownSelect
            options={modeOfWorkOptions}
            placeholder="Inoffice"
            searchTerm={mode}
            setSearchTerm={setMode}
          />
        </div>
        <div className="filters">
          <DropdownSelect
            options={basePayOptions}
            placeholder="Minimum Salary"
            searchTerm={basePay}
            setSearchTerm={setBasePay}
          />
        </div>
        <div className="filters">
          <DropdownSelect
            options={NoInputData}
            placeholder="Number of Employees"
            Nodata
          />
        </div>
        <div className="filters">
          <DropdownSelect
            options={NoInputData}
            placeholder="Tech Stack"
            Nodata
          />
        </div>
        <div className="filters">
          <input
            className="w-44 py-2 px-4 border-2 border-gray-200 outline-none rounded-lg"
            type="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Company Name"
          />
        </div>
        <div className="filter">
          <p
            className="cursor-pointer text-secondary hover:opacity-80"
            onClick={() => handleClearFilter()}
          >
            clear filters
          </p>
        </div>
      </div>
      {((filteredJobs.length === 0 && !isLoading) || isNoJobsFound) && (
        <>
          <h3 className="text-center mt-[5%] font-mono text-gray-600 font-bold text-2xl">
            Oops! No results found
          </h3>
          <p className="text-lg text-gray-600 mt-3 ml-10">
            Try searching the below jobs instaed
          </p>
        </>
      )}
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
      {error && <p> "Something went wrong" </p>}
    </div>
  );
}

export default App;
