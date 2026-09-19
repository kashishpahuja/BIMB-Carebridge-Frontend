"use client";

import { useContext, useMemo, useState } from "react";
import Link from "next/link";
import {
  FiMapPin,
  FiArrowRight,
  FiDollarSign,
  FiBriefcase,
  FiClock,
} from "react-icons/fi";
import { JobDataContext } from "../context/JobDataContext";

export default function FeaturedJobs() {
  const { jobs, subcategories } = useContext(JobDataContext);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");

  // Categories come from backend subcategories
  const categories = useMemo(() => {
    const categoryMap = new Map();

    subcategories.forEach((subcat) => {
      if (subcat?.category?._id) {
        categoryMap.set(subcat.category._id, {
          id: subcat.category._id,
          title: subcat.category.title,
        });
      }
    });

    return Array.from(categoryMap.values());
  }, [subcategories]);

  // Show subcategories belonging to selected category
  const categorySubcategories = useMemo(() => {
    if (!selectedCategory) return [];

    return subcategories.filter(
      (subcat) => subcat.category?._id === selectedCategory
    );
  }, [subcategories, selectedCategory]);

  // Filter jobs from backend data
  const displayJobs = useMemo(() => {
    return jobs
      .filter((job) => job?.status === "PUBLISHED")
      .filter((job) => {
        if (
          selectedCategory &&
          job.category?._id !== selectedCategory
        ) {
          return false;
        }

        if (
          selectedSubcategory &&
          job.subcategory?._id !== selectedSubcategory
        ) {
          return false;
        }

        return true;
      })
      .slice(0, 8);
  }, [jobs, selectedCategory, selectedSubcategory]);

  const handleCategoryClick = (categoryId) => {
    if (selectedCategory === categoryId) {
      setSelectedCategory("");
      setSelectedSubcategory("");
      return;
    }

    setSelectedCategory(categoryId);
    setSelectedSubcategory("");
  };

  const handleSubcategoryClick = (subcategoryId) => {
    setSelectedSubcategory((current) =>
      current === subcategoryId ? "" : subcategoryId
    );
  };

  const formatJobType = (type) => {
    if (!type) return "";

    return type
      .toLowerCase()
      .split("_")
      .map(
        (word) => word.charAt(0).toUpperCase() + word.slice(1)
      )
      .join(" ");
  };

  const formatWorkMode = (mode) => {
    if (!mode) return "";

    return mode.charAt(0) + mode.slice(1).toLowerCase();
  };

  const formatSalary = (salary) => {
    if (!salary) return "Competitive";

    const { min, max, currency, period } = salary;

    if (!min && !max) return "Competitive";

    const formatAmount = (amount) =>
      new Intl.NumberFormat("en-CA", {
        maximumFractionDigits: 0,
      }).format(amount);

    let amount = "";

    if (min && max) {
      amount = `${formatAmount(min)} - ${formatAmount(max)}`;
    } else if (min) {
      amount = `${formatAmount(min)}+`;
    } else if (max) {
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

  const getPostedTime = (createdAt) => {
    if (!createdAt) return "";

    const createdDate = new Date(createdAt);
    const now = new Date();

    const difference = now - createdDate;
    const days = Math.floor(
      difference / (1000 * 60 * 60 * 24)
    );

    if (days <= 0) {
      const hours = Math.floor(
        difference / (1000 * 60 * 60)
      );

      if (hours <= 0) {
        return "Posted just now";
      }

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

  return (
    <section className="py-24">
      <div className="px-5 md:px-12 lg:px-24 xl:px-40">

        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4">
          <div>
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-2xl bg-[#467B23]/10 text-[#467B23] text-sm font-semibold tracking-wider uppercase mb-3">
              <FiBriefcase size={14} />
              Open Positions
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium text-[#01193B] tracking-tight">
              Featured{" "}
              <span className="font-semibold text-[#467B23]">
                Job Offers
              </span>
            </h2>

            <p className="text-[#01193B]/70 text-sm sm:text-base mt-2">
              Explore our latest job opportunities.
            </p>
          </div>

          <Link
            href="/jobs"
            className="inline-flex items-center gap-2 bg-[#01193B] hover:bg-[#01193B]/90 text-white px-7 py-3 rounded-2xl text-xs font-semibold tracking-wider uppercase transition-all duration-300 group"
          >
            All Offers

            <FiArrowRight
              size={14}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>

        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-4">
          <button
            type="button"
            onClick={() => {
              setSelectedCategory("");
              setSelectedSubcategory("");
            }}
            className={`px-5 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider whitespace-nowrap transition-all ${
              !selectedCategory
                ? "bg-[#01193B] text-white"
                : "text-[#01193B]/70 hover:bg-[#01193B]/5"
            }`}
          >
            All
          </button>

          {categories.map((category) => (
            <button
              key={category.id}
              type="button"
              onClick={() =>
                handleCategoryClick(category.id)
              }
              className={`px-5 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider whitespace-nowrap transition-all ${
                selectedCategory === category.id
                  ? "bg-[#01193B] text-white"
                  : "text-[#01193B]/70 hover:bg-[#01193B]/5"
              }`}
            >
              {category.title}
            </button>
          ))}
        </div>

        {/* Subcategories */}
        {selectedCategory &&
          categorySubcategories.length > 0 && (
            <div className="flex gap-2 overflow-x-auto pb-2 mb-10">
              {categorySubcategories.map((subcat) => (
                <button
                  key={subcat._id}
                  type="button"
                  onClick={() =>
                    handleSubcategoryClick(subcat._id)
                  }
                  className={`px-4 py-2 rounded-lg text-xs font-medium whitespace-nowrap border transition-all ${
                    selectedSubcategory === subcat._id
                      ? "bg-[#467B23] text-white border-[#467B23]"
                      : "bg-white text-[#01193B]/70 border-[#01193B]/10 hover:border-[#467B23]/40"
                  }`}
                >
                  {subcat.title}
                </button>
              ))}
            </div>
          )}

        {/* Jobs */}
        {displayJobs.length === 0 ? (
          <div className="bg-white p-10 rounded-3xl text-center border border-[#01193B]/10 max-w-lg mx-auto">
            <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-[#467B23]/10 flex items-center justify-center">
              <FiBriefcase
                size={24}
                className="text-[#467B23]"
              />
            </div>

            <p className="text-[#01193B]/70 text-sm">
              No jobs available for this selection.
            </p>

            <button
              type="button"
              onClick={() => {
                setSelectedCategory("");
                setSelectedSubcategory("");
              }}
              className="mt-5 bg-[#467B23] hover:bg-[#3b681d] text-white px-6 py-3 rounded-xl text-sm font-semibold transition-all"
            >
              View All Jobs
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {displayJobs.map((job) => {
              const location = [
                job?.location?.city,
                job?.location?.state,
              ]
                .filter(Boolean)
                .join(", ");

              return (
                <div
                  key={job._id}
                  className="bg-white p-6 rounded-3xl border border-[#01193B]/10 hover:border-[#467B23]/40 hover:shadow-xl shadow-sm flex flex-col justify-between transition-all duration-300 group hover:-translate-y-1"
                >
                  <div className="space-y-3">

                    {/* Category */}
                    <div className="flex justify-between items-start gap-3">
                      <span className="bg-[#467B23]/10 text-[#467B23] px-3 py-1 rounded-2xl text-[11px] font-semibold capitalize">
                        {job.category?.title}
                      </span>
                    </div>

                    {/* Job title */}
                    <h3 className="font-semibold text-base text-[#01193B] line-clamp-2">
                      {job.title}
                    </h3>

                    {/* Company */}
                    <p className="text-xs font-medium text-[#01193B]/60">
                      {job.companyName}
                    </p>

                    {/* Location */}
                    {location && (
                      <p className="text-sm text-[#01193B]/60 flex items-center gap-1.5">
                        <FiMapPin
                          size={13}
                          className="text-[#467B23] shrink-0"
                        />

                        <span className="line-clamp-1">
                          {location}
                        </span>
                      </p>
                    )}

                    {/* Job type + work mode */}
                    <div className="flex flex-wrap gap-2">
                      {job.jobType && (
                        <span className="inline-flex items-center gap-1.5 bg-[#01193B]/5 text-[#01193B]/70 px-2.5 py-1.5 rounded-lg text-[10px] font-semibold">
                          <FiBriefcase size={11} />
                          {formatJobType(job.jobType)}
                        </span>
                      )}

                      {job.workMode && (
                        <span className="inline-flex items-center gap-1.5 bg-[#01193B]/5 text-[#01193B]/70 px-2.5 py-1.5 rounded-lg text-[10px] font-semibold">
                          <FiClock size={11} />
                          {formatWorkMode(job.workMode)}
                        </span>
                      )}
                    </div>

                    {/* Posted time */}
                    <p className="text-xs text-[#01193B]/50">
                      {getPostedTime(job.createdAt)}
                    </p>
                  </div>

                  {/* Bottom */}
                  <div className="pt-6 mt-6 border-t border-[#01193B]/10">

                    {/* Salary */}
                    <div className="flex items-center justify-between gap-3 mb-4">
                      <span className="text-xs font-bold text-[#467B23] flex items-center gap-1">
                        <FiDollarSign size={13} />

                        <span className="line-clamp-1">
                          {formatSalary(job.salary)}
                        </span>
                      </span>
                    </div>

                    {/* View job */}
                    <Link
                      href={`/jobs/${job.slug || job._id}`}
                      className="w-full inline-flex items-center justify-center gap-2 bg-[#467B23]/10 hover:bg-[#467B23] text-[#467B23] hover:text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300"
                    >
                      View Job

                      <FiArrowRight
                        size={14}
                        className="transition-transform group-hover:translate-x-1"
                      />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}