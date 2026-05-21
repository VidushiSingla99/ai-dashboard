"use client";

import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Navbar() {
  const { data: session, status } = useSession();

  return (
    <nav className="w-full border-b border-gray-200 bg-white px-6 py-4 shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between">

        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-xl bg-black" />
          <h1 className="text-lg font-semibold tracking-tight">
            AI Dashboard
          </h1>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">

          {/* If loading */}
          {status === "loading" && (
            <div className="text-sm text-gray-500">
              Loading...
            </div>
          )}

          {/* If logged out */}
          {!session && status !== "loading" && (
            <>
             <Link href="/login">
  Login
</Link>

             <Link href="/register">Get Started</Link>
            </>
          )}

          {/* If logged in */}
          {session?.user && (
            <div className="flex items-center gap-3">

              {/* User info */}
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">
                  {session.user.name || "User"}
                </p>
                <p className="text-xs text-gray-500">
                  {session.user.email}
                </p>
              </div>

              {/* Avatar */}
              <div className="h-9 w-9 rounded-full bg-black text-white flex items-center justify-center text-sm">
                {session.user.name?.charAt(0) || "U"}
              </div>

              {/* Logout */}
              <button
                onClick={() =>
                  signOut({ callbackUrl: "/login" })
                }
                className="rounded-xl border border-gray-300 px-4 py-2 text-sm hover:bg-gray-100"
              >
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}