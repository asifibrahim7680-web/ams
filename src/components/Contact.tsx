import React, { useState } from 'react';
import { Mail, MapPin, Phone, Send, CheckCircle2, MessageSquare, ExternalLink, Sparkles } from 'lucide-react';
import { SITE_DATA } from '../data/siteData';

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

  return (
    <section id="contact" className="relative py-16 sm:py-24 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900 border border-white/20 text-zinc-300 text-xs font-mono uppercase mb-3 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-white" />
          <span>{SITE_DATA.contact.label}</span>
        </div>

        <h2 className="font-heading font-black text-3xl sm:text-5xl text-white tracking-tight uppercase">
          {SITE_DATA.contact.heading}
        </h2>

        <p className="text-zinc-300 text-sm sm:text-base mt-3 leading-relaxed">
          {SITE_DATA.contact.sub}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Channels & Venue */}
        <div className="lg:col-span-6 space-y-6">
          {/* Quick Channels Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {SITE_DATA.contact.channels.slice(0, 4).map((ch) => (
              <div
                key={ch.key}
                className="p-5 rounded-2xl bg-zinc-950 border border-white/15 flex flex-col justify-between"
              >
                <div>
                  <span className="font-mono text-xs text-zinc-400 uppercase tracking-wider block mb-1">
                    {ch.label}
                  </span>
                  <div className="font-heading font-bold text-white text-base truncate">
                    {ch.value}
                  </div>
                </div>
                <div className="mt-3 text-[11px] font-mono text-zinc-400">
                  {ch.hint}
                </div>
              </div>
            ))}
          </div>

          {/* Venue Card */}
          <div className="p-6 rounded-3xl bg-zinc-950 border border-white/15">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-white/15 flex items-center justify-center text-white shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <span className="font-mono text-xs text-zinc-400 uppercase">Event Venue</span>
                <h4 className="font-heading font-bold text-base text-white">
                  {SITE_DATA.college}
                </h4>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-4">
              {SITE_DATA.campusAddress}
            </p>
            <div className="flex flex-wrap gap-2 text-xs font-mono text-zinc-300">
              <span className="px-3 py-1 rounded-full bg-zinc-900 border border-white/15">
                Avadi IAF, Chennai
              </span>
              <span className="px-3 py-1 rounded-full bg-zinc-900 border border-white/15">
                Pincode: 600055
              </span>
              <span className="px-3 py-1 rounded-full bg-zinc-900 border border-white/15">
                Tamil Nadu, India
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Direct Message Form */}
        <div className="lg:col-span-6">
          <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/20 bg-zinc-950/90 shadow-xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-white/15 flex items-center justify-center text-white">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-heading font-black text-xl text-white">
                  Send a Query
                </h3>
                <p className="text-xs text-zinc-400">
                  Direct inquiry to the AMSFROST 2026 organizing desk
                </p>
              </div>
            </div>

            {submitted ? (
              <div className="py-10 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-white mx-auto" />
                <h4 className="font-heading font-bold text-lg text-white">
                  Message Sent Successfully
                </h4>
                <p className="text-xs text-zinc-400 max-w-sm mx-auto">
                  Thank you! Our student coordinating team will respond to your registered email address shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono text-zinc-300 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-white/15 text-white text-xs sm:text-sm focus:border-white focus:outline-none transition"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-zinc-300 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="student@college.edu"
                      className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-white/15 text-white text-xs sm:text-sm focus:border-white focus:outline-none transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-zinc-300 mb-1">
                      Phone / WhatsApp
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-white/15 text-white text-xs sm:text-sm focus:border-white focus:outline-none transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-zinc-300 mb-1">
                    Your Query / Message *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.query}
                    onChange={(e) => setFormData({ ...formData, query: e.target.value })}
                    placeholder="Ask regarding team composition, competition tracks, hardware bench guidelines, or campus directions..."
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-white/15 text-white text-xs sm:text-sm focus:border-white focus:outline-none transition resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full btn-neon-primary py-3 px-6 rounded-xl font-bold text-xs text-black flex items-center justify-center gap-2 uppercase tracking-wider shadow-lg transition-all"
                >
                  <span>Transmit Query</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
