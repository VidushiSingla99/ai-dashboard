"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin() {
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
      callbackUrl: "/dashboard",
    });

    if (result?.ok) {
      router.push("/dashboard");
    } else {
      alert("Invalid credentials");
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-6">
      
      {/* Card */}
      <div className="w-full max-w-md rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">

        {/* Logo */}
        <div className="mb-8 flex items-center gap-3">
          <div className="h-10 w-10 rounded-2xl bg-black" />

          <div>
            <h1 className="text-xl font-semibold tracking-tight">
              AI Dashboard
            </h1>

            <p className="text-sm text-gray-500">
              Welcome back
            </p>
          </div>
        </div>

        {/* Heading */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold tracking-tight text-black">
            Login to your account
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Enter your credentials to continue
          </p>
        </div>

        {/* Form */}
        <div className="space-y-4">

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
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-black"
            />
          </div>

          {/* Button */}
          <button
            onClick={handleLogin}
            className="w-full rounded-xl bg-black px-4 py-3 text-sm font-medium text-white transition hover:bg-gray-800"
          >
            Login
          </button>
        </div>

      </div>
    </div>
  );
}