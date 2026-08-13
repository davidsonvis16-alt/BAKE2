import React from 'react';

interface HamburgerIconProps {
  isOpen: boolean;
  onClick?: () => void;
}

export const HamburgerIcon: React.FC<HamburgerIconProps> = ({ isOpen, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="lg:hidden p-2 rounded-full hover:bg-[#f5efe7] text-[#000000] transition-colors relative w-10 h-10 flex items-center justify-center"
      title="Menu"
      aria-label={isOpen ? 'Close menu' : 'Open menu'}
    >
      <div className="relative w-5 h-5">
        {/* Top line - offset left, slightly rotated */}
        <span
          className={`absolute left-0 h-[2px] w-5 bg-current rounded-full transition-all duration-300 ease-in-out ${
            isOpen ? 'top-[10px] rotate-[40deg] origin-left' : 'top-0'
          }`}
        />
        {/* Middle line - shorter, offset right, slightly rotated */}
        <span
          className={`absolute left-[3px] h-[2px] w-3 bg-current rounded-full transition-all duration-300 ease-in-out ${
            isOpen ? 'top-[10px] opacity-0 scale-x-0' : 'top-[9px]'
          }`}
        />
        {/* Bottom line - offset left, slightly rotated opposite direction */}
        <span
          className={`absolute left-0 h-[2px] w-5 bg-current rounded-full transition-all duration-300 ease-in-out ${
            isOpen ? 'bottom-[10px] -rotate-[40deg] origin-left' : 'bottom-0'
          }`}
        />
      </div>
    </button>
  );
};
