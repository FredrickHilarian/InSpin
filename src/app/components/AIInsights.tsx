import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import { Sparkles, Plus, ChevronRight, Info, MoreHorizontal } from "lucide-react";

// ─── Data ─────────────────────────────────────────────────────────────────────

const narrativeTrendData = [
  { month: "Oct 2025", Scheduling: 28, Communication: 48, Travel: 34 },
  { month: "Nov 2025", Scheduling: 36, Communication: 46, Travel: 31 },
  { month: "Dec 2025", Scheduling: 54, Communication: 44, Travel: 29 },
  { month: "Jan 2026", Scheduling: 72, Communication: 40, Travel: 30 },
  { month: "Feb 2026", Scheduling: 82, Communication: 44, Travel: 36 },
  { month: "Mar 2026", Scheduling: 93, Communication: 50, Travel: 39 },
];

const themes = [
  {
    rank: 1,
    name: "Scheduling",
    mentions: 842,
    sentiment: -10.2,
    isNeg: true,
    confidence: 94,
    quote: "The rooms shift without adequate prior notification, making personal planning almost impossible.",
    trendData: [40, 52, 66, 78, 87, 93],
    trendColor: "#ef4444",
  },
  {
    rank: 2,
    name: "Communication",
    mentions: 718,
    sentiment: 6.8,
    isNeg: false,
    confidence: 91,
    quote: "Town halls and direct updates have been increasingly adopted from this transition phase.",
    trendData: [48, 46, 44, 40, 44, 50],
    trendColor: "#22c55e",
  },
  {
    rank: 3,
    name: "Payments",
    mentions: 426,
    sentiment: -6.1,
    isNeg: true,
    confidence: 88,
    quote: "Clarification is needed regarding the new bonus tiers announced as of January.",
    trendData: [28, 32, 36, 40, 34, 30],
    trendColor: "#f97316",
  },
  {
    rank: 4,
    name: "Travel & Logistics",
    mentions: 312,
    sentiment: 12.5,
    isNeg: false,
    confidence: 96,
    quote: "Reimbursement turnarounds for five-star movers have stayed significantly this quarter.",
    trendData: [30, 29, 28, 30, 36, 40],
    trendColor: "#22c55e",
  },
];

const discoveries = [
  {
    tag: "HIGH IMPACT",
    tagBg: "#fef2f2",
    tagColor: "#b91c1c",
    title: "AI detected new frustration around scheduling",
    body: "Surged in last 48 hours across West Coast cohorts.",
    confidence: 38,
    trendColor: "#ef4444",
    time: "21 min",
    trendDown: true,
  },
  {
    tag: "HIGH IMPACT",
    tagBg: "#fef2f2",
    tagColor: "#b91c1c",
    title: "Overtime complaints increased 18%",
    body: "Predominantly expressed by Senior Technical Staff.",
    confidence: 51,
    trendColor: "#ef4444",
    time: "4h ago",
    trendDown: true,
  },
  {
    tag: "EMERGING",
    tagBg: "#fffbeb",
    tagColor: "#92400e",
    title: "Communication sentiment dropped after Month 3",
    body: "Initial alignment fades without structured touchpoints.",
    confidence: 11,
    trendColor: "#f97316",
    time: "8h ago",
    trendDown: false,
  },
];

const aiRecommended = [
  { rank: 1, label: "Scheduling Improvements", sub: "High impact • 842 mentions", badge: "PRIORITY 1", badgeBg: "#ef4444" },
  { rank: 2, label: "Communication Strategy", sub: "High impact • 718 mentions", badge: "PRIORITY 2", badgeBg: "#f97316" },
  { rank: 3, label: "Payment Clarity", sub: "Medium impact • 426 mentions", badge: "PRIORITY 3", badgeBg: "#eab308" },
];

const dataQualityItems = [
  { label: "Sample Quality", value: "Excellent", color: "#22c55e" },
  { label: "Coverage", value: "48%", color: "#f97316" },
  { label: "Response Consistency", value: "High", color: "#22c55e" },
  { label: "Bias Direction", value: "Low Risk", color: "#22c55e" },
];

const opportunities = [
  {
    title: "Scheduling vs. Seniority",
    body: "Understand how rotating shifts disproportionately affect senior leavers.",
  },
  {
    title: "Communication by Department",
    body: "Map town hall approval lifecycle across manufacturing vs engineering sub-teams.",
  },
  {
    title: "Equipment Age vs. Satisfaction",
    body: "Cross-reference equipment lifecycle with quarterly satisfaction scores.",
  },
];

const criticalRisks = [
  {
    severity: "HIGH SEVERITY",
    severityBg: "#ef4444",
    title: "Scheduling fluid turnaround mismatch",
    body: "High risk of roster friction leading to attrition.",
  },
  {
    severity: "MEDIUM",
    severityBg: "#f59e0b",
    title: "Travel logistical reimbursement drag",
    body: "Reported from team lead in metric degradation.",
  },
  {
    severity: "LOW",
    severityBg: "#22c55e",
    title: "Payment clarity gaps for new bonus tiers",
    body: "Potential confusion in upcoming payout cycles.",
  },
];

const quickQuestions = [
  "Why is scheduling impacting satisfaction?",
  "Compare sentiment by location",
  "What changed after Month 3?",
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function MiniSparkline({ data, color }: { data: number[]; color: string }) {
  const chartData = data.map((v, i) => ({ x: i, v }));
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={chartData} margin={{ top: 2, right: 0, left: 0, bottom: 2 }}>
        <Line type="monotone" dataKey="v" stroke={color} strokeWidth={1.5} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
}

function GlassCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-2xl bg-white/85 dark:bg-[#111827]/85 border border-slate-200/80 dark:border-slate-800 shadow-xs backdrop-blur-md ${className}`}
    >
      {children}
    </div>
  );
}

// ─── Bubble Viz ───────────────────────────────────────────────────────────────

function BubbleViz() {
  return (
    <div className="relative w-full h-full">
      {/* Central glowing purple orb */}
      <div
        className="absolute flex items-center justify-center rounded-full"
        style={{
          width: 100,
          height: 100,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -52%)",
          background: "radial-gradient(circle at 38% 32%, #d8b4fe, #7c3aed)",
          boxShadow: "0 0 40px 18px rgba(139,92,246,0.35)",
          zIndex: 2,
        }}
      >
        <Sparkles className="text-white size-8 opacity-95" />
      </div>

      {/* Scheduling bubble — top-left area */}
      <div
        className="absolute flex flex-col items-center justify-center rounded-full text-white text-center"
        style={{
          width: 64, height: 64,
          top: "10%", left: "8%",
          background: "#fb923c",
          boxShadow: "0 4px 16px rgba(251,146,60,0.4)",
          fontSize: 8, lineHeight: 1.3, zIndex: 1,
        }}
      >
        <span className="font-bold text-[8px]">Scheduling</span>
        <span className="opacity-85 text-[7px]">+34% impact</span>
      </div>

      {/* Travel bubble — top-right */}
      <div
        className="absolute flex flex-col items-center justify-center rounded-full text-white text-center"
        style={{
          width: 48, height: 48,
          top: "6%", right: "4%",
          background: "#a78bfa",
          boxShadow: "0 4px 16px rgba(167,139,250,0.4)",
          fontSize: 7, lineHeight: 1.3, zIndex: 1,
        }}
      >
        <span className="font-bold text-[7px]">Travel</span>
        <span className="opacity-85 text-[6px]">+12% impact</span>
      </div>

      {/* Payments bubble — bottom-left */}
      <div
        className="absolute flex flex-col items-center justify-center rounded-full text-white text-center"
        style={{
          width: 54, height: 54,
          bottom: "8%", left: "10%",
          background: "#60a5fa",
          boxShadow: "0 4px 16px rgba(96,165,250,0.4)",
          fontSize: 7, lineHeight: 1.3, zIndex: 1,
        }}
      >
        <span className="font-bold text-[7px]">Payments</span>
        <span className="opacity-85 text-[6px]">-40% impact</span>
      </div>

      {/* Communication bubble — bottom-right */}
      <div
        className="absolute flex flex-col items-center justify-center rounded-full text-white text-center"
        style={{
          width: 52, height: 52,
          bottom: "10%", right: "6%",
          background: "#818cf8",
          boxShadow: "0 4px 16px rgba(129,140,248,0.4)",
          fontSize: 7, lineHeight: 1.3, zIndex: 1,
        }}
      >
        <span className="font-bold text-[7px]">Commun.</span>
        <span className="opacity-85 text-[6px]">+28% impact</span>
      </div>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

interface AIInsightsProps {
  onGenerateReport?: () => void;
}

export default function AIInsights({ onGenerateReport }: AIInsightsProps) {
  const [askInput, setAskInput] = useState("");
  const [generating, setGenerating] = useState(false);

  const handleGenerate = () => {
    setGenerating(true);
    setTimeout(() => {
      setGenerating(false);
      onGenerateReport?.();
    }, 600);
  };

  return (
    <div className="w-full flex flex-col h-[calc(100vh-120px)] relative" style={{ background: "transparent" }}>
      {/* Scrollable content area */}
      <div className="flex-1 overflow-y-auto">
        <div className="flex flex-col gap-5 px-8 pt-6 pb-6 w-full max-w-[1440px] mx-auto">

          {/* ── Page Header ───────────────────────────── */}
          <div className="flex items-start justify-between w-full gap-4">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="bg-[#dcfce7] dark:bg-emerald-950/60 text-[#16a34a] dark:text-emerald-400 font-bold text-[10px] px-2.5 py-1 rounded-full uppercase tracking-wider">
                  Analysis Complete
                </span>
                <span className="text-[11px] text-[#64748b] dark:text-slate-400 font-medium">
                  • Updated Today at 09:42 AM
                </span>
              </div>
              <h1 className="font-bold text-[#0f172a] dark:text-white text-[28px] tracking-tight mt-0.5">AI Insights</h1>
              <p className="text-[#64748b] dark:text-slate-400 text-[13px]">AI-powered discoveries from 2,847 responses</p>
            </div>
            <div className="flex items-center gap-2 shrink-0 pt-1">
              <button
                type="button"
                onClick={handleGenerate}
                disabled={generating}
                className="flex items-center gap-2 bg-[#15803d] hover:bg-[#166534] dark:bg-emerald-700 dark:hover:bg-emerald-600 active:scale-95 text-white font-semibold text-[13px] px-4 py-2 rounded-xl transition-all shadow-sm cursor-pointer disabled:opacity-75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
              >
                <Sparkles className={`size-3.5 ${generating ? "animate-spin" : ""}`} />
                {generating ? "Generating Report..." : "Generate Report"}
              </button>
              <button
                type="button"
                aria-label="Add insight"
                className="flex items-center justify-center size-9 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all shadow-sm cursor-pointer"
              >
                <Plus className="size-4" />
              </button>
            </div>
          </div>

          {/* ── Hero Row ──────────────────────────────── */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 w-full">

            {/* Main narrative hero card */}
            <div
              className="xl:col-span-2 rounded-2xl p-6 flex flex-col gap-4 relative overflow-hidden bg-gradient-to-br from-white/95 to-slate-50/90 dark:from-[#111827]/95 dark:to-[#0f172a]/95 border border-slate-200/90 dark:border-slate-800 shadow-sm dark:shadow-black/40"
            >
              {/* AI badge */}
              <div className="flex items-center gap-1.5">
                <span
                  className="text-[9px] font-bold tracking-widest uppercase px-2 py-0.5 rounded-full bg-[#ede9fe] dark:bg-indigo-950/60 text-[#7c3aed] dark:text-indigo-400"
                >
                  ✦ AI NARRATIVE CONSENSUS
                </span>
              </div>

              {/* Two-column layout: text left, bubble right */}
              <div className="flex gap-5 items-start">
                {/* Left: text content */}
                <div className="flex flex-col gap-3 flex-1 min-w-0">
                  <h2 className="font-bold text-[#0f172a] dark:text-white text-[22px] leading-tight">
                    Scheduling frustration is driving satisfaction down.
                  </h2>
                  <p className="text-[#475569] dark:text-slate-300 text-[12px] leading-relaxed">
                    Our AI analysis found that scheduling issues are the #1 driver of dissatisfaction, impacting multiple operational areas and creating a ripple effect on overall experience.
                  </p>

                  {/* Stats */}
                  <div className="flex gap-6 flex-wrap">
                    {[
                      { val: "94%", label: "AI Confidence", color: "#16a34a" },
                      { val: "2,847", label: "Response Analyzed", color: "#7c3aed" },
                      { val: "6", label: "Clear Themes", color: "#0284c7" },
                      { val: "847", label: "Critical Mentions", color: "#dc2626" },
                    ].map((s) => (
                      <div key={s.label} className="flex flex-col gap-0.5">
                        <span className="font-bold text-[17px]" style={{ color: s.color }}>{s.val}</span>
                        <span className="text-[10px] text-[#94a3b8] dark:text-slate-500">{s.label}</span>
                      </div>
                    ))}
                  </div>

                  {/* Action buttons */}
                  <div className="flex gap-2 flex-wrap">
                    {[
                      { icon: "🔍", label: "Explain this" },
                      { icon: "📊", label: "Show evidence" },
                      { icon: "❓", label: "Why it matters" },
                      { icon: "🔀", label: "Compare segments" },
                    ].map((a) => (
                      <button
                        key={a.label}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-[#334155] dark:text-slate-200 transition-all hover:bg-slate-50 dark:hover:bg-slate-700 cursor-pointer"
                      >
                        <span className="text-[11px]">{a.icon}</span>
                        {a.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Right: bubble visualization */}
                <div className="shrink-0 w-[200px] h-[180px] hidden md:block">
                  <BubbleViz />
                </div>
              </div>
            </div>

            {/* Recent Discoveries panel */}
            <GlassCard className="p-5 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-[#0f172a] dark:text-white text-[13px]">Recent Discoveries</span>
                <button className="text-[11px] text-[#15803d] dark:text-emerald-400 font-semibold hover:underline flex items-center gap-0.5 cursor-pointer">
                  View all <ChevronRight className="size-3" />
                </button>
              </div>

              <div className="flex flex-col gap-0">
                {discoveries.map((d, i) => (
                  <div key={i} className={`flex flex-col gap-1.5 py-3 ${i < discoveries.length - 1 ? "border-b border-slate-100 dark:border-slate-800" : ""}`}>
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className="text-[9px] font-bold px-2 py-0.5 rounded-full"
                        style={{ background: d.tagBg, color: d.tagColor }}
                      >
                        {d.tag}
                      </span>
                      <span className="text-[10px] text-slate-400 dark:text-slate-500">{d.time}</span>
                    </div>
                    <p className="text-[12px] font-semibold text-[#0f172a] dark:text-slate-100 leading-snug">{d.title}</p>
                    <p className="text-[11px] text-[#64748b] dark:text-slate-400 leading-relaxed">{d.body}</p>
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] text-[#94a3b8] dark:text-slate-500">Confidence: {d.confidence}%</span>
                      <div className="w-14 h-5">
                        <MiniSparkline
                          data={d.trendDown ? [42, 40, 37, 34, 31, 28] : [30, 33, 30, 28, 30, 27]}
                          color={d.trendColor}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>

          {/* ── Key Research Themes ────────────────────── */}
          <div className="flex flex-col gap-3 w-full">
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-2">
                <span className="font-bold text-[#0f172a] dark:text-white text-[14px]">Key Research Themes</span>
                <Info className="size-3.5 text-[#94a3b8] dark:text-slate-500" />
              </div>
              <button className="text-[11px] text-[#15803d] dark:text-emerald-400 font-semibold hover:underline flex items-center gap-0.5 cursor-pointer">
                Explore all themes <ChevronRight className="size-3" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
              {themes.map((t) => (
                <GlassCard key={t.name} className="p-4 flex flex-col gap-3 hover:shadow-md transition-all">
                  {/* Header row */}
                  <div className="flex items-center justify-between gap-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-bold text-[#94a3b8] dark:text-slate-500">{t.rank}</span>
                      <span className="font-bold text-[#0f172a] dark:text-slate-100 text-[13px]">{t.name}</span>
                    </div>
                    <span className="text-[10px] text-[#94a3b8] dark:text-slate-400 shrink-0">{t.mentions.toLocaleString()} Mentions</span>
                  </div>

                  {/* Sentiment row */}
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-[#64748b] dark:text-slate-400">Sentiment Balance</span>
                      <span
                        className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                        style={{
                          background: t.isNeg ? "#fef2f2" : "#f0fdf4",
                          color: t.isNeg ? "#dc2626" : "#16a34a",
                        }}
                      >
                        {t.sentiment > 0 ? "+" : ""}{t.sentiment}% {t.isNeg ? "Negative" : "Positive"}
                      </span>
                    </div>
                    {/* Sentiment bar */}
                    <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${Math.abs(t.sentiment) * 5}%`,
                          background: t.isNeg ? "#ef4444" : "#22c55e",
                        }}
                      />
                    </div>
                  </div>

                  {/* Quote */}
                  <p className="text-[11px] text-[#64748b] dark:text-slate-400 leading-relaxed italic border-l-2 border-slate-200 dark:border-slate-700 pl-2 flex-1">
                    "{t.quote}"
                  </p>

                  {/* Confidence + sparkline */}
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-[#94a3b8] dark:text-slate-400">
                      Confidence <span className="font-bold text-[#334155] dark:text-slate-200">{t.confidence}%</span>
                    </span>
                    <div className="w-16 h-8">
                      <MiniSparkline data={t.trendData} color={t.trendColor} />
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 pt-2 border-t border-slate-100 dark:border-slate-800">
                    {["Explain", "Evidence", "Compare"].map((a) => (
                      <button key={a} className="text-[10px] font-semibold text-[#15803d] dark:text-emerald-400 hover:underline cursor-pointer">
                        {a}
                      </button>
                    ))}
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>

          {/* ── Emerging Trends + Recommended + Data Quality ── */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 w-full">

            {/* Emerging Narrative Trends chart */}
            <GlassCard className="xl:col-span-2 p-5 flex flex-col gap-3">
              <div className="flex flex-col gap-0.5">
                <span className="font-bold text-[#0f172a] dark:text-white text-[13px]">Emerging Narrative Trends</span>
                <span className="text-[11px] text-[#94a3b8] dark:text-slate-400">Tracking key employee sentiment over 6-month research timeline</span>
              </div>

              {/* Legend */}
              <div className="flex gap-4">
                {[
                  { color: "#10b981", label: "Scheduling" },
                  { color: "#60a5fa", label: "Communication" },
                  { color: "#f59e0b", label: "Travel" },
                ].map((l) => (
                  <div key={l.label} className="flex items-center gap-1.5">
                    <div className="size-2 rounded-full" style={{ background: l.color }} />
                    <span className="text-[10px] text-[#64748b] dark:text-slate-400">{l.label}</span>
                  </div>
                ))}
              </div>

              <div className="relative w-full" style={{ height: 160 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={narrativeTrendData} margin={{ top: 4, right: 8, left: -24, bottom: 0 }}>
                    <XAxis dataKey="month" tick={{ fontSize: 9, fill: "#94a3b8" }} tickLine={false} axisLine={false} />
                    <YAxis tick={{ fontSize: 9, fill: "#94a3b8" }} tickLine={false} axisLine={false} />
                    <Tooltip
                      contentStyle={{ fontSize: 11, borderRadius: 8, border: "1px solid #334155", background: "#0f172a", color: "#f8fafc" }}
                    />
                    <Line type="monotone" dataKey="Scheduling" stroke="#10b981" strokeWidth={2} dot={false} />
                    <Line type="monotone" dataKey="Communication" stroke="#60a5fa" strokeWidth={2} dot={false} />
                    <Line type="monotone" dataKey="Travel" stroke="#f59e0b" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>

                {/* Annotation tooltip on chart */}
                <div
                  className="absolute pointer-events-none"
                  style={{ bottom: 36, left: "46%" }}
                >
                  <div
                    className="text-white text-[8.5px] px-2 py-1 rounded-lg leading-snug bg-slate-800/90 dark:bg-slate-950/90 max-w-[130px] shadow-md border border-slate-700/60"
                  >
                    Jan 2026: Scheduling complaints has surpassed communication for the first time.
                  </div>
                </div>
              </div>
            </GlassCard>

            {/* Right column: AI Recommended + Data Quality */}
            <div className="flex flex-col gap-3">

              {/* AI Recommended Focus */}
              <GlassCard className="p-4 flex flex-col gap-3 flex-1">
                <div className="flex items-center gap-2">
                  <Sparkles className="size-3.5 text-[#15803d] dark:text-emerald-400" />
                  <span className="font-bold text-[#0f172a] dark:text-white text-[12px]">AI Recommended Focus</span>
                </div>
                <div className="flex flex-col gap-2.5">
                  {aiRecommended.map((r) => (
                    <div key={r.rank} className="flex items-center gap-2">
                      <span className="font-bold text-[#94a3b8] dark:text-slate-500 text-[11px] w-3 shrink-0">{r.rank}</span>
                      <div className="flex flex-col flex-1 min-w-0">
                        <span className="text-[11px] font-semibold text-[#334155] dark:text-slate-200 truncate">{r.label}</span>
                        <span className="text-[9.5px] text-[#94a3b8] dark:text-slate-500">{r.sub}</span>
                      </div>
                      <span
                        className="text-[8.5px] font-bold px-2 py-0.5 rounded-full text-white shrink-0"
                        style={{ background: r.badgeBg }}
                      >
                        {r.badge}
                      </span>
                    </div>
                  ))}
                </div>
              </GlassCard>

              {/* AI Confidence & Data Quality */}
              <GlassCard className="p-4 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#0f172a] dark:text-white text-[12px]">AI Confidence & Data Quality</span>
                  <Info className="size-3.5 text-[#94a3b8] dark:text-slate-500" />
                </div>

                <div className="flex items-center gap-3">
                  {/* Donut ring — CSS based */}
                  <div
                    className="relative shrink-0 flex items-center justify-center"
                    style={{ width: 56, height: 56 }}
                  >
                    <svg width="56" height="56" viewBox="0 0 56 56">
                      <circle cx="28" cy="28" r="22" fill="none" stroke="#e2e8f0" className="dark:stroke-slate-700" strokeWidth="6" />
                      <circle
                        cx="28" cy="28" r="22"
                        fill="none"
                        stroke="#22c55e"
                        strokeWidth="6"
                        strokeDasharray={`${2 * Math.PI * 22 * 0.96} ${2 * Math.PI * 22 * 0.04}`}
                        strokeLinecap="round"
                        transform="rotate(-90 28 28)"
                      />
                    </svg>
                    <span className="absolute text-[11px] font-bold text-[#334155] dark:text-slate-200">96%</span>
                  </div>
                  <span className="text-[10px] text-[#64748b] dark:text-slate-400 leading-relaxed">AI analysis<br />confidence</span>
                </div>

                <div className="flex flex-col gap-1.5">
                  {dataQualityItems.map((dq) => (
                    <div key={dq.label} className="flex items-center justify-between">
                      <span className="text-[11px] text-[#64748b] dark:text-slate-400">{dq.label}</span>
                      <span className="text-[11px] font-semibold" style={{ color: dq.color }}>{dq.value}</span>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </div>
          </div>

          {/* ── Research Opportunities + Critical Risks ─── */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 w-full">

            {/* Research Opportunities */}
            <GlassCard className="p-5 flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <span className="font-bold text-[#0f172a] dark:text-white text-[13px]">Research Opportunities</span>
                <Info className="size-3.5 text-[#94a3b8] dark:text-slate-500" />
              </div>
              <div className="grid grid-cols-3 gap-3">
                {opportunities.map((op) => (
                  <div
                    key={op.title}
                    className="flex flex-col gap-2 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60"
                  >
                    <p className="text-[11px] font-semibold text-[#0f172a] dark:text-slate-200">{op.title}</p>
                    <p className="text-[10.5px] text-[#64748b] dark:text-slate-400 leading-relaxed flex-1">{op.body}</p>
                    <button className="text-[10.5px] text-[#15803d] dark:text-emerald-400 font-semibold text-left hover:underline mt-auto cursor-pointer">
                      Investigate cohort →
                    </button>
                  </div>
                ))}
              </div>
            </GlassCard>

            {/* Critical Risks Identified */}
            <GlassCard className="p-5 flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <span className="font-bold text-[#0f172a] dark:text-white text-[13px]">Critical Risks Identified</span>
                <Info className="size-3.5 text-[#94a3b8] dark:text-slate-500" />
              </div>
              <div className="flex flex-col gap-2.5">
                {criticalRisks.map((r) => (
                  <div
                    key={r.title}
                    className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60"
                  >
                    <span
                      className="text-white text-[8px] font-bold px-2 py-1 rounded-md shrink-0 whitespace-nowrap"
                      style={{ background: r.severityBg }}
                    >
                      {r.severity}
                    </span>
                    <div className="flex flex-col gap-0.5 flex-1 min-w-0">
                      <p className="text-[11px] font-semibold text-[#0f172a] dark:text-slate-200">{r.title}</p>
                      <p className="text-[10.5px] text-[#64748b] dark:text-slate-400">{r.body}</p>
                    </div>
                    <button className="text-[11px] text-[#15803d] dark:text-emerald-400 font-semibold hover:underline shrink-0 cursor-pointer">
                      Review
                    </button>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>

        </div>
      </div>

      {/* ── Sticky Bottom Ask InSpin AI Bar ────────── */}
      <div
        className="shrink-0 border-t border-slate-200/80 dark:border-slate-800 px-8 py-2.5 flex items-center gap-3 flex-wrap bg-white/95 dark:bg-[#090d16]/95 backdrop-blur-md"
      >
        <div className="flex items-center gap-1.5 text-[#15803d] dark:text-emerald-400 shrink-0">
          <Sparkles className="size-3.5" />
          <span className="font-bold text-[12px]">Ask InSpin AI</span>
        </div>

        <div className="flex gap-2 flex-1 flex-wrap">
          {quickQuestions.map((q) => (
            <button
              key={q}
              className="text-[11px] font-medium text-[#334155] dark:text-slate-200 rounded-full px-3 py-1 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-[#dcfce7] dark:hover:bg-emerald-950/40 hover:border-[#86efac] dark:hover:border-emerald-800 hover:text-[#15803d] dark:hover:text-emerald-300 transition-all cursor-pointer"
            >
              {q}
            </button>
          ))}
        </div>

        <div
          className="flex items-center gap-2 rounded-xl px-3 py-1.5 shrink-0 w-52 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
        >
          <input
            type="text"
            placeholder="Ask a follow-up question..."
            value={askInput}
            onChange={(e) => setAskInput(e.target.value)}
            className="flex-1 text-[11px] text-[#334155] dark:text-slate-200 bg-transparent outline-none placeholder-slate-400 min-w-0"
          />
          <button className="flex items-center justify-center size-5 rounded-full bg-[#15803d] dark:bg-emerald-600 text-white shrink-0 cursor-pointer">
            <ChevronRight className="size-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
