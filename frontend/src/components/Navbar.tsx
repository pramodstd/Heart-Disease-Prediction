"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Heart, Menu, X, ArrowRight } from "lucide-react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Predictor", href: "/predictor" },
    { name: "About", href: "/about" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center text-red-600 group-hover:bg-red-600 group-hover:text-white transition-all duration-200 shadow-xs">
              <Heart className="w-6 h-6 fill-current" />
            </div>
            <span className="font-extrabold text-2xl text-gray-900 tracking-tight">
              Heart <span className="text-red-600">Wise</span>
            </span>
          </Link>

          {/* Desktop Navigation Links with Active Tab Underline */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => {
              const isActive = pathname === item.href || (item.href === "/" && pathname === "");
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`py-2 text-base sm:text-lg font-bold transition-all duration-200 border-b-2 ${
                    isActive
                      ? "text-red-600 border-red-600"
                      : "text-gray-700 border-transparent hover:text-red-600 hover:border-gray-300"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center">
            <Link
              href="/predictor"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-base font-bold text-white bg-red-600 hover:bg-red-700 shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5"
            >
              <span>Check Your Risk</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-hidden"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? (
                <X className="w-7 h-7" />
              ) : (
                <Menu className="w-7 h-7" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 px-4 pt-3 pb-6 space-y-2 shadow-xl">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href === "/" && pathname === "");
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-2 py-2 text-lg font-bold transition-all ${
                  isActive
                    ? "text-red-600 underline decoration-red-600 decoration-2 underline-offset-4"
                    : "text-gray-700 hover:text-red-600"
                }`}
              >
                {item.name}
              </Link>
            );
          })}
          <div className="pt-3">
            <Link
              href="/predictor"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-lg font-bold text-white bg-red-600 hover:bg-red-700 shadow-md"
            >
              <span>Check Your Risk</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
