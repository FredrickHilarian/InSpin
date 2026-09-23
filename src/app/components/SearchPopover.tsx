import React from "react";
import { Search, Sparkles, X, Clock, ArrowUpRight } from "lucide-react";

interface SearchPopoverProps {
  onClose: () => void;
  onSelectSuggestion: (suggestion: string) => void;
  searchVal: string;
  setSearchVal: (val: string) => void;
  onTriggerSearch: (query: string) => void;
}

export default function SearchPopover({
  onClose,
  onSelectSuggestion,
  searchVal,
  setSearchVal,
  onTriggerSearch
}: SearchPopoverProps) {
  const recentSearches = ["Scheduling issues", "NPS score Q2", "Autonomy trend"];
  const suggestedInsights = [
    "Compare experienced workers vs new hires",
    "Find positive comments about communication",
    "Summarize travel complaints",
    "Show NPS trends"
  ];

  return (
    <div
      className="absolute top-[48px] left-0 w-[380px] max-w-[calc(100vw-32px)] rounded-[24px] bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 shadow-xl dark:shadow-2xl overflow-hidden z-50 flex flex-col p-[16px] gap-[16px]"
      style={{
        boxShadow: "0 10px 30px -5px rgba(15, 23, 42, 0.08), 0 8px 12px -6px rgba(15, 23, 42, 0.04)"
      }}
    >
      {/* Search Header Input within the popover */}
      <div className="flex items-center gap-[8px] h-[40px] px-[12px] py-[8px] rounded-[16px] bg-[#f8fafc] dark:bg-slate-800/80 border border-slate-100 dark:border-slate-700 w-full relative">
        <Search className="size-[16px] text-slate-400 dark:text-slate-500 shrink-0" />
        <Sparkles className="size-[14px] text-indigo-500 shrink-0" />
        <input
          type="text"
          placeholder="Ask anything about your research..."
          value={searchVal}
          onChange={(e) => setSearchVal(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onTriggerSearch(searchVal);
            }
          }}
          className="font-['Inter',sans-serif] font-medium text-[#0f172a] dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 text-[13px] flex-1 outline-none bg-transparent"
          autoFocus
        />
        <button
          onClick={onClose}
          type="button"
          className="p-1 rounded-full text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer shrink-0 transition-colors"
        >
          <X className="size-[14px]" />
        </button>
      </div>

      {/* Recent Searches */}
      <div className="flex flex-col gap-[8px]">
        <div className="flex items-center gap-[6px] text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest px-1">
          <Clock className="size-[12px] text-[#059669] dark:text-emerald-400" />
          <span>RECENT SEARCHES</span>
        </div>
        <div className="flex flex-col gap-[4px]">
          {recentSearches.map((item, idx) => (
            <button
              key={idx}
              onClick={() => {
                setSearchVal(item);
                onTriggerSearch(item);
              }}
              type="button"
              className="w-full text-left flex items-center gap-[8px] px-[12px] py-[10px] rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/70 transition-colors text-[13px] font-semibold text-slate-700 dark:text-slate-200 cursor-pointer"
            >
              <Clock className="size-[14px] text-slate-400 dark:text-slate-500" />
              <span>{item}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Suggested AI Insights */}
      <div className="flex flex-col gap-[8px]">
        <div className="flex items-center gap-[6px] text-[10px] font-bold text-[#6366f1] dark:text-indigo-400 uppercase tracking-widest px-1">
          <Sparkles className="size-[12px]" />
          <span>SUGGESTED AI INSIGHTS</span>
        </div>
        <div className="flex flex-col gap-[4px]">
          {suggestedInsights.map((item, idx) => (
            <button
              key={idx}
              onClick={() => onSelectSuggestion(item)}
              type="button"
              className="w-full text-left flex items-center justify-between px-[12px] py-[10px] rounded-xl bg-indigo-50/50 dark:bg-indigo-950/40 hover:bg-indigo-50 dark:hover:bg-indigo-950/70 border border-indigo-100/30 dark:border-indigo-900/50 transition-colors text-[13px] font-bold text-indigo-700 dark:text-indigo-300 cursor-pointer"
            >
              <div className="flex items-center gap-[8px]">
                {idx === 0 ? (
                  <Search className="size-[14px] text-indigo-500 dark:text-indigo-400" />
                ) : (
                  <Sparkles className="size-[14px] text-indigo-500 dark:text-indigo-400" />
                )}
                <span>{item}</span>
              </div>
              <ArrowUpRight className="size-[14px] text-indigo-500 dark:text-indigo-400" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
