import { Link } from "wouter";
import { Phone, MapPin, MessageCircle } from "lucide-react";
import { WHATSAPP_NUMBER } from "@/data/products";

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}
function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="bg-[#0a0a0a] text-white mt-16">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <div className="flex items-center gap-1 mb-3">
              <span className="font-display text-2xl tracking-widest text-white">ABO</span>
              <span className="font-display text-2xl tracking-widest text-[#22c55e]">WEARS</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Your number one destination for quality Jerseys, Joggers, Shorts, GYM Wears, and Face Caps at prices you'll love.
            </p>
          </div>

          <div>
            <h4 className="font-barlow font-700 text-base uppercase tracking-widest text-gray-300 mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { label: "Home", href: "/" },
                { label: "Retro Jerseys", href: "/jerseys/retro-jerseys" },
                { label: "Club Jerseys", href: "/jerseys/club-jerseys" },
                { label: "Country Jerseys", href: "/jerseys/country-jerseys" },
                { label: "NFL Jerseys", href: "/jerseys/nfl-jerseys" },
                { label: "Basketball Jerseys", href: "/jerseys/basketball-jerseys" },
                { label: "Baseball Jerseys", href: "/jerseys/baseball-jerseys" },
                { label: "Joggers", href: "/joggers" },
                { label: "Shorts", href: "/shorts" },
                { label: "Face Caps", href: "/face-caps" },
                { label: "GYM Wears", href: "/gym-wears" },
                { label: "About Us", href: "/about" },
              ].map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-gray-400 hover:text-[#22c55e] text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-barlow font-700 text-base uppercase tracking-widest text-gray-300 mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5">
                <Phone size={16} className="text-[#22c55e] mt-0.5 shrink-0" />
                <a href={`tel:+${WHATSAPP_NUMBER}`} className="text-gray-400 hover:text-white text-sm transition-colors">
                  08110951313
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin size={16} className="text-[#22c55e] mt-0.5 shrink-0" />
                <span className="text-gray-400 text-sm">
                  OAU New Market, Shop 10, Zone B, Block 6
                </span>
              </li>
              <li>
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-black text-sm font-semibold px-4 py-2 rounded-full transition-colors mt-1"
                  data-testid="footer-whatsapp-link"
                >
                  <MessageCircle size={15} />
                  Chat on WhatsApp
                </a>
              </li>
              <li>
                <div className="flex items-center gap-3 mt-2">
                  <a href="https://www.facebook.com/share/1NATkUfkcg/" target="_blank" rel="noopener noreferrer"
                    className="text-gray-400 hover:text-[#22c55e] transition-colors" aria-label="Facebook">
                    <FacebookIcon />
                  </a>
                  <a href="https://www.instagram.com/abowears?igsh=MWdkYTdoZm9ienRubw==" target="_blank" rel="noopener noreferrer"
                    className="text-gray-400 hover:text-[#22c55e] transition-colors" aria-label="Instagram">
                    <InstagramIcon />
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 text-center">
          <p className="text-gray-500 text-xs">
            &copy; {new Date().getFullYear()} ABO Wears. All rights reserved. | OAU New Market, Ile-Ife
          </p>
        </div>
      </div>
    </footer>
  );
}
