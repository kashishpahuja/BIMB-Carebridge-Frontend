"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  FiHeart,
  FiUsers,
  FiClock,
  FiActivity,
  FiCoffee,
  FiArrowRight,
  FiPhone,
  FiMail,
} from "react-icons/fi";

export default function AboutPage() {
  return (
    <main className="w-full bg-[#fafcf9] text-[#01193B]">
      {/* =====================================================
          HERO SECTION
      ===================================================== */}
      <section
        className="
          relative
          min-h-[400px]
          sm:min-h-[480px]
          lg:min-h-[550px]
          flex
          items-center
          overflow-hidden
          bg-[#ebe9e5]
          bg-cover
          bg-center
          bg-no-repeat
        "
        style={{
          backgroundImage: "url('/Images/aboutbg.webp')", // Update with your image path
        }}
      >
        {/* Decorative Background */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="
              absolute
              right-[-80px]
              bottom-[-100px]
              w-[350px]
              h-[350px]
              sm:w-[450px]
              sm:h-[450px]
              lg:w-[550px]
              lg:h-[550px]
              rounded-full
              bg-[#467B23]/10
              blur-3xl
            "
          />
          <div
            className="
              absolute
              left-[-120px]
              top-[-150px]
              w-[350px]
              h-[350px]
              rounded-full
              bg-[#0D2B45]/5
              blur-3xl
            "
          />
        </div>

        <div className="relative z-10 w-full px-5 md:px-12 lg:px-24 xl:px-40 py-20 sm:py-24">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="max-w-2xl"
          >
            <span
              className="
                text-[11px]
                sm:text-xs
                uppercase
                tracking-[0.3em]
                font-semibold
                text-[#467B23]
              "
            >
              About BIMB Carebridge
            </span>

            <h1
              className="
                mt-4
                text-4xl
                sm:text-5xl
                lg:text-6xl
                font-light
                tracking-tight
                leading-[1.1]
                text-[#01193B]
              "
            >
              Connecting Care &<br />
              <span className="font-semibold">Creating Opportunities</span>
            </h1>

            <div className="w-16 h-[2px] bg-[#D4AF37] mt-7 mb-6" />

            <p className="max-w-md text-sm sm:text-base text-gray-600 leading-relaxed">
              We link qualified healthcare and hospitality professionals with
              organizations that value compassion, quality, and dependability.
            </p>
          </motion.div>
        </div>
      </section>

      {/* =====================================================
          INTRODUCTION / MISSION
      ===================================================== */}
      <section className="bg-white px-5 sm:px-12 lg:px-24 xl:px-40 py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light leading-[1.1] text-[#01193B]">
              Healthcare Solutions <br />
              <span className="font-semibold">You Can Count On</span>
            </h2>
            <p className="mt-6 text-base text-gray-500 leading-relaxed max-w-lg">
              Providing qualified, dependable and compassionate healthcare
              professionals to support your organization and the people you care
              for.
            </p>
            <button
              className="
                mt-8
                inline-flex
                items-center
                justify-center
                gap-3
                bg-[#0D2B45]
                hover:bg-[#467B23]
                text-white
                px-7
                py-3.5
                rounded-full
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.15em]
                transition-all
                duration-300
                shadow-md
                group
              "
            >
              Learn More
              <span className="w-6 h-6 rounded-full bg-[#D4AF37] text-[#01193B] flex items-center justify-center">
                <FiArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
              </span>
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-[#EBECF0] p-8 sm:p-12 rounded-2xl border border-white/50 shadow-sm"
          >
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#467B23] font-semibold">
              01 / Staffing
            </span>
            <h3 className="mt-3 text-2xl font-semibold text-[#01193B]">
              Compassionate Care
            </h3>
            <p className="mt-4 text-sm text-gray-500 leading-relaxed">
              Equipping facilities with verified medical talent ready to deliver
              exceptional support exactly when and where it is needed most.
            </p>
          </motion.div>
        </div>
      </section>

      {/* =====================================================
          AT A GLANCE / STATS
      ===================================================== */}
      <section className="bg-[#EBECF0] px-6 sm:px-10 lg:px-16 py-16 sm:py-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-12">
          {/* Stat 1 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center text-center sm:items-start sm:text-left"
          >
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-[#467B23] mb-5 shadow-sm">
              <FiUsers size={20} />
            </div>
            <h3 className="text-3xl font-light text-[#01193B] mb-2">6+</h3>
            <h4 className="text-xs uppercase tracking-[0.15em] font-semibold text-[#01193B] mb-3">
              Specialized Roles
            </h4>
            <p className="text-sm text-gray-500 leading-relaxed">
              We Supply: RNs, RPNs, PSWs, Home Support Workers, Caregivers &
              Support Professionals.
            </p>
          </motion.div>

          {/* Stat 2 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col items-center text-center sm:items-start sm:text-left"
          >
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-[#467B23] mb-5 shadow-sm">
              <FiHeart size={20} />
            </div>
            <h3 className="text-3xl font-light text-[#01193B] mb-2">03</h3>
            <h4 className="text-xs uppercase tracking-[0.15em] font-semibold text-[#01193B] mb-3">
              Facilities Served
            </h4>
            <p className="text-sm text-gray-500 leading-relaxed">
              Hospitals, Long-Term Care, Retirement Homes, and Community
              Organizations across Ontario.
            </p>
          </motion.div>

          {/* Stat 3 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col items-center text-center sm:items-start sm:text-left"
          >
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-[#467B23] mb-5 shadow-sm">
              <FiClock size={20} />
            </div>
            <h3 className="text-3xl font-light text-[#01193B] mb-2">24/7</h3>
            <h4 className="text-xs uppercase tracking-[0.15em] font-semibold text-[#01193B] mb-3">
              Availability
            </h4>
            <p className="text-sm text-gray-500 leading-relaxed">
              Short-term, long-term, temporary, and on-call flexible staffing
              whenever you need us.
            </p>
          </motion.div>
        </div>
      </section>

      {/* =====================================================
          JOB CATEGORIES / SECTORS
      ===================================================== */}
      <section className="px-5 md:px-12 lg:px-24 xl:px-40 py-20 lg:py-28 bg-white">
        <div className="mb-16 text-center sm:text-left flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div>
            <span className="text-[11px] sm:text-xs uppercase tracking-[0.3em] font-semibold text-[#467B23]">
              View All Categories
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl font-light text-[#01193B]">
              Our Professional <span className="font-semibold">Talent Network</span>
            </h2>
          </div>
          <button className="text-sm font-medium text-[#467B23] hover:text-[#01193B] transition-colors border-b border-[#467B23] pb-1 w-fit mx-auto sm:mx-0">
            Explore Solutions →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          
          {/* Healthcare Roles */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-[#fafcf9] border border-gray-100 p-8 rounded-2xl hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-4 text-[#467B23]">
                <span className="text-[10px] uppercase tracking-[0.2em] font-bold">01 / Healthcare Sector</span>
                <FiActivity size={18} />
              </div>
              <h3 className="text-xl font-semibold text-[#01193B] mb-3">Registered Nurses (RN)</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Provide direct patient care in an acute care environment, administer medications, monitor patient conditions, and collaborate with physicians and healthcare teams.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-[#fafcf9] border border-gray-100 p-8 rounded-2xl hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-4 text-[#467B23]">
                <span className="text-[10px] uppercase tracking-[0.2em] font-bold">02 / Healthcare Sector</span>
                <FiHeart size={18} />
              </div>
              <h3 className="text-xl font-semibold text-[#01193B] mb-3">Personal Support Workers (PSW)</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Provide compassionate personal care and daily living assistance to clients in their homes, including mobility support, hygiene, meal assistance, and companionship.
              </p>
            </motion.div>
          </div>

          {/* Hospitality Roles */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-[#fafcf9] border border-gray-100 p-8 rounded-2xl hover:shadow-md transition-shadow relative overflow-hidden"
            >
              {/* Active indicator */}
              <div className="absolute top-0 right-0 bg-[#D4AF37] text-[#01193B] text-[9px] uppercase tracking-wider font-bold px-3 py-1 rounded-bl-lg">Active</div>
              
              <div className="flex items-center justify-between mb-4 text-[#467B23]">
                <span className="text-[10px] uppercase tracking-[0.2em] font-bold">03 / Hospitality Sector</span>
                <FiCoffee size={18} />
              </div>
              <h3 className="text-xl font-semibold text-[#01193B] mb-3">Wait Staff & Servers</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Deliver premium dining experiences by greeting guests, taking orders, serving meals and beverages, and ensuring exceptional customer satisfaction.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-[#fafcf9] border border-gray-100 p-8 rounded-2xl hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-4 text-[#467B23]">
                <span className="text-[10px] uppercase tracking-[0.2em] font-bold">04 / Hospitality Sector</span>
                <FiCoffee size={18} />
              </div>
              <h3 className="text-xl font-semibold text-[#01193B] mb-3">Bartenders & Mixologists</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Prepare and serve alcoholic and non-alcoholic beverages at corporate functions, weddings, and private events while maintaining professional service standards.
              </p>
            </motion.div>
          </div>

        </div>
      </section>

      {/* =====================================================
          CTA / CONTACT
      ===================================================== */}
      <section className="bg-linear-to-tr from-[#0b2345] to-[#143A2F] text-white px-5 md:px-12 lg:px-24 xl:px-40 py-20 text-center sm:text-left">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#D4AF37] font-semibold">
              Partner In Care
            </span>
            <h2 className="mt-4 text-3xl sm:text-3xl font-light">
              Get Started <span className="font-semibold">With Us</span>
            </h2>
            <p className="mt-4 text-sm sm:text-base text-gray-300 max-w-lg mx-auto sm:mx-0">
              Connect with BIMB Carebridge today for dependable healthcare and hospitality staffing solutions.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-4 justify-center sm:justify-start"
          >
            <a
              href="tel:6475003737"
              className="
                inline-flex items-center justify-center gap-3
                bg-[#467B23] hover:bg-white hover:text-[#01193B] text-white
                px-7 py-4 rounded-full text-[11px] font-bold uppercase tracking-[0.15em]
                transition-all duration-300 shadow-md
              "
            >
              <FiPhone size={14} />
              647-500-3737
            </a>
            <a
              href="mailto:info@bimbcarebridge.com"
              className="
                inline-flex items-center justify-center gap-3
                bg-transparent border border-white/30 hover:border-white text-white
                px-7 py-4 rounded-full text-[11px] font-bold uppercase tracking-[0.15em]
                transition-all duration-300
              "
            >
              <FiMail size={14} />
              Email Us
            </a>
          </motion.div>
        </div>
      </section>
    </main>
  );
}