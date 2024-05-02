import { Job } from "../types";

export const filterJobs = (
  jobs: Job[],
  selectedRoles: string,
  selectedExperience: string,
  selectedModeOfWork: string,
  selectedBasePay: string[],
  searchTerm: string
): Job[] => {
  return jobs.filter((job) => {
    const roleMatch =
      selectedRoles === "" ||
      job.jobRole.toLowerCase() === selectedRoles.toLowerCase();

    const expMatch =
      selectedExperience === "" || job.minExp === Number(selectedExperience);

    const modeOfWorkMatch =
      selectedModeOfWork === "" ||
      (selectedModeOfWork.toLowerCase() === "remote" ||
      selectedModeOfWork.toLowerCase() === "hybrid"
        ? job.location.toLowerCase() === selectedModeOfWork.toLowerCase()
        : job.location !== null);

    const basePayMatch =
      selectedBasePay.length === 0 ||
      selectedBasePay.every((base) => {
        const baseSalary = Number(base.toLowerCase().replace("l", ""));
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
