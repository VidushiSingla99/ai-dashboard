// components/Navbar.tsx

export default function Navbar() {
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

        <div className="hidden items-center gap-8 md:flex">
          <a
            href="#"
            className="text-sm font-medium text-gray-600 transition hover:text-black"
          >
            Dashboard
          </a>

          <a
            href="#"
            className="text-sm font-medium text-gray-600 transition hover:text-black"
          >
            Analytics
          </a>

          <a
            href="#"
            className="text-sm font-medium text-gray-600 transition hover:text-black"
          >
            Projects
          </a>

          <a
            href="#"
            className="text-sm font-medium text-gray-600 transition hover:text-black"
          >
            Settings
          </a>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          <button className="rounded-xl border border-gray-300 px-4 py-2 text-sm font-medium transition hover:bg-gray-100">
            Login
          </button>

          <button className="rounded-xl bg-black px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800">
            Get Started
          </button>
        </div>
      </div>
    </nav>
  );
}