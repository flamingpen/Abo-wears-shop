import { Link } from "wouter";
import { Phone, MapPin, MessageCircle } from "lucide-react";
import { WHATSAPP_NUMBER } from "@/data/products";

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
              Your number one destination for quality jerseys, joggers, shorts, GYM wears, and face caps at prices you'll love.
            </p>
          </div>

          <div>
            <h4 className="font-barlow font-700 text-base uppercase tracking-widest text-gray-300 mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { label: "Home", href: "/" },
                { label: "Retro Jerseys", href: "/jerseys" },
                { label: "Club Jerseys", href: "/jerseys" },
                { label: "Country Jerseys", href: "/jerseys" },
                { label: "NFL Jerseys", href: "/jerseys" },
                { label: "Basketball Jerseys", href: "/jerseys" },
                { label: "Baseball Jerseys", href: "/jerseys" },
                { label: "Joggers", href: "/joggers" },
                { label: "Shorts", href: "/shorts" },
                { label: "Face Caps", href: "/face-caps" },
                { label: "GYM Wears", href: "/gloves" },
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
