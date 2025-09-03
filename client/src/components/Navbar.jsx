import { useState } from "react";
import { FiSearch } from "react-icons/fi";

export default function Navbar() {
  const [search, setSearch] = useState("");

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        
        {/* Left - Links */}
        <ul className="hidden md:flex space-x-8 font-medium text-gray-800">
          <li>
            <a href="/" className="hover:text-blue-600">Home</a>
          </li>
          <li>
            <a href="/package" className="hover:text-blue-600">Package</a>
          </li>
          <li>
            <a href="/blog" className="hover:text-blue-600">Blog</a>
          </li>
          <li>
            <a href="/about" className="hover:text-blue-600">About</a>
          </li>
          <li>
            <a href="/contact" className="hover:text-blue-600">Contact Us</a>
          </li>
        </ul>

        {/* Right - Search */}
        <div className="flex items-center">
          <div className="flex items-center border rounded-full px-3 py-2 shadow-sm">
            <FiSearch className="text-gray-500 mr-2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Destination, attraction"
              className="outline-none text-sm w-40 md:w-64"
            />
            <span className="ml-3 text-xs text-gray-400">ctrl+K</span>
          </div>
        </div>
      </div>
    </nav>
  );
}
