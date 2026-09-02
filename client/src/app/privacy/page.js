"use client";

import React from "react";
import { motion } from "framer-motion";
import { FiShield, FiLock, FiEye, FiMail } from "react-icons/fi";

export default function PrivacyPolicy() {
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
              Privacy Policy
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
              We are committed to protecting your personal information and your
              right to privacy. Last updated: {lastUpdated}
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
              icon: <FiShield size={20} />,
              title: "Data Protection",
              text: "Industry standard encryption to protect your sensitive data.",
            },
            {
              icon: <FiEye size={20} />,
              title: "Transparency",
              text: "Clear guidelines on how your information is collected and used.",
            },
            {
              icon: <FiLock size={20} />,
              title: "Secure Processing",
              text: "Your data is only processed for its intended mortgage purposes.",
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
                1. Introduction
              </h2>
              <p className="leading-relaxed">
                Welcome to RCIG Mortgages. We respect your privacy and are committed
                to protecting your personal data. This privacy policy will inform
                you as to how we look after your personal data when you visit our
                website (regardless of where you visit it from) and tell you about
                your privacy rights and how the law protects you.
              </p>
            </div>

            {/* Section 2 */}
            <div>
              <h2 className="text-2xl font-medium text-[#01193B] mb-4">
                2. Information We Collect
              </h2>
              <p className="leading-relaxed mb-4">
                We may collect, use, store and transfer different kinds of personal
                data about you which we have grouped together as follows:
              </p>
              <ul className="list-disc pl-5 space-y-3 marker:text-[#467B23]">
                <li>
                  <strong className="text-[#01193B]">Identity Data:</strong> includes
                  first name, last name, username or similar identifier, marital
                  status, title, date of birth and gender.
                </li>
                <li>
                  <strong className="text-[#01193B]">Contact Data:</strong> includes
                  billing address, delivery address, email address and telephone
                  numbers.
                </li>
                <li>
                  <strong className="text-[#01193B]">Financial Data:</strong> includes
                  bank account, income statements, credit history, and mortgage application details required to secure funding.
                </li>
                <li>
                  <strong className="text-[#01193B]">Technical Data:</strong> includes
                  internet protocol (IP) address, your login data, browser type and
                  version, time zone setting and location.
                </li>
              </ul>
            </div>

            {/* Section 3 */}
            <div>
              <h2 className="text-2xl font-medium text-[#01193B] mb-4">
                3. How We Use Your Information
              </h2>
              <p className="leading-relaxed">
                We will only use your personal data when the law allows us to. Most
                commonly, we will use your personal data in the following circumstances:
              </p>
              <ul className="list-disc pl-5 mt-4 space-y-3 marker:text-[#467B23]">
                <li>Where we need to perform the contract we are about to enter into or have entered into with you (e.g., securing a mortgage).</li>
                <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
                <li>Where we need to comply with a legal or regulatory obligation.</li>
              </ul>
            </div>

            {/* Section 4 */}
            <div>
              <h2 className="text-2xl font-medium text-[#01193B] mb-4">
                4. Data Security
              </h2>
              <p className="leading-relaxed">
                We have put in place appropriate security measures to prevent your
                personal data from being accidentally lost, used or accessed in an
                unauthorised way, altered or disclosed. In addition, we limit access
                to your personal data to those employees, agents, contractors and
                other third parties who have a business need to know. They will only
                process your personal data on our instructions and they are subject
                to a duty of confidentiality.
              </p>
            </div>

            {/* Section 5 */}
            <div>
              <h2 className="text-2xl font-medium text-[#01193B] mb-4">
                5. Third-Party Links
              </h2>
              <p className="leading-relaxed">
                This website may include links to third-party websites, plug-ins and
                applications. Clicking on those links or enabling those connections
                may allow third parties to collect or share data about you. We do
                not control these third-party websites and are not responsible for
                their privacy statements. When you leave our website, we encourage
                you to read the privacy notice of every website you visit.
              </p>
            </div>
            
            <div className="w-full h-[1px] bg-gray-200 mt-12 mb-8" />

            {/* Contact CTA inside content */}
            <div className="bg-[#0b234527] p-6 sm:p-8 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-lg font-semibold text-[#01193B] mb-1">
                  Questions about our privacy policy?
                </h3>
                <p className="text-sm text-gray-500">
                  Our compliance team is ready to help clarify how we handle your data.
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