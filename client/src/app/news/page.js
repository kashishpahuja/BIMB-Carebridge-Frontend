"use client";

import Link from "next/link";
import { Clock, ArrowRight } from "lucide-react";
import { useContext } from "react";
import { JobDataContext } from "@/app/context/JobDataContext";

const serverOrigin =
  process.env.NEXT_PUBLIC_SERVER_ORIGIN ||
  "http://localhost:8000";

const getImageUrl = (image) => {
  if (!image) return null;

  if (
    image.startsWith("http://") ||
    image.startsWith("https://")
  ) {
    return image;
  }

  return `${serverOrigin}${image.startsWith("/") ? "" : "/"}${image}`;
};

const formatDate = (date) => {
  if (!date) return "Recent";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "Recent";
  }

  return parsedDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

export default function NewsListPage() {
  const { news, contentLoading } = useContext(JobDataContext);

  const newsItems = Array.isArray(news) ? news : [];

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden bg-[#F8FAFC] pb-32 pt-6 sm:pt-12 lg:pt-20">
      <section className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24 space-y-10">

        {/* Header */}
        <div className="border-b border-[#01193B]/10 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="min-w-0">
            <span className="inline-block bg-[#467B23]/10 text-[#467B23] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider rounded-lg">
              Press & Releases
            </span>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-medium text-[#01193B] mt-2 tracking-tight break-words">
              Latest News & Announcements
            </h1>
          </div>

          <p className="text-sm text-[#01193B]/60 max-w-md leading-relaxed">
            Stay up to date with company milestones, community events,
            product rollouts, and updates.
          </p>
        </div>

        {/* Loading */}
        {contentLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="bg-white border border-[#01193B]/10 rounded-3xl overflow-hidden animate-pulse"
              >
                <div className="w-full h-48 sm:h-56 bg-gray-200" />

                <div className="p-6 sm:p-8 space-y-4">
                  <div className="h-4 w-24 bg-gray-200 rounded" />
                  <div className="h-6 w-4/5 bg-gray-200 rounded" />
                  <div className="h-4 w-full bg-gray-200 rounded" />
                  <div className="h-4 w-3/4 bg-gray-200 rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : newsItems.length === 0 ? (
          /* Empty State */
          <div className="bg-white p-12 text-center border border-[#01193B]/10 rounded-3xl">
            <p className="text-[#01193B]/60">
              No news announcements found at this moment.
            </p>
          </div>
        ) : (
          /* News Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {newsItems.map((item) => {
              const imageUrl = getImageUrl(item.featuredImage);

              return (
                <Link
                  key={item._id || item.slug}
                  href={`/news/${item.slug}`}
                  className="group min-w-0 bg-white border border-[#01193B]/10 hover:border-[#467B23]/50 transition-all duration-300 rounded-3xl overflow-hidden shadow-sm flex flex-col"
                >
                  {/* Featured Image */}
                  {imageUrl && (
                    <div className="w-full h-48 sm:h-56 overflow-hidden bg-gray-100">
                      <img
                        src={imageUrl}
                        alt={item.title || "News"}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  {/* Content */}
                  <div className="p-6 sm:p-8 space-y-4 flex-1 flex flex-col justify-between">
                    <div className="space-y-3">

                      {/* Category + Date */}
                      <div className="flex items-center justify-between gap-3">
                        {item.category ? (
                          <span className="bg-[#467B23]/10 text-[#467B23] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider rounded-md truncate max-w-[65%]">
                            {item.category}
                          </span>
                        ) : (
                          <span />
                        )}

                        <span className="text-xs text-[#01193B]/50 flex items-center gap-1 shrink-0">
                          <Clock size={13} />

                          {formatDate(item.publicationDate)}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-lg font-semibold text-[#01193B] group-hover:text-[#467B23] transition-colors leading-snug line-clamp-2 break-words">
                        {item.title}
                      </h3>

                      {/* Description */}
                      <p className="text-xs text-[#01193B]/70 font-light line-clamp-3 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    {/* Footer */}
                    <div className="pt-4 border-t border-gray-100 flex items-center justify-between gap-3 text-xs font-semibold text-[#01193B]">
                      <span className="text-[#01193B]/50 shrink-0">
                        {formatDate(item.publicationDate)}
                      </span>

                      <span className="text-[#467B23] flex items-center gap-1 group-hover:translate-x-1 transition-transform text-right">
                        Read Release
                        <ArrowRight size={14} />
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}


// 'use client';

// import Link from "next/link";
// import { Clock, ArrowRight } from "lucide-react";
// import articleData from "@/app/data/sampleArticles.json"; // Adjust path if necessary

// export default function NewsListPage() {
//   const newsItems = articleData.news || [];

//   return (
//     <div className="min-h-screen bg-[#F8FAFC] pb-32 pt-6 sm:pt-12 lg:pt-20">
//       <section className="px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24 max-w-[1600px] mx-auto space-y-10">
        
//         {/* Header Title Section */}
//         <div className="border-b border-[#01193B]/10 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
//           <div>
//             <span className="bg-[#467B23]/10 text-[#467B23] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider rounded-lg">
//               Press & Releases
//             </span>
//             <h1 className="text-2xl sm:text-3xl lg:text-4xl font-medium text-[#01193B] mt-2 tracking-tight">
//               Latest News & Announcements
//             </h1>
//           </div>
//           <p className="text-sm text-[#01193B]/60 max-w-md">
//             Stay up to date with company mile stones, community events, product rollouts, and updates.
//           </p>
//         </div>

//         {/* News Grid */}
//         {newsItems.length === 0 ? (
//           <div className="bg-white p-12 text-center border border-[#01193B]/10 rounded-3xl">
//             <p className="text-[#01193B]/60">No news announcements found at this moment.</p>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
//             {newsItems.map((item) => {
//               return (
//                 <Link
//                   key={item._id || item.slug}
//                   href={`/news/${item.slug}`}
//                   className="group bg-white border border-[#01193B]/10 hover:border-[#467B23]/50 transition-all duration-300 rounded-3xl overflow-hidden shadow-sm flex flex-col justify-between"
//                 >
//                   {item.thumbnail && (
//                     <div className="w-full h-48 sm:h-56 overflow-hidden bg-gray-100">
//                       <img
//                         src={item.thumbnail}
//                         alt={item.title}
//                         className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
//                       />
//                     </div>
//                   )}
//                   <div className="p-6 sm:p-8 space-y-4 flex-1 flex flex-col justify-between">
//                     <div className="space-y-3">
//                       <div className="flex items-center justify-between">
//                         <span className="bg-[#467B23]/10 text-[#467B23] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider rounded-md">
//                           {item.category}
//                         </span>
//                         <span className="text-xs text-[#01193B]/50 flex items-center gap-1">
//                           <Clock size={13} /> {item.readTime || "3 min read"}
//                         </span>
//                       </div>
//                       <h3 className="text-lg font-semibold text-[#01193B] group-hover:text-[#467B23] transition-colors leading-snug line-clamp-2">
//                         {item.title}
//                       </h3>
//                       <p className="text-xs text-[#01193B]/70 font-light line-clamp-3 leading-relaxed">
//                         {item.shortDescription || (item.description && item.description[0]?.des)}
//                       </p>
//                     </div>

//                     <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs font-semibold text-[#01193B]">
//                       <span className="text-[#01193B]/50">{item.date || "Recent"}</span>
//                       <span className="text-[#467B23] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
//                         Read Release <ArrowRight size={14} />
//                       </span>
//                     </div>
//                   </div>
//                 </Link>
//               );
//             })}
//           </div>
//         )}
//       </section>
//     </div>
//   );
// }