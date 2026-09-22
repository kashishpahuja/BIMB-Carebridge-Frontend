"use client";

import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import {
  FaArrowLeft,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaVenusMars,
  FaFileAlt,
  FaBriefcase,
  FaCheckCircle,
  FaClock,
  FaEdit,
  FaSave,
  FaTimes,
} from "react-icons/fa";

import { JobDataContext } from "../context/JobDataContext";

export default function UserPage() {
  const {
    user,
    authLoading,
    isAuthenticated,
    updateUser,
  } = useContext(JobDataContext);

  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

const [formData, setFormData] = useState({
  fullname: "",
  phone: "",
  gender: "",
  dateOfBirth: "",
  address: "",
  image: null,
  resume: null,
});

useEffect(() => {
  if (user) {
    setFormData({
      fullname: user.fullname || "",
      phone: user.phone || "",
      gender: user.gender || "",
      dateOfBirth: user.dateOfBirth
        ? new Date(user.dateOfBirth)
            .toISOString()
            .split("T")[0]
        : "",
      address: user.address || "",
      image: null,
      resume: null,
    });
  }
}, [user]);

const handleChange = (e) => {
  const { name, value } = e.target;

  setFormData((prev) => ({
    ...prev,
    [name]: value,
  }));
};


const handleFileChange = (e) => {
  const { name, files } = e.target;

  if (!files || !files[0]) return;

  setFormData((prev) => ({
    ...prev,
    [name]: files[0],
  }));
};


  const handleEdit = () => {
    setError("");
    setSuccess("");
    setIsEditing(true);
  };

const handleCancel = () => {
  if (user) {
    setFormData({
      fullname: user.fullname || "",
      phone: user.phone || "",
      gender: user.gender || "",
      dateOfBirth: user.dateOfBirth
        ? new Date(user.dateOfBirth)
            .toISOString()
            .split("T")[0]
        : "",
      address: user.address || "",
      image: null,
      resume: null,
    });
  }

  setError("");
  setSuccess("");
  setIsEditing(false);
};

const handleSave = async () => {
  try {
    setSaving(true);
    setError("");
    setSuccess("");

    await updateUser({
      fullname: formData.fullname.trim(),
      phone: formData.phone.trim() || null,
      gender: formData.gender || null,
      dateOfBirth: formData.dateOfBirth || null,
      address: formData.address.trim() || null,
      image: formData.image,
      resume: formData.resume,
    });

    setSuccess("Profile updated successfully.");
    setIsEditing(false);
  } catch (error) {
    setError(
      error?.message ||
        error?.error ||
        "Unable to update profile."
    );
  } finally {
    setSaving(false);
  }
};

  if (authLoading) {
    return (
      <main className="min-h-screen bg-[#fafcf9] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-[#467B23]/20 border-t-[#467B23] rounded-full animate-spin" />
      </main>
    );
  }

  if (!isAuthenticated || !user) {
    return (
      <main className="min-h-screen bg-[#fafcf9] flex items-center justify-center px-5">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto rounded-full bg-[#467B23]/10 text-[#467B23] flex items-center justify-center text-2xl mb-4">
            <FaUser />
          </div>

          <h1 className="text-2xl font-semibold text-[#0b2345]">
            Login Required
          </h1>

          <p className="text-gray-500 mt-2">
            Please login to view your profile.
          </p>

          <Link
            href="/"
            className="inline-flex mt-6 bg-[#467B23] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#37651c] transition"
          >
            Go Back
          </Link>
        </div>
      </main>
    );
  }

  const initials =
    user.fullname?.trim()?.charAt(0)?.toUpperCase() || "U";

  const formatDate = (date) => {
    if (!date) return "Not provided";

    return new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <main className="min-h-screen bg-[#fafcf9] py-10 md:py-14 px-4 sm:px-6 lg:px-10">
      <div className="max-w-6xl mx-auto">

        {/* Back */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[#0b2345] hover:text-[#467B23] transition mb-6 font-medium"
        >
          <FaArrowLeft size={14} />
          Back to Home
        </Link>

        {/* Header */}
        <div className="bg-[#0b2345] rounded-2xl overflow-hidden shadow-lg">
          <div className="px-6 py-8 md:px-10 md:py-10 flex flex-col sm:flex-row items-center sm:items-center gap-5">

            {/* Avatar */}
            <div className="w-24 h-24 rounded-full bg-[#467B23] border-4 border-white/20 flex items-center justify-center text-white text-4xl font-bold uppercase shrink-0">
              {user.image ? (
                <img
                  src={user.image}
                  alt={user.fullname}
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                initials
              )}
            </div>

            {/* User info */}
            <div className="text-center sm:text-left flex-1">
              <h1 className="text-2xl md:text-3xl font-semibold text-white">
                {user.fullname}
              </h1>

              <p className="text-white/70 mt-1">
                {user.email}
              </p>

              <div className="flex flex-wrap justify-center sm:justify-start gap-2 mt-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-white text-xs">
                  <FaCheckCircle className="text-[#7dbb52]" />
                  {user.status ? "Active" : "Inactive"}
                </span>

                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-white text-xs">
                  <FaBriefcase className="text-[#7dbb52]" />
                  {user.jobappled?.length || 0} Applied
                </span>
              </div>
            </div>

            {/* Edit */}
            {!isEditing && (
              <button
                onClick={handleEdit}
                className="inline-flex items-center gap-2 bg-white text-[#0b2345] px-5 py-2.5 rounded-lg font-medium hover:bg-gray-100 transition"
              >
                <FaEdit />
                Edit Profile
              </button>
            )}
          </div>
        </div>

        {/* Messages */}
        {error && (
          <div className="mt-5 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        {success && (
          <div className="mt-5 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
            {success}
          </div>
        )}

        {/* Main content */}
        <div className="grid lg:grid-cols-3 gap-6 mt-6">

          {/* Personal Details */}
          <section className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8">

            <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-6">
              <div>
                <h2 className="text-xl font-semibold text-[#0b2345]">
                  Personal Information
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  Your personal and contact details
                </p>
              </div>

      {/* Profile Image */}
<div className="md:col-span-2">
  <FieldLabel
    icon={<FaUser />}
    label="Profile Image"
  />

  {isEditing ? (
    <div className="mt-2">
      <input
        type="file"
        name="image"
        accept="image/*"
        onChange={handleFileChange}
        className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white text-sm"
      />

      {formData.image && (
        <p className="text-sm text-[#467B23] mt-2">
          Selected: {formData.image.name}
        </p>
      )}

      <p className="text-xs text-gray-500 mt-1">
        Upload a JPG, PNG or other image file.
      </p>
    </div>
  ) : user.image ? (
    <div className="mt-2">
      <img
        src={user.image}
        alt={user.fullname}
        className="w-20 h-20 rounded-full object-cover border"
      />
    </div>
  ) : (
    <div className="mt-2 px-4 py-3 rounded-lg bg-gray-50 text-gray-500">
      No profile image added
    </div>
  )}
</div>

            </div>

            <div className="grid md:grid-cols-2 gap-5">

              {/* Full Name */}
              <ProfileField
                icon={<FaUser />}
                label="Full Name"
                name="fullname"
                value={formData.fullname}
                editing={isEditing}
                onChange={handleChange}
              />

              {/* Email */}
              <div>
                <FieldLabel icon={<FaEnvelope />} label="Email" />

                <div className="mt-2 px-4 py-3 rounded-lg bg-gray-50 text-gray-700">
                  {user.email || "Not provided"}
                </div>
              </div>

              {/* Phone */}
              <ProfileField
                icon={<FaPhone />}
                label="Phone"
                name="phone"
                value={formData.phone}
                editing={isEditing}
                onChange={handleChange}
                placeholder="Enter phone number"
              />

              {/* Gender */}
              {isEditing ? (
                <div>
                  <FieldLabel icon={<FaVenusMars />} label="Gender" />

                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-full mt-2 px-4 py-3 rounded-lg border border-gray-200 outline-none focus:border-[#467B23] bg-white"
                  >
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              ) : (
                <div>
                  <FieldLabel icon={<FaVenusMars />} label="Gender" />

                  <div className="mt-2 px-4 py-3 rounded-lg bg-gray-50 text-gray-700 capitalize">
                    {user.gender || "Not provided"}
                  </div>
                </div>
              )}

              {/* Date of Birth */}
              <ProfileField
                icon={<FaCalendarAlt />}
                label="Date of Birth"
                name="dateOfBirth"
                type="date"
                value={formData.dateOfBirth}
                editing={isEditing}
                onChange={handleChange}
              />

              {/* Address */}
              <div className="md:col-span-2">
                <FieldLabel
                  icon={<FaMapMarkerAlt />}
                  label="Address"
                />

                {isEditing ? (
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Enter your address"
                    className="w-full mt-2 px-4 py-3 rounded-lg border border-gray-200 outline-none focus:border-[#467B23] resize-none"
                  />
                ) : (
                  <div className="mt-2 px-4 py-3 rounded-lg bg-gray-50 text-gray-700 min-h-[48px]">
                    {user.address || "Not provided"}
                  </div>
                )}
              </div>

              {/* Image URL */}
              {isEditing && (
                <div className="md:col-span-2">
                  <FieldLabel
                    icon={<FaUser />}
                    label="Profile Image URL"
                  />

                  <input
                    type="text"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    placeholder="Enter profile image URL"
                    className="w-full mt-2 px-4 py-3 rounded-lg border border-gray-200 outline-none focus:border-[#467B23]"
                  />
                </div>
              )}

              
           {/* Resume */}
<div className="md:col-span-2">
  <FieldLabel
    icon={<FaFileAlt />}
    label="Resume"
  />

  {isEditing ? (
    <div className="mt-2">
      <input
        type="file"
        name="resume"
        accept=".pdf,application/pdf"
        onChange={handleFileChange}
        className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white text-sm"
      />

      {formData.resume && (
        <div className="mt-2 text-sm text-[#467B23]">
          Selected: {formData.resume.name}
        </div>
      )}

      <p className="text-xs text-gray-500 mt-1">
        Upload your resume in PDF format only.
      </p>
    </div>
  ) : user.resume ? (
    <a
      href={user.resume}
      target="_blank"
      rel="noopener noreferrer"
      className="mt-2 inline-flex items-center gap-2 bg-[#467B23] text-white px-4 py-2.5 rounded-lg font-medium hover:bg-[#37651c] transition"
    >
      <FaFileAlt />
      View Resume
    </a>
  ) : (
    <div className="mt-2 px-4 py-3 rounded-lg bg-gray-50 text-gray-500">
      No resume uploaded
    </div>
  )}
</div>
            </div>
          </section>

          {/* Account Information */}
          <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8 h-fit">

            <h2 className="text-xl font-semibold text-[#0b2345]">
              Account Information
            </h2>

            <p className="text-sm text-gray-500 mt-1 mb-6">
              Account activity and application information
            </p>

            <div className="space-y-4">

              <InfoRow
                icon={<FaCheckCircle />}
                label="Account Status"
                value={user.status ? "Active" : "Inactive"}
              />

              <InfoRow
                icon={<FaBriefcase />}
                label="Jobs Applied"
                value={user.jobappled?.length || 0}
              />

              <InfoRow
                icon={<FaClock />}
                label="Last Login"
                value={formatDate(user.lastLoginAt)}
              />

              <InfoRow
                icon={<FaCalendarAlt />}
                label="Account Created"
                value={formatDate(user.createdAt)}
              />

              <InfoRow
                icon={<FaCalendarAlt />}
                label="Last Updated"
                value={formatDate(user.updatedAt)}
              />
            </div>

            {/* Applied job IDs */}
            {user.jobappled?.length > 0 && (
              <div className="mt-7 pt-6 border-t border-gray-100">
                <h3 className="font-semibold text-[#0b2345] mb-3">
                  Applied Jobs
                </h3>

                <div className="space-y-2">
                  {user.jobappled.map((jobId, index) => (
                    <div
                      key={jobId?._id || jobId || index}
                      className="text-xs bg-gray-50 rounded-lg px-3 py-2 text-gray-600 break-all"
                    >
                      {jobId?._id || jobId}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}

/* =========================
   REUSABLE COMPONENTS
========================= */

function FieldLabel({ icon, label }) {
  return (
    <label className="flex items-center gap-2 text-sm font-medium text-[#0b2345]">
      <span className="text-[#467B23]">{icon}</span>
      {label}
    </label>
  );
}

function ProfileField({
  icon,
  label,
  name,
  value,
  editing,
  onChange,
  type = "text",
  placeholder = "",
}) {
  return (
    <div>
      <FieldLabel icon={icon} label={label} />

      {editing ? (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full mt-2 px-4 py-3 rounded-lg border border-gray-200 outline-none focus:border-[#467B23] transition"
        />
      ) : (
        <div className="mt-2 px-4 py-3 rounded-lg bg-gray-50 text-gray-700">
          {value || "Not provided"}
        </div>
      )}
    </div>
  );
}

function InfoRow({ icon, label, value }) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-9 h-9 rounded-lg bg-[#467B23]/10 text-[#467B23] flex items-center justify-center shrink-0">
        {icon}
      </div>

      <div className="min-w-0">
        <p className="text-xs text-gray-500">
          {label}
        </p>

        <p className="text-sm font-medium text-[#0b2345] mt-0.5 break-words">
          {value}
        </p>
      </div>
    </div>
  );
}