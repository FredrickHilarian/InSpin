import React, { useState } from "react";
import { Search, HelpCircle, Mail, BookOpen, ChevronDown, ChevronUp, MessageSquare, Compass, ShieldAlert, Sparkles } from "lucide-react";

export default function HelpSupport() {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: "How do I upload and parse a survey excel sheet?",
      a: "Navigate to the 'Data Import' page from the sidebar, drag and drop your spreadsheet, and our system will map demographic, quantitative, ranking, and qualitative text fields automatically. Once mapped, click 'Explore Insights' to generate the dashboards."
    },
    {
      q: "How do I invite outside collaborators or clients to view findings?",
      a: "Go to Settings -> Sharing and select the 'External Guests' tab. Enter the collaborator's email address, specify access levels (Viewer, Commenter, Editor), select whether you require NDA acceptance, and choose which sections of the project they can view. Once set, click 'Send Invitation'."
    },
    {
      q: "What are the different project sharing permission levels?",
      a: "Owner: Full control (manage all settings, transfer ownership). Admin: Can invite/remove collaborators and edit findings. Editor: Can create and edit findings, add comments, and export charts. Commenter: Can view findings and leave comments. Viewer: Read-only access."
    },
    {
      q: "How do I secure my shared links?",
      a: "Under Settings -> Sharing -> Link Sharing, you can set link visibility, toggle Password Protection, set Expiration Dates, limit the Maximum Uses (e.g. up to 50 clicks), and toggle 'Disable Downloads' to prevent recipients from downloading raw files."
    },
    {
      q: "Where can I view all access logs and timeline logs?",
      a: "Click on Settings -> Sharing -> Permissions -> Activity Log, or click the 'View Activity' button after sharing to open the 'Activity Timeline'. The timeline tracks views, comments, edits, exports, and access updates."
    }
  ];

  const filteredFaqs = faqs.filter(
    faq => 
      faq.q.toLowerCase().includes(searchQuery.toLowerCase()) || 
      faq.a.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-120px)] relative overflow-y-auto bg-[#f4f7f6] dark:bg-[#090d16] transition-colors">
      <div className="flex flex-col gap-[28px] p-[40px] w-full max-w-[1200px] mx-auto pb-32">
        
        {/* Header Hero banner */}
        <div className="bg-gradient-to-r from-emerald-800 to-emerald-950 dark:from-emerald-950 dark:to-slate-900 border dark:border-emerald-800/40 rounded-[24px] p-8 text-white relative overflow-hidden shadow-lg shadow-emerald-950/10 transition-colors">
          <div className="absolute top-[-50px] right-[-50px] size-48 rounded-full bg-white/5 blur-3xl pointer-events-none" />
          
          <div className="flex flex-col gap-2 relative z-10 max-w-[600px]">
            <span className="px-2.5 py-1 bg-white/10 backdrop-blur rounded-lg text-[10px] font-bold tracking-wider w-fit uppercase flex items-center gap-1.5">
              <Sparkles className="size-3 text-emerald-300" />
              InSpin Help Center
            </span>
            <h1 className="font-['Inter:Bold',sans-serif] font-bold text-[28px] leading-tight mt-1">
              How can we help you today?
            </h1>
            <p className="text-[13px] text-slate-200/80 font-medium leading-relaxed">
              Search our knowledge base for guides on importing spreadsheets, editing research configurations, managing access levels, and exporting dashboard visualizers.
            </p>

            {/* Search Input inside Banner */}
            <div className="relative mt-4 max-w-[480px]">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search tutorials, articles, or FAQs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-transparent dark:border-slate-700 outline-none rounded-xl text-[13.5px] font-medium shadow-xl shadow-emerald-950/20"
              />
            </div>
          </div>
        </div>

        {/* 2-Column Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Left Columns: Knowledge Base & FAQs */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            
            {/* Documentation Quick Links */}
            <div className="flex flex-col gap-3">
              <h3 className="text-[14px] font-bold text-slate-800 dark:text-slate-100 uppercase tracking-wider block">
                Quick Start Guides
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { title: "Getting Started Guide", desc: "Learn the fundamentals of importing and preparing survey sheets.", icon: Compass, color: "text-blue-500 bg-blue-50 dark:bg-blue-950/40 border-blue-100 dark:border-blue-900/50" },
                  { title: "Survey Analysis", desc: "Discover how to interpret demographics, ranking metrics, and NPS charts.", icon: BookOpen, color: "text-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-100 dark:border-emerald-900/50" },
                  { title: "Sharing & Collaboration", desc: "Detailed breakdown of collaborator roles, external guest options, and access logs.", icon: MessageSquare, color: "text-purple-500 bg-purple-50 dark:bg-purple-950/40 border-purple-100 dark:border-purple-900/50" },
                  { title: "Security & SSO", desc: "Guide on configuring secure password links and link expiration controls.", icon: ShieldAlert, color: "text-amber-500 bg-amber-50 dark:bg-amber-950/40 border-amber-100 dark:border-amber-900/50" }
                ].map((card) => (
                  <div key={card.title} className="bg-white dark:bg-[#111827] rounded-2xl border border-slate-100 dark:border-slate-800 p-5 shadow-sm hover:shadow-md transition-shadow cursor-pointer flex gap-4">
                    <div className={`size-10 rounded-xl flex items-center justify-center shrink-0 border ${card.color}`}>
                      <card.icon className="size-5" />
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[13.5px] font-bold text-slate-800 dark:text-slate-100">{card.title}</span>
                      <span className="text-[11px] text-slate-400 dark:text-slate-400 font-medium leading-relaxed">{card.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Frequently Asked Questions Accordion */}
            <div className="flex flex-col gap-3">
              <h3 className="text-[14px] font-bold text-slate-800 dark:text-slate-100 uppercase tracking-wider block">
                Frequently Asked Questions
              </h3>
              
              <div className="bg-white dark:bg-[#111827] rounded-2xl border border-slate-100 dark:border-slate-800 p-6 shadow-sm flex flex-col gap-3.5 transition-colors">
                {filteredFaqs.length > 0 ? (
                  filteredFaqs.map((faq, i) => {
                    const isExpanded = expandedFaq === i;
                    return (
                      <div key={i} className="border-b border-slate-100 dark:border-slate-800 last:border-none pb-3.5 last:pb-0">
                        <button
                          onClick={() => setExpandedFaq(isExpanded ? null : i)}
                          className="w-full flex justify-between items-center text-left text-[13.5px] font-bold text-slate-700 dark:text-slate-200 hover:text-[#059669] dark:hover:text-emerald-400 transition-colors cursor-pointer"
                        >
                          <span className="pr-4 flex items-center gap-2">
                            <HelpCircle className="size-4.5 text-slate-400 shrink-0" />
                            {faq.q}
                          </span>
                          {isExpanded ? <ChevronUp className="size-4 text-slate-400" /> : <ChevronDown className="size-4 text-slate-400" />}
                        </button>
                        
                        {isExpanded && (
                          <div className="mt-2 text-[12.5px] text-slate-500 dark:text-slate-400 font-medium leading-relaxed pl-6 animate-in slide-in-from-top-1 duration-150">
                            {faq.a}
                          </div>
                        )}
                      </div>
                    );
                  })
                ) : (
                  <div className="text-center py-6 text-[13px] text-slate-400 font-semibold">
                    No FAQs matched "{searchQuery}"
                  </div>
                )}
              </div>
            </div>

          </div>

          {/* Right Column: Contact & Support Center */}
          <div className="lg:col-span-1 flex flex-col gap-6">
            
            {/* Support Desk Card */}
            <div className="bg-white dark:bg-[#111827] rounded-2xl border border-slate-100 dark:border-slate-800 p-6 shadow-sm flex flex-col gap-4 transition-colors">
              <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                Support Center
              </span>
              
              <div className="flex flex-col gap-3 text-[12.5px] font-medium text-slate-500 dark:text-slate-400 leading-relaxed">
                <p>
                  Have custom design integration questions? Our project team is here to assist with brand elements, UX guidelines, or technical review queries.
                </p>
                <p>
                  You can reach out directly via email to get assistance with your survey evaluation setups:
                </p>
              </div>

              <div className="border-t border-slate-100 dark:border-slate-800 pt-4 flex flex-col gap-3">
                {[
                  { name: "Chirag (InSpin Support)", email: "chirag@heymarvin.com" },
                  { name: "Bonnie (Research Lead)", email: "bonnie@heymarvin.com" }
                ].map((item) => (
                  <div key={item.email} className="bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60 rounded-xl p-3.5 flex items-center gap-3">
                    <div className="size-8 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-400 shrink-0">
                      <Mail className="size-4" />
                    </div>
                    <div className="flex flex-col truncate">
                      <span className="text-[12px] font-bold text-slate-700 dark:text-slate-200 truncate leading-snug">{item.name}</span>
                      <a href={`mailto:${item.email}`} className="text-[11.5px] text-[#059669] dark:text-emerald-400 hover:underline truncate">
                        {item.email}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Attributions Info */}
            <div className="bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800 rounded-2xl p-5 flex flex-col gap-2 transition-colors">
              <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                Project Attributions
              </span>
              <p className="text-[10.5px] text-slate-400 dark:text-slate-500 font-medium leading-relaxed">
                This dashboard prototype is developed for the InSpin research assignment. Built using Vite, React, Tailwind, and Vercel Analytics components.
              </p>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
