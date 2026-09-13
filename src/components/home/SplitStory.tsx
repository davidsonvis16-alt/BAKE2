import React from 'react';
import { ArrowRight } from 'lucide-react';
import { SplitImage } from '../brand/SplitImage';
import { Reveal } from '../brand/Reveal';

interface SplitStoryProps {
  onNavigateMenu: () => void;
  onNavigateGallery: () => void;
  onNavigateReservation: () => void;
}

export const SplitStory: React.FC<SplitStoryProps> = ({ onNavigateMenu, onNavigateGallery, onNavigateReservation }) => {
  const stories = [
    {
      number: '01',
      eyebrow: 'The open kitchen',
      title: 'Nothing hidden. Nothing rushed.',
      body: 'Watch every plate come together — from hand-stretched pizza to slow-cooked kienyeji. It is the only open-kitchen coffee house in Nakuru City.',
      image: '/open-kitchen.jpeg',
      alt: 'The open kitchen at BakeMart Coffee House',
      cta: { label: 'See the menu', onClick: onNavigateMenu },
    },
    {
      number: '02',
      eyebrow: 'Baked every morning',
      title: 'Fresh out of the oven, daily.',
      body: 'Muffins, tea cakes, cheesecakes and waffles are baked in-house each day, ready for your first cup of coffee at 7AM.',
      image: '/freshly-baked.jpeg',
      alt: 'Fresh pastries and desserts at BakeMart',
      cta: { label: 'Browse the gallery', onClick: onNavigateGallery },
    },
    {
      number: '03',
      eyebrow: 'A room to stay in',
      title: 'Come for coffee. Stay for lunch.',
      body: 'Warm booths, quiet corners and good company on Moi Road — for coffee dates, family meals and business lunches.',
      image: '/space.jpeg',
      alt: 'Dining space at BakeMart Coffee House',
      cta: { label: 'Reserve a table', onClick: onNavigateReservation },
    },
  ];

  return (
    <section className="bg-white py-14 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-[1320px] space-y-14 px-4 sm:space-y-20 sm:px-6 lg:space-y-28 lg:px-8">
        {stories.map((story, i) => {
          const flip = i % 2 === 1;
          return (
            <div key={story.number} className="grid items-center gap-7 md:grid-cols-2 md:gap-12 lg:gap-20">
              <SplitImage
                src={story.image}
                alt={story.alt}
                strips={4}
                className={`aspect-[4/3] rounded-[1.75rem] bg-bm-sand lg:aspect-[5/4] lg:rounded-[2.25rem] ${flip ? 'md:order-2' : ''}`}
              />
              <Reveal className={flip ? 'md:order-1' : ''}>
                <div className="flex items-center gap-3">
                  <span className="font-display text-5xl leading-none text-bm-orange sm:text-6xl">{story.number}</span>
                  <span className="h-px w-10 bg-bm-line" />
                  <span className="text-xs font-extrabold uppercase tracking-[0.22em] text-bm-muted">{story.eyebrow}</span>
                </div>
                <h2 className="mt-4 font-display text-[2.4rem] uppercase leading-[0.92] text-bm-ink sm:text-5xl lg:text-6xl">
                  {story.title}
                </h2>
                <p className="mt-4 max-w-md text-[15px] leading-relaxed text-bm-muted sm:text-base">{story.body}</p>
                <button
                  type="button"
                  onClick={story.cta.onClick}
                  className="group mt-7 inline-flex items-center gap-2 border-b-2 border-bm-ink pb-1 text-sm font-extrabold uppercase tracking-wider text-bm-ink hover:border-bm-flame hover:text-bm-flame"
                >
                  {story.cta.label}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
              </Reveal>
            </div>
          );
        })}
      </div>
    </section>
  );
};
