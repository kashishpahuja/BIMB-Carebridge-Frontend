"use client";

import Link from "next/link";
import Image from "next/image";
import { useContext } from "react";
import { FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { FiArrowRight } from "react-icons/fi";
import { JobDataContext } from "../context/JobDataContext";

export default function Footer() {
  const { subcategories } = useContext(JobDataContext);

  return (
    <footer className="w-full bg-linear-to-br from-[#0b2345] to-[#143A2F] text-white pt-16 pb-12">
      <div className="px-5 md:px-12 lg:px-24 xl:px-40">

        {/* Top Grid Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-white/10">

          {/* Column 1: Brand & Bio */}
          <div className="lg:col-span-4 space-y-6">
            <Link href="/" className="inline-block">
              <div className="w-fit">
                <Image
                  width={180}
                  height={50}
                  src="/Images/bimbWhite.webp"
                  alt="Bimb Carebridge Logo"
                  className="h-10 w-auto object-contain"
                />
              </div>
            </Link>

            <p className="text-gray-300 text-sm leading-relaxed max-w-sm">
              Connecting care and creating opportunities. We link qualified
              healthcare and hospitality professionals with organizations
              that value compassion and quality.
            </p>

            <div className="space-y-3 pt-2">
              <a
                href="tel:6475003737"
                className="flex items-center gap-3 text-sm text-gray-300 hover:text-white transition-colors"
              >
                <div className="w-8 h-8 rounded-lg bg-[#467B23]/20 text-[#467B23] flex items-center justify-center shrink-0">
                  <FaPhoneAlt size={13} />
                </div>
                <span>647-500-3737</span>
              </a>

              <a
                href="mailto:info@bimbcarebridge.com"
                className="flex items-center gap-3 text-sm text-gray-300 hover:text-white transition-colors"
              >
                <div className="w-8 h-8 rounded-lg bg-[#467B23]/20 text-[#467B23] flex items-center justify-center shrink-0">
                  <FaEnvelope size={13} />
                </div>
                <span>info@bimbcarebridge.com</span>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-sm font-bold tracking-wider uppercase text-[#467B23]">
              Quick Links
            </h4>

            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  href="/jobs"
                  className="text-gray-300 hover:text-white transition-colors flex items-center gap-1.5 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#467B23] group-hover:scale-125 transition-transform" />
                  Find Jobs
                </Link>
              </li>

              <li>
                <a
  href={process.env.NEXT_PUBLIC_ADMIN_URL || "http://localhost:3001"}
  className="text-gray-300 hover:text-white transition-colors flex items-center gap-1.5 group"
>
  <span className="w-1.5 h-1.5 rounded-full bg-[#467B23] group-hover:scale-125 transition-transform" />
  For Employers
</a>

                {/* <Link
                  href="/employers"
                  className="text-gray-300 hover:text-white transition-colors flex items-center gap-1.5 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#467B23] group-hover:scale-125 transition-transform" />
                  For Employers
                </Link> */}
              </li>

              <li>
                <Link
                  href="/about"
                  className="text-gray-300 hover:text-white transition-colors flex items-center gap-1.5 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#467B23] group-hover:scale-125 transition-transform" />
                  About Us
                </Link>
              </li>

              <li>
                <Link
                  href="/news"
                  className="text-gray-300 hover:text-white transition-colors flex items-center gap-1.5 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#467B23] group-hover:scale-125 transition-transform" />
                  News
                </Link>
              </li>

              <li>
                <Link
                  href="/articles"
                  className="text-gray-300 hover:text-white transition-colors flex items-center gap-1.5 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#467B23] group-hover:scale-125 transition-transform" />
                  Articles
                </Link>
              </li>

              <li>
                <Link
                  href="/contact"
                  className="text-gray-300 hover:text-white transition-colors flex items-center gap-1.5 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#467B23] group-hover:scale-125 transition-transform" />
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Dynamic Subcategories */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-sm font-bold tracking-wider uppercase text-[#467B23]">
              Specialized Sectors
            </h4>

            <div className="grid grid-cols-1 gap-2.5 text-sm">
              {subcategories?.map((subcat) => (
                <Link
                  href={`/jobs?subcategory=${encodeURIComponent(subcat.slug)}`}
                  key={subcat._id}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  <span className="capitalize">
                    {subcat.title}
                  </span>

                  {subcat.category?.title && (
                    <span className="text-gray-400 text-xs ml-1">
                      ({subcat.category.title})
                    </span>
                  )}
                </Link>
              ))}
            </div>
          </div>

          {/* Column 4: Newsletter */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-sm font-bold tracking-wider uppercase text-[#467B23]">
              Stay Connected
            </h4>

            <p className="text-gray-300 text-xs leading-relaxed">
              Subscribe to get notified about our latest healthcare and
              hospitality placements.
            </p>

            <form
              onSubmit={(e) => e.preventDefault()}
              className="space-y-2.5"
            >
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-sm text-white placeholder:text-gray-400 focus:outline-none focus:border-[#467B23]"
              />

              <button
                type="submit"
                className="w-full bg-[#467B23] text-white py-3 px-4 rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <span>Subscribe</span>
                <FiArrowRight size={14} />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Copyright Strip */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-4">
          <p>
            © {new Date().getFullYear()} BIMB Carebridge Ltd. All rights
            reserved.
          </p>

          <div className="flex items-center gap-6">
            <Link
              href="/privacy"
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>

            <Link
              href="/terms"
              className="hover:text-white transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}




// "use client";

// import Link from "next/link";
// import Image from "next/image";
// import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
// import { FiArrowRight } from "react-icons/fi";

// export default function Footer() {
//   return (
//     <footer className="w-full bg-linear-to-br from-[#0b2345] to-[#143A2F] text-white pt-16 pb-12">
//       <div className="px-5 md:px-12 lg:px-24 xl:px-40">
        
//         {/* Top Grid Content */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          
//           {/* Column 1: Brand & Bio (4 Cols) */}
//           <div className="lg:col-span-4 space-y-6">
//             <Link href="/" className="inline-block">
//               <div className="w-fit">
//                 <Image
//                   width={180}
//                   height={50}
//                   src="/Images/bimbWhite.webp"
//                   alt="Bimb Carebridge Logo"
//                   className="h-10 w-auto object-contain"
//                 />
//               </div>
//             </Link>
            
//             <p className="text-gray-300 text-sm leading-relaxed max-w-sm">
//               Connecting care and creating opportunities. We link qualified healthcare and hospitality professionals with organizations that value compassion and quality.
//             </p>

//             <div className="space-y-3 pt-2">
//               <a 
//                 href="tel:6475003737" 
//                 className="flex items-center gap-3 text-sm text-gray-300 hover:text-white transition-colors"
//               >
//                 <div className="w-8 h-8 rounded-lg bg-[#467B23]/20 text-[#467B23] flex items-center justify-center shrink-0">
//                   <FaPhoneAlt size={13} />
//                 </div>
//                 <span>647-500-3737</span>
//               </a>

//               <a 
//                 href="mailto:info@bimbcarebridge.com" 
//                 className="flex items-center gap-3 text-sm text-gray-300 hover:text-white transition-colors"
//               >
//                 <div className="w-8 h-8 rounded-lg bg-[#467B23]/20 text-[#467B23] flex items-center justify-center shrink-0">
//                   <FaEnvelope size={13} />
//                 </div>
//                 <span>info@bimbcarebridge.com</span>
//               </a>
//             </div>
//           </div>

//           {/* Column 2: Quick Links (2 Cols) */}
//           <div className="lg:col-span-2 space-y-4">
//             <h4 className="text-sm font-bold tracking-wider uppercase text-[#467B23]">
//               Quick Links
//             </h4>
//             <ul className="space-y-2.5 text-sm">
//               <li>
//                 <Link href="/jobs" className="text-gray-300 hover:text-white transition-colors flex items-center gap-1.5 group">
//                   <span className="w-1.5 h-1.5 rounded-full bg-[#467B23] group-hover:scale-125 transition-transform"></span>
//                   Find Jobs
//                 </Link>
//               </li>
//               <li>
//                 <Link href="/employers" className="text-gray-300 hover:text-white transition-colors flex items-center gap-1.5 group">
//                   <span className="w-1.5 h-1.5 rounded-full bg-[#467B23] group-hover:scale-125 transition-transform"></span>
//                   For Employers
//                 </Link>
//               </li>
//               <li>
//                 <Link href="/about" className="text-gray-300 hover:text-white transition-colors flex items-center gap-1.5 group">
//                   <span className="w-1.5 h-1.5 rounded-full bg-[#467B23] group-hover:scale-125 transition-transform"></span>
//                   About Us
//                 </Link>
//               </li>
//               <li>
//                 <Link href="/news" className="text-gray-300 hover:text-white transition-colors flex items-center gap-1.5 group">
//                   <span className="w-1.5 h-1.5 rounded-full bg-[#467B23] group-hover:scale-125 transition-transform"></span>
//                   News
//                 </Link>
//               </li>
//                           <li>
//                 <Link href="/articles" className="text-gray-300 hover:text-white transition-colors flex items-center gap-1.5 group">
//                   <span className="w-1.5 h-1.5 rounded-full bg-[#467B23] group-hover:scale-125 transition-transform"></span>
//                   Articles
//                 </Link>
//               </li>
//               <li>
//                 <Link href="/contact" className="text-gray-300 hover:text-white transition-colors flex items-center gap-1.5 group">
//                   <span className="w-1.5 h-1.5 rounded-full bg-[#467B23] group-hover:scale-125 transition-transform"></span>
//                   Contact Us
//                 </Link>
//               </li>
//             </ul>
//           </div>

//           {/* Column 3: Specialized Sectors (3 Cols) */}
//           <div className="lg:col-span-3 space-y-4">
//             <h4 className="text-sm font-bold tracking-wider uppercase text-[#467B23]">
//               Specialized Sectors
//             </h4>
//             <ul className="space-y-2.5 text-sm">
//               <li>
//                 <Link href="/jobs?category=Registered+Nurses" className="text-gray-300 hover:text-white transition-colors">
//                   Registered Nurses (RN)
//                 </Link>
//               </li>
//               <li>
//                 <Link href="/jobs?category=Personal+Support+Workers" className="text-gray-300 hover:text-white transition-colors">
//                   Support Workers (PSW)
//                 </Link>
//               </li>
//               <li>
//                 <Link href="/jobs?category=Wait+Staff" className="text-gray-300 hover:text-white transition-colors">
//                   Wait Staff & Servers
//                 </Link>
//               </li>
//               <li>
//                 <Link href="/jobs?category=Bartenders" className="text-gray-300 hover:text-white transition-colors">
//                   Bartenders & Mixologists
//                 </Link>
//               </li>
//               <li>
//                 <Link href="/jobs?category=Housekeeping" className="text-gray-300 hover:text-white transition-colors">
//                   Housekeeping Staff
//                 </Link>
//               </li>
//             </ul>
//           </div>

//           {/* Column 4: Newsletter / Call to Action (3 Cols) */}
//           <div className="lg:col-span-3 space-y-4">
//             <h4 className="text-sm font-bold tracking-wider uppercase text-[#467B23]">
//               Stay Connected
//             </h4>
//             <p className="text-gray-300 text-xs leading-relaxed">
//               Subscribe to get notified about our latest healthcare and hospitality placements.
//             </p>

//             <form onSubmit={(e) => e.preventDefault()} className="space-y-2.5">
//               <input 
//                 type="email" 
//                 placeholder="Enter your email" 
//                 className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-sm text-white placeholder:text-gray-400 focus:outline-none focus:border-[#467B23]"
//               />
//               <button 
//                 type="submit"
//                 className="w-full bg-[#467B23] text-white py-3 px-4 rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
//               >
//                 <span>Subscribe</span>
//                 <FiArrowRight size={14} />
//               </button>
//             </form>
//           </div>

//         </div>

//         {/* Bottom Copyright Strip */}
//         <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-4">
//           <p>© {new Date().getFullYear()} BIMB Carebridge Ltd. All rights reserved.</p>
//           <div className="flex items-center gap-6">
//             <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
//             <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
//           </div>
//         </div>

//       </div>
//     </footer>
//   );
// }