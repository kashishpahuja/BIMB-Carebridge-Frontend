'use client';

import { 
  HeartHandshake, 
  Users, 
  Building2, 
  Home, 
  UserCheck, 
  ShieldCheck, 
  ArrowRight,
  Play
} from 'lucide-react';
import Link from 'next/link';

export default function HealthcareSolutionsSection() {
  const suppliedRoles = [
    { name: 'Registered Nurses (RN)', icon: HeartHandshake },
    { name: 'Registered Practical Nurses (RPN)', icon: HeartHandshake },
    { name: 'Personal Support Workers (PSW)', icon: Users },
    { name: 'Home Support Workers', icon: Home },
    { name: 'Caregivers', icon: UserCheck },
    { name: 'Other Healthcare Support Professionals', icon: ShieldCheck },
  ];

  const facilities = [
    { name: 'Hospitals & Healthcare Facilities', icon: Building2 },
    { name: 'Long-Term Care Homes', icon: Home },
    { name: 'Retirement Homes & Senior Living Facilities', icon: Users },
    { name: 'Home & Community Care Organizations', icon: Home },
    { name: 'Clinics and Other Healthcare Providers', icon: Building2 },
  ];

  return (
    <section className="py-16 md:py-24 bg-[#FBFBFA] font-['Poppins']">
      <div className="px-5 md:px-12 lg:px-24 xl:px-40 space-y-12 md:space-y-16">
        
        {/* TOP HEADER SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start justify-between">
          
          {/* Left: Badge & Main Title */}
          <div className="lg:col-span-6 space-y-3">
            <span className="inline-block px-4 py-1.5 rounded-2xl bg-[#0b2345]/10 text-[#0b2345] text-sm font-semibold tracking-wider uppercase">
              About Us
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-medium text-[#467B23] leading-[1.12] tracking-tight">
              Healthcare Solutions <br />
              You Can Count On
            </h2>
          </div>

          {/* Right: Subtitle & CTA buttons */}
          <div className="lg:col-span-6 space-y-5 pt-1">
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              Providing qualified, dependable and compassionate healthcare professionals to support your organization and the people you care for.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link href={'/about'} className="bg-[#467B23] hover:bg-[#0b2345] text-white px-7 py-3.5 rounded-2xl text-sm font-semibold uppercase tracking-wider transition-all duration-300 flex items-center gap-2 group cursor-pointer shadow-md hover:-translate-y-0.5">
                <span>Learn More</span>
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <button 
                aria-label="Play video"
                className="w-12 h-12 rounded-2xl bg-[#0b2345]/10 text-[#0b2345] flex items-center justify-center hover:bg-[#0b2345]/20 transition-all cursor-pointer hover:scale-105"
              >
                <Play size={18} className="fill-current ml-0.5" />
              </button>
            </div>
          </div>

        </div>

        {/* 5-CARD MIXED GRID LAYOUT (Optimized heights & responsive padding) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-6 items-stretch">
          
          {/* Card 1: Visual Block */}
          <div className="bg-[#0b2345]/10 rounded-3xl p-6 sm:p-7 flex flex-col justify-between border border-[#0b2345]/20 shadow-sm relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            <div className="space-y-2">
              <span className="text-[11px] font-mono tracking-widest text-[#0b2345] uppercase font-semibold">01 / STAFFING</span>
              <h3 className="text-lg font-semibold text-[#467B23]">Compassionate Care</h3>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed pt-4">
              Equipping facilities with verified medical talent ready to deliver exceptional support.
            </p>
          </div>

          {/* Card 2: Stat Box (We Supply) */}
          <div className="bg-linear-to-br from-[#0b2345]/15 to-[#0b2345]/5 rounded-3xl p-6 sm:p-7 flex flex-col justify-between border border-[#0b2345]/20 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            <div>
              <h3 className="text-3xl sm:text-4xl font-bold text-[#0b2345] mb-2">6+</h3>
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Specialized Roles</p>
            </div>
            <div className="space-y-2 pt-4 border-t border-[#0b2345]/15">
              <p className="text-sm font-semibold text-[#467B23] uppercase">We Supply:</p>
              <p className="text-sm text-gray-600">
                RNs, RPNs, PSWs, Home Support Workers, Caregivers & Support Professionals.
              </p>
            </div>
          </div>

          {/* Card 3: Interactive White Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 flex flex-col justify-between border border-gray-100 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-[#0b2345]/10 text-[#0b2345] flex items-center justify-center transition-colors group-hover:bg-[#467B23] group-hover:text-white">
                <Building2 size={20} />
              </div>
              <span className="text-sm font-mono text-gray-400">03</span>
            </div>
            <div className="space-y-2 py-4">
              <h4 className="text-[18px] font-semibold text-[#467B23]">Facilities Served</h4>
              <p className="text-sm text-gray-500 leading-relaxed">
                Hospitals, Long-Term Care, Retirement Homes, and Community Organizations across Ontario.
              </p>
            </div>
            <span className="text-sm font-semibold text-[#0b2345] flex items-center gap-1 group-hover:text-[#467B23] transition-colors">
              Explore Solutions →
            </span>
          </div>

          {/* Card 4: Light Stat Box */}
          <div className="bg-[#0b2345]/10 rounded-3xl p-6 sm:p-7 flex flex-col justify-between border border-[#0b2345]/20 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            <div>
              <h3 className="text-3xl sm:text-4xl font-bold text-[#0b2345] mb-2">24/7</h3>
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Availability</p>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed pt-4">
              Short-term, long-term, temporary, and on-call flexible staffing whenever you need us.
            </p>
          </div>

          {/* Card 5: linear Accent CTA Card */}
          <div className="bg-linear-to-br from-[#0b2345] to-[#143A2F] text-white rounded-3xl p-6 sm:p-7 flex flex-col justify-between shadow-lg relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 sm:col-span-2 lg:col-span-1">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-2xl bg-[#A8E063] animate-pulse" />
                <span className="text-[10px] font-semibold uppercase tracking-widest text-gray-300">Partner in care</span>
              </div>
              <h3 className="text-xl font-bold tracking-tight">Get Started With Us</h3>
            </div>
            <p className="text-sm text-gray-200 leading-relaxed font-light py-4">
              Connect with BIMB Carebridge today for dependable healthcare staffing solutions.
            </p>
            <a 
              href="tel:6475003737" 
              className="inline-flex items-center justify-center gap-2 bg-white text-[#0b2345] hover:bg-gray-100 py-3 px-5 rounded-2xl text-sm font-bold uppercase tracking-wider transition-all shadow-sm hover:scale-[1.02]"
            >
              Call 647-500-3737
            </a>
          </div>

        </div>

      </div>
    </section>
  );
}