"use client";

import { useState, useEffect, useMemo, useContext } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

import {
  ArrowLeft,
  Calendar,
  Share2,
  BookOpen,
  Bookmark,
  ChevronRight,
  Eye,
} from "lucide-react";

import { JobDataContext } from "@/app/context/JobDataContext";
import AuthModal from "@/app/components/AuthModal";

const serverOrigin =
  process.env.NEXT_PUBLIC_SERVER_ORIGIN || "http://localhost:8000";

export default function ArticleSlugPage() {
  const params = useParams();

  const rawSlug = Array.isArray(params?.slug)
    ? params.slug[0]
    : params?.slug;

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const { getArticleBySlug, articles } =
    useContext(JobDataContext);

  /* --------------------------------
     Image URL
  -------------------------------- */

  const getImageUrl = (image) => {
    if (!image) return null;

    if (
      image.startsWith("http://") ||
      image.startsWith("https://")
    ) {
      return image;
    }

    return `${serverOrigin}${
      image.startsWith("/") ? "" : "/"
    }${image}`;
  };

  /* --------------------------------
     Fetch Article
  -------------------------------- */

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


  /* --------------------------------
     Share
  -------------------------------- */

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(
        window.location.href
      );

      alert("Link copied to clipboard!");
    } catch (error) {
      console.error("Unable to copy link:", error);
    }
  };

  /* --------------------------------
     Related Articles
  -------------------------------- */

  const relatedItems = useMemo(() => {
    if (!item || !Array.isArray(articles)) {
      return [];
    }

    return articles
      .filter(
        (article) =>
          article._id !== item._id &&
          article.category === item.category &&
          article.slug
      )
      .slice(0, 5);
  }, [item, articles]);

  /* --------------------------------
     Date
  -------------------------------- */

  const formattedDate = item?.createdAt
    ? new Date(item.createdAt).toLocaleDateString(
        "en-US",
        {
          year: "numeric",
          month: "long",
          day: "numeric",
        }
      )
    : "Recent";

  /* --------------------------------
     Loading
  -------------------------------- */

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center px-4">
        <div className="animate-pulse flex flex-col items-center space-y-4">
          <div className="w-12 h-12 bg-[#01193B]/15 rounded-full" />

          <div className="w-48 max-w-full h-5 bg-[#01193B]/10 rounded" />

          <div className="w-32 max-w-full h-3 bg-[#01193B]/10 rounded" />
        </div>
      </div>
    );
  }

  /* --------------------------------
     Not Found
  -------------------------------- */

  if (!item) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center px-4 sm:px-5">
        <div className="bg-white p-6 sm:p-8 md:p-12 border border-[#01193B]/10 text-center max-w-lg w-full shadow-sm rounded-3xl">
          <div className="w-14 h-14 sm:w-16 sm:h-16 bg-[#467B23]/10 flex items-center justify-center mx-auto mb-5 sm:mb-6 rounded-2xl">
            <BookOpen
              size={26}
              className="text-[#467B23]"
            />
          </div>

          <h2 className="text-xl sm:text-2xl font-medium text-[#01193B] mb-3">
            Article Not Found
          </h2>

          <p className="text-[#01193B]/60 text-sm leading-relaxed mb-7 sm:mb-8">
            The article you are looking for might have
            been moved, removed, or the link is incorrect.
          </p>

          <Link
            href="/articles"
            className="bg-[#01193B] hover:bg-[#01193B]/90 text-white px-6 sm:px-8 py-3.5 text-xs font-semibold uppercase tracking-wider transition-all inline-block rounded-xl"
          >
            Back to Articles
          </Link>
        </div>
      </div>
    );
  }

  /* --------------------------------
     URLs
  -------------------------------- */

  const thumbnailUrl = getImageUrl(item.thumbnail);

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden bg-[#F8FAFC] pb-28 sm:pb-32 pt-5 sm:pt-8 lg:pt-16">
      <section className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-24">
        {/* Back */}
        <div className="mb-5 sm:mb-6">
          <Link
            href="/articles"
            className="inline-flex max-w-full items-center gap-2 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#01193B]/60 hover:text-[#467B23] transition-colors"
          >
            <ArrowLeft
              size={15}
              className="shrink-0"
            />

            <span>Back to Articles</span>
          </Link>
        </div>

        {/* Header */}
        <div className="mb-6 sm:mb-8 flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 lg:gap-10">
          {/* Header Content */}
          <div className="min-w-0 flex-1 space-y-3">
            {/* Category + Status */}
            <div className="flex flex-wrap items-center gap-2">
              {item.category && (
                <span className="max-w-full break-words bg-[#467B23]/10 text-[#467B23] px-3 py-1.5 text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider rounded-lg">
                  {item.category}
                </span>
              )}

              {item.status && (
                <span className="max-w-full break-words bg-gray-100 text-[#01193B]/70 px-3 py-1.5 text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider rounded-lg">
                  {item.status}
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className="max-w-full break-words text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-medium leading-tight text-[#01193B] tracking-tight">
              {item.title}
            </h1>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 sm:gap-x-6 pt-1 text-xs sm:text-sm text-[#01193B]/70">
              <span className="inline-flex items-center gap-1.5 min-w-0">
                <Calendar
                  size={15}
                  className="text-[#467B23] shrink-0"
                />

                <span className="break-words">
                  {formattedDate}
                </span>
              </span>

              <span className="inline-flex items-center gap-1.5 min-w-0">
                <Eye
                  size={15}
                  className="text-[#467B23] shrink-0"
                />

                <span>
                  {item.views || 0} views
                </span>
              </span>
            </div>
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex flex-col gap-3 shrink-0 w-56 xl:w-60">


            <button
              onClick={handleShare}
              className="w-full min-h-12 px-5 py-3.5 text-xs font-semibold uppercase tracking-wider bg-[#F8FAFC] border border-[#01193B]/10 hover:border-[#01193B]/30 text-[#01193B] flex items-center justify-center gap-2 transition-all rounded-xl"
            >
              <Share2
                size={14}
                className="shrink-0"
              />

              <span>Share Publication</span>
            </button>
          </div>
        </div>

        {/* --------------------------------
            Featured Image
        -------------------------------- */}

        {thumbnailUrl && (
          <div className="mb-7 sm:mb-9 lg:mb-10 w-full overflow-hidden rounded-2xl sm:rounded-3xl border border-[#01193B]/10 bg-white shadow-sm">
            <div className="w-full flex items-center justify-center bg-[#F8FAFC] p-2 sm:p-3 md:p-4">
              <img
                src={thumbnailUrl}
                alt={item.title || "Article"}
                className="block w-full h-auto max-w-full max-h-[650px] object-contain rounded-xl sm:rounded-2xl"
              />
            </div>
          </div>
        )}

        {/* --------------------------------
            Main Layout
        -------------------------------- */}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-start">
          {/* --------------------------------
              Article
          -------------------------------- */}

          <article className="min-w-0 lg:col-span-2 bg-white border border-[#01193B]/10 p-5 sm:p-7 md:p-9 lg:p-10 rounded-2xl sm:rounded-3xl shadow-sm overflow-hidden">
            <div className="space-y-7 sm:space-y-8">
              {/* Short Description */}
              {item.shortDescription && (
                <div className="pb-6 border-b border-[#01193B]/10">
                  <p className="break-words text-sm sm:text-base md:text-lg text-[#01193B]/70 leading-7 sm:leading-relaxed font-medium">
                    {item.shortDescription}
                  </p>
                </div>
              )}

              {/* Content */}
              <div className="min-w-0 text-[#01193B]/80 text-sm sm:text-base leading-relaxed">
                {Array.isArray(item.content) &&
                item.content.length > 0 ? (
                  <div className="space-y-10 sm:space-y-12">
                    {item.content.map(
                      (section, index) => {
                        const sectionImage =
                          getImageUrl(section.image);

                        return (
                          <section
                            key={
                              section._id ||
                              index
                            }
                            className="min-w-0 space-y-4 sm:space-y-5"
                          >
                            {/* Section Title */}
                            {section.title && (
                              <h2 className="max-w-full break-words text-lg sm:text-xl md:text-2xl font-medium leading-tight text-[#01193B]">
                                {section.title}
                              </h2>
                            )}

                            {/* Section Image */}
                            {sectionImage && (
                              <div className="w-full overflow-hidden rounded-xl sm:rounded-2xl border border-[#01193B]/10 bg-[#F8FAFC]">
                                <div className="w-full flex items-center justify-center p-1.5 sm:p-2 md:p-3">
                                  <img
                                    src={sectionImage}
                                    alt={
                                      section.title ||
                                      item.title ||
                                      "Article image"
                                    }
                                    className="block w-full h-auto max-w-full max-h-[500px] object-contain rounded-lg sm:rounded-xl"
                                  />
                                </div>
                              </div>
                            )}

                            {/* Section Description */}
                            {section.des && (
                              <div
                                className="
                                  article-content
                                  prose
                                  prose-sm
                                  sm:prose-base
                                  max-w-none
                                  w-full
                                  break-words
                                  overflow-wrap-anywhere
                                  prose-headings:text-[#01193B]
                                  prose-headings:break-words
                                  prose-p:text-[#01193B]/75
                                  prose-p:break-words
                                  prose-li:text-[#01193B]/75
                                  prose-li:break-words
                                  prose-a:text-[#467B23]
                                  prose-a:break-words
                                  prose-img:max-w-full
                                  prose-img:h-auto
                                  prose-table:block
                                  prose-table:max-w-full
                                  prose-table:overflow-x-auto
                                  prose-pre:max-w-full
                                  prose-pre:overflow-x-auto
                                "
                                dangerouslySetInnerHTML={{
                                  __html:
                                    section.des,
                                }}
                              />
                            )}
                          </section>
                        );
                      }
                    )}
                  </div>
                ) : (
                  <p className="text-[#01193B]/60">
                    No article content available.
                  </p>
                )}
              </div>

              {/* Tags */}
              {Array.isArray(item.tags) &&
                item.tags.length > 0 && (
                  <div className="pt-6 border-t border-[#01193B]/10">
                    <h3 className="text-sm font-semibold text-[#01193B] mb-3">
                      Tags
                    </h3>

                    <div className="flex flex-wrap gap-2 max-w-full">
                      {item.tags.map(
                        (tag, index) => (
                          <span
                            key={`${tag}-${index}`}
                            className="max-w-full break-all px-3 py-1.5 bg-[#467B23]/10 text-[#467B23] text-xs font-medium rounded-lg"
                          >
                            #{tag}
                          </span>
                        )
                      )}
                    </div>
                  </div>
                )}

            </div>
          </article>

          {/* --------------------------------
              Sidebar
          -------------------------------- */}

          <aside className="min-w-0 space-y-6 lg:sticky lg:top-28">
            {/* Overview */}
            <div className="bg-white border border-[#01193B]/10 p-5 sm:p-6 lg:p-7 xl:p-8 shadow-sm rounded-2xl sm:rounded-3xl space-y-5 sm:space-y-6">
              <h3 className="text-lg font-semibold text-[#01193B] border-b border-[#01193B]/10 pb-4">
                Overview
              </h3>

              <div className="space-y-3 text-sm">
                {/* Published */}
                <div className="flex items-start justify-between py-2.5 border-b border-gray-100 gap-4">
                  <span className="text-[#01193B]/50 flex items-center gap-2 shrink-0">
                    <Calendar
                      size={16}
                      className="text-[#467B23] shrink-0"
                    />

                    <span>Published</span>
                  </span>

                  <span className="font-semibold text-[#01193B] text-right break-words">
                    {formattedDate}
                  </span>
                </div>

                {/* Views */}
                <div className="flex items-center justify-between py-2.5 border-b border-gray-100 gap-4">
                  <span className="text-[#01193B]/50 flex items-center gap-2 shrink-0">
                    <Eye
                      size={16}
                      className="text-[#467B23] shrink-0"
                    />

                    <span>Views</span>
                  </span>

                  <span className="font-semibold text-[#01193B] text-right">
                    {item.views || 0}
                  </span>
                </div>

                {/* Category */}
                <div className="flex items-start justify-between py-2.5 border-b border-gray-100 gap-4">
                  <span className="text-[#01193B]/50 flex items-center gap-2 shrink-0">
                    <BookOpen
                      size={16}
                      className="text-[#467B23] shrink-0"
                    />

                    <span>Category</span>
                  </span>

                  <span className="font-semibold text-[#467B23] text-right break-words max-w-[55%]">
                    {item.category || "General"}
                  </span>
                </div>

                {/* Status */}
                <div className="flex items-start justify-between py-2.5 gap-4">
                  <span className="text-[#01193B]/50 shrink-0">
                    Status
                  </span>

                  <span className="font-semibold text-[#01193B] text-right break-words">
                    {item.status || "PUBLISHED"}
                  </span>
                </div>
              </div>


            </div>

            {/* Related */}
            {relatedItems.length > 0 && (
              <div className="bg-white border border-[#01193B]/10 p-5 sm:p-6 lg:p-7 xl:p-8 shadow-sm rounded-2xl sm:rounded-3xl space-y-4">
                <div className="border-b border-[#01193B]/10 pb-3 flex items-center justify-between gap-3">
                  <h3 className="text-base font-semibold text-[#01193B] min-w-0">
                    Related Updates
                  </h3>

                  <span className="shrink-0 text-[11px] font-semibold text-[#467B23] bg-[#467B23]/10 px-2.5 py-1 rounded-lg">
                    {relatedItems.length} items
                  </span>
                </div>

                <div className="space-y-3.5">
                  {relatedItems.map((other) => (
                    <Link
                      key={
                        other._id ||
                        other.slug
                      }
                      href={`/articles/${encodeURIComponent(
                        other.slug
                      )}`}
                      className="group block min-w-0 p-3 rounded-2xl hover:bg-[#F8FAFC] border border-transparent hover:border-[#01193B]/10 transition-all"
                    >
                      <h4 className="max-w-full text-xs font-semibold text-[#01193B] group-hover:text-[#467B23] transition-colors line-clamp-2 break-words">
                        {other.title}
                      </h4>

                      <p className="max-w-full text-[11px] text-[#01193B]/50 truncate mt-1">
                        {other.category ||
                          "General"}{" "}
                        •{" "}
                        {other.createdAt
                          ? new Date(
                              other.createdAt
                            ).toLocaleDateString()
                          : "Recent"}
                      </p>
                    </Link>
                  ))}
                </div>

                <div className="pt-2 border-t border-[#01193B]/10 text-center">
                  <Link
                    href="/articles"
                    className="max-w-full text-xs font-bold text-[#467B23] hover:underline inline-flex items-center justify-center gap-1 uppercase tracking-wider"
                  >
                    <span>
                      View all publications
                    </span>

                    <ChevronRight
                      size={14}
                      className="shrink-0"
                    />
                  </Link>
                </div>
              </div>
            )}
          </aside>
        </div>
      </section>

      {/* --------------------------------
          Mobile Actions
      -------------------------------- */}

      <div className="lg:hidden fixed bottom-0 left-0 right-0 w-full max-w-full bg-white/95 backdrop-blur-md border-t border-[#01193B]/10 p-3 sm:p-4 px-4 sm:px-5 z-50 flex items-center gap-2 sm:gap-3 shadow-[0_-10px_25px_rgba(0,0,0,0.08)]">
        <button
          onClick={handleShare}
          className="p-3 sm:p-3.5 bg-[#F8FAFC] border border-[#01193B]/10 text-[#01193B] rounded-xl flex items-center justify-center shrink-0 active:scale-95 transition-transform"
          aria-label="Share"
        >
          <Share2 size={17} />
        </button>

      
      </div>

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() =>
          setIsAuthModalOpen(false)
        }
        initialTab="signup"
      />
    </div>
  );
}

