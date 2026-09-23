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
  BookOpen,
  Bookmark,
  ChevronRight,
} from "lucide-react";
import { useContext } from "react";
import { JobDataContext } from "@/app/context/JobDataContext";
import AuthModal from "@/app/components/AuthModal";
import Image from "next/image";



export default function ArticleSlugPage() {
  const params = useParams();
  const rawSlug = params?.slug;
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isBookmarked, setIsBookmarked] = useState(false);

const { getArticleBySlug, articles, contentLoading } =
  useContext(JobDataContext);

useEffect(() => {
  if (!rawSlug) return;

  const fetchArticle = async () => {
    setLoading(true);

    try {
      const article = await getArticleBySlug(rawSlug);
      setItem(article);
    } catch (error) {
      console.error("Error fetching article:", error);
      setItem(null);
    } finally {
      setLoading(false);
    }
  };

  fetchArticle();
}, [rawSlug, getArticleBySlug]);

  const handleBookmark = (e) => {
    e.preventDefault();
    setIsAuthModalOpen(true);
  };

  // Extract other related articles/news from the same category for the sidebar widget
const relatedItems = useMemo(() => {
  if (!item || !Array.isArray(articles)) return [];

  return articles
    .filter(
      (article) =>
        article._id !== item._id &&
        article.category === item.category
    )
    .slice(0, 5);
}, [item, articles]);

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

  if (!item) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center px-5">
        <div className="bg-white p-8 sm:p-12 border border-[#01193B]/10 text-center max-w-lg w-full shadow-sm rounded-3xl">
          <div className="w-16 h-16 bg-[#467B23]/10 flex items-center justify-center mx-auto mb-6 rounded-2xl">
            <BookOpen size={28} className="text-[#467B23]" />
          </div>
          <h2 className="text-xl sm:text-2xl font-medium text-[#01193B] mb-3">
            Article / News Not Found
          </h2>
          <p className="text-[#01193B]/60 text-sm mb-8">
            The publication or news update you are looking for might have been moved, removed, or the link is incorrect.
          </p>
          <Link
            href="/articles"
            className="bg-[#01193B] hover:bg-[#01193B]/90 text-white px-8 py-3.5 text-xs font-semibold uppercase tracking-wider transition-all inline-block rounded-xl"
          >
            Back to Publications
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
            href="/articles"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#01193B]/60 hover:text-[#467B23] transition-colors"
          >
            <ArrowLeft size={16} /> Back to Articles & News
          </Link>
        </div>

        {/* Top Header Card */}
        <div className="mb-6 sm:mb-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-[#467B23]/10 text-[#467B23] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider rounded-lg">
                {item.category}
              </span>
              <span className="bg-gray-100 text-[#01193B]/70 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider rounded-lg">
                {item.readTime || "3 min read"}
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium text-[#01193B] tracking-tight">
              {item.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-1 text-xs sm:text-sm text-[#01193B]/70">
              <span className="flex items-center gap-1.5">
                <User size={15} className="text-[#467B23] shrink-0" />{" "}
                {item.author || "Editorial Team"}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar size={15} className="text-[#467B23] shrink-0" />{" "}
                {item.date || "Recent"}
              </span>
       <span className="flex items-center gap-1.5 font-bold text-[#467B23]">
  <Clock size={15} className="shrink-0" />
  3 min read
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
              <Bookmark size={15} /> {isBookmarked ? "Saved Publication" : "Save Publication"}
            </button>
            <button
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                alert("Link copied to clipboard!");
              }}
              className="px-6 py-3.5 text-xs font-semibold uppercase tracking-wider bg-[#F8FAFC] border border-[#01193B]/10 hover:border-[#01193B]/30 text-[#01193B] flex items-center justify-center gap-2 transition-all rounded-xl"
            >
              <Share2 size={14} /> Share Publication
            </button>
          </div>
        </div>

        {/* Featured Image Banner */}
        {item.thumbnail  && (
          <div className="mb-8 sm:mb-10 w-full h-[280px] sm:h-[400px] lg:h-[480px] rounded-3xl overflow-hidden border border-[#01193B]/10 shadow-sm">
            <img
              src={item.thumbnail}
              alt={item.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Main Body Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-start">
          {/* Left Content Details */}
          <div className="lg:col-span-2 space-y-6 sm:space-y-8 bg-white border border-[#01193B]/10 p-6 sm:p-10 rounded-3xl shadow-sm">
            <div className="space-y-4 sm:space-y-6">
            <div className="text-[#01193B]/80 text-sm sm:text-base leading-relaxed space-y-8 font-light">
  {Array.isArray(item.content) ? (
    item.content.map((section, index) => (
      <div key={index} className="space-y-4">
        {section.title && (
          <h2 className="text-xl sm:text-2xl font-semibold text-[#01193B]">
            {section.title}
          </h2>
        )}

        {section.image && (
          <Image width={1920} height={420}
            src={section.image}
            alt={section.title || item.title}
            className="w-full max-h-[420px] object-cover rounded-2xl"
          />
        )}

        {section.des && (
          <p className="whitespace-pre-line">
            {section.des}
          </p>
        )}
      </div>
    ))
  ) : (
    <p className="whitespace-pre-line">
      {item.content}
    </p>
  )}
</div>
            </div>

            {/* Author / Source Box */}
            <div className="pt-6 border-t border-[#01193B]/10 flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-[#467B23]/10 flex items-center justify-center text-[#467B23] font-bold text-lg shrink-0">
                {item.author ? item.author.charAt(0) : "E"}
              </div>
              <div>
                <h4 className="font-semibold text-[#01193B] text-base">
                  Published by {item.author || "Editorial Staff"}
                </h4>
                <p className="text-xs text-[#01193B]/60 mt-0.5 leading-relaxed">
                  Featured under {item.category} publications & news releases.
                </p>
              </div>
            </div>
          </div>

          {/* Right Sidebar Details */}
          <div className="space-y-6 lg:sticky lg:top-28">
            {/* Overview Card */}
            <div className="bg-white border border-[#01193B]/10 p-5 sm:p-6 lg:p-8 shadow-sm rounded-3xl space-y-6">
              <h3 className="text-lg font-semibold text-[#01193B] border-b border-[#01193B]/10 pb-4">
                Overview
              </h3>

              <div className="space-y-4 text-sm">
                <div className="flex items-center justify-between py-2 border-b border-gray-100 gap-2">
                  <span className="text-[#01193B]/50 flex items-center gap-2">
                    <User size={16} className="text-[#467B23]" /> Author
                  </span>
                  <span className="font-semibold text-[#01193B] text-right">
                    {item.author || "Staff"}
                  </span>
                </div>

                <div className="flex items-center justify-between py-2 border-b border-gray-100 gap-2">
                  <span className="text-[#01193B]/50 flex items-center gap-2">
                    <Clock size={16} className="text-[#467B23]" /> Read Time
                  </span>
                  <span className="font-semibold text-[#01193B] text-right">
                    {item.readTime || "3 min read"}
                  </span>
                </div>

                <div className="flex items-center justify-between py-2 border-b border-gray-100 gap-2">
                  <span className="text-[#01193B]/50 flex items-center gap-2">
                    <Calendar size={16} className="text-[#467B23]" /> Date
                  </span>
                  <span className="font-semibold text-[#01193B] text-right">
                    {item.createdAt
  ? new Date(item.createdAt).toLocaleDateString()
  : "Recent"}
                    
                    {/* {item.date || "Recent"} */}
                  </span>
                </div>

                <div className="flex items-center justify-between py-2">
                  <span className="text-[#01193B]/50 flex items-center gap-2">
                    <BookOpen size={16} className="text-[#467B23]" /> Category
                  </span>
                  <span className="font-semibold text-[#467B23]">
                    {item.category}
                  </span>
                </div>
              </div>

              <button
                onClick={handleBookmark}
                className="w-full py-4 text-xs font-semibold uppercase tracking-wider transition-all duration-300 shadow-sm text-center rounded-xl bg-[#01193B] hover:bg-[#01193B]/90 text-white flex items-center justify-center gap-2"
              >
                <Bookmark size={14} /> Bookmark Publication
              </button>
            </div>

            {/* Related Widget */}
            {relatedItems.length > 0 && (
              <div className="bg-white border border-[#01193B]/10 p-5 sm:p-6 lg:p-8 shadow-sm rounded-3xl space-y-4">
                <div className="border-b border-[#01193B]/10 pb-3 flex items-center justify-between">
                  <h3 className="text-base font-semibold text-[#01193B]">
                    Related Updates
                  </h3>
                  <span className="text-[11px] font-semibold text-[#467B23] bg-[#467B23]/10 px-2.5 py-1 rounded-lg">
                    {relatedItems.length} items
                  </span>
                </div>

                <div className="space-y-3.5">
                  {relatedItems.map((other) => (
                    <Link
                      key={other._id}
                      href={`/articles/${encodeURIComponent(other.slug)}`}
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
                    href="/articles"
                    className="text-xs font-bold text-[#467B23] hover:underline inline-flex items-center gap-1 uppercase tracking-wider"
                  >
                    View all publications <ChevronRight size={14} />
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
            alert("Link copied to clipboard!");
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
          <Bookmark size={15} /> Save Publication
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