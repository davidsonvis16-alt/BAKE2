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
