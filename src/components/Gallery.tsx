import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useReducedMotion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
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
  { src: '/gallery-16.jpg', alt: 'Cozy dining booths decked out with balloons and roses', category: 'space', label: 'Balloon corner' },
  { src: '/coffee bar.jpeg', alt: 'Open kitchen coffee bar', category: 'coffee', label: 'The coffee bar' },
  { src: '/fresh off the fire.jpeg', alt: 'Wood-fired pizza and pasta plate', category: 'pizza-pasta', label: 'Fresh off the fire' },
  { src: '/happy-hour_1.jpg', alt: 'Bakemart serves happy hour food', category: 'food', label: 'Happy hour!' },
  { src: '/freshly-baked.jpeg', alt: 'Assorted bakery desserts and pastries', category: 'food', label: 'Freshly baked' },
  { src: '/morning specila.jpeg', alt: 'Breakfast spread with coffee and pastries', category: 'food', label: 'Morning spread' },
  { src: '/cold-and-fresh.jpeg', alt: 'Fresh juices and cocktails served cold', category: 'coffee', label: 'Cold + fresh' },
  { src: '/kienyeji-traditional.jpeg', alt: 'Traditional Kenyan specialty dish', category: 'food', label: 'Kienyeji special' },
  { src: '/sunday mains.jpeg', alt: 'Hearty main meal plated with care', category: 'food', label: 'Sunday mains' },
  { src: '/a good momento.jpeg', alt: 'A warm café moment at BakeMart', category: 'moments', label: 'A good moment' },
  { src: '/table setting.jpeg', alt: 'Soft interior lighting and ceramic tableware', category: 'space', label: 'Table setting' },
  { src: '/quiet corner.jpeg', alt: 'Intimate dining corner with warm textures', category: 'space', label: 'Quiet corner' },
  { src: '/plating up.jpeg', alt: 'Chef plating a fresh dish in the kitchen', category: 'moments', label: 'Plating up' },
  { src: '/gallery-10.jpg', alt: 'Interior view with curated seating and warmth', category: 'space', label: 'Where to sit' },
  { src: '/gallery-11.jpg', alt: 'Coffee cup and pastry with a premium finish', category: 'coffee', label: 'Coffee + pastry' },
  { src: '/Golden-hour.jpeg', alt: 'Golden morning light on a café table', category: 'space', label: 'Golden hour' },
  { src: '/goodcompany.jpeg', alt: 'Friends enjoying a meal in the café', category: 'moments', label: 'Good company' },
  { src: '/gallery-16.jpg', alt: 'Café interior with premium materials', category: 'space', label: 'The space' },
  { src: '/close-up.jpeg', alt: 'Close-up of a plated dish and drink', category: 'moments', label: 'Close-up' },
];

// Curated set + placement for the scattered "pinned to the corkboard" hero stack.
const heroStack = [
  {
    src: '/gallery-16.jpg',
    alt: 'Cozy dining booths decked out with balloons and roses',
    label: 'Balloon corner',
    style: { top: '4%', left: '50%', width: '58%', rotate: -3, z: 50 },
  },
  {
    src: '/morning specila.jpeg',
    alt: 'Breakfast spread with coffee and pastries',
    label: 'Morning spread',
    style: { top: '2%', left: '10%', width: '40%', rotate: -9, z: 30 },
  },
  {
    src: '/happy-hour_1.jpg',
    alt: 'Bakemart serves happy hour food',
    label: 'Happy hour!',
    style: { top: '30%', left: '78%', width: '38%', rotate: 8, z: 20 },
  },
  {
    src: '/kienyeji-traditional.jpeg',
    alt: 'Traditional Kenyan specialty dish',
    label: 'Kienyeji special',
    style: { top: '46%', left: '6%', width: '42%', rotate: -6, z: 25 },
  },
  {
    src: '/freshly-baked.jpeg',
    alt: 'Assorted bakery desserts and pastries',
    label: 'Freshly baked',
    style: { top: '62%', left: '58%', width: '40%', rotate: 5, z: 15 },
  },
  {
    src: '/pizza-pasta.jpeg',
    alt: 'Wood-fired pizza and pasta plate',
    label: 'Fresh off the fire',
    style: { top: '78%', left: '14%', width: '36%', rotate: -4, z: 10 },
  },
] as const;

// Washi tape colorways pulled from the brand palette — cycled deterministically per card.
const tapeStyles = [
  'linear-gradient(135deg, rgba(212,163,90,0.9), rgba(212,163,90,0.65))', // gold
  'linear-gradient(135deg, rgba(140,74,26,0.75), rgba(140,74,26,0.55))', // rust
  'linear-gradient(135deg, rgba(230,211,194,0.95), rgba(230,211,194,0.75))', // kraft cream
];

// Deterministic pseudo-random tilt so layout doesn't jitter between renders.
const tiltFor = (i: number) => {
  const pattern = [-3, 2.5, -1.5, 3.5, -2.5, 1.5, -4, 2];
  return pattern[i % pattern.length];
};
const tapeFor = (i: number) => tapeStyles[i % tapeStyles.length];
const tapeRotateFor = (i: number) => (i % 2 === 0 ? -6 : 7);

const Washi: React.FC<{ index: number }> = ({ index }) => (
  <span
    aria-hidden
    className="absolute -top-3 left-1/2 h-6 w-14 -translate-x-1/2 rounded-[2px] shadow-sm"
    style={{
      background: tapeFor(index),
      transform: `translateX(-50%) rotate(${tapeRotateFor(index)}deg)`,
    }}
  />
);

const StickyNoteCard: React.FC<{
  src: string;
  alt: string;
  label: string;
  top: string;
  left: string;
  width: string;
  rotate: number;
  z: number;
  delay?: number;
  index: number;
  reduceMotion: boolean;
  onClick: () => void;
}> = ({ src, alt, label, top, left, width, rotate, z, delay = 0, index, reduceMotion, onClick }) => (
  <motion.button
    type="button"
    onClick={onClick}
    initial={reduceMotion ? false : { opacity: 0, y: 24, rotate: rotate * 1.6 }}
    animate={{ opacity: 1, y: 0, rotate }}
    transition={{ duration: 0.5, ease: 'easeOut', delay: reduceMotion ? 0 : delay }}
    whileHover={reduceMotion ? undefined : { rotate: 0, scale: 1.06, zIndex: 60 }}
    className="absolute -translate-x-1/2 rounded-sm bg-white p-2 pb-7 shadow-[0_10px_30px_rgba(26,18,11,0.25)] border border-[#e6d3c2] text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#000000]"
    style={{ top, left, width, zIndex: z }}
    aria-label={`Open photo: ${label}`}
  >
    <Washi index={index} />
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[2px] bg-[#f8f1e5]">
      <ImageWithSkeleton
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        containerClassName="h-full w-full"
        className="h-full w-full object-cover"
      />
    </div>
    <p className="mt-2 text-center text-[15px] leading-none text-[#000000]" style={{ fontFamily: "'Caveat', cursive" }}>
      {label}
    </p>
  </motion.button>
);

const StickyNoteHero: React.FC<{ onOpen: (src: string) => void }> = ({ onOpen }) => {
  const heroRef = useRef<HTMLDivElement>(null);
  const reduceMotion = !!useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const stackY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const stackScale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);
  const stackOpacity = useTransform(scrollYProgress, [0.55, 1], [1, 0]);
  const headingOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0]);
  const headingY = useTransform(scrollYProgress, [0, 0.5], [0, -40]);

  return (
    <div ref={heroRef} className="relative h-[105vh] sm:h-[108vh]">
      <div className="sticky top-0 h-[85vh] sm:h-[80vh] overflow-hidden bg-[#fdfaf3]">
        {/* corkboard texture */}
        <div
          className="absolute inset-0 opacity-[0.05] pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, #8c4a1a 1px, transparent 0)',
            backgroundSize: '20px 20px',
          }}
        />
        <div className="absolute inset-0 pointer-events-none" style={{ boxShadow: 'inset 0 0 120px rgba(92,74,52,0.12)' }} />

        <motion.div
          style={reduceMotion ? undefined : { opacity: headingOpacity, y: headingY }}
          className="relative z-40 pt-8 sm:pt-10 text-center px-6"
        >
          <span className="text-[10px] font-black uppercase tracking-widest text-[#8c7a6c]">
            GALLERY
          </span>
          <h1 className="text-charcoal-lg font-black text-3xl sm:text-4xl lg:text-5xl text-[#000000] mt-3 leading-tight">
            The Wall Behind the Counter
          </h1>
          <p className="mt-3 max-w-md mx-auto text-sm sm:text-base text-[#5c4b3f] leading-relaxed">
            Every photo we've pinned up — the mornings, the plates, the regulars. Tap one to look closer.
          </p>
        </motion.div>

        <motion.div
          style={reduceMotion ? undefined : { y: stackY, scale: stackScale, opacity: stackOpacity }}
          className="relative mx-auto mt-4 h-[48vh] sm:h-[52vh] max-w-sm sm:max-w-lg"
        >
          {heroStack.map((card, i) => (
            <StickyNoteCard
              key={card.src}
              src={card.src}
              alt={card.alt}
              label={card.label}
              top={card.style.top}
              left={card.style.left}
              width={card.style.width}
              rotate={card.style.rotate}
              z={card.style.z}
              delay={i * 0.08}
              index={i}
              reduceMotion={reduceMotion}
              onClick={() => onOpen(card.src)}
            />
          ))}
        </motion.div>

        <motion.div
          style={reduceMotion ? undefined : { opacity: headingOpacity }}
          className="absolute bottom-4 sm:bottom-6 inset-x-0 flex justify-center z-40"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-[#000000] text-white px-5 py-2.5 text-xs font-bold uppercase tracking-widest shadow-lg">
            Scroll to explore ↓
          </span>
        </motion.div>
      </div>
    </div>
  );
};

const CorkCard: React.FC<{
  src: string;
  alt: string;
  label: string;
  index: number;
  onClick: () => void;
}> = ({ src, alt, label, index, onClick }) => (
  <motion.button
    type="button"
    onClick={onClick}
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-40px' }}
    transition={{ duration: 0.4, ease: 'easeOut' }}
    whileHover={{ rotate: 0, scale: 1.03, zIndex: 20 }}
    className="group relative mb-4 sm:mb-6 w-full break-inside-avoid rounded-sm bg-white p-2.5 pb-8 shadow-[0_8px_20px_rgba(26,18,11,0.15)] border border-[#e6d3c2] text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#000000]"
    style={{ transform: `rotate(${tiltFor(index)}deg)` }}
    aria-label={`Open photo: ${label}`}
  >
    <Washi index={index} />
    <div className="relative overflow-hidden rounded-[2px] bg-[#f8f1e5]">
      <ImageWithSkeleton
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        containerClassName="w-full overflow-hidden bg-[#f8f1e5]"
        className="w-full h-auto object-cover transition duration-500 group-hover:scale-105"
      />
    </div>
    <p
      className="mt-2.5 text-center text-lg leading-none text-[#000000]"
      style={{ fontFamily: "'Caveat', cursive" }}
    >
      {label}
    </p>
  </motion.button>
);

const Lightbox: React.FC<{
  images: { src: string; alt: string; label: string }[];
  index: number;
  onClose: () => void;
  onNavigate: (nextIndex: number) => void;
}> = ({ images, index, onClose, onNavigate }) => {
  const current = images[index];

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNavigate((index + 1) % images.length);
      if (e.key === 'ArrowLeft') onNavigate((index - 1 + images.length) % images.length);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [index, images.length, onClose, onNavigate]);

  if (!current) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#000000]/95 backdrop-blur-sm px-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={current.label}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute top-4 right-4 sm:top-6 sm:right-6 z-10 rounded-full bg-white/10 hover:bg-white/20 text-white p-2.5 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
        aria-label="Close"
      >
        <X className="w-5 h-5" />
      </button>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onNavigate((index - 1 + images.length) % images.length);
        }}
        className="absolute left-2 sm:left-6 z-10 rounded-full bg-white/10 hover:bg-white/20 text-white p-2.5 sm:p-3 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
        aria-label="Previous photo"
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onNavigate((index + 1) % images.length);
        }}
        className="absolute right-2 sm:right-6 z-10 rounded-full bg-white/10 hover:bg-white/20 text-white p-2.5 sm:p-3 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
        aria-label="Next photo"
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      <motion.div
        key={current.src}
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.25 }}
        className="relative max-w-3xl w-full flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="max-h-[75vh] w-full overflow-hidden rounded-md border border-white/10 bg-[#0f0a06]">
          <img src={current.src} alt={current.alt} className="w-full h-full max-h-[75vh] object-contain" />
        </div>
        <p
          className="mt-4 text-2xl text-white/90"
          style={{ fontFamily: "'Caveat', cursive" }}
        >
          {current.label}
        </p>
        <p className="mt-1 text-xs text-white">
          {index + 1} / {images.length}
        </p>
      </motion.div>
    </motion.div>
  );
};

export const Gallery: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

  const filteredImages = useMemo(() => {
    if (selectedCategory === 'all') return galleryImages;
    return galleryImages.filter((image) => image.category === selectedCategory);
  }, [selectedCategory]);

  // Lightbox can be opened from the hero (which may show images outside the
  // current filter), so build its navigation list from whichever set is relevant.
  const lightboxSource = useMemo(() => {
    if (!lightboxSrc) return filteredImages;
    const inFiltered = filteredImages.some((img) => img.src === lightboxSrc);
    return inFiltered ? filteredImages : galleryImages;
  }, [lightboxSrc, filteredImages]);

  const lightboxIndex = useMemo(
    () => lightboxSource.findIndex((img) => img.src === lightboxSrc),
    [lightboxSource, lightboxSrc]
  );

  return (
    <div className="min-h-screen bg-[#fdfaf3] pb-20">
      <StickyNoteHero onOpen={setLightboxSrc} />

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
                        ? 'bg-[#000000] text-white border-[#000000]'
                        : 'bg-white text-[#000000] border-[#e6d3c2] hover:border-[#000000]'
                    }`}
                  >
                    {category.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Corkboard Wall */}
          <div className="mt-10 columns-2 sm:columns-3 lg:columns-4 gap-4 sm:gap-6">
            {filteredImages.map((image, i) => (
              <CorkCard
                key={image.src}
                src={image.src}
                alt={image.alt}
                label={image.label}
                index={i}
                onClick={() => setLightboxSrc(image.src)}
              />
            ))}
          </div>

          {filteredImages.length === 0 && (
            <p className="mt-10 text-center text-sm text-[#8c7a6c]">
              Nothing pinned here yet — try another category.
            </p>
          )}

          {/* Closing Statement */}
          <div className="mt-16 pt-12 border-t border-[#e6d3c2]">
            <div className="max-w-2xl">
              <span className="text-[10px] font-black uppercase tracking-widest text-[#8c7a6c]">
                SEE YOU AT BAKEMART
              </span>
              <h2 className="mt-4 text-charcoal font-black text-3xl sm:text-4xl text-[#000000] leading-tight">
                Come hungry. Leave happy.
              </h2>
              <p className="mt-4 text-sm sm:text-base text-[#5c4b3f] leading-relaxed">
                A beautiful coffee house is built from the food, the space, and the moments in between.
              </p>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {lightboxSrc && lightboxIndex >= 0 && (
          <Lightbox
            images={lightboxSource}
            index={lightboxIndex}
            onClose={() => setLightboxSrc(null)}
            onNavigate={(nextIndex) => setLightboxSrc(lightboxSource[nextIndex].src)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};