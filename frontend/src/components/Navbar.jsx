import { Search } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router";

export const Navbar = () => {
  const nav = useNavigate();

  return (
    <header className="w-full bg-white border-b">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
        <div className="flex items-center gap-4">
          <button className="md:hidden p-2" onClick={() => nav("/")}>
            Menu
          </button>
          <div className="text-lg font-semibold">SearchIt</div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 text-sm text-gray-500">
            <Search className="w-4 h-4" />
            <span className="hidden sm:inline">Ctrl+K</span>
          </div>
        </div>
      </div>
    </header>
  );
};
