import { useState } from "react";
import { Link, useLocation } from "wouter";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useCart } from "@/context/CartContext";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Jerseys", href: "/jerseys" },
  { label: "Joggers", href: "/joggers" },
  { label: "Shorts", href: "/shorts" },
  { label: "Face Caps", href: "/face-caps" },
  { label: "About", href: "/about" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [location] = useLocation();
  const { itemCount } = useCart();

  return (
    <nav className="sticky top-0 z-50 bg-[#0a0a0a] text-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="font-display text-2xl tracking-widest text-white">ABO</span>
          <span className="font-display text-2xl tracking-widest text-[#22c55e]">WEARS</span>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`font-barlow font-600 text-sm tracking-wide uppercase transition-colors hover:text-[#22c55e] ${
                location === link.href ? "text-[#22c55e]" : "text-gray-300"
              }`}
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
            onClick={() => setOpen(!open)}
            className="text-white p-1"
            aria-label="Toggle menu"
            data-testid="mobile-menu-toggle"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-[#111111] border-t border-gray-800 animate-fade-in-up">
          <div className="flex flex-col py-2">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`font-barlow font-600 text-base tracking-wide uppercase px-5 py-3.5 transition-colors hover:bg-[#1a1a1a] hover:text-[#22c55e] ${
                  location === link.href ? "text-[#22c55e] bg-[#1a1a1a]" : "text-gray-200"
                }`}
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
