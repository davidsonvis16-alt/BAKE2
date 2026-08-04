import React from 'react';

export const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#FAF3E7] pb-20">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <span className="text-xs uppercase font-extrabold tracking-widest text-[#000000]">
            ABOUT US
          </span>
          <h1 className="font-serif font-black text-3xl md:text-4xl text-[#000000] mt-1">
            Bakemart Coffee House
          </h1>
        </div>

        <div className="bg-white rounded-2xl p-6 md:p-8 border border-[#000000]/10 shadow-sm space-y-6">
          <div>
            <h2 className="font-serif font-bold text-xl text-[#000000] mb-3">
              The Only Open-Kitchen Coffee Shop in Nakuru City
            </h2>
            <p className="text-sm text-[#000000]/80 leading-relaxed">
              Bakemart Coffee House is located on Moi Road at Tropical House, behind Gilanis Supermarket and besides Nakuru GPO in Nakuru City, Kenya. We offer a trendy, relaxing, serene, and cozy atmosphere where guests can watch food being prepared in our open kitchen.
            </p>
          </div>

          <div>
            <h2 className="font-serif font-bold text-xl text-[#000000] mb-3">
              What Makes Us Special
            </h2>
            <p className="text-sm text-[#000000]/80 leading-relaxed">
              We're the only open-kitchen coffee shop in Nakuru City, offering a broad menu that mixes coffeehouse classics with pizzas, burgers, waffles, healthy options, and local Kenyan flavors. Our open-kitchen concept lets you watch our chefs craft your meals fresh daily, creating a unique dining experience that combines transparency with exceptional taste.
            </p>
          </div>

          <div>
            <h2 className="font-serif font-bold text-xl text-[#000000] mb-3">
              Our Menu
            </h2>
            <p className="text-sm text-[#000000]/80 leading-relaxed mb-3">
              We specialize in a wide range of items including:
            </p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-[#000000]/80">
              <li>• Specialty coffee (cappuccino, white/black coffee, iced options)</li>
              <li>• Milkshakes, smoothies, and iced coffee</li>
              <li>• Authentic Italian-style pizzas</li>
              <li>• Beef burgers and chapati wraps</li>
              <li>• Waffles (vanilla, chocolate, red velvet, peanut butter)</li>
              <li>• Cocktails and mojitos</li>
              <li>• Fresh juices and lemonades</li>
              <li>• Bakery items and desserts (trifles, ice cream, banana split)</li>
              <li>• Salads, soups, and light meals</li>
              <li>• Healthy low-carb/no-sugar/no-oil meals</li>
              <li>• Kienyeji (traditional) dishes</li>
              <li>• Breakfast options and more</li>
            </ul>
          </div>

          <div>
            <h2 className="font-serif font-bold text-xl text-[#000000] mb-3">
              Delivery
            </h2>
            <p className="text-sm text-[#000000]/80 leading-relaxed">
              Delivery is available via Glovo. Search for "Bakemart Coffee House Nakuru" on Glovo to order your favorites from the comfort of your home or office.
            </p>
          </div>

          <div>
            <h2 className="font-serif font-bold text-xl text-[#000000] mb-3">
              Follow Us
            </h2>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="https://www.tiktok.com/@bakemartcoffeehou"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-[#000000] text-white text-sm font-bold px-4 py-2.5 rounded-full hover:bg-[#000000]/80 transition-colors"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43V8.87a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/></svg>
                TikTok
              </a>
              <a
                href="https://youtube.com/@bakemartcoffeehouse6638?si=7xNnnCC7len5cIyc"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-red-600 text-white text-sm font-bold px-4 py-2.5 rounded-full hover:bg-red-700 transition-colors"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M23.5 6.2a3.02 3.02 0 00-2.12-2.14C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.38.56A3.02 3.02 0 00.5 6.2 31.6 31.6 0 000 12a31.6 31.6 0 00.5 5.8 3.02 3.02 0 002.12 2.14c1.88.56 9.38.56 9.38.56s7.5 0 9.38-.56a3.02 3.02 0 002.12-2.14A31.6 31.6 0 0024 12a31.6 31.6 0 00-.5-5.8zM9.55 15.57V8.43L15.82 12l-6.27 3.57z"/></svg>
                YouTube
              </a>
            </div>
          </div>

          <div>
            <h2 className="font-serif font-bold text-xl text-[#000000] mb-3">
              Visit Us
            </h2>
            <p className="text-sm text-[#000000]/80 leading-relaxed">
              Moi Road, Tropical House, Nakuru (behind Gilanis Supermarket and besides Nakuru GPO). We're open daily until 8:00 PM. Follow us on Instagram @bakemartcoffeehouse and Facebook Bakemart Coffee House / NakuruBakemartPlusShop for the latest menu, promotions, and updates.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
