"use client";

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
    <section className="py-8 lg:py-16 overflow-hidden">
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
                  <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 w-[180px] h-[120px] flex items-center justify-center group hover:border-[#00385d]/20">
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