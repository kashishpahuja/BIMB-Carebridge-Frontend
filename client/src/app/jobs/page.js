'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { MapPin, DollarSign, Search, Briefcase, Filter, X } from 'lucide-react';
// Import the JSON data directly. Adjust the path if your components folder is nested differently.
import jobData from '../data/sampleJobs.json';

export default function JobsPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [locationQuery, setLocationQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedType, setSelectedType] = useState('All');

  // Load initial data
  useEffect(() => {
    const fetchTimer = setTimeout(() => {
      setJobs(jobData.jobs || []);
      setLoading(false);
    }, 600);

    return () => clearTimeout(fetchTimer);
  }, []);

  // Prevent background scrolling when filter menu is open (Mobile only)
  useEffect(() => {
    if (isFilterOpen && window.innerWidth < 1024) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isFilterOpen]);

  // Dynamically extract unique categories and employment types from the JSON
  const categories = useMemo(() => {
    const cats = jobs.map((job) => job.category).filter(Boolean);
    return ['All', ...new Set(cats)];
  }, [jobs]);

  const employmentTypes = useMemo(() => {
    const types = jobs.map((job) => job.employmentType).filter(Boolean);
    return ['All', ...new Set(types)];
  }, [jobs]);

  // Filtering Logic
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const searchSource = `${job.title} ${job.description} ${job.sector}`.toLowerCase();
      const matchesSearch = searchSource.includes(searchQuery.toLowerCase());
      
      const locationSource = (job.location || '').toLowerCase();
      const matchesLocation = locationSource.includes(locationQuery.toLowerCase());
      
      const matchesCategory = selectedCategory === 'All' || job.category === selectedCategory || job.sector === selectedCategory;
      const matchesType = selectedType === 'All' || job.employmentType === selectedType;
      
      const isActive = job.status === 'Active';

      return matchesSearch && matchesLocation && matchesCategory && matchesType && isActive;
    });
  }, [jobs, searchQuery, locationQuery, selectedCategory, selectedType]);

  const resetFilters = () => {
    setSearchQuery('');
    setLocationQuery('');
    setSelectedCategory('All');
    setSelectedType('All');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Scroll to top when clicking a category or type
  const handleCategoryClick = (tab) => {
    setSelectedCategory(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTypeClick = (type) => {
    setSelectedType(type);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Calculate active filter count for the sticky button badge (Mobile)
  const activeFilterCount = 
    (searchQuery ? 1 : 0) + 
    (locationQuery ? 1 : 0) + 
    (selectedCategory !== 'All' ? 1 : 0) + 
    (selectedType !== 'All' ? 1 : 0);

  // Extracted filter content to avoid massive duplication between Desktop Sidebar and Mobile Drawer
  const FilterContent = () => (
    <div className="space-y-8">
      {/* Keyword Search */}
      <div>
        <label className="text-xs font-bold text-[#01193B]/50 uppercase tracking-wider mb-3 block">Keyword / Job Title</label>
        <div className="flex items-center bg-[#F8FAFC] px-4 py-3.5 border border-[#01193B]/10 focus-within:border-[#467B23]/50 transition-all">
          <Search className="text-[#01193B]/40 shrink-0 mr-3" size={20} />
          <input 
            type="text" 
            placeholder="E.g. Registered Nurse..." 
            className="bg-transparent border-none outline-none w-full text-[#01193B] placeholder:text-[#01193B]/40 text-sm lg:text-base"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Location Search */}
      <div>
        <label className="text-xs font-bold text-[#01193B]/50 uppercase tracking-wider mb-3 block">Location</label>
        <div className="flex items-center bg-[#F8FAFC] px-4 py-3.5 border border-[#01193B]/10 focus-within:border-[#467B23]/50 transition-all">
          <MapPin className="text-[#01193B]/40 shrink-0 mr-3" size={20} />
          <input 
            type="text" 
            placeholder="City, province..." 
            className="bg-transparent border-none outline-none w-full text-[#01193B] placeholder:text-[#01193B]/40 text-sm lg:text-base"
            value={locationQuery}
            onChange={(e) => setLocationQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Category Filter */}
      <div>
        <label className="text-xs font-bold text-[#01193B]/50 uppercase tracking-wider mb-3 block">Job Category</label>
        <div className="flex flex-wrap gap-2">
          {categories.map((tab) => {
            const isSelected = selectedCategory === tab;
            return (
              <button
                key={tab}
                onClick={() => handleCategoryClick(tab)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all border ${
                  isSelected
                    ? 'bg-[#01193B] text-white border-[#01193B]'
                    : 'bg-white text-[#01193B]/70 border-[#01193B]/10 hover:border-[#01193B]/30'
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>
      </div>

      {/* Employment Type Filter */}
      <div>
        <label className="text-xs font-bold text-[#01193B]/50 uppercase tracking-wider mb-3 block">Employment Type</label>
        <div className="flex flex-wrap gap-2">
          {employmentTypes.map((type) => {
            const isSelected = selectedType === type;
            return (
              <button
                key={type}
                onClick={() => handleTypeClick(type)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all border ${
                  isSelected
                    ? 'bg-[#467B23] text-white border-[#467B23]'
                    : 'bg-white text-[#01193B]/70 border-[#01193B]/10 hover:border-[#01193B]/30'
                }`}
              >
                {type}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24 relative pt-12 md:pt-20 lg:pt-24">
      
      <section className="px-5 md:px-12 lg:px-16 xl:px-24 2xl:px-40 max-w-[1920px] mx-auto">
        
        <div className="flex flex-col lg:flex-row gap-8 xl:gap-12 relative">
          
          {/* ========================================= */}
          {/* LEFT SIDEBAR (Desktop Only - sticky) */}
          {/* ========================================= */}
          <aside className="hidden lg:block w-72 xl:w-80 shrink-0">
            <div className="sticky top-28 bg-white p-6 border border-[#01193B]/10 shadow-sm flex flex-col max-h-[85vh] overflow-y-auto hide-scrollbar">
              <div className="flex items-center justify-between mb-8 shrink-0">
                <h3 className="font-semibold text-[#01193B] flex items-center gap-2 text-lg">
                  <Filter size={18} className="text-[#467B23]" /> Filters
                </h3>
                {activeFilterCount > 0 && (
                  <button onClick={resetFilters} className="text-xs font-bold text-[#01193B]/50 hover:text-[#467B23] uppercase tracking-wider flex items-center gap-1 transition-colors">
                    <X size={14} /> Clear
                  </button>
                )}
              </div>
              
              <div className="flex-1">
                {/* <FilterContent /> */}
               {FilterContent ()}
              </div>
            </div>
          </aside>

          {/* ========================================= */}
          {/* MAIN CONTENT AREA - Job Grid */}
          {/* ========================================= */}
          <div className="flex-1 min-w-0">
            
            {/* Header & Results Count */}
            <div className="mb-8 pb-4 flex flex-col md:flex-row md:items-end justify-between border-b border-[#01193B]/10 gap-4">
              <div>
                <h1 className="text-3xl font-medium text-[#01193B] tracking-tight mb-2">
                  Open <span className="font-semibold text-[#467B23]">Positions</span>
                </h1>
                <p className="text-[#01193B]/70 text-sm">
                  Showing <span className="font-semibold text-[#01193B]">{filteredJobs.length}</span> active jobs
                </p>
              </div>
            </div>

            {/* Job Grid */}
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6">
                {[1, 2, 3, 4, 5, 6].map((skeleton) => (
                  <div key={skeleton} className="bg-white p-6 rounded-3xl border border-[#01193B]/5 h-56 animate-pulse flex flex-col justify-between">
                    <div className="space-y-4">
                      <div className="flex justify-between"><div className="w-20 h-6 bg-gray-200"></div><div className="w-16 h-4 bg-gray-200 rounded-lg"></div></div>
                      <div className="w-3/4 h-5 bg-gray-200 rounded-lg"></div>
                      <div className="w-1/3 h-4 bg-gray-200 rounded-lg"></div>
                      <div className="w-full h-10 bg-gray-200 rounded-lg"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredJobs.length === 0 ? (
              <div className="bg-white p-12 lg:p-16 rounded-3xl text-center border border-[#01193B]/10 shadow-sm w-full mx-auto">
                <div className="w-20 h-20 bg-[#467B23]/10  flex items-center justify-center mx-auto mb-6">
                  <Briefcase size={32} className="text-[#467B23]" />
                </div>
                <h3 className="text-xl lg:text-2xl font-medium text-[#01193B] mb-3">No jobs found</h3>
                <p className="text-[#01193B]/60 mb-8 text-sm lg:text-base max-w-md mx-auto">
                  We couldn&apos;t find any positions matching your current filters. Try adjusting your search criteria.
                </p>
                <button 
                  onClick={resetFilters} 
                  className="bg-[#467B23] hover:bg-[#3b681d] text-white px-8 py-3.5 text-sm font-semibold uppercase tracking-wider transition-all shadow-sm cursor-pointer inline-flex"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6">
                {filteredJobs.map((job) => (
                  <div 
                    key={job._id} 
                    className="bg-white p-6 rounded-3xl border border-[#01193B]/10 hover:border-[#467B23]/40 hover:shadow-xl shadow-sm flex flex-col justify-between transition-all duration-300 group hover:-translate-y-1"
                  >
                    <div className="space-y-3">
                      <div className="flex justify-between items-start gap-2">
                        <span className="bg-[#467B23]/10 text-[#467B23] px-3 py-1.5 rounded-xl text-[11px] font-semibold inline-block line-clamp-1">
                          {job.category}
                        </span>
                        <span className="text-[11px] font-medium text-[#01193B]/50 bg-gray-100 px-2.5 py-1.5 rounded-xl shrink-0">
                          {job.employmentType}
                        </span>
                      </div>

                      <h3 className="font-semibold text-lg text-[#01193B] transition-colors line-clamp-2 pt-2">
                        {job.title}
                      </h3>

                      <p className="text-sm text-[#01193B]/60 flex items-center gap-1.5">
                        <MapPin size={14} className="text-[#467B23] shrink-0" /> 
                        <span className="truncate">{job.location}</span>
                      </p>

                      <p className="text-sm text-[#01193B]/70 line-clamp-2 leading-relaxed font-light pt-2">
                        {job.description}
                      </p>
                    </div>
                    
                    <div className="pt-6 mt-6 border-t border-[#01193B]/10 flex flex-col gap-4">
                      <div className="flex flex-col gap-1">
                        <span className="text-sm font-bold text-[#467B23] flex items-center gap-1">
                          <DollarSign size={14} /> {job.salary || 'Competitive Rate'}
                        </span>
                        <span className="text-[11px] text-[#01193B]/50">
                          {job.shiftDetails}
                        </span>
                      </div>
                      
                      <Link 
                        href={`/jobs/${encodeURIComponent(job.title.toLowerCase().replace(/[()]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, ''))}`} 
                        className="border border-[#01193B] text-[#01193B] hover:bg-[#01193B]/90 hover:text-white px-5 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-300 w-full text-center shadow-sm"
                      >
                        View Details & Apply
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ========================================= */}
      {/* MOBILE STICKY BOTTOM BUTTON (Hidden on lg) */}
      {/* ========================================= */}
      <div className="lg:hidden fixed bottom-6 left-0 right-0 px-5 flex justify-center z-40 pointer-events-none">
        <button 
          onClick={() => setIsFilterOpen(true)}
          className="pointer-events-auto bg-[#01193B] hover:bg-[#022454] text-white px-8 py-4  shadow-2xl flex items-center gap-3 transition-transform duration-300 hover:scale-105"
        >
          <Filter size={18} />
          <span className="font-semibold tracking-wider text-sm uppercase">Filters</span>
          {activeFilterCount > 0 && (
            <span className="bg-[#467B23] text-white w-6 h-6  flex items-center justify-center text-xs font-bold ml-1">
              {activeFilterCount}
            </span>
          )}
        </button>
      </div>

      {/* ========================================= */}
      {/* MOBILE BOTTOM SHEET OVERLAY & MENU (Hidden on lg) */}
      {/* ========================================= */}
      
      {/* Backdrop Overlay */}
      <div 
        className={`lg:hidden fixed inset-0 bg-[#01193B]/40 backdrop-blur-sm z-50 transition-opacity duration-300 ${
          isFilterOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsFilterOpen(false)}
      />

      {/* Drawer */}
      <div 
        className={`lg:hidden fixed bottom-0 left-0 right-0 h-[80vh] bg-white z-[60] rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.15)] flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
          isFilterOpen ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#01193B]/10 shrink-0">
          <h2 className="text-xl font-bold text-[#01193B]">Search & Filters</h2>
          <button 
            onClick={() => setIsFilterOpen(false)}
            className="w-8 h-8 flex items-center justify-center  bg-[#F8FAFC] hover:bg-gray-200 text-[#01193B] transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Drawer Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {FilterContent ()}
        </div>

        {/* Drawer Footer Actions */}
        <div className="p-6 border-t border-[#01193B]/10 bg-white flex items-center gap-4 shrink-0 pb-10">
          <button 
            onClick={resetFilters}
            className="w-1/3 py-4 text-sm font-semibold uppercase tracking-wider text-[#01193B] bg-[#F8FAFC] hover:bg-gray-200 transition-colors"
          >
            Clear All
          </button>
          <button 
            onClick={() => setIsFilterOpen(false)}
            className="w-2/3 py-4 text-sm font-semibold uppercase tracking-wider text-white bg-[#467B23] hover:bg-[#3b681d] shadow-lg transition-colors flex justify-center items-center gap-2"
          >
            View {filteredJobs.length} Jobs
          </button>
        </div>
      </div>
      
      {/* Hide Scrollbar for Desktop Sidebar */}
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
    </div>
  );
}