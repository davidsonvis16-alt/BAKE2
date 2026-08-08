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
  <div className={`group relative overflow-hidden rounded-2xl border border-[#e6d3c2] ${className}`}>
    <ImageWithSkeleton
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      containerClassName="relative overflow-hidden bg-[#f8f1e5] h-full w-full"
      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
    />
    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
    <div className="pointer-events-none absolute inset-x-0 bottom-0 p-5">
      <div className="transform translate-y-2 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
        {label && (
          <span className="inline-flex rounded-full bg-white/95 px-3 py-1 text-[10px] uppercase tracking-widest text-[#1a120b] font-bold border border-[#e6d3c2]">
            {label}
          </span>
        )}
        <p className="mt-2 text-sm font-semibold text-white leading-tight">{alt}</p>
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
    <div className="min-h-screen bg-[#fdfaf3] pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 lg:py-14">
        <div className="max-w-3xl">
          <span className="text-[10px] font-black uppercase tracking-widest text-[#8c7a6c]">
            GALLERY
          </span>
          <h1 className="font-serif font-black text-3xl sm:text-4xl lg:text-5xl text-[#1a120b] mt-4 leading-tight">
            Inside BakeMart
          </h1>
          <p className="mt-4 max-w-2xl text-sm sm:text-base text-[#5c4b3f] leading-relaxed">
            A glimpse into our open-kitchen coffee shop — the food, the space, and the moments in between.
          </p>
        </div>

        {/* Category Filter */}
        <div className="mt-8 flex flex-wrap gap-2">
          {galleryCategories.map((category) => {
            const isActive = selectedCategory === category.id;
            return (
              <button
                key={category.id}
                type="button"
                onClick={() => setSelectedCategory(category.id)}
                className={`rounded-full border px-4 py-2 text-[11px] font-bold transition-all ${
                  isActive
                    ? 'bg-[#1a120b] text-white border-[#1a120b]'
                    : 'bg-white text-[#2b1b12] border-[#e6d3c2] hover:border-[#1a120b]'
                }`}
              >
                {category.label}
              </button>
            );
          })}
        </div>

        {/* Gallery Grid */}
        <div className="mt-10 space-y-6">
          {/* Hero Images */}
          {heroImages.length > 0 && (
            <div className="grid gap-6 lg:grid-cols-2">
              {heroImages.map((image) => (
                <GalleryCard
                  key={image.src}
                  src={image.src}
                  alt={image.alt}
                  label={image.label}
                  className="min-h-[300px] sm:min-h-[400px]"
                />
              ))}
            </div>
          )}

          {/* Editorial Grid */}
          {editorialImages.length > 0 && (
            <div className="grid gap-4 sm:gap-6 grid-cols-2 lg:grid-cols-3">
              {editorialImages.map((image) => (
                <GalleryCard
                  key={image.src}
                  src={image.src}
                  alt={image.alt}
                  label={image.label}
                  className="min-h-[200px] sm:min-h-[280px]"
                />
              ))}
            </div>
          )}

          {/* Feature Image */}
          {featureImage && (
            <div className="relative overflow-hidden rounded-2xl border border-[#e6d3c2] min-h-[300px] sm:min-h-[400px]">
              <ImageWithSkeleton
                src={featureImage.src}
                alt={featureImage.alt}
                loading="lazy"
                decoding="async"
                containerClassName="h-full w-full overflow-hidden bg-[#f8f1e5]"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-black/20" />
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                <p className="max-w-xl text-lg sm:text-xl font-serif font-bold text-white tracking-wide">
                  Good food brings people together.
                </p>
              </div>
            </div>
          )}

          {/* Remaining Images */}
          {remainingImages.length > 0 && (
            <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {remainingImages.map((image) => (
                <GalleryCard
                  key={image.src}
                  src={image.src}
                  alt={image.alt}
                  label={image.label}
                  className="min-h-[200px] sm:min-h-[240px]"
                />
              ))}
            </div>
          )}
        </div>

        {/* Closing Statement */}
        <div className="mt-16 pt-12 border-t border-[#e6d3c2]">
          <div className="max-w-2xl">
            <span className="text-[10px] font-black uppercase tracking-widest text-[#8c7a6c]">
              SEE YOU AT BAKEMART
            </span>
            <h2 className="mt-4 font-serif font-black text-3xl sm:text-4xl text-[#1a120b] leading-tight">
              Come hungry. Leave happy.
            </h2>
            <p className="mt-4 text-sm sm:text-base text-[#5c4b3f] leading-relaxed">
              A beautiful coffee house is built from the food, the space, and the moments in between.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
