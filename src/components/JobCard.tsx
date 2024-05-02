import { Job } from "../types";
import Thunder from "../assets/thunder.png";
import { useEffect, useState } from "react";
const JobCard = ({ job }: { job: Job }) => {
  const [isExpanded, setIsexpanded] = useState(false);
  useEffect(() => {
    console.log(isExpanded);
  }, [isExpanded]);
  const getSaleryRange = () => {
    if (job.maxJdSalary && job.minJdSalary) {
      return `${job.minJdSalary}K - ${job.maxJdSalary}K ${job.salaryCurrencyCode}`;
    } else if (job.minJdSalary) {
      return `minimum ${job.minJdSalary}K ${job.salaryCurrencyCode}`;
    } else {
      return `upto ${job.maxJdSalary}K ${job.salaryCurrencyCode}`;
    }
  };
  return (
    <div className="card-container border-2 border-gray-100 px-4 pt-4 pb-2 shadow-lg rounded-2xl lg:w-[25%]">
      <div className="company-card flex gap-4 justify-center lg:justify-start items-center">
        <div className="company-logo">
          <img
            src={job?.companyLogo || "/weekday.svg"}
            alt="company-logo"
            width="50"
            className="rounded-md"
          />
        </div>
        <div className="company-info">
          <p className="font-medium text-gray-500 text-base font-mono">
            {job?.companyName || "Not Provided"}
          </p>
          <p className="capitalize">{job.jobRole || "Not Mentioned"}</p>
          <p className="capitalize">{job.location || "Not Mentioned"}</p>
        </div>
      </div>

      <div className="job-details mt-3 relative">
        <p className="text-gray-500">
          Estimated Salery: <span>{getSaleryRange()}</span>
        </p>
        <p className="font-mono mt-3">Job Description:</p>
        <div
          className={`${
            isExpanded ? "h-auto" : "h-14 fade-text-gradient overflow-hidden"
          } transition-height duration-300 ease-in-out`}
        >
          <p className="text-gray-500">
            {job.jobDetailsFromCompany || "Not Mentioned"}
          </p>
        </div>
        <button
          className="text-secondary mx-auto font-extralight text-center -mt-4 absolute left-0 right-0 cursor-pointer"
          onClick={() => setIsexpanded(!isExpanded)}
        >
          {isExpanded ? "Show less" : "Show more"}
        </button>
        <p className="text-mono font-medium text-gray-500 mt-5">
          Minimum Experience
        </p>
        <p className="text-gray-700">
          {job.minExp ? `${job.minExp} years` : "Not Mentioned"}
        </p>
        <a
          className="rounded-lg bg-primary w-full font-mono font-bold py-3 mt-3 flex gap-2 justify-center cursor-pointer"
          href={job.jdLink}
          target="_blank"
        >
          <img src={Thunder} alt="thunder" width="20" />
          <p>Easy Apply</p>
        </a>
      </div>
    </div>
  );
};

export default JobCard;
