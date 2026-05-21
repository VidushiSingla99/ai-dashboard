"use client";

import Link from "next/link";

import { usePathname } from "next/navigation";

import { useSession, signOut } from "next-auth/react";

import {
  LayoutDashboard,
  BarChart3,
  FolderKanban,
  MessageSquare,
  Settings,
  Database,
} from "lucide-react";

const menuItems = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Data Viz",
    href: "/dashboard/data-viz",
    icon: Database,
  },
  {
    name: "Reports",
    href: "/dashboard/reports",
    icon: FolderKanban,
  },
  {
    name: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
  {
  name: "Datasets",
  href: "/dashboard/datasets",
  icon: Database,
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <aside className="flex h-screen w-72 flex-col border-r border-gray-200 bg-white px-5 py-6">

      {/* Logo */}
      <div className="mb-10 flex items-center gap-3 px-2">
        <div className="h-10 w-10 rounded-2xl bg-black" />

        <div>
          <h1 className="text-lg font-semibold tracking-tight">
            AI Dashboard
          </h1>

          <p className="text-xs text-gray-500">
            Data Platform
          </p>
        </div>
      </div>

      {/* Menu */}
      <nav className="flex flex-1 flex-col gap-2">
        {menuItems.map((item) => {
          const Icon = item.icon;

          const isActive = pathname.startsWith(item.href);

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition
              
              ${
                isActive
                  ? "bg-black text-white"
                  : "text-gray-600 hover:bg-gray-100 hover:text-black"
              }`}
            >
              <Icon size={20} />

              {item.name}
            </Link>
          );
        })}
      </nav>

        {session?.user && (
        <div className="rounded-3xl bg-black p-5 text-white">
            <p className="text-sm font-semibold">
            {session.user.name}
            </p>

            <p className="text-xs text-gray-300 mb-4">
            {session.user.email}
            </p>

            <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="w-full rounded-xl bg-white px-4 py-2 text-sm font-medium text-black"
            >
            Sign out
            </button>
        </div>
        )}
    </aside>
  );
}