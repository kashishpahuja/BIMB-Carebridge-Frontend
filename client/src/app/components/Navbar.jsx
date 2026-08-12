"use client";
import React, { useState, useEffect, useRef } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { LiaTimesSolid } from "react-icons/lia";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";

function Navbar({ openPopup }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const btnRef = useRef(null);
  const borderRef = useRef(null);
  const dropdownRef = useRef(null);

  const [courseMenuOpen, setCourseMenuOpen] = useState(false);

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
        // xl breakpoint
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

  const [isHovering, setIsHovering] = useState(false);

  const handleMouseHover = () => {
    setIsHovering(true);
  };

  const handleMouseHoverLeave = () => {
    setIsHovering(false);
  };

  return (
    <div className="bg-[#F4F7FC] w-full h-[90px] z-[99999] backdrop-blur-md  ">
      <div className="text-black flex items-center justify-between px-6 lg:px-12 xl:px-24 h-[100px]">
       <Link
          href={"/"}
          className="relative flex items-center justify-start gap-2 w-fit xl:w-[250px]"
        >
          <div className="w-full h-auto  overflow-hidden">
            <Image
              width={200}
              height={200}
              src="/Images/bimb.webp"
              alt="logo"
              className="w-[260px]  h-full lg:w-full lg:h-auto object-contain"
            />
          </div>
        </Link>
        <ul className="poppins text-[#01193B] hidden xl:flex space-x-8 font-medium text-base xl:text-md">
          {/* Job Categories Mega Dropdown */}
          <li className="relative group">
            <Link href="/jobs" className="relative inline-block group">
              <span>Find Jobs</span>
              <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-[#467B23] transition-[width] duration-300 group-hover:w-full"></span>
            </Link>

            {/* Mega Dropdown Menu */}
            <div className="absolute left-0 top-full mt-2 w-[600px] bg-white/95 backdrop-blur-sm border border-[#467B23]/30 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 p-6">
              <div className="grid grid-cols-2 gap-4">
                <Link
                  href="/jobs?category=Registered+Nurses"
                  className="block p-3 hover:bg-[#467B23]/10 rounded-lg transition-colors duration-300"
                >
                  <h4 className="text-[#467B23] font-semibold text-sm">
                    Registered Nurses (RN)
                  </h4>
                  <p className="text-gray-800 text-xs mt-1">
                    Hospitals & Healthcare Facilities
                  </p>
                </Link>

                <Link
                  href="/jobs?category=Personal+Support+Workers"
                  className="block p-3 hover:bg-[#467B23]/10 rounded-lg transition-colors duration-300"
                >
                  <h4 className="text-[#467B23] font-semibold text-sm">
                    Personal Support Workers (PSW)
                  </h4>
                  <p className="text-gray-800 text-xs mt-1">
                    Long-Term Care Homes
                  </p>
                </Link>

                <Link
                  href="/jobs?category=Wait+Staff"
                  className="block p-3 hover:bg-[#467B23]/10 rounded-lg transition-colors duration-300"
                >
                  <h4 className="text-[#467B23] font-semibold text-sm">
                    Wait Staff & Servers
                  </h4>
                  <p className="text-gray-800 text-xs mt-1">
                    Hotels, Resorts & Restaurants
                  </p>
                </Link>

                <Link
                  href="/jobs?category=Bartenders"
                  className="block p-3 hover:bg-[#467B23]/10 rounded-lg transition-colors duration-300"
                >
                  <h4 className="text-[#467B23] font-semibold text-sm">
                    Bartenders & Mixologists
                  </h4>
                  <p className="text-gray-800 text-xs mt-1">
                    Lounges & Event Venues
                  </p>
                </Link>

                <Link
                  href="/jobs?category=Home+Support"
                  className="block p-3 hover:bg-[#467B23]/10 rounded-lg transition-colors duration-300"
                >
                  <h4 className="text-[#467B23] font-semibold text-sm">
                    Home Support Workers
                  </h4>
                  <p className="text-gray-800 text-xs mt-1">
                    Home & Community Care
                  </p>
                </Link>

                <Link
                  href="/jobs?category=Housekeeping"
                  className="block p-3 hover:bg-[#467B23]/10 rounded-lg transition-colors duration-300"
                >
                  <h4 className="text-[#467B23] font-semibold text-sm">
                    Housekeeping Staff
                  </h4>
                  <p className="text-gray-800 text-xs mt-1">
                    Hospitality & Senior Living
                  </p>
                </Link>
              </div>

              <div className="mt-4 pt-4 border-t border-[#467B23]/30 text-center">
                <Link
                  href="/jobs"
                  className="text-[#467B23]  transition-colors duration-300 text-sm font-semibold"
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

          <li>
            <Link href="/candidates" className="relative inline-block group">
              <span>Candidates</span>
              <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-[#467B23] transition-[width] duration-300 group-hover:w-full"></span>
            </Link>
          </li>

          <li>
            <Link href="/contact" className="relative inline-block group">
              <span>Contact Us</span>
              <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-[#467B23] transition-[width] duration-300 group-hover:w-full"></span>
            </Link>
          </li>
        </ul>

        {/* Post a Job / Register Right Button */}
        <div className="hidden lg:block relative z-20 w-24 sm:w-28 lg:w-36 h-10 sm:h-12 group">
          <div
            className="absolute top-[6px] left-[4px] 
            bg-[#01193B] border-2 border-[#000000b4] 
            w-full h-full rounded-md 
            transition-all duration-150 
       group-hover:top-[4px] group-hover:left-[3px]"
          />

          <Link
            href={"/register"}
            ref={btnRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className=" 
              poppins-bold cursor-pointer absolute top-0 left-0 
              w-full h-full bg-white text-[#01193B] border border-[#01193B] rounded-md 
              flex items-center justify-center 
              transition-all duration-150 
              group-hover:top-[2px] group-hover:left-[2px]  animate-fadeUp"
          >
            Join Network
          </Link>
        </div>

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
        className={`poppins xl:hidden flex flex-col bg-white/95 backdrop-blur-sm border border-[#467B23]/30 text-[#01193B] shadow-xl mx-4 md:mx-8  rounded-xl px-4 py-6 text-center text-md font-medium 
        max-h-[85vh] overflow-y-auto overscroll-contain scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-900
        ${menuOpen ? "block" : "hidden"}`}
      >
        {/* Job Categories Expandable Submenu */}
        <li className="w-full mb-2">
          <button
            onClick={() => setCourseMenuOpen(!courseMenuOpen)}
            className="cursor-pointer flex items-center justify-between gap-2 w-full p-3 rounded-lg hover:bg-gray-900/20 transition-all duration-300 group"
          >
            <span className="flex items-center gap-2">
              <svg
                className="w-5 h-5 text-[#01193B]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <span className="group-hover:text-[#01193B] transition-colors">
                Find Jobs
              </span>
            </span>

            <svg
              className={`w-5 h-5 transition-transform duration-300 ${
                courseMenuOpen ? "rotate-180" : ""
              } text-gray-800`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          <div
            className={`overflow-hidden transition-all duration-500 ease-in-out ${
              courseMenuOpen ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="mt-2 p-2 bg-gray-100/50 rounded-lg border border-gray-50/20">
              <div className="grid grid-cols-1 gap-2">
                <Link
                  href="/jobs?category=Registered+Nurses"
                  onClick={() => {
                    setMenuOpen(false);
                    setCourseMenuOpen(false);
                  }}
                  className="block p-3 rounded-lg hover:bg-gray-800/20 transition-all duration-300 group"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-1 text-left">
                      <span className="font-semibold block group-hover:text-[#467B23] transition-colors">
                        Registered Nurses (RN)
                      </span>
                      <span className="text-gray-800 text-xs">
                        Hospitals & Facilities
                      </span>
                    </div>
                  </div>
                </Link>

                <Link
                  href="/jobs?category=Personal+Support+Workers"
                  onClick={() => {
                    setMenuOpen(false);
                    setCourseMenuOpen(false);
                  }}
                  className="block p-3 rounded-lg hover:bg-gray-800/20 transition-all duration-300 group"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-1 text-left">
                      <span className="font-semibold block group-hover:text-[#467B23] transition-colors">
                        Personal Support Workers (PSW)
                      </span>
                      <span className="text-gray-800 text-xs">
                        Long-Term Care Homes
                      </span>
                    </div>
                  </div>
                </Link>

                <Link
                  href="/jobs?category=Wait+Staff"
                  onClick={() => {
                    setMenuOpen(false);
                    setCourseMenuOpen(false);
                  }}
                  className="block p-3 rounded-lg hover:bg-gray-800/20 transition-all duration-300 group"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-1 text-left">
                      <span className="font-semibold block group-hover:text-[#467B23] transition-colors">
                        Wait Staff & Servers
                      </span>
                      <span className="text-gray-800 text-xs">
                        Hotels & Restaurants
                      </span>
                    </div>
                  </div>
                </Link>

                <Link
                  href="/jobs?category=Bartenders"
                  onClick={() => {
                    setMenuOpen(false);
                    setCourseMenuOpen(false);
                  }}
                  className="block p-3 rounded-lg hover:bg-gray-800/20 transition-all duration-300 group"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-1 text-left">
                      <span className="font-semibold block group-hover:text-[#467B23] transition-colors">
                        Bartenders & Mixologists
                      </span>
                      <span className="text-gray-800 text-xs">
                        Lounges & Events
                      </span>
                    </div>
                  </div>
                </Link>
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
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-900/20 transition-all duration-300 group"
          >
            <svg
              className="w-5 h-5 text-[#01193B]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
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
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-900/20 transition-all duration-300 group"
          >
            <svg
              className="w-5 h-5 text-[#01193B]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="group-hover:text-[#467B23] transition-colors">
              About Us
            </span>
          </Link>
        </li>

        <li className="w-full mb-1">
          <Link
            href="/candidates"
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-900/20 transition-all duration-300 group"
          >
            <svg
              className="w-5 h-5 text-[#01193B]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            <span className="group-hover:text-[#467B23] transition-colors">
              Candidates
            </span>
          </Link>
        </li>

        <li className="w-full mb-1">
          <Link
            href="/contact"
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-900/20 transition-all duration-300 group"
          >
            <svg
              className="w-5 h-5 text-[#01193B]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            <span className="group-hover:text-[#467B23] transition-colors">
              Contact Us
            </span>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;