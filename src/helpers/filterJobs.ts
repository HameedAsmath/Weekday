import { Job } from "../types";

export const filterJobs = (
  jobs: Job[],
  selectedRoles: string,
  selectedExperience: string,
  selectedModeOfWork: string,
  selectedBasePay: string,
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

    const basePay = Number(selectedBasePay.toLowerCase().replace("l", ""));
    const basePayMatch =
      selectedBasePay === "" ||
      ((job.minJdSalary === null || job.minJdSalary <= basePay) &&
        (job.maxJdSalary === null || basePay <= job.maxJdSalary));

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
