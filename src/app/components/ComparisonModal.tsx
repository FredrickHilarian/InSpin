import React, { useState, useEffect } from "react";
import { Search, Sparkles, X, Heart, MessageSquare, AlertCircle, FileText, Check, ArrowRightLeft } from "lucide-react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";
import { useSurveyData } from "../context/SurveyDataContext";

interface ComparisonModalProps {
  onClose: () => void;
}

export default function ComparisonModal({ onClose }: ComparisonModalProps) {
  const { workspaces, activeWorkspaceId } = useSurveyData();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const [wsAId, setWsAId] = useState<string>(workspaces[0]?.id || "");
  const [wsBId, setWsBId] = useState<string>(workspaces[1]?.id || workspaces[0]?.id || "");

  const wsA = workspaces.find(w => w.id === wsAId) || workspaces[0];
  const wsB = workspaces.find(w => w.id === wsBId) || workspaces[1] || workspaces[0];

  const chartData = [
    { name: "Week 1", wsA: Math.max(10, wsA.dataset.npsScore - 15), wsB: Math.max(10, wsB.dataset.npsScore - 10) },
    { name: "Week 2", wsA: Math.max(15, wsA.dataset.npsScore - 8), wsB: Math.max(15, wsB.dataset.npsScore - 5) },
    { name: "Week 3", wsA: Math.max(20, wsA.dataset.npsScore - 2), wsB: Math.max(20, wsB.dataset.npsScore + 2) },
    { name: "Week 4", wsA: wsA.dataset.npsScore, wsB: wsB.dataset.npsScore }
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Workspace and Datasheet Comparison"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 dark:bg-black/75 backdrop-blur-sm p-[24px]"
    >
      <div className="w-[880px] max-h-[92vh] rounded-[24px] bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 shadow-2xl dark:shadow-black/75 overflow-y-auto flex flex-col p-[24px] gap-[20px] relative">
        
        {/* Close button */}
        <button
          onClick={onClose}
          type="button"
          className="absolute right-6 top-6 p-1.5 rounded-full text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <X className="size-[18px]" />
        </button>

        {/* Title & Selectors */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 p-1.5 rounded-lg border border-indigo-100 dark:border-indigo-800/60">
              <ArrowRightLeft className="size-4" />
            </div>
            <h2 className="text-[18px] font-bold text-slate-800 dark:text-slate-100">Workspace & Datasheet Comparison</h2>
          </div>

          <div className="grid grid-cols-2 gap-4 bg-slate-50 dark:bg-slate-900/60 p-3 rounded-2xl border border-slate-200/80 dark:border-slate-800">
            {/* Workspace A Selector */}
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">WORKSPACE / DATASHEET A</label>
              <select
                value={wsAId}
                onChange={(e) => setWsAId(e.target.value)}
                className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-[13px] font-semibold text-slate-800 dark:text-slate-100 outline-none focus:border-indigo-500 cursor-pointer"
              >
                {workspaces.map(w => (
                  <option key={w.id} value={w.id}>{w.name} ({w.dataset.fileName})</option>
                ))}
              </select>
            </div>

            {/* Workspace B Selector */}
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">WORKSPACE / DATASHEET B</label>
              <select
                value={wsBId}
                onChange={(e) => setWsBId(e.target.value)}
                className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-[13px] font-semibold text-slate-800 dark:text-slate-100 outline-none focus:border-indigo-500 cursor-pointer"
              >
                {workspaces.map(w => (
                  <option key={w.id} value={w.id}>{w.name} ({w.dataset.fileName})</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Side-by-Side Comparison Cards */}
        <div className="flex gap-[16px] items-center w-full relative">
          
          {/* Card A */}
          <div className="flex-1 rounded-[20px] p-[20px] bg-emerald-50/30 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-800/40 flex flex-col justify-between h-[160px]">
            <div className="flex justify-between items-start">
              <div className="flex flex-col">
                <span className="text-[11px] font-bold text-emerald-800 dark:text-emerald-300 uppercase tracking-wider truncate max-w-[260px]">
                  {wsA.name}
                </span>
                <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 mt-0.5">
                  {wsA.dataset.totalRespondents} respondents • {wsA.dataset.fileName}
                </span>
              </div>
            </div>
            <div className="flex items-baseline gap-[12px] mt-2">
              <span className="text-[40px] font-black text-emerald-600 dark:text-emerald-400 leading-none">+{wsA.dataset.npsScore}</span>
              <span className="text-[13px] font-bold text-emerald-700 dark:text-emerald-400">NPS Score</span>
            </div>
            <div className="h-[6px] w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden mt-2">
              <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${Math.min(100, Math.max(10, wsA.dataset.promotersPct))}%` }} />
            </div>
            <div className="flex justify-between items-center text-[11px] font-semibold text-slate-600 dark:text-slate-300 mt-2">
              <span>{wsA.dataset.promotersPct}% Promoters • {wsA.dataset.detractorsPct}% Detractors</span>
              <span className="text-emerald-700 dark:text-emerald-400 font-extrabold">{wsA.dataset.positiveSentimentPct}% Pos</span>
            </div>
          </div>

          {/* VS Divider */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full size-[36px] flex items-center justify-center font-extrabold text-[12px] text-slate-500 dark:text-slate-300 z-10 shadow-md">
            VS
          </div>

          {/* Card B */}
          <div className="flex-1 rounded-[20px] p-[20px] bg-indigo-50/30 dark:bg-indigo-950/20 border border-indigo-200/60 dark:border-indigo-800/40 flex flex-col justify-between h-[160px]">
            <div className="flex justify-between items-start">
              <div className="flex flex-col">
                <span className="text-[11px] font-bold text-indigo-800 dark:text-indigo-300 uppercase tracking-wider truncate max-w-[260px]">
                  {wsB.name}
                </span>
                <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 mt-0.5">
                  {wsB.dataset.totalRespondents} respondents • {wsB.dataset.fileName}
                </span>
              </div>
            </div>
            <div className="flex items-baseline gap-[12px] mt-2">
              <span className="text-[40px] font-black text-indigo-600 dark:text-indigo-400 leading-none">+{wsB.dataset.npsScore}</span>
              <span className="text-[13px] font-bold text-indigo-700 dark:text-indigo-400">NPS Score</span>
            </div>
            <div className="h-[6px] w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden mt-2">
              <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${Math.min(100, Math.max(10, wsB.dataset.promotersPct))}%` }} />
            </div>
            <div className="flex justify-between items-center text-[11px] font-semibold text-slate-600 dark:text-slate-300 mt-2">
              <span>{wsB.dataset.promotersPct}% Promoters • {wsB.dataset.detractorsPct}% Detractors</span>
              <span className="text-indigo-700 dark:text-indigo-400 font-extrabold">{wsB.dataset.positiveSentimentPct}% Pos</span>
            </div>
          </div>

        </div>

        {/* Small Stats Grid */}
        <div className="grid grid-cols-4 gap-[16px] w-full py-[12px] border-y border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-[10px] pl-2">
            <div className="bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 p-2 rounded-xl border border-indigo-100/50 dark:border-indigo-800/50">
              <Sparkles className="size-[16px]" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-[13.5px] font-black text-slate-800 dark:text-slate-100">96%</span>
              <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mt-1">AI Match Confidence</span>
            </div>
          </div>

          <div className="flex items-center gap-[10px]">
            <div className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400 p-2 rounded-xl border border-slate-100 dark:border-slate-700">
              <MessageSquare className="size-[16px]" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-[13.5px] font-black text-slate-800 dark:text-slate-100">{wsA.dataset.totalRespondents + wsB.dataset.totalRespondents}</span>
              <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mt-1">Combined Responses</span>
            </div>
          </div>

          <div className="flex items-center gap-[10px]">
            <div className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400 p-2 rounded-xl border border-slate-100 dark:border-slate-700">
              <AlertCircle className="size-[16px]" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-[13.5px] font-black text-slate-800 dark:text-slate-100">{Math.abs(wsA.dataset.npsScore - wsB.dataset.npsScore)} pts</span>
              <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mt-1">NPS Variance</span>
            </div>
          </div>

          <div className="flex items-center gap-[10px]">
            <div className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400 p-2 rounded-xl border border-slate-100 dark:border-slate-700">
              <FileText className="size-[16px]" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-[13.5px] font-black text-slate-800 dark:text-slate-100">{wsA.dataset.columns.length + wsB.dataset.columns.length}</span>
              <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mt-1">Active Columns</span>
            </div>
          </div>
        </div>

        {/* Lower Two-Column Section */}
        <div className="grid grid-cols-2 gap-[24px] w-full">
          
          {/* Left Column (Chart) */}
          <div className="flex flex-col gap-[20px]">
            <div className="rounded-[20px] p-[16px] bg-slate-50/50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800 flex flex-col h-[230px]">
              <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 tracking-wider uppercase mb-2">
                NPS TREND COMPARISON
              </span>
              <div className="flex-1 w-full text-[10px] font-semibold text-slate-400 dark:text-slate-500">
                <ResponsiveContainer width="100%" height="90%">
                  <LineChart data={chartData}>
                    <XAxis dataKey="name" stroke="#94a3b8" />
                    <YAxis stroke="#94a3b8" domain={[0, 100]} />
                    <Tooltip />
                    <Line type="monotone" dataKey="wsA" name={wsA.name} stroke="#10b981" strokeWidth={2.5} dot={{ r: 4 }} />
                    <Line type="monotone" dataKey="wsB" name={wsB.name} stroke="#6366f1" strokeWidth={2.5} dot={{ r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-center gap-[16px] text-[10.5px] font-bold text-slate-500 dark:text-slate-400 mt-1">
                <div className="flex items-center gap-1.5">
                  <span className="size-[8px] rounded-full bg-emerald-500" />
                  <span className="truncate max-w-[140px]">{wsA.name}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="size-[8px] rounded-full bg-indigo-500" />
                  <span className="truncate max-w-[140px]">{wsB.name}</span>
                </div>
              </div>
            </div>

            {/* AI Comparison Summary */}
            <div className="rounded-[20px] p-[20px] bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-100/50 dark:border-indigo-900/40 flex flex-col gap-[8px]">
              <div className="flex gap-[6px] items-center text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                <Sparkles className="size-[12px]" />
                <span>AI COMPARISON INSIGHT</span>
              </div>
              <p className="text-[13px] text-[#4f46e5] dark:text-indigo-300 font-semibold leading-relaxed">
                {wsA.dataset.npsScore >= wsB.dataset.npsScore
                  ? `${wsA.name} outperforms ${wsB.name} by +${wsA.dataset.npsScore - wsB.dataset.npsScore} NPS points, recording higher overall user satisfaction.`
                  : `${wsB.name} leads ${wsA.name} by +${wsB.dataset.npsScore - wsA.dataset.npsScore} NPS points with stronger promoter responses.`}
              </p>
            </div>
          </div>

          {/* Right Column (Themes Comparison) */}
          <div className="rounded-[20px] p-[20px] bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 flex flex-col gap-3">
            <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 tracking-wider uppercase">
              TOP THEMES COMPARISON
            </span>

            <div className="flex flex-col gap-3">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700 flex flex-col gap-1">
                <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase">{wsA.name} Primary Theme</span>
                <span className="text-[13px] font-bold text-slate-800 dark:text-slate-200">{wsA.dataset.themes[0]?.title || "Usability & Workflow"}</span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400">Impact: {wsA.dataset.themes[0]?.npsImpact || "+15 pts"}</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700 flex flex-col gap-1">
                <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase">{wsB.name} Primary Theme</span>
                <span className="text-[13px] font-bold text-slate-800 dark:text-slate-200">{wsB.dataset.themes[0]?.title || "Usability & Workflow"}</span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400">Impact: {wsB.dataset.themes[0]?.npsImpact || "+12 pts"}</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
