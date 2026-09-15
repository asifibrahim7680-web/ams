import React, { useState } from 'react';
import { Mail, MapPin, User, Send, CheckCircle2, Phone, MessageSquare, Terminal, ExternalLink } from 'lucide-react';

export const Contact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', query: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.query) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', phone: '', query: '' });
    }, 4000);
  };

  const studentCoordinators = [
    {
      name: 'Aditya Verma',
      role: 'Overall Student Lead',
      phone: '+91 98765 43210',
      whatsapp: '919876543210',
    },
    {
      name: 'Sneha Kulkarni',
      role: 'Hardware Track Lead',
      phone: '+91 98765 43211',
      whatsapp: '919876543211',
    },
    {
      name: 'Rahul Sharma',
      role: 'Software & Open Domain Lead',
      phone: '+91 98765 43212',
      whatsapp: '919876543212',
    },
  ];

  return (
    <section id="contact" className="relative py-14 sm:py-20 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900 border border-white/20 text-white text-xs font-mono-tech uppercase mb-3 shadow-sm">
          <Terminal className="w-3.5 h-3.5 text-white" />
          <span>DIRECT COORDINATION</span>
        </div>

        <h2 className="font-heading font-black text-3xl sm:text-5xl text-white tracking-tight uppercase">
          CONTACT &amp; <span className="text-white drop-shadow-[0_0_12px_rgba(255,255,255,0.4)]">VENUE</span>
        </h2>

        <p className="text-zinc-300 text-sm sm:text-base mt-3 leading-relaxed">
          Need assistance with registration, hardware bench requirements, or directions to campus? Reach out directly to our student and faculty leads.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Student Coordinators & Venue info */}
        <div className="lg:col-span-7 space-y-6">
          {/* Student Coordinators Card */}
          <div className="glass-panel rounded-2xl p-6 border border-white/20 shadow-sm bg-zinc-950/80">
            <div className="flex items-center gap-2 mb-4">
              <User className="w-5 h-5 text-white" />
              <h3 className="font-heading font-black text-lg text-white uppercase">
                STUDENT COORDINATORS
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {studentCoordinators.map((coord, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-zinc-900 border border-white/10 flex flex-col justify-between"
                >
                  <div>
                    <div className="font-heading font-bold text-sm text-white">{coord.name}</div>
                    <div className="text-[11px] text-zinc-400 font-mono-tech mt-0.5">{coord.role}</div>
                  </div>

                  <div className="mt-3 pt-2 border-t border-white/10 flex items-center gap-2">
                    <a
                      href={`tel:${coord.phone}`}
                      className="p-1.5 rounded-lg bg-zinc-800 hover:bg-white hover:text-black text-white transition flex items-center justify-center flex-1 text-[11px] font-bold"
                      title="Call Coordinator"
                    >
                      <Phone className="w-3 h-3 mr-1" /> Call
                    </a>
                    <a
                      href={`https://wa.me/${coord.whatsapp}?text=Hello%20${encodeURIComponent(coord.name)},%20I%20have%20a%20query%20about%20FROST%20Hacks`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 transition flex items-center justify-center flex-1 text-[11px] font-bold"
                      title="WhatsApp Coordinator"
                    >
                      <MessageSquare className="w-3 h-3 mr-1" /> Chat
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Faculty & Venue Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Campus Venue */}
            <div className="glass-panel rounded-2xl p-5 border border-white/20 shadow-sm flex flex-col justify-between bg-zinc-950/80">
              <div>
                <div className="flex items-center gap-2 text-white mb-2">
                  <MapPin className="w-5 h-5" />
                  <span className="font-mono-tech text-xs font-bold uppercase tracking-wider">
                    HACKATHON VENUE
                  </span>
                </div>
                <h4 className="font-heading font-black text-base text-white">
                  College Campus Tech Arena
                </h4>
                <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                  Department of Computer Science &amp; Robotics, Central High-Tech Labs &amp; Maker Spaces.
                </p>
                <p className="text-[11px] text-zinc-400 font-mono-tech mt-2">
                  Autonomous Institution • Main Auditorium &amp; Labs
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-white/10">
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-white hover:underline"
                >
                  <span>View on Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Electronic Helpdesk */}
            <div className="glass-panel rounded-2xl p-5 border border-white/20 shadow-sm flex flex-col justify-between bg-zinc-950/80">
              <div>
                <div className="flex items-center gap-2 text-white mb-2">
                  <Mail className="w-5 h-5" />
                  <span className="font-mono-tech text-xs font-bold uppercase tracking-wider">
                    OFFICIAL HELPDESK
                  </span>
                </div>
                <h4 className="font-heading font-black text-base text-white">
                  Electronic Mail Dispatch
                </h4>
                <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                  Send your official inquiries regarding sponsorship, registration verification, or special hardware lab accommodations.
                </p>
                <div className="text-xs font-mono-tech font-bold text-white mt-2">
                  support@frosthacks.tech
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-white/10 text-[11px] text-zinc-500">
                Turnaround: Under 6 hours
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Query Form */}
        <div className="lg:col-span-5">
          <div className="glass-panel rounded-2xl p-6 sm:p-7 border border-white/20 shadow-md bg-zinc-950/90">
            <div className="flex items-center gap-2 mb-2">
              <MessageSquare className="w-5 h-5 text-white" />
              <h3 className="font-heading font-black text-xl text-white">
                Send Quick Query
              </h3>
            </div>
            <p className="text-xs text-zinc-400 mb-5">
              Transmit a direct message to our coordinator desk.
            </p>

            {submitted ? (
              <div className="p-6 rounded-xl bg-zinc-900 border border-white/30 text-center my-6">
                <CheckCircle2 className="w-10 h-10 text-white mx-auto mb-2" />
                <h4 className="font-heading font-bold text-base text-white">
                  Transmission Dispatched!
                </h4>
                <p className="text-xs text-zinc-400 mt-1">
                  Your query has been logged. A student coordinator will get back to you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3.5">
                <div>
                  <label className="font-mono-tech text-[11px] text-zinc-400 font-bold block mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Priyanshu Das"
                    className="w-full px-3.5 py-2 rounded-xl bg-zinc-900 border border-white/20 text-white placeholder-zinc-500 focus:outline-none focus:border-white text-xs font-sans shadow-sm"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-mono-tech text-[11px] text-zinc-400 font-bold block mb-1">
                      College Email
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="priyanshu@college.edu"
                      className="w-full px-3.5 py-2 rounded-xl bg-zinc-900 border border-white/20 text-white placeholder-zinc-500 focus:outline-none focus:border-white text-xs font-sans shadow-sm"
                    />
                  </div>
                  <div>
                    <label className="font-mono-tech text-[11px] text-zinc-400 font-bold block mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full px-3.5 py-2 rounded-xl bg-zinc-900 border border-white/20 text-white placeholder-zinc-500 focus:outline-none focus:border-white text-xs font-sans shadow-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-mono-tech text-[11px] text-zinc-400 font-bold block mb-1">
                    Message / Question
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={formData.query}
                    onChange={(e) => setFormData({ ...formData, query: e.target.value })}
                    placeholder="Ask about problem statements, hardware benches, arrival time..."
                    className="w-full px-3.5 py-2 rounded-xl bg-zinc-900 border border-white/20 text-white placeholder-zinc-500 focus:outline-none focus:border-white text-xs font-sans resize-none shadow-sm"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full btn-neon-primary py-3 rounded-xl font-mono-tech text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 text-black bg-white"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>DISPATCH QUERY</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
