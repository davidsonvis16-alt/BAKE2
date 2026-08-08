import React, { useMemo, useState } from 'react';
import { ImageWithSkeleton } from './Skeletons';

const galleryCategories = [
  { id: 'all', label: 'ALL' },
  { id: 'food', label: 'FOOD' },
  { id: 'coffee', label: 'COFFEE' },
  { id: 'pizza-pasta', label: 'PIZZA & PASTA' },
  { id: 'moments', label: 'MOMENTS' },
  { id: 'space', label: 'SPACE' },
];

const galleryImages = [
  { src: '/open-kitchen.jpeg', alt: 'Open kitchen coffee bar', category: 'coffee', label: 'Coffee Shop' },
  { src: '/pizza-pasta.jpeg', alt: 'Wood-fired pizza and pasta plate', category: 'pizza-pasta', label: 'Pizza & Pasta' },
  { src: '/bbq-platters.jpeg', alt: 'BBQ platters with grilled meats and sides', category: 'food', label: 'BBQ Platters' },
  { src: '/bakery-desserts.jpeg', alt: 'Assorted bakery desserts and pastries', category: 'food', label: 'Bakery & Desserts' },
  { src: '/breakfast.jpeg', alt: 'Breakfast spread with coffee and pastries', category: 'food', label: 'Breakfast' },
  { src: '/juices-cocktails.jpeg', alt: 'Fresh juices and cocktails served cold', category: 'coffee', label: 'Beverages' },
  { src: '/kienyeji-traditional.jpeg', alt: 'Traditional Kenyan specialty dish', category: 'food', label: 'Kienyeji Special' },
  { src: '/mains-meal.jpeg', alt: 'Hearty main meal plated with care', category: 'food', label: 'Main Meals' },
  { src: '/gallery-1.jpg', alt: 'A warm café moment at BakeMart', category: 'moments', label: 'Moments' },
  { src: '/gallery-4.jpg', alt: 'Soft interior lighting and ceramic tableware', category: 'space', label: 'Space' },
  { src: '/gallery-5.jpg', alt: 'Intimate dining corner with warm textures', category: 'space', label: 'Space' },
  { src: '/gallery-9.jpg', alt: 'Chef plating a fresh dish in the kitchen', category: 'moments', label: 'Kitchen Moment' },
  { src: '/gallery-10.jpg', alt: 'Interior view with curated seating and warmth', category: 'space', label: 'Space' },
  { src: '/gallery-11.jpg', alt: 'Coffee cup and pastry with a premium finish', category: 'coffee', label: 'Coffee Moment' },
  { src: '/gallery-12.jpg', alt: 'Golden morning light on a café table', category: 'space', label: 'Space' },
  { src: '/gallery-13.jpg', alt: 'Friends enjoying a meal in the café', category: 'moments', label: 'Moments' },
  { src: '/gallery-14.jpg', alt: 'Café interior with premium materials', category: 'space', label: 'Space' },
  { src: '/gallery-15.jpg', alt: 'Close-up of a plated dish and drink', category: 'moments', label: 'Moments' },
];

const GalleryCard: React.FC<{
  src: string;
  alt: string;
  label?: string;
  className?: string;
}> = ({ src, alt, label, className = '' }) => (
  <div className={`group relative overflow-hidden rounded-[22px] shadow-[0_20px_60px_rgba(0,0,0,0.08)] ${className}`}>
    <ImageWithSkeleton
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      containerClassName="relative overflow-hidden bg-[#E6D8C5] h-full w-full"
      className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
    />
    <div className="pointer-events-none absolute inset-0 bg-black/0 transition duration-300 group-hover:bg-black/10" />
    <div className="pointer-events-none absolute inset-x-0 bottom-0 p-5">
      <div className="transform translate-y-4 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
        {label && (
          <span className="inline-flex rounded-full bg-[#000000]/80 px-3 py-1 text-[11px] uppercase tracking-[0.28em] text-[#FAF3E7]">
            {label}
          </span>
        )}
        <p className="mt-3 text-sm font-semibold text-white leading-tight">{alt}</p>
      </div>
    </div>
  </div>
);

export const Gallery: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredImages = useMemo(() => {
    if (selectedCategory === 'all') return galleryImages;
    return galleryImages.filter((image) => image.category === selectedCategory);
  }, [selectedCategory]);

  const heroImages = filteredImages.slice(0, 2);
  const editorialImages = filteredImages.slice(2, 7);
  const featureImage = filteredImages[7] ?? null;
  const remainingImages = filteredImages.slice(featureImage ? 8 : 7);

  return (
    <div className="min-h-screen bg-[#FAF3E7] pb-20">
      <div className="max-w-7xl mx-auto px-4 py-10 sm:py-12 lg:py-14">
        <div className="max-w-3xl">
          <span className="text-[11px] uppercase tracking-[0.34em] font-bold text-[#000000]/70">
            GALLERY
          </span>
          <h1 className="font-serif font-black text-3xl sm:text-4xl lg:text-5xl text-[#000000] mt-4 leading-tight">
            Inside BakeMart
          </h1>
          <p className="mt-4 max-w-2xl text-sm sm:text-base text-[#000000]/75 leading-7">
            A glimpse into our open-kitchen coffee shop.
          </p>
          <p className="mt-8 text-4xl sm:text-5xl font-serif font-black text-[#000000] leading-snug max-w-xl">
            Made fresh. Served warm.
          </p>
          <p className="mt-4 max-w-2xl text-sm sm:text-base text-[#000000]/70 leading-7">
            Take a look behind the scenes at the food, drinks and moments that make BakeMart what it is.
          </p>
        </div>

        <div className="mt-10 overflow-x-auto pb-3 no-scrollbar">
          <div className="inline-flex gap-3">
            {galleryCategories.map((category) => {
              const isActive = selectedCategory === category.id;
              return (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => setSelectedCategory(category.id)}
                  className={`whitespace-nowrap rounded-full border px-4 py-2 text-xs font-semibold transition-colors ${
                    isActive
                      ? 'bg-[#000000] text-[#FAF3E7] border-[#000000]'
                      : 'bg-white text-[#000000] border-[#D8C7B0] hover:bg-[#FAF3E7]/10'
                  }`}
                >
                  {category.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.65fr_1fr] lg:items-start">
          {heroImages[0] && (
            <GalleryCard
              src={heroImages[0].src}
              alt={heroImages[0].alt}
              label={heroImages[0].label}
              className="min-h-105 sm:min-h-120 lg:min-h-130"
            />
          )}

          <div className="grid gap-6">
            {heroImages[1] && (
              <GalleryCard
                src={heroImages[1].src}
                alt={heroImages[1].alt}
                label={heroImages[1].label}
                className="min-h-105 sm:min-h-120 lg:min-h-130"
              />
            )}
          </div>
        </div>

        {editorialImages.length > 0 && (
          <div className="mt-10 grid gap-6 lg:grid-cols-[1.4fr_0.9fr]">
            <GalleryCard
              src={editorialImages[0].src}
              alt={editorialImages[0].alt}
              label={editorialImages[0].label}
              className="min-h-130"
            />
            <div className="grid gap-6">
              {editorialImages.slice(1, 4).map((image, index) => (
                <GalleryCard
                  key={image.src}
                  src={image.src}
                  alt={image.alt}
                  label={image.label}
                  className="min-h-62"
                />
              ))}
              {editorialImages[4] && (
                <GalleryCard
                  src={editorialImages[4].src}
                  alt={editorialImages[4].alt}
                  label={editorialImages[4].label}
                  className="min-h-85"
                />
              )}
            </div>
          </div>
        )}

        {featureImage && (
          <div className="mt-10 relative overflow-hidden rounded-[22px] shadow-[0_25px_80px_rgba(0,0,0,0.12)]">
            <ImageWithSkeleton
              src={featureImage.src}
              alt={featureImage.alt}
              loading="lazy"
              decoding="async"
              containerClassName="h-[420px] sm:h-[500px] w-full overflow-hidden bg-[#E6D8C5]"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-black/8" />
            <div className="absolute inset-x-0 bottom-0 p-8">
              <p className="max-w-xl text-lg sm:text-xl font-semibold text-[#FAF3E7] tracking-[0.08em] uppercase">
                Good food brings people together.
              </p>
            </div>
          </div>
        )}

        {remainingImages.length > 0 && (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {remainingImages.map((image) => (
              <GalleryCard
                key={image.src}
                src={image.src}
                alt={image.alt}
                label={image.label}
                className="min-h-80"
              />
            ))}
          </div>
        )}

        <div className="mt-16 border-t border-[#D8C7B0]/40 pt-12">
          <div className="max-w-2xl">
            <span className="text-[11px] uppercase tracking-[0.32em] font-bold text-[#000000]/70">
              SEE YOU AT BAKEMART
            </span>
            <h2 className="mt-4 font-serif font-black text-3xl sm:text-4xl text-[#000000] leading-tight">
              Come hungry. Leave happy.
            </h2>
            <p className="mt-4 text-sm sm:text-base text-[#000000]/70 leading-7">
              A beautiful coffee house is built from the food, the space and the moments in between.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
