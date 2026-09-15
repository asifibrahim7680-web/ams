import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';
import { FaqItem } from '../types';

export const Faq: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>('faq-1');

  const faqs: FaqItem[] = [
    {
      id: 'faq-1',
      question: '1. What is FROST Hacks and who can participate?',
      answer:
        'FROST Hacks is a national-level, high-octane 12-hour college hackathon organized for student innovators, developers, and hardware makers. Any bona fide undergraduate or postgraduate student (B.E., B.Tech, B.Sc, BCA, M.Tech, MCA, etc.) from any recognized college or university across India is eligible with a valid student ID card.',
    },
    {
      id: 'faq-2',
      question: '2. Can Open Domain teams use BOTH Software and Hardware?',
      answer:
        'YES, absolutely! The Open Domain track is specially architected with dual & hybrid support. Teams can build pure software, pure hardware, or an interdisciplinary hybrid system (e.g. IoT sensors connected to a web/mobile cloud dashboard). There is NO fixed problem statement—bring your own innovative idea!',
    },
    {
      id: 'faq-3',
      question: '3. What is the team size and can we form cross-college teams?',
      answer:
        'Teams must consist of 2 to 4 members. Interdisciplinary (e.g., CSE + ECE + Mech), cross-departmental, inter-year, and cross-college team formations are completely permitted and actively encouraged.',
    },
    {
      id: 'faq-4',
      question: '4. What is the registration fee and what does it cover?',
      answer:
        'The registration fee is ₹200 per head (e.g., ₹600 for a 3-member team, ₹800 for a 4-member team). The fee includes full hackathon delegate entry, high-speed Wi-Fi, hardware lab workbench access, all complimentary meals (lunch, evening tea, dinner, midnight refuels), official participant kits, and verified certificates.',
    },
    {
      id: 'faq-5',
      question: '5. What is the total prize pool and how are prizes awarded?',
      answer:
        'The total prize pool is ₹25,000 in cash rewards, along with grand winner trophies, medals, merit certificates, sponsor gift hampers, and fast-track paid corporate internship opportunities at partner tech firms like Wyntrix Innovation.',
    },
    {
      id: 'faq-6',
      question: '6. Do hardware track teams need to bring their own components?',
      answer:
        'Teams should bring their primary development boards (Arduino, ESP32, Raspberry Pi, STM32, sensor modules, etc.) and laptops. The host institution will provide workbench lab stations, power extension strips, soldering equipment, basic test instruments (DMM, CRO), and technical lab assistance.',
    },
    {
      id: 'faq-7',
      question: '7. How will projects be evaluated during the hackathon?',
      answer:
        'Evaluation is conducted in multiple transparent stages: Mentor Review 1 (Architecture & Feasibility), Mentor Review 2 (Midpoint Working Demo Check), and the Grand Jury Evaluation (Final live demo, code commits audit, UI/UX polish, and Q&A). Scoring is based on Novelty (25%), Technical Complexity (30%), Practical Viability (25%), and Presentation (20%).',
    },
    {
      id: 'faq-8',
      question: '8. How do we register and confirm our team slot?',
      answer:
        'Click the "REGISTER NOW" button in the top navbar or hero section. Fill in your team details, leader and member contacts, and select your competition track. Complete the nominal registration payment to receive an instant Team ID and dashboard confirmation code.',
    },
  ];

  return (
    <section id="faq" className="relative py-14 sm:py-20 px-3 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900 border border-white/20 text-white text-xs font-mono-tech uppercase mb-3 shadow-sm">
          <HelpCircle className="w-3.5 h-3.5 text-white" />
          <span>KNOWLEDGE BASE &amp; QUERIES</span>
        </div>

        <h2 className="font-heading font-black text-3xl sm:text-5xl text-white tracking-tight uppercase">
          FREQUENTLY ASKED <span className="text-white drop-shadow-[0_0_12px_rgba(255,255,255,0.4)]">QUESTIONS</span>
        </h2>

        <p className="text-zinc-300 text-sm sm:text-base mt-3 leading-relaxed">
          Clear, definitive answers regarding eligibility, Open Domain rules, hardware facilities, and team registration.
        </p>
      </div>

      {/* FAQs Accordion List */}
      <div className="space-y-3.5">
        {faqs.map((faq) => {
          const isOpen = openId === faq.id;
          return (
            <div
              key={faq.id}
              className={`glass-panel rounded-2xl border transition-all duration-300 overflow-hidden ${
                isOpen
                  ? 'border-white/40 bg-zinc-900/90 shadow-md'
                  : 'border-white/15 hover:border-white/35 bg-zinc-950/70'
              }`}
            >
              <button
                onClick={() => setOpenId(isOpen ? null : faq.id)}
                className="w-full p-4 sm:p-5 flex items-center justify-between text-left gap-4 cursor-pointer"
              >
                <span className="font-heading font-black text-base sm:text-lg text-white">
                  {faq.question}
                </span>
                <div className={`p-1.5 rounded-full transition-transform shrink-0 ${isOpen ? 'bg-white text-black rotate-180' : 'bg-zinc-800 text-zinc-300'}`}>
                  <ChevronDown className="w-4 h-4" />
                </div>
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-1 border-t border-white/10 text-xs sm:text-sm text-zinc-300 leading-relaxed">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
