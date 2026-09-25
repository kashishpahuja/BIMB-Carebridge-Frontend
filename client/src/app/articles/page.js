"use client";

import { useContext } from "react";
import Link from "next/link";
import {
  Calendar,
  ArrowRight,
  Eye,
} from "lucide-react";

import { JobDataContext } from "../context/JobDataContext";

const serverOrigin =
  process.env.NEXT_PUBLIC_SERVER_ORIGIN || "http://localhost:8000";

export default function ArticlesListPage() {
  const {
    articles,
    contentLoading,
  } = useContext(JobDataContext);

  const getImageUrl = (image) => {
    if (!image) return null;

    // Already a complete URL
    if (image.startsWith("http://") || image.startsWith("https://")) {
      return image;
    }

    // Relative backend path
    return `${serverOrigin}${image.startsWith("/") ? "" : "/"}${image}`;
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-32 pt-6 sm:pt-12 lg:pt-20">
      <section className="px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24 max-w-[1600px] mx-auto space-y-10">

        {/* Header */}
        <div className="border-b border-[#01193B]/10 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="bg-[#467B23]/10 text-[#467B23] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider rounded-lg">
              Our Publications
            </span>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-medium text-[#01193B] mt-2 tracking-tight">
              Articles & Insights
            </h1>
          </div>

          <p className="text-sm text-[#01193B]/60 max-w-md">
            Explore expert perspectives, industry analysis, updates, and
            professional guides.
          </p>
        </div>

        {/* Loading */}
        {contentLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="bg-white border border-[#01193B]/10 rounded-3xl overflow-hidden shadow-sm animate-pulse"
              >
                <div className="w-full h-48 sm:h-56 bg-gray-200" />

                <div className="p-6 sm:p-8 space-y-4">
                  <div className="h-4 bg-gray-200 rounded w-1/3" />
                  <div className="h-6 bg-gray-200 rounded w-4/5" />

                  <div className="space-y-2">
                    <div className="h-3 bg-gray-200 rounded" />
                    <div className="h-3 bg-gray-200 rounded w-5/6" />
                    <div className="h-3 bg-gray-200 rounded w-4/6" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : !articles || articles.length === 0 ? (
          <div className="bg-white p-12 text-center border border-[#01193B]/10 rounded-3xl">
            <p className="text-[#01193B]/60">
              No articles found.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">

            {articles.map((article) => {
              const formattedDate = article.createdAt
                ? new Date(article.createdAt).toLocaleDateString(
                    "en-US",
                    {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    }
                  )
                : "Recent";

              const imageUrl = getImageUrl(article.thumbnail);

              return (
                <Link
                  key={article._id || article.slug}
                  href={`/articles/${encodeURIComponent(article.slug)}`}
                  className="group bg-white border border-[#01193B]/10 hover:border-[#467B23]/50 transition-all duration-300 rounded-3xl overflow-hidden shadow-sm flex flex-col"
                >

                  {/* Thumbnail */}
                  {imageUrl ? (
                    <div className="w-full h-48 sm:h-56 overflow-hidden bg-gray-100">
                      <img
                        src={imageUrl}
                        alt={article.title || "Article"}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-full h-48 sm:h-56 bg-[#01193B]/5 flex items-center justify-center">
                      <span className="text-[#01193B]/30 text-sm">
                        No Image
                      </span>
                    </div>
                  )}

                  {/* Card Content */}
                  <div className="p-6 sm:p-8 space-y-4 flex-1 flex flex-col">

                    <div className="space-y-3 flex-1">

                      {/* Category + Status */}
                      <div className="flex items-center justify-between gap-2">
                        {article.category ? (
                          <span className="bg-[#467B23]/10 text-[#467B23] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider rounded-md">
                            {article.category}
                          </span>
                        ) : (
                          <span />
                        )}

                        {article.status && (
                          <span className="text-[10px] font-semibold uppercase tracking-wider text-[#01193B]/40">
                            {article.status}
                          </span>
                        )}
                      </div>

                      {/* Title */}
                      <h3 className="text-lg font-semibold text-[#01193B] group-hover:text-[#467B23] transition-colors leading-snug line-clamp-2">
                        {article.title}
                      </h3>

                      {/* Short Description */}
                      <p className="text-xs text-[#01193B]/70 font-light line-clamp-3 leading-relaxed">
                        {article.shortDescription ||
                          "Read the latest article and insights from our publication."}
                      </p>

                      {/* Tags */}
                      {Array.isArray(article.tags) &&
                        article.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 pt-1">
                            {article.tags
                              .slice(0, 3)
                              .map((tag, index) => (
                                <span
                                  key={`${tag}-${index}`}
                                  className="text-[10px] bg-gray-100 text-[#01193B]/60 px-2 py-1 rounded-md"
                                >
                                  #{tag}
                                </span>
                              ))}
                          </div>
                        )}
                    </div>

                    {/* Bottom Info */}
                    <div className="pt-4 border-t border-gray-100 flex items-center justify-between gap-3 text-xs">

                      <div className="flex items-center gap-3 text-[#01193B]/50">
                        <span className="flex items-center gap-1">
                          <Calendar size={13} />
                          {formattedDate}
                        </span>

                        <span className="flex items-center gap-1">
                          <Eye size={13} />
                          {article.views || 0}
                        </span>
                      </div>

                      <span className="text-[#467B23] font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform shrink-0">
                        Read Article
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