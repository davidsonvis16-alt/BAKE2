import React from 'react';
import { MapPin, Phone, Clock, Instagram, Facebook, Youtube, Music2 } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-[#FAF3E7] pt-10 pb-24 md:pb-10 border-t-2 border-neutral-800">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-8 border-b border-neutral-800">
          
          {/* Brand Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <img
                src="/logo.jpeg"
                alt="BakeMart Logo"
                className="w-10 h-10 rounded-full border-2 border-[#FAF3E7]/40 object-cover logo-img"
              />
              <div>
                <h3 className="font-serif font-bold text-lg text-white">BakeMart Coffee House</h3>
              </div>
            </div>

            <p className="text-xs text-orange-300/80 italic font-serif">
              "Beyond Sweetness It's Fresh and Nutritional"
            </p>

            <p className="text-xs text-orange-200/80 leading-relaxed">
              The only open-kitchen coffee shop in Nakuru City. Located on Moi Road at Tropical House (behind Gilanis Supermarket and besides Nakuru GPO). Watch food being prepared in our trendy, relaxing, serene, and cozy atmosphere.
            </p>

            {/* Social Media */}
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="https://www.instagram.com/bakemartcoffeehouse/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-[#000000] text-white text-xs font-bold px-4 py-2.5 rounded-full hover:bg-[#000000] transition-colors"
              >
                <Instagram className="w-4 h-4" />
                <span>Instagram</span>
              </a>
              <a
                href="https://www.facebook.com/BakemartCoffeeHouse/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-[#000000] text-white text-xs font-bold px-4 py-2.5 rounded-full hover:bg-[#000000] transition-colors"
              >
                <Facebook className="w-4 h-4" />
                <span>Facebook</span>
              </a>
              <a
                href="mailto:Salesbakemart.co.ke@gmail.com"
                className="inline-flex items-center gap-2 bg-[#f8f1e5] text-[#000000] border border-[#e6d3c2] text-xs font-bold px-4 py-2.5 rounded-full hover:bg-[#f5efe7] transition-colors"
              >
                Email Us
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-display font-bold text-sm text-orange-500 uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs text-orange-200/80">
              <li><a href="/" className="hover:text-orange-300 transition-colors">Home</a></li>
              <li><a href="/menu" className="hover:text-orange-300 transition-colors">Menu</a></li>
              <li><a href="/specials" className="hover:text-orange-300 transition-colors">Specials</a></li>
              <li><a href="/gallery" className="hover:text-orange-300 transition-colors">Gallery</a></li>
              <li><a href="/about" className="hover:text-orange-300 transition-colors">About Us</a></li>
              <li><a href="/faq" className="hover:text-orange-300 transition-colors">FAQ</a></li>
            </ul>
          </div>

          {/* Visit Us */}
          <div className="space-y-3">
            <h4 className="font-display font-bold text-sm text-orange-500 uppercase tracking-wider">
              Visit Us
            </h4>
            <ul className="space-y-2.5 text-xs text-orange-200/80">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                <span>Moi Road, Tropical House, Nakuru (behind Gilanis Supermarket and besides Nakuru GPO)</span>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-orange-500 shrink-0" />
                <span>Open Daily: Closes 8:00 PM</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-orange-500 shrink-0" />
                <a href="tel:+254725009708" className="hover:text-orange-300 transition-colors">0725 009 708</a>
              </li>
            </ul>
          </div>

          {/* Order & Delivery */}
          <div className="space-y-3 bg-neutral-900 p-4 rounded-2xl border border-neutral-700">
            <h4 className="font-display font-bold text-sm text-white flex items-center gap-2">
              <Music2 className="w-4 h-4 text-orange-500" />
              <span>Order & Delivery</span>
            </h4>
            <p className="text-xs text-orange-300/70">
              Delivery available via Glovo. Search "Bakemart Coffee House Nakuru" on Glovo to order.
            </p>
            <a
              href="https://wa.me/254725009708?text=Hello%20BakeMart%20Coffee%20House,%20I%20would%20like%20to%20order..."
              target="_blank"
              rel="noreferrer"
              className="mt-2 w-full bg-neutral-800 hover:bg-black text-white text-xs font-bold py-2.5 rounded-full flex items-center justify-center gap-2 transition-colors shadow-md"
            >
              <span>Chat on WhatsApp</span>
            </a>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-neutral-400 gap-2">
          <p>© {new Date().getFullYear()} BakeMart Coffee House. All rights reserved.</p>
          <p className="font-serif italic text-orange-500">"Beyond Sweetness — It's Fresh and Nutritional"</p>
        </div>
      </div>
    </footer>
  );
};
