"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import gsap from "gsap";
import { FiSearch } from "react-icons/fi";

const searchSuggestions = [
  "Registered Nurse",
  "Caregiver",
  "Personal Support Worker",
  "Healthcare Assistant",
  "Wait Staff",
  "Housekeeping Staff",
];

export default function HeroSection() {
  const router = useRouter();

  // Search input and state management
  const [searchQuery, setSearchQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Animation Refs
  const heroContainerRef = useRef(null);
  const eyebrowRef = useRef(null);
  const headingRef = useRef(null);
  const paragraphRef = useRef(null);
  const searchBarRef = useRef(null);
  const imageContainerRef = useRef(null);
  
  // Placeholder slider refs
  const currentTextRef = useRef(null);
  const nextTextRef = useRef(null);

  // GSAP Entrance Stagger Animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        eyebrowRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 }
      )
        .fromTo(
          headingRef.current,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.7 },
          "-=0.4"
        )
        .fromTo(
          paragraphRef.current,
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.4"
        )
        .fromTo(
          searchBarRef.current,
          { opacity: 0, y: 25, scale: 0.98 },
          { opacity: 1, y: 0, scale: 1, duration: 0.6 },
          "-=0.4"
        )
        .fromTo(
          imageContainerRef.current,
          { opacity: 0, x: 40, scale: 0.97 },
          { opacity: 1, x: 0, scale: 1, duration: 0.8 },
          "-=0.6"
        );
    }, heroContainerRef);

    return () => ctx.revert();
  }, []);

  // Continuous Vertical Sliding Placeholder Animation Loop
  useEffect(() => {
    if (isFocused || searchQuery.trim() !== "") return;

    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % searchSuggestions.length;
      
      if (currentTextRef.current && nextTextRef.current) {
        const tl = gsap.timeline({
          onComplete: () => {
            setCurrentIndex(nextIndex);
            gsap.set(currentTextRef.current, { y: "0%", opacity: 1 });
            gsap.set(nextTextRef.current, { y: "100%", opacity: 0 });
          },
        });

        // Slide current text up and fade out
        tl.to(currentTextRef.current, {
          y: "-100%",
          opacity: 0,
          duration: 0.5,
          ease: "power2.inOut",
        })
        // Slide next text from bottom to center and fade in
        .fromTo(
          nextTextRef.current,
          { y: "100%", opacity: 0 },
          { y: "0%", opacity: 1, duration: 0.5, ease: "power2.inOut" },
          0
        );
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex, isFocused, searchQuery]);

  // Handle Search Form Submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const queryToSubmit = searchQuery.trim() || searchSuggestions[currentIndex];
    router.push(`/jobs?search=${encodeURIComponent(queryToSubmit)}`);
  };

  // Image Hover Micro-interaction
  const handleImageMouseEnter = () => {
    if (imageContainerRef.current) {
      gsap.to(imageContainerRef.current.querySelector("img"), {
        scale: 1.02,
        duration: 0.6,
        ease: "power2.out",
      });
    }
  };

  const handleImageMouseLeave = () => {
    if (imageContainerRef.current) {
      gsap.to(imageContainerRef.current.querySelector("img"), {
        scale: 1,
        duration: 0.6,
        ease: "power2.out",
      });
    }
  };

  const currentSuggestion = searchSuggestions[currentIndex];
  const nextSuggestion = searchSuggestions[(currentIndex + 1) % searchSuggestions.length];

  return (
    <section className="w-full bg-[#F4F7FC]  pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8">
      <div
        ref={heroContainerRef}
        className="w-full px-6 sm:px-12 lg:px-16 py-10 sm:py-16 overflow-hidden"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* LEFT SIDE CONTENT (55%) */}
          <div className="flex flex-col justify-center space-y-6 col-span-8">
            
            {/* Eyebrow / Badge */}
            <div ref={eyebrowRef} className="flex items-center gap-2.5">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#467B23] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#467B23]"></span>
              </span>
              <span className="text-xs sm:text-sm font-semibold tracking-wide text-[#01193B] uppercase">
                Healthcare Careers, Made Simple
              </span>
            </div>

            {/* Main Editorial Heading */}
            <h1
              ref={headingRef}
              className="text-[#01193B] font-['Poppins'] font-medium text-[40px] sm:text-[52px] lg:text-[68px] leading-[1.08] tracking-tight"
            >
              Find the right opportunity. <br />
              <span className="font-semibold">Build a career that matters.</span>
            </h1>

            {/* Supporting Paragraph */}
            <p
              ref={paragraphRef}
              className="text-[#01193B]/70 font-['Poppins'] text-base sm:text-lg leading-relaxed max-w-[560px]"
            >
              Discover meaningful healthcare opportunities, connect with trusted employers, and take the next step in your career with BIMB Carebridge.
            </p>

            {/* Job Search Input Bar */}
            <div ref={searchBarRef} className="pt-2 w-full max-w-[600px]">
              <form
                onSubmit={handleSearchSubmit}
                className="relative flex items-center bg-white rounded-full p-2.5 sm:p-3 shadow-[0_8px_30px_rgba(1,25,59,0.06)] border border-[#01193B]/10 transition-all duration-300 focus-within:border-[#467B23]/50 focus-within:ring-4 focus-within:ring-[#467B23]/10"
              >
                <div className="pl-4 pr-2 text-[#01193B]/40 flex items-center justify-center">
                  <FiSearch className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>

                <div className="relative flex-1 h-[44px] sm:h-[48px] flex items-center overflow-hidden">
                  {/* Animated Placeholder / Input Container */}
                  {!isFocused && !searchQuery && (
                    <div className="absolute inset-0 pointer-events-none flex items-center overflow-hidden">
                      <div className="relative w-full h-full font-['Poppins'] text-sm sm:text-base text-[#01193B]/40">
                        {/* Current text sliding up */}
                        <div
                          ref={currentTextRef}
                          className="absolute inset-0 flex items-center"
                        >
                          Search for &ldquo;{currentSuggestion}&rdquo;
                        </div>
                        {/* Next text waiting below */}
                        <div
                          ref={nextTextRef}
                          className="absolute inset-0 flex items-center translate-y-full opacity-0"
                        >
                          Search for &ldquo;{nextSuggestion}&rdquo;
                        </div>
                      </div>
                    </div>
                  )}

                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    aria-label="Search jobs"
                    className="w-full h-full bg-transparent font-['Poppins'] text-sm sm:text-base text-[#01193B] focus:outline-none z-10"
                  />
                </div>

                <button
                  type="submit"
                  aria-label="Submit search"
                  className="bg-[#467B23] hover:bg-[#3b681d] text-white w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center transition-transform duration-300 hover:scale-105 shadow-md flex-shrink-0 cursor-pointer"
                >
                  <FiSearch className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              </form>
            </div>

          </div>

          {/* RIGHT SIDE IMAGE (45%) */}
          <div
            ref={imageContainerRef}
            className="relative w-full flex justify-center lg:justify-end col-span-4"
            onMouseEnter={handleImageMouseEnter}
            onMouseLeave={handleImageMouseLeave}
          >
            <div className="relative w-full max-w-[540px] h-[460px] sm:h-[540px] lg:h-[600px] rounded-[30px] overflow-hidden shadow-2xl bg-[#01193B]/5 border border-[#01193B]/10">
              <Image
                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=1200"
                alt="Professional healthcare worker in a modern facility"
                fill
                priority
                className="object-cover object-center transition-transform duration-700 ease-out"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              
              {/* Subtle Gradient Overlay for Depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#01193B]/40 via-transparent to-transparent pointer-events-none" />

              {/* Minimalist Trust Floating Label */}
              <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-md px-5 py-3 rounded-2xl shadow-lg border border-white/20 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#467B23]/10 flex items-center justify-center text-[#467B23] font-bold text-sm">
                  ✓
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#01193B]">Verified Employers</p>
                  <p className="text-[11px] text-[#01193B]/60 font-medium">1000+ Active Placements</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}