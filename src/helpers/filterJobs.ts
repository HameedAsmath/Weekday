import { Job } from "../types";

export const filterJobs = (
  jobs: Job[],
  selectedRoles: string[],
  selectedExperience: string[],
  selectedModeOfWork: string[],
  selectedBasePay: string[],
  searchTerm: string
): Job[] => {
  return jobs.filter((job) => {
    const roleMatch =
      selectedRoles.length === 0 ||
      selectedRoles.includes(job.jobRole.toLowerCase());

    const expMatch =
      selectedExperience.length === 0 ||
      selectedExperience.includes(job.minExp && job.minExp.toString());

    const modeOfWorkMatch =
      selectedModeOfWork.length === 0 ||
      (selectedModeOfWork[0].toLowerCase() === "remote" ||
      selectedModeOfWork[0].toLowerCase() === "hybrid"
        ? selectedModeOfWork.includes(job.location)
        : job.location !== null);

    const basePayMatch =
      selectedBasePay.length === 0 ||
      selectedBasePay.every((base) => {
        const baseSalary = Number(base.replace("l", ""));
        return (
          (job.minJdSalary === null || job.minJdSalary <= baseSalary) &&
          (job.maxJdSalary === null || baseSalary <= job.maxJdSalary)
        );
      });

    const searchTermMatch =
      searchTerm === "" ||
      (job?.companyName &&
        job?.companyName.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
      roleMatch &&
      expMatch &&
      modeOfWorkMatch &&
      basePayMatch &&
      searchTermMatch
    );
  });
};
