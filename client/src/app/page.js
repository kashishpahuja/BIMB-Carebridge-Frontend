'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, Users, Clock, Award, ArrowRight, CheckCircle2, 
  Phone, Mail, MapPin, Briefcase, HeartHandshake, Building2 
} from 'lucide-react';
import API from './services/api';

export default function LandingPage() {
  const [featuredJobs, setFeaturedJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch active jobs from backend API
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const { data } = await API.get('/jobs');
        setFeaturedJobs(data.slice(0, 4)); // Get top 4 active jobs
      } catch (err) {
        console.error('Failed to fetch jobs', err);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      
      {/* 1. HERO BANNER SECTION */}
      <section className="bg-black text-white py-16 lg:py-24 px-4 sm:px-6 lg:px-8 border-b border-blue-900/50 relative overflow-hidden">
        {/* Subtle background ambient blue lighting */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-900/10 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          
          <div className="space-y-6">
            <div className="inline-block bg-blue-600 text-white px-3 py-1 rounded text-xs font-bold uppercase tracking-widest border border-blue-400">
              Connecting Care, Creating Opportunities.
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
              We Supply <span className="text-blue-500">Healthcare</span> & <span className="text-blue-400">Hospitality</span> Professionals
            </h1>
            <p className="text-gray-300 text-lg leading-relaxed">
              Providing qualified, dependable, and compassionate personnel to support healthcare facilities, long-term care homes, hotels, and event venues across Ontario.
            </p>
            
            <div className="flex flex-wrap gap-4 pt-2">
              <Link href="/jobs" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-bold transition flex items-center gap-2 shadow-lg shadow-blue-900/40">
                Browse All Openings <ArrowRight size={18} />
              </Link>
              <Link href="/employers" className="border border-white hover:bg-white hover:text-black text-white px-6 py-3 rounded-lg font-semibold transition">
                Partner / Request Staff
              </Link>
            </div>

            {/* Quick Contact Info Strip */}
            <div className="pt-6 border-t border-gray-800 flex flex-col sm:flex-row gap-6 text-sm text-gray-300">
              <div className="flex items-center gap-3">
                <div className="bg-blue-600 p-2.5 rounded-full text-white"><Phone size={16} /></div>
                <div>
                  <p className="text-xs uppercase text-gray-400 font-semibold tracking-wider">Call Us Today</p>
                  <p className="font-bold text-white text-base">647-500-3737</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-gray-900 border border-blue-500/50 p-2.5 rounded-full text-blue-400"><Mail size={16} /></div>
                <div>
                  <p className="text-xs uppercase text-gray-400 font-semibold tracking-wider">Email Us</p>
                  <p className="font-bold text-white text-base break-all">office@bimbcarebridge.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Hero Visual Card */}
          <div className="bg-gray-900 p-6 sm:p-8 rounded-2xl border border-blue-900/60 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-blue-600 text-white px-4 py-1 rounded-bl-xl font-bold text-xs uppercase tracking-wider">
              Ontario Wide
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Your Partner in Care & Service</h3>
            <p className="text-sm text-gray-400 mb-6">We make staffing simple, flexible, & reliable. Short-term, long-term, temporary, & on-call placements.</p>
            
            <ul className="space-y-3.5 mb-8 text-sm">
              <li className="flex items-center gap-3 text-gray-200">
                <CheckCircle2 size={18} className="text-blue-500 flex-shrink-0" /> Thoroughly Screened & Qualified Staff
              </li>
              <li className="flex items-center gap-3 text-gray-200">
                <CheckCircle2 size={18} className="text-blue-500 flex-shrink-0" /> Flexible Staffing Solutions for Operations
              </li>
              <li className="flex items-center gap-3 text-gray-200">
                <CheckCircle2 size={18} className="text-blue-500 flex-shrink-0" /> 24/7 Support & Responsive Communication
              </li>
              <li className="flex items-center gap-3 text-gray-200">
                <CheckCircle2 size={18} className="text-blue-500 flex-shrink-0" /> Quality Care You Can Count On
              </li>
            </ul>

            <div className="bg-black p-4 rounded-xl border border-gray-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <p className="text-xs text-blue-400 font-semibold uppercase tracking-wider">Looking for work?</p>
                <p className="text-sm font-medium text-white">Upload your resume & get hired.</p>
              </div>
              <Link href="/register" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-xs font-bold transition w-full sm:w-auto text-center">
                Apply Now
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* 2. DUAL SECTORS WE SUPPLY (Healthcare & Hospitality Breakdown) */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">Healthcare & Hospitality Positions Available</h2>
          <p className="text-gray-400 mt-3 text-base">Explore our core staffing categories tailored for top facilities and venues across Ontario.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Healthcare Supply Card */}
          <div className="bg-gray-900 rounded-2xl shadow-xl border border-gray-800 border-t-4 border-t-blue-600 p-6 sm:p-8 space-y-6 flex flex-col justify-between">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                <h3 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
                  <div className="p-2 bg-blue-600/20 text-blue-500 rounded-lg"><HeartHandshake size={22} /></div> Healthcare Professionals
                </h3>
                <span className="bg-blue-950 text-blue-400 border border-blue-800 px-3 py-1 rounded-full text-xs font-bold">Healthcare</span>
              </div>
              <p className="text-sm text-gray-400 mb-6">Supplying clinical and support staff to hospitals, long-term care, and senior residences.</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm mb-6">
                <div className="bg-black p-3 rounded-lg border border-gray-800 font-medium text-gray-300">• Registered Nurses (RN)</div>
                <div className="bg-black p-3 rounded-lg border border-gray-800 font-medium text-gray-300">• Registered Practical Nurses (RPN)</div>
                <div className="bg-black p-3 rounded-lg border border-gray-800 font-medium text-gray-300">• Personal Support Workers (PSW)</div>
                <div className="bg-black p-3 rounded-lg border border-gray-800 font-medium text-gray-300">• Home Support Workers</div>
                <div className="bg-black p-3 rounded-lg border border-gray-800 font-medium text-gray-300">• Caregivers & Companions</div>
                <div className="bg-black p-3 rounded-lg border border-gray-800 font-medium text-gray-300">• Other Healthcare Support</div>
              </div>
            </div>
            <Link href="/jobs?sector=Healthcare" className="block text-center bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-bold text-sm transition shadow-md">
              View Healthcare Jobs
            </Link>
          </div>

          {/* Hospitality Supply Card */}
          <div className="bg-gray-900 rounded-2xl shadow-xl border border-gray-800 border-t-4 border-t-blue-400 p-6 sm:p-8 space-y-6 flex flex-col justify-between">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                <h3 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
                  <div className="p-2 bg-blue-400/20 text-blue-400 rounded-lg"><Building2 size={22} /></div> Hospitality Professionals
                </h3>
                <span className="bg-blue-950 text-blue-300 border border-blue-800 px-3 py-1 rounded-full text-xs font-bold">Hospitality</span>
              </div>
              <p className="text-sm text-gray-400 mb-6">Supplying service talent to hotels, resorts, restaurants, banquet halls, and conference centres.</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm mb-6">
                <div className="bg-black p-3 rounded-lg border border-gray-800 font-medium text-gray-300">• Wait Staff & Servers</div>
                <div className="bg-black p-3 rounded-lg border border-gray-800 font-medium text-gray-300">• Bartenders & Mixologists</div>
                <div className="bg-black p-3 rounded-lg border border-gray-800 font-medium text-gray-300">• Hosts / Hostesses</div>
                <div className="bg-black p-3 rounded-lg border border-gray-800 font-medium text-gray-300">• Kitchen Help & Dishwashers</div>
                <div className="bg-black p-3 rounded-lg border border-gray-800 font-medium text-gray-300">• Housekeeping Staff</div>
                <div className="bg-black p-3 rounded-lg border border-gray-800 font-medium text-gray-300">• Front Desk & Event Staff</div>
              </div>
            </div>
            <Link href="/jobs?sector=Hospitality" className="block text-center bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-xl font-bold text-sm transition shadow-md">
              View Hospitality Jobs
            </Link>
          </div>

        </div>
      </section>

      {/* 3. FEATURED JOB OPENINGS (Live from Database) */}
      <section className="bg-gray-950 py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-y border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
            <div>
              <h2 className="text-3xl font-extrabold text-white">Latest Job Opportunities</h2>
              <p className="text-gray-400 mt-1">Apply directly or browse our current active postings.</p>
            </div>
            <Link href="/jobs" className="text-blue-400 font-bold hover:text-blue-300 flex items-center gap-1 transition">
              View All Openings <ArrowRight size={16} />
            </Link>
          </div>

          {loading ? (
            <div className="text-center py-16 text-gray-400">Loading open vacancies...</div>
          ) : featuredJobs.length === 0 ? (
            <div className="bg-gray-900 p-8 rounded-2xl text-center border border-gray-800">
              <p className="text-gray-400 mb-4">No active job listings are currently posted. Check back soon or register your profile!</p>
              <Link href="/register" className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold text-sm transition">Create Candidate Profile</Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredJobs.map((job) => (
                <div key={job._id} className="bg-gray-900 p-6 rounded-2xl border border-gray-800 hover:border-blue-600/50 flex flex-col justify-between transition group">
                  <div className="space-y-3">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${job.sector === 'Healthcare' ? 'bg-blue-950 text-blue-400 border border-blue-800' : 'bg-gray-800 text-blue-300 border border-gray-700'}`}>
                      {job.sector}
                    </span>
                    <h4 className="font-bold text-lg text-white group-hover:text-blue-400 transition line-clamp-1">{job.title}</h4>
                    <p className="text-xs text-gray-400 font-medium">{job.category} • {job.employmentType}</p>
                    <p className="text-xs text-gray-400 flex items-center gap-1.5"><MapPin size={13} className="text-blue-500" /> {job.location}</p>
                    <p className="text-xs text-gray-400 line-clamp-2 pt-1">{job.description}</p>
                  </div>
                  <div className="pt-6 mt-4 border-t border-gray-800 flex items-center justify-between">
                    <span className="text-xs font-bold text-blue-400">{job.salary || 'Competitive Pay'}</span>
                    <Link href={`/jobs/${job._id}`} className="bg-blue-600 hover:bg-blue-700 text-white px-3.5 py-2 rounded-lg text-xs font-semibold transition">
                      Details & Apply
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 4. WHY JOIN BIMB CAREBRIDGE LTD (Perks Bar) */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <h2 className="text-3xl font-extrabold text-white">Why Join Bimb Carebridge Ltd.?</h2>
          <p className="text-gray-400 mt-2">We value our staff, vendors, and partners to deliver service excellence.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800 text-center space-y-3 hover:border-blue-600/40 transition">
            <div className="bg-black w-12 h-12 mx-auto rounded-xl flex items-center text-blue-500 justify-center border border-gray-800">
              <Clock size={22} />
            </div>
            <h4 className="font-bold text-sm text-white">Flexible Shifts</h4>
            <p className="text-xs text-gray-400 leading-relaxed">Short-term & flexible scheduling.</p>
          </div>
          <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800 text-center space-y-3 hover:border-blue-600/40 transition">
            <div className="bg-black w-12 h-12 mx-auto rounded-xl flex items-center text-blue-500 justify-center border border-gray-800">
              <Users size={22} />
            </div>
            <h4 className="font-bold text-sm text-white">Great Environment</h4>
            <p className="text-xs text-gray-400 leading-relaxed">Supportive professional workplaces.</p>
          </div>
          <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800 text-center space-y-3 hover:border-blue-600/40 transition">
            <div className="bg-black w-12 h-12 mx-auto rounded-xl flex items-center text-blue-500 justify-center border border-gray-800">
              <Award size={22} />
            </div>
            <h4 className="font-bold text-sm text-white">Growth Opportunities</h4>
            <p className="text-xs text-gray-400 leading-relaxed">Continuous career advancement.</p>
          </div>
          <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800 text-center space-y-3 hover:border-blue-600/40 transition">
            <div className="bg-black w-12 h-12 mx-auto rounded-xl flex items-center text-blue-500 justify-center border border-gray-800">
              <ShieldCheck size={22} />
            </div>
            <h4 className="font-bold text-sm text-white">Competitive Pay</h4>
            <p className="text-xs text-gray-400 leading-relaxed">Top tier industry compensation.</p>
          </div>
          <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800 text-center space-y-3 hover:border-blue-600/40 transition sm:col-span-2 lg:col-span-1">
            <div className="bg-black w-12 h-12 mx-auto rounded-xl flex items-center text-blue-500 justify-center border border-gray-800">
              <Briefcase size={22} />
            </div>
            <h4 className="font-bold text-sm text-white">Supportive Team</h4>
            <p className="text-xs text-gray-400 leading-relaxed">24/7 dedicated support staff.</p>
          </div>
        </div>
      </section>

      {/* 5. CALL TO ACTION FOR EMPLOYERS / FACILITIES */}
      <section className="bg-black py-16 px-4">
        <div className="max-w-5xl mx-auto bg-gray-900 p-8 sm:p-12 rounded-3xl border border-blue-900/50 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-xl text-center md:text-left">
            <span className="text-blue-400 text-xs font-bold uppercase tracking-widest bg-blue-950 px-3 py-1 rounded border border-blue-800">Trusted Partnerships</span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">Need Staff for Your Healthcare Facility or Hotel?</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Partner with Bimb Carebridge Corporation for dependable staffing solutions tailored precisely to your operational requirements. Your goals, our network, shared success.
            </p>
          </div>
          <div className="flex-shrink-0 w-full md:w-auto">
            <Link href="/employers" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-bold text-center block transition shadow-lg shadow-blue-900/40">
              Request Staffing Solutions
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}