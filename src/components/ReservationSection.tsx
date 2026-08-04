import React, { useState } from 'react';
import { Calendar, Clock, Users, Phone, User, MessageSquare, CheckCircle2 } from 'lucide-react';
import { ReservationFormData } from '../types';

export const ReservationSection: React.FC = () => {
  const [formData, setFormData] = useState<ReservationFormData>({
    name: '',
    phone: '',
    email: '',
    date: new Date().toISOString().split('T')[0],
    time: '12:00',
    guests: 2,
    specialRequests: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Construct formatted WhatsApp reservation message
    const message = `*TABLE RESERVATION - BAKEMART COFFEE HOUSE*
----------------------------------
*Name:* ${formData.name}
*Phone:* ${formData.phone}
*Date:* ${formData.date}
*Time:* ${formData.time}
*Guests:* ${formData.guests} Person(s)
${formData.specialRequests ? `*Special Request:* ${formData.specialRequests}\n` : ''}
*Location:* BakeMart Coffee House, Tropical House, Watalii Rd, Nakuru City`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/254725009708?text=${encodedMessage}`;

    // Open WhatsApp
    window.open(whatsappUrl, '_blank');
    setSubmitted(true);
  };

  return (
    <section id="reservation" className="py-10 px-4 max-w-7xl mx-auto scroll-mt-20">
      <div className="bg-[#000000] text-white rounded-2xl p-6 sm:p-10 border border-neutral-800 shadow-lg relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          
          {/* Left Description */}
          <div className="lg:col-span-5 space-y-4 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-[#000000] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              <span>Open Kitchen Dining</span>
            </div>

            <h2 className="font-serif font-bold text-2xl sm:text-3xl lg:text-4xl text-[#FAF3E7] leading-tight">
              Reserve Your Table <br />
              <span className="text-orange-300 font-serif italic font-normal">
                at BakeMart Coffee House
              </span>
            </h2>

            <p className="text-orange-200/80 text-xs sm:text-sm leading-relaxed">
              Planning a coffee date, family meal, or business lunch in Nakuru City? Book a table in advance. Your reservation details will be sent directly to our team via WhatsApp.
            </p>

            <div className="space-y-2.5 pt-2 text-xs text-orange-300">
              <div className="flex items-center gap-2 justify-center lg:justify-start">
                <Clock className="w-4 h-4 text-orange-500" />
                <span>Open Daily: 7:00 AM – 8:00 PM</span>
              </div>
              <div className="flex items-center gap-2 justify-center lg:justify-start">
                <Phone className="w-4 h-4 text-[#000000]" />
                <span>Direct Line: 0725 009708</span>
              </div>
            </div>
          </div>

          {/* Right Form */}
          <div className="lg:col-span-7 bg-[#FAF3E7] text-[#000000] p-6 sm:p-8 rounded-2xl shadow-lg border border-[#EADECB]">
            {submitted ? (
              <div className="text-center py-8 space-y-3">
                <CheckCircle2 className="w-12 h-12 text-[#000000] mx-auto animate-bounce" />
                <h3 className="font-display font-bold text-xl text-[#000000]">
                  Reservation Sent to WhatsApp!
                </h3>
                <p className="text-xs text-[#000000] max-w-sm mx-auto">
                  Thank you, {formData.name}. We look forward to hosting you at Tropical House, Watalii Rd!
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 bg-[#000000] text-white text-xs font-bold px-5 py-2.5 rounded-full hover:bg-[#000000] transition-colors"
                >
                  Book Another Table
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="font-display font-bold text-lg text-[#000000] border-b border-[#EADECB] pb-2">
                  Table Reservation Details
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-[#000000] mb-1">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#000000]" />
                      <input
                        type="text"
                        required
                        placeholder="e.g. Jane Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-white border border-[#D8C7B0] focus:border-[#000000] text-xs text-[#000000] rounded-xl pl-9 pr-3 py-2.5 outline-hidden"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#000000] mb-1">
                      WhatsApp Phone *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#000000]" />
                      <input
                        type="tel"
                        required
                        placeholder="e.g. 0712 345 678"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-white border border-[#D8C7B0] focus:border-[#000000] text-xs text-[#000000] rounded-xl pl-9 pr-3 py-2.5 outline-hidden"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-[#000000] mb-1">
                      Date *
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#000000]" />
                      <input
                        type="date"
                        required
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="w-full bg-white border border-[#D8C7B0] focus:border-[#000000] text-xs text-[#000000] rounded-xl pl-9 pr-2 py-2.5 outline-hidden"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#000000] mb-1">
                      Time *
                    </label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#000000]" />
                      <input
                        type="time"
                        required
                        value={formData.time}
                        onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                        className="w-full bg-white border border-[#D8C7B0] focus:border-[#000000] text-xs text-[#000000] rounded-xl pl-9 pr-2 py-2.5 outline-hidden"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#000000] mb-1">
                      Guests *
                    </label>
                    <div className="relative">
                      <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#000000]" />
                      <select
                        value={formData.guests}
                        onChange={(e) => setFormData({ ...formData, guests: Number(e.target.value) })}
                        className="w-full bg-white border border-[#D8C7B0] focus:border-[#000000] text-xs text-[#000000] rounded-xl pl-9 pr-3 py-2.5 outline-hidden"
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12, 15, 20].map((num) => (
                          <option key={num} value={num}>
                            {num} {num === 1 ? 'Guest' : 'Guests'}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#000000] mb-1">
                    Special Request (Optional)
                  </label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-[#000000]" />
                    <textarea
                      rows={2}
                      placeholder="High chair needed, birthday cake arrangement, quiet corner..."
                      value={formData.specialRequests}
                      onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                      className="w-full bg-white border border-[#D8C7B0] focus:border-[#000000] text-xs text-[#000000] rounded-xl pl-9 pr-3 py-2 outline-hidden resize-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#000000] hover:bg-[#000000] text-white font-bold text-sm py-3 rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4 fill-white" />
                  <span>Confirm Reservation via WhatsApp</span>
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};
