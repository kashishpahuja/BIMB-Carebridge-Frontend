"use client";

import {
  createContext,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import axios from "axios";

export const JobDataContext = createContext();

const base_url =
  process.env.NEXT_PUBLIC_SERVER_URL ||
  "http://localhost:8000/api/v1/user";

export default function JobDataProvider({ children }) {
  const [jobs, setJobs] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // =========================
  // AUTH STATE
  // =========================

  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  const jobCache = useRef(new Map());

  // =========================
  // GET CURRENT USER
  // =========================

  const getCurrentUser = useCallback(async () => {
    try {
      setAuthLoading(true);

      const response = await axios.get(
        `${base_url}/auth`,
        {
          withCredentials: true,
        }
      );

      if (response.data?.success) {
        const currentUser =
          response.data?.user ||
          response.data?.data?.user ||
          response.data?.data ||
          null;

        setUser(currentUser);

        return currentUser;
      }

      setUser(null);
      return null;
    } catch (error) {
      // 401 simply means user is not logged in
      if (error.response?.status !== 401) {
        console.error(
          "Get current user error:",
          error.response?.data || error
        );
      }

      setUser(null);
      return null;
    } finally {
      setAuthLoading(false);
    }
  }, []);

  // =========================
  // LOGIN
  // =========================

  const login = useCallback(
    async ({ email, password }) => {
      try {
        const response = await axios.post(
          `${base_url}/auth/login`,
          {
            email: email.trim(),
            password,
          },
          {
            withCredentials: true,
          }
        );

        console.log("Login response:", response.data);

        if (response.data?.success) {
          const loggedInUser =
            response.data?.user ||
            response.data?.data?.user ||
            response.data?.data ||
            null;

          if (loggedInUser) {
            setUser(loggedInUser);
          } else {
            // If login only returns success/token,
            // get the authenticated user from backend.
            await getCurrentUser();
          }
        }

        return response.data;
      } catch (error) {
        console.error(
          "Login error:",
          error.response?.data || error
        );

        throw (
          error.response?.data || {
            success: false,
            message: "Login failed. Please try again.",
          }
        );
      }
    },
    [getCurrentUser]
  );

  // =========================
  // SIGNUP
  // =========================

  const signup = useCallback(
    async ({ fullname, email, password }) => {
      try {
        const response = await axios.post(
          `${base_url}/auth/signup`,
          {
            fullname: fullname.trim(),
            email: email.trim(),
            password,
          },
          {
            withCredentials: true,
          }
        );

        console.log("Signup response:", response.data);

        return response.data;
      } catch (error) {
        console.error(
          "Signup error:",
          error.response?.data || error
        );

        throw (
          error.response?.data || {
            success: false,
            message: "Unable to create account.",
          }
        );
      }
    },
    []
  );

  // =========================
  // VERIFY SIGNUP OTP
  // =========================

  const verifySignup = useCallback(
    async ({ fullname, email, password, otp }) => {
      try {
        const response = await axios.post(
          `${base_url}/auth/verify`,
          {
            fullname: fullname.trim(),
            email: email.trim(),
            password,
            otp: otp.trim(),
          },
          {
            withCredentials: true,
          }
        );

        console.log(
          "Verification response:",
          response.data
        );

        if (response.data?.success) {
          const verifiedUser =
            response.data?.user ||
            response.data?.data?.user ||
            response.data?.data ||
            null;

          if (verifiedUser) {
            setUser(verifiedUser);
          } else {
            // If backend doesn't return user,
            // check the current session.
            await getCurrentUser();
          }
        }

        return response.data;
      } catch (error) {
        console.error(
          "Verification error:",
          error.response?.data || error
        );

        throw (
          error.response?.data || {
            success: false,
            message: "Invalid OTP. Please try again.",
          }
        );
      }
    },
    [getCurrentUser]
  );

  // =========================
  // LOGOUT
  // =========================

  const logout = useCallback(async () => {
    try {
      const response = await axios.get(
        `${base_url}/auth/logout`,
        {
          withCredentials: true,
        }
      );

      setUser(null);

      return response.data;
    } catch (error) {
      console.error(
        "Logout error:",
        error.response?.data || error
      );

      // Even if backend logout fails,
      // remove the local authenticated state.
      setUser(null);

      throw (
        error.response?.data || {
          success: false,
          message: "Logout failed.",
        }
      );
    }
  }, []);


  // =========================
  // Update User
  // =========================

const updateUser = useCallback(
  async (userData) => {
    try {
      const formData = new FormData();

      formData.append("fullname", userData.fullname || "");
      formData.append("phone", userData.phone || "");
      formData.append("gender", userData.gender || "");
      formData.append("dateOfBirth", userData.dateOfBirth || "");
      formData.append("address", userData.address || "");

      if (userData.image instanceof File) {
        formData.append("image", userData.image);
      }

      if (userData.resume instanceof File) {
        formData.append("resume", userData.resume);
      }

      const response = await axios.put(
        `${base_url}/auth/update`,
        formData,
        {
          withCredentials: true,
        }
      );

      if (response.data?.success) {
        const updatedUser =
          response.data?.user ||
          response.data?.data?.user ||
          response.data?.data ||
          null;

        if (updatedUser) {
          setUser(updatedUser);
        } else {
          await getCurrentUser();
        }
      }

      return response.data;
    } catch (error) {
      console.error("Update user error:", error);

      throw (
        error.response?.data || {
          success: false,
          message: "Unable to update profile.",
        }
      );
    }
  },
  [getCurrentUser]
);


  // =========================
  // CHECK LOGIN ON PAGE LOAD
  // =========================

  useEffect(() => {
    getCurrentUser();
  }, [getCurrentUser]);

  // =========================
  // JOBS + SUBCATEGORIES
  // =========================

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          jobsResponse,
          subcategoriesResponse,
        ] = await Promise.all([
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
        console.error(
          "Error fetching job data:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // =========================
  // GET SINGLE JOB
  // =========================

  const getJobBySlug = useCallback(
    async (slug) => {
      if (!slug) {
        return null;
      }

      if (jobCache.current.has(slug)) {
        return jobCache.current.get(slug);
      }

      try {
        const response = await axios.get(
          `${base_url}/job/singlejob/${encodeURIComponent(
            slug
          )}`
        );

        if (
          response.data?.success &&
          response.data?.job
        ) {
          const fetchedJob = response.data.job;

          jobCache.current.set(
            slug,
            fetchedJob
          );

          return fetchedJob;
        }

        return null;
      } catch (error) {
        console.error(
          "Error fetching single job:",
          error
        );

        return null;
      }
    },
    []
  );

  return (
    <JobDataContext.Provider
      value={{
        // Jobs
        jobs,
        subcategories,
        loading,
        getJobBySlug,

        // Auth
        user,
        authLoading,
        isAuthenticated: !!user,

        login,
        signup,
        verifySignup,
        getCurrentUser,
        updateUser,
        logout,
      }}
    >
      {children}
    </JobDataContext.Provider>
  );
}

// "use client";

// import { createContext, useCallback, useEffect, useRef, useState } from "react";
// import axios from "axios";

// export const JobDataContext = createContext();

// export default function JobDataProvider({ children }) {
//   const [jobs, setJobs] = useState([]);
//   const [subcategories, setSubcategories] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const base_url = process.env.NEXT_PUBLIC_SERVER_URL;

//   const jobCache = useRef(new Map());

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [jobsResponse, subcategoriesResponse] = await Promise.all([
//           axios.get(`${base_url}/job/alljobs`),
//           axios.get(`${base_url}/job/sub-category`),
//         ]);

//         if (jobsResponse.data?.success) {
//           setJobs(jobsResponse.data.data || []);
//         }

//         if (subcategoriesResponse.data?.success) {
//           setSubcategories(
//             subcategoriesResponse.data.subcategory || []
//           );
//         }
//       } catch (error) {
//         console.error("Error fetching job data:", error);
//       } finally{
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [base_url]);



//   const getJobBySlug = useCallback(
//     async (slug)=>{
//       if(!slug || !base_url){
//         return null;
//       } 
//       if(jobCache.current.has(slug)){
//         return jobCache.current.get(slug);
//       }
//       try{
//         const response = await axios.get(`${base_url}/job/singlejob/${encodeURIComponent(slug)}`);
//         if(response.data?.success && response.data?.job){
//           const fetchedJob = response.data.job;
//           jobCache.current.set(slug, fetchedJob);
//           return fetchedJob;
//         }
//         return null;

//       }catch(error){
//         console.error("Error fetching Single Job ",error);
//         return null;
//       }
//     },
//     [base_url]
//   )



//   return (
//     <JobDataContext.Provider value={{ jobs, subcategories, loading, getJobBySlug }}>
//       {children}
//     </JobDataContext.Provider>
//   );
// }

