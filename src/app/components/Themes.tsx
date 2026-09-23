import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  Calendar,
  Sparkles,
  TrendingUp,
  Bookmark,
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
  ArrowDownRight,
  Users,
  Search,
  Grid,
  Percent,
  CheckCircle,
  MessageSquare,
  Building,
  MapPin,
  Clock,
  Briefcase,
  Layers,
  BarChart,
  Settings,
  HelpCircle,
  ArrowRight,
} from "lucide-react";

// --- Types ---
interface KpiCardProps {
  icon: React.ReactNode;
  value: string;
  label: string;
  subtext: string;
  subtextColor?: string;
  iconBg: string;
  iconColor: string;
}

// --- KPI Card Component ---
function KpiCard({ icon, value, label, subtext, subtextColor = "text-slate-500", iconBg, iconColor }: KpiCardProps) {
  return (
    <div
      className="flex-1 min-w-[200px] rounded-[20px] p-[24px] transition-all duration-300 hover:shadow-md"
      style={{
        background: "rgba(255, 255, 255, 0.8)",
        backdropFilter: "blur(12px)",
        border: "1px solid rgba(226, 232, 240, 0.8)",
        boxShadow: "0 4px 16px rgba(15, 23, 42, 0.02)",
      }}
    >
      <div className="flex flex-col gap-[12px]">
        <div className="flex items-center gap-[10px]">
          <div className={`${iconBg} ${iconColor} flex items-center justify-center rounded-[10px] size-[36px] shrink-0`}>
            {icon}
          </div>
          <span className="font-['Inter',sans-serif] font-semibold text-slate-500 text-[11px] uppercase tracking-wider">
            {label}
          </span>
        </div>
        <div className="flex flex-col gap-[2px]">
          <span className="font-['Inter',sans-serif] font-bold text-slate-900 text-[32px] leading-tight">
            {value}
          </span>
          <span className={`font-['Inter',sans-serif] font-medium text-[12px] ${subtextColor}`}>
            {subtext}
          </span>
        </div>
      </div>
    </div>
  );
}

// --- Main Themes Page Component ---
export default function Themes() {
  // Line chart data matching the screenshot
  const timelineData = [
    { name: "Jan '25", satisfaction: 75 },
    { name: "Feb '25", satisfaction: 74 },
    { name: "Mar '25", satisfaction: 38 },
    { name: "Apr '25", satisfaction: 39 },
    { name: "May '25", satisfaction: 45 },
    { name: "Jun '25", satisfaction: 40 },
  ];

  // Pie chart data for Sentiment Distribution
  const sentimentDistributionData = [
    { name: "Very Negative", value: 19, color: "#ef4444" },
    { name: "Negative", value: 43, color: "#f97316" },
    { name: "Neutral", value: 21, color: "#94a3b8" },
    { name: "Positive", value: 12, color: "#4ade80" },
    { name: "Very Positive", value: 5, color: "#166534" },
  ];

  return (
    <div className="w-full overflow-y-auto flex flex-col h-[calc(100vh-120px)] relative">
      <div className="flex flex-col gap-[28px] items-start p-[32px] w-full max-w-[1440px] mx-auto pb-32">

        {/* --- Header Section --- */}
        <div className="flex items-center justify-between w-full">
          <div className="flex flex-col gap-[6px] items-start">
            {/* Breadcrumbs */}
            <div className="flex items-center gap-[6px] text-[12px] font-medium text-slate-400">
              <span>Home</span>
              <ChevronRight className="size-[12px]" />
              <span>Themes</span>
              <ChevronRight className="size-[12px]" />
              <span className="text-slate-600">Scheduling</span>
            </div>

            {/* Title & Stats */}
            <div className="flex items-center gap-[12px] mt-[2px]">
              <div className="bg-[#e8f7f0] text-[#059669] p-[10px] rounded-[12px] flex items-center justify-center">
                <Calendar className="size-[24px]" />
              </div>
              <div className="flex flex-col">
                <h1 className="font-['Inter',sans-serif] font-bold text-[#0f172a] text-[32px] leading-tight">
                  Scheduling
                </h1>
                <p className="font-['Inter',sans-serif] font-medium text-slate-500 text-[13px] mt-[2px]">
                  842 mentions across 312 respondents
                </p>
              </div>
            </div>

            {/* Status Badges */}
            <div className="flex items-center gap-[8px] mt-[6px]">
              <span className="px-[10px] py-[3.5px] rounded-full text-[11px] font-bold tracking-wide bg-[#e0f2fe] text-[#0369a1]">
                High Priority
              </span>
              <span className="px-[10px] py-[3.5px] rounded-full text-[11px] font-bold tracking-wide bg-[#ffedd5] text-[#c2410c]">
                Trending Up
              </span>
              <span className="px-[10px] py-[3.5px] rounded-full text-[11px] font-bold tracking-wide bg-[#f3e8ff] text-[#6b21a8]">
                94% Confidence
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-[12px]">
            <button className="flex items-center gap-[8px] px-[16px] py-[10px] rounded-[12px] bg-white border border-[#e2e8f0] text-slate-700 font-semibold text-[13.5px] shadow-sm hover:bg-slate-50 transition-all cursor-pointer">
              <Bookmark className="size-[15px] text-slate-400" />
              <span>Save Finding</span>
            </button>
            <div className="flex items-center">
              <button className="flex items-center gap-[6px] px-[18px] py-[10px] rounded-[12px] bg-[#15803d] text-white font-semibold text-[13.5px] shadow-sm hover:bg-[#0f766e] transition-all cursor-pointer">
                <span>Add to Report</span>
                <ChevronRight className="size-[14px] rotate-90" />
              </button>
            </div>
          </div>
        </div>

        {/* --- KPI Cards Grid --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-[16px] w-full">
          <KpiCard
            icon={<Layers className="size-[18px]" />}
            value="842"
            label="Total Mentions"
            subtext="High-volume topic"
            iconBg="bg-teal-50"
            iconColor="text-teal-600"
          />
          <KpiCard
            icon={<Percent className="size-[18px]" />}
            value="62%"
            label="Negative Sentiment"
            subtext="↓ 8% vs previous survey"
            subtextColor="text-rose-600"
            iconBg="bg-rose-50"
            iconColor="text-rose-600"
          />
          <KpiCard
            icon={<TrendingUp className="size-[18px]" />}
            value="+14.2%"
            label="Growth Rate"
            subtext="↑ vs previous survey"
            subtextColor="text-emerald-600"
            iconBg="bg-emerald-50"
            iconColor="text-emerald-600"
          />
          <KpiCard
            icon={<Sparkles className="size-[18px]" />}
            value="94%"
            label="AI Confidence"
            subtext="Strong AI-powered mapping"
            iconBg="bg-purple-50"
            iconColor="text-purple-600"
          />
          <KpiCard
            icon={<Users className="size-[18px]" />}
            value="312"
            label="Total Respondents"
            subtext="100% completion rate"
            iconBg="bg-amber-50"
            iconColor="text-amber-600"
          />
        </div>

        {/* --- AI Synthesis Narrative (Purple Gradient Banner) --- */}
        <div
          className="relative rounded-[24px] p-[28px] w-full overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-[24px]"
          style={{
            background: "linear-gradient(135deg, #f5f3ff 0%, #ede9fe 100%)",
            border: "1px solid rgba(224, 207, 252, 0.6)",
            boxShadow: "0 10px 30px -10px rgba(139, 92, 246, 0.08)",
          }}
        >
          {/* Sparkly Background Decorative elements */}
          <div className="absolute right-0 top-0 bottom-0 w-[300px] pointer-events-none opacity-20 flex items-center justify-end pr-8">
            <svg width="220" height="150" viewBox="0 0 220 150" fill="none">
              <path d="M40 80 C 80 20, 140 120, 220 50" stroke="#8b5cf6" strokeWidth="3" strokeDasharray="6 6" />
              <circle cx="160" cy="90" r="28" stroke="#8b5cf6" strokeWidth="2" fill="none" />
              <circle cx="90" cy="40" r="14" fill="#a78bfa" />
            </svg>
          </div>

          <div className="flex flex-col gap-[14px] max-w-[900px] relative z-10">
            <div className="flex items-center gap-[8px]">
              <div className="bg-[#ddd6fe] text-[#6d28d9] p-[6px] rounded-[8px]">
                <Sparkles className="size-[15px]" />
              </div>
              <h3 className="font-['Inter',sans-serif] font-bold text-[#4c1d95] text-[15px]">
                AI Synthesis Narrative
              </h3>
            </div>
            <p className="font-['Inter',sans-serif] text-[13.5px] leading-relaxed text-[#5c3e91]">
              Scheduling flexibility has emerged as the single most emotionally charged topic in this survey cycle. The data reveals a clear story: following the Q1 overtime policy update, employees with established scheduling autonomy experienced an acute sense of loss. The frustration is not uniformly distributed — it concentrates in Engineering (72% negative) and Operations (60% negative). Departments where on-site presence requirements collide directly with the reduced flexibility. Notably, the intensity of negative sentiment — measured by language strength and response length — exceeds the raw frequency, suggesting deep-seated frustration rather than casual dissatisfaction. New hires (under 1 year) show significantly lower frustration (31% negative), having no baseline comparison.
            </p>
            <div className="flex flex-wrap items-center gap-[8px] mt-[4px]">
              <span className="px-[12px] py-[5px] rounded-[8px] bg-white border border-[#ddd6fe] text-[#6d28d9] font-semibold text-[11px] hover:bg-[#faf9ff] transition-all cursor-pointer shadow-sm">
                Policy-to-Action Change
              </span>
              <span className="px-[12px] py-[5px] rounded-[8px] bg-white border border-[#ddd6fe] text-[#6d28d9] font-semibold text-[11px] hover:bg-[#faf9ff] transition-all cursor-pointer shadow-sm">
                Department Concentration
              </span>
              <span className="px-[12px] py-[5px] rounded-[8px] bg-white border border-[#ddd6fe] text-[#6d28d9] font-semibold text-[11px] hover:bg-[#faf9ff] transition-all cursor-pointer shadow-sm">
                Tenure Correlation
              </span>
              <button className="flex items-center gap-[4px] text-[12px] font-bold text-[#0d9488] ml-[8px] hover:text-[#0f766e] transition-colors">
                <span>View Details</span>
                <ArrowRight className="size-[13px]" />
              </button>
            </div>
          </div>
        </div>

        {/* --- Sentiment Timeline & Distribution Section --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[24px] w-full">
          {/* Sentiment Timeline Chart Card */}
          <div
            className="rounded-[24px] p-[28px] flex flex-col gap-[20px]"
            style={{
              background: "white",
              border: "1px solid rgba(226, 232, 240, 0.8)",
              boxShadow: "0 4px 16px rgba(15, 23, 42, 0.02)",
            }}
          >
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-[2px]">
                <h3 className="font-['Inter',sans-serif] font-bold text-[#0f172a] text-[16px]">
                  Sentiment Timeline
                </h3>
                <p className="font-['Inter',sans-serif] text-[12.5px] text-slate-400">
                  Satisfaction percentage trajectory (Jan – Jun 2025)
                </p>
              </div>
              <button className="flex items-center gap-[6px] px-[12px] py-[6px] rounded-[10px] bg-slate-50 border border-slate-200 text-slate-600 font-semibold text-[12px] hover:bg-slate-100 transition-all cursor-pointer">
                <span>Monthly</span>
                <ChevronRight className="size-[12px] rotate-90" />
              </button>
            </div>

            {/* Line Chart Area */}
            <div className="h-[220px] w-full relative mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={timelineData} margin={{ top: 20, right: 30, left: -20, bottom: 5 }}>
                  <XAxis
                    dataKey="name"
                    stroke="#94a3b8"
                    fontSize={11}
                    fontWeight={500}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="#94a3b8"
                    fontSize={11}
                    fontWeight={500}
                    tickLine={false}
                    axisLine={false}
                    domain={[0, 100]}
                    tickFormatter={(v) => `${v}%`}
                  />
                  <RechartsTooltip
                    contentStyle={{
                      background: "rgba(15, 23, 42, 0.9)",
                      border: "none",
                      borderRadius: "8px",
                      color: "white",
                      fontSize: "12px",
                      padding: "8px 12px",
                    }}
                    formatter={(v) => [`${v}% Satisfaction`]}
                  />
                  <Line
                    type="monotone"
                    dataKey="satisfaction"
                    stroke="#0d9488"
                    strokeWidth={3}
                    dot={{ r: 5, stroke: "#0d9488", strokeWidth: 2, fill: "white" }}
                    activeDot={{ r: 7 }}
                  />
                </LineChart>
              </ResponsiveContainer>

              {/* Policy Update Tooltip Annotation overlay pointing to March */}
              <div
                className="absolute bg-slate-900 text-white rounded-[10px] px-[12px] py-[8px] shadow-lg pointer-events-none flex flex-col z-10"
                style={{
                  top: "60px",
                  left: "38%",
                  transform: "translateX(-50%)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                <span className="font-['Inter',sans-serif] font-bold text-[11px] text-white">
                  March Policy Update
                </span>
                <span className="font-['Inter',sans-serif] text-[10px] text-slate-300">
                  impact on sentiment
                </span>
                <div
                  className="absolute w-2 h-2 bg-slate-900 rotate-45"
                  style={{
                    bottom: "-4px",
                    left: "50%",
                    marginLeft: "-4px",
                  }}
                />
              </div>
            </div>

            {/* Note text */}
            <div className="flex items-start gap-[8px] bg-slate-50 border border-slate-100 rounded-[14px] p-[12px] mt-2">
              <span className="text-[#0d9488] text-[14px] leading-none mt-0.5">ⓘ</span>
              <p className="font-['Inter',sans-serif] text-[12px] text-slate-500 leading-normal">
                The March policy update introduced better 2-week shift view and swap options, leading to noticeable improvement in sentiment from April onwards.
              </p>
            </div>
          </div>

          {/* Sentiment Distribution Donut Card */}
          <div
            className="rounded-[24px] p-[28px] flex flex-col gap-[20px]"
            style={{
              background: "white",
              border: "1px solid rgba(226, 232, 240, 0.8)",
              boxShadow: "0 4px 16px rgba(15, 23, 42, 0.02)",
            }}
          >
            <div className="flex flex-col gap-[2px]">
              <h3 className="font-['Inter',sans-serif] font-bold text-[#0f172a] text-[16px]">
                Sentiment Distribution
              </h3>
              <p className="font-['Inter',sans-serif] text-[12.5px] text-slate-400">
                Based on 3,112 survey responses
              </p>
            </div>

            {/* Donut and Legend row */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-[24px] mt-2">
              {/* Donut Chart */}
              <div className="relative size-[160px] shrink-0">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={sentimentDistributionData}
                      cx="50%"
                      cy="50%"
                      innerRadius={55}
                      outerRadius={75}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {sentimentDistributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                {/* Center text */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="font-['Inter',sans-serif] font-bold text-slate-800 text-[24px] leading-none">
                    62%
                  </span>
                  <span className="font-['Inter',sans-serif] font-semibold text-slate-400 text-[11px] uppercase tracking-wider mt-1">
                    Negative
                  </span>
                </div>
              </div>

              {/* Legend List */}
              <div className="flex flex-col gap-[8px] flex-1 w-full sm:w-auto">
                {sentimentDistributionData.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-[8px]">
                      <div className="size-[8px] rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                      <span className="font-['Inter',sans-serif] font-medium text-slate-500 text-[12.5px]">
                        {item.name}
                      </span>
                    </div>
                    <span className="font-['Inter',sans-serif] font-bold text-slate-800 text-[12.5px]">
                      {item.value}%
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Distribution analysis summary */}
            <div className="flex items-start gap-[8px] bg-slate-50 border border-slate-100 rounded-[14px] p-[12px] mt-[10px]">
              <p className="font-['Inter',sans-serif] text-[12px] text-slate-500 leading-normal">
                The distribution shows that while most employees lean negative, there's still a substantial 17% who feel positive about scheduling — a growth opportunity we should continue to nurture.
              </p>
            </div>
          </div>
        </div>

        {/* --- Connected Questions Section --- */}
        <div className="flex flex-col gap-[16px] w-full mt-2">
          <div className="flex items-center justify-between w-full">
            <h3 className="font-['Inter',sans-serif] font-bold text-[#0f172a] text-[16px]">
              Connected Questions
            </h3>
            <button className="flex items-center gap-[4px] text-[13px] font-bold text-[#0d9488] hover:text-[#0f766e] transition-colors">
              <span>View all questions</span>
              <ArrowRight className="size-[13px]" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-[18px] w-full">
            {/* Card 1 */}
            <div
              className="rounded-[20px] p-[20px] bg-white flex flex-col justify-between h-[230px]"
              style={{
                border: "1px solid rgba(226, 232, 240, 0.8)",
                boxShadow: "0 4px 16px rgba(15, 23, 42, 0.01)",
              }}
            >
              <div className="flex flex-col gap-[12px]">
                <div className="flex items-center gap-[6px] text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  <span>Q1</span>
                  <span>•</span>
                  <span>Single Choice</span>
                  <span>•</span>
                  <span>3,112 Responses</span>
                </div>
                <h4 className="font-['Inter',sans-serif] font-bold text-slate-800 text-[14px] leading-snug">
                  How satisfied are you with your current work schedule flexibility?
                </h4>
              </div>

              <div className="flex flex-col gap-[14px]">
                {/* Visualizer bars */}
                <div className="flex items-end justify-between h-[36px] px-2 gap-1.5">
                  <div className="w-full bg-[#14532d] h-[60%] rounded-[3px]" />
                  <div className="w-full bg-[#166534] h-[85%] rounded-[3px]" />
                  <div className="w-full bg-[#15803d] h-[40%] rounded-[3px]" />
                  <div className="w-full bg-[#16a34a] h-[25%] rounded-[3px]" />
                  <div className="w-full bg-[#22c55e] h-[10%] rounded-[3px]" />
                </div>
                <div className="flex items-center justify-between border-t border-slate-50 pt-[12px]">
                  <span className="text-[11px] font-bold text-slate-400">3,112 RESPONSES</span>
                  <button className="flex items-center gap-[4px] text-[11.5px] font-bold text-[#0d9488] hover:text-[#0f766e] transition-colors">
                    <span>View Analysis</span>
                    <ArrowRight className="size-[12px]" />
                  </button>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div
              className="rounded-[20px] p-[20px] bg-white flex flex-col justify-between h-[230px]"
              style={{
                border: "1px solid rgba(226, 232, 240, 0.8)",
                boxShadow: "0 4px 16px rgba(15, 23, 42, 0.01)",
              }}
            >
              <div className="flex flex-col gap-[12px]">
                <div className="flex items-center gap-[6px] text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  <span>Q2</span>
                  <span>•</span>
                  <span>5-Point Scale</span>
                  <span>•</span>
                  <span>3,112 Responses</span>
                </div>
                <h4 className="font-['Inter',sans-serif] font-bold text-slate-800 text-[14px] leading-snug">
                  Work-life balance is easy to maintain with my schedule.
                </h4>
              </div>

              <div className="flex flex-col gap-[14px]">
                {/* Visualizer bars */}
                <div className="flex items-end justify-between h-[36px] px-2 gap-1.5">
                  <div className="w-full bg-[#15803d] h-[20%] rounded-[3px]" />
                  <div className="w-full bg-[#16a34a] h-[45%] rounded-[3px]" />
                  <div className="w-full bg-[#22c55e] h-[75%] rounded-[3px]" />
                  <div className="w-full bg-[#4ade80] h-[30%] rounded-[3px]" />
                  <div className="w-full bg-[#86efac] h-[15%] rounded-[3px]" />
                </div>
                <div className="flex items-center justify-between border-t border-slate-50 pt-[12px]">
                  <span className="text-[11px] font-bold text-slate-400">3,112 RESPONSES</span>
                  <button className="flex items-center gap-[4px] text-[11.5px] font-bold text-[#0d9488] hover:text-[#0f766e] transition-colors">
                    <span>View Analysis</span>
                    <ArrowRight className="size-[12px]" />
                  </button>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div
              className="rounded-[20px] p-[20px] bg-white flex flex-col justify-between h-[230px]"
              style={{
                border: "1px solid rgba(226, 232, 240, 0.8)",
                boxShadow: "0 4px 16px rgba(15, 23, 42, 0.01)",
              }}
            >
              <div className="flex flex-col gap-[12px]">
                <div className="flex items-center gap-[6px] text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  <span>Q3</span>
                  <span>•</span>
                  <span>Long Text</span>
                  <span>•</span>
                  <span>1,042 Responses</span>
                </div>
                <h4 className="font-['Inter',sans-serif] font-bold text-slate-800 text-[14px] leading-snug">
                  What changes would improve your scheduling experience?
                </h4>
              </div>

              <div className="flex flex-col gap-[14px]">
                {/* Visualizer bars */}
                <div className="flex items-end justify-between h-[36px] px-2 gap-1.5">
                  <div className="w-full bg-[#166534] h-[55%] rounded-[3px]" />
                  <div className="w-full bg-[#15803d] h-[75%] rounded-[3px]" />
                  <div className="w-full bg-[#22c55e] h-[40%] rounded-[3px]" />
                  <div className="w-full bg-[#86efac] h-[20%] rounded-[3px]" />
                  <div className="w-full bg-[#bbf7d0] h-[10%] rounded-[3px]" />
                </div>
                <div className="flex items-center justify-between border-t border-slate-50 pt-[12px]">
                  <span className="text-[11px] font-bold text-slate-400">1,042 RESPONSES</span>
                  <button className="flex items-center gap-[4px] text-[11.5px] font-bold text-[#0d9488] hover:text-[#0f766e] transition-colors">
                    <span>View Analysis</span>
                    <ArrowRight className="size-[12px]" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- Breakdown By Department & Office Location Section --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[24px] w-full">
          {/* By Department Card */}
          <div
            className="rounded-[24px] p-[28px] bg-white flex flex-col gap-[20px]"
            style={{
              border: "1px solid rgba(226, 232, 240, 0.8)",
              boxShadow: "0 4px 16px rgba(15, 23, 42, 0.02)",
            }}
          >
            <div className="flex flex-col gap-[2px]">
              <h3 className="font-['Inter',sans-serif] font-bold text-[#0f172a] text-[16px]">
                By Department
              </h3>
              <p className="font-['Inter',sans-serif] text-[12.5px] text-slate-400">
                Satisfaction score across organizational segments
              </p>
            </div>

            {/* Department score list */}
            <div className="flex flex-col gap-[14px] mt-[10px]">
              {[
                { label: "Engineering", value: 84, color: "bg-[#0d9488]" },
                { label: "Operations", value: 60, color: "bg-[#0d9488]" },
                { label: "Sales", value: 61, color: "bg-[#0d9488]" },
                { label: "HR", value: 59, color: "bg-[#0d9488]" },
                { label: "Marketing", value: 55, color: "bg-[#0d9488]" },
                { label: "Design", value: 52, color: "bg-[#0d9488]" },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between w-full">
                  <span className="w-[100px] shrink-0 font-['Inter',sans-serif] font-semibold text-slate-700 text-[13px]">
                    {item.label}
                  </span>
                  <div className="flex-1 h-[8px] bg-slate-100 rounded-full mx-4 overflow-hidden relative">
                    <div className={`h-full rounded-full ${item.color}`} style={{ width: `${item.value}%` }} />
                  </div>
                  <span className="w-[32px] text-right font-['Inter',sans-serif] font-bold text-slate-800 text-[13px]">
                    {item.value}%
                  </span>
                </div>
              ))}
            </div>

            <div className="flex items-start gap-[8px] bg-slate-50 border border-slate-100 rounded-[14px] p-[12px] mt-2">
              <span className="text-[#0d9488] text-[14px] leading-none mt-0.5">ⓘ</span>
              <p className="font-['Inter',sans-serif] text-[12px] text-slate-500 leading-normal">
                Engineering shows the highest satisfaction with scheduling flexibility, while Marketing and Design teams indicate room for improvement.
              </p>
            </div>
          </div>

          {/* By Office Location Card */}
          <div
            className="rounded-[24px] p-[28px] bg-white flex flex-col gap-[20px]"
            style={{
              border: "1px solid rgba(226, 232, 240, 0.8)",
              boxShadow: "0 4px 16px rgba(15, 23, 42, 0.02)",
            }}
          >
            <div className="flex flex-col gap-[2px]">
              <h3 className="font-['Inter',sans-serif] font-bold text-[#0f172a] text-[16px]">
                By Office Location
              </h3>
              <p className="font-['Inter',sans-serif] text-[12.5px] text-slate-400">
                Satisfaction score across locations and remote status
              </p>
            </div>

            {/* Location scores list */}
            <div className="flex flex-col gap-[20px] mt-[10px]">
              {/* Location 1 */}
              <div className="flex flex-col gap-[6px]">
                <div className="flex items-center justify-between w-full">
                  <div className="flex flex-col">
                    <span className="font-['Inter',sans-serif] font-bold text-slate-800 text-[13px]">HQ Campus</span>
                    <span className="font-['Inter',sans-serif] text-slate-400 text-[11px]">On-site employees in New York, NY</span>
                  </div>
                  <span className="font-['Inter',sans-serif] font-bold text-[#059669] text-[13.5px]">45% Satisfied</span>
                </div>
                <div className="w-full h-[8px] bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-[#059669] rounded-full" style={{ width: "45%" }} />
                </div>
              </div>

              {/* Location 2 */}
              <div className="flex flex-col gap-[6px]">
                <div className="flex items-center justify-between w-full">
                  <div className="flex flex-col">
                    <span className="font-['Inter',sans-serif] font-bold text-slate-800 text-[13px]">Remote</span>
                    <span className="font-['Inter',sans-serif] text-slate-400 text-[11px]">Employees working remotely</span>
                  </div>
                  <span className="font-['Inter',sans-serif] font-bold text-[#059669] text-[13.5px]">72% Satisfied</span>
                </div>
                <div className="w-full h-[8px] bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-[#059669] rounded-full" style={{ width: "72%" }} />
                </div>
              </div>

              {/* Location 3 */}
              <div className="flex flex-col gap-[6px]">
                <div className="flex items-center justify-between w-full">
                  <div className="flex flex-col">
                    <span className="font-['Inter',sans-serif] font-bold text-slate-800 text-[13px]">Regional Office</span>
                    <span className="font-['Inter',sans-serif] text-slate-400 text-[11px]">Employees from Toronto, London & Singapore</span>
                  </div>
                  <span className="font-['Inter',sans-serif] font-bold text-[#059669] text-[13.5px]">38% Satisfied</span>
                </div>
                <div className="w-full h-[8px] bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-[#059669] rounded-full" style={{ width: "38%" }} />
                </div>
              </div>
            </div>

            <div className="flex items-start gap-[8px] bg-slate-50 border border-slate-100 rounded-[14px] p-[12px] mt-2">
              <span className="text-[#059669] text-[14px] leading-none mt-0.5">ⓘ</span>
              <p className="font-['Inter',sans-serif] text-[12px] text-slate-500 leading-normal">
                Remote employees report higher satisfaction, potentially due to increased autonomy and reduced commute time.
              </p>
            </div>
          </div>
        </div>

        {/* --- Representative Voices Section --- */}
        <div className="flex flex-col gap-[16px] w-full">
          <div className="flex items-center justify-between w-full">
            <div className="flex flex-col gap-[2px]">
              <h3 className="font-['Inter',sans-serif] font-bold text-[#0f172a] text-[16px]">
                Representative Voices
              </h3>
              <p className="font-['Inter',sans-serif] text-[12.5px] text-slate-400">
                Authentic feedback across key themes (top 4 of 1,942 responses)
              </p>
            </div>

            <div className="flex items-center gap-[12px]">
              <button className="flex items-center gap-[4px] text-[13px] font-bold text-[#0d9488] hover:text-[#0f766e] transition-colors">
                <span>View all feedback</span>
                <ArrowRight className="size-[13px]" />
              </button>
              <div className="flex items-center gap-[6px]">
                <button className="size-[32px] rounded-full border border-slate-200 bg-white flex items-center justify-center hover:bg-slate-50 transition-all cursor-pointer">
                  <ChevronLeft className="size-[16px] text-slate-600" />
                </button>
                <button className="size-[32px] rounded-full border border-slate-200 bg-white flex items-center justify-center hover:bg-slate-50 transition-all cursor-pointer">
                  <ChevronRight className="size-[16px] text-slate-600" />
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[16px] w-full">
            {/* Quote 1 */}
            <div
              className="rounded-[20px] p-[20px] bg-white flex flex-col justify-between h-[190px]"
              style={{
                border: "1px solid rgba(226, 232, 240, 0.8)",
                boxShadow: "0 4px 16px rgba(15, 23, 42, 0.01)",
              }}
            >
              <div className="flex flex-col gap-[10px]">
                <span className="text-[20px] text-emerald-600 font-bold leading-none select-none">“</span>
                <p className="font-['Inter',sans-serif] text-[12.5px] text-slate-600 leading-relaxed italic">
                  The new 2-week shift system makes it much easier to plan around family commitments.
                </p>
              </div>
              <div className="flex items-center justify-between border-t border-slate-50 pt-[12px] mt-2">
                <div className="flex flex-col">
                  <span className="font-['Inter',sans-serif] font-bold text-slate-800 text-[12px]">Sarah J.</span>
                  <span className="font-['Inter',sans-serif] text-slate-400 text-[10px]">Customer Support</span>
                </div>
                <span className="px-[8px] py-[3px] rounded-full text-[9px] font-bold border border-emerald-200 bg-emerald-50 text-emerald-700 uppercase">
                  Very Positive
                </span>
              </div>
            </div>

            {/* Quote 2 */}
            <div
              className="rounded-[20px] p-[20px] bg-white flex flex-col justify-between h-[190px]"
              style={{
                border: "1px solid rgba(226, 232, 240, 0.8)",
                boxShadow: "0 4px 16px rgba(15, 23, 42, 0.01)",
              }}
            >
              <div className="flex flex-col gap-[10px]">
                <span className="text-[20px] text-rose-600 font-bold leading-none select-none">“</span>
                <p className="font-['Inter',sans-serif] text-[12.5px] text-slate-600 leading-relaxed italic">
                  It's still difficult to swap shifts on short notice. The system feels outdated.
                </p>
              </div>
              <div className="flex items-center justify-between border-t border-slate-50 pt-[12px] mt-2">
                <div className="flex flex-col">
                  <span className="font-['Inter',sans-serif] font-bold text-slate-800 text-[12px]">Michael R.</span>
                  <span className="font-['Inter',sans-serif] text-slate-400 text-[10px]">Operations</span>
                </div>
                <span className="px-[8px] py-[3px] rounded-full text-[9px] font-bold border border-rose-200 bg-rose-50 text-rose-700 uppercase">
                  Very Negative
                </span>
              </div>
            </div>

            {/* Quote 3 */}
            <div
              className="rounded-[20px] p-[20px] bg-white flex flex-col justify-between h-[190px]"
              style={{
                border: "1px solid rgba(226, 232, 240, 0.8)",
                boxShadow: "0 4px 16px rgba(15, 23, 42, 0.01)",
              }}
            >
              <div className="flex flex-col gap-[10px]">
                <span className="text-[20px] text-amber-600 font-bold leading-none select-none">“</span>
                <p className="font-['Inter',sans-serif] text-[12.5px] text-slate-600 leading-relaxed italic">
                  I need more control over my weekend shifts. It impacts my work-life balance.
                </p>
              </div>
              <div className="flex items-center justify-between border-t border-slate-50 pt-[12px] mt-2">
                <div className="flex flex-col">
                  <span className="font-['Inter',sans-serif] font-bold text-slate-800 text-[12px]">Priya K.</span>
                  <span className="font-['Inter',sans-serif] text-slate-400 text-[10px]">Operations</span>
                </div>
                <span className="px-[8px] py-[3px] rounded-full text-[9px] font-bold border border-amber-200 bg-amber-50 text-amber-700 uppercase">
                  Negative
                </span>
              </div>
            </div>

            {/* Quote 4 */}
            <div
              className="rounded-[20px] p-[20px] bg-white flex flex-col justify-between h-[190px]"
              style={{
                border: "1px solid rgba(226, 232, 240, 0.8)",
                boxShadow: "0 4px 16px rgba(15, 23, 42, 0.01)",
              }}
            >
              <div className="flex flex-col gap-[10px]">
                <span className="text-[20px] text-emerald-600 font-bold leading-none select-none">“</span>
                <p className="font-['Inter',sans-serif] text-[12.5px] text-slate-600 leading-relaxed italic">
                  The flexibility has improved a lot compared to last year. Keep it up!
                </p>
              </div>
              <div className="flex items-center justify-between border-t border-slate-50 pt-[12px] mt-2">
                <div className="flex flex-col">
                  <span className="font-['Inter',sans-serif] font-bold text-slate-800 text-[12px]">James L.</span>
                  <span className="font-['Inter',sans-serif] text-slate-400 text-[10px]">Engineering</span>
                </div>
                <span className="px-[8px] py-[3px] rounded-full text-[9px] font-bold border border-[#a7f3d0] bg-[#ecfdf5] text-[#047857] uppercase">
                  Positive
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* --- Recommended Actions Section --- */}
        <div
          className="rounded-[24px] p-[28px] bg-white flex flex-col gap-[20px] w-full"
          style={{
            border: "1px solid rgba(226, 232, 240, 0.8)",
            boxShadow: "0 4px 16px rgba(15, 23, 42, 0.02)",
          }}
        >
          <div className="flex flex-col gap-[2px]">
            <h3 className="font-['Inter',sans-serif] font-bold text-[#0f172a] text-[16px]">
              Recommended Actions
            </h3>
            <p className="font-['Inter',sans-serif] text-[12.5px] text-slate-400">
              AI-prioritized actions based on data impact and urgency
            </p>
          </div>

          <div className="flex flex-col gap-[12px] w-full mt-2">
            {[
              {
                num: "1",
                text: "Conduct targeted focus groups with Engineering and Operations",
                details: "Owner: Sarah Jenkins, People Partner • Timeline: 2 weeks",
                priority: "Critical",
                priorityColor: "bg-rose-50 border border-rose-100 text-rose-700",
                avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=64&h=64",
                nameInitial: "SJ",
              },
              {
                num: "2",
                text: "Commission HR impact assessment of Q1 policy change",
                details: "Owner: David Cox, HR Ops Lead • Timeline: 1 month",
                priority: "High",
                priorityColor: "bg-orange-50 border border-orange-100 text-orange-700",
                avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=64&h=64",
                nameInitial: "DC",
              },
              {
                num: "3",
                text: "Pilot flexible scheduling program in highest-dissatisfaction teams",
                details: "Owner: Maria Alvarez, Engineering VP • Timeline: Next Quarter",
                priority: "High",
                priorityColor: "bg-orange-50 border border-orange-100 text-orange-700",
                avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=64&h=64",
                nameInitial: "MA",
              },
              {
                num: "4",
                text: "Benchmark scheduling policies against industry competitors",
                details: "Owner: Elena Rostova, Research Director • Timeline: 6 weeks",
                priority: "Medium",
                priorityColor: "bg-amber-50 border border-amber-100 text-amber-600",
                avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=64&h=64",
                nameInitial: "ER",
              },
            ].map((action, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-[14px] rounded-[16px] border border-slate-100 bg-[#fafbfa] hover:bg-slate-50 hover:shadow-sm transition-all"
              >
                <div className="flex items-center gap-[14px] flex-1 min-w-px">
                  {/* Number bubble */}
                  <div className="size-[28px] rounded-full border-2 border-[#15803d]/30 text-[#15803d] font-bold flex items-center justify-center text-[12px] shrink-0">
                    {action.num}
                  </div>
                  {/* Text Details */}
                  <div className="flex flex-col gap-[3px] min-w-px">
                    <p className="font-['Inter',sans-serif] font-bold text-slate-800 text-[13.5px] leading-snug truncate">
                      {action.text}
                    </p>
                    <span className="font-['Inter',sans-serif] text-slate-400 text-[11.5px]">
                      {action.details}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-[14px] shrink-0">
                  {/* Priority badge */}
                  <span className={`px-[10px] py-[4px] rounded-full text-[10px] font-bold uppercase tracking-wider ${action.priorityColor}`}>
                    {action.priority}
                  </span>
                  {/* Avatar image */}
                  <div className="relative size-[30px] rounded-full overflow-hidden border border-slate-200">
                    <img
                      src={action.avatar}
                      alt=""
                      className="absolute inset-0 size-full object-cover"
                      onError={(e) => {
                        // Fallback to text initials if image fails to load
                        (e.target as HTMLElement).style.display = "none";
                      }}
                    />
                    <div className="absolute inset-0 bg-[#e8f7f0] text-[#059669] font-bold text-[10px] flex items-center justify-center">
                      {action.nameInitial}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center border-t border-slate-50 pt-[16px] mt-2">
            <button className="flex items-center gap-[6px] text-[13px] font-bold text-[#0d9488] hover:text-[#0f766e] transition-colors">
              <span>View All Actions</span>
              <ArrowRight className="size-[14px]" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
