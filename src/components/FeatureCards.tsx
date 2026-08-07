import React from 'react';
import { UserPlus, CalendarDays, Ticket } from 'lucide-react';

interface FeatureCardProps {
  title: string;
  description: string;
  buttonText: string;
  onClick: () => void;
  icon: React.ReactNode;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, buttonText, onClick, icon }) => (
  <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#EADECB] flex flex-col gap-3 hover:shadow-md transition-all">
    <div className="w-10 h-10 rounded-full bg-[#000000] flex items-center justify-center text-orange-300">
      {icon}
    </div>
    <div>
      <h3 className="font-serif font-bold text-base text-[#000000]">{title}</h3>
      <p className="text-xs text-[#000000]/70 leading-relaxed mt-1">{description}</p>
    </div>
    <button
      onClick={onClick}
      className="mt-auto w-full bg-[#000000] hover:bg-neutral-800 text-white text-xs font-bold py-2.5 rounded-full transition-all"
    >
      {buttonText}
    </button>
  </div>
);

export const FeatureCards: React.FC = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <FeatureCard
          title="Join Bakemart"
          description="Create your free account to save favourites, track orders, enjoy faster checkout and receive exclusive offers."
          buttonText="Sign Up"
          onClick={() => {}}
          icon={<UserPlus className="w-5 h-5" />}
        />
        <FeatureCard
          title="Book a Table"
          description="Reserve your preferred table in seconds. Choose your date, time and party size before arriving."
          buttonText="Reserve Now"
          onClick={() => {}}
          icon={<CalendarDays className="w-5 h-5" />}
        />
        <FeatureCard
          title="Events & Tickets"
          description="Discover live music, themed dinners, brunch events and exclusive experiences. Book your ticket before they're sold out."
          buttonText="Browse Events"
          onClick={() => {}}
          icon={<Ticket className="w-5 h-5" />}
        />
      </div>
    </section>
  );
};
