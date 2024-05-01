export const getJobs = async (
  limit = 10,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  const raw = JSON.stringify({
    limit: limit,
    offset: 0,
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
  };
  try {
    const response = await fetch(
      "https://api.weekday.technology/adhoc/getSampleJdJSON",
      requestOptions
    );

    if (!response.ok) {
      alert("Somthing went wrong");
      throw new Error("Network response was not ok");
    }

    const result = await response.json();
    return result;
  } catch (error: any) {
    console.error(error);
    alert(error?.response?.data?.message || "Something went wrong");
  } finally {
    setIsLoading(false);
  }
};
