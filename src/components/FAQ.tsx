import React from 'react';

export const FAQ: React.FC = () => {
  const faqs = [
    {
      question: 'Where is Bakemart Coffee House located?',
      answer: 'Moi Road, Tropical House, Nakuru (behind Gilanis Supermarket and besides Nakuru GPO).'
    },
    {
      question: 'What makes Bakemart Coffee House special?',
      answer: "It's the only open-kitchen coffee shop in Nakuru City, with a trendy, cozy vibe and a broad menu that mixes coffeehouse classics with pizzas, burgers, waffles, healthy options, and local flavors. You can watch your food being prepared in our open kitchen."
    },
    {
      question: 'What kind of food and drinks do you serve?',
      answer: 'We serve coffee & hot drinks (cappuccino, white/black coffee, masala tea, milo, etc.), milkshakes, smoothies, iced coffee, frappuccinos, mojitos, lemonades, fresh juices, detox cocktails, waffles, pizzas, burgers, sandwiches, chapati wraps, pastas, salads, soups, light meals, breakfast, healthy low-carb/no-sugar/no-oil meals, kienyeji meals, bakery items, cookies, desserts (trifles, ice cream, banana split, apple delight), and more.'
    },
    {
      question: 'Do you offer delivery?',
      answer: 'Yes — available on Glovo. Search for "Bakemart Coffee House Nakuru" on Glovo to order.'
    },
    {
      question: 'What are your opening hours?',
      answer: 'Open daily — Closes at 8:00 PM.'
    },
    {
      question: 'How can I contact you or place an order?',
      answer: 'Call or WhatsApp us at 0725 009 708. Follow @bakemartcoffeehouse on Instagram and Bakemart Coffee House / NakuruBakemartPlusShop on Facebook for promotions, menu specials, and updates.'
    },
    {
      question: 'Is it family-friendly / good for groups?',
      answer: 'Yes — the cozy open-kitchen setting suits casual visits, coffee meet-ups, meals, and groups. We serve a mix of light snacks, full meals, and desserts.'
    },
    {
      question: 'Do you have healthy or special-diet options?',
      answer: 'Yes — low-carb, no-sugar, no-oil meals, salads, vegetable options, and various fresh juices/smoothies are available.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#fdfaf3] pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 lg:py-14">
        <div className="mb-8 sm:mb-10">
          <span className="text-[10px] font-black uppercase tracking-widest text-[#8c7a6c]">
            FAQ
          </span>
          <h1 className="text-charcoal-lg font-black text-3xl sm:text-4xl text-[#000000] mt-4 leading-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-sm text-[#5c4b3f] mt-3 max-w-xl">
            Everything you need to know about visiting and ordering from BakeMart Coffee House in Nakuru. — <a href="/menu" className="text-charcoal-link">View our menu</a> or <a href="/reservation" className="text-charcoal-link">book a table</a>.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl border border-[#e6d3c2] overflow-hidden"
            >
              <div className="p-5 sm:p-6">
                <h3 className="text-charcoal font-bold text-base sm:text-lg text-[#000000] mb-2">
                  {faq.question}
                </h3>
                <p className="text-sm text-[#5c4b3f] leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
