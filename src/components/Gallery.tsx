import React from 'react';

export const Gallery: React.FC = () => {
  const images = [
    { src: '/open-kitchen.jpeg', alt: 'Open Kitchen' },
    { src: '/pizza-pasta.jpeg', alt: 'Pizza & Pasta' },
    { src: '/bbq-platters.jpeg', alt: 'BBQ Platters' },
    { src: '/bakery-desserts.jpeg', alt: 'Bakery & Desserts' },
    { src: '/breakfast.jpeg', alt: 'Breakfast' },
    { src: '/juices-cocktails.jpeg', alt: 'Juices & Cocktails' },
    { src: '/kienyeji-traditional.jpeg', alt: 'Kienyeji Specials' },
    { src: '/mains-meal.jpeg', alt: 'Main Meals' },
    { src: '/gallery-1.jpg', alt: 'Gallery Image 1' },
    { src: '/gallery-4.jpg', alt: 'Gallery Image 4' },
    { src: '/gallery-5.jpg', alt: 'Gallery Image 5' },
    { src: '/gallery-9.jpg', alt: 'Gallery Image 9' },
    { src: '/gallery-10.jpg', alt: 'Gallery Image 10' },
    { src: '/gallery-11.jpg', alt: 'Gallery Image 11' },
    { src: '/gallery-12.jpg', alt: 'Gallery Image 12' },
    { src: '/gallery-13.jpg', alt: 'Gallery Image 13' },
    { src: '/gallery-14.jpg', alt: 'Gallery Image 14' },
    { src: '/gallery-15.jpg', alt: 'Gallery Image 15' },
  ];

  return (
    <div className="min-h-screen bg-[#FAF3E7] pb-20">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <span className="text-xs uppercase font-extrabold tracking-widest text-[#000000]">
            GALLERY
          </span>
          <h1 className="font-serif font-black text-3xl md:text-4xl text-[#000000] mt-1">
            Inside BakeMart
          </h1>
          <p className="text-xs sm:text-sm text-[#000000]/70 mt-1 max-w-xl">
            A glimpse into our open-kitchen coffee shop in Nakuru City.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {images.map((image, index) => (
            <div
              key={index}
              className="relative aspect-square rounded-2xl overflow-hidden bg-neutral-200 border border-[#000000]/10 shadow-sm"
              style={{ backgroundImage: `url('${encodeURI(image.src)}')`, backgroundSize: 'cover', backgroundPosition: 'center' }}
              title={image.alt}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
