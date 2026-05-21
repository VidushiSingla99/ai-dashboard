"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  async function handleRegister() {
    const response = await fetch("/api/register", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });

    if (response.ok) {
      router.push("/login");
    } else {
      alert("Something went wrong");
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-6">
      
      <div className="w-full max-w-md rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">

        {/* Logo */}
        <div className="mb-8 flex items-center gap-3">
          <div className="h-10 w-10 rounded-2xl bg-black" />

          <div>
            <h1 className="text-xl font-semibold tracking-tight">
              AI Dashboard
            </h1>

            <p className="text-sm text-gray-500">
              Create your account
            </p>
          </div>
        </div>

        {/* Heading */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold tracking-tight text-black">
            Get Started
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Create your account to continue
          </p>
        </div>

        {/* Form */}
        <div className="space-y-4">

          {/* Name */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Name
            </label>

            <input
              type="text"
              placeholder="Enter your name"
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-black"
            />
          </div>

          {/* Email */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-black"
            />
          </div>

          {/* Password */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Password
            </label>

            <input
              type="password"
              placeholder="Create password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-black"
            />
          </div>

          {/* Button */}
          <button
            onClick={handleRegister}
            className="w-full rounded-xl bg-black px-4 py-3 text-sm font-medium text-white transition hover:bg-gray-800"
          >
            Create Account
          </button>
        </div>

        {/* Footer */}
        <p className="mt-6 text-center text-sm text-gray-500">
          Already have an account?{" "}
          
          <a
            href="/login"
            className="font-medium text-black hover:underline"
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
}