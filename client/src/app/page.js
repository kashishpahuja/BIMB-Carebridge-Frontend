'use client';
import { useState, useEffect } from 'react';
import API from './services/api';
import sampleData from './data/sampleJobs.json';

import HeroBanner from './components/HeroBanner';
import CategorySection from './components/CategorySection';
import FeaturedJobs from './components/FeaturedJobs';

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
        if (data && data.length > 0) {
          setJobs(data);
        } else {
          setJobs(sampleData.jobs);
        }
      } catch (err) {
        console.warn('Backend offline. Loading local sample jobs data.');
        setJobs(sampleData.jobs);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const filteredJobs = jobs.filter((job) => {
    const matchesKeyword = keyword === '' || job.title.toLowerCase().includes(keyword.toLowerCase()) || job.description.toLowerCase().includes(keyword.toLowerCase());
    const matchesLocation = location === '' || job.location.toLowerCase().includes(location.toLowerCase());
    const matchesCategory = selectedCategory === '' || job.category === selectedCategory;
    return matchesKeyword && matchesLocation && matchesCategory;
  });

  const handleReset = () => {
    setKeyword('');
    setLocation('');
    setSelectedCategory('');
  };

  return (
    <div className="min-h-screen bg-[#F4F7FC] dark:bg-black text-gray-900 dark:text-white flex flex-col font-sans">

      <HeroBanner 
        keyword={keyword} 
        setKeyword={setKeyword} 
        location={location} 
        setLocation={setLocation} 
      />
      <CategorySection 
        selectedCategory={selectedCategory} 
        setSelectedCategory={setSelectedCategory} 
      />
      <FeaturedJobs 
        jobs={filteredJobs} 
        loading={loading} 
        onReset={handleReset} 
      /> 

    </div>
  );
}