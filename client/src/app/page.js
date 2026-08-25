'use client';
import { useState, useEffect } from 'react';
import API from './services/api';
import sampleData from './data/sampleJobs.json';

import HeroBanner from './components/HeroBanner';
import CategorySection from './components/CategorySection';
import FeaturedJobs from './components/FeaturedJobs';
import Organization from './components/Organization';
import HealthcareSolutionsSection from './components/Healthcare';
import PartnershipSection from './components/Partnership';

export default function LandingPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [keyword, setKeyword] = useState('');
  const [location, setLocation] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const { data } = await API.get('/jobs');
        if (data && Array.isArray(data) && data.length > 0) {
          setJobs(data);
        } else {
          setJobs(sampleData?.jobs || []);
        }
      } catch (err) {
        console.warn('Backend offline. Loading local sample jobs data from sampleJobs.json.');
        setJobs(sampleData?.jobs || []);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  // Safe filtering based on keyword, location, and selected category
  const filteredJobs = (jobs || []).filter((job) => {
    const matchesKeyword = keyword === '' || job.title?.toLowerCase().includes(keyword.toLowerCase()) || job.description?.toLowerCase().includes(keyword.toLowerCase());
    const matchesLocation = location === '' || job.location?.toLowerCase().includes(location.toLowerCase());
    const matchesCategory = selectedCategory === '' || job.category === selectedCategory || job.sector === selectedCategory;
    return matchesKeyword && matchesLocation && matchesCategory;
  });

  const handleReset = () => {
    setKeyword('');
    setLocation('');
    setSelectedCategory('');
  };

  const dataSource = jobs.length > 0 ? jobs : sampleData.jobs;

  return (
    <div className="min-h-screen text-gray-900 flex flex-col font-sans">

      <HeroBanner 
        keyword={keyword} 
        setKeyword={setKeyword} 
        location={location} 
        setLocation={setLocation} 
      />

      <HealthcareSolutionsSection />

      <CategorySection 
        jobs={dataSource}
        selectedCategory={selectedCategory} 
        setSelectedCategory={setSelectedCategory} 
      />


      <FeaturedJobs 
        jobs={dataSource}
        filteredJobs={filteredJobs}
        loading={loading} 
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        onReset={handleReset} 
      /> 
      <PartnershipSection/>
      <Organization />

    </div>
  );
}