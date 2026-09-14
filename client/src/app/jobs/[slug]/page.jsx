'use client';

import { useState, useEffect, useMemo } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  MapPin,
  DollarSign,
  Briefcase,
  ArrowLeft,
  Calendar,
  Clock,
  CheckCircle2,
  Share2,
  Building2,
  Users,
  ChevronRight,
} from "lucide-react";
import jobData from "../../data/sampleJobs.json"; // Adjust path based on your folder structure
import AuthModal from "@/app/components/AuthModal";

// Helper function to turn any title into a clean URL slug consistently
const createSlug = (text) => {
  return text
    .toLowerCase()
    .replace(/[()]/g, "") // Remove parentheses completely
    .replace(/[^a-z0-9]+/g, "-") // Replace spaces/special chars with hyphens
    .replace(/^-+|-+$/g, ""); // Trim extra hyphens
};

export default function JobDetailPage() {
  const params = useParams();
  const rawSlug = params?.slug;
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isApplied, setIsApplied] = useState(false);

  useEffect(() => {
    if (!rawSlug) return;

    // Find the matching job by comparing generated slugs against the URL slug
    const foundJob = (jobData.jobs || []).find(
      (j) => createSlug(j.title) === rawSlug,
    );

    const timer = setTimeout(() => {
      setJob(foundJob || null);
      setLoading(false);
    }, 400);

    return () => clearTimeout(timer);
  }, [rawSlug]);

  const handleApply = (e) => {
    e.preventDefault();
    setIsAuthModalOpen(true);
    // setIsApplied(true);
  }

  // Extract other latest jobs from the same sector/company for the sidebar widget
  const latestJobs = useMemo(() => {
    if (!job) return [];
    return (jobData.jobs || [])
      .filter(
        (j) =>
          j._id !== job._id &&
          (j.sector === job.sector || j.employer === job.employer),
      )
      .slice(0, 5);
  }, [job]);



  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center space-y-4">
          <div className="w-12 h-12 bg-[#01193B]/15 rounded-full"></div>
          <div className="w-48 h-5 bg-[#01193B]/10 rounded"></div>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center px-5">
        <div className="bg-white p-8 sm:p-12 border border-[#01193B]/10 text-center max-w-lg w-full shadow-sm rounded-3xl">
          <div className="w-16 h-16 bg-[#467B23]/10 flex items-center justify-center mx-auto mb-6 rounded-2xl">
            <Briefcase size={28} className="text-[#467B23]" />
          </div>
          <h2 className="text-xl sm:text-2xl font-medium text-[#01193B] mb-3">
            Job Not Found
          </h2>
          <p className="text-[#01193B]/60 text-sm mb-8">
            The position you are looking for might have been removed or the link
            is incorrect.
          </p>
          <Link
            href="/jobs"
            className="bg-[#01193B] hover:bg-[#01193B]/90 text-white px-8 py-3.5 text-xs font-semibold uppercase tracking-wider transition-all inline-block rounded-xl"
          >
            Back to All Positions
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-32 pt-6 sm:pt-12 lg:pt-20">
      <section className="px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24 max-w-[1600px] mx-auto">
        {/* Back Link */}
        <div className="mb-6">
          <Link
            href="/jobs"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#01193B]/60 hover:text-[#467B23] transition-colors"
          >
            <ArrowLeft size={16} /> Back to Open Positions
          </Link>
        </div>



        {/* Top Header Card */}
        <div className=" mb-6 sm:mb-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-[#467B23]/10 text-[#467B23] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider rounded-lg">
                {job.category}
              </span>
              <span className="bg-gray-100 text-[#01193B]/70 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider rounded-lg">
                {job.employmentType}
              </span>
              {job.sector && (
                <span className="bg-[#01193B]/5 text-[#01193B] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider rounded-lg">
                  {job.sector}
                </span>
              )}
            </div>

            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium text-[#01193B] tracking-tight">
              {job.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-1 text-xs sm:text-sm text-[#01193B]/70">
              <span className="flex items-center gap-1.5">
                <MapPin size={15} className="text-[#467B23] shrink-0" />{" "}
                {job.location}
              </span>
              <span className="flex items-center gap-1.5">
                <Building2 size={15} className="text-[#467B23] shrink-0" />{" "}
                {job.company || "Direct Hire"}
              </span>
              <span className="flex items-center gap-1.5 font-bold text-[#467B23]">
                <DollarSign size={15} className="shrink-0" />{" "}
                {job.salary || "Competitive Rate"}
              </span>
            </div>
          </div>

          {/* Desktop Action Buttons */}
          <div className="hidden lg:flex flex-col gap-3 shrink-0 w-60">
            <button
              onClick={handleApply}
              disabled={isApplied}
              className={`px-6 py-4 text-xs font-semibold uppercase tracking-wider transition-all duration-300 shadow-sm text-center rounded-xl ${
                isApplied
                  ? "bg-[#467B23] text-white cursor-default"
                  : "bg-[#01193B] hover:bg-[#01193B]/90 text-white"
              }`}
            >
              {isApplied ? "Application Submitted" : "Apply For This Job"}
            </button>
            <button
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                alert("Job link copied to clipboard!");
              }}
              className="px-6 py-3.5 text-xs font-semibold uppercase tracking-wider bg-[#F8FAFC] border border-[#01193B]/10 hover:border-[#01193B]/30 text-[#01193B] flex items-center justify-center gap-2 transition-all rounded-xl"
            >
              <Share2 size={14} /> Share Position
            </button>
          </div>
        </div>

        {/* Main Body Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-start">
          {/* Left Content Details (Scrollable) */}
          <div className="lg:col-span-2 space-y-6 sm:space-y-8">
            {/* Job Description Card */}
            <div className=" space-y-4 sm:space-y-6">
              <h3 className="text-lg sm:text-xl font-medium text-[#01193B] border-b border-[#01193B]/10 pb-4">
                Job{" "}
                <span className="font-semibold text-[#467B23]">
                  Description
                </span>
              </h3>
              <div className="text-[#01193B]/80 text-sm sm:text-base leading-relaxed space-y-4 font-light whitespace-pre-line">
                {job.description}
              </div>
            </div>

            {/* Requirements Card */}
            {job.requirements && (
              <div className=" space-y-4 sm:space-y-6">
                <h3 className="text-lg sm:text-xl font-medium text-[#01193B] border-b border-[#01193B]/10 pb-4">
                  Key{" "}
                  <span className="font-semibold text-[#467B23]">
                    Requirements
                  </span>
                </h3>
                <ul className="space-y-3">
                  {Array.isArray(job.requirements) ? (
                    job.requirements.map((req, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-3 text-sm sm:text-base text-[#01193B]/80 font-light"
                      >
                        <CheckCircle2
                          size={18}
                          className="text-[#467B23] shrink-0 mt-0.5"
                        />
                        <span>{req}</span>
                      </li>
                    ))
                  ) : (
                    <p className="text-[#01193B]/80 text-sm sm:text-base font-light">
                      {job.requirements}
                    </p>
                  )}
                </ul>
              </div>
            )}

            {/* About Company Card */}
            <div className=" space-y-5">
              <div className="flex items-center justify-between border-b border-[#01193B]/10 pb-4">
                <h3 className="text-lg sm:text-xl font-medium text-[#01193B]">
                  About <span className="font-semibold text-[#467B23]">Company</span>
                </h3>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#467B23]/10 flex items-center justify-center text-[#467B23] font-bold text-lg">
                  {job.sector ? job.sector.charAt(0) : "C"}
                </div>
                <div>
                  <h4 className="font-semibold text-[#01193B] text-base">
                    {job.company || job.sector || "Direct Employer"}
                  </h4>
                  <p className="text-xs text-[#01193B]/50 flex items-center gap-1 mt-0.5">
                    <Users size={13} /> Equal Opportunity Healthcare &
                    Professional Services Provider
                  </p>
                </div>
              </div>
              <p className="text-sm text-[#01193B]/70 font-light leading-relaxed">
                Committed to delivering professional staffing solutions,
                ensuring top-tier working environments, competitive compensation
                structures, and dependable shifts across all operational
                divisions.
              </p>
            </div>
          </div>

          {/* Right Sidebar Details (Fully Sticky including Overview & Latest Jobs) */}
          <div className="space-y-6 lg:sticky lg:top-28">
            {/* Overview Card */}
            <div className="bg-white border border-[#01193B]/10 p-5 sm:p-6 lg:p-8 shadow-sm rounded-3xl space-y-6">
              <h3 className="text-lg font-semibold text-[#01193B] border-b border-[#01193B]/10 pb-4">
                Overview
              </h3>

              <div className="space-y-4 text-sm">
                <div className="flex items-center justify-between py-2 border-b border-gray-100 gap-2">
                  <span className="text-[#01193B]/50 flex items-center gap-2">
                    <Briefcase size={16} className="text-[#467B23]" /> Type
                  </span>
                  <span className="font-semibold text-[#01193B] text-right">
                    {job.employmentType}
                  </span>
                </div>

                <div className="flex items-center justify-between py-2 border-b border-gray-100 gap-2">
                  <span className="text-[#01193B]/50 flex items-center gap-2">
                    <Clock size={16} className="text-[#467B23]" /> Shift
                  </span>
                  <span className="font-semibold text-[#01193B] text-right">
                    {job.shiftDetails || "Standard"}
                  </span>
                </div>

                <div className="flex items-center justify-between py-2 border-b border-gray-100 gap-2">
                  <span className="text-[#01193B]/50 flex items-center gap-2">
                    <MapPin size={16} className="text-[#467B23]" /> Location
                  </span>
                  <span className="font-semibold text-[#01193B] text-right  max-w-[160px]">
                    {job.location}
                  </span>
                </div>

                <div className="flex items-center justify-between py-2">
                  <span className="text-[#01193B]/50 flex items-center gap-2">
                    <Calendar size={16} className="text-[#467B23]" /> Status
                  </span>
                  <span className="font-semibold text-[#467B23]">
                    {job.status}
                  </span>
                </div>
              </div>

              <button
                onClick={handleApply}
                disabled={isApplied}
                className={`w-full py-4 text-xs font-semibold uppercase tracking-wider transition-all duration-300 shadow-sm text-center rounded-xl ${
                  isApplied
                    ? "bg-[#467B23] text-white cursor-default"
                    : "bg-[#01193B] hover:bg-[#01193B]/90 text-white"
                }`}
              >
                {isApplied ? "Application Submitted" : "Apply Now"}
              </button>
            </div>

            {/* Latest Jobs Widget */}
            {latestJobs.length > 0 && (
              <div className="bg-white border border-[#01193B]/10 p-5 sm:p-6 lg:p-8 shadow-sm rounded-3xl space-y-4">
                <div className="border-b border-[#01193B]/10 pb-3 flex items-center justify-between">
                  <h3 className="text-base font-semibold text-[#01193B]">
                    Latest Jobs
                  </h3>
                  <span className="text-[11px] font-semibold text-[#467B23] bg-[#467B23]/10 px-2.5 py-1 rounded-lg">
                    {latestJobs.length} active
                  </span>
                </div>

                <div className="space-y-3.5">
                  {latestJobs.map((otherJob) => (
                    <Link
                      key={otherJob._id}
                      href={`/jobs/${encodeURIComponent(createSlug(otherJob.title))}`}
                      className="group block p-3 rounded-2xl hover:bg-[#F8FAFC] border border-transparent hover:border-[#01193B]/10 transition-all"
                    >
                      <h4 className="text-xs font-semibold text-[#01193B] group-hover:text-[#467B23] transition-colors line-clamp-1">
                        {otherJob.title}
                      </h4>
                      <p className="text-[11px] text-[#01193B]/50 truncate mt-0.5">
                        {otherJob.sector} • {otherJob.location.split(",")[0]}
                      </p>
                    </Link>
                  ))}
                </div>

                <div className="pt-2 border-t border-[#01193B]/10 text-center">
                  <Link
                    href="/jobs"
                    className="text-xs font-bold text-[#467B23] hover:underline inline-flex items-center gap-1 uppercase tracking-wider"
                  >
                    View all available positions <ChevronRight size={14} />
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* MOBILE STICKY BOTTOM ACTION BAR (Hidden on lg screens)     */}
      {/* ========================================================= */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-[#01193B]/10 p-4 px-5 z-50 flex items-center gap-3 shadow-[0_-10px_25px_rgba(0,0,0,0.08)]">
        <button
          onClick={() => {
            navigator.clipboard.writeText(window.location.href);
            alert("Job link copied to clipboard!");
          }}
          className="p-3.5 bg-[#F8FAFC] border border-[#01193B]/10 text-[#01193B] rounded-xl flex items-center justify-center shrink-0 active:scale-95 transition-transform"
          aria-label="Share Job"
        >
          <Share2 size={18} />
        </button>

        <button
          onClick={handleApply}
          disabled={isApplied}
          className={`flex-1 py-3.5 px-4 text-xs font-semibold uppercase tracking-wider rounded-xl transition-all shadow-md text-center ${
            isApplied
              ? "bg-[#467B23] text-white cursor-default"
              : "bg-[#01193B] text-white active:scale-[0.98]"
          }`}
        >
          {isApplied ? "Application Submitted" : "Apply For This Job"}
        </button>
      </div>
      <AuthModal isOpen={isAuthModalOpen}
      onClose={()=>setIsAuthModalOpen(false)}
      initialTab="signup"/>
    </div>
  );
}