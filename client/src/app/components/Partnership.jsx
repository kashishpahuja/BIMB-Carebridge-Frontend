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
      <section className="pt-24 pb-12 px-5 md:px-12 lg:px-24">
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
      <section className="pb-24   ">
        <div className="flex items-center justify-start">
          
  




        {/* Background Right Section (Green Card) */}
<motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6 }}
  className="
    relative
    w-full
    overflow-hidden
    bg-cover
    bg-center
    bg-no-repeat
    bg-[url('/Images/partnerbg.webp')]
    md:pl-12
    lg:pl-24
    xl:pl-40
    p-8
    sm:p-12
    lg:p-16
    xl:pr-96
    z-10
    my-auto
    py-24
  "
>
  {/* Background Overlay */}
  {/* <div
    className="
      absolute
      inset-0
      z-0
      bg-gradient-to-r
      from-[#fafcf9]/95
      via-[#fafcf9]/65
      to-[#0b2345]/20
    "
  /> */}

  {/* Content */}
  <div className="relative z-10 space-y-8">

    <div>
      <span className="text-xs font-mono tracking-widest text-[#5cc417] uppercase font-semibold">
        Why Partner With Us?
      </span>

      <h3 className="text-2xl sm:text-3xl font-semibold mt-2 text-[#cdd4dd]">
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
          transition={{
            duration: 0.4,
            delay: idx * 0.1,
          }}
          className="
            flex
            items-start
            gap-4
            pb-4
            group
          "
        >
          <span
            className="
              text-[#5cc417]
              font-mono
              font-bold
              text-lg
              transition-transform
              group-hover:translate-x-1
            "
          >
            →
          </span>

          <p className="text-sm sm:text-base text-gray-200 leading-relaxed">
            {point}
          </p>
        </motion.div>
      ))}
    </div>

    {/* CTA */}
    <div className="pt-4">
      <a
        href="tel:6475003737"
        className="
          inline-flex
          items-center
          gap-3
          bg-[#467B23]
          hover:bg-[#3b681d]
          text-white
          px-8
          py-4
          rounded-2xl
          text-xs
          font-semibold
          tracking-wider
          uppercase
          transition-all
          duration-300
          shadow-lg
          cursor-pointer
          group
        "
      >
        <span>Connect With Our Team</span>

        <ArrowRight
          size={14}
          className="transition-transform group-hover:translate-x-1"
        />
      </a>
    </div>

  </div>
</motion.div>

                    {/* Floating Image Card on the Left (Overlapping right section, unrounded borders, vertically centered) */}
          {/* <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden xl:block absolute  right-[10%] aspect-square w-[500px] h-[500px] shadow-2xl z-20 bg-cover bg-center"
            style={{ backgroundImage: "url('/Images/partner.webp')" }}
          >
            <div className="absolute inset-0 bg-linear-to-t from-[#0b2345]/90 via-[#0b2345]/40 to-transparent flex flex-col justify-end p-8 text-white">
              <span className="text-xs font-mono tracking-widest text-[#467B23] uppercase mb-1">Shared Success</span>
              <h4 className="text-xl sm:text-2xl font-bold">Your goals. Our network.</h4>
              <p className="text-xs text-gray-300 font-light mt-1">Dependable service excellence across Ontario.</p>
            </div>
          </motion.div> */}



        </div>
      </section>


    </>
  );
}