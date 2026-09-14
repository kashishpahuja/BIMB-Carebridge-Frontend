'use client';

import { useState, useEffect, useMemo } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Share2,
  User,
  Newspaper,
  Bookmark,
  ChevronRight,
} from "lucide-react";
import articleData from "@/app/data/sampleArticles.json"; // Adjust path if necessary
import AuthModal from "@/app/components/AuthModal";

export default function NewsSlugPage() {
  const params = useParams();
  const rawSlug = params?.slug;
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const [newsItem, setNewsItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    if (!rawSlug) return;

    // Search specifically within the news array
    const foundNews = (articleData.news || []).find(
      (item) => item.slug === rawSlug
    );

    const timer = setTimeout(() => {
      setNewsItem(foundNews || null);
      setLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [rawSlug]);

  const handleBookmark = (e) => {
    e.preventDefault();
    setIsAuthModalOpen(true);
  };

  // Extract related news items from the same category for the sidebar widget
  const relatedNews = useMemo(() => {
    if (!newsItem) return [];
    return (articleData.news || [])
      .filter(
        (item) =>
          item._id !== newsItem._id && item.category === newsItem.category
      )
      .slice(0, 5);
  }, [newsItem]);

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

  if (!newsItem) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center px-5">
        <div className="bg-white p-8 sm:p-12 border border-[#01193B]/10 text-center max-w-lg w-full shadow-sm rounded-3xl">
          <div className="w-16 h-16 bg-[#467B23]/10 flex items-center justify-center mx-auto mb-6 rounded-2xl">
            <Newspaper size={28} className="text-[#467B23]" />
          </div>
          <h2 className="text-xl sm:text-2xl font-medium text-[#01193B] mb-3">
            News Release Not Found
          </h2>
          <p className="text-[#01193B]/60 text-sm mb-8">
            The news update you are looking for might have been moved, removed, or the link is incorrect.
          </p>
          <Link
            href="/news"
            className="bg-[#01193B] hover:bg-[#01193B]/90 text-white px-8 py-3.5 text-xs font-semibold uppercase tracking-wider transition-all inline-block rounded-xl"
          >
            Back to News & Press
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
            href="/news"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#01193B]/60 hover:text-[#467B23] transition-colors"
          >
            <ArrowLeft size={16} /> Back to News & Press Releases
          </Link>
        </div>

        {/* Top Header Card */}
        <div className="mb-6 sm:mb-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-[#467B23]/10 text-[#467B23] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider rounded-lg">
                {newsItem.category}
              </span>
              <span className="bg-gray-100 text-[#01193B]/70 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider rounded-lg">
                {newsItem.readTime || "3 min read"}
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium text-[#01193B] tracking-tight">
              {newsItem.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-1 text-xs sm:text-sm text-[#01193B]/70">
              <span className="flex items-center gap-1.5">
                <User size={15} className="text-[#467B23] shrink-0" />{" "}
                {newsItem.author || "Press Desk"}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar size={15} className="text-[#467B23] shrink-0" />{" "}
                {newsItem.date || "Recent"}
              </span>
              <span className="flex items-center gap-1.5 font-bold text-[#467B23]">
                <Clock size={15} className="shrink-0" />{" "}
                {newsItem.readTime || "3 min read"}
              </span>
            </div>
          </div>

          {/* Desktop Action Buttons */}
          <div className="hidden lg:flex flex-col gap-3 shrink-0 w-60">
            <button
              onClick={handleBookmark}
              className={`px-6 py-4 text-xs font-semibold uppercase tracking-wider transition-all duration-300 shadow-sm text-center rounded-xl flex items-center justify-center gap-2 ${
                isBookmarked
                  ? "bg-[#467B23] text-white cursor-default"
                  : "bg-[#01193B] hover:bg-[#01193B]/90 text-white"
              }`}
            >
              <Bookmark size={15} /> {isBookmarked ? "Saved Release" : "Save Release"}
            </button>
            <button
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                alert("News link copied to clipboard!");
              }}
              className="px-6 py-3.5 text-xs font-semibold uppercase tracking-wider bg-[#F8FAFC] border border-[#01193B]/10 hover:border-[#01193B]/30 text-[#01193B] flex items-center justify-center gap-2 transition-all rounded-xl"
            >
              <Share2 size={14} /> Share Release
            </button>
          </div>
        </div>

        {/* featuredImage Banner */}
        {newsItem.featuredImage && (
          <div className="mb-8 sm:mb-10 w-full h-[280px] sm:h-[400px] lg:h-[480px] rounded-3xl overflow-hidden border border-[#01193B]/10 shadow-sm">
            <img
              src={newsItem.featuredImage}
              alt={newsItem.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Main Body Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-start">
          {/* Left Content Details (Mapping through schema's content array) */}
          <div className="lg:col-span-2 space-y-8 bg-white border border-[#01193B]/10 p-6 sm:p-10 rounded-3xl shadow-sm">
            {newsItem.shortDescription && (
              <p className="text-base sm:text-lg font-medium text-[#01193B] leading-relaxed border-b border-[#01193B]/10 pb-6">
                {newsItem.shortDescription}
              </p>
            )}

            <div className="space-y-8">
              {newsItem.description && newsItem.description.length > 0 ? (
                newsItem.description.map((section, idx) => (
                  <div key={idx} className="space-y-4">
                    {section.title && (
                      <h3 className="text-lg sm:text-xl font-semibold text-[#01193B]">
                        {section.title}
                      </h3>
                    )}
                    {section.des && (
                      <p className="text-[#01193B]/80 text-sm sm:text-base leading-relaxed font-light whitespace-pre-line">
                        {section.des}
                      </p>
                    )}
                    {section.image && (
                      <div className="my-6 rounded-2xl overflow-hidden border border-[#01193B]/10 h-64 sm:h-80">
                        <img
                          src={section.image}
                          alt={section.title || "News section illustration"}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-[#01193B]/70 text-sm">No detailed content available.</p>
              )}
            </div>

            {/* Author / Press Desk Footer Box */}
            <div className="pt-6 border-t border-[#01193B]/10 flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-[#467B23]/10 flex items-center justify-center text-[#467B23] font-bold text-lg shrink-0">
                {newsItem.author ? newsItem.author.charAt(0) : "P"}
              </div>
              <div>
                <h4 className="font-semibold text-[#01193B] text-base">
                  Released by {newsItem.author || "Press Team"}
                </h4>
                <p className="text-xs text-[#01193B]/60 mt-0.5 leading-relaxed">
                  Official corporate release and announcement under {newsItem.category}.
                </p>
              </div>
            </div>
          </div>

          {/* Right Sidebar Details */}
          <div className="space-y-6 lg:sticky lg:top-28">
            {/* Overview Card */}
            <div className="bg-white border border-[#01193B]/10 p-5 sm:p-6 lg:p-8 shadow-sm rounded-3xl space-y-6">
              <h3 className="text-lg font-semibold text-[#01193B] border-b border-[#01193B]/10 pb-4">
                Release Meta
              </h3>

              <div className="space-y-4 text-sm">
                <div className="flex items-center justify-between py-2 border-b border-gray-100 gap-2">
                  <span className="text-[#01193B]/50 flex items-center gap-2">
                    <User size={16} className="text-[#467B23]" /> Author
                  </span>
                  <span className="font-semibold text-[#01193B] text-right">
                    {newsItem.author || "Press Desk"}
                  </span>
                </div>

                <div className="flex items-center justify-between py-2 border-b border-gray-100 gap-2">
                  <span className="text-[#01193B]/50 flex items-center gap-2">
                    <Clock size={16} className="text-[#467B23]" /> Read Time
                  </span>
                  <span className="font-semibold text-[#01193B] text-right">
                    {newsItem.readTime || "3 min read"}
                  </span>
                </div>

                <div className="flex items-center justify-between py-2 border-b border-gray-100 gap-2">
                  <span className="text-[#01193B]/50 flex items-center gap-2">
                    <Calendar size={16} className="text-[#467B23]" /> Date
                  </span>
                  <span className="font-semibold text-[#01193B] text-right">
                    {newsItem.date || "Recent"}
                  </span>
                </div>

                <div className="flex items-center justify-between py-2">
                  <span className="text-[#01193B]/50 flex items-center gap-2">
                    <Newspaper size={16} className="text-[#467B23]" /> Category
                  </span>
                  <span className="font-semibold text-[#467B23]">
                    {newsItem.category}
                  </span>
                </div>
              </div>

              <button
                onClick={handleBookmark}
                className="w-full py-4 text-xs font-semibold uppercase tracking-wider transition-all duration-300 shadow-sm text-center rounded-xl bg-[#01193B] hover:bg-[#01193B]/90 text-white flex items-center justify-center gap-2"
              >
                <Bookmark size={14} /> Bookmark Release
              </button>
            </div>

            {/* Related News Widget */}
            {relatedNews.length > 0 && (
              <div className="bg-white border border-[#01193B]/10 p-5 sm:p-6 lg:p-8 shadow-sm rounded-3xl space-y-4">
                <div className="border-b border-[#01193B]/10 pb-3 flex items-center justify-between">
                  <h3 className="text-base font-semibold text-[#01193B]">
                    More Announcements
                  </h3>
                  <span className="text-[11px] font-semibold text-[#467B23] bg-[#467B23]/10 px-2.5 py-1 rounded-lg">
                    {relatedNews.length} updates
                  </span>
                </div>

                <div className="space-y-3.5">
                  {relatedNews.map((other) => (
                    <Link
                      key={other._id}
                      href={`/news/${other.slug}`}
                      className="group block p-3 rounded-2xl hover:bg-[#F8FAFC] border border-transparent hover:border-[#01193B]/10 transition-all"
                    >
                      <h4 className="text-xs font-semibold text-[#01193B] group-hover:text-[#467B23] transition-colors line-clamp-1">
                        {other.title}
                      </h4>
                      <p className="text-[11px] text-[#01193B]/50 truncate mt-0.5">
                        {other.category} • {other.date || "Recent"}
                      </p>
                    </Link>
                  ))}
                </div>

                <div className="pt-2 border-t border-[#01193B]/10 text-center">
                  <Link
                    href="/news"
                    className="text-xs font-bold text-[#467B23] hover:underline inline-flex items-center gap-1 uppercase tracking-wider"
                  >
                    View all news releases <ChevronRight size={14} />
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Mobile Sticky Bottom Action Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-[#01193B]/10 p-4 px-5 z-50 flex items-center gap-3 shadow-[0_-10px_25px_rgba(0,0,0,0.08)]">
        <button
          onClick={() => {
            navigator.clipboard.writeText(window.location.href);
            alert("News link copied to clipboard!");
          }}
          className="p-3.5 bg-[#F8FAFC] border border-[#01193B]/10 text-[#01193B] rounded-xl flex items-center justify-center shrink-0 active:scale-95 transition-transform"
          aria-label="Share"
        >
          <Share2 size={18} />
        </button>

        <button
          onClick={handleBookmark}
          className="flex-1 py-3.5 px-4 text-xs font-semibold uppercase tracking-wider rounded-xl transition-all shadow-md text-center bg-[#01193B] text-white active:scale-[0.98] flex items-center justify-center gap-2"
        >
          <Bookmark size={15} /> Save Release
        </button>
      </div>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialTab="signup"
      />
    </div>
  );
}