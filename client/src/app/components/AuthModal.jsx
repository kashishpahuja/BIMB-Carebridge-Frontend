"use client";

import { useContext, useEffect, useState } from "react";
import {
  FiX,
  FiMail,
  FiLock,
  FiUser,
  FiArrowRight,
  FiCheckCircle,
} from "react-icons/fi";
import { JobDataContext } from "../context/JobDataContext";

export default function AuthModal({
  isOpen,
  onClose,
  initialTab = "login",
}) {
  const {
    login,
    signup,
    verifySignup,
  } = useContext(JobDataContext);

  const [activeTab, setActiveTab] =
    useState(initialTab);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const [otp, setOtp] = useState("");

  const [showOtp, setShowOtp] = useState(false);

  const [isSubmitted, setIsSubmitted] =
    useState(false);

  const [error, setError] = useState("");

  const [successMessage, setSuccessMessage] =
    useState("");

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  /* =========================
     BODY SCROLL
  ========================= */

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  /* =========================
     RESET
  ========================= */

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setName("");
    setOtp("");
    setShowOtp(false);
    setIsSubmitted(false);
    setError("");
    setSuccessMessage("");
  };

  const switchTab = (tab) => {
    setActiveTab(tab);
    setShowOtp(false);
    setError("");
    setSuccessMessage("");
  };

  /* =========================
     LOGIN
  ========================= */

const handleLogin = async () => {
  try {
    setError("");
    setSuccessMessage("");
    setIsSubmitted(true);

    await login({
      email: email.trim(),
      password,
    });

    setSuccessMessage("Logged in successfully.");

    setTimeout(() => {
      resetForm();
      onClose();
    }, 700);
  } catch (error) {
    setError(
      error?.message ||
        error?.error ||
        "Invalid email or password."
    );
  } finally {
    setIsSubmitted(false);
  }
};

  /* =========================
     SIGNUP
  ========================= */

  const handleSignup = async () => {
    try {
      setError("");
      setSuccessMessage("");
      setIsSubmitted(true);

      /*
       * IMPORTANT:
       *
       * Your backend signup API accepts only:
       * fullname, email, password
       *
       * Phone is therefore NOT sent here.
       */

      await signup({
        fullname: name.trim(),
        email: email.trim(),
        password,
      });

      setShowOtp(true);

      setSuccessMessage(
        "OTP sent. Please verify your email."
      );
    } catch (error) {
      setError(
        error?.message ||
          error?.error ||
          "Unable to create account."
      );
    } finally {
      setIsSubmitted(false);
    }
  };

  /* =========================
     VERIFY OTP
  ========================= */

  const handleVerify = async () => {
    try {
      setError("");
      setSuccessMessage("");
      setIsSubmitted(true);

      await verifySignup({
        fullname: name.trim(),
        email: email.trim(),
        password,
        otp: otp.trim(),
      });

      setSuccessMessage(
        "Account verified successfully."
      );

      setTimeout(() => {
        resetForm();
        onClose();
      }, 800);
    } catch (error) {
      setError(
        error?.message ||
          error?.error ||
          "Invalid OTP. Please try again."
      );
    } finally {
      setIsSubmitted(false);
    }
  };

  /* =========================
     SUBMIT
  ========================= */

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitted) return;

    if (activeTab === "login") {
      await handleLogin();
      return;
    }

    if (showOtp) {
      await handleVerify();
      return;
    }

    await handleSignup();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">

      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#01193B]/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white w-full max-w-md rounded-3xl shadow-2xl border border-[#01193B]/10 overflow-hidden z-10">

        {/* Close */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 bg-[#F8FAFC] hover:bg-gray-100 text-[#01193B] rounded-full flex items-center justify-center transition-colors z-20"
        >
          <FiX size={18} />
        </button>

        {/* Header */}
        <div className="pt-8 px-6 sm:px-8 pb-4 text-center">

          <h3 className="text-2xl font-semibold text-[#01193B] tracking-tight">
            {showOtp
              ? "Verify Your Account"
              : activeTab === "login"
              ? "Welcome Back"
              : "Create an Account"}
          </h3>

          <p className="text-xs sm:text-sm text-[#01193B]/60 mt-1">
            {showOtp
              ? "Enter the OTP sent to your email address"
              : activeTab === "login"
              ? "Enter your credentials to access your portal"
              : "Join BIMB Carebridge to apply for jobs and manage profiles"}
          </p>

        </div>

        {/* Tabs */}
        {!showOtp && (
          <div className="px-6 sm:px-8 mb-6">
            <div className="flex bg-[#F8FAFC] p-1.5 rounded-2xl border border-[#01193B]/10">

              <button
                type="button"
                onClick={() => switchTab("login")}
                className={`flex-1 py-2.5 text-xs sm:text-sm font-semibold uppercase tracking-wider rounded-xl transition-all ${
                  activeTab === "login"
                    ? "bg-[#01193B] text-white shadow-sm"
                    : "text-[#01193B]/60 hover:text-[#01193B]"
                }`}
              >
                Log In
              </button>

              <button
                type="button"
                onClick={() => switchTab("signup")}
                className={`flex-1 py-2.5 text-xs sm:text-sm font-semibold uppercase tracking-wider rounded-xl transition-all ${
                  activeTab === "signup"
                    ? "bg-[#467B23] text-white shadow-sm"
                    : "text-[#01193B]/60 hover:text-[#01193B]"
                }`}
              >
                Sign Up
              </button>

            </div>
          </div>
        )}

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="px-6 sm:px-8 pb-8 space-y-4"
        >

          {/* =========================
              SIGNUP NAME
          ========================= */}

          {activeTab === "signup" &&
            !showOtp && (
              <div>
                <label className="text-[11px] font-bold text-[#01193B]/50 uppercase tracking-wider mb-2 block">
                  Full Name
                </label>

                <div className="flex items-center bg-[#F8FAFC] px-4 py-3.5 rounded-2xl border border-[#01193B]/10 focus-within:border-[#467B23]">

                  <FiUser
                    size={18}
                    className="text-[#01193B]/40 shrink-0 mr-3"
                  />

                  <input
                    type="text"
                    required
                    placeholder="Kashish Pahuja"
                    className="bg-transparent border-none outline-none w-full text-sm text-[#01193B]"
                    value={name}
                    onChange={(e) =>
                      setName(e.target.value)
                    }
                  />

                </div>
              </div>
            )}

          {/* =========================
              EMAIL
          ========================= */}

          {!showOtp && (
            <div>
              <label className="text-[11px] font-bold text-[#01193B]/50 uppercase tracking-wider mb-2 block">
                Email Address
              </label>

              <div className="flex items-center bg-[#F8FAFC] px-4 py-3.5 rounded-2xl border border-[#01193B]/10 focus-within:border-[#467B23]">

                <FiMail
                  size={18}
                  className="text-[#01193B]/40 shrink-0 mr-3"
                />

                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  className="bg-transparent border-none outline-none w-full text-sm text-[#01193B]"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                />

              </div>
            </div>
          )}

          {/* =========================
              PASSWORD
          ========================= */}

          {!showOtp && (
            <div>
              <label className="text-[11px] font-bold text-[#01193B]/50 uppercase tracking-wider mb-2 block">
                Password
              </label>

              <div className="flex items-center bg-[#F8FAFC] px-4 py-3.5 rounded-2xl border border-[#01193B]/10 focus-within:border-[#467B23]">

                <FiLock
                  size={18}
                  className="text-[#01193B]/40 shrink-0 mr-3"
                />

                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  className="bg-transparent border-none outline-none w-full text-sm text-[#01193B]"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                />

              </div>
            </div>
          )}

          {/* =========================
              OTP
          ========================= */}

          {showOtp && (
            <div>
              <label className="text-[11px] font-bold text-[#01193B]/50 uppercase tracking-wider mb-2 block">
                Verification OTP
              </label>

              <div className="flex items-center bg-[#F8FAFC] px-4 py-3.5 rounded-2xl border border-[#01193B]/10 focus-within:border-[#467B23]">

                <FiCheckCircle
                  size={18}
                  className="text-[#467B23] shrink-0 mr-3"
                />

                <input
                  type="text"
                  required
                  maxLength={6}
                  inputMode="numeric"
                  placeholder="Enter OTP"
                  className="bg-transparent border-none outline-none w-full text-sm text-[#01193B] tracking-[0.3em]"
                  value={otp}
                  onChange={(e) =>
                    setOtp(
                      e.target.value.replace(
                        /\D/g,
                        ""
                      )
                    )
                  }
                />

              </div>

              <p className="text-xs text-gray-500 mt-2">
                Verification code sent to{" "}
                <span className="font-medium text-[#01193B]">
                  {email}
                </span>
              </p>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="rounded-xl bg-red-50 border border-red-100 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          {/* Success */}
          {successMessage && (
            <div className="rounded-xl bg-green-50 border border-green-100 px-4 py-3 text-sm text-[#467B23]">
              {successMessage}
            </div>
          )}

          {/* Forgot */}
          {activeTab === "login" &&
            !showOtp && (
              <div className="flex justify-end">
                <a
                  href="#forgot"
                  className="text-xs text-[#467B23] hover:underline font-medium"
                >
                  Forgot password?
                </a>
              </div>
            )}

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitted}
            className={`w-full py-4 rounded-2xl text-xs font-semibold uppercase tracking-wider text-white transition-all shadow-md flex items-center justify-center gap-2 mt-2 ${
              activeTab === "login"
                ? "bg-[#01193B] hover:bg-[#022454]"
                : "bg-[#467B23] hover:bg-[#3b681d]"
            } ${
              isSubmitted
                ? "opacity-70 cursor-not-allowed"
                : ""
            }`}
          >
            {isSubmitted
              ? "Processing..."
              : showOtp
              ? "Verify Account"
              : activeTab === "login"
              ? "Log In To Account"
              : "Create Account"}

            {!isSubmitted && (
              <FiArrowRight size={16} />
            )}
          </button>

          {/* Switch */}
          {!showOtp && (
            <div className="text-center pt-2">
              <p className="text-xs text-[#01193B]/60">
                {activeTab === "login"
                  ? "Don't have an account? "
                  : "Already have an account? "}

                <button
                  type="button"
                  onClick={() =>
                    switchTab(
                      activeTab === "login"
                        ? "signup"
                        : "login"
                    )
                  }
                  className="font-semibold text-[#467B23] hover:underline ml-1"
                >
                  {activeTab === "login"
                    ? "Sign Up"
                    : "Log In"}
                </button>
              </p>
            </div>
          )}

        </form>
      </div>
    </div>
  );
}


// 'use client';

// import { useState, useEffect } from 'react';
// import { X, Mail, Lock, User, Phone, ArrowRight } from 'lucide-react';
// import gsap from 'gsap';

// export default function AuthModal({ isOpen, onClose, initialTab = 'login' }) {
//   const [activeTab, setActiveTab] = useState(initialTab);
  
//   // Form states
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [name, setName] = useState('');
//   const [phone, setPhone] = useState('');
//   const [isSubmitted, setIsSubmitted] = useState(false);

//   useEffect(() => {
//     setActiveTab(initialTab);
//   }, [initialTab]);

//   // Prevent background scrolling when modal is open
//   useEffect(() => {
//     if (isOpen) {
//       document.body.style.overflow = 'hidden';
//     } else {
//       document.body.style.overflow = 'unset';
//     }
//     return () => {
//       document.body.style.overflow = 'unset';
//     };
//   }, [isOpen]);

//   if (!isOpen) return null;

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setIsSubmitted(true);
//     setTimeout(() => {
//       alert(activeTab === 'login' ? 'Successfully Logged In!' : 'Account Created Successfully!');
//       setIsSubmitted(false);
//       onClose();
//     }, 600);
//   };

//   return (
//     <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      
//       {/* Backdrop overlay */}
//       <div 
//         className="fixed inset-0 bg-[#01193B]/60 backdrop-blur-sm transition-opacity"
//         onClick={onClose}
//       />

//       {/* Modal Card */}
//       <div className="relative bg-white w-full max-w-md rounded-3xl shadow-2xl border border-[#01193B]/10 overflow-hidden z-10 animate-fadeUp">
        
//         {/* Close Button */}
//         <button
//           onClick={onClose}
//           className="absolute top-5 right-5 w-9 h-9 bg-[#F8FAFC] hover:bg-gray-100 text-[#01193B] rounded-full flex items-center justify-center transition-colors z-20"
//         >
//           <X size={18} />
//         </button>

//         {/* Modal Header */}
//         <div className="pt-8 px-6 sm:px-8 pb-4 text-center">
//           <h3 className="text-2xl font-semibold text-[#01193B] tracking-tight">
//             {activeTab === 'login' ? 'Welcome Back' : 'Create an Account'}
//           </h3>
//           <p className="text-xs sm:text-sm text-[#01193B]/60 mt-1">
//             {activeTab === 'login' 
//               ? 'Enter your credentials to access your portal' 
//               : 'Join BIMB Carebridge to apply for jobs and manage profiles'}
//           </p>
//         </div>

//         {/* Tabs Switcher */}
//         <div className="px-6 sm:px-8 mb-6">
//           <div className="flex bg-[#F8FAFC] p-1.5 rounded-2xl border border-[#01193B]/10">
//             <button
//               onClick={() => setActiveTab('login')}
//               className={`flex-1 py-2.5 text-xs sm:text-sm font-semibold uppercase tracking-wider rounded-xl transition-all ${
//                 activeTab === 'login'
//                   ? 'bg-[#01193B] text-white shadow-sm'
//                   : 'text-[#01193B]/60 hover:text-[#01193B]'
//               }`}
//             >
//               Log In
//             </button>
//             <button
//               onClick={() => setActiveTab('signup')}
//               className={`flex-1 py-2.5 text-xs sm:text-sm font-semibold uppercase tracking-wider rounded-xl transition-all ${
//                 activeTab === 'signup'
//                   ? 'bg-[#467B23] text-white shadow-sm'
//                   : 'text-[#01193B]/60 hover:text-[#01193B]'
//               }`}
//             >
//               Sign Up
//             </button>
//           </div>
//         </div>

//         {/* Form Fields */}
//         <form onSubmit={handleSubmit} className="px-6 sm:px-8 pb-8 space-y-4">
          
//           {activeTab === 'signup' && (
//             <div>
//               <label className="text-[11px] font-bold text-[#01193B]/50 uppercase tracking-wider mb-2 block">Full Name</label>
//               <div className="flex items-center bg-[#F8FAFC] px-4 py-3.5 rounded-2xl border border-[#01193B]/10 focus-within:border-[#467B23] transition-all">
//                 <User size={18} className="text-[#01193B]/40 shrink-0 mr-3" />
//                 <input
//                   type="text"
//                   required
//                   placeholder="Kashish Pahuja"
//                   className="bg-transparent border-none outline-none w-full text-sm text-[#01193B] placeholder:text-[#01193B]/40"
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                 />
//               </div>
//             </div>
//           )}

//           <div>
//             <label className="text-[11px] font-bold text-[#01193B]/50 uppercase tracking-wider mb-2 block">Email Address</label>
//             <div className="flex items-center bg-[#F8FAFC] px-4 py-3.5 rounded-2xl border border-[#01193B]/10 focus-within:border-[#467B23] transition-all">
//               <Mail size={18} className="text-[#01193B]/40 shrink-0 mr-3" />
//               <input
//                 type="email"
//                 required
//                 placeholder="name@example.com"
//                 className="bg-transparent border-none outline-none w-full text-sm text-[#01193B] placeholder:text-[#01193B]/40"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//             </div>
//           </div>

//           {activeTab === 'signup' && (
//             <div>
//               <label className="text-[11px] font-bold text-[#01193B]/50 uppercase tracking-wider mb-2 block">Phone Number</label>
//               <div className="flex items-center bg-[#F8FAFC] px-4 py-3.5 rounded-2xl border border-[#01193B]/10 focus-within:border-[#467B23] transition-all">
//                 <Phone size={18} className="text-[#01193B]/40 shrink-0 mr-3" />
//                 <input
//                   type="tel"
//                   required
//                   placeholder="647-500-3737"
//                   className="bg-transparent border-none outline-none w-full text-sm text-[#01193B] placeholder:text-[#01193B]/40"
//                   value={phone}
//                   onChange={(e) => setPhone(e.target.value)}
//                 />
//               </div>
//             </div>
//           )}

//           <div>
//             <label className="text-[11px] font-bold text-[#01193B]/50 uppercase tracking-wider mb-2 block">Password</label>
//             <div className="flex items-center bg-[#F8FAFC] px-4 py-3.5 rounded-2xl border border-[#01193B]/10 focus-within:border-[#467B23] transition-all">
//               <Lock size={18} className="text-[#01193B]/40 shrink-0 mr-3" />
//               <input
//                 type="password"
//                 required
//                 placeholder="••••••••"
//                 className="bg-transparent border-none outline-none w-full text-sm text-[#01193B] placeholder:text-[#01193B]/40"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//             </div>
//           </div>

//           {activeTab === 'login' && (
//             <div className="flex justify-end">
//               <a href="#forgot" className="text-xs text-[#467B23] hover:underline font-medium">
//                 Forgot password?
//               </a>
//             </div>
//           )}

//           <button
//             type="submit"
//             disabled={isSubmitted}
//             className={`w-full py-4 rounded-2xl text-xs font-semibold uppercase tracking-wider text-white transition-all shadow-md flex items-center justify-center gap-2 mt-2 ${
//               activeTab === 'login' ? 'bg-[#01193B] hover:bg-[#022454]' : 'bg-[#467B23] hover:bg-[#3b681d]'
//             }`}
//           >
//             {isSubmitted ? 'Processing...' : (activeTab === 'login' ? 'Log In To Account' : 'Create Account')}
//             {!isSubmitted && <ArrowRight size={16} />}
//           </button>

//           <div className="text-center pt-2">
//             <p className="text-xs text-[#01193B]/60">
//               {activeTab === 'login' ? "Don't have an account? " : "Already have an account? "}
//               <button
//                 type="button"
//                 onClick={() => setActiveTab(activeTab === 'login' ? 'signup' : 'login')}
//                 className="font-semibold text-[#467B23] hover:underline ml-1"
//               >
//                 {activeTab === 'login' ? 'Sign Up' : 'Log In'}
//               </button>
//             </p>
//           </div>

//         </form>

//       </div>
//     </div>
//   );
// }