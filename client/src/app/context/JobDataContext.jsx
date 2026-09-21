"use client";

import { createContext, useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";

export const JobDataContext = createContext();

export default function JobDataProvider({ children }) {
  const [jobs, setJobs] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const base_url = process.env.NEXT_PUBLIC_SERVER_URL;

  const jobCache = useRef(new Map());

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
      } finally{
        setLoading(false);
      }
    };

    fetchData();
  }, [base_url]);



  const getJobBySlug = useCallback(
    async (slug)=>{
      if(!slug || !base_url){
        return null;
      } 
      if(jobCache.current.has(slug)){
        return jobCache.current.get(slug);
      }
      try{
        const response = await axios.get(`${base_url}/job/singlejob/${encodeURIComponent(slug)}`);
        if(response.data?.success && response.data?.job){
          const fetchedJob = response.data.job;
          jobCache.current.set(slug, fetchedJob);
          return fetchedJob;
        }
        return null;

      }catch(error){
        console.error("Error fetching Single Job ",error);
        return null;
      }
    },
    [base_url]
  )



  return (
    <JobDataContext.Provider value={{ jobs, subcategories, loading, getJobBySlug }}>
      {children}
    </JobDataContext.Provider>
  );
}

