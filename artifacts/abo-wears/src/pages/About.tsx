import { Phone, MapPin, Clock, MessageCircle } from "lucide-react";
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

export default function About() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-[#0a0a0a] text-white py-10 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-display text-5xl md:text-6xl text-white mb-2">About Us</h1>
          <p className="text-gray-400">Learn more about ABO Wears</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-10 space-y-10">
        {/* About */}
        <div className="bg-card border border-card-border rounded-xl p-6 md:p-8">
          <div className="flex items-center gap-2 mb-5">
            <span className="font-display text-3xl tracking-widest text-foreground">ABO</span>
            <span className="font-display text-3xl tracking-widest text-[#22c55e]">WEARS</span>
          </div>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Welcome to <strong className="text-foreground">ABO Wears</strong> — your number one stop for quality jerseys and sporty streetwear in Ile-Ife, Nigeria. We specialize in Retro Jerseys, Club Football Kits, Country Jerseys, NFL Jerseys, Basketball Jerseys, Baseball Jerseys, Joggers, Training Shorts, Face Caps, and GYM Wears.
            </p>
            <p>
              Our mission is simple: bring you the best quality sportswear at prices you can actually afford. Whether you're a football fanatic looking for that classic vintage shirt, a basketball lover hunting for your favourite team's kit, or you just want comfortable everyday sports gear — we've got you covered.
            </p>
            <p>
              Based at OAU New Market in Ile-Ife, we serve customers across Nigeria. Ordering is easy — browse our catalog, add to cart, and place your order directly via WhatsApp. We respond fast and ensure your items are delivered safely.
            </p>
            <p>
              Trusted by hundreds of customers. Known for quality, honesty, and great prices. That's the ABO Wears promise.
            </p>
          </div>
        </div>

        {/* Contact Info */}
        <div className="bg-card border border-card-border rounded-xl p-6 md:p-8">
          <h2 className="font-display text-3xl text-foreground mb-6">Contact Information</h2>
          <div className="space-y-5">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-[#22c55e]/10 border border-[#22c55e]/30 flex items-center justify-center shrink-0">
                <Phone size={18} className="text-[#22c55e]" />
              </div>
              <div>
                <p className="font-semibold text-sm text-foreground mb-0.5">Phone Number</p>
                <a
                  href="tel:+2348110951313"
                  className="text-[#22c55e] hover:underline text-sm block"
                  data-testid="contact-phone"
                >
                  08110951313
                </a>
                <a
                  href="tel:+2348133423539"
                  className="text-[#22c55e] hover:underline text-sm block"
                >
                  08133423539
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-[#22c55e]/10 border border-[#22c55e]/30 flex items-center justify-center shrink-0">
                <MapPin size={18} className="text-[#22c55e]" />
              </div>
              <div>
                <p className="font-semibold text-sm text-foreground mb-0.5">Physical Location</p>
                <p className="text-muted-foreground text-sm" data-testid="contact-address">
                  OAU New Market, Shop 10, Zone B, Block 6<br />
                  Ile-Ife, Osun State, Nigeria
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-[#22c55e]/10 border border-[#22c55e]/30 flex items-center justify-center shrink-0">
                <Clock size={18} className="text-[#22c55e]" />
              </div>
              <div>
                <p className="font-semibold text-sm text-foreground mb-0.5">Opening Hours</p>
                <p className="text-muted-foreground text-sm">
                  Monday – Saturday: 8:00 AM – 8:00 PM<br />
                  Sunday: 12:00 PM – 6:00 PM
                </p>
              </div>
            </div>

            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hello%20ABO%20Wears%2C%20I%20have%20a%20question`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp inline-flex items-center gap-2 font-semibold px-6 py-3 rounded-full text-sm mt-2"
              data-testid="about-whatsapp-button"
            >
              <MessageCircle size={16} />
              Chat on WhatsApp
            </a>
            <div className="flex items-center gap-4 mt-4">
              <a
                href="https://www.facebook.com/share/1NATkUfkcg/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-muted-foreground hover:text-[#22c55e] transition-colors text-sm font-medium"
                aria-label="Facebook"
              >
                <FacebookIcon />
                Facebook
              </a>
              <a
                href="https://www.instagram.com/abowears?igsh=MWdkYTdoZm9ienRubw=="
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-muted-foreground hover:text-[#22c55e] transition-colors text-sm font-medium"
                aria-label="Instagram"
              >
                <InstagramIcon />
                Instagram
              </a>
            </div>
          </div>
        </div>

        {/* Google Maps */}
        <div className="bg-card border border-card-border rounded-xl overflow-hidden">
          <div className="p-5 border-b border-border">
            <h2 className="font-display text-2xl text-foreground">Find Us on the Map</h2>
            <p className="text-muted-foreground text-sm mt-1">OAU New Market, Ile-Ife, Osun State</p>
          </div>
          <div className="aspect-video">
            <iframe
              title="ABO Wears Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.9523!2d4.5437!3d7.4706!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103889e85bb5ef05%3A0x8ab0e88ea8dae2c6!2sObafemi+Awolowo+University%2C+Ile-Ife!5e0!3m2!1sen!2sng!4v1680000000000!5m2!1sen!2sng"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              data-testid="google-maps-iframe"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
