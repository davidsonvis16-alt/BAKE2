import React, { useState } from 'react';

// Base Skeleton Block
export const Skeleton: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div
      className={`animate-pulse rounded-xl bg-[#e6d3c2] ${className}`}
    />
  );
};

// 1. Product Card Skeleton
export const ProductCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl border border-[#e6d3c2] shadow-sm flex flex-col h-full">
      {/* Image area skeleton */}
      <div className="relative w-full aspect-[4/3] bg-[#e6d3c2] animate-pulse">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-[#fdfaf3]/40" />
        </div>
      </div>

      <div className="p-3 sm:p-4 flex flex-col justify-between flex-grow space-y-3">
        {/* Title & Badge */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2 flex-1">
            <Skeleton className="h-4 w-3/5" />
            <Skeleton className="h-3.5 w-14" />
          </div>
          <Skeleton className="h-6 w-6 rounded-full shrink-0" />
        </div>

        {/* Description Lines */}
        <div className="space-y-1.5 mt-2">
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-4/5" />
        </div>

        {/* Option Selector Pill */}
        <div className="mt-3 flex gap-1.5 bg-[#fdfaf3] p-1 rounded-xl border border-[#e6d3c2]">
          <Skeleton className="h-5 flex-1 rounded-lg" />
          <Skeleton className="h-5 flex-1 rounded-lg" />
        </div>

        {/* Bottom Price & Button */}
        <div className="pt-2 border-t border-[#f3e8d8] flex flex-col xs:flex-row items-start xs:items-center justify-between gap-2">
          <div className="space-y-1">
            <Skeleton className="h-2.5 w-10" />
            <Skeleton className="h-4 w-16" />
          </div>
          <Skeleton className="h-8 w-full xs:w-20 rounded-full" />
        </div>
      </div>
    </div>
  );
};

// 2. Category Card Skeleton
export const CategoryCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-[#e6d3c2] shadow-sm flex flex-col justify-between">
      {/* Hero Image Box Skeleton */}
      <div className="relative h-44 sm:h-52 w-full bg-[#e6d3c2] animate-pulse">
        <div className="absolute top-3 right-3">
          <Skeleton className="h-5 w-16 rounded-full bg-[#fdfaf3]/40" />
        </div>
      </div>

      {/* Category Info Skeleton */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Skeleton className="h-5 w-5 rounded-md" />
            <Skeleton className="h-5 w-2/3" />
          </div>
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-3/4" />
        </div>

        {/* Footer info */}
        <div className="pt-3 border-t border-[#f3e8d8] flex flex-col xs:flex-row items-start xs:items-center justify-between gap-2">
          <div className="space-y-1">
            <Skeleton className="h-2.5 w-14" />
            <Skeleton className="h-4 w-14" />
          </div>
          <Skeleton className="h-7 w-full xs:w-24 rounded-full" />
        </div>
      </div>
    </div>
  );
};

// 3. Ticket List Item Skeleton
export const TicketListItemSkeleton: React.FC = () => {
  return (
    <div className="py-3 flex items-center justify-between gap-3 px-2">
      <div className="space-y-1.5 flex-1">
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-3 w-2/3" />
      </div>
      <div className="flex items-center gap-3 shrink-0">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-7 w-16 rounded-lg" />
      </div>
    </div>
  );
};

// 4. Image with Skeleton Loader (Handles smooth image loading without layout pop)
interface ImageWithSkeletonProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  aspectRatioClass?: string;
  containerClassName?: string;
}

export const ImageWithSkeleton: React.FC<ImageWithSkeletonProps> = ({
  src,
  alt,
  className = '',
  containerClassName = '',
  aspectRatioClass = '',
  onError,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <div className={`relative overflow-hidden bg-[#e6d3c2] ${containerClassName}`}>
      {/* Skeleton overlay shown until image is fully loaded */}
      {(!isLoaded || hasError) && (
        <div className="absolute inset-0 bg-gradient-to-r from-[#e6d3c2] via-[#f3e8d8] to-[#e6d3c2] z-10 flex items-center justify-center">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#1a120b]/40">
            BakeMart
          </span>
        </div>
      )}

      <img
        src={src}
        alt={alt}
        onLoad={() => setIsLoaded(true)}
        onError={(e) => {
          setHasError(true);
          setIsLoaded(true);
          if (onError) onError(e);
        }}
        className={`${className} transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        {...props}
      />
    </div>
  );
};
