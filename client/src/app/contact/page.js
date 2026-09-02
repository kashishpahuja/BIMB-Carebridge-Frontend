"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FiMapPin,
  FiPhone,
  FiMail,
  FiArrowRight,
  FiInstagram,
  FiFacebook,
  FiLinkedin,
} from "react-icons/fi";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Form submitted:", formData);

    // Add your API / email submission here
  };

  return (
    <main className="w-full bg-[#fafcf9] text-[#01193B]">

      {/* =====================================================
          CONTACT HERO
      ===================================================== */}
<section
  className="
    relative
    min-h-[430px]
    sm:min-h-[480px]
    lg:min-h-[520px]
    flex
    items-center
    overflow-hidden
    bg-[#ebe9e5]
    bg-cover
    bg-center
    bg-no-repeat
  "
  style={{
    backgroundImage: "url('/Images/contactbg.webp')",
  }}
>
  {/* Background Overlay */}

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
      lg:py-28
    "
  >

    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="max-w-xl"
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
        Get In Touch
      </span>

      <h1
        className="
          mt-4
          text-4xl
          sm:text-5xl
          lg:text-6xl
          font-light
          tracking-tight
          leading-[1]
          text-[#01193B]
        "
      >
        Contact
          Us
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
        Whether you are buying your first home, refinancing,
        looking for private financing, or exploring commercial
        opportunities, our team is here to help.
      </p>

    </motion.div>

  </div>

</section>


      {/* =====================================================
          CONTACT INFORMATION
      ===================================================== */}
      <section className="bg-[#EBECF0] px-6 sm:px-10 lg:px-16 py-16 sm:py-20">

        <div
          className="
            max-w-5xl
            mx-auto
            grid
            grid-cols-1
            sm:grid-cols-3
            gap-10
            sm:gap-6
            text-center
          "
        >

          {/* Address */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div
              className="
                mx-auto
                w-12
                h-12
                rounded-full
                bg-[#0D2B45]/5
                flex
                items-center
                justify-center
                text-[#0D2B45]
                mb-4
              "
            >
              <FiMapPin size={19} />
            </div>

            <h3 className="text-xs uppercase tracking-[0.2em] font-semibold mb-3">
              Address
            </h3>

            <p className="text-sm text-gray-500 leading-relaxed">
              4090 Confederation Pkwy
              <br />
              Mississauga, ON
              Canada
            </p>
          </motion.div>


          {/* Phone */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div
              className="
                mx-auto
                w-12
                h-12
                rounded-full
                bg-[#0D2B45]/5
                flex
                items-center
                justify-center
                text-[#0D2B45]
                mb-4
              "
            >
              <FiPhone size={18} />
            </div>

            <h3 className="text-xs uppercase tracking-[0.2em] font-semibold mb-3">
              Phone
            </h3>

            <a
              href="tel:6475003737"
              className="text-sm text-gray-500 hover:text-[#467B23] transition-colors"
            >
              647-500-3737
            </a>
          </motion.div>


          {/* Email */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div
              className="
                mx-auto
                w-12
                h-12
                rounded-full
                bg-[#0D2B45]/5
                flex
                items-center
                justify-center
                text-[#0D2B45]
                mb-4
              "
            >
              <FiMail size={18} />
            </div>

            <h3 className="text-xs uppercase tracking-[0.2em] font-semibold mb-3">
              Email
            </h3>

            <a
              href="mailto:info@rcigmortgages.com"
              className="text-sm text-gray-500 hover:text-[#467B23] transition-colors break-all"
            >
              info@rcigmortgages.com
            </a>
          </motion.div>

        </div>

      </section>


      {/* =====================================================
          CONTACT FORM
      ===================================================== */}
  <section className="relative bg-[#EBECF0] px-5 sm:px-8 lg:px-12 py-20 sm:py-24 lg:py-28 overflow-hidden">

  {/* Background Decoration */}
  <div className="absolute top-0 right-0 w-[450px] h-[450px] rounded-full bg-[#467B23]/5 blur-3xl pointer-events-none" />
  <div className="absolute bottom-0 left-0 w-[350px] h-[350px] rounded-full bg-[#0D2B45]/5 blur-3xl pointer-events-none" />

  <div className="relative  px-5 md:px-12 lg:px-24 xl:px-40">

    <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-10 lg:gap-16 items-start">

      {/* ================= LEFT CONTENT ================= */}
      <motion.div
        initial={{ opacity: 0, x: -25 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="lg:sticky lg:top-28"
      >

        <span
          className="
            text-[10px]
            sm:text-xs
            uppercase
            tracking-[0.3em]
            text-[#467B23]
            font-semibold
          "
        >
          Get In Touch
        </span>

        <h2
          className="
            mt-4
            text-3xl
            sm:text-4xl
            lg:text-5xl
            font-light
            leading-[1.05]
            tracking-tight
            text-[#01193B]
          "
        >
          Let&apos;s Start
          <span className="block font-semibold">
            a Conversation
          </span>
        </h2>

        <div className="w-14 h-[2px] bg-[#D4AF37] mt-7 mb-7" />

        <p className="text-sm sm:text-base text-gray-500 leading-7 max-w-md">
          Tell us a little about your requirements and one of our
          mortgage professionals will get back to you to discuss
          the right solution for your needs.
        </p>


        {/* Quick Contact */}
        <div className="mt-10 space-y-5">

          <a
            href="tel:6475003737"
            className="
              group
              flex
              items-center
              gap-4
              w-fit
            "
          >

            <div
              className="
                w-11
                h-11
                rounded-xl
                bg-white
                border
                border-[#01193B]/5
                flex
                items-center
                justify-center
                text-[#0D2B45]
                group-hover:bg-[#0D2B45]
                group-hover:text-white
                transition-all
                duration-300
              "
            >
              <FiPhone size={16} />
            </div>

            <div>
              <p className="text-[9px] uppercase tracking-[0.2em] text-gray-400 mb-1">
                Call Us
              </p>

              <p className="text-sm font-medium text-[#01193B] group-hover:text-[#467B23] transition-colors">
                647-500-3737
              </p>
            </div>

          </a>


          <a
            href="mailto:info@rcigmortgages.com"
            className="
              group
              flex
              items-center
              gap-4
              w-fit
            "
          >

            <div
              className="
                w-11
                h-11
                rounded-xl
                bg-white
                border
                border-[#01193B]/5
                flex
                items-center
                justify-center
                text-[#0D2B45]
                group-hover:bg-[#0D2B45]
                group-hover:text-white
                transition-all
                duration-300
              "
            >
              <FiMail size={16} />
            </div>

            <div>
              <p className="text-[9px] uppercase tracking-[0.2em] text-gray-400 mb-1">
                Email Us
              </p>

              <p className="text-sm font-medium text-[#01193B] group-hover:text-[#467B23] transition-colors">
                info@rcigmortgages.com
              </p>
            </div>

          </a>

        </div>


        {/* Small Trust Message */}
        <div className="mt-10 pt-6 max-w-md">

          <div className="flex items-center gap-3">

            <div className="w-2 h-2 rounded-full bg-[#467B23]" />

            <p className="text-xs text-gray-500">
              Personalized guidance. Flexible solutions.
            </p>

          </div>

        </div>

      </motion.div>


      {/* ================= FORM ================= */}
      <motion.div
        initial={{ opacity: 0, x: 25 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >

        <form
          onSubmit={handleSubmit}
          className="
            relative
            bg-white/40
     
            p-6
            sm:p-8
            lg:p-10
           
            border
            border-white
          "
        >

          {/* Form Header */}
          <div className="mb-8">

            <p className="text-[10px] uppercase tracking-[0.25em] text-[#467B23] font-semibold">
              Consultation Request
            </p>

            <h3 className="mt-2 text-xl sm:text-2xl font-semibold text-[#01193B]">
              How can we help?
            </h3>

            <p className="mt-2 text-xs sm:text-sm text-gray-400">
              Fill out the form and our team will be in touch.
            </p>

          </div>


          {/* Name + Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

            <div>
              <label className="block text-[10px] uppercase tracking-[0.15em] text-gray-500 mb-2">
                Name
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
                required
                className="
                  w-full
                  rounded-xl
                  border
                  border-gray-200
                  bg-[#fafcf9]
                  px-4
                  py-3.5
                  text-sm
                  text-[#01193B]
                  placeholder:text-gray-400
                  outline-none
                  focus:border-[#467B23]
                  focus:ring-2
                  focus:ring-[#467B23]/10
                  transition-all
                "
              />
            </div>


            <div>
              <label className="block text-[10px] uppercase tracking-[0.15em] text-gray-500 mb-2">
                Email
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your email"
                required
                className="
                  w-full
                  rounded-xl
                  border
                  border-gray-200
                  bg-[#fafcf9]
                  px-4
                  py-3.5
                  text-sm
                  text-[#01193B]
                  placeholder:text-gray-400
                  outline-none
                  focus:border-[#467B23]
                  focus:ring-2
                  focus:ring-[#467B23]/10
                  transition-all
                "
              />
            </div>

          </div>


          {/* Phone + Service */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5">

            <div>
              <label className="block text-[10px] uppercase tracking-[0.15em] text-gray-500 mb-2">
                Phone
              </label>

              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone number"
                className="
                  w-full
                  rounded-xl
                  border
                  border-gray-200
                  bg-[#fafcf9]
                  px-4
                  py-3.5
                  text-sm
                  text-[#01193B]
                  placeholder:text-gray-400
                  outline-none
                  focus:border-[#467B23]
                  focus:ring-2
                  focus:ring-[#467B23]/10
                  transition-all
                "
              />
            </div>


            <div>
              <label className="block text-[10px] uppercase tracking-[0.15em] text-gray-500 mb-2">
                I&apos;m Interested In
              </label>

              <select
                name="service"
                value={formData.service}
                onChange={handleChange}
                className="
                  w-full
                  rounded-xl
                  border
                  border-gray-200
                  bg-[#fafcf9]
                  px-4
                  py-3.5
                  text-sm
                  text-[#01193B]
                  outline-none
                  focus:border-[#467B23]
                  focus:ring-2
                  focus:ring-[#467B23]/10
                  transition-all
                "
              >
                <option value="">Select a service</option>
                <option value="first-time-home-buyer">
                  First Time Home Buyer
                </option>
                <option value="mortgage">
                  Mortgage
                </option>
                <option value="refinancing">
                  Refinancing
                </option>
                <option value="home-equity">
                  Home Equity
                </option>
                <option value="private-mortgage">
                  Private Mortgage
                </option>
                <option value="commercial">
                  Commercial Mortgage
                </option>
                <option value="business-loan">
                  Business Loan
                </option>
                <option value="other">
                  Other
                </option>
              </select>
            </div>

          </div>


          {/* Message */}
          <div className="mt-5">

            <label className="block text-[10px] uppercase tracking-[0.15em] text-gray-500 mb-2">
              Message
            </label>

            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell us how we can help..."
              rows={5}
              required
              className="
                w-full
                rounded-xl
                border
                border-gray-200
                bg-[#fafcf9]
                px-4
                py-3.5
                text-sm
                text-[#01193B]
                placeholder:text-gray-400
                outline-none
                resize-none
                focus:border-[#467B23]
                focus:ring-2
                focus:ring-[#467B23]/10
                transition-all
              "
            />

          </div>


          {/* Submit */}
          <div className="mt-7 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">

            <p className="text-[10px] text-gray-400 leading-relaxed max-w-xs">
              Your information will only be used to respond to your enquiry.
            </p>

            <button
              type="submit"
              className="
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
                shrink-0
              "
            >
              Send Request

              <span
                className="
                  w-6
                  h-6
                  rounded-full
                  bg-[#D4AF37]
                  text-[#01193B]
                  flex
                  items-center
                  justify-center
                "
              >
                <FiArrowRight
                  size={12}
                  className="
                    group-hover:translate-x-0.5
                    transition-transform
                  "
                />
              </span>

            </button>

          </div>

        </form>

      </motion.div>

    </div>

  </div>

</section>


      {/* =====================================================
          MAP
      ===================================================== */}
      <section className="w-full">

        <div className="w-full h-[300px] sm:h-[380px] lg:h-[450px]">

          <iframe
            title="RCIG Mortgages Location"
            src="https://www.google.com/maps?q=Mississauga,Ontario,Canada&output=embed"
            className="w-full h-full border-0 grayscale"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          />

        </div>

      </section>

    </main>
  );
}