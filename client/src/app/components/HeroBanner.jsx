"use client";

import { useState, useEffect, useRef, useContext } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import {
  FiSearch,
  FiMapPin,
  FiGrid,
  FiArrowRight,
} from "react-icons/fi";
import Link from "next/link";

import { JobDataContext } from "../context/JobDataContext";

const popularTags = [
  "PSW Jobs",
  "RN Jobs",
  "Caregiver",
  "Wait Staff",
  "Housekeeping",
];

export default function HeroSection() {
  const router = useRouter();

  const { jobs, subcategories } = useContext(JobDataContext);

  // Search states
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("");


  // Dropdown
  const [showJobDropdown, setShowJobDropdown] = useState(false);

  // Refs
  const containerRef = useRef(null);
  const textColRef = useRef(null);
  const searchBarRef = useRef(null);
  const searchWrapperRef = useRef(null);

  // --------------------------------------------------
  // GSAP
  // --------------------------------------------------

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
      });

      if (textColRef.current) {
        tl.fromTo(
          textColRef.current.children,
          {
            opacity: 0,
            y: 30,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
          }
        );
      }

      if (searchBarRef.current) {
        tl.fromTo(
          searchBarRef.current,
          {
            opacity: 0,
            y: 40,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
          },
          "-=0.5"
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // --------------------------------------------------
  // Close dropdown when clicking outside
  // --------------------------------------------------

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchWrapperRef.current &&
        !searchWrapperRef.current.contains(event.target)
      ) {
        setShowJobDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  // --------------------------------------------------
  // Filter jobs for dropdown
  // --------------------------------------------------

const filteredJobs = jobs.filter((job) => {
  const searchKeyword = keyword.trim().toLowerCase();

  const jobText = JSON.stringify(job).toLowerCase();

  const matchesKeyword =
    !searchKeyword || jobText.includes(searchKeyword);

  const matchesCategory =
    !category ||
    job.subcategory?.slug === category ||
    job.subcategory?.title
      ?.toLowerCase()
      .includes(category.toLowerCase()) ||
    job.category?.slug === category ||
    job.category?.title
      ?.toLowerCase()
      .includes(category.toLowerCase());

  const isPublished =
    !job.status || job.status === "PUBLISHED";

  return (
    matchesKeyword &&
    matchesCategory &&
    isPublished
  );
});

  // Show only a few suggestions
  const suggestedJobs = filteredJobs.slice(0, 5);

  // --------------------------------------------------
  // Keyword change
  // --------------------------------------------------

  const handleKeywordChange = (e) => {
    const value = e.target.value;

    setKeyword(value);
    setShowJobDropdown(true);
  };

  // --------------------------------------------------
  // Job click
  // --------------------------------------------------

  const handleJobClick = (job) => {
    setShowJobDropdown(false);

    router.push(`/jobs/${job._id}`);
  };

  // --------------------------------------------------
  // Search
  // --------------------------------------------------

  const handleSearch = (e) => {
    e.preventDefault();

    setShowJobDropdown(false);

    const params = new URLSearchParams();

    if (keyword.trim()) {
      params.set("search", keyword.trim());
    }

    if (category) {
      params.set("subcategory", category);
    }

    const query = params.toString();

    router.push(query ? `/jobs?${query}` : "/jobs");
  };

  // --------------------------------------------------
  // Popular search
  // --------------------------------------------------

  const handleTagClick = (tag) => {
    setKeyword(tag);
    setShowJobDropdown(true);
  };

  return (
    <section
      ref={containerRef}
      className="w-full relative bg-cover bg-top bg-no-repeat px-5 md:px-12 lg:px-24 xl:px-40 pt-16 pb-28 font-['Poppins'] overflow-hidden"
      style={{
        backgroundImage:
          "url('/Images/banner1.webp')",
      }}
    >
      <div className="relative z-10 md:min-h-[420px] flex items-center">
        <div
          ref={textColRef}
          className="w-full lg:w-7/12 flex flex-col space-y-6"
        >
          <h1 className="text-[#1A2E26] text-4xl sm:text-5xl lg:text-[60px] font-medium leading-[1.1] tracking-tight">
            Connecting Care. <br />
            Creating{" "}
            <span className="font-semibold text-[#467B23]">
              Opportunities.
            </span>
          </h1>

          <p className="text-[#1A2E26]/80 text-base sm:text-lg leading-relaxed max-w-xl font-normal">
            We connect qualified healthcare and hospitality
            professionals with organizations that value care,
            compassion, and quality.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              href="/jobs"
              className="bg-[#467B23] hover:bg-[#071610] text-white px-7 py-3.5 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 shadow-md group cursor-pointer"
            >
              Find Jobs
              <FiArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>

            <Link
              href="/admin"
              className="bg-white hover:bg-gray-50 text-[#1A2E26] border border-[#1A2E26]/20 px-7 py-3.5 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 group cursor-pointer shadow-sm"
            >
              Post a Job
              <FiArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>

      {/* Search */}
      <div
        ref={searchBarRef}
        className="relative z-20 mt-12 lg:mt-4 max-w-7xl mx-auto"
      >
        <form
          onSubmit={handleSearch} 
          className="bg-white rounded-3xl shadow-2xl px-4 sm:px-5 py-8 border border-gray-300 grid grid-cols-1 lg:grid-cols-12 gap-4 items-center"
        >
          {/* Keyword */}
          <div
            ref={searchWrapperRef}
            className="md:col-span-5 relative"
          >
            <div className="flex items-center gap-3 px-3 py-3 bg-gray-50/80 rounded-2xl border border-gray-300/70 focus-within:border-[#467B23]">
              <FiSearch className="text-gray-700 w-5 h-5 shrink-0" />

              <input
                type="text"
                placeholder="Job title or keyword"
                value={keyword}
                onChange={handleKeywordChange}
                onFocus={() => {
                  if (keyword.trim()) {
                    setShowJobDropdown(true);
                  }
                }}
                className="w-full bg-transparent text-sm text-[#1A2E26] focus:outline-none placeholder:text-gray-700"
              />
            </div>

            {/* Job Suggestions */}
            {showJobDropdown && keyword.trim() && (
              <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl border border-gray-200 shadow-2xl overflow-hidden z-50">
                {suggestedJobs.length > 0 ? (
                  <div className="max-h-[320px] overflow-y-auto">
                    {suggestedJobs.map((job) => (
                      <button
                        key={job._id}
                        type="button"
                        onClick={() => handleJobClick(job)}
                        className="w-full text-left px-4 py-3.5 hover:bg-[#467B23]/5 border-b border-gray-100 last:border-b-0 transition-colors flex items-center justify-between gap-3"
                      >
                        <div className="min-w-0">
                          <p className="font-semibold text-[#1A2E26] text-sm truncate">
                            {job.title}
                          </p>

                          <p className="text-xs text-gray-500 mt-1 truncate">
                            {job.companyName || "BIMB Carebridge"}
                            {job.subcategory?.title
                              ? ` • ${job.subcategory.title}`
                              : ""}
                          </p>
                        </div>

                        <FiArrowRight className="w-4 h-4 text-[#467B23] shrink-0" />
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="px-4 py-5 text-center">
                    <p className="text-sm font-medium text-gray-700">
                      No jobs found
                    </p>

                    <p className="text-xs text-gray-500 mt-1">
                      Try another job title or keyword.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Category */}
          <div className="md:col-span-4 flex items-center gap-3 px-3 py-3 bg-gray-50/80 rounded-2xl border border-gray-300/70 focus-within:border-[#467B23]">
            <FiGrid className="text-gray-700 w-5 h-5 shrink-0" />

            <select
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);

                if (keyword.trim()) {
                  setShowJobDropdown(true);
                }
              }}
              className="w-full bg-transparent text-sm text-[#1A2E26] focus:outline-none cursor-pointer"
            >
              <option value="">All Categories</option>

              {subcategories.map((subcat) => (
                <option
                  key={subcat._id}
                  value={subcat.slug}
                >
                  {subcat.title}
                  {subcat.category?.title
                    ? ` (${subcat.category.title})`
                    : ""}
                </option>
              ))}
            </select>
          </div>


          {/* Search button */}
          <div className="md:col-span-3">
            <button
              type="submit"
              className="w-full bg-[#467B23] hover:bg-[#071610] text-white text-sm font-medium py-3.5 px-6 rounded-2xl transition-colors duration-300 shadow-sm cursor-pointer flex items-center justify-center"
            >
              Search Jobs
            </button>
          </div>
        </form>

        {/* Popular Searches */}
        <div className="flex flex-wrap items-center gap-2.5 mt-4 px-2">
          <span className="text-sm text-[#1A2E26] font-semibold tracking-wide">
            Popular Searches:
          </span>

          {popularTags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => handleTagClick(tag)}
              className="text-sm bg-white/95 hover:bg-white text-[#071610] px-3.5 py-1.5 rounded-xl border border-gray-200 shadow-xs transition-colors cursor-pointer font-medium"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
