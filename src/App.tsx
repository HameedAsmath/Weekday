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

function App() {
  const { isLoading, jobs, error, fetchJobs } = useFetchJobs();
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [selectedExperience, setSelectedExperience] = useState<string[]>([]);
  const [selectedModeOfWork, setSelectedModeOfWork] = useState<string[]>([]);
  const [selectedBasePay, setSelectedBasePay] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredJobs, setFilteredJobs] = useState<Job[]>(jobs);

  useEffect(() => {
    setFilteredJobs(
      filterJobs(
        jobs,
        selectedRoles,
        selectedExperience,
        selectedModeOfWork,
        selectedBasePay,
        searchTerm
      )
    );
  }, [
    jobs,
    selectedRoles,
    selectedExperience,
    selectedModeOfWork,
    selectedBasePay,
    searchTerm,
  ]);

  const handleScroll = () => {
    const isAtBottom =
      window.innerHeight + document.documentElement.scrollTop + 100 >=
      document.documentElement.offsetHeight;

    if (isAtBottom && !isLoading) {
      fetchJobs(jobs.length);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLoading]);

  return (
    <div className="font-sans text-gray-700 m-6 mt-10">
      <div className="flex gap-3 justify-center flex-wrap items-center">
        <div className="filters">
          <DropdownSelect
            options={rolesOptions}
            placeholder="Roles"
            onSelect={setSelectedRoles}
          />
        </div>
        <div className="filters">
          <DropdownSelect
            options={experienceOptions}
            placeholder="Experience"
            onSelect={setSelectedExperience}
          />
        </div>
        <div className="filters">
          <DropdownSelect
            options={modeOfWorkOptions}
            placeholder="Inoffice"
            onSelect={setSelectedModeOfWork}
          />
        </div>
        <div className="filters">
          <DropdownSelect
            options={basePayOptions}
            placeholder="Minimum Salary"
            onSelect={setSelectedBasePay}
          />
        </div>
        <div className="filters">
          <DropdownSelect
            options={NoInputData}
            placeholder="Number of Employees"
          />
        </div>
        <div className="filters">
          <DropdownSelect options={NoInputData} placeholder="Tech Stack" />
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
            onClick={() => setFilteredJobs(jobs)}
          >
            clear filters
          </p>
        </div>
      </div>
      {filteredJobs.length === 0 && !isLoading && (
        <h3 className="text-center mt-[20%] font-mono text-gray-600 font-bold text-2xl">
          Oops! No results found
        </h3>
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
