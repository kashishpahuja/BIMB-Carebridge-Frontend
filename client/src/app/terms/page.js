"use client";

import React from "react";
import { motion } from "framer-motion";
import { FiFileText, FiCheckCircle, FiAlertCircle, FiMail } from "react-icons/fi";

export default function TermsOfService() {
  const lastUpdated = "September 2, 2026";

  return (
    <main className="w-full bg-[#EBECF0]  text-[#01193B]">
      {/* =====================================================
          HERO SECTION
      ===================================================== */}
      <section
        className="
          relative
          min-h-[350px]
          sm:min-h-[450px]
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
          // You can replace this with a relevant background image if desired
          backgroundImage: "url('/Images/contactbg.webp')",
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

        <div
          className="
            relative
            z-10
            w-full
            px-5 
            md:px-12 
            lg:px-24 
            xl:px-40
            py-20
            sm:py-24
          "
        >
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
              Legal & Compliance
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
              Terms of Service
            </h1>

            <div className="w-16 h-[2px] bg-[#D4AF37] mt-7 mb-6" />

            <p
              className="
                max-w-md
                text-sm
                sm:text-base
                text-gray-600
                leading-relaxed
              "
            >
              Please read these terms and conditions carefully before using our
              services. Last updated: {lastUpdated}
            </p>
          </motion.div>
        </div>
      </section>

      {/* =====================================================
          AT A GLANCE / HIGHLIGHTS
      ===================================================== */}
      <section className="px-6 sm:px-10 lg:px-16 py-12 border-t border-[#0b234527]">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: <FiFileText size={20} />,
              title: "Agreement",
              text: "By accessing our website, you agree to be bound by these specific terms.",
            },
            {
              icon: <FiCheckCircle size={20} />,
              title: "Compliance",
              text: "Adherence to all applicable regional and national laws and regulations.",
            },
            {
              icon: <FiAlertCircle size={20} />,
              title: "Liability",
              text: "Clear boundaries regarding our services, guidance, and financial advice.",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex items-start gap-4"
            >
              <div
                className="
                  w-12
                  h-12
                  rounded-full
                  bg-[#0D2B45]/5
                  flex
                  items-center
                  justify-center
                  text-[#0D2B45]
                  shrink-0
                "
              >
                {item.icon}
              </div>
              <div>
                <h3 className="text-xs uppercase tracking-[0.15em] font-semibold mb-2">
                  {item.title}
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  {item.text}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* =====================================================
          CONTENT SECTION
      ===================================================== */}
      <section className="      px-5 
      md:px-12 
      lg:px-24 
      xl:px-40 py-16 sm:py-20 lg:py-24">
        <div className="">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="prose prose-sm sm:prose-base max-w-none text-gray-600 space-y-10"
          >
            {/* Section 1 */}
            <div>
              <h2 className="text-2xl font-medium text-[#01193B] mb-4">
                1. Agreement to Terms
              </h2>
              <p className="leading-relaxed">
                These Terms of Service constitute a legally binding agreement made between you,
                whether personally or on behalf of an entity (“you”) and RCIG Mortgages (“we,” “us” or “our”),
                concerning your access to and use of the website as well as any other media form,
                media channel, mobile website or mobile application related, linked, or otherwise
                connected thereto (collectively, the “Site”).
              </p>
            </div>

            {/* Section 2 */}
            <div>
              <h2 className="text-2xl font-medium text-[#01193B] mb-4">
                2. Intellectual Property Rights
              </h2>
              <p className="leading-relaxed mb-4">
                Unless otherwise indicated, the Site is our proprietary property and all source code,
                databases, functionality, software, website designs, audio, video, text, photographs,
                and graphics on the Site (collectively, the “Content”) and the trademarks, service
                marks, and logos contained therein (the “Marks”) are owned or controlled by us or
                licensed to us.
              </p>
              <ul className="list-disc pl-5 space-y-3 marker:text-[#467B23]">
                <li>
                  You may not copy, reproduce, aggregate, republish, upload, post, or distribute our Content without express written permission.
                </li>
                <li>
                  Provided that you are eligible to use the Site, you are granted a limited license to access and use the Site.
                </li>
              </ul>
            </div>

            {/* Section 3 */}
            <div>
              <h2 className="text-2xl font-medium text-[#01193B] mb-4">
                3. User Representations
              </h2>
              <p className="leading-relaxed">
                By using the Site, you represent and warrant that:
              </p>
              <ul className="list-disc pl-5 mt-4 space-y-3 marker:text-[#467B23]">
                <li>All registration and application information you submit will be true, accurate, current, and complete.</li>
                <li>You will maintain the accuracy of such information and promptly update such registration information as necessary.</li>
                <li>You have the legal capacity and you agree to comply with these Terms of Service.</li>
                <li>You will not use the Site for any illegal or unauthorized purpose.</li>
              </ul>
            </div>

            {/* Section 4 */}
            <div>
              <h2 className="text-2xl font-medium text-[#01193B] mb-4">
                4. Prohibited Activities
              </h2>
              <p className="leading-relaxed">
                You may not access or use the Site for any purpose other than that for which we make the
                Site available. The Site may not be used in connection with any commercial endeavors except
                those that are specifically endorsed or approved by us. Unauthorized framing of or linking
                to the Site, systematic retrieval of data, and attempts to bypass security measures are
                strictly prohibited.
              </p>
            </div>

            {/* Section 5 */}
            <div>
              <h2 className="text-2xl font-medium text-[#01193B] mb-4">
                5. Limitation of Liability
              </h2>
              <p className="leading-relaxed">
                In no event will we or our directors, employees, or agents be liable to you or any third party
                for any direct, indirect, consequential, exemplary, incidental, special, or punitive damages,
                including lost profit, lost revenue, loss of data, or other damages arising from your use of
                the Site or our mortgage services, even if we have been advised of the possibility of such damages.
                Calculations and pre-approvals generated via the Site are estimates and do not constitute a binding offer of financing.
              </p>
            </div>
            
            <div className="w-full h-[1px] bg-gray-200 mt-12 mb-8" />

            {/* Contact CTA inside content */}
            <div className="bg-[#0b234527] p-6 sm:p-8 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-lg font-semibold text-[#01193B] mb-1">
                  Questions about our terms?
                </h3>
                <p className="text-sm text-gray-500">
                  Our compliance team is ready to help clarify any part of our Terms of Service.
                </p>
              </div>
              <a
                href="mailto:info@rcigmortgages.com"
                className="
                  inline-flex
                  items-center
                  justify-center
                  gap-3
                  bg-[#0D2B45]
                  hover:bg-[#467B23]
                  text-white
                  px-6
                  py-3
                  rounded-full
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.15em]
                  transition-all
                  duration-300
                  shadow-md
                  shrink-0
                "
              >
                <FiMail size={14} />
                Contact Us
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}