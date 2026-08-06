
import React from 'react';
import { MapPin, Phone, Clock, MessageSquare, Instagram, Facebook, Youtube, Music2 } from 'lucide-react';

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
            <div className="flex items-center gap-3 flex-wrap">
              <a
                href="https://www.instagram.com/bakemartcoffeehouse/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 bg-neutral-900 border border-neutral-700 px-3 py-1.5 rounded-lg text-xs text-orange-400 hover:text-orange-300 transition-colors"
              >
                <Instagram className="w-3.5 h-3.5" />
                <span>@bakemartcoffeehouse</span>
              </a>
              <a
                href="https://www.facebook.com/BakemartCoffeeHouse/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 bg-neutral-900 border border-neutral-700 px-3 py-1.5 rounded-lg text-xs text-orange-400 hover:text-orange-300 transition-colors"
              >
                <Facebook className="w-3.5 h-3.5" />
                <span>Facebook</span>
              </a>
              <a
                href="https://www.tiktok.com/@bakemartcoffeehou?_r=1&_t=ZS-98ZwDygY7dZ"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 bg-neutral-900 border border-neutral-700 px-3 py-1.5 rounded-lg text-xs text-orange-400 hover:text-orange-300 transition-colors"
              >
                <Music2 className="w-3.5 h-3.5" />
                <span>TikTok</span>
              </a>
              <a
                href="https://youtube.com/@bakemartcoffeehouse6638?si=7xNnnCC7len5cIyc"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 bg-neutral-900 border border-neutral-700 px-3 py-1.5 rounded-lg text-xs text-orange-400 hover:text-orange-300 transition-colors"
              >
                <Youtube className="w-3.5 h-3.5" />
                <span>YouTube</span>
              </a>
            </div>
          </div>

          {/* Quick Contact & Address */}
          <div className="space-y-3">
            <h4 className="font-display font-bold text-sm text-orange-500 uppercase tracking-wider">
              Visit Us in Nakuru
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
                <MessageSquare className="w-4 h-4 text-orange-500 shrink-0" />
                <a href="mailto:Sales@bakemart.co.ke" className="hover:text-orange-300 transition-colors">Sales@bakemart.co.ke</a>
              </li>
            </ul>
          </div>

          {/* Menu Specialties */}
          <div className="space-y-3">
            <h4 className="font-display font-bold text-sm text-orange-500 uppercase tracking-wider">
              Menu Specialties
            </h4>
            
            <ul className="space-y-1.5 text-xs text-orange-200/80">
              <li>• Specialty Coffee (Cappuccino, White/Black Coffee, Iced Options)</li>
              <li>• Milkshakes, Smoothies & Iced Coffee</li>
              <li>• Authentic Italian-Style Pizzas</li>
              <li>• Beef Burgers, Waffles & Desserts</li>
              <li>• Cocktails, Mojitos & Fresh Juices</li>
              <li>• Healthy Low-Carb / No-Sugar / No-Oil Meals</li>
              <li>• Kienyeji (Traditional) Dishes</li>
              <li>• Bakery Items & Trifles</li>
            </ul>
          </div>

          {/* Delivery & Ordering */}
          <div className="space-y-3 bg-neutral-900 p-4 rounded-2xl border border-neutral-700">
            <h4 className="font-display font-bold text-sm text-white flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-orange-500" />
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