import { useEffect, useState } from "react";
// import { getJobs } from "./services";
import { Job } from "./types";
import JobCard from "./components/JobCard";
import ShimmerCard from "./components/Shimmer";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [error, setError] = useState();
  const [page, setPage] = useState(0);
  const fetchJobs = async () => {
    try {
      setIsLoading(true);
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      const raw = JSON.stringify({
        limit: 12,
        offset: 10,
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
      };

      const response = await fetch(
        "https://api.weekday.technology/adhoc/getSampleJdJSON",
        requestOptions
      );

      if (!response.ok) {
        alert("Somthing went wrong");
        throw new Error("Network response was not ok");
      }

      const res = await response.json();
      setJobs((prev) => [...prev, ...res.jdList]);
      setPage((prev) => prev + 1);
      console.log(res);
    } catch (error: any) {
      console.error(error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchJobs();
  }, []);
  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight ||
      isLoading
    ) {
      return;
    }
    fetchJobs();
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLoading]);
  return (
    <div className="font-sans text-gray-800 m-6 mt-10">
      <div className="cards-container mt-8 flex gap-10 flex-wrap justify-center align-middle">
        {jobs.map((job) => (
          <JobCard job={job} />
        ))}
      </div>
      {isLoading && (
        <div className="cards-container mt-8 flex gap-10 flex-wrap justify-center align-middle">
          <ShimmerCard />
          <ShimmerCard />
          <ShimmerCard />
          <ShimmerCard />
          <ShimmerCard />
          <ShimmerCard />
          <ShimmerCard />
          <ShimmerCard />
          <ShimmerCard />
        </div>
      )}
      {error && <p> "Something went wrong"</p>}
    </div>
  );
}

export default App;
