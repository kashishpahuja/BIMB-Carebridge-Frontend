'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';

import sampleData from './data/sampleJobs.json';

import HeroBanner from './components/HeroBanner';
import CategorySection from './components/CategorySection';
import FeaturedJobs from './components/FeaturedJobs';
import Organization from './components/Organization';
import HealthcareSolutionsSection from './components/Healthcare';
import WhyPartnerSection from './components/Partnership';
import JobDataProvider from './context/JobDataContext';

export default function LandingPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [keyword, setKeyword] = useState('');
  const [location, setLocation] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const base_url = process.env.NEXT_PUBLIC_SERVER_URL;

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        if (!base_url) {
          console.error('NEXT_PUBLIC_SERVER_URL is not defined');
          setJobs([]);
          return;
        }

        const response = await axios.get(
          `${base_url}/job/alljobs`
        );

        if (response.data?.success) {
          const data = response.data.data || [];

          setJobs(data);

          console.log('Fetched Jobs:', data);
        } else {
          setJobs([]);
        }
      } catch (err) {
        console.error('Error fetching jobs:', err);
        setJobs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [base_url]);

  const filteredJobs = (jobs || []).filter((job) => {
    const searchKeyword = keyword.toLowerCase();

    const matchesKeyword =
      keyword === '' ||
      job.title?.toLowerCase().includes(searchKeyword) ||
      job.description?.toLowerCase().includes(searchKeyword) ||
      (Array.isArray(job.skills) &&
        job.skills.some((skill) =>
          skill?.toLowerCase().includes(searchKeyword)
        ));

    const locationString =
      typeof job.location === 'object' && job.location !== null
        ? `${job.location.city || ''} ${job.location.state || ''} ${
            job.location.country || ''
          }`.toLowerCase()
        : String(job.location || '').toLowerCase();

    const matchesLocation =
      location === '' ||
      locationString.includes(location.toLowerCase());

    const matchesCategory =
      selectedCategory === '' ||
      job.category === selectedCategory ||
      job.sector === selectedCategory;

    const isPublished =
      job.status ? job.status === 'PUBLISHED' : true;

    return (
      matchesKeyword &&
      matchesLocation &&
      matchesCategory &&
      isPublished
    );
  });

  const handleReset = () => {
    setKeyword('');
    setLocation('');
    setSelectedCategory('');
  };

  // Keep sample data available if API does not return jobs
  const dataSource =
    jobs.length > 0 ? jobs : sampleData.jobs;

  return (
    <div className="min-h-screen text-gray-900 flex flex-col font-sans">
      <JobDataProvider>
        <HeroBanner
          keyword={keyword}
          setKeyword={setKeyword}
          location={location}
          setLocation={setLocation}
        />

        <HealthcareSolutionsSection />

        <CategorySection />

        <FeaturedJobs
          jobs={dataSource}
          filteredJobs={filteredJobs}
          loading={loading}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          onReset={handleReset}
        />

        <WhyPartnerSection />

        <Organization />
      </JobDataProvider>
    </div>
  );
}


