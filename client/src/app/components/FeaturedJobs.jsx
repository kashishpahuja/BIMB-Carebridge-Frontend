'use client';
import Link from 'next/link';
import { MapPin, DollarSign } from 'lucide-react';

export default function FeaturedJobs({ jobs, loading, onReset }) {
  return (
    <section className="py-[clamp(3rem,6vw,5rem)] bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
          <div>
            <h2 className="text-[clamp(1.75rem,3vw,2.25rem)] font-extrabold text-[#0B192C] dark:text-white">Featured Job Offers</h2>
            <p className="text-gray-500 text-sm mt-1">Browse active healthcare and hospitality openings.</p>
          </div>
          <Link href="/jobs" className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-xs font-bold transition shadow-sm">
            All Job Offers →
          </Link>
        </div>

        {loading ? (
          <div className="text-center py-16 text-gray-400">Loading open job offers...</div>
        ) : jobs.length === 0 ? (
          <div className="bg-gray-50 dark:bg-gray-900 p-8 rounded-2xl text-center border border-gray-200 dark:border-gray-800">
            <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">No job offers match your current filter criteria.</p>
            <button onClick={onReset} className="bg-blue-600 text-white px-4 py-2 rounded-xl text-xs font-bold">
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {jobs.map((job) => (
              <div key={job._id} className="backdrop-blur-md bg-[#F9FBFF]/80 dark:bg-gray-900/80 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 hover:border-blue-500 shadow-sm flex flex-col justify-between transition group">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 px-2.5 py-0.5 rounded-full text-xs font-bold">
                      {job.sector}
                    </span>
                    <span className="text-[11px] font-semibold text-gray-500">{job.employmentType}</span>
                  </div>
                  <h3 className="font-bold text-base text-[#0B192C] dark:text-white group-hover:text-blue-600 transition line-clamp-1">{job.title}</h3>
                  <p className="text-xs text-gray-500 flex items-center gap-1"><MapPin size={13} className="text-blue-600" /> {job.location}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">{job.description}</p>
                </div>
                
                <div className="pt-6 mt-4 border-t border-gray-200 dark:border-gray-800 flex items-center justify-between">
                  <span className="text-xs font-extrabold text-blue-600 flex items-center gap-0.5">
                    <DollarSign size={13} /> {job.salary || 'Competitive'}
                  </span>
                  <Link href={`/jobs/${job._id}`} className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg text-xs font-semibold transition">
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