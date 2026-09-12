"use client";
import React, { useState, useEffect, useRef } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { LiaTimesSolid } from "react-icons/lia";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import {
  FaInstagram,
  FaPhoneAlt,
  FaUserTie,
  FaBriefcase,
  FaRegLightbulb,
  FaEnvelope,
} from "react-icons/fa";
import jobData from "../data/sampleJobs.json"; // Adjust path based on your folder structure
import AuthModal from "./AuthModal";

function Navbar({ openPopup }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const btnRef = useRef(null);
  const borderRef = useRef(null);
  const dropdownRef = useRef(null);

  const [courseMenuOpen, setCourseMenuOpen] = useState(false);
  const [updateMenuOpen, setUpdateMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState('login');
  // Dynamically extract unique categories from sampleJobs.json
  const dynamicCategories = React.useMemo(() => {
    const jobs = jobData.jobs || [];
    const uniqueCats = [...new Set(jobs.map((j) => j.category).filter(Boolean))];
    
    // Map each category to a display profile with default subtitles
    return uniqueCats.map((cat) => {
      let subtitle = "Professional Opportunities";
      if (cat.includes("Registered Nurses")) subtitle = "Hospitals & Healthcare Facilities";
      else if (cat.includes("Personal Support Workers")) subtitle = "Long-Term Care Homes";
      else if (cat.includes("Wait Staff")) subtitle = "Hotels, Resorts & Restaurants";
      else if (cat.includes("Bartenders")) subtitle = "Lounges & Event Venues";
      else if (cat.includes("Software")) subtitle = "Tech & Engineering";

      return {
        name: cat,
        slug: encodeURIComponent(cat),
        subtitle,
      };
    });
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [menuOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleMouseEnter = () => {
    gsap.to(btnRef.current, {
      y: 2,
      scale: 0.98,
      duration: 0,
      ease: "power3.inOut",
    });

    gsap.fromTo(
      borderRef.current,
      {
        scale: 1,
        opacity: 0.5,
      },
      {
        scale: 1.1,
        opacity: 1,
        duration: 0.2,
        ease: "power3.out",
      }
    );
  };

  const handleMouseLeave = () => {
    gsap.to(btnRef.current, {
      y: 0,
      scale: 1,
      duration: 0.2,
      ease: "power3.inOut",
    });

    gsap.to(borderRef.current, {
      scale: 1,
      opacity: 0.5,
      duration: 0.4,
      ease: "power2.inOut",
    });
  };

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    if (menuOpen) {
      gsap.fromTo(
        dropdownRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.4, ease: "power3.out", display: "flex" }
      );
    } else {
      gsap.to(dropdownRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.3,
        ease: "power3.in",
        onComplete: () => {
          if (dropdownRef.current) {
            dropdownRef.current.style.display = "none";
          }
        },
      });
    }
  }, [menuOpen]);

  return (
    <>
      <div className="bg-[#0b2345] text-white overflow-hidden">
        <div
          className="
            flex items-center justify-between
            gap-8
            py-3
            text-sm
            whitespace-nowrap
            px-5
            md:px-12
            lg:px-24
            xl:px-40
          "
        >
          {/* Left Side */}
          <div className="hidden lg:flex items-center gap-3 text-gray-200 shrink-0">
            <FaRegLightbulb className="text-base shrink-0" />
            <span className="font-medium">
              Connecting Care. Creating Opportunities.
            </span>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-x-7 text-gray-200 shrink-0">
            {/* Always Show */}
            <a
              href="tel:6475003737"
              className="flex items-center gap-2 transition hover:text-white"
            >
              <FaPhoneAlt />
              <span>647-500-3737</span>
            </a>

            {/* Hide on Mobile */}
            <a
              href="mailto:info@bimbcarebridge.com"
              className="flex items-center gap-2 transition hover:text-white"
            >
              <FaEnvelope />
              <span>info@bimbcarebridge.com</span>
            </a>̥
          </div>
        </div>
      </div>

      <div className="relative w-full z-99999 backdrop-blur-md px-2 sm:px-5 md:px-12 lg:px-24 xl:px-40">
        <div className="text-black flex items-center justify-between h-[80px]">
  <Link
            href={"/"}
            className="relative flex items-center justify-start gap-2 w-fit xl:w-[250px]"
          >
            <div className="w-full h-auto overflow-hidden">
              <Image
                width={200}
                height={200}
                src="/Images/bimb.webp"
                alt="logo"
                className="w-50 md:w-57.5 h-full xl:w-full xl:h-auto object-contain"
              />
            </div>
          </Link>
          <div className=" relative z-20">
  <button
    onClick={() => {
      setAuthModalTab('login');
      setIsAuthModalOpen(true);
    }}
    ref={btnRef}
    onMouseEnter={handleMouseEnter}
    onMouseLeave={handleMouseLeave}
    className="
      relative inline-flex 
      items-center justify-center
      overflow-hidden rounded-md
      bg-[#467B23]
      px-8 py-2.5
      text-white
      tracking-tight
      group
      animate-fadeUp
      cursor-pointer
    "
  >
    {/* (Keep your decorative expanding spans and SVG elements here) */}
    <span className="relative z-10 font-['Poppins'] text-sm xl:text-base">
      Log In
    </span>
  </button>
</div>

          <ul className="poppins text-[#01193B] hidden xl:flex space-x-8 font-medium text-base xl:text-md">
            {/* Job Categories Mega Dropdown */}
            <li className="relative group">
              <Link href="/jobs" className="relative inline-block group">
                <span>Find Jobs</span>
                <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-[#467B23] transition-[width] duration-300 group-hover:w-full"></span>
              </Link>

              {/* Mega Dropdown Menu - Dynamically Populated */}
              <div className="absolute left-0 top-full mt-2 w-[600px] bg-white/95 backdrop-blur-sm border border-[#467B23]/30 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 p-6">
                <div className="grid grid-cols-2 gap-4">
                  {dynamicCategories.map((cat, idx) => (
                    <Link
                      key={idx}
                      href={`/jobs?category=${cat.slug}`}
                      className="block p-3 hover:bg-[#467B23]/10 rounded-lg transition-colors duration-300"
                    >
                      <h4 className="text-[#467B23] font-semibold text-sm">
                        {cat.name}
                      </h4>
                      <p className="text-gray-800 text-xs mt-1">
                        {cat.subtitle}
                      </p>
                    </Link>
                  ))} 
                </div>

                <div className="mt-4 pt-4 border-t border-[#467B23]/30 text-center">
                  <Link
                    href="/jobs"
                    className="text-[#467B23] transition-colors duration-300 text-sm font-semibold"
                  >
                    View All Openings →
                  </Link>
                </div>
              </div>
            </li>

            <li>
              <Link href="/employers" className="relative inline-block group">
                <span>For Employers</span>
                <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-[#467B23] transition-[width] duration-300 group-hover:w-full"></span>
              </Link>
            </li>

            <li>
              <Link href="/about" className="relative inline-block group">
                <span>About Us</span>
                <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-[#467B23] transition-[width] duration-300 group-hover:w-full"></span>
              </Link>
            </li>

            <li className="relative group">
              <Link href="/updates" className="relative inline-block group">
                <span>Updates</span>
                <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-[#467B23] transition-[width] duration-300 group-hover:w-full"></span>
              </Link>
              <div className="absolute space-y-2 flex flex-col w-[200px] bg-white/95 backdrop-blur-sm border border-[#467B23]/30 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 px-2 py-2 mt-2">
                <Link className="p-3 hover:bg-[#467B23]/10 rounded-lg transition-colors duration-300 text-[#467B23] font-semibold text-sm" href="/articles">Articles</Link>
                <Link className="p-3 hover:bg-[#467B23]/10 rounded-lg transition-colors duration-300 text-[#467B23] font-semibold text-sm" href="/news">News</Link>
              </div>
            </li>

            <li>
              <Link href="/contact" className="relative inline-block group">
                <span>Contact Us</span>
                <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-[#467B23] transition-[width] duration-300 group-hover:w-full"></span>
              </Link>
            </li>
          </ul>

          {/* Post a Job / Register Right Button */}
          {/* <div className="block relative z-20">
            <Link
              href="/register"
              ref={btnRef}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className="
                relative inline-flex 
                items-center justify-center
                overflow-hidden rounded-md
                bg-[#467B23]
                px-8 py-2.5
                text-white
                tracking-tight
                group
                animate-fadeUp
              "
            >
              <span className="absolute w-0 h-0 rounded-full bg-[#01193B] transition-all duration-500 ease-out group-hover:w-56 group-hover:h-56" />

              <span className="absolute bottom-0 left-0 h-full -ml-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-auto h-full opacity-100 object-stretch" viewBox="0 0 487 487">
                  <path fillOpacity=".1" fillRule="nonzero" fill="#FFF" d="M0 .3c67 2.1 134.1 4.3 186.3 37 52.2 32.7 89.6 95.8 112.8 150.6 23.2 54.8 32.3 101.4 61.2 149.9 28.9 48.4 77.7 98.8 126.4 149.2H0V.3z" />
                </svg>
              </span>

              <span className="absolute top-0 right-0 w-12 h-full -mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="object-cover w-full h-full" viewBox="0 0 487 487">
                  <path fillOpacity=".1" fillRule="nonzero" fill="#FFF" d="M487 486.7c-66.1-3.6-132.3-7.3-186.3-37s-95.9-85.3-126.2-137.2c-30.4-51.8-49.3-99.9-76.5-151.4C70.9 109.6 35.6 54.8.3 0H487v486.7z" />
                </svg>
              </span>

              <span className="relative z-10 font-['Poppins'] text-sm xl:text-base">
                Log In
              </span>
            </Link>
          </div> */}

          {/* Hamburger Icon - Mobile */}
          <button
            onClick={toggleMenu}
            className="xl:hidden text-2xl cursor-pointer text-[#01193B]"
          >
            {menuOpen ? <LiaTimesSolid /> : <RxHamburgerMenu />}
          </button>
        </div>

        <ul
          ref={dropdownRef}
          className={`poppins xl:hidden absolute left-0 right-0 top-full z-99999
            flex flex-col
            bg-white/95 backdrop-blur-md
            border border-[#467B23]/30
            text-[#01193B]
            shadow-2xl
            mx-4 md:mx-8
            rounded-xl
            px-4 py-6
            text-center text-md font-medium
            max-h-[calc(100vh-100px)]
            overflow-y-auto
            overscroll-contain
            scrollbar-thin
            scrollbar-thumb-gray-600
            scrollbar-track-gray-900
            ${menuOpen ? "block" : "hidden"}`}
        >
          {/* Job Categories Expandable Submenu - Dynamically Populated */}
          <li className="w-full mb-2">
            <button
              onClick={() => setCourseMenuOpen(!courseMenuOpen)}
              className="cursor-pointer flex items-center justify-between gap-2 w-full p-3 rounded-lg hover:bg-[#467B23]/10 transition-all duration-300 group"
            >
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5 text-[#01193B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="group-hover:text-[#01193B] transition-colors">
                  Find Jobs
                </span>
              </span>

              <svg className={`w-5 h-5 transition-transform duration-300 ${courseMenuOpen ? "rotate-180" : ""} text-gray-800`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <div className={`overflow-hidden transition-all duration-500 ease-in-out ${courseMenuOpen ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"}`}>
              <div className="mt-2 p-2 bg-gray-100/50 rounded-lg border border-gray-50/20">
                <div className="grid grid-cols-1 gap-2">
                  {dynamicCategories.map((cat, idx) => (
                    <Link
                      key={idx}
                      href={`/jobs?category=${cat.slug}`}
                      onClick={() => {
                        setMenuOpen(false);
                        setCourseMenuOpen(false);
                      }}
                      className="block p-3 rounded-lg hover:bg-[#467B23]/10 transition-all duration-300 group"
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex-1 text-left">
                          <span className="font-semibold block group-hover:text-[#467B23] transition-colors">
                            {cat.name}
                          </span>
                          <span className="text-gray-800 text-xs">
                            {cat.subtitle}
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

                <Link
                  href="/jobs"
                  onClick={() => {
                    setMenuOpen(false);
                    setCourseMenuOpen(false);
                  }}
                  className="block mt-3 p-3 border border-[#01193B]/90 text-black font-medium text-center rounded-lg transition-all duration-300 hover:scale-[1.02]"
                >
                  Browse All Openings →
                </Link>
              </div>
            </div>
          </li>

          <li className="w-full mb-1">
            <Link
              href="/employers"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#467B23]/10 transition-all duration-300 group"
            >
              <svg className="w-5 h-5 text-[#01193B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              <span className="group-hover:text-[#467B23] transition-colors">
                For Employers
              </span>
            </Link>
          </li>

          <li className="w-full mb-1">
            <Link
              href="/about"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#467B23]/10 transition-all duration-300 group"
            >
              <svg className="w-5 h-5 text-[#01193B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="group-hover:text-[#467B23] transition-colors">
                About Us
              </span>
            </Link>
          </li>

          <li className="w-full mb-1">
            <div
              onClick={() => setUpdateMenuOpen(!updateMenuOpen)}
              className="cursor-pointer flex items-center justify-between gap-3 p-3 rounded-lg hover:bg-[#467B23]/10 transition-all duration-300 group"
            >
              <div className="flex gap-3">
                <svg className="w-5 h-5 text-[#01193B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span className="group-hover:text-[#467B23] transition-colors">
                  Updates
                </span>
              </div>

              <svg className={`w-5 h-5 transition-transform duration-300 ${updateMenuOpen ? "rotate-180" : ""} text-gray-800`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            
            <div className={`overflow-hidden transition-all duration-500 ease-in-out ${updateMenuOpen ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"}`}>
              <div className="mt-2 p-2 bg-gray-100/50 rounded-lg border border-gray-50/20">
                <div className="grid grid-cols-1 gap-2">
                  <Link
                    href="/articles"
                    onClick={() => {
                      setMenuOpen(false);
                      setUpdateMenuOpen(false);
                    }}
                    className="block p-3 rounded-lg hover:bg-[#467B23]/10 transition-all duration-300 group"
                  >
                    <div className="flex items-start gap-3 font-semibold group-hover:text-[#467B23] transition-colors">
                      Articles
                    </div>
                  </Link>

                  <Link
                    href="/news"
                    onClick={() => {
                      setMenuOpen(false);
                      setUpdateMenuOpen(false);
                    }}
                    className="block p-3 rounded-lg hover:bg-[#467B23]/10 transition-all duration-300 group"
                  >
                    <div className="flex items-start gap-3 font-semibold group-hover:text-[#467B23] transition-colors">
                      News
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </li>

          <li className="w-full mb-1">
            <Link
              href="/contact"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#467B23]/10 transition-all duration-300 group"
            >
              <svg className="w-5 h-5 text-[#01193B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span className="group-hover:text-[#467B23] transition-colors">
                Contact Us
              </span>
            </Link>
          </li>
        </ul>
      </div>
      <AuthModal
  isOpen={isAuthModalOpen} 
  onClose={() => setIsAuthModalOpen(false)} 
  initialTab={authModalTab} 
/>
    </>
  );
}

export default Navbar;