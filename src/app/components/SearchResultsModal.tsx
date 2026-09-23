import React, { useEffect } from "react";
import { Search, Sparkles, X, ChevronRight, MessageSquare, Calendar, Heart, FileText, ArrowRight } from "lucide-react";

interface SearchResultsModalProps {
  onClose: () => void;
  query: string;
  onOpenComparison: () => void;
}

export default function SearchResultsModal({ onClose, query, onOpenComparison }: SearchResultsModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Search results modal"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 dark:bg-black/75 backdrop-blur-sm p-[24px]"
    >
      <div
        className="w-[640px] h-[680px] max-h-[90vh] rounded-[24px] bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 shadow-2xl dark:shadow-black/60 flex flex-col overflow-hidden relative"
        style={{
          boxShadow: "0 20px 50px -12px rgba(15, 23, 42, 0.15)"
        }}
      >
        
        {/* Fixed Header */}
        <div className="p-[20px] pb-3 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-[8px] h-[40px] px-[16px] rounded-[16px] bg-[#f8fafc] dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 w-[85%]">
            <Search className="size-[16px] text-slate-400 dark:text-slate-500 shrink-0" />
            <Sparkles className="size-[14px] text-indigo-500 shrink-0" />
            <input
              type="text"
              readOnly
              value={query || "scheduling"}
              className="font-['Inter',sans-serif] font-bold text-[#0f172a] dark:text-slate-100 text-[13px] flex-1 outline-none bg-transparent"
            />
          </div>
          <button
            onClick={onClose}
            type="button"
            className="p-2 rounded-full text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="size-[18px]" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-[20px] flex flex-col gap-[20px] scrollbar-thin">
          
          {/* AI Answer Section */}
          <div className="rounded-[20px] p-[16px] bg-[#f5f3ff] dark:bg-indigo-950/30 border border-[#e0e7ff] dark:border-indigo-900/40 flex flex-col gap-[8px]">
            <div className="flex gap-[6px] items-center text-[10px] font-bold text-[#6366f1] dark:text-indigo-400 uppercase tracking-wider">
              <Sparkles className="size-[12px]" />
              <span>AI ANSWER</span>
            </div>
            <p className="text-[12.5px] text-slate-700 dark:text-slate-300 leading-relaxed font-semibold">
              Found <span className="font-extrabold text-slate-900 dark:text-white">523 negative mentions</span> about scheduling across <span className="font-extrabold text-slate-900 dark:text-white">312 respondents</span>. The strongest complaints center around the Q1 policy change reducing flexibility, with Engineering (72% negative) and Operations (68% negative) most affected. Key frustration themes: loss of autonomy, family planning difficulty, and comparison to previous flexibility.
            </p>
          </div>

          {/* Questions Section */}
          <div className="flex flex-col gap-[8px]">
            <div className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest px-1">
              QUESTIONS
            </div>
            <div className="flex flex-col gap-[6px]">
              <div className="flex items-center justify-between p-[12px] rounded-xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-800/60 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer">
                <div className="flex items-center gap-[8px]">
                  <span className="size-[6px] rounded-full bg-emerald-500" />
                  <span className="text-[12.5px] font-bold text-slate-700 dark:text-slate-200">Q1: "How satisfied are you with schedule flexibility?"</span>
                </div>
                <div className="flex items-center gap-[6px] shrink-0">
                  <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500">842 mentions • 62% negative</span>
                  <ChevronRight className="size-[14px] text-slate-400" />
                </div>
              </div>

              <div className="flex items-center justify-between p-[12px] rounded-xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-800/60 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer">
                <div className="flex items-center gap-[8px]">
                  <span className="size-[6px] rounded-full bg-emerald-500" />
                  <span className="text-[12.5px] font-bold text-slate-700 dark:text-slate-200">Q7: "Rate your work-life balance"</span>
                </div>
                <div className="flex items-center gap-[6px] shrink-0">
                  <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500">634 mentions • 48% negative</span>
                  <ChevronRight className="size-[14px] text-slate-400" />
                </div>
              </div>
            </div>
          </div>

          {/* Themes Section */}
          <div className="flex flex-col gap-[8px]">
            <div className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest px-1">
              THEMES
            </div>
            <div className="flex flex-col gap-[6px]">
              <div className="flex items-center justify-between p-[12px] rounded-xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-800/60 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer">
                <div className="flex items-center gap-[8px]">
                  <span className="size-[6px] rounded-full bg-[#059669]" />
                  <span className="text-[12.5px] font-bold text-slate-800 dark:text-slate-200">Scheduling</span>
                  <span className="text-[11px] text-slate-400 dark:text-slate-500 font-semibold ml-1">842 mentions</span>
                </div>
                <span className="px-[8px] py-[3px] rounded-full text-[9px] font-bold bg-[#059669] text-white tracking-wide uppercase">
                  High Priority
                </span>
              </div>

              <div className="flex items-center justify-between p-[12px] rounded-xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-800/60 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer">
                <div className="flex items-center gap-[8px]">
                  <span className="size-[6px] rounded-full bg-[#059669]" />
                  <span className="text-[12.5px] font-bold text-slate-800 dark:text-slate-200">Work-Life Balance</span>
                  <span className="text-[11px] text-slate-400 dark:text-slate-500 font-semibold ml-1">634 mentions</span>
                </div>
                <span className="px-[8px] py-[3px] rounded-full text-[9px] font-bold bg-[#34d399] text-slate-900 tracking-wide uppercase">
                  Medium Priority
                </span>
              </div>
            </div>
          </div>

          {/* Quotes Section */}
          <div className="flex flex-col gap-[8px]">
            <div className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest px-1">
              QUOTES
            </div>
            <div className="flex flex-col gap-[6px]">
              <div className="p-[14px] rounded-xl bg-indigo-50/20 dark:bg-indigo-950/20 border border-slate-100 dark:border-slate-800 flex flex-col gap-[6px]">
                <p className="text-[12px] text-slate-600 dark:text-slate-300 font-medium italic">
                  "The new scheduling system makes it nearly impossible to plan family commitments ahead of time..."
                </p>
                <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 dark:text-slate-500 mt-1">
                  <span>Engineering Respondent • 5yr tenure</span>
                  <div className="flex items-center gap-1.5 text-rose-500 dark:text-rose-400 uppercase tracking-wider">
                    <span className="size-[5px] rounded-full bg-rose-500" />
                    <span>Negative</span>
                  </div>
                </div>
              </div>

              <div className="p-[14px] rounded-xl bg-indigo-50/20 dark:bg-indigo-950/20 border border-slate-100 dark:border-slate-800 flex flex-col gap-[6px]">
                <p className="text-[12px] text-slate-600 dark:text-slate-300 font-medium italic">
                  "Lost all schedule autonomy since January"
                </p>
                <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 dark:text-slate-500 mt-1">
                  <span>Operations Respondent • 8yr tenure</span>
                  <div className="flex items-center gap-1.5 text-rose-600 dark:text-rose-400 uppercase tracking-wider">
                    <span className="size-[5px] rounded-full bg-rose-600" />
                    <span>Very Negative</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Fixed Footer */}
        <div className="p-[20px] pt-3 border-t border-slate-100 dark:border-slate-800 bg-[#f8fafc]/50 dark:bg-slate-900/60 grid grid-cols-2 gap-[24px] items-center shrink-0">
          {/* Respondents */}
          <div className="flex flex-col gap-[4px]">
            <div className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
              RESPONDENTS
            </div>
            <div className="flex items-center gap-[10px] mt-0.5">
              <div className="flex -space-x-1.5 overflow-hidden shrink-0">
                <div className="inline-block size-[24px] rounded-full border border-white dark:border-slate-800 bg-emerald-600 text-white flex items-center justify-center font-bold text-[10px]">S</div>
                <div className="inline-block size-[24px] rounded-full border border-white dark:border-slate-800 bg-indigo-500 text-white flex items-center justify-center font-bold text-[10px]">D</div>
                <div className="inline-block size-[24px] rounded-full border border-white dark:border-slate-800 bg-emerald-500 text-white flex items-center justify-center font-bold text-[10px]">M</div>
              </div>
              <button
                onClick={onOpenComparison}
                type="button"
                className="text-[11.5px] font-bold text-[#059669] dark:text-emerald-400 hover:underline flex items-center gap-0.5 cursor-pointer"
              >
                View All 312 Respondents <ArrowRight className="size-[12px]" />
              </button>
            </div>
          </div>

          {/* Reports */}
          <div className="flex flex-col gap-[4px]">
            <div className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
              REPORTS
            </div>
            <div className="flex items-center justify-between p-[6px] px-[12px] rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
              <div className="flex items-center gap-2 min-w-0">
                <FileText className="size-[13px] text-slate-400 dark:text-slate-500 shrink-0" />
                <span className="text-[12px] font-bold text-slate-700 dark:text-slate-200 truncate">Q2 Scheduling Analysis Report</span>
              </div>
              <div className="flex items-center gap-[8px] text-[9.5px] font-bold shrink-0">
                <span className="px-[8px] py-[2.5px] rounded-lg bg-[#e8f7f0] dark:bg-emerald-950/60 text-[#059669] dark:text-emerald-300 hover:bg-[#dcfce7] dark:hover:bg-emerald-900/60 transition-colors uppercase flex items-center gap-1 cursor-pointer">
                  Open <span className="font-sans">→</span>
                </span>
                <span className="text-slate-400 dark:text-slate-500 font-semibold">Jul 12</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
