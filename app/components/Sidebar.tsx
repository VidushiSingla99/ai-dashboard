// components/Sidebar.tsx

import {
  LayoutDashboard,
  BarChart3,
  FolderKanban,
  MessageSquare,
  Settings,
} from "lucide-react";

const menuItems = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Analytics",
    icon: BarChart3,
  },
  {
    name: "Projects",
    icon: FolderKanban,
  },
  {
    name: "AI Chat",
    icon: MessageSquare,
  },
  {
    name: "Settings",
    icon: Settings,
  },
];

export default function Sidebar() {
  return (
    <aside className="flex h-screen w-72 flex-col border-r border-gray-200 bg-white px-5 py-6">
      

      {/* Menu */}
      <nav className="flex flex-1 flex-col gap-2">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.name}
              className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-gray-600 transition hover:bg-gray-100 hover:text-black"
            >
              <Icon size={20} />
              {item.name}
            </button>
          );
        })}
      </nav>

      {/* Bottom Card */}
      <div className="rounded-3xl bg-black p-5 text-white">
        <h2 className="mb-2 text-sm font-semibold">
          Upgrade to Pro
        </h2>

        <p className="mb-4 text-xs text-gray-300">
          Unlock advanced AI tools and analytics.
        </p>

        <button className="w-full rounded-xl bg-white px-4 py-2 text-sm font-medium text-black transition hover:bg-gray-200">
          Upgrade
        </button>
      </div>
    </aside>
  );
}