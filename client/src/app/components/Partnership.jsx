'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const partnershipPoints = [
  "Access to qualified hospitality talent for your operations.",
  "Responsive communication and coordinated support when you need it.",
  "Professional, respectful, and reliable service delivery.",
  "Flexible staffing solutions tailored for events and ongoing operations.",
  "Transparent processes focusing on long-term partnerships and success."
];

export default function WhyPartnerSection() {
  return (
    <>
      {/* Top Header Intro */}
      <section className="pt-24 pb-12 px-5 md:px-12 lg:px-24 bg-white ">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-2xl bg-[#467B23]/10 text-[#467B23] text-xs font-semibold tracking-widest uppercase">
            Carebridge Corporation
          </span>
          <h2 className="font-['Poppins'] text-3xl sm:text-4xl lg:text-5xl  tracking-tight text-[#0b2345] leading-tight">
            Trusted Partnerships. Built on Service & Results.
          </h2>
          <p className="text-gray-600 text-sm sm:text-base font-light leading-relaxed">
            Partner with Carebridge Corporation for dependable hospitality staffing and professional service support tailored to your business needs.
          </p>
        </div>
      </section>

      {/* Overlapping Section: Image on left over right section, no border radius, centered horizontally */}
      <section className="pb-24  bg-white ">
        <div className="  flex items-center justify-start">
          
  




        {/* Background Right Section (Green Card) */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative xl:w-[70%] bg-linear-to-r lg:from-[#467b233f] via-[#d3840d33] to-[#467b2300]  
      md:pl-12
      lg:pl-24
      xl:pl-40 p-8 sm:p-12 lg:p-16 xl:pr-96 z-10 my-auto"
          >
            <div className="space-y-8">
              <div>
                <span className="text-xs font-mono tracking-widest text-[#467B23] uppercase font-semibold">
                  Why Partner With Us?
                </span>
                <h3 className="text-2xl sm:text-3xl font-semibold mt-2 text-[#01193B]">
                  Sound familiar? Here is how we deliver excellence.
                </h3>
              </div>

              {/* Bullet Points List */}
              <div className="space-y-6">
                {partnershipPoints.map((point, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                    className="flex items-start gap-4 border-b border-white/10 pb-4 group"
                  >
                    <span className="text-[#467B23] font-mono font-bold text-lg transition-transform group-hover:translate-x-1">
                      →
                    </span>
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                      {point}
                    </p>
                  </motion.div>
                ))}
              </div>

              <div className="pt-4">
                <a 
                  href="tel:6475003737"
                  className="inline-flex items-center gap-3 bg-[#467B23] hover:bg-[#3b681d] text-white px-8 py-4 rounded-2xl text-xs font-semibold tracking-wider uppercase transition-all duration-300 shadow-lg cursor-pointer group"
                >
                  <span>Connect With Our Team</span>
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </div>
          </motion.div>

                    {/* Floating Image Card on the Left (Overlapping right section, unrounded borders, vertically centered) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden xl:block absolute  right-[10%] aspect-square w-[500px] h-[500px] shadow-2xl z-20 bg-cover bg-center"
            style={{ backgroundImage: "url('/Images/partner.webp')" }}
          >
            {/* <div className="absolute inset-0 bg-linear-to-t from-[#0b2345]/90 via-[#0b2345]/40 to-transparent flex flex-col justify-end p-8 text-white">
              <span className="text-xs font-mono tracking-widest text-[#467B23] uppercase mb-1">Shared Success</span>
              <h4 className="text-xl sm:text-2xl font-bold">Your goals. Our network.</h4>
              <p className="text-xs text-gray-300 font-light mt-1">Dependable service excellence across Ontario.</p>
            </div> */}
          </motion.div>



        </div>
      </section>

      {/* Call To Action Component */}
      <section className="py-20 px-5 md:px-12 lg:px-24 xl:px-40">
        <div className="">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative rounded-[2.5rem] sm:rounded-[3rem] overflow-hidden shadow-2xl bg-cover bg-center md:bg-center"
            style={{ backgroundImage: "url('/Images/cta.webp')" }}
          >
            {/* Dark gradient overlay matching your theme */}
            <div className="absolute inset-0 bg-linear-to-r from-[#143A2F]/90 xl:via-[#0b2345]/75 to-[#0b2345]/30 backdrop-blur-[1px]" />

            <div className="relative z-10 px-8 sm:px-16 py-16 sm:py-24 lg:py-28 max-w-3xl flex flex-col items-start space-y-6">
              
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-2xl bg-[#467B23]/30 text-[#A8E063] text-xs font-semibold tracking-widest uppercase border border-[#467B23]/40">
                Join Our Network
              </span>

              <h2 className="text-4xl sm:text-5xl xl:text-6xl font-bold tracking-tight text-white leading-[1.1]">
                Let&apos;s grow your <br />
                <span className="text-[#A8E063]">career together!</span>
              </h2>

              <p className="text-gray-200 text-base sm:text-lg font-light leading-relaxed max-w-xl">
                Connect with top healthcare and hospitality opportunities across Ontario. Experience dependable placements tailored to your professional goals.
              </p>

              <div className="pt-4">
                <a 
                  href="tel:6475003737"
                  className="inline-flex items-center gap-3 bg-white text-[#143A2F] hover:bg-[#467B23] hover:text-white px-8 py-4 rounded-2xl text-xs font-semibold tracking-wider uppercase transition-all duration-300 shadow-lg cursor-pointer group"
                >
                  <span>Get Started Today</span>
                  <div className="w-6 h-6 rounded-2xl bg-[#143A2F] text-white group-hover:bg-white group-hover:text-[#467B23] flex items-center justify-center transition-colors">
                    <ArrowRight size={12} className="transition-transform group-hover:translate-x-0.5" />
                  </div>
                </a>
              </div>

            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}