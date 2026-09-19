"use client";

import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const JobDataContext = createContext();

export default function JobDataProvider({ children }) {
  const [jobs, setJobs] = useState([]);
  const [subcategories, setSubcategories] = useState([]);

  const base_url = process.env.NEXT_PUBLIC_SERVER_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [jobsResponse, subcategoriesResponse] = await Promise.all([
          axios.get(`${base_url}/job/alljobs`),
          axios.get(`${base_url}/job/sub-category`),
        ]);

        if (jobsResponse.data?.success) {
          setJobs(jobsResponse.data.data || []);
        }

        if (subcategoriesResponse.data?.success) {
          setSubcategories(
            subcategoriesResponse.data.subcategory || []
          );
        }
      } catch (error) {
        console.error("Error fetching job data:", error);
      }
    };

    fetchData();
  }, [base_url]);

  return (
    <JobDataContext.Provider value={{ jobs, subcategories }}>
      {children}
    </JobDataContext.Provider>
  );
}

