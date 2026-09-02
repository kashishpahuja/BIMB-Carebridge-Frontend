"use client";
import { motion } from 'framer-motion';
import { ArrowRight } from "lucide-react";
import Image from "next/image";


export default function ClienteleSection() {
  const clients = [
    { name: "The Mad House", logo: "/Images/bimb.webp" },
    { name: "Born16", logo: "/Images/bimb.webp" },
    { name: "Nourish Mantra", logo: "/Images/bimb.webp" },
    { name: "Neemli Naturals", logo: "/Images/bimb.webp" },
    { name: "Secret Alchemist", logo: "/Images/bimb.webp" },
    { name: "Ayuvya", logo: "/Images/bimb.webp" },
    { name: "Softbird", logo: "/Images/bimb.webp" },
    { name: "Ellement Co", logo: "/Images/bimb.webp" },
  ];
  const allClients = [...clients, ...clients, ...clients];

  return (
    <section className="pt-8 lg:pt-16 overflow-hidden">
      <div className="px-5 md:px-12 lg:px-24 xl:px-40 ">
        
        <div className="text-center ">
      

          <h2 className="text-xl md:text-4xl font-medium mt-6">
            Trusted by <span className="italic">Leading Organizations</span>
          </h2>

          <p className="text-gray-500 mt-2 lg:mt-4 max-w-2xl mx-auto">
            We work with fast-growing D2C brands, premium personal care companies, and international private labels
          </p>
        </div>

        
        <div className="relative mt-6 lg:mt-12">
          
          <div className="absolute left-0 top-0 bottom-0 w-20 z-10 bg-linear-to-r from-gray-50 to-transparent"></div>
          <div className="absolute right-0 top-0 bottom-0 w-20 z-10 bg-linear-to-l from-gray-50 to-transparent"></div>
          
          
          <div className="flex overflow-hidden">
            <div 
              className="flex whitespace-nowrap gap-6"
              style={{
                animation: 'marquee 30s linear infinite'
              }}
            >
              {allClients.map((client, index) => (
                <div
                  key={`${client.name}-${index}`}
                  className="shrink-0"
                >
                  <div className="p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 w-[180px] h-[120px] flex items-center justify-center group hover:border-[#00385d]/20">
                    <Image
                      src={client.logo}
                      alt={client.name}
                      width={140}
                      height={60}
                      className="object-contain max-h-15 w-auto transition-all duration-300"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
            {/* Call To Action Component */}
<section className="pt-20 ">
  <div>
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="
        relative
   
        overflow-hidden
        shadow-2xl
        min-h-[500px]
        sm:min-h-[550px]
        lg:min-h-[600px]
        bg-[#0b2345]
      "
    >

      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className="
          absolute
          inset-0
          w-full
          h-full
          object-cover
        "
      >
        <source src="/Images/contact.mp4" type="video/mp4" />
      </video>

      {/* Dark gradient overlay */}
      <div
        className="
          absolute
          inset-0
          bg-linear-to-r
          from-[#0b2345]/60
          via-[#0b2345]/50
          to-[#0b2345]/30
        "
      />

      {/* Content */}
      <div
        className="
          relative
          z-10
       px-5 md:px-12 lg:px-24 xl:px-40
          py-16
          sm:py-24
          lg:py-28
          max-w-3xl
          min-h-[500px]
          sm:min-h-[550px]
          lg:min-h-[600px]
          flex
          flex-col
          items-start
          justify-center
          space-y-6
        "
      >

        <span
          className="
            inline-flex
            items-center
            gap-2
            px-4
            py-1.5
            rounded-2xl
            bg-[#467B23]/30
            text-[#A8E063]
            text-xs
            font-semibold
            tracking-widest
            uppercase
            border
            border-[#467B23]/40
          "
        >
          Join Our Network
        </span>

        <h2
          className="
            text-4xl
            sm:text-5xl
            xl:text-6xl
            font-bold
            tracking-tight
            text-white
            leading-[1.1]
          "
        >
          Let&apos;s grow your <br />
          <span className="text-[#A8E063]">
            career together!
          </span>
        </h2>

        <p
          className="
            text-gray-200
            text-base
            sm:text-lg
            font-light
            leading-relaxed
            max-w-xl
          "
        >
          Connect with top healthcare and hospitality opportunities
          across Ontario. Experience dependable placements tailored
          to your professional goals.
        </p>

        <div className="pt-4">
          <a
            href="tel:6475003737"
            className="
              inline-flex
              items-center
              gap-3
              bg-white
              text-[#143A2F]
              hover:bg-[#467B23]
              hover:text-white
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
            <span>Get Started Today</span>

            <div
              className="
                w-6
                h-6
                rounded-2xl
                bg-[#143A2F]
                text-white
                group-hover:bg-white
                group-hover:text-[#467B23]
                flex
                items-center
                justify-center
                transition-colors
              "
            >
              <ArrowRight
                size={12}
                className="
                  transition-transform
                  group-hover:translate-x-0.5
                "
              />
            </div>
          </a>
        </div>

      </div>

    </motion.div>
  </div>
</section>

    
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        div:hover > div > div[style*="animation"] {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}