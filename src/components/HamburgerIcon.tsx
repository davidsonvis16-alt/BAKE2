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
        <span
          className={`absolute left-0 top-0 h-0.5 w-5 bg-current rounded-full transition-all duration-300 ease-in-out ${
            isOpen ? 'top-[9px] rotate-45' : 'top-0'
          }`}
        />
        <span
          className={`absolute left-0 top-[9px] h-0.5 w-5 bg-current rounded-full transition-all duration-300 ease-in-out ${
            isOpen ? 'opacity-0 scale-x-0' : 'opacity-100 scale-x-100'
          }`}
        />
        <span
          className={`absolute left-0 bottom-0 h-0.5 w-5 bg-current rounded-full transition-all duration-300 ease-in-out ${
            isOpen ? 'bottom-[9px] -rotate-45' : 'bottom-0'
          }`}
        />
      </div>
    </button>
  );
};
