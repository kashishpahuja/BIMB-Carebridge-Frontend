// components/ServicesSection.jsx
'use client';

import React from 'react';
import FadeIn from './FadeIn';

const services = [
  {
    number: "01",
    title: "3D Modeling",
    description: "Creation of detailed objects, characters, or environments tailored to specific client needs, ideal for games, products, and visualizations."
  },
  {
    number: "02",
    title: "Rendering",
    description: "High-quality, photorealistic renders that showcase designs with custom lighting, textures, and materials to bring concepts to life."
  },
  {
    number: "03",
    title: "Motion Design",
    description: "Dynamic animations and motion graphics that add energy and storytelling to brands, products, and digital experiences."
  },
  {
    number: "04",
    title: "Branding",
    description: "Crafting cohesive visual identities -- from logos to full brand systems -- that communicate a clear and memorable presence."
  },
  {
    number: "05",
    title: "Web Design",
    description: "Designing clean, modern, and conversion-focused websites with attention to layout, typography, and user experience."
  }
];

export default function ServicesSection() {
  return (
    <section id="price" className="bg-white rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 relative z-10 text-[#0C0C0C]">
      <div className="max-w-5xl mx-auto">
        <FadeIn y={40}>
          <h2 className="hero-heading font-black uppercase text-center mb-16 sm:mb-20 md:mb-28" style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}>
            Services
          </h2>
        </FadeIn>

        <div className="flex flex-col">
          {services.map((service, i) => (
            <FadeIn key={service.number} delay={i * 0.1} y={30}>
              <div 
                className="flex flex-col md:flex-row items-start md:items-center justify-between py-8 sm:py-10 md:py-12 gap-6 md:gap-10"
                style={{ borderBottom: '1px solid rgba(12, 12, 12, 0.15)' }}
              >
                <div className="flex items-baseline gap-6 md:gap-10 w-full md:w-auto">
                  <span className="font-black text-[#0C0C0C]" style={{ fontSize: 'clamp(3rem, 10vw, 140px)' }}>
                    {service.number}
                  </span>
                  <h3 className="font-medium uppercase md:hidden" style={{ fontSize: 'clamp(1rem, 2.2vw, 2.1rem)' }}>
                    {service.title}
                  </h3>
                </div>

                <div className="flex flex-col gap-2 max-w-2xl">
                  <h3 className="font-medium uppercase hidden md:block" style={{ fontSize: 'clamp(1rem, 2.2vw, 2.1rem)' }}>
                    {service.title}
                  </h3>
                  <p className="font-light leading-relaxed opacity-60" style={{ fontSize: 'clamp(0.85rem, 1.6vw, 1.25rem)' }}>
                    {service.description}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}