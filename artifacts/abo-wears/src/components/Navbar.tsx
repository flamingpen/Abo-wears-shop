import { useState, useRef } from "react";
import { Link, useLocation } from "wouter";
import { ShoppingCart, Menu, X, ChevronDown } from "lucide-react";
import { useCart } from "@/context/CartContext";

const JERSEY_SUB = [
  { label: "Club Jerseys",        emoji: "🏆", href: "/jerseys/club-jerseys" },
  { label: "Retro Jerseys",       emoji: "⚽", href: "/jerseys/retro-jerseys" },
  { label: "Country Jerseys",     emoji: "🌍", href: "/jerseys/country-jerseys" },
  { label: "Basketball Jerseys",  emoji: "🏀", href: "/jerseys/basketball-jerseys" },
  { label: "NFL Jerseys",         emoji: "🏈", href: "/jerseys/nfl-jerseys" },
  { label: "Baseball Jerseys",    emoji: "⚾", href: "/jerseys/baseball-jerseys" },
];

const SIDE_LINKS = [
  { label: "Joggers",   href: "/joggers" },
  { label: "Shorts",    href: "/shorts" },
  { label: "Face Caps", href: "/face-caps" },
  { label: "GYM Wears", href: "/gym-wears" },
  { label: "About",     href: "/about" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [jerseyExpanded, setJerseyExpanded] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [location] = useLocation();
  const { itemCount } = useCart();

  const isJerseysActive = location === "/jerseys" || location.startsWith("/jerseys");

  function openDropdown() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setDropdownOpen(true);
  }

  function scheduleClose() {
    closeTimer.current = setTimeout(() => setDropdownOpen(false), 120);
  }

  return (
    <nav className="sticky top-0 z-50 bg-[#0a0a0a] text-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <img src="/logo.jpg" alt="ABO Wears" className="h-14 w-14 rounded-full object-cover" />
          <span className="ml-2 font-display text-2xl tracking-widest text-white">ABO</span>
          <span className="font-display text-2xl tracking-widest text-[#22c55e]">WEARS</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-5">
          <Link
            href="/"
            className={`font-barlow font-600 text-sm tracking-wide uppercase transition-colors hover:text-[#22c55e] ${location === "/" ? "text-[#22c55e]" : "text-gray-300"}`}
            data-testid="nav-link-home"
          >
            Home
          </Link>

          {/* Jerseys dropdown */}
          <div
            className="relative"
            onMouseEnter={openDropdown}
            onMouseLeave={scheduleClose}
          >
            <Link
              href="/jerseys"
              className={`flex items-center gap-1 font-barlow font-600 text-sm tracking-wide uppercase transition-colors hover:text-[#22c55e] ${isJerseysActive ? "text-[#22c55e]" : "text-gray-300"}`}
              data-testid="nav-link-jerseys"
            >
              Jerseys
              <ChevronDown
                size={13}
                className={`transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
              />
            </Link>

            {dropdownOpen && (
              <div
                className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-52 bg-[#111111] border border-gray-700 rounded-xl shadow-2xl overflow-hidden z-50"
                onMouseEnter={openDropdown}
                onMouseLeave={scheduleClose}
              >
                <div className="py-1">
                  {JERSEY_SUB.map((sub) => (
                    <Link
                      key={sub.href}
                      href={sub.href}
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-300 hover:bg-[#22c55e] hover:text-black transition-colors font-medium"
                    >
                      <span>{sub.emoji}</span>
                      {sub.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {SIDE_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`font-barlow font-600 text-sm tracking-wide uppercase transition-colors hover:text-[#22c55e] ${location === link.href ? "text-[#22c55e]" : "text-gray-300"}`}
              data-testid={`nav-link-${link.label.toLowerCase().replace(" ", "-")}`}
            >
              {link.label}
            </Link>
          ))}

          <Link
            href="/cart"
            className="relative flex items-center gap-1.5 bg-[#22c55e] hover:bg-[#16a34a] text-black font-semibold text-sm px-4 py-2 rounded-full transition-colors"
            data-testid="nav-cart-button"
          >
            <ShoppingCart size={16} />
            Cart
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center" data-testid="cart-count">
                {itemCount}
              </span>
            )}
          </Link>
        </div>

        {/* Mobile right controls */}
        <div className="flex md:hidden items-center gap-3">
          <Link href="/cart" className="relative" data-testid="mobile-cart-button">
            <ShoppingCart size={22} className="text-white" />
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#22c55e] text-black text-xs font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </Link>
          <button
            onClick={() => { setMobileOpen(!mobileOpen); setJerseyExpanded(false); }}
            className="text-white p-1"
            aria-label="Toggle menu"
            data-testid="mobile-menu-toggle"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-[#111111] border-t border-gray-800 animate-fade-in-up">
          <div className="flex flex-col py-2">
            <Link
              href="/"
              onClick={() => setMobileOpen(false)}
              className={`font-barlow font-600 text-base tracking-wide uppercase px-5 py-3.5 transition-colors hover:bg-[#1a1a1a] hover:text-[#22c55e] ${location === "/" ? "text-[#22c55e] bg-[#1a1a1a]" : "text-gray-200"}`}
              data-testid="mobile-nav-link-home"
            >
              Home
            </Link>

            {/* Jerseys accordion */}
            <button
              onClick={() => setJerseyExpanded(!jerseyExpanded)}
              className={`flex items-center justify-between font-barlow font-600 text-base tracking-wide uppercase px-5 py-3.5 w-full text-left transition-colors hover:bg-[#1a1a1a] hover:text-[#22c55e] ${isJerseysActive ? "text-[#22c55e] bg-[#1a1a1a]" : "text-gray-200"}`}
              data-testid="mobile-nav-link-jerseys"
            >
              Jerseys
              <ChevronDown
                size={16}
                className={`transition-transform duration-200 ${jerseyExpanded ? "rotate-180" : ""}`}
              />
            </button>

            {jerseyExpanded && (
              <div className="bg-[#0d0d0d] border-t border-b border-gray-800">
                {JERSEY_SUB.map((sub) => (
                  <Link
                    key={sub.href}
                    href={sub.href}
                    onClick={() => { setMobileOpen(false); setJerseyExpanded(false); }}
                    className="flex items-center gap-3 px-8 py-3 text-sm text-gray-400 hover:text-[#22c55e] hover:bg-[#1a1a1a] transition-colors font-medium uppercase tracking-wide"
                  >
                    <span>{sub.emoji}</span>
                    {sub.label}
                  </Link>
                ))}
              </div>
            )}

            {SIDE_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`font-barlow font-600 text-base tracking-wide uppercase px-5 py-3.5 transition-colors hover:bg-[#1a1a1a] hover:text-[#22c55e] ${location === link.href ? "text-[#22c55e] bg-[#1a1a1a]" : "text-gray-200"}`}
                data-testid={`mobile-nav-link-${link.label.toLowerCase().replace(" ", "-")}`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
