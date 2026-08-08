import React from 'react';

export const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#fdfaf3] pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 lg:py-14">
        <div className="max-w-3xl">
          <span className="text-[10px] font-black uppercase tracking-widest text-[#8c7a6c]">
            ABOUT US
          </span>
          <h1 className="font-serif font-black text-3xl sm:text-4xl lg:text-5xl text-[#1a120b] mt-4 leading-tight">
            The only open-kitchen coffee shop in Nakuru City
          </h1>
          <p className="mt-4 text-sm sm:text-base text-[#5c4b3f] leading-relaxed max-w-2xl">
            Bakemart Coffee House is located on Moi Road at Tropical House, behind Gilanis Supermarket and besides Nakuru GPO in Nakuru City, Kenya.
          </p>
        </div>

        {/* Brand Story */}
        <div className="mt-12 grid gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="bg-white rounded-2xl border border-[#e6d3c2] overflow-hidden shadow-sm">
            <div className="aspect-[4/3] overflow-hidden bg-[#f8f1e5]">
              <img
                src="/open-kitchen.jpeg"
                alt="Open kitchen"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            </div>
            <div className="p-6 sm:p-8 space-y-4">
              <h2 className="font-serif font-bold text-xl text-[#1a120b]">
                Our Story
              </h2>
              <p className="text-sm text-[#5c4b3f] leading-relaxed">
                We offer a trendy, relaxing, serene, and cozy atmosphere where guests can watch food being prepared in our open kitchen.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-[#e6d3c2] p-6 sm:p-8 shadow-sm">
            <h2 className="font-serif font-bold text-xl text-[#1a120b] mb-4">
              What Makes Us Special
            </h2>
            <p className="text-sm text-[#5c4b3f] leading-relaxed mb-6">
              We&apos;re the only open-kitchen coffee shop in Nakuru City, offering a broad menu that mixes coffeehouse classics with pizzas, burgers, waffles, healthy options, and local Kenyan flavors.
            </p>

            <h3 className="font-serif font-bold text-base text-[#1a120b] mb-3">
              Our Menu Highlights
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-[#5c4b3f]">
              <li>• Specialty coffee (cappuccino, white/black coffee, iced options)</li>
              <li>• Milkshakes, smoothies, and iced coffee</li>
              <li>• Authentic Italian-style pizzas</li>
              <li>• Beef burgers and chapati wraps</li>
              <li>• Waffles (vanilla, chocolate, red velvet)</li>
              <li>• Cocktails and mojitos</li>
              <li>• Fresh juices and lemonades</li>
              <li>• Bakery items and desserts</li>
              <li>• Salads, soups, and light meals</li>
              <li>• Healthy low-carb/no-sugar/no-oil meals</li>
              <li>• Kienyeji (traditional) dishes</li>
              <li>• Breakfast options and more</li>
            </ul>
          </div>
        </div>

        {/* Delivery & Contact */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          <div className="bg-white rounded-2xl border border-[#e6d3c2] p-6 sm:p-8 shadow-sm">
            <h3 className="font-serif font-bold text-lg text-[#1a120b] mb-3">
              Delivery
            </h3>
            <p className="text-sm text-[#5c4b3f] leading-relaxed">
              Delivery is available via Glovo. Search for &quot;Bakemart Coffee House Nakuru&quot; on Glovo to order your favorites.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-[#e6d3c2] p-6 sm:p-8 shadow-sm">
            <h3 className="font-serif font-bold text-lg text-[#1a120b] mb-3">
              Visit Us
            </h3>
            <p className="text-sm text-[#5c4b3f] leading-relaxed">
              Moi Road, Tropical House, Nakuru (behind Gilanis Supermarket and besides Nakuru GPO). We&apos;re open daily until 8:00 PM.
            </p>
            <div className="flex flex-wrap items-center gap-3 mt-4">
              <a
                href="https://www.instagram.com/bakemartcoffeehouse/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-[#1a120b] text-white text-xs font-bold px-4 py-2.5 rounded-full hover:bg-[#2b1b12] transition-colors"
              >
                Instagram
              </a>
              <a
                href="https://www.facebook.com/BakemartCoffeeHouse/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-[#1a120b] text-white text-xs font-bold px-4 py-2.5 rounded-full hover:bg-[#2b1b12] transition-colors"
              >
                Facebook
              </a>
              <a
                href="mailto:Salesbakemart.co.ke@gmail.com"
                className="inline-flex items-center gap-2 bg-[#f8f1e5] text-[#1a120b] border border-[#e6d3c2] text-xs font-bold px-4 py-2.5 rounded-full hover:bg-[#f5efe7] transition-colors"
              >
                Email Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
