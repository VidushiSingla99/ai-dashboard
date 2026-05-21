"use client";

import { useEffect, useState } from "react";

export default function SettingsPage() {
  const [isEditing, setIsEditing] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    jobTitle: "",
    company: "",
    bio: "",
  });

  async function fetchUser() {
    const res = await fetch("/api/user/me");
    const data = await res.json();

    setForm({
      name: data.name || "",
      email: data.email || "",
      jobTitle: data.jobTitle || "",
      company: data.company || "",
      bio: data.bio || "",
    });
  }

  useEffect(() => {
    fetchUser();
  }, []);

  function handleChange(e: any) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSave() {
    await fetch("/api/user/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setIsEditing(false);
    fetchUser();
  }

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold">Settings</h1>
          <p className="text-sm text-gray-500 mt-2">
            Manage your profile
          </p>
        </div>

        <button
          onClick={() => setIsEditing(!isEditing)}
          className="rounded-xl border px-4 py-2 text-sm hover:bg-gray-100"
        >
          {isEditing ? "Cancel" : "Edit Profile"}
        </button>
      </div>

      {/* PROFILE VIEW */}
      {!isEditing && (
        <div className="rounded-3xl border bg-white p-6 space-y-3">
          <p><strong>Name:</strong> {form.name}</p>
          <p><strong>Email:</strong> {form.email}</p>
          <p><strong>Job Title:</strong> {form.jobTitle}</p>
          <p><strong>Company:</strong> {form.company}</p>
          <p><strong>Bio:</strong> {form.bio}</p>
        </div>
      )}

      {/* EDIT MODE */}
      {isEditing && (
        <div className="rounded-3xl border bg-white p-6 space-y-4">

          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border p-3 rounded-xl"
            placeholder="Name"
          />

          <input
            name="jobTitle"
            value={form.jobTitle}
            onChange={handleChange}
            className="w-full border p-3 rounded-xl"
            placeholder="Job Title"
          />

          <input
            name="company"
            value={form.company}
            onChange={handleChange}
            className="w-full border p-3 rounded-xl"
            placeholder="Company"
          />

          <textarea
            name="bio"
            value={form.bio}
            onChange={handleChange}
            className="w-full border p-3 rounded-xl"
            placeholder="Bio"
          />

          <button
            onClick={handleSave}
            className="rounded-xl bg-black px-4 py-2 text-white"
          >
            Save Changes
          </button>
        </div>
      )}
    </div>
  );
}