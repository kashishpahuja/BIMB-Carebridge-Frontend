'use client';

import { useState } from "react";
import Link from "next/link";
import { Clock, ArrowRight } from "lucide-react";
import articleData from "../data/sampleArticles.json"; // Adjust path to match your JSON data location

const createSlug = (text) => {
  return text
    .toLowerCase()
    .replace(/[()]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

export default function ArticlesListPage() {
  const articles = articleData.articles || [];

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-32 pt-6 sm:pt-12 lg:pt-20">
      <section className="px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24 max-w-[1600px] mx-auto space-y-10">
        
        {/* Header Title Section */}
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
            Explore expert perspectives, industry analysis, updates, and professional guides.
          </p>
        </div>

        {/* Articles Grid */}
        {articles.length === 0 ? (
          <div className="bg-white p-12 text-center border border-[#01193B]/10 rounded-3xl">
            <p className="text-[#01193B]/60">No articles found. Please check your data source.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {articles.map((article) => {
              const slug = createSlug(article.title);
              return (
                <Link
                  key={article._id || slug}
                  href={`/articles/${slug}`}
                  className="group bg-white border border-[#01193B]/10 hover:border-[#467B23]/50 transition-all duration-300 rounded-3xl overflow-hidden shadow-sm flex flex-col justify-between"
                >
                  {article.image && (
                    <div className="w-full h-48 sm:h-56 overflow-hidden bg-gray-100">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="p-6 sm:p-8 space-y-4 flex-1 flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="bg-[#467B23]/10 text-[#467B23] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider rounded-md">
                          {article.category}
                        </span>
                        <span className="text-xs text-[#01193B]/50 flex items-center gap-1">
                          <Clock size={13} /> {article.readTime || "5 min read"}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold text-[#01193B] group-hover:text-[#467B23] transition-colors leading-snug line-clamp-2">
                        {article.title}
                      </h3>
                <p className="text-xs text-[#01193B]/70 font-light line-clamp-3 leading-relaxed">
  {article.shortDescription}
</p>
                    </div>

                    <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs font-semibold text-[#01193B]">
                      <span className="text-[#01193B]/50">{article.author || "Editorial Staff"}</span>
                      <span className="text-[#467B23] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        Read Article <ArrowRight size={14} />
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