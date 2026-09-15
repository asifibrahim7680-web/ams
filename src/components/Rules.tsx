import React, { useState } from 'react';
import { ShieldCheck, ChevronDown, ChevronUp, AlertCircle, FileText } from 'lucide-react';
import { RuleItem } from '../types';

export const Rules: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const rules: RuleItem[] = [
    {
      id: 'r-01',
      num: '01',
      title: 'Announced Team-Size Requirements',
      details: [
        'Teams must consist of 2 to 5 participants (min 2, max 5 members).',
        'Cross-departmental and inter-college team compositions are permitted.',
        'Registration fee is ₹200 per participant (e.g. ₹400 for 2 members, ₹600 for 3, ₹800 for 4, ₹1,000 for 5).',
      ],
    },
    {
      id: 'r-02',
      num: '02',
      title: 'Single Team Membership',
      details: [
        'One student cannot belong to multiple teams under any circumstances.',
        'Registering under more than one squad will void eligibility for all associated teams.',
      ],
    },
    {
      id: 'r-03',
      num: '03',
      title: 'Valid College ID Cards Mandatory',
      details: [
        'All participants must possess a valid, verifiable physical or digital college ID card.',
        'IDs will be verified during on-site desk reporting and badge check-in.',
      ],
    },
    {
      id: 'r-04',
      num: '04',
      title: 'Substantial Progress During Event',
      details: [
        'Teams must make substantial development and prototyping progress during the one-day hackathon window.',
        'Commit logs and milestone progress checkpoints will be audited by technical mentors.',
      ],
    },
    {
      id: 'r-05',
      num: '05',
      title: 'Plagiarism & Direct Copying Strictly Prohibited',
      details: [
        'Plagiarism or direct copying of existing projects is strictly prohibited.',
        'Submitting pre-built boilerplate applications without novel authoring will lead to immediate disqualification.',
      ],
    },
    {
      id: 'r-06',
      num: '06',
      title: 'Third-Party APIs & Libraries with Acknowledgement',
      details: [
        'Third-party APIs, libraries, and open-source resources may be used with proper acknowledgement in the README/documentation.',
        'Core application logic and domain synthesis must be developed on-site during the sprint.',
      ],
    },
    {
      id: 'r-07',
      num: '07',
      title: 'Explanation of Team Contribution',
      details: [
        'Teams must explain their own unique technical and design contribution clearly to the judges.',
        'Every member should be prepared to address specific architectural and code inquiries.',
      ],
    },
    {
      id: 'r-08',
      num: '08',
      title: 'Working Demonstration is Mandatory',
      details: [
        'A functional, working demonstration of the prototype is mandatory for final evaluation.',
        'Pure slide decks or theoretical mockups without an executable demo cannot receive passing marks in implementation.',
      ],
    },
    {
      id: 'r-09',
      num: '09',
      title: 'Deadline Compliance for PPT & Documentation',
      details: [
        'Required PPT slides and documentation must be submitted through the portal before the announced deadline.',
        'No late submissions or extension requests will be entertained after the cutoff.',
      ],
    },
    {
      id: 'r-10',
      num: '10',
      title: 'Malpractice Leads to Disqualification',
      details: [
        'Any malpractice, harassment, tampering, or unfair advantage can lead to immediate disqualification.',
        'Participants must uphold academic integrity and professional engineering ethics.',
      ],
    },
    {
      id: 'r-11',
      num: '11',
      title: 'Jury Decision is Final',
      details: [
        'The jury decision is final and binding on all participating teams and tracks.',
        'Scores and rankings generated across the official evaluation dimensions will determine the awards.',
      ],
    },
  ];

  return (
    <section id="rules" className="relative py-14 sm:py-20 px-3 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900 border border-white/20 text-white text-xs font-mono-tech uppercase mb-3 shadow-sm">
          <ShieldCheck className="w-3.5 h-3.5 text-white" />
          <span>PROTOCOL DIRECTIVES</span>
        </div>

        <h2 className="font-heading font-black text-3xl sm:text-5xl text-white tracking-tight uppercase">
          OFFICIAL <span className="text-white drop-shadow-[0_0_12px_rgba(255,255,255,0.4)]">RULES &amp; GUIDELINES</span>
        </h2>

        <p className="text-zinc-300 text-sm sm:text-base mt-3 leading-relaxed">
          The operational guidelines governing team formation, code authenticity, hardware safety, and judging standards.
        </p>
      </div>

      {/* Rules Accordion */}
      <div className="space-y-3">
        {rules.map((rule, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={rule.id}
              className={`glass-panel rounded-2xl border transition-all duration-300 overflow-hidden ${
                isOpen
                  ? 'border-white/40 bg-zinc-900/90 shadow-md'
                  : 'bg-zinc-950/70 border-white/15 hover:border-white/35 shadow-sm'
              }`}
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full p-4 sm:p-5 flex items-center justify-between text-left gap-4"
              >
                <div className="flex items-center gap-3">
                  <span className={`font-mono-tech text-xs font-bold px-2.5 py-1 rounded-md border ${
                    isOpen
                      ? 'bg-white text-black border-white'
                      : 'bg-zinc-800 text-zinc-300 border-white/10'
                  }`}>
                    RULE {rule.num}
                  </span>
                  <span className="font-heading font-bold text-base sm:text-lg text-white">
                    {rule.title}
                  </span>
                </div>
                <div className="p-1.5 rounded-xl bg-zinc-800 text-white shrink-0">
                  {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </div>
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-2 border-t border-white/10 bg-zinc-950/90">
                  <ul className="space-y-2.5 text-xs sm:text-sm text-zinc-300 font-sans">
                    {rule.details.map((detail, dIdx) => (
                      <li key={dIdx} className="flex items-start gap-2.5">
                        <span className="w-2 h-2 rounded-full bg-white shrink-0 mt-1.5 shadow-sm" />
                        <span className="leading-relaxed">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
