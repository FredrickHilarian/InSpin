import React, { useState } from "react";
import {
  Sparkles,
  TrendingUp,
  TrendingDown,
  ArrowRight,
  TrendingUp as TrendUpIcon,
  MessageSquare,
  Sparkle,
  Share2,
  AlertCircle,
  CheckCircle,
  Bell,
  ChevronRight,
  Clock
} from "lucide-react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip
} from "recharts";

import { useSurveyData } from "../context/SurveyDataContext";

// --- Dummy Data ---

const responseCategories = [
  { name: "Extremely Satisfied", count: 1240, percentage: 44, color: "#10b981" },
  { name: "Somewhat Satisfied", count: 860, percentage: 30, color: "#34d399" },
  { name: "Neutral/Unsure", count: 420, percentage: 15, color: "#fbbf24" },
  { name: "Dissatisfied", count: 327, percentage: 11, color: "#f87171" }
];

const sentimentTrendData = [
  { date: "Jun 15", sentiment: 40 },
  { date: "Jun 20", sentiment: 55 },
  { date: "Jun 25", sentiment: 62 },
  { date: "Jul 01", sentiment: 58 },
  { date: "Jul 05", sentiment: 75 },
  { date: "Jul 10", sentiment: 82 },
  { date: "Jul 15", sentiment: 92 }
];

const signalFeed = [
  {
    id: 1,
    title: "iOS Mobile checkout errors detected",
    time: "10m ago",
    desc: "14.2% of users encountered gateway timeouts at page billing.",
    color: "border-red-500",
    bgColor: "bg-red-50"
  },
  {
    id: 2,
    title: "Clinical stress drops by 12%",
    time: "1h ago",
    desc: "Calming music and pre-arrival videos received 92% direct satisfaction points.",
    color: "border-emerald-500",
    bgColor: "bg-emerald-50"
  },
  {
    id: 3,
    title: "High volume of communication mentions",
    time: "3h ago",
    desc: "Scheduling alerts praised. Patients requested equivalent text summarization updates.",
    color: "border-blue-500",
    bgColor: "bg-blue-50"
  },
  {
    id: 4,
    title: "Follow-up speed delay highlighted",
    time: "1d ago",
    desc: "Critical path analysis outlines post-visit reports lagging 4.2 days behind core SLA.",
    color: "border-amber-500",
    bgColor: "bg-amber-50"
  }
];

const teamActivities = [
  { name: "Sarah K.", initial: "SK", action: "Viewed communication deep dive report", time: "5m ago", color: "bg-indigo-100 text-indigo-700" },
  { name: "John De.", initial: "JD", action: "Saved SMS follow-up recommendations", time: "42m ago", color: "bg-emerald-100 text-emerald-700" },
  { name: "Marcus L.", initial: "ML", action: "Generated full survey executive deck", time: "2h ago", color: "bg-amber-100 text-amber-700" },
  { name: "Esther W.", initial: "EW", action: "Isolated the dissatisfied payments cohort", time: "5h ago", color: "bg-rose-100 text-rose-700" }
];

// GlassCard container wrapper
function GlassCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`relative rounded-[20px] overflow-hidden ${className}`}
      style={{
        background: "rgba(255,255,255,0.85)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        border: "1px solid rgba(226,232,240,0.8)",
        boxShadow: "0 4px 20px rgba(15,23,42,0.04)"
      }}
    >
      {children}
    </div>
  );
}

interface ResearchOverviewProps {
  onGenerateReport?: () => void;
  onNavigate?: (tab: string) => void;
}

export default function ResearchOverview({ onGenerateReport, onNavigate }: ResearchOverviewProps) {
  const { dataset } = useSurveyData();
  const [generating, setGenerating] = useState(false);

  const handleGenerate = () => {
    setGenerating(true);
    setTimeout(() => {
      setGenerating(false);
      onGenerateReport?.();
    }, 600);
  };

  const npsData = [
    { name: "Promoters", value: dataset.promotersPct, color: "#10b981" },
    { name: "Passives", value: dataset.passivesPct, color: "#fbbf24" },
    { name: "Detractors", value: dataset.detractorsPct, color: "#f87171" }
  ];

  return (
    <div className="w-full overflow-y-auto flex flex-col h-[calc(100vh-120px)] relative">
      <div className="flex flex-col gap-6 p-10 w-full max-w-[1440px] mx-auto flex-1 pb-32">

        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 w-full">
          <div className="flex flex-col gap-1.5 items-start">
            <div className="flex items-center gap-2">
              <span className="bg-[#dcfce7] text-[#16a34a] font-bold text-[10px] px-2.5 py-1 rounded-full uppercase tracking-wider">
                Analysis Complete
              </span>
              <span className="text-[11px] text-[#64748b] font-medium">
                • {dataset.uploadedAt}
              </span>
            </div>
            <h1 className="font-['Inter:Bold',sans-serif] font-bold text-[#0f172a] text-3xl tracking-tight">
              {dataset.fileName}
            </h1>
            <p className="font-['Inter:Regular',sans-serif] font-normal text-[#64748b] text-[13px]">
              {dataset.totalRespondents} Verified Responses <span className="mx-1.5">•</span> NPS +{dataset.npsScore} <span className="mx-1.5">•</span> {dataset.positiveSentimentPct}% Positive Sentiment
            </p>
          </div>
          <button
            type="button"
            onClick={handleGenerate}
            disabled={generating}
            className="flex items-center justify-center gap-2 bg-[#15803d] hover:bg-[#166534] active:scale-95 text-white font-semibold text-[13px] px-4 py-2.5 rounded-xl transition-all shadow-sm self-start md:self-center shrink-0 cursor-pointer disabled:opacity-75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
          >
            <Sparkles className={`size-4 ${generating ? "animate-spin" : ""}`} />
            <span>{generating ? "Generating Report..." : "Generate Report"}</span>
          </button>
        </div>

        {/* Executive Summary & KPI Row */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 w-full">
          {/* Executive Summary Box (2/3 width) */}
          <div className="xl:col-span-2 relative rounded-3xl p-6 border border-purple-200 shadow-sm flex flex-col gap-6"
            style={{
              background: "linear-gradient(135deg, rgba(250, 245, 255, 0.9) 0%, rgba(255, 255, 255, 0.9) 100%)",
              backdropFilter: "blur(12px)"
            }}>
            {/* Header */}
            <div className="flex justify-between items-center w-full">
              <div className="flex items-center gap-2">
                <div className="bg-purple-100 text-purple-700 flex items-center justify-center rounded-lg size-8 shrink-0">
                  <Sparkle className="size-4.5 fill-purple-700" />
                </div>
                <h3 className="font-['Inter:Bold',sans-serif] font-bold text-[#0f172a] text-[16px]">
                  Executive Summary
                </h3>
              </div>
              <span className="bg-purple-100/70 border border-purple-200 text-purple-700 font-bold text-[9px] px-2 py-0.5 rounded-md uppercase tracking-wider">
                AI Engine V4.2
              </span>
            </div>

            {/* Content Body split in 2 columns: Text/Details and Graphical Card */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
              <div className="lg:col-span-2 flex flex-col gap-5">
                <p className="text-[#334155] text-[13px] leading-relaxed">
                  The Q3 survey reveals high overall satisfaction driven by significant process improvements in <strong className="text-emerald-800 font-semibold">Scheduling</strong> and on-site support. However, ongoing friction in mobile <strong className="text-rose-800 font-semibold">App checkout</strong> throws intermittent gateway timeouts and localized <strong className="text-amber-800 font-semibold">Travel</strong> times remain crucial bottlenecks that impact retention goals.
                </p>

                {/* Positive and Pain points */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Drivers */}
                  <div className="bg-emerald-50/50 border border-emerald-100 rounded-2xl p-4 flex flex-col gap-2">
                    <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider">
                      Key Positive Drivers
                    </span>
                    <ul className="text-emerald-950 text-[11px] leading-relaxed flex flex-col gap-1.5">
                      <li className="flex items-start gap-1">
                        <span className="text-emerald-600 select-none">•</span>
                        <span>Calming techniques successfully reduced clinical stress scores</span>
                      </li>
                      <li className="flex items-start gap-1">
                        <span className="text-emerald-600 select-none">•</span>
                        <span>Transparency in pre-appointment pricing received 92% approval</span>
                      </li>
                    </ul>
                  </div>

                  {/* Pain Points */}
                  <div className="bg-amber-50/50 border border-amber-100 rounded-2xl p-4 flex flex-col gap-2">
                    <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider">
                      Critical Pain Points
                    </span>
                    <ul className="text-amber-950 text-[11px] leading-relaxed flex flex-col gap-1.5">
                      <li className="flex items-start gap-1">
                        <span className="text-amber-600 select-none">•</span>
                        <span>Mobile app checkout throws intermittent gateway timeouts</span>
                      </li>
                      <li className="flex items-start gap-1">
                        <span className="text-amber-600 select-none">•</span>
                        <span>Post-visit follow up times average 4.2 days beyond target</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Graphical Card (Right column) */}
              <div className="relative h-full flex items-center justify-center lg:pl-4">
                <div className="relative w-full max-w-[200px] aspect-square bg-gradient-to-tr from-purple-100/80 to-indigo-50/50 rounded-2xl border border-purple-200/50 shadow-inner flex items-center justify-center p-3 overflow-hidden">
                  {/* Interactive mock UI card layout simulating glassmorphic visual */}
                  <div className="absolute size-40 bg-white/40 rounded-full blur-xl -top-10 -right-10 pointer-events-none" />
                  <div className="absolute size-40 bg-purple-200/30 rounded-full blur-xl -bottom-10 -left-10 pointer-events-none" />

                  <div className="relative w-full bg-white/70 backdrop-blur-md rounded-xl p-3 border border-white/60 shadow-md flex flex-col gap-2">
                    <div className="flex items-center justify-between border-b border-purple-100 pb-1.5">
                      <div className="flex items-center gap-1">
                        <span className="size-2 rounded-full bg-emerald-500" />
                        <span className="text-[9px] font-semibold text-slate-700">Patient Sentiment</span>
                      </div>
                      <span className="text-[8px] font-bold text-emerald-600">+14% ↑</span>
                    </div>
                    {/* Tiny custom graphic elements */}
                    <div className="flex items-end gap-1.5 h-16 pt-2 justify-center">
                      <div className="w-2.5 bg-purple-200 rounded-t-sm h-6" />
                      <div className="w-2.5 bg-purple-300 rounded-t-sm h-10" />
                      <div className="w-2.5 bg-purple-400 rounded-t-sm h-8" />
                      <div className="w-2.5 bg-purple-600 rounded-t-sm h-14 relative">
                        <div className="absolute -top-1.5 -left-1 size-4 rounded-full bg-white flex items-center justify-center shadow-sm">
                          <Sparkle className="size-2 text-purple-600 fill-purple-600" />
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center text-[7px] text-slate-400 font-medium px-1">
                      <span>Mon</span>
                      <span>Wed</span>
                      <span>Fri</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recommendations Footer */}
            <div className="border-t border-purple-100 pt-4 flex flex-col gap-2.5 bg-purple-50/20 rounded-b-3xl -mx-6 -mb-6 p-6">
              <span className="text-[10px] font-bold text-purple-700 uppercase tracking-wider">
                Strategic Recommendations
              </span>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 flex gap-2">
                  <span className="font-bold text-purple-600 text-[12px]">1.</span>
                  <p className="text-[11.5px] text-slate-700 leading-normal">
                    Deploy the unified checkout gateway patch to eliminate intermittent iOS app checkout crashes.
                  </p>
                </div>
                <div className="flex-1 flex gap-2">
                  <span className="font-bold text-purple-600 text-[12px]">2.</span>
                  <p className="text-[11.5px] text-slate-700 leading-normal">
                    Establish real-time SMS triggers to satisfy patients demanding immediate cost summaries.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Metric Cards Column (1/3 width) */}
          <div className="flex flex-col gap-4">

            {/* Card 1: Response Completion */}
            <GlassCard className="p-4 flex flex-col gap-1.5">
              <span className="text-[9px] font-bold text-[#64748b] uppercase tracking-wider">
                Response Completion
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-[#0f172a]">94.2%</span>
                <span className="text-[11px] font-semibold text-emerald-600 flex items-center">
                  ↑ +3.1%
                </span>
              </div>
              <p className="text-[11px] text-[#64748b]">
                Compared to average industry benchmark (88%)
              </p>
            </GlassCard>

            {/* Card 2: Average Satisfaction */}
            <GlassCard className="p-4 flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-bold text-[#64748b] uppercase tracking-wider">
                  Average Satisfaction
                </span>
                <span className="bg-emerald-100 text-emerald-800 text-[9px] font-bold px-2 py-0.5 rounded-full">
                  Excellent
                </span>
              </div>
              <span className="text-2xl font-bold text-[#0f172a]">4.2/5.0</span>
              {/* Custom sleek progress bar */}
              <div className="w-full bg-slate-100 rounded-full h-2 mt-1 overflow-hidden">
                <div className="bg-gradient-to-r from-emerald-400 to-emerald-600 h-full rounded-full" style={{ width: "84%" }} />
              </div>
            </GlassCard>

            {/* Card 3: NPS Score */}
            <GlassCard className="p-4 flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-bold text-[#64748b] uppercase tracking-wider">
                  NPS Score
                </span>
                <span className="text-[#64748b] text-[10px] font-medium">
                  62% Promoters
                </span>
              </div>
              <span className="text-2xl font-bold text-[#0f172a]">+47</span>
              {/* Segmented bar */}
              <div className="w-full flex h-2 rounded-full overflow-hidden mt-1 gap-[2px]">
                <div className="bg-emerald-500 h-full" style={{ width: "62%" }} />
                <div className="bg-amber-400 h-full" style={{ width: "23%" }} />
                <div className="bg-rose-500 h-full" style={{ width: "15%" }} />
              </div>
            </GlassCard>

            {/* Card 4: Overall Sentiment */}
            <GlassCard className="p-4 flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-bold text-[#64748b] uppercase tracking-wider">
                  Overall Sentiment
                </span>
                <span className="text-emerald-600 text-[10px] font-semibold">
                  72% Ratio
                </span>
              </div>
              <span className="text-2xl font-bold text-[#0f172a]">Positive</span>
              <p className="text-[11px] text-[#64748b]">
                Based on 1,842 open-ended feedback rows parsed
              </p>
            </GlassCard>

          </div>
        </div>

        {/* Top Insights Grid */}
        <div className="flex flex-col gap-4 w-full mt-2">
          <div className="flex justify-between items-center w-full">
            <h2 className="font-['Inter:Bold',sans-serif] font-bold text-[#0f172a] text-lg">
              Top Insights
            </h2>
            <button
              type="button"
              onClick={() => onNavigate?.("Themes")}
              className="text-emerald-700 hover:text-emerald-800 font-semibold text-[12px] flex items-center gap-0.5 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-500 rounded-lg px-1.5 py-0.5"
            >
              <span>Explore All Themes</span>
              <ChevronRight className="size-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {/* Theme 1: Scheduling */}
            <GlassCard className="p-5 flex flex-col gap-4 hover:shadow-md transition-all">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="size-2 rounded-full bg-emerald-500" />
                  <span className="font-semibold text-slate-800 text-[13px]">Scheduling</span>
                </div>
                <span className="text-[11px] text-slate-400 font-medium">842 Mentions</span>
              </div>
              <div className="flex items-baseline justify-between mt-1">
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wide">Trend</span>
                  <span className="text-[14px] font-bold text-emerald-600">+14.2% Growth</span>
                </div>
                <span className="bg-emerald-50 text-emerald-700 font-semibold text-[9px] px-2 py-0.5 rounded-full">
                  94% Confidence
                </span>
              </div>
              <div className="flex justify-between items-center mt-1 border-t border-slate-100 pt-3">
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-400">Sentiment</span>
                  <span className="text-[12px] font-semibold text-emerald-600">Highly Positive</span>
                </div>
                {/* Custom Sparkline */}
                <svg className="w-24 h-8 text-emerald-500" fill="none" viewBox="0 0 100 30">
                  <path d="M0,25 Q15,20 30,10 T60,18 T90,5 T100,2" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
              </div>
            </GlassCard>

            {/* Theme 2: Communication */}
            <GlassCard className="p-5 flex flex-col gap-4 hover:shadow-md transition-all">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="size-2 rounded-full bg-emerald-500" />
                  <span className="font-semibold text-slate-800 text-[13px]">Communication</span>
                </div>
                <span className="text-[11px] text-slate-400 font-medium">711 Mentions</span>
              </div>
              <div className="flex items-baseline justify-between mt-1">
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wide">Trend</span>
                  <span className="text-[14px] font-bold text-emerald-600">+8.6% Stable</span>
                </div>
                <span className="bg-emerald-50 text-emerald-700 font-semibold text-[9px] px-2 py-0.5 rounded-full">
                  94% Confidence
                </span>
              </div>
              <div className="flex justify-between items-center mt-1 border-t border-slate-100 pt-3">
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-400">Sentiment</span>
                  <span className="text-[12px] font-semibold text-emerald-600">Positive</span>
                </div>
                {/* Custom Sparkline */}
                <svg className="w-24 h-8 text-emerald-400" fill="none" viewBox="0 0 100 30">
                  <path d="M0,20 Q10,18 20,25 T40,15 T60,20 T80,10 T100,8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
              </div>
            </GlassCard>

            {/* Theme 3: Payments */}
            <GlassCard className="p-5 flex flex-col gap-4 hover:shadow-md transition-all">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="size-2 rounded-full bg-indigo-500" />
                  <span className="font-semibold text-slate-800 text-[13px]">Payments</span>
                </div>
                <span className="text-[11px] text-slate-400 font-medium">428 Mentions</span>
              </div>
              <div className="flex items-baseline justify-between mt-1">
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wide">Trend</span>
                  <span className="text-[14px] font-bold text-indigo-600">-4.1% Dip</span>
                </div>
                <span className="bg-indigo-50 text-indigo-700 font-semibold text-[9px] px-2 py-0.5 rounded-full">
                  94% Confidence
                </span>
              </div>
              <div className="flex justify-between items-center mt-1 border-t border-slate-100 pt-3">
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-400">Sentiment</span>
                  <span className="text-[12px] font-semibold text-indigo-500">Frustrated</span>
                </div>
                {/* Custom Sparkline */}
                <svg className="w-24 h-8 text-indigo-400" fill="none" viewBox="0 0 100 30">
                  <path d="M0,8 Q20,10 45,22 T80,18 T100,28" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
              </div>
            </GlassCard>

            {/* Theme 4: Travel / Logistics */}
            <GlassCard className="p-5 flex flex-col gap-4 hover:shadow-md transition-all">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="size-2 rounded-full bg-amber-500" />
                  <span className="font-semibold text-slate-800 text-[13px]">Travel / Logistics</span>
                </div>
                <span className="text-[11px] text-slate-400 font-medium">315 Mentions</span>
              </div>
              <div className="flex items-baseline justify-between mt-1">
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wide">Trend</span>
                  <span className="text-[14px] font-bold text-amber-600">+12% Spiking</span>
                </div>
                <span className="bg-amber-50 text-amber-700 font-semibold text-[9px] px-2 py-0.5 rounded-full">
                  94% Confidence
                </span>
              </div>
              <div className="flex justify-between items-center mt-1 border-t border-slate-100 pt-3">
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-400">Sentiment</span>
                  <span className="text-[12px] font-semibold text-amber-600">Neutral</span>
                </div>
                {/* Custom Sparkline */}
                <svg className="w-24 h-8 text-amber-500" fill="none" viewBox="0 0 100 30">
                  <path d="M0,28 Q15,28 35,22 T65,15 T85,14 T100,4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
              </div>
            </GlassCard>

            {/* Theme 5: Equipment */}
            <GlassCard className="p-5 flex flex-col gap-4 hover:shadow-md transition-all">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="size-2 rounded-full bg-sky-500" />
                  <span className="font-semibold text-slate-800 text-[13px]">Equipment</span>
                </div>
                <span className="text-[11px] text-slate-400 font-medium">290 Mentions</span>
              </div>
              <div className="flex items-baseline justify-between mt-1">
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wide">Trend</span>
                  <span className="text-[14px] font-bold text-sky-600">Flat</span>
                </div>
                <span className="bg-sky-50 text-sky-700 font-semibold text-[9px] px-2 py-0.5 rounded-full">
                  94% Confidence
                </span>
              </div>
              <div className="flex justify-between items-center mt-1 border-t border-slate-100 pt-3">
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-400">Sentiment</span>
                  <span className="text-[12px] font-semibold text-sky-600">Positive</span>
                </div>
                {/* Custom Sparkline */}
                <svg className="w-24 h-8 text-sky-400" fill="none" viewBox="0 0 100 30">
                  <path d="M0,15 L20,16 L40,15 L60,16 L80,15 L100,15" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
              </div>
            </GlassCard>

            {/* Theme 6: Work Orders */}
            <GlassCard className="p-5 flex flex-col gap-4 hover:shadow-md transition-all">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="size-2 rounded-full bg-slate-400" />
                  <span className="font-semibold text-slate-800 text-[13px]">Work Orders</span>
                </div>
                <span className="text-[11px] text-slate-400 font-medium">180 Mentions</span>
              </div>
              <div className="flex items-baseline justify-between mt-1">
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wide">Trend</span>
                  <span className="text-[14px] font-bold text-slate-600">+2.4% Slow</span>
                </div>
                <span className="bg-slate-50 text-slate-700 font-semibold text-[9px] px-2 py-0.5 rounded-full">
                  94% Confidence
                </span>
              </div>
              <div className="flex justify-between items-center mt-1 border-t border-slate-100 pt-3">
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-400">Sentiment</span>
                  <span className="text-[12px] font-semibold text-slate-500">Frustrated</span>
                </div>
                {/* Custom Sparkline */}
                <svg className="w-24 h-8 text-slate-400" fill="none" viewBox="0 0 100 30">
                  <path d="M0,18 L30,18 L60,18 L90,18 L100,18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
              </div>
            </GlassCard>

          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full mt-2">

          {/* Chart 1: Response Categories */}
          <GlassCard className="p-5 flex flex-col gap-5">
            <h3 className="font-semibold text-slate-800 text-[14px]">
              Response Categories
            </h3>
            <div className="flex flex-col gap-4 flex-1 justify-center">
              {responseCategories.map((item) => (
                <div key={item.name} className="flex flex-col gap-1">
                  <div className="flex justify-between text-[11.5px] text-slate-700">
                    <span className="font-medium">{item.name}</span>
                    <span className="font-bold">{item.count}</span>
                  </div>
                  <div className="w-full bg-slate-100 h-6 rounded-[4px] relative overflow-hidden">
                    <div
                      className="h-full rounded-[4px] transition-all"
                      style={{
                        width: `${item.percentage}%`,
                        backgroundColor: item.color
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>

          {/* Chart 2: NPS Breakdown */}
          <GlassCard className="p-5 flex flex-col gap-4 items-center">
            <h3 className="font-semibold text-slate-800 text-[14px] self-start">
              NPS Breakdown
            </h3>

            {/* Donut Chart */}
            <div className="relative size-40 flex items-center justify-center mt-2">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={npsData}
                    cx="50%"
                    cy="50%"
                    innerRadius={52}
                    outerRadius={66}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {npsData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute flex flex-col items-center justify-center">
                <span className="text-2xl font-black text-slate-800 leading-none">+47</span>
                <span className="text-[10px] text-slate-400 font-bold uppercase mt-1">NPS Score</span>
              </div>
            </div>

            {/* Custom Legend */}
            <div className="flex justify-center gap-4 mt-2">
              {npsData.map((item) => (
                <div key={item.name} className="flex items-center gap-1.5 text-[11px] text-slate-600 font-medium">
                  <span className="size-2 rounded-full" style={{ backgroundColor: item.color }} />
                  <span>{item.name} ({item.value}%)</span>
                </div>
              ))}
            </div>
          </GlassCard>

          {/* Chart 3: Sentiment Trend */}
          <GlassCard className="p-5 flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-slate-800 text-[14px]">
                Sentiment Trend
              </h3>
              <button
                type="button"
                onClick={() => onNavigate?.("AI Insights")}
                className="text-emerald-700 hover:text-emerald-800 font-semibold text-[11px] transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-500 rounded px-1"
              >
                Explore sentiment →
              </button>
            </div>

            {/* Recharts Area Chart */}
            <div className="w-full h-36 mt-2">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={sentimentTrendData} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorSentiment" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.25} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="date" tick={{ fontSize: 9, fill: "#64748b" }} tickLine={false} axisLine={false} />
                  <YAxis tick={{ fontSize: 9, fill: "#64748b" }} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ fontSize: "11px", borderRadius: "8px", border: "1px solid #e2e8f0" }} />
                  <Area type="monotone" dataKey="sentiment" stroke="#10b981" strokeWidth={2.5} fillOpacity={1} fill="url(#colorSentiment)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>

        </div>

        {/* AI Signal Feed & Team Activity Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full mt-2">

          {/* Left Column: AI Signal Feed (2/3 width) */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <div className="flex justify-between items-center w-full">
              <div className="flex items-center gap-1.5">
                <Bell className="size-4.5 text-[#16a34a]" />
                <h2 className="font-['Inter:Bold',sans-serif] font-bold text-[#0f172a] text-lg">
                  AI Signal Feed
                </h2>
              </div>
              <button
                type="button"
                onClick={() => onNavigate?.("Settings")}
                className="text-purple-700 hover:text-purple-800 font-semibold text-[12px] transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-purple-500 rounded px-1.5 py-0.5"
              >
                Configure Feed Alerts
              </button>
            </div>

            <div className="flex flex-col gap-3">
              {signalFeed.map((item) => (
                <div
                  key={item.id}
                  className={`border-l-4 ${item.color} ${item.bgColor} p-4 rounded-r-xl flex flex-col gap-1 shadow-sm transition-all hover:translate-x-1`}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-[12.5px] text-slate-800">{item.title}</span>
                    <span className="text-[10px] text-slate-400 flex items-center gap-1">
                      <Clock className="size-3" />
                      {item.time}
                    </span>
                  </div>
                  <p className="text-[11.5px] text-slate-600 leading-normal">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Team Activity (1/3 width) */}
          <div className="flex flex-col gap-4">
            <h2 className="font-['Inter:Bold',sans-serif] font-bold text-[#0f172a] text-lg">
              Team Activity
            </h2>

            <GlassCard className="p-4 flex flex-col gap-4">
              {teamActivities.map((act, i) => (
                <div key={act.name} className={`flex items-start gap-3 ${i !== teamActivities.length - 1 ? 'border-b border-slate-100 pb-3.5' : ''}`}>
                  <div className={`size-8 rounded-full flex items-center justify-center font-bold text-[11px] shrink-0 ${act.color}`}>
                    {act.initial}
                  </div>
                  <div className="flex flex-col flex-1 gap-0.5">
                    <div className="flex justify-between items-baseline">
                      <span className="font-semibold text-slate-800 text-[12px]">{act.name}</span>
                      <span className="text-[9.5px] text-slate-400">{act.time}</span>
                    </div>
                    <p className="text-[11px] text-slate-500 leading-normal">
                      {act.action}
                    </p>
                  </div>
                </div>
              ))}
            </GlassCard>
          </div>

        </div>

      </div>
    </div>
  );
}
