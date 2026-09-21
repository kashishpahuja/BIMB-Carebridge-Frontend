"use client";

import { useContext, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  FiMapPin,
  FiDollarSign,
  FiSearch,
  FiBriefcase,
  FiFilter,
  FiX,
  FiClock,
} from "react-icons/fi";
import { JobDataContext } from "../context/JobDataContext";

export default function JobsPage() {
  const searchParams = useSearchParams();

  const categoryParam = searchParams.get("category");
  const subcategoryParam = searchParams.get("subcategory");

  const { jobs, subcategories: allSubcategories } = useContext(JobDataContext);

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [locationQuery, setLocationQuery] = useState("");

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedSubcategory, setSelectedSubcategory] =
    useState("All");
  const [selectedType, setSelectedType] = useState("All");

  /*
   * Only published jobs.
   */
  const publishedJobs = useMemo(() => {
    return jobs.filter((job) => job?.status === "PUBLISHED");
  }, [jobs]);

  /*
   * Categories from actual backend data.
   */
  const categories = useMemo(() => {
    const values = publishedJobs
      .map((job) => job?.category?.title)
      .filter(Boolean);

    return ["All", ...new Set(values)];
  }, [publishedJobs]);

  /*
   * All subcategories from actual backend data.
   */
const subcategories = useMemo(() => {
  const values = publishedJobs
    .map((job) => job?.subcategory?.title)
    .filter(Boolean);

  return ["All", ...new Set(values)];
}, [publishedJobs]);

  /*
   * Employment types from actual backend data.
   */
  const employmentTypes = useMemo(() => {
    const values = publishedJobs
      .map((job) => job?.jobType)
      .filter(Boolean);

    return ["All", ...new Set(values)];
  }, [publishedJobs]);

  /*
   * Convert text to a URL/search-friendly value.
   *
   * Example:
   * "Registered Nurses (RN)"
   * becomes:
   * "registered-nurses-rn"
   */
  const normalizeValue = (value = "") => {
    return decodeURIComponent(value)
      .replace(/\+/g, " ")
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };


useEffect(() => {
  if (
    selectedCategory === "All" ||
    selectedSubcategory === "All"
  ) {
    return;
  }

  const exists = allSubcategories.some(
    (subcat) =>
      subcat?.title === selectedSubcategory &&
      subcat?.category?.title === selectedCategory
  );

  if (!exists) {
    setSelectedSubcategory("All");
  }
}, [
  selectedCategory,
  selectedSubcategory,
  allSubcategories,
]);


  const availableSubcategories = useMemo(() => {
  if (selectedCategory === "All") {
    const values = allSubcategories
      .map((subcat) => subcat?.title)
      .filter(Boolean);

    return ["All", ...new Set(values)];
  }

  const values = publishedJobs
    .filter(
      (job) =>
        job?.category?.title === selectedCategory
    )
    .map((job) => job?.subcategory?.title)
    .filter(Boolean);

  return ["All", ...new Set(values)];
}, [
  publishedJobs,
  selectedCategory,
  allSubcategories,
]);

  // const availableSubcategories = useMemo(() => {
  //   if (selectedCategory === "All") {
  //     return allSubcategories;
  //   }

  //   const values = publishedJobs
  //     .filter(
  //       (job) =>
  //         job?.category?.title === selectedCategory
  //     )
  //     .map((job) => job?.subcategory?.title)
  //     .filter(Boolean);

  //   return ["All", ...new Set(values)];
  // }, [
  //   publishedJobs,
  //   selectedCategory,
  //   allSubcategories,
  // ]);

  const filteredJobs = useMemo(() => {
    const search = searchQuery.trim().toLowerCase();
    const location = locationQuery.trim().toLowerCase();

    return publishedJobs.filter((job) => {
      /*
       * Search EVERYTHING returned by backend.
       */
      const searchableJob = JSON.stringify(job)
        .toLowerCase();

      const matchesSearch =
        !search || searchableJob.includes(search);


      const locationSource = [
        job?.location?.city,
        job?.location?.state,
        job?.location?.country,
        job?.location?.address,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const matchesLocation =
        !location ||
        locationSource.includes(location);

      /*
       * Category.
       */
      const matchesCategory =
        selectedCategory === "All" ||
        job?.category?.title === selectedCategory;

      /*
       * Subcategory.
       */
      const matchesSubcategory =
        selectedSubcategory === "All" ||
        job?.subcategory?.title ===
          selectedSubcategory;

      /*
       * Employment type.
       */
      const matchesType =
        selectedType === "All" ||
        job?.jobType === selectedType;

      return (
        matchesSearch &&
        matchesLocation &&
        matchesCategory &&
        matchesSubcategory &&
        matchesType
      );
    });
  }, [
    publishedJobs,
    searchQuery,
    locationQuery,
    selectedCategory,
    selectedSubcategory,
    selectedType,
  ]);

  /*
   * Reset filters.
   */
  const resetFilters = () => {
    setSearchQuery("");
    setLocationQuery("");
    setSelectedCategory("All");
    setSelectedSubcategory("All");
    setSelectedType("All");
  };


  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setSelectedSubcategory("All");
  };

  /*
   * Subcategory click.
   */
  const handleSubcategoryClick = (subcategory) => {
    setSelectedSubcategory(subcategory);
  };

  /*
   * Employment type click.
   */
  const handleTypeClick = (type) => {
    setSelectedType(type);
  };

  /*
   * Mobile filter badge.
   */
  const activeFilterCount =
    (searchQuery ? 1 : 0) +
    (locationQuery ? 1 : 0) +
    (selectedCategory !== "All" ? 1 : 0) +
    (selectedSubcategory !== "All" ? 1 : 0) +
    (selectedType !== "All" ? 1 : 0);

  /*
   * FULL_TIME -> Full Time
   */
  const formatJobType = (type) => {
    if (!type) return "";

    return type
      .toLowerCase()
      .split("_")
      .map(
        (word) =>
          word.charAt(0).toUpperCase() +
          word.slice(1)
      )
      .join(" ");
  };

  /*
   * ONSITE -> Onsite
   */
  const formatWorkMode = (mode) => {
    if (!mode) return "";

    return (
      mode.charAt(0) +
      mode.slice(1).toLowerCase()
    );
  };

  /*
   * Format backend salary object.
   */
  const formatSalary = (salary) => {
    if (!salary) return "Competitive";

    const {
      min,
      max,
      currency,
      period,
    } = salary;

    if (!min && !max) {
      return "Competitive";
    }

    const formatAmount = (amount) =>
      new Intl.NumberFormat("en-CA", {
        maximumFractionDigits: 0,
      }).format(amount);

    let amount = "";

    if (min && max) {
      amount = `${formatAmount(min)} - ${formatAmount(
        max
      )}`;
    } else if (min) {
      amount = `${formatAmount(min)}+`;
    } else {
      amount = `Up to ${formatAmount(max)}`;
    }

    const periodText = {
      YEARLY: "/ year",
      MONTHLY: "/ month",
      WEEKLY: "/ week",
      HOURLY: "/ hour",
    };

    return `${currency || "CAD"} ${amount} ${
      periodText[period] || ""
    }`;
  };

  /*
   * Posted time from createdAt.
   */
  const getPostedTime = (createdAt) => {
    if (!createdAt) return "";

    const createdDate = new Date(createdAt);
    const now = new Date();

    const difference = now - createdDate;

    if (difference < 0) {
      return "Posted recently";
    }

    const hours = Math.floor(
      difference / (1000 * 60 * 60)
    );

    const days = Math.floor(
      difference / (1000 * 60 * 60 * 24)
    );

    if (hours < 1) {
      return "Posted just now";
    }

    if (hours < 24) {
      return `Posted ${hours} ${
        hours === 1 ? "hour" : "hours"
      } ago`;
    }

    if (days < 7) {
      return `Posted ${days} ${
        days === 1 ? "day" : "days"
      } ago`;
    }

    const weeks = Math.floor(days / 7);

    if (weeks < 4) {
      return `Posted ${weeks} ${
        weeks === 1 ? "week" : "weeks"
      } ago`;
    }

    const months = Math.floor(days / 30);

    return `Posted ${months} ${
      months === 1 ? "month" : "months"
    } ago`;
  };

useEffect(() => {
  if (!subcategoryParam && !categoryParam) return;

  if (subcategoryParam) {
    const urlSubcategory = normalizeValue(subcategoryParam);

    const matchedSubcategory = allSubcategories.find((subcat) => {
      const slug = normalizeValue(subcat?.slug);
      const title = normalizeValue(subcat?.title);

      return (
        slug === urlSubcategory ||
        title === urlSubcategory ||
        slug.startsWith(urlSubcategory) ||
        urlSubcategory.startsWith(slug) ||
        urlSubcategory.includes(title)
      );
    });

    if (matchedSubcategory) {
      // Select the CATEGORY of the clicked subcategory
      if (matchedSubcategory.category?.title) {
        setSelectedCategory(matchedSubcategory.category.title);
      }

      // Important: don't restrict to the clicked subcategory
      setSelectedSubcategory("All");

      return;
    }
  }

  if (categoryParam) {
    const urlCategory = normalizeValue(categoryParam);

    const matchedCategory = allSubcategories.find((subcat) => {
      const categoryTitle = normalizeValue(
        subcat?.category?.title
      );

      return (
        categoryTitle === urlCategory ||
        categoryTitle.includes(urlCategory) ||
        urlCategory.includes(categoryTitle)
      );
    });

    if (matchedCategory?.category?.title) {
      setSelectedCategory(matchedCategory.category.title);
      setSelectedSubcategory("All");
    }
  }
}, [
  categoryParam,
  subcategoryParam,
  allSubcategories,
]);

  /*
   * Shared filter UI.
   */
  const renderFilterContent  = () => (
    <div className="space-y-8">
      {/* Keyword Search */}
      <div>
        <label className="text-xs font-bold text-[#01193B]/50 uppercase tracking-wider mb-3 block">
          Keyword / Job Title
        </label>

        <div className="flex items-center bg-[#F8FAFC] px-4 py-3.5 border border-[#01193B]/10 focus-within:border-[#467B23]/50 transition-all">
          <FiSearch
            className="text-[#01193B]/40 shrink-0 mr-3"
            size={20}
          />

          <input
            type="text"
            placeholder="Search anything..."
            className="bg-transparent border-none outline-none w-full text-[#01193B] placeholder:text-[#01193B]/40 text-sm lg:text-base"
            value={searchQuery}
            onChange={(e) =>
              setSearchQuery(e.target.value)
            }
          />
        </div>
      </div>

      {/* Location */}
      <div>
        <label className="text-xs font-bold text-[#01193B]/50 uppercase tracking-wider mb-3 block">
          Location
        </label>

        <div className="flex items-center bg-[#F8FAFC] px-4 py-3.5 border border-[#01193B]/10 focus-within:border-[#467B23]/50 transition-all">
          <FiMapPin
            className="text-[#01193B]/40 shrink-0 mr-3"
            size={20}
          />

          <input
            type="text"
            placeholder="City, province, country..."
            className="bg-transparent border-none outline-none w-full text-[#01193B] placeholder:text-[#01193B]/40 text-sm lg:text-base"
            value={locationQuery}
            onChange={(e) =>
              setLocationQuery(e.target.value)
            }
          />
        </div>
      </div>

      {/* Category */}
      <div>
        <label className="text-xs font-bold text-[#01193B]/50 uppercase tracking-wider mb-3 block">
          Job Category
        </label>

        <div className="flex flex-wrap gap-2">
          {categories.map((category) => {
            const isSelected =
              selectedCategory === category;

            return (
              <button
                key={category}
                type="button"
                onClick={() =>
                  handleCategoryClick(category)
                }
                className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all border ${
                  isSelected
                    ? "bg-[#01193B] text-white border-[#01193B]"
                    : "bg-white text-[#01193B]/70 border-[#01193B]/10 hover:border-[#01193B]/30"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>
      </div>

      {/* Subcategory */}


 {availableSubcategories.length > 1 && (
        <div>
          <label className="text-xs font-bold text-[#01193B]/50 uppercase tracking-wider mb-3 block">
            Job Subcategory
          </label>

          <div className="flex flex-wrap gap-2">
            {availableSubcategories.map(
              (subcategory) => {
                const isSelected =
                  selectedSubcategory ===
                  subcategory;

                return (
                  <button
                    key={subcategory}
                    type="button"
                    onClick={() =>
                      handleSubcategoryClick(
                        subcategory
                      )
                    }
                    className={`px-4 py-2  rounded-xl text-xs font-semibold uppercase tracking-wider transition-all border ${
                      isSelected
                        ? "bg-[#467B23] text-white border-[#467B23]"
                        : "bg-white text-[#01193B]/70 border-[#01193B]/10 hover:border-[#467B23]/40"
                    }`}
                  >
                    {subcategory}
                  </button>
                );
              }
            )}
          </div>
        </div>
      )} 

      {/* Employment Type */}
      <div>
        <label className="text-xs font-bold text-[#01193B]/50 uppercase tracking-wider mb-3 block">
          Employment Type
        </label>

        <div className="flex flex-wrap gap-2">
          {employmentTypes.map((type) => {
            const isSelected =
              selectedType === type;

            return (
              <button
                key={type}
                type="button"
                onClick={() =>
                  handleTypeClick(type)
                }
                className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all border ${
                  isSelected
                    ? "bg-[#467B23] text-white border-[#467B23]"
                    : "bg-white text-[#01193B]/70 border-[#01193B]/10 hover:border-[#01193B]/30"
                }`}
              >
                {type === "All"
                  ? "All"
                  : formatJobType(type)}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );


  const loading = jobs.length === 0;

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24 relative pt-12 md:pt-20 lg:pt-24">
      <section className="px-5 md:px-12 lg:px-16 xl:px-24 2xl:px-40 max-w-[1920px] mx-auto">
        <div className="flex flex-col lg:flex-row gap-8 xl:gap-12 relative">

          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-72 xl:w-80 shrink-0">
            <div className="sticky top-28 bg-white p-6 border border-[#01193B]/10 shadow-sm flex flex-col max-h-[85vh] overflow-y-auto hide-scrollbar">

              <div className="flex items-center justify-between mb-8 shrink-0">
                <h3 className="font-semibold text-[#01193B] flex items-center gap-2 text-lg">
                  <FiFilter
                    size={18}
                    className="text-[#467B23]"
                  />
                  Filters
                </h3>

                {activeFilterCount > 0 && (
                  <button
                    type="button"
                    onClick={resetFilters}
                    className="text-xs font-bold text-[#01193B]/50 hover:text-[#467B23] uppercase tracking-wider flex items-center gap-1 transition-colors"
                  >
                    <FiX size={14} />
                    Clear
                  </button>
                )}
              </div>

              <div className="flex-1">
          {renderFilterContent()}
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 min-w-0">

            {/* Header */}
            <div className="mb-8 pb-4 flex flex-col md:flex-row md:items-end justify-between border-b border-[#01193B]/10 gap-4">
              <div>
                <h1 className="text-3xl font-medium text-[#01193B] tracking-tight mb-2">
                  Open{" "}
                  <span className="font-semibold text-[#467B23]">
                    Positions
                  </span>
                </h1>

                <p className="text-[#01193B]/70 text-sm">
                  Showing{" "}
                  <span className="font-semibold text-[#01193B]">
                    {filteredJobs.length}
                  </span>{" "}
                  active jobs
                </p>
              </div>
            </div>

            {/* Loading */}
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map(
                  (skeleton) => (
                    <div
                      key={skeleton}
                      className="bg-white p-6 rounded-3xl border border-[#01193B]/5 h-56 animate-pulse"
                    >
                      <div className="space-y-4">
                        <div className="w-20 h-6 bg-gray-200" />
                        <div className="w-3/4 h-5 bg-gray-200 rounded-lg" />
                        <div className="w-1/3 h-4 bg-gray-200 rounded-lg" />
                        <div className="w-full h-10 bg-gray-200 rounded-lg" />
                      </div>
                    </div>
                  )
                )}
              </div>
            ) : filteredJobs.length === 0 ? (
              /* Empty State */
              <div className="bg-white p-12 lg:p-16 rounded-3xl text-center border border-[#01193B]/10 shadow-sm w-full mx-auto">
                <div className="w-20 h-20 bg-[#467B23]/10 flex items-center justify-center mx-auto mb-6">
                  <FiBriefcase
                    size={32}
                    className="text-[#467B23]"
                  />
                </div>

                <h3 className="text-xl lg:text-2xl font-medium text-[#01193B] mb-3">
                  No jobs found
                </h3>

                <p className="text-[#01193B]/60 mb-8 text-sm lg:text-base max-w-md mx-auto">
                  We couldn&apos;t find any positions
                  matching your current filters. Try
                  adjusting your search criteria.
                </p>

                <button
                  type="button"
                  onClick={resetFilters}
                  className="bg-[#467B23] hover:bg-[#3b681d] text-white px-8 py-3.5 text-sm font-semibold uppercase tracking-wider transition-all shadow-sm cursor-pointer inline-flex"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              /* Job Grid */
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredJobs.map((job) => {
                  const locationText = [
                    job?.location?.city,
                    job?.location?.state,
                    job?.location?.country,
                  ]
                    .filter(Boolean)
                    .join(", ");

                  return (
                    <div
                      key={job._id || job.slug}
                      className="bg-white p-6 rounded-3xl border border-[#01193B]/10 hover:border-[#467B23]/40 hover:shadow-xl shadow-sm flex flex-col justify-between transition-all duration-300 group hover:-translate-y-1"
                    >
                      <div className="space-y-3">

                        {/* Category + Type */}
                        <div className="flex justify-between items-start gap-2">
                          <span className="bg-[#467B23]/10 capitalize text-[#467B23] px-3 py-1.5 rounded-xl text-[11px] font-semibold inline-block line-clamp-1">
                            {job?.category?.title || "Job"}
                          </span>

                          {job?.jobType && (
                            <span className="text-[11px] font-medium text-[#01193B]/50 bg-gray-100 px-2.5 py-1.5 rounded-xl shrink-0">
                              {formatJobType(
                                job.jobType
                              )}
                            </span>
                          )}
                        </div>

                        {/* Title */}
                        <h3 className="font-semibold text-lg capitalize text-[#01193B] transition-colors line-clamp-2 pt-2">
                          {job?.title}
                        </h3>

                        {/* Company */}
                        <p className="text-sm font-medium capitalize text-[#01193B]/60">
                          {job?.companyName}
                        </p>

                        {/* Location */}
                        {locationText && (
                          <p className="text-sm text-[#01193B]/60 flex items-center gap-1.5">
                            <FiMapPin
                              size={14}
                              className="text-[#467B23] shrink-0"
                            />

                            <span className="capitalize">
                              {locationText}
                            </span>
                          </p>
                        )}

                        {/* Subcategory + Work Mode */}
                        <div className="flex flex-wrap gap-2">
                          {job?.subcategory?.title && (
                            <span className="text-[10px] capitalize font-semibold bg-[#01193B]/5 text-[#01193B]/70 px-2.5 py-1.5 rounded-lg">
                              {job.subcategory.title}
                            </span>
                          )}

                          {job?.workMode && (
                            <span className="inline-flex capitalize items-center gap-1.5 bg-[#01193B]/5 text-[#01193B]/70 px-2.5 py-1.5 rounded-lg text-[10px] font-semibold">
                              <FiClock size={11} />
                              {formatWorkMode(
                                job.workMode
                              )}
                            </span>
                          )}
                        </div>

                        {/* Posted */}
                        <p className="text-xs text-[#01193B]/50">
                          {getPostedTime(
                            job?.createdAt
                          )}
                        </p>
                      </div>

                      {/* Bottom */}
                      <div className="pt-6 mt-6 border-t border-[#01193B]/10 flex flex-col gap-4">

                        <div className="flex flex-col gap-1">
                          <span className="text-sm font-bold text-[#467B23] flex items-center gap-1">
                            <FiDollarSign size={14} />

                            {formatSalary(
                              job?.salary
                            )}
                          </span>

                        </div>

                        <Link
                          href={`/jobs/${
                            job?.slug || job?._id
                          }`}
                          className="border border-[#01193B] text-[#01193B] hover:bg-[#01193B]/90 hover:text-white px-5 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-300 w-full text-center shadow-sm"
                        >
                          View Details & Apply
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Mobile Filter Button */}
      <div className="lg:hidden fixed bottom-6 left-0 right-0 px-5 flex justify-center z-40 pointer-events-none">
        <button
          type="button"
          onClick={() => setIsFilterOpen(true)}
          className="pointer-events-auto bg-[#01193B] hover:bg-[#022454] text-white px-8 py-4 shadow-2xl flex items-center gap-3 transition-transform duration-300 hover:scale-105"
        >
          <FiFilter size={18} />

          <span className="font-semibold tracking-wider text-sm uppercase">
            Filters
          </span>

          {activeFilterCount > 0 && (
            <span className="bg-[#467B23] text-white w-6 h-6 flex items-center justify-center text-xs font-bold ml-1">
              {activeFilterCount}
            </span>
          )}
        </button>
      </div>

      {/* Mobile Backdrop */}
      <div
        className={`lg:hidden fixed inset-0 bg-[#01193B]/40 backdrop-blur-sm z-50 transition-opacity duration-300 ${
          isFilterOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsFilterOpen(false)}
      />

      {/* Mobile Drawer */}
      <div
        className={`lg:hidden fixed bottom-0 left-0 right-0 h-[80vh] bg-white z-[60] rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.15)] flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
          isFilterOpen
            ? "translate-y-0"
            : "translate-y-full"
        }`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#01193B]/10 shrink-0">
          <h2 className="text-xl font-bold text-[#01193B]">
            Search & Filters
          </h2>

          <button
            type="button"
            onClick={() => setIsFilterOpen(false)}
            className="w-8 h-8 flex items-center justify-center bg-[#F8FAFC] hover:bg-gray-200 text-[#01193B] transition-colors"
          >
            <FiX size={18} />
          </button>
        </div>

        {/* Drawer Content */}
        <div className="flex-1 overflow-y-auto p-6">
        {renderFilterContent()}
        </div>

        {/* Drawer Footer */}
        <div className="p-6 border-t border-[#01193B]/10 bg-white flex items-center gap-4 shrink-0 pb-10">
          <button
            type="button"
            onClick={resetFilters}
            className="w-1/3 py-4 text-sm font-semibold uppercase tracking-wider text-[#01193B] bg-[#F8FAFC] hover:bg-gray-200 transition-colors"
          >
            Clear All
          </button>

          <button
            type="button"
            onClick={() => setIsFilterOpen(false)}
            className="w-2/3 py-4 text-sm font-semibold uppercase tracking-wider text-white bg-[#467B23] hover:bg-[#3b681d] shadow-lg transition-colors flex justify-center items-center gap-2"
          >
            View {filteredJobs.length} Jobs
          </button>
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
            .hide-scrollbar::-webkit-scrollbar {
              display: none;
            }

            .hide-scrollbar {
              -ms-overflow-style: none;
              scrollbar-width: none;
            }
          `,
        }}
      />
    </div>
  );
}

