"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { FiSearch, FiMapPin, FiGrid, FiArrowRight } from "react-icons/fi";

const popularTags = ["PSW Jobs", "RN Jobs", "Caregiver", "Wait Staff", "Housekeeping"];

export default function HeroSection() {
  const router = useRouter();

  // Form states
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [location, setLocation] = useState("");

  // Animation Refs
  const containerRef = useRef(null);
  const textColRef = useRef(null);
  const searchBarRef = useRef(null);

  // GSAP Entrance Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      if (textColRef.current) {
        tl.fromTo(
          textColRef.current.children,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.15 }
        );
      }

      if (searchBarRef.current) {
        tl.fromTo(
          searchBarRef.current,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.7 },
          "-=0.5"
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Handle Search Submission
  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (keyword) params.append("keyword", keyword);
    if (category && category !== "All Categories") params.append("category", category);
    if (location) params.append("location", location);
    router.push(`/jobs?${params.toString()}`);
  };

  const handleTagClick = (tag) => {
    setKeyword(tag);
    router.push(`/jobs?keyword=${encodeURIComponent(tag)}`);
  };

  return (
    <section
      ref={containerRef}
      className="w-full relative bg-cover bg-top bg-no-repeat px-5 md:px-12 lg:px-24 xl:px-40 pt-16 pb-28 font-['Poppins'] overflow-hidden"
      style={{ backgroundImage: "url('/Images/banner1.webp')" }}
    >
      {/* Subtle overlay to ensure high contrast and readability on all screens */}
      {/* <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px] z-0" /> */}

      {/* Main Content Layout: Text on Left */}
      <div className="relative z-10  md:min-h-[420px] flex items-center">
        <div ref={textColRef} className="w-full lg:w-7/12 flex flex-col space-y-6">
          <h1 className="text-[#1A2E26] text-4xl sm:text-5xl lg:text-[60px] font-medium leading-[1.1] tracking-tight">
            Connecting Care. <br />
            Creating <span className="font-semibold text-[#467B23]">Opportunities.</span>
          </h1>

          <p className="text-[#1A2E26]/80 text-base sm:text-lg leading-relaxed max-w-xl font-normal">
            We connect qualified healthcare and hospitality professionals with organizations that value care, compassion, and quality.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={() => router.push("/jobs")}
              className="bg-[#467B23] hover:bg-[#071610] text-white px-7 py-3.5 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 shadow-md group cursor-pointer"
            >
              Find Jobs
              <FiArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
            <button
              onClick={() => router.push("/post-job")}
              className="bg-white hover:bg-gray-50 text-[#1A2E26] border border-[#1A2E26]/20 px-7 py-3.5 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 group cursor-pointer shadow-sm"
            >
              Post a Job
              <FiArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Floating Search Bar & Tags Container */}
      <div 
        ref={searchBarRef}
        className="relative z-20 mt-12 lg:mt-4  max-w-7xl mx-auto"
      >
        <form
          onSubmit={handleSearch}
          className="bg-white rounded-3xl shadow-2xl px-4 sm:px-5 py-8 border border-gray-300 grid grid-cols-1 lg:grid-cols-12 gap-4 items-center"
        >
          {/* Job title or keyword */}
          <div className="md:col-span-4 flex items-center gap-3 px-3 py-3 bg-gray-50/80 rounded-2xl border border-gray-300/70 focus-within:border-[#467B23]">
            <FiSearch className="text-gray-700 w-5 h-5 shrink-0" />
            <input
              type="text"
              placeholder="Job title or keyword"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="w-full bg-transparent text-sm text-[#1A2E26] focus:outline-none placeholder:text-gray-700"
            />
          </div>

          {/* Category Dropdown */}
          <div className="md:col-span-3 flex items-center gap-3 px-3 py-3 bg-gray-50/80 rounded-2xl border border-gray-300/70 focus-within:border-[#467B23]">
            <FiGrid className="text-gray-700 w-5 h-5 shrink-0" />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-transparent text-sm text-[#1A2E26] focus:outline-none cursor-pointer"
            >
              <option>All Categories</option>
              <option>Healthcare</option>
              <option>Nursing</option>
              <option>Hospitality</option>
              <option>Support Staff</option>
            </select>
          </div>

          {/* Location */}
          <div className="md:col-span-3 flex items-center gap-3 px-3 py-3 bg-gray-50/80 rounded-2xl border border-gray-300/70 focus-within:border-[#467B23]">
            <FiMapPin className="text-gray-700 w-5 h-5 shrink-0" />
            <input
              type="text"
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full bg-transparent text-sm text-[#1A2E26] focus:outline-none placeholder:text-gray-700"
            />
          </div>

          {/* Search Button */}
          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full bg-[#467B23] hover:bg-[#071610] text-white text-sm font-medium py-3.5 px-6 rounded-2xl transition-colors duration-300 shadow-sm cursor-pointer flex items-center justify-center"
            >
              Search Jobs
            </button>
          </div>
        </form>

        {/* Popular Searches Tags */}
        <div className="flex flex-wrap items-center gap-2.5 mt-4 px-2">
          <span className="text-sm text-[#1A2E26] font-semibold tracking-wide">Popular Searches:</span>
          {popularTags.map((tag, idx) => (
            <button
              key={idx}
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


// "use client";

// import { useState, useEffect, useRef } from "react";
// import { useRouter } from "next/navigation";
// import Image from "next/image";
// import gsap from "gsap";
// import { FiSearch } from "react-icons/fi";

// const searchSuggestions = [
//   "Registered Nurse",
//   "Caregiver",
//   "Personal Support Worker",
//   "Healthcare Assistant",
//   "Wait Staff",
//   "Housekeeping Staff",
// ];

// export default function HeroSection() {
//   const router = useRouter();

//   // Search input and state management
//   const [searchQuery, setSearchQuery] = useState("");
//   const [isFocused, setIsFocused] = useState(false);
//   const [currentIndex, setCurrentIndex] = useState(0);

//   // Animation Refs
//   const heroContainerRef = useRef(null);
//   const eyebrowRef = useRef(null);
//   const headingRef = useRef(null);
//   const paragraphRef = useRef(null);
//   const searchBarRef = useRef(null);
//   const imageContainerRef = useRef(null);
  
//   // Placeholder slider refs
//   const currentTextRef = useRef(null);
//   const nextTextRef = useRef(null);

//   // GSAP Entrance Stagger Animation
//   useEffect(() => {
//     const ctx = gsap.context(() => {
//       const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

//       tl.fromTo(
//         eyebrowRef.current,
//         { opacity: 0, y: 20 },
//         { opacity: 1, y: 0, duration: 0.6 }
//       )
//         .fromTo(
//           headingRef.current,
//           { opacity: 0, y: 40 },
//           { opacity: 1, y: 0, duration: 0.7 },
//           "-=0.4"
//         )
//         .fromTo(
//           paragraphRef.current,
//           { opacity: 0, y: 25 },
//           { opacity: 1, y: 0, duration: 0.6 },
//           "-=0.4"
//         )
//         .fromTo(
//           searchBarRef.current,
//           { opacity: 0, y: 25, scale: 0.98 },
//           { opacity: 1, y: 0, scale: 1, duration: 0.6 },
//           "-=0.4"
//         )
//         .fromTo(
//           imageContainerRef.current,
//           { opacity: 0, x: 40, scale: 0.97 },
//           { opacity: 1, x: 0, scale: 1, duration: 0.8 },
//           "-=0.6"
//         );
//     }, heroContainerRef);

//     return () => ctx.revert();
//   }, []);

//   // Continuous Vertical Sliding Placeholder Animation Loop
//   useEffect(() => {
//     if (isFocused || searchQuery.trim() !== "") return;

//     const interval = setInterval(() => {
//       const nextIndex = (currentIndex + 1) % searchSuggestions.length;
      
//       if (currentTextRef.current && nextTextRef.current) {
//         const tl = gsap.timeline({
//           onComplete: () => {
//             setCurrentIndex(nextIndex);
//             gsap.set(currentTextRef.current, { y: "0%", opacity: 1 });
//             gsap.set(nextTextRef.current, { y: "100%", opacity: 0 });
//           },
//         });

//         // Slide current text up and fade out
//         tl.to(currentTextRef.current, {
//           y: "-100%",
//           opacity: 0,
//           duration: 0.5,
//           ease: "power2.inOut",
//         })
//         // Slide next text from bottom to center and fade in
//         .fromTo(
//           nextTextRef.current,
//           { y: "100%", opacity: 0 },
//           { y: "0%", opacity: 1, duration: 0.5, ease: "power2.inOut" },
//           0
//         );
//       }
//     }, 3000);

//     return () => clearInterval(interval);
//   }, [currentIndex, isFocused, searchQuery]);

//   // Handle Search Form Submission
//   const handleSearchSubmit = (e) => {
//     e.preventDefault();
//     const queryToSubmit = searchQuery.trim() || searchSuggestions[currentIndex];
//     router.push(`/jobs?search=${encodeURIComponent(queryToSubmit)}`);
//   };

//   // Image Hover Micro-interaction
//   const handleImageMouseEnter = () => {
//     if (imageContainerRef.current) {
//       gsap.to(imageContainerRef.current.querySelector("img"), {
//         scale: 1.02,
//         duration: 0.6,
//         ease: "power2.out",
//       });
//     }
//   };

//   const handleImageMouseLeave = () => {
//     if (imageContainerRef.current) {
//       gsap.to(imageContainerRef.current.querySelector("img"), {
//         scale: 1,
//         duration: 0.6,
//         ease: "power2.out",
//       });
//     }
//   };

//   const currentSuggestion = searchSuggestions[currentIndex];
//   const nextSuggestion = searchSuggestions[(currentIndex + 1) % searchSuggestions.length];

//   return (
//     <section className="w-full bg-[#F4F7FC]  pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8">
//       <div
//         ref={heroContainerRef}
//         className="w-full px-6 sm:px-12 lg:px-16 py-10 sm:py-16 overflow-hidden"
//       >
//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
//           {/* LEFT SIDE CONTENT (55%) */}
//           <div className="flex flex-col justify-center space-y-6 col-span-8">
            
//             {/* Eyebrow / Badge */}
//             <div ref={eyebrowRef} className="flex items-center gap-2.5">
//               <span className="relative flex h-2.5 w-2.5">
//                 <span className="animate-ping absolute inline-flex h-full w-full rounded-xl bg-[#467B23] opacity-75"></span>
//                 <span className="relative inline-flex rounded-xl h-2.5 w-2.5 bg-[#467B23]"></span>
//               </span>
//               <span className="text-xs sm:text-sm font-semibold tracking-wide text-[#01193B] uppercase">
//                 Healthcare Careers, Made Simple
//               </span>
//             </div>

//             {/* Main Editorial Heading */}
//             <h1
//               ref={headingRef}
//               className="text-[#01193B] font-['Poppins'] font-medium text-[40px] sm:text-[52px] lg:text-[68px] leading-[1.08] tracking-tight"
//             >
//               Find the right opportunity. <br />
//               <span className="font-semibold">Build a career that matters.</span>
//             </h1>

//             {/* Supporting Paragraph */}
//             <p
//               ref={paragraphRef}
//               className="text-[#01193B]/70 font-['Poppins'] text-base sm:text-lg leading-relaxed max-w-[560px]"
//             >
//               Discover meaningful healthcare opportunities, connect with trusted employers, and take the next step in your career with BIMB Carebridge.
//             </p>

//             {/* Job Search Input Bar */}
//             <div ref={searchBarRef} className="pt-2 w-full max-w-[600px]">
//               <form
//                 onSubmit={handleSearchSubmit}
//                 className="relative flex items-center bg-white rounded-xl p-2.5 sm:p-3 shadow-[0_8px_30px_rgba(1,25,59,0.06)] border border-[#01193B]/10 transition-all duration-300 focus-within:border-[#467B23]/50 focus-within:ring-4 focus-within:ring-[#467B23]/10"
//               >
//                 <div className="pl-4 pr-2 text-[#01193B]/40 flex items-center justify-center">
//                   <FiSearch className="w-5 h-5 sm:w-6 sm:h-6" />
//                 </div>

//                 <div className="relative flex-1 h-[44px] sm:h-[48px] flex items-center overflow-hidden">
//                   {/* Animated Placeholder / Input Container */}
//                   {!isFocused && !searchQuery && (
//                     <div className="absolute inset-0 pointer-events-none flex items-center overflow-hidden">
//                       <div className="relative w-full h-full font-['Poppins'] text-sm sm:text-base text-[#01193B]/40">
//                         {/* Current text sliding up */}
//                         <div
//                           ref={currentTextRef}
//                           className="absolute inset-0 flex items-center"
//                         >
//                           Search for &ldquo;{currentSuggestion}&rdquo;
//                         </div>
//                         {/* Next text waiting below */}
//                         <div
//                           ref={nextTextRef}
//                           className="absolute inset-0 flex items-center translate-y-full opacity-0"
//                         >
//                           Search for &ldquo;{nextSuggestion}&rdquo;
//                         </div>
//                       </div>
//                     </div>
//                   )}

//                   <input
//                     type="text"
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e.target.value)}
//                     onFocus={() => setIsFocused(true)}
//                     onBlur={() => setIsFocused(false)}
//                     aria-label="Search jobs"
//                     className="w-full h-full bg-transparent font-['Poppins'] text-sm sm:text-base text-[#01193B] focus:outline-none z-10"
//                   />
//                 </div>

//                 <button
//                   type="submit"
//                   aria-label="Submit search"
//                   className="bg-[#467B23] hover:bg-[#3b681d] text-white w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center transition-transform duration-300 hover:scale-105 shadow-md flex-shrink-0 cursor-pointer"
//                 >
//                   <FiSearch className="w-5 h-5 sm:w-6 sm:h-6" />
//                 </button>
//               </form>
//             </div>

//           </div>

//           {/* RIGHT SIDE IMAGE (45%) */}
//           <div
//             ref={imageContainerRef}
//             className="relative w-full flex justify-center lg:justify-end col-span-4"
//             onMouseEnter={handleImageMouseEnter}
//             onMouseLeave={handleImageMouseLeave}
//           >
//             <div className="relative w-full max-w-[540px] h-[460px] sm:h-[540px] lg:h-[600px] rounded-[30px] overflow-hidden shadow-2xl bg-[#01193B]/5 border border-[#01193B]/10">
//               <Image
//                 src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=1200"
//                 alt="Professional healthcare worker in a modern facility"
//                 fill
//                 priority
//                 className="object-cover object-center transition-transform duration-700 ease-out"
//                 sizes="(max-width: 1024px) 100vw, 50vw"
//               />
              
//               {/* Subtle Gradient Overlay for Depth */}
//               <div className="absolute inset-0 bg-gradient-to-t from-[#01193B]/40 via-transparent to-transparent pointer-events-none" />

//               {/* Minimalist Trust Floating Label */}
//               <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-md px-5 py-3 rounded-2xl shadow-lg border border-white/20 flex items-center gap-3">
//                 <div className="w-8 h-8 rounded-xl bg-[#467B23]/10 flex items-center justify-center text-[#467B23] font-bold text-sm">
//                   ✓
//                 </div>
//                 <div>
//                   <p className="text-xs font-semibold text-[#01193B]">Verified Employers</p>
//                   <p className="text-[11px] text-[#01193B]/60 font-medium">1000+ Active Placements</p>
//                 </div>
//               </div>
//             </div>
//           </div>

//         </div>
//       </div>
//     </section>
//   );
// }