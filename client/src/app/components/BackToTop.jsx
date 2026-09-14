"use client";

import { useEffect, useState } from "react";
import { FiArrowUp } from "react-icons/fi";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      aria-label="Back to top"
      className={`
        fixed
        right-5
        bottom-5
        sm:right-6
        sm:bottom-6
        md:right-8
        md:bottom-8
        z-50
        w-11
        h-11
        sm:w-10
        sm:h-10
        rounded-full
        bg-[#143A2F]
        text-white
        flex
        items-center
        justify-center
        shadow-lg
        border
        border-[#467B23]/40
        hover:bg-[#467B23]/60
        hover:-translate-y-1
        transition-all
        duration-300
        ${
          visible
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-4 pointer-events-none"
        }
      `}
    >
      <FiArrowUp className="text-md sm:text-lg" />
    </button>
  );
}