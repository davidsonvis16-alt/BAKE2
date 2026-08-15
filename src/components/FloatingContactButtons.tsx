import React from 'react';

interface ContactButton {
  href: string;
  icon: string;
  label: string;
  bgColor: string;
  target?: string;
  rel?: string;
}

export const FloatingContactButtons: React.FC = () => {
  const buttons: ContactButton[] = [
    {
      href: 'https://wa.me/254725009708?text=Hello%20BakeMart%20Coffee%20House,%20I%20would%20like%20to%20order...',
      icon: '/icons/whatsapp.svg',
      label: 'WhatsApp',
      bgColor: '#25D366',
      target: '_blank',
      rel: 'noreferrer',
    },
    {
      href: 'mailto:Salesbakemart.co.ke@gmail.com',
      icon: '/icons/chat.svg',
      label: 'Email',
      bgColor: '#d97a4c',
    },
    {
      href: 'tel:+254725009708',
      icon: '/icons/phone.svg',
      label: 'Call',
      bgColor: '#000000',
    },
  ];

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-3 lg:hidden">
      {buttons.map((btn) => (
        <a
          key={btn.label}
          href={btn.href}
          target={btn.target}
          rel={btn.rel}
          aria-label={btn.label}
          className="group relative w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-transform active:scale-90 hover:scale-110"
          style={{ backgroundColor: btn.bgColor }}
        >
          <img
            src={btn.icon}
            alt={btn.label}
            className="w-6 h-6 object-contain"
          />
          <span className="absolute right-full mr-2 bg-black text-white text-[10px] font-bold px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            {btn.label}
          </span>
        </a>
      ))}
    </div>
  );
};
