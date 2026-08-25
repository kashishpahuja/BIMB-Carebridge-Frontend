// components/HeroSection.jsx
'use client';

import React from 'react';
import FadeIn from './FadeIn';
import Magnet from './Magnet';
import ContactButton from './ContactButton';

export default function HeroSection() {
  return (
    <section className="relative h-screen w-full flex flex-col justify-between overflow-x-clip px-6 md:px-10 pt-6 md:pt-8 pb-7 sm:pb-8 md:pb-10">
      {/* Navbar */}
      <FadeIn delay={0} y={-20} as="nav" className="flex items-center justify-between z-20">
        {['About', 'Price', 'Projects', 'Contact'].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            className="text-[#D7E2EA] font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem] transition-opacity duration-200 hover:opacity-70"
          >
            {item}
          </a>
        ))}
      </FadeIn>

      {/* Hero Portrait with Magnet */}
      <div className="absolute left-1/2 -translate-x-1/2 z-10 top-1/2 -translate-y-1/2 sm:top-auto sm:translate-y-0 sm:bottom-0 pointer-events-none">
        <FadeIn delay={0.6} y={30}>
          <Magnet
            padding={150}
            strength={3}
            activeTransition="transform 0.3s ease-out"
            inactiveTransition="transform 0.6s ease-in-out"
          >
            <img
              src="https://shrug-person-78902957.figma.site/_components/v2/d24c01ad3a56fc65e942a1f501eb73db42d7cf9a/Rectangle_40443.81459862.png"
              alt="Jack Portrait"
              className="w-[280px] sm:w-[360px] md:w-[440px] lg:w-[520px] object-cover pointer-events-auto"
            />
          </Magnet>
        </FadeIn>
      </div>

      {/* Main Content Group */}
      <div className="w-full z-20 flex flex-col justify-end">
        {/* Hero Heading */}
        <div className="overflow-hidden w-full">
          <FadeIn delay={0.15} y={40}>
            <h1 className="hero-heading font-black uppercase tracking-tight leading-none whitespace-nowrap w-full text-[14vw] sm:text-[15vw] md:text-[16vw] lg:text-[17.5vw] mt-6 sm:mt-4 md:-mt-5 text-center sm:text-left">
              Hi, i&apos;m jack
            </h1>
          </FadeIn>
        </div>

        {/* Bottom Bar */}
        <div className="flex justify-between items-end w-full mt-4">
          <FadeIn delay={0.35} y={20}>
            <p className="text-[#D7E2EA] font-light uppercase tracking-wide leading-snug max-w-[160px] sm:max-w-[220px] md:max-w-[260px]" style={{ fontSize: 'clamp(0.75rem, 1.4vw, 1.5rem)' }}>
              a 3d creator driven by crafting striking and unforgettable projects
            </p>
          </FadeIn>

          <FadeIn delay={0.5} y={20}>
            <ContactButton />
          </FadeIn>
        </div>
      </div>
    </section>
  );
}