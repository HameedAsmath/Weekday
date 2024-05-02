import { useEffect, useState } from "react";
import JobCard from "./components/JobCard";
import ShimmerCard from "./components/Shimmer";
import { useFetchJobs } from "./custom-hooks/useFetchJobs";
import { Job } from "./types";
import DropdownSelect from "./components/Dropdown";
import {
  basePayOptions,
  experienceOptions,
  modeOfWorkOptions,
  rolesOptions,
} from "./helpers/constants";

function App() {
  const { isLoading, jobs, error, fetchJobs } = useFetchJobs();
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [selectedExperience, setSelectedExperience] = useState<string[]>([]);
  const [selectedModeOfWork, setSelectedModeOfWork] = useState<string[]>([]);
  const [selectedBasePay, setSelectedBasePay] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredJobs, setFilteredJobs] = useState<Job[]>(jobs);
  useEffect(() => setFilteredJobs(jobs), [jobs]);

  const filterJobs = () => {
    let filtered = [...jobs];

    if (selectedRoles.length > 0) {
      filtered = filtered.filter((job) =>
        selectedRoles.includes(job.jobRole.toLowerCase())
      );
    }

    if (selectedExperience.length > 0) {
      filtered = filtered.filter((job) =>
        selectedExperience.includes(job.minExp && job.minExp.toString())
      );
    }

    if (selectedModeOfWork.length > 0) {
      if (selectedModeOfWork[0].toLowerCase() === "remote") {
        filtered = filtered.filter((job) =>
          selectedModeOfWork.includes(job.location)
        );
      } else if (selectedModeOfWork[0].toLowerCase() === "hybrid") {
        filtered = filtered.filter((job) =>
          selectedModeOfWork.includes(job.location)
        );
      } else {
        filtered = filtered.filter((job) => job.location !== null);
      }
    }

    if (selectedBasePay.length > 0) {
      const baseSalary = Number(selectedBasePay[0].replace("l", ""));
      console.log(baseSalary, typeof baseSalary);

      filtered = filtered.filter((job) => {
        if (job.minJdSalary !== null && job.maxJdSalary !== null) {
          return job.minJdSalary <= baseSalary && baseSalary <= job.maxJdSalary;
        } else if (job.minJdSalary !== null) {
          return job.minJdSalary <= baseSalary;
        } else if (job.maxJdSalary !== null) {
          return baseSalary <= job.maxJdSalary;
        }
        return false;
      });
    }

    if (searchTerm.length > 0) {
      filtered = filtered.filter(
        (job: Job) =>
          job?.companyName &&
          job?.companyName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFilteredJobs(filtered);
  };

  useEffect(() => {
    console.log(
      selectedRoles,
      selectedExperience,
      selectedModeOfWork,
      selectedBasePay,
      searchTerm
    );
    filterJobs();
  }, [
    selectedRoles,
    selectedExperience,
    selectedModeOfWork,
    selectedBasePay,
    jobs,
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
      <div className="flex gap-3 justify-center flex-wrap">
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
            placeholder="Minimum Salery"
            onSelect={setSelectedBasePay}
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
