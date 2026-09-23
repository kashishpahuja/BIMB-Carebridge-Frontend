"use client";

import { useState, useEffect, useRef } from "react";
import {
  FiHeart,
  FiUsers,
  FiHome,
  FiBriefcase,
  FiTrendingUp,
  FiShield,
  FiArrowRight,
} from "react-icons/fi";

export default function CategorySection({
  selectedCategory,
  setSelectedCategory,
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const itemRefs = useRef([]);

  // Static category data
  const categories = [
    {
      name: "Registered Nurses (RN)",
      icon: FiHeart,
      count: "Healthcare Sector",
      description:
        "Provide advanced patient care, administer medications, and coordinate specialized clinical treatments.",
    },
    {
      name: "Personal Support Workers (PSW)",
      icon: FiUsers,
      count: "Healthcare Sector",
      description:
        "Offer essential daily living assistance, compassionate companion care, and physical support to patients.",
    },
    {
      name: "Wait Staff",
      icon: FiHome,
      count: "Hospitality Sector",
      description:
        "Deliver exceptional dining service, manage guest inquiries, and ensure pleasant culinary experiences.",
    },
    {
      name: "Servers",
      icon: FiBriefcase,
      count: "Hospitality Sector",
      description:
        "Take accurate orders, serve food and beverages promptly, and maintain pristine table settings.",
    },
    {
      name: "Bartenders",
      icon: FiTrendingUp,
      count: "Hospitality Sector",
      description:
        "Craft quality beverages, manage bar inventory, and create a vibrant, welcoming guest atmosphere.",
    },
    {
      name: "Housekeeping Staff",
      icon: FiShield,
      count: "Hospitality Sector",
      description:
        "Maintain high standards of cleanliness, hygiene, and sanitization across residential and facility rooms.",
    },
  ];

  // Detect which category is currently visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(
              entry.target.getAttribute("data-index")
            );

            setActiveIndex(index);
          }
        });
      },
      {
        root: null,
        rootMargin: "-25% 0px -45% 0px",
        threshold: 0.1,
      }
    );

    itemRefs.current.forEach((element) => {
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      itemRefs.current.forEach((element) => {
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, []);

  const handleCategoryClick = (categoryName) => {
    setSelectedCategory(
      selectedCategory === categoryName ? "" : categoryName
    );
  };

  return (
    <section
      className="py-24 bg-cover bg-center bg-no-repeat font-['Poppins'] relative text-white"
      style={{
        backgroundImage: "url('/Images/category.webp')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-linear-to-br from-[#143A2F] via-[#0b2345]/90 to-[#143A2F]/90 backdrop-blur-[2px] z-0" />

      <div className="relative z-10 px-5 md:px-12 lg:px-24 xl:px-40">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          {/* Left Content */}
          <div className="lg:col-span-5 lg:sticky lg:top-32 h-fit space-y-6">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-2xl bg-[#467B23]/20 text-[#A8E063] text-xs font-semibold tracking-wider uppercase">
              Specialized Sectors
            </span>

            <h2 className="text-4xl sm:text-5xl lg:text-[54px] font-medium leading-[1.1] tracking-tight text-white">
              Explore by <br />
              <span className="font-semibold text-[#A8E063]">
                Category.
              </span>
            </h2>

            <p className="text-gray-300 text-sm sm:text-base leading-relaxed max-w-sm font-light">
              Discover verified career opportunities matched precisely to
              your professional background in healthcare or hospitality.
            </p>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => setSelectedCategory("")}
                className="inline-flex items-center gap-3 bg-[#467B23] hover:bg-[#3b681d] text-white px-8 py-4 rounded-2xl text-xs font-semibold tracking-wider uppercase transition-all duration-300 shadow-lg cursor-pointer group"
              >
                <span>View All Categories</span>

                <FiArrowRight
                  size={14}
                  className="transition-transform group-hover:translate-x-1"
                />
              </button>
            </div>
          </div>

          {/* Right Categories */}
          <div className="lg:col-span-7 flex flex-col space-y-12">
            {categories.map((cat, idx) => {
              const Icon = cat.icon;

              const isSelected =
                selectedCategory === cat.name;

              const isActive = activeIndex === idx;

              return (
                <div
                  key={cat.name}
                  ref={(element) => {
                    itemRefs.current[idx] = element;
                  }}
                  data-index={idx}
                  onClick={() =>
                    handleCategoryClick(cat.name)
                  }
                  className={`group relative pb-8 border-b border-white/10 cursor-pointer transition-all duration-700 ease-out transform ${
                    isActive
                      ? "opacity-100 scale-100 blur-none"
                      : "opacity-35 scale-98 blur-[0.4px] hover:opacity-70"
                  }`}
                >
                  {/* Index & Sector */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono tracking-widest text-[#A8E063] uppercase font-semibold">
                      {String(idx + 1).padStart(2, "0")} /{" "}
                      {cat.count}
                    </span>

                    {/* <span
                      className={`text-[10px] font-semibold px-3.5 py-1 rounded-2xl uppercase tracking-wider transition-colors ${
                        isSelected || isActive
                          ? "bg-[#467B23] text-white font-bold shadow-md"
                          : "bg-white/10 text-gray-300 group-hover:bg-white/20"
                      }`}
                    >
                      {isSelected
                        ? "Selected"
                        : isActive
                        ? "Active"
                        : "Select"}
                    </span> */}
                  </div>

                  {/* Title */}
                  <div className="flex items-center gap-4 mb-2">
                    <div
                      className={`transition-transform duration-300 ${
                        isActive
                          ? "text-[#A8E063] scale-110"
                          : "text-gray-400"
                      }`}
                    >
                      <Icon size={26} />
                    </div>

                    <h3
                      className={`text-2xl sm:text-3xl font-semibold transition-colors ${
                        isActive
                          ? "text-white"
                          : "text-gray-300"
                      }`}
                    >
                      {cat.name}
                    </h3>
                  </div>

                  {/* Description */}
                  <p
                    className={`text-sm sm:text-base font-light leading-relaxed max-w-xl pl-10 transition-colors ${
                      isActive
                        ? "text-gray-300"
                        : "text-gray-400"
                    }`}
                  >
                    {cat.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}