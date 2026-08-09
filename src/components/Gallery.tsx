import React, { useMemo, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
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
  { src: '/gallery-16.jpg', alt: 'Cozy dining booths decked out with balloons and roses', category: 'space', label: 'Space' },
  { src: '/open-kitchen.jpeg', alt: 'Open kitchen coffee bar', category: 'coffee', label: 'Coffee Shop' },
  { src: '/pizza-pasta.jpeg', alt: 'Wood-fired pizza and pasta plate', category: 'pizza-pasta', label: 'Pizza & Pasta' },
  { src: '/happy-hour_1.jpg', alt: 'Bakemart serves happy hour food', category: 'food', label: 'Happy Hour' },
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

// Curated set + placement for the scattered "sticky note" hero stack.
// The space shot leads (largest, topmost, front-and-center).
const heroStack = [
  {
    src: '/gallery-16.jpg',
    alt: 'Cozy dining booths decked out with balloons and roses',
    style: { top: '4%', left: '50%', width: '58%', rotate: -3, z: 50 },
  },
  {
    src: '/breakfast.jpeg',
    alt: 'Breakfast spread with coffee and pastries',
    style: { top: '2%', left: '10%', width: '40%', rotate: -9, z: 30 },
  },
  {
    src: '/happy-hour_1.jpg',
    alt: 'Bakemart serves happy hour food',
    style: { top: '30%', left: '78%', width: '38%', rotate: 8, z: 20 },
  },
  {
    src: '/kienyeji-traditional.jpeg',
    alt: 'Traditional Kenyan specialty dish',
    style: { top: '46%', left: '6%', width: '42%', rotate: -6, z: 25 },
  },
  {
    src: '/bakery-desserts.jpeg',
    alt: 'Assorted bakery desserts and pastries',
    style: { top: '62%', left: '58%', width: '40%', rotate: 5, z: 15 },
  },
  {
    src: '/pizza-pasta.jpeg',
    alt: 'Wood-fired pizza and pasta plate',
    style: { top: '78%', left: '14%', width: '36%', rotate: -4, z: 10 },
  },
] as const;

const StickyNoteCard: React.FC<{
  src: string;
  alt: string;
  top: string;
  left: string;
  width: string;
  rotate: number;
  z: number;
  delay?: number;
}> = ({ src, alt, top, left, width, rotate, z, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 24, rotate: rotate * 1.6 }}
    animate={{ opacity: 1, y: 0, rotate }}
    transition={{ duration: 0.5, ease: 'easeOut', delay }}
    whileHover={{ rotate: 0, scale: 1.05, zIndex: 60 }}
    className="absolute -translate-x-1/2 rounded-xl bg-white p-2 pb-6 shadow-[0_10px_30px_rgba(26,18,11,0.25)] border border-[#e6d3c2] cursor-default"
    style={{ top, left, width, zIndex: z }}
  >
    {/* pin */}
    <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 h-4 w-4 rounded-full bg-gradient-to-br from-[#d4822a] to-[#8c4a1a] shadow-md border border-white/60 z-10" />
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-md bg-[#f8f1e5]">
      <ImageWithSkeleton
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        containerClassName="h-full w-full"
        className="h-full w-full object-cover"
      />
    </div>
  </motion.div>
);

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
    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 sm:from-black/30 via-transparent to-transparent" />
    <div className="pointer-events-none absolute inset-x-0 bottom-0 p-4 sm:p-5">
      <div className="transform translate-y-0 opacity-100 transition duration-300 sm:translate-y-2 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100">
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

const StickyNoteHero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const stackY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const stackScale = useTransform(scrollYProgress, [0, 1], [1, 0.88]);
  const stackOpacity = useTransform(scrollYProgress, [0, 0.85, 1], [1, 1, 0]);
  const headingOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const headingY = useTransform(scrollYProgress, [0, 0.6], [0, -40]);

  return (
    <div ref={heroRef} className="relative h-[130vh]">
      <div className="sticky top-0 h-[85vh] sm:h-[80vh] overflow-hidden bg-[#fdfaf3]">
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, #1a120b 1px, transparent 0)',
            backgroundSize: '22px 22px',
          }}
        />

        <motion.div
          style={{ opacity: headingOpacity, y: headingY }}
          className="relative z-40 pt-8 sm:pt-10 text-center px-6"
        >
          <span className="text-[10px] font-black uppercase tracking-widest text-[#8c7a6c]">
            GALLERY
          </span>
          <h1 className="font-serif font-black text-3xl sm:text-4xl lg:text-5xl text-[#1a120b] mt-3 leading-tight">
            Inside BakeMart
          </h1>
          <p className="mt-3 max-w-md mx-auto text-sm sm:text-base text-[#5c4b3f] leading-relaxed">
            A glimpse into our open-kitchen coffee shop — pinned up, just like the good moments.
          </p>
        </motion.div>

        <motion.div
          style={{ y: stackY, scale: stackScale, opacity: stackOpacity }}
          className="relative mx-auto mt-4 h-[48vh] sm:h-[52vh] max-w-sm sm:max-w-lg"
        >
          {heroStack.map((card, i) => (
            <StickyNoteCard
              key={card.src}
              src={card.src}
              alt={card.alt}
              top={card.style.top}
              left={card.style.left}
              width={card.style.width}
              rotate={card.style.rotate}
              z={card.style.z}
              delay={i * 0.08}
            />
          ))}
        </motion.div>

        <motion.div
          style={{ opacity: headingOpacity }}
          className="absolute bottom-4 sm:bottom-6 inset-x-0 flex justify-center z-40"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-[#1a120b] text-white px-5 py-2.5 text-xs font-bold uppercase tracking-widest shadow-lg">
            Scroll to explore ↓
          </span>
        </motion.div>
      </div>
    </div>
  );
};

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
      <StickyNoteHero />

      {/* This section's opaque background is what makes the pinned stack
          above appear to slide away and disappear behind it while scrolling. */}
      <div className="relative z-30 bg-[#fdfaf3] rounded-t-[32px] shadow-[0_-20px_40px_rgba(26,18,11,0.08)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-12 lg:pt-14">
          {/* Category Filter */}
          <div className="sticky top-0 z-20 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-4 bg-[#fdfaf3]/95 backdrop-blur-sm border-b border-[#e6d3c2]/70">
            <div className="flex flex-wrap gap-2">
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
          </div>

          {/* Gallery Grid */}
          <div className="mt-8 space-y-6">
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
    </div>
  );
};