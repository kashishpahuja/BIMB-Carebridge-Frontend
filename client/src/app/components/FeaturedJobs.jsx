'use client';
import { useMemo } from 'react';
import Link from 'next/link';
import { MapPin, DollarSign, ArrowRight } from 'lucide-react';

export default function FeaturedJobs({ jobs = [], filteredJobs = [], loading, selectedCategory, setSelectedCategory, onReset }) {
  // Dynamically extract unique categories from the passed json dataset
  const tabs = useMemo(() => {
    const categories = jobs.map((job) => job.category).filter(Boolean);
    return ['All', ...new Set(categories)];
  }, [jobs]);

  // Determine active jobs displayed based on the selected category tab
  const displayJobs = useMemo(() => {
    if (!selectedCategory || selectedCategory === 'All') {
      return filteredJobs.length > 0 ? filteredJobs : jobs;
    }
    return (filteredJobs.length > 0 ? filteredJobs : jobs).filter((job) => 
      job.category?.toLowerCase() === selectedCategory.toLowerCase() ||
      job.sector?.toLowerCase() === selectedCategory.toLowerCase()
    );
  }, [jobs, filteredJobs, selectedCategory]);

  return (
    <section className="py-24">
      <div className="px-5 md:px-12 lg:px-24 xl:px-40">
        
        {/* Section Header & All Offers Button */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-6 gap-4">
          <div>
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-2xl bg-[#467B23]/10 text-[#467B23] text-sm font-semibold tracking-wider uppercase mb-3">
              Open Positions
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium text-[#01193B] tracking-tight">
              Featured <span className="font-semibold text-[#467B23]">Job Offers</span>
            </h2>
            <p className="text-[#01193B]/70 text-sm sm:text-base mt-2">
              Browse active healthcare and hospitality openings organized by category.
            </p>
          </div>
          
          <Link 
            href="/jobs" 
            className="inline-flex items-center gap-2 bg-[#01193B] hover:bg-[#01193B]/90 text-white px-7 py-3 rounded-2xl text-xs font-semibold tracking-wider uppercase transition-all duration-300 shadow-sm group shrink-0"
          >
            <span>All Offers</span>
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Category Tabs Sourced Directly from JSON Data */}
        <div className="flex items-center p-1.5 border-b border-[#01193B]/10 overflow-x-auto max-w-full mb-12 gap-2">
          {tabs.map((tab) => {
            const isSelected = (!selectedCategory && tab === 'All') || selectedCategory === tab;
            return (
              <button
                key={tab}
                onClick={() => setSelectedCategory(tab === 'All' ? '' : tab)}
                className={`px-5 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                  isSelected
                    ? 'bg-[#01193B] text-white shadow-sm'
                    : 'text-[#01193B]/70 hover:text-[#01193B] hover:bg-white'
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>

        {loading ? (
          <div className="text-center py-16 text-[#01193B]/50 font-medium">Loading open job offers...</div>
        ) : displayJobs.length === 0 ? (
          <div className="bg-white p-10 rounded-3xl text-center border border-[#01193B]/10 shadow-sm max-w-lg mx-auto">
            <p className="text-[#01193B]/70 mb-6 text-sm">No job offers match your current filter criteria.</p>
            <button 
              onClick={onReset} 
              className="bg-[#467B23] hover:bg-[#3b681d] text-white px-6 py-3 rounded-2xl text-sm font-semibold uppercase tracking-wider transition-all shadow-sm cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {displayJobs.slice(-8).map((job) => (
              <div 
                key={job._id} 
                className="bg-white p-6 rounded-3xl border border-[#01193B]/10 hover:border-[#467B23]/40 hover:shadow-xl shadow-sm flex flex-col justify-between transition-all duration-300 group hover:-translate-y-1"
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="bg-[#467B23]/10 text-[#467B23] px-3 py-1 rounded-2xl text-[11px] font-semibold">
                      {job.sector}
                    </span>
                    <span className="text-[11px] font-medium text-[#01193B]/50">{job.employmentType}</span>
                  </div>

                  <h3 className="font-semibold text-base text-[#01193B] transition-colors line-clamp-1">
                    {job.title}
                  </h3>

                  <p className="text-sm text-[#01193B]/60 flex items-center gap-1.5">
                    <MapPin size={13} className="text-[#467B23]" /> {job.location}
                  </p>

                  <p className="text-sm text-[#01193B]/70 line-clamp-2 leading-relaxed font-light">
                    {job.description}
                  </p>
                </div>
                
                <div className="pt-6 mt-6 border-t border-[#01193B]/10 flex items-center justify-between">
                  <span className="text-sm font-bold text-[#467B23] flex items-center gap-0.5">
                    <DollarSign size={13} /> {job.salary || 'Competitive'}
                  </span>
                  
                  <Link 
                    href={`/jobs/${job._id}`} 
                    className="bg-[#467B23]/10 hover:bg-[#467B23] text-[#467B23] hover:text-white px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300"
                  >
                    Apply
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}