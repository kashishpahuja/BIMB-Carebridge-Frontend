"use client";

import {
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
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
  Globe,
  Award,
} from "lucide-react";

import AuthModal from "@/app/components/AuthModal";
import { JobDataContext } from "@/app/context/JobDataContext";

export default function JobDetailPage() {
  const params = useParams();
  const rawSlug = params?.slug;

const {
  jobs,
  getJobBySlug,
  user,
  isAuthenticated,
} = useContext(JobDataContext);

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isApplied, setIsApplied] = useState(false);

  /*
   * Fetch complete job details using slug.
   */
  useEffect(() => {
    if (!rawSlug) return;

    let isMounted = true;

    const fetchJob = async () => {
      setLoading(true);

      const foundJob = await getJobBySlug(rawSlug);

      if (isMounted) {
        setJob(foundJob);
        setLoading(false);
      }
    };

    fetchJob();

    return () => {
      isMounted = false;
    };
  }, [rawSlug, getJobBySlug]);

  const handleApply = (e) => {
    e.preventDefault();
    setIsAuthModalOpen(true);
    if(!isAuthenticated){
      setIsAuthModalOpen(true);
      return;
    }

    // handleJobApplication()
  };

  /*
   * Latest jobs:
   * - Exclude current job
   * - Prefer jobs from the same category
   * - Sort newest first
   * - Maximum 5 jobs
   */
  const latestJobs = useMemo(() => {
    if (!job || !jobs?.length) return [];

    const currentCategoryId = job?.category?._id;
    const currentCategoryTitle = job?.category?.title;

    return jobs
      .filter((j) => {
        if (!j || j.slug === job.slug) return false;

        const sameCategory =
          (currentCategoryId &&
            j?.category?._id === currentCategoryId) ||
          (currentCategoryTitle &&
            j?.category?.title === currentCategoryTitle);

        return sameCategory;
      })
      .sort(
        (a, b) =>
          new Date(b?.createdAt || 0) -
          new Date(a?.createdAt || 0)
      )
      .slice(0, 5);
  }, [jobs, job]);

  /*
   * Format location.
   */
  const locationText = useMemo(() => {
    if (!job) return "";

    if (
      typeof job.location === "object" &&
      job.location !== null
    ) {
      return [
        job.location.city,
        job.location.state,
        job.location.country,
      ]
        .filter(Boolean)
        .join(", ");
    }

    return job.location || "";
  }, [job]);

  /*
   * Format salary.
   */
  const salaryText = useMemo(() => {
    if (!job) return "Competitive Rate";

    if (
      typeof job.salary === "object" &&
      job.salary !== null
    ) {
      const currency = job.salary.currency || "INR";

      const min = job.salary.min
        ? `${currency} ${job.salary.min.toLocaleString()}`
        : "";

      const max = job.salary.max
        ? `${job.salary.max.toLocaleString()}`
        : "";

      const salaryRange = min && max
        ? `${min} - ${max}`
        : min || max;

      const period = job.salary.period
        ? job.salary.period.toLowerCase()
        : "year";

      return salaryRange
        ? `${salaryRange} / ${period}`
        : "Competitive Rate";
    }

    return job.salary || "Competitive Rate";
  }, [job]);



  const experienceText = useMemo(() => {
  if (!job?.experience) return "Not specified";

  const { min, max } = job.experience;

  if (min && max) {
    return `${min} - ${max} years`;
  }

  if (min) {
    return `${min}+ years`;
  }

  if (max) {
    return `Up to ${max} years`;
  }

  return "Not specified";
}, [job]);

const fullAddress = useMemo(() => {
  if (!job?.location) return "Not specified";

  if (typeof job.location === "object") {
    return (
      job.location.address ||
      [
        job.location.city,
        job.location.state,
        job.location.country,
      ]
        .filter(Boolean)
        .join(", ") ||
      "Not specified"
    );
  }

  return job.location;
}, [job]);

const applicationDeadline = useMemo(() => {
  if (!job?.applicationDeadline) return "Not specified";

  return new Date(job.applicationDeadline).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );
}, [job]);

const postedDate = useMemo(() => {
  if (!job?.createdAt) return "Not specified";

  return new Date(job.createdAt).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );
}, [job]);

const updatedDate = useMemo(() => {
  if (!job?.updatedAt) return "Not specified";

  return new Date(job.updatedAt).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );
}, [job]);

const benefits = useMemo(
  () => [...new Set((job?.benefits || []).filter(Boolean))],
  [job]
);

const education = useMemo(
  () => [...new Set((job?.education || []).filter(Boolean))],
  [job]
);

const responsibilities = useMemo(
  () =>
    [...new Set((job?.responsibilities || []).filter(Boolean))],
  [job]
);

const requirements = useMemo(
  () =>
    [...new Set((job?.requirements || []).filter(Boolean))],
  [job]
);

const skills = useMemo(
  () => [...new Set((job?.skills || []).filter(Boolean))],
  [job]
);

const questions = useMemo(
  () => [...new Set((job?.questions || []).filter(Boolean))],
  [job]
);


  /*
   * Company logo URL.
   */
const companyLogo = useMemo(() => {
  if (!job?.companyLogo) return null;

  if (
    job.companyLogo.startsWith("http://") ||
    job.companyLogo.startsWith("https://")
  ) {
    return job.companyLogo;
  }

  return `${process.env.NEXT_PUBLIC_LOCAL_URL}/${job.companyLogo.replace(/^\/+/, "")}`;
}, [job]);

  /*
   * Loading state.
   */
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

  /*
   * Job not found.
   */
  if (!job) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center px-5">
        <div className="bg-white p-8 sm:p-12 border border-[#01193B]/10 text-center max-w-lg w-full shadow-sm rounded-3xl">
          <div className="w-16 h-16 bg-[#467B23]/10 flex items-center justify-center mx-auto mb-6 rounded-2xl">
            <Briefcase
              size={28}
              className="text-[#467B23]"
            />
          </div>

          <h2 className="text-xl sm:text-2xl font-medium text-[#01193B] mb-3">
            Job Not Found
          </h2>

          <p className="text-[#01193B]/60 text-sm mb-8">
            The position you are looking for might have
            been removed or the link is incorrect.
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
        <div className="mb-6 sm:mb-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3">

            <div className="flex flex-wrap items-center gap-2">

              <span className="capitalize bg-[#467B23]/10 text-[#467B23] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider rounded-lg">
                {job?.category?.title || "General"}
              </span>

              <span className="capitalize bg-gray-100 text-[#01193B]/70 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider rounded-lg">
                {job.jobType}
              </span>

              <span className="capitalize bg-[#01193B]/5 text-[#01193B] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider rounded-lg">
                {job.workMode}
              </span>
            </div>

            <h1 className="capitalize text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium text-[#01193B] tracking-tight">
              {job.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-1 text-xs sm:text-sm text-[#01193B]/70">

              <span className="flex items-center gap-1.5">
                <MapPin
                  size={15}
                  className="text-[#467B23] shrink-0"
                />

                {locationText}
              </span>

              <span className="flex items-center gap-1.5 capitalize">
                <Building2
                  size={15}
                  className="text-[#467B23] shrink-0"
                />

                {job.companyName}
              </span>

              <span className="flex items-center gap-1.5 font-bold text-[#467B23]">
                <DollarSign
                  size={15}
                  className="shrink-0"
                />

                {salaryText}
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
              {isApplied
                ? "Application Submitted"
                : "Apply For This Job"}
            </button>

            <button
              onClick={() => {
                navigator.clipboard.writeText(
                  window.location.href
                );

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

          {/* Left Content Details */}
  <div className="lg:col-span-2 space-y-6 sm:space-y-8">


{/* Vacancies & Applicants */}
<div className="flex items-center justify-between gap-6 py-2 border-b border-gray-100">

  {/* Vacancies */}
  <div className="flex items-center gap-2">
    <Users
      size={16}
      className="text-[#467B23]"
    />
    <span className="text-[#01193B]/80">
      Vacancies
    </span>
    <span className="font-medium text-[#01193B]">
      {job.vacancies ?? 1}
    </span>
  </div>

  {/* Applicants */}
  <div className="flex items-center gap-2">
    <span className="text-[#01193B]/70">
      Applicants
    </span>
    <span className="font-medium text-[#01193B]">
      {job.views ?? 0}
    </span>
  </div>

</div>


  {/* About Company */}
  <div className="">
    <div className="flex items-center justify-between ">
    
    </div>

<div className="flex items-center gap-4">
  {companyLogo ? (
    <img
      src={companyLogo}
      alt={job.companyName}
      className="w-auto h-12 object-cover bg-[#467B23]/5"
    />
  ) : (
    <div className="w-12 h-12 rounded-2xl bg-[#467B23]/10 flex items-center justify-center text-[#467B23] font-bold text-lg">
      {job.companyName
        ? job.companyName.charAt(0)
        : "C"}
    </div>
  )}

  <div>
    <h4 className="font-medium text-[#01193B] text-base capitalize">
      {job.companyName}
    </h4>

    {job.companyWebsite && (
      <a
        href={
          job.companyWebsite.startsWith("http")
            ? job.companyWebsite
            : `https://${job.companyWebsite}`
        }
        target="_blank"
        rel="noopener noreferrer"
        className="text-xs text-[#467B23] hover:underline flex items-center gap-1 mt-0.5"
      >
        <Globe size={13} />
        {job.companyWebsite}
      </a>
    )}
  </div>
</div>

   
  </div>


  {/* Job Description */}
  <div className="space-y-4 sm:space-y-6">
    <h3 className=" font-medium text-[#01193B] border-b border-[#01193B]/10 pb-2">
      Job Description
    
    </h3>

    <div className="capitalize text-[#01193B]/80 text-sm sm:text-base leading-relaxed space-y-4 font-light whitespace-pre-line">
      {job.description || "No job description available."}
    </div>
  </div>

  {/* Skills */}
  {skills.length > 0 && (
    <div className="space-y-4 sm:space-y-6">
      <h3 className=" font-medium text-[#01193B] border-b border-[#01193B]/10 pb-2">
        Required Skills
        
      </h3>

      <div className="flex flex-wrap gap-2">
        {skills.map((skill, idx) => (
          <span
            key={`${skill}-${idx}`}
            className="bg-[#01193B]/5 capitalize text-[#01193B] px-3.5 py-1.5 text-xs font-medium rounded-xl border border-[#01193B]/10"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  )}

  {/* Education */}
  {education.length > 0 && (
    <div className="space-y-4 sm:space-y-6">
      <h3 className=" font-medium text-[#01193B] border-b border-[#01193B]/10 pb-2">
        RequiredEducation
      
      </h3>

      <ul className="space-y-3">
        {education.map((item, idx) => (
          <li
            key={`${item}-${idx}`}
            className="capitalize flex items-start gap-3 text-sm sm:text-base text-[#01193B]/80 font-light"
          >
            <CheckCircle2
              size={18}
              className="text-[#467B23] shrink-0 mt-0.5"
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )}

  {/* Responsibilities */}
  {responsibilities.length > 0 && (
    <div className="space-y-4 sm:space-y-6">
      <h3 className=" font-medium text-[#01193B] border-b border-[#01193B]/10 pb-2">
        Key
        
          Responsibilities
        
      </h3>

      <ul className="space-y-3">
        {responsibilities.map((item, idx) => (
          <li
            key={`${item}-${idx}`}
            className="flex capitalize items-start gap-3 text-sm sm:text-base text-[#01193B]/80 font-light"
          >
            <CheckCircle2
              size={18}
              className="text-[#467B23] shrink-0 mt-0.5"
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )}

  {/* Requirements */}
  {requirements.length > 0 && (
    <div className="space-y-4 sm:space-y-6">
      <h3 className=" font-medium text-[#01193B] border-b border-[#01193B]/10 pb-2">
        Key
        
          Requirements
      
      </h3>

      <ul className="space-y-3">
        {requirements.map((req, idx) => (
          <li
            key={`${req}-${idx}`}
            className="flex capitalize items-start gap-3 text-sm sm:text-base text-[#01193B]/80 font-light"
          >
            <CheckCircle2
              size={18}
              className="text-[#467B23] shrink-0 mt-0.5"
            />
            <span>{req}</span>
          </li>
        ))}
      </ul>
    </div>
  )}

  {/* Benefits */}
  {benefits.length > 0 && (
    <div className="space-y-4 sm:space-y-6">
      <h3 className=" font-medium text-[#01193B] border-b border-[#01193B]/10 pb-2">
        Job
        
          Benefits
       
      </h3>

      <ul className="space-y-3">
        {benefits.map((benefit, idx) => (
          <li
            key={`${benefit}-${idx}`}
            className="capitalize flex items-start gap-3 text-sm sm:text-base text-[#01193B]/80 font-light"
          >
            <CheckCircle2
              size={18}
              className="text-[#467B23] shrink-0 mt-0.5"
            />
            <span>{benefit}</span>
          </li>
        ))}
      </ul>
    </div>
  )}

  {/* Application Questions */}
  {questions.length > 0 && (
    <div className="space-y-4 sm:space-y-6">
      <h3 className=" font-medium text-[#01193B] border-b border-[#01193B]/10 pb-2">
        Application
        
          Questions
      
      </h3>

      <ul className="space-y-3">
        {questions.map((question, idx) => (
          <li
            key={`${question}-${idx}`}
            className="capitalize flex items-start gap-3 text-sm sm:text-base text-[#01193B]/80 font-light"
          >
            <CheckCircle2
              size={18}
              className="text-[#467B23] shrink-0 mt-0.5"
            />
            <span>{question}</span>
          </li>
        ))}
      </ul>
    </div>
  )}


</div>

          {/* Right Sidebar Details */}
          <div className="space-y-6 lg:sticky lg:top-28">

           
           
           
            {/* Overview Card */}
           
           
            <div className="bg-white border border-[#01193B]/10 p-5 sm:p-6 lg:p-8 shadow-sm rounded-3xl space-y-6">

              <h3 className=" font-medium text-[#01193B] border-b border-[#01193B]/10 pb-4">
                Overview
              </h3>


<div className="space-y-4 text-sm">

  <div className="flex items-center justify-between py-2 border-b border-gray-100 gap-2">
    <span className="text-[#01193B]/80 flex items-center gap-2">
      <Briefcase
        size={16}
        className="text-[#467B23]"
      />
      Type
    </span>

    <span className="font-medium text-[#01193B] text-right capitalize">
      {job.jobType.toLowerCase().replace('_',' ')  || "Not specified"}
    </span>
  </div>

  {/* Work Mode */}
  <div className="flex items-center justify-between py-2 border-b border-gray-100 gap-2">
    <span className="text-[#01193B]/80 flex items-center gap-2">
      <Award
        size={16}
        className="text-[#467B23]"
      />
      Work Mode
    </span>

    <span className="font-medium text-[#01193B] text-right capitalize">
      {job.workMode.toLowerCase() || "Not specified"}
    </span>
  </div>

  {/* Category */}
  <div className="flex items-center justify-between py-2 border-b border-gray-100 gap-2">
    <span className="text-[#01193B]/70">
      Category
    </span>

    <span className="font-medium text-[#01193B] text-right capitalize">
      {job.category?.title.toLowerCase() || "Not specified"}
    </span>
  </div>

  {/* Subcategory */}
  <div className="flex items-center justify-between py-2 border-b border-gray-100 gap-2">
    <span className="text-[#01193B]/70">
      Subcategory
    </span>

    <span className="font-medium text-[#01193B] text-right capitalize">
      {job.subcategory?.title || "Not specified"}
    </span>
  </div>

  {/* Experience */}
  <div className="flex items-center justify-between py-2 border-b border-gray-100 gap-2">
    <span className="text-[#01193B]/70">
      Experience
    </span>

    <span className="font-medium text-[#01193B] text-right capitalize">
      {experienceText}
    </span>
  </div>

  {/* Location */}
  <div className="flex items-center justify-between py-2 border-b border-gray-100 gap-2">
    <span className="text-[#01193B]/80 flex items-center gap-2">
      <MapPin
        size={16}
        className="text-[#467B23]"
      />
      Location
    </span>

    <span className="capitalize font-medium  text-[#01193B] text-right max-w-[160px]">
      {locationText.toLowerCase()}
    </span>
  </div>

  {/* Address */}
  <div className="capitalize flex items-start justify-between py-2 border-b border-gray-100 gap-2">
     <span className="text-[#01193B]/80 flex items-center gap-2">
      <MapPin
        size={16}
        className="text-[#467B23]"
      />
      Address
    </span>

    <span className="capitalize font-medium text-[#01193B] text-right max-w-[160px]">
      {fullAddress.toLowerCase()}
    </span>
  </div>



  {/* Application Deadline */}
  <div className="flex items-center justify-between py-2 border-b border-gray-100 gap-2">
    <span className="text-[#01193B]/80 flex items-center gap-2">
      <Calendar
        size={16}
        className="text-[#467B23]"
      />
      Deadline
    </span>

    <span className="font-medium text-[#01193B] text-right">
      {applicationDeadline}
    </span>
  </div>



  {/* Applications */}
  {/* <div className="flex items-center justify-between py-2 border-b border-gray-100 gap-2">
    <span className="text-[#01193B]/70">
      Applications
    </span>

    <span className="font-medium text-[#01193B]">
      {job.applicationsCount ?? 0}
    </span>
  </div> */}

  {/* Posted */}
  <div className="flex items-center justify-between py-2 border-b border-gray-100 gap-2">
    <span className="text-[#01193B]/70">
      Posted
    </span>

    <span className="font-medium text-[#01193B] text-right">
      {postedDate}
    </span>
  </div>

  {/* Updated */}
  <div className="flex items-center justify-between py-2 gap-2">
    <span className="text-[#01193B]/70">
      Updated
    </span>

    <span className="font-medium text-[#01193B] text-right">
      {updatedDate}
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
                {isApplied
                  ? "Application Submitted"
                  : "Apply Now"}
              </button>
            </div>
            

            {/* Latest Jobs Widget */}
            {latestJobs.length > 0 && (
              <div className="bg-white border border-[#01193B]/10 p-5 sm:p-6 lg:p-8 shadow-sm rounded-3xl space-y-4">

                <div className="border-b border-[#01193B]/10 pb-3 flex items-center justify-between">

                  <h3 className="text-base font-medium text-[#01193B]">
                    Latest Jobs
                  </h3>

                  <span className="text-[11px] font-semibold text-[#467B23] bg-[#467B23]/10 px-2.5 py-1 rounded-lg">
                    {latestJobs.length} active
                  </span>
                </div>

                <div className="space-y-3.5">

                  {latestJobs.map((otherJob) => {

                    const otherLocationText =
                      typeof otherJob.location ===
                        "object" &&
                      otherJob.location !== null
                        ? otherJob.location.city ||
                          ""
                        : otherJob.location;

                    return (
                      <Link
                        key={
                          otherJob._id ||
                          otherJob.slug
                        }
                        href={`/jobs/${otherJob.slug}`}
                        className="group block p-3 rounded-2xl hover:bg-[#F8FAFC] border border-transparent hover:border-[#01193B]/10 transition-all"
                      >
                        <h4 className="text-xs font-medium text-[#01193B] group-hover:text-[#467B23] transition-colors line-clamp-1">
                          {otherJob.title}
                        </h4>

                        <p className="text-[11px] text-[#01193B]/70 truncate mt-0.5">
                          {otherJob.companyName} •{" "}
                          {otherLocationText}
                        </p>
                      </Link>
                    );
                  })}
                </div>

                <div className="pt-2 border-t border-[#01193B]/10 text-center">

                  <Link
                    href="/jobs"
                    className="text-xs font-bold text-[#467B23] hover:underline inline-flex items-center gap-1 uppercase tracking-wider"
                  >
                    View all available positions{" "}
                    <ChevronRight size={14} />
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* MOBILE STICKY BOTTOM ACTION BAR */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-[#01193B]/10 p-4 px-5 z-50 flex items-center gap-3 shadow-[0_-10px_25px_rgba(0,0,0,0.08)]">

        <button
          onClick={() => {
            navigator.clipboard.writeText(
              window.location.href
            );

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
          {isApplied
            ? "Application Submitted"
            : "Apply For This Job"}
        </button>
      </div>
                                                                                                                                                                           
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() =>
          setIsAuthModalOpen(false)
        }
        initialTab="login"
      />
    </div>
  );
}