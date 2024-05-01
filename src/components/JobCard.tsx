import { Job } from "../types";
import Thunder from "../assets/thunder.png";
const JobCard = ({ job }: { job: Job }) => {
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
    <div className="card-container border-2 border-gray-300 px-4 pt-4 pb-2 shadow-lg rounded-2xl lg:w-[25%]">
      <div className="company-card flex gap-2 justify-center lg:justify-start">
        <div className="company-logo">
          <img
            src={job?.companyLogo || "../../public/weekday.svg"}
            alt="company-logo"
            width="75"
          />
        </div>
        <div className="company-info">
          <p className="font-medium text-gray-500 text-base font-mono">
            {job?.companyName || "Weekday"}
          </p>
          <p className="capitalize">{job.jobRole || "Not Mentioned"}</p>
          <p className="capitalize">{job.location || "Not Mentioned"}</p>
        </div>
      </div>

      <div className="job-details mt-3">
        <p className="text-gray-500">
          Estimated Salery: <span>{getSaleryRange()}</span>
        </p>
        <p className="font-mono mt-3">Job Description:</p>
        <p className="text-gray-600">
          {job.jobDetailsFromCompany || "Not Mentioned"}
        </p>
        <p className="text-mono font-medium text-gray-500 mt-5">
          Minimum Experience
        </p>
        <p className="text-gray-700">
          {job.minExp ? `${job.minExp} years` : "Not Mentioned"}
        </p>
        <div className="rounded-lg bg-primary w-full font-mono font-bold py-3 mt-3 flex gap-2 justify-center">
          <img src={Thunder} alt="thunder" width="20" />
          <p>Easy Apply</p>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
