import React, { useState, useMemo, useRef, useEffect } from "react";

// --- Icons ---
function IconSearch() {
  return (
    <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  );
}

function IconSparkles() {
  return (
    <svg className="w-4 h-4 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 21l-.813-5.096L3.096 15 8 14.187 8.813 9 9.625 14.187 14.904 15l-5.091.904zM19.006 5.994L18.5 9l-.506-3.006L15 5.5l2.994-.494L18.5 2l.506 3.006L22 5.5l-2.994.494z" />
    </svg>
  );
}

function IconBell() {
  return (
    <svg className="w-5 h-5 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
    </svg>
  );
}

function IconChevronRight() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
    </svg>
  );
}

function IconChevronDown() {
  return (
    <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
    </svg>
  );
}

function IconChevronUp() {
  return (
    <svg className="w-4 h-4 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
    </svg>
  );
}

// --- Specific Chart Components ---

function HorizontalBarChart({ data }: { data: { label: string; value: number; color: string }[] }) {
  return (
    <div className="flex flex-col gap-2 w-full">
      {data.map((item, i) => (
        <div key={i} className="flex items-center gap-3">
          <span className="text-[12px] text-slate-500 font-medium w-[100px] shrink-0 truncate">{item.label}</span>
          <div className="flex-1 h-[8px] bg-slate-100 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full ${item.color}`}
              style={{ width: `${item.value}%` }}
            />
          </div>
          <span className="text-[12px] text-slate-700 font-bold w-[30px] text-right">{item.value}%</span>
        </div>
      ))}
    </div>
  );
}

function EmojiRatingChart() {
  const ratings = [
    { label: "Excellent", percentage: 38, emoji: "😊", color: "bg-[#10b981]" },
    { label: "Good", percentage: 32, emoji: "🙂", color: "bg-[#34d399]" },
    { label: "Average", percentage: 20, emoji: "😐", color: "bg-[#f59e0b]" },
    { label: "Poor", percentage: 7, emoji: "😕", color: "bg-[#f97316]" },
    { label: "Very Poor", percentage: 3, emoji: "😡", color: "bg-[#ef4444]" }
  ];

  return (
    <div className="flex justify-between items-center w-full px-2 py-1">
      {ratings.map((rating, idx) => (
        <div key={idx} className="flex flex-col items-center gap-2 flex-1">
          <div className="text-[26px] select-none">{rating.emoji}</div>
          <div className="text-center">
            <p className="text-[11px] font-semibold text-slate-500">{rating.label}</p>
            <p className="text-[12px] font-bold text-slate-800">{rating.percentage}%</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function DonutChart({ value, data }: { value: string; data: { label: string; percentage: number; color: string }[] }) {
  let accumulated = 0;
  return (
    <div className="flex items-center gap-8">
      <div className="relative w-[85px] h-[85px] shrink-0">
        <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
          <circle
            cx="18"
            cy="18"
            r="15.915"
            fill="none"
            stroke="#f1f5f9"
            strokeWidth="3.2"
          />
          {data.map((item, idx) => {
            const strokeDash = `${item.percentage} 100`;
            const strokeOffset = `-${accumulated}`;
            accumulated += item.percentage;
            return (
              <circle
                key={idx}
                cx="18"
                cy="18"
                r="15.915"
                fill="none"
                stroke={
                  item.color === "bg-[#059669]" ? "#059669" :
                  item.color === "bg-[#6366f1]" ? "#6366f1" :
                  item.color === "bg-[#f59e0b]" ? "#f59e0b" : "#94a3b8"
                }
                strokeWidth="3.2"
                strokeDasharray={strokeDash}
                strokeDashoffset={strokeOffset}
              />
            );
          })}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-[15px] font-bold text-slate-800 leading-none">{value}</span>
        </div>
      </div>
      <div className="flex flex-col gap-1.5">
        {data.map((item, idx) => (
          <div key={idx} className="flex items-center gap-2">
            <div className={`w-2.5 h-2.5 rounded-full ${item.color}`} />
            <span className="text-[12px] text-slate-500 font-medium whitespace-nowrap">
              {item.label} ({item.percentage}%)
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function RankingList() {
  const methods = [
    { rank: 1, name: "Direct Messaging", color: "bg-[#059669]" },
    { rank: 2, name: "Video Conferences", color: "bg-[#0d9488]" },
    { rank: 3, name: "Asynchronous Video Docs", color: "bg-[#14b8a6]" }
  ];
  return (
    <div className="flex flex-col gap-3 pl-1">
      {methods.map((method) => (
        <div key={method.rank} className="flex items-center gap-3">
          <div className={`flex items-center justify-center w-[22px] h-[22px] rounded-full text-white text-[11px] font-bold ${method.color}`}>
            {method.rank}
          </div>
          <span className="text-[13px] text-slate-700 font-semibold">{method.name}</span>
        </div>
      ))}
    </div>
  );
}

// --- Data Model for Questions ---
interface QuestionItem {
  id: string;
  type: "Single Choice" | "Multiple Choice" | "Ranking" | "NPS" | "Date" | "Long Text" | "Yes/No";
  category: "Workplace Satisfaction" | "Compensation & Benefits" | "Growth & Development" | "Leadership & Culture";
  completion: number;
  text: string;
  responses: number;
  priority: "high" | "medium" | "low";
  priorityScore?: number;
  actionText?: string;
  insight?: string;
  chartType: "bar" | "donut" | "emoji" | "ranking" | "nps" | "text" | "vertical-bar" | "empty";
  chartData?: any;
}

const ALL_QUESTIONS_DATA: QuestionItem[] = [
  {
    id: "Q1",
    type: "Single Choice",
    category: "Workplace Satisfaction",
    completion: 92.3,
    text: "How satisfied are you with your current work schedule flexibility?",
    responses: 2787,
    priority: "high",
    priorityScore: 94,
    actionText: "Open Analysis",
    insight: "Among respondents who selected 'Very satisfied', retention intent is significantly higher compared to those rating as 'Neutral'.",
    chartType: "bar",
    chartData: [
      { label: "Very Satisfied", value: 45, color: "bg-[#059669]" },
      { label: "Satisfied", value: 38, color: "bg-[#34d399]" },
      { label: "Neutral", value: 10, color: "bg-[#f59e0b]" },
      { label: "Dissatisfied", value: 7, color: "bg-[#f97316]" },
      { label: "Very Dissatisfied", value: 3, color: "bg-[#ef4444]" }
    ]
  },
  {
    id: "Q2",
    type: "Multiple Choice",
    category: "Workplace Satisfaction",
    completion: 94.8,
    text: "Rate the effectiveness of internal communication channels",
    responses: 2701,
    priority: "high",
    insight: "Slack preferred over Email by a majority of employees.",
    chartType: "donut",
    chartData: [
      { label: "Slack", percentage: 38, color: "bg-[#059669]" },
      { label: "Email", percentage: 30, color: "bg-[#6366f1]" },
      { label: "Teams", percentage: 20, color: "bg-[#f59e0b]" },
      { label: "Other", percentage: 12, color: "bg-[#94a3b8]" }
    ]
  },
  {
    id: "Q3",
    type: "Single Choice",
    category: "Workplace Satisfaction",
    completion: 91.3,
    text: "How would you rate equipment provided for your role?",
    responses: 2267,
    priority: "medium",
    chartType: "emoji"
  },
  {
    id: "Q4",
    type: "Ranking",
    category: "Workplace Satisfaction",
    completion: 89.1,
    text: "Rank your preferred communication methods",
    responses: 2523,
    priority: "medium",
    chartType: "ranking"
  },
  {
    id: "Q5",
    type: "NPS",
    category: "Workplace Satisfaction",
    completion: 84.7,
    text: "How likely are you to recommend this workplace?",
    responses: 2270,
    priority: "low",
    chartType: "nps"
  },
  {
    id: "Q6",
    type: "Long Text",
    category: "Workplace Satisfaction",
    completion: 87.6,
    text: "Describe any challenges with the current travel reimbursement process",
    responses: 1920,
    priority: "low",
    chartType: "text"
  },
  
  // --- Category: Compensation & Benefits ---
  {
    id: "Q7",
    type: "Single Choice",
    category: "Compensation & Benefits",
    completion: 92.6,
    text: "How would you rate the clarity of your health benefits package?",
    responses: 2522,
    priority: "low",
    chartType: "bar",
    chartData: [
      { label: "Clear", value: 65, color: "bg-[#059669]" },
      { label: "Somewhat Clear", value: 25, color: "bg-[#34d399]" },
      { label: "Unclear", value: 10, color: "bg-[#ef4444]" }
    ]
  },
  {
    id: "Q8",
    type: "Multiple Choice",
    category: "Compensation & Benefits",
    completion: 92.8,
    text: "Which auxiliary benefits do you value the most as part of your overall compensation?",
    responses: 2487,
    priority: "medium",
    chartType: "donut",
    chartData: [
      { label: "Health", percentage: 50, color: "bg-[#059669]" },
      { label: "Retirement", percentage: 30, color: "bg-[#6366f1]" },
      { label: "Wellness", percentage: 20, color: "bg-[#f59e0b]" }
    ]
  },
  {
    id: "Q9",
    type: "Yes/No",
    category: "Compensation & Benefits",
    completion: 96.7,
    text: "Would you like to talk to us in detail about this?",
    responses: 2591,
    priority: "low",
    chartType: "donut",
    chartData: [
      { label: "Yes", percentage: 75, color: "bg-[#059669]" },
      { label: "No", percentage: 25, color: "bg-[#94a3b8]" }
    ]
  },
  {
    id: "Q10",
    type: "Date",
    category: "Compensation & Benefits",
    completion: 91.5,
    text: "When did you start working in this current position?",
    responses: 2452,
    priority: "low",
    chartType: "vertical-bar"
  },

  // --- Category: Growth & Development ---
  {
    id: "Q11",
    type: "Single Choice",
    category: "Growth & Development",
    completion: 90.2,
    text: "Do you feel you have clear paths for career progression?",
    responses: 2410,
    priority: "medium",
    chartType: "bar",
    chartData: [
      { label: "Yes, definitely", value: 40, color: "bg-[#059669]" },
      { label: "Somewhat", value: 42, color: "bg-[#34d399]" },
      { label: "No", value: 18, color: "bg-[#ef4444]" }
    ]
  },
  {
    id: "Q12",
    type: "Multiple Choice",
    category: "Growth & Development",
    completion: 89.8,
    text: "Which training areas would you like to focus on next year?",
    responses: 2350,
    priority: "low",
    chartType: "donut",
    chartData: [
      { label: "Technical", percentage: 48, color: "bg-[#059669]" },
      { label: "Management", percentage: 32, color: "bg-[#6366f1]" },
      { label: "Soft Skills", percentage: 20, color: "bg-[#f59e0b]" }
    ]
  },

  // --- Category: Leadership & Culture ---
  {
    id: "Q13",
    type: "Single Choice",
    category: "Leadership & Culture",
    completion: 93.1,
    text: "How transparent is senior leadership about company decisions?",
    responses: 2600,
    priority: "high",
    priorityScore: 88,
    chartType: "bar",
    chartData: [
      { label: "Very Transparent", value: 35, color: "bg-[#059669]" },
      { label: "Transparent", value: 45, color: "bg-[#34d399]" },
      { label: "Neutral", value: 15, color: "bg-[#f59e0b]" },
      { label: "Not Transparent", value: 5, color: "bg-[#ef4444]" }
    ]
  },
  {
    id: "Q14",
    type: "Single Choice",
    category: "Leadership & Culture",
    completion: 92.5,
    text: "Do you feel alignment between company values and day-to-day actions?",
    responses: 2580,
    priority: "medium",
    chartType: "emoji"
  }
];

// --- DETAILED ANALYSIS PAGE FOR Q1 ---
function QuestionAnalysis({ onBack }: { onBack: () => void }) {
  const [noteText, setNoteText] = useState("");
  const [feedbackHelpful, setFeedbackHelpful] = useState<boolean | null>(null);

  return (
    <div className="flex flex-col size-full overflow-y-auto pr-2 pb-10 custom-scrollbar">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 mb-4 text-[13px] text-slate-500 dark:text-slate-400 font-medium">
        <button onClick={onBack} className="flex items-center gap-1 text-[#059669] dark:text-emerald-400 hover:underline cursor-pointer font-semibold">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
          Question Explorer
        </button>
        <span className="text-slate-300 dark:text-slate-600">/</span>
        <span className="text-slate-700 dark:text-slate-200 font-semibold">Q1</span>
      </div>

      {/* Sub-Header bar with actions */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          {/* Q1 of 24 selector */}
          <div className="flex items-center gap-1 border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111827] rounded-xl px-2 py-1 shadow-sm font-semibold text-[13px] text-slate-700 dark:text-slate-200">
            <button className="p-0.5 hover:bg-slate-50 dark:hover:bg-slate-800 rounded text-slate-400">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>
            <span className="px-1 text-slate-800 dark:text-slate-100">Q1 of 24</span>
            <button className="p-0.5 hover:bg-slate-50 dark:hover:bg-slate-800 rounded text-slate-400">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 px-3 py-1.5 bg-[#e8f7f0] dark:bg-emerald-950/60 text-[#059669] dark:text-emerald-400 rounded-full text-[12px] font-bold shadow-sm">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068" />
              </svg>
              92.3% Complete
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 rounded-full text-[12px] font-bold shadow-sm">
              2,787 Responses
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 px-4 py-2 border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111827] hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl text-[13px] font-bold text-slate-700 dark:text-slate-200 shadow-sm cursor-pointer transition-colors">
            Save Finding
          </button>
          <button className="flex items-center gap-1.5 px-4 py-2 bg-[#059669] hover:bg-[#047857] text-white rounded-xl text-[13px] font-bold shadow-sm cursor-pointer transition-colors">
            Add to Report
          </button>
          <button className="flex items-center gap-1.5 px-4 py-2 border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111827] hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl text-[13px] font-bold text-slate-700 dark:text-slate-200 shadow-sm cursor-pointer transition-colors">
            Share
          </button>
          <button className="p-2 border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111827] hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl text-slate-500 dark:text-slate-400 shadow-sm cursor-pointer transition-colors">
            •••
          </button>
        </div>
      </div>

      {/* Main Title */}
      <h2 className="text-[26px] font-bold text-slate-900 dark:text-white leading-tight mb-4">
        How satisfied are you with your current work schedule flexibility?
      </h2>

      {/* Badges row */}
      <div className="flex items-center gap-2 mb-6">
        <span className="px-2.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-semibold text-[11px] uppercase tracking-wide">Single Choice</span>
        <span className="px-2.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-semibold text-[11px] uppercase tracking-wide">Workplace Satisfaction</span>
        <span className="px-2.5 py-0.5 rounded-md bg-[#e8f7f0] dark:bg-emerald-950/60 text-[#059669] dark:text-emerald-400 font-bold text-[11px] uppercase tracking-wide">High Priority</span>
        <span className="text-[12px] text-slate-400 dark:text-slate-500 font-medium ml-2">Last updated: May 20, 2026</span>
      </div>

      {/* AI Narrative Summary Card */}
      <div className="bg-[#f5f3ff] dark:bg-indigo-950/30 border border-[#ddd6fe]/50 dark:border-indigo-900/40 rounded-[20px] p-6 shadow-sm mb-6 flex flex-col gap-4 relative">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-[#7c3aed] dark:text-indigo-400">
            <IconSparkles />
            <h3 className="font-bold text-[15px] uppercase tracking-wider">AI Narrative Summary</h3>
          </div>
          <span className="text-[12px] font-bold text-[#7c3aed] dark:text-indigo-400 bg-purple-100/60 dark:bg-indigo-950/80 px-2.5 py-0.5 rounded-md">Confidence: 96%</span>
        </div>

        <p className="text-[14.5px] text-[#5b21b6] dark:text-indigo-200 font-medium leading-relaxed">
          Schedule flexibility is the most critical employee concern in this survey. While 45% of respondents report satisfaction, 
          a concentrated cluster of dissatisfaction exists in Engineering (28%), Night shift employees (31%), and employees with 
          10+ years tenure (34%). This represents a significant decline of 31% compared to the previous survey. The decline aligns 
          with the recent policy changes implemented in Q1.
        </p>

        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-3 py-1 rounded-lg border border-[#ddd6fe] dark:border-indigo-900/50 bg-white dark:bg-slate-800 text-[#7c3aed] dark:text-indigo-400 text-[11.5px] font-bold">
              Prioritization: High Impact
            </span>
            <span className="px-3 py-1 rounded-lg border border-[#ddd6fe] dark:border-indigo-900/50 bg-white dark:bg-slate-800 text-[#7c3aed] dark:text-indigo-400 text-[11.5px] font-bold">
              Impact: Company-wide
            </span>
            <span className="px-3 py-1 rounded-lg border border-red-200 dark:border-red-900/50 bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 text-[11.5px] font-bold">
              Action Urgency: Immediate
            </span>
          </div>
          <button className="text-[13px] font-bold text-[#7c3aed] dark:text-indigo-400 hover:underline flex items-center gap-1 cursor-pointer">
            View AI reasoning
            <IconChevronRight />
          </button>
        </div>
      </div>

      {/* Response Distribution & Research Note Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Response Distribution */}
        <div className="lg:col-span-2 bg-white dark:bg-[#111827] rounded-[20px] p-6 border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-1.5">
                <h3 className="font-bold text-[16px] text-slate-800 dark:text-slate-100">Response Distribution</h3>
                <span className="text-[12px] text-slate-400 dark:text-slate-500 font-medium">2,787 responses</span>
                <span className="text-slate-300 dark:text-slate-600 text-[13px] cursor-pointer">ⓘ</span>
              </div>
            </div>

            <div className="flex items-center gap-12 flex-col md:flex-row">
              <div className="flex-1 flex flex-col gap-3.5 w-full">
                {[
                  { label: "Very Satisfied", value: 45, count: 1253, color: "bg-[#059669]" },
                  { label: "Satisfied", value: 38, count: 1060, color: "bg-[#34d399]" },
                  { label: "Neutral", value: 10, count: 279, color: "bg-[#f59e0b]" },
                  { label: "Dissatisfied", value: 7, count: 195, color: "bg-[#f97316]" },
                  { label: "Very Dissatisfied", value: 3, count: 83, color: "bg-[#ef4444]" }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <span className="text-[12px] text-slate-500 font-semibold w-[100px] shrink-0 truncate">{item.label}</span>
                    <div className="flex-1 h-[9px] bg-slate-100 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${item.color}`} style={{ width: `${item.value}%` }} />
                    </div>
                    <span className="text-[12px] text-slate-700 font-bold w-[35px] text-right">{item.value}%</span>
                    <span className="text-[11px] text-slate-400 font-medium w-[45px] text-right">{item.count.toLocaleString()}</span>
                  </div>
                ))}
              </div>

              {/* Radial gauge circular chart */}
              <div className="flex flex-col items-center justify-center shrink-0 w-[140px]">
                <div className="relative w-28 h-28">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                    <circle cx="18" cy="18" r="15.915" fill="none" stroke="#f1f5f9" strokeWidth="3" />
                    <circle cx="18" cy="18" r="15.915" fill="none" stroke="#059669" strokeWidth="3" strokeDasharray="83 100" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-[24px] font-bold text-slate-800 leading-none">83%</span>
                  </div>
                </div>
                <p className="text-[12px] font-bold text-[#059669] text-center mt-2.5">
                  Positive<br/><span className="text-[10px] text-slate-400 font-medium">(Satisfied or higher)</span>
                </p>
              </div>
            </div>
          </div>

          {/* vs Previous Survey sparkline section */}
          <div className="mt-8 pt-5 border-t border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2 text-[13px] font-semibold text-slate-500">
              <span>vs Previous Survey <span className="text-[11px] text-slate-400 font-medium">(Jan 2025)</span></span>
              <span className="flex items-center gap-0.5 text-red-500 font-bold bg-red-50 px-1.5 py-0.5 rounded">
                ↓ 31%
              </span>
            </div>
            {/* Tiny sparkline SVG */}
            <div className="w-[120px] h-[24px]">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 100 20">
                <path d="M 0 5 Q 20 1 40 12 T 80 4 T 100 18" fill="none" stroke="#ef4444" strokeWidth="2" />
                <circle cx="100" cy="18" r="3" fill="#ef4444" />
              </svg>
            </div>
          </div>
        </div>

        {/* Research Note Card */}
        <div className="bg-[#fefaf0]/60 dark:bg-amber-950/20 rounded-[20px] p-6 border border-[#fef08a] dark:border-amber-800/40 shadow-sm flex flex-col justify-between relative overflow-hidden">
          <div className="absolute -right-6 -top-6 w-20 h-20 bg-amber-200/20 dark:bg-amber-600/10 rounded-full blur-xl" />
          
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                </svg>
                <h3 className="font-bold text-[12px] uppercase tracking-wider">Research Note</h3>
              </div>
              <span className="text-slate-400 text-[15px] cursor-pointer hover:text-slate-600">📌</span>
            </div>

            <p className="text-[13px] text-amber-900/80 dark:text-amber-200/90 leading-relaxed font-semibold mb-4">
              Adding your observations helps make sense of the data context and may aid in actions. Use @ to mention teammates and link to workspaces or reports.
            </p>

            <textarea 
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              placeholder="Start typing your note here..."
              className="w-full h-[90px] border border-amber-200/60 dark:border-amber-700/50 rounded-xl p-3 bg-white/80 dark:bg-[#111827] outline-none text-[13px] text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-amber-400 resize-none shadow-inner"
            />
          </div>

          <p className="text-[11px] text-slate-400 font-medium mt-4">Last edited 2 days ago by you</p>
        </div>
      </div>

      {/* Reporting Evidence */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-[16px] text-slate-800 dark:text-slate-100">Reporting Evidence</h3>
          <button className="text-[12.5px] font-bold text-[#059669] hover:underline flex items-center gap-0.5 cursor-pointer">
            View all responses
            <IconChevronRight />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            {
              quote: "The new scheduling system makes it nearly impossible for parents to plan ahead. Any control disappeared.",
              dept: "Engineering",
              sentiment: "Negative",
              color: "text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 border-amber-100 dark:border-amber-900/50"
            },
            {
              quote: "I love the flexibility — I can adjust my hours around school pickups.",
              dept: "Marketing",
              sentiment: "Positive",
              color: "text-[#059669] dark:text-emerald-400 bg-[#e8f7f0] dark:bg-emerald-950/40 border-[#a7f3d0]/30 dark:border-emerald-800/40"
            },
            {
              quote: "Stress of policy changes, we lost all schedule autonomy.",
              dept: "Operations",
              sentiment: "Very Negative",
              color: "text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/40 border-red-100 dark:border-red-900/50"
            }
          ].map((item, idx) => (
            <div key={idx} className="bg-white dark:bg-[#111827] rounded-2xl p-5 border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
              <p className="text-[13.5px] text-slate-600 dark:text-slate-300 font-medium italic leading-relaxed mb-4">
                "{item.quote}"
              </p>
              
              <div className="flex items-center justify-between">
                <span className="text-[12px] text-slate-400 font-bold uppercase tracking-wider">{item.dept}</span>
                <span className={`px-2.5 py-0.5 rounded text-[11px] font-bold border ${item.color}`}>
                  {item.sentiment}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Breakdowns Row (3 Columns) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Cross-Segment Breakdown */}
        <div className="bg-white dark:bg-[#111827] rounded-[20px] p-6 border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-[15px] text-slate-800 dark:text-slate-100">Cross-Segment Breakdown</h3>
              <button className="flex items-center gap-1.5 px-2.5 py-1.5 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-lg text-[11px] font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 cursor-pointer">
                Segmented by Department
                <IconChevronDown />
              </button>
            </div>

            <div className="flex flex-col gap-3 mt-4">
              {[
                { label: "Design", value: 82, color: "bg-[#059669]" },
                { label: "Marketing", value: 71, color: "bg-[#059669]" },
                { label: "HR", value: 61, color: "bg-[#059669]" },
                { label: "Sales", value: 47, color: "bg-[#059669]" },
                { label: "Operations", value: 32, color: "bg-[#f59e0b]" },
                { label: "Engineering", value: 28, color: "bg-[#ef4444]" }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className="text-[12px] text-slate-500 dark:text-slate-400 font-semibold w-[80px] shrink-0 truncate">{item.label}</span>
                  <div className="flex-1 h-[8px] bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${item.color}`} style={{ width: `${item.value}%` }} />
                  </div>
                  <span className="text-[12px] text-slate-700 dark:text-slate-200 font-bold w-[30px] text-right">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-purple-50 dark:bg-purple-950/30 border border-purple-100 dark:border-purple-900/50 rounded-xl p-3.5 mt-5 flex gap-1.5">
            <span className="text-purple-600 dark:text-purple-400 text-[14px]">✨</span>
            <p className="text-[11.5px] text-purple-900/80 dark:text-purple-300 font-medium leading-normal">
              <strong>AI Insight:</strong> Engineering team shows dramatically lower satisfaction. Consider targeted interventions and workload flexibility review.
            </p>
          </div>
        </div>

        {/* Demographic Lens */}
        <div className="bg-white dark:bg-[#111827] rounded-[20px] p-6 border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-[15px] text-slate-800 dark:text-slate-100 mb-4">Demographic Lens</h3>
            <p className="text-[12px] font-bold text-slate-400 uppercase tracking-wide mb-3">Satisfaction by Tenure</p>

            <div className="flex flex-col gap-3">
              {[
                { label: "< 1 yr", value: 76, color: "bg-[#059669]" },
                { label: "1–3 yr", value: 64, color: "bg-[#059669]" },
                { label: "3–5 yr", value: 54, color: "bg-[#059669]" },
                { label: "5–10 yr", value: 42, color: "bg-[#f59e0b]" },
                { label: "10+ yr", value: 34, color: "bg-[#ef4444]" }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className="text-[12px] text-slate-500 dark:text-slate-400 font-semibold w-[80px] shrink-0 truncate">{item.label}</span>
                  <div className="flex-1 h-[8px] bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${item.color}`} style={{ width: `${item.value}%` }} />
                  </div>
                  <span className="text-[12px] text-slate-700 dark:text-slate-200 font-bold w-[30px] text-right">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-purple-50 dark:bg-purple-950/30 border border-purple-100 dark:border-purple-900/50 rounded-xl p-3.5 mt-5 flex gap-1.5">
            <span className="text-purple-600 dark:text-purple-400 text-[14px]">✨</span>
            <p className="text-[11.5px] text-purple-900/80 dark:text-purple-300 font-medium leading-normal">
              <strong>AI Insight:</strong> Satisfaction steadily declines as tenure increases.
            </p>
          </div>
        </div>

        {/* By Seniority Level */}
        <div className="bg-white dark:bg-[#111827] rounded-[20px] p-6 border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-[15px] text-slate-800 dark:text-slate-100 mb-4">By Seniority Level</h3>
            <p className="text-[12px] font-bold text-slate-400 uppercase tracking-wide mb-3">Satisfaction by Level</p>

            <div className="flex flex-col gap-3">
              {[
                { label: "Individual Contributor", value: 36, color: "bg-[#ef4444]" },
                { label: "Manager", value: 58, color: "bg-[#059669]" },
                { label: "Senior Manager", value: 62, color: "bg-[#059669]" },
                { label: "Director / VP", value: 74, color: "bg-[#059669]" }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className="text-[12px] text-slate-500 dark:text-slate-400 font-semibold w-[120px] shrink-0 truncate">{item.label}</span>
                  <div className="flex-1 h-[8px] bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${item.color}`} style={{ width: `${item.value}%` }} />
                  </div>
                  <span className="text-[12px] text-slate-700 dark:text-slate-200 font-bold w-[30px] text-right">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-purple-50 dark:bg-purple-950/30 border border-purple-100 dark:border-purple-900/50 rounded-xl p-3.5 mt-5 flex gap-1.5">
            <span className="text-purple-600 dark:text-purple-400 text-[14px]">✨</span>
            <p className="text-[11.5px] text-purple-900/80 dark:text-purple-300 font-medium leading-normal">
              <strong>AI Insight:</strong> ICs report significantly lower satisfaction than leadership levels.
            </p>
          </div>
        </div>
      </div>

      {/* Sentiment Over Time Section */}
      <div className="bg-white dark:bg-[#111827] rounded-[20px] p-6 border border-slate-100 dark:border-slate-800 shadow-sm mb-8">
        <h3 className="font-bold text-[16px] text-slate-800 dark:text-slate-100 mb-6">Sentiment Over Time</h3>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3 relative h-[250px] w-full">
            {/* Custom SVG Line Chart */}
            <svg className="w-full h-full overflow-visible" viewBox="0 0 600 200">
              {/* Grid Lines */}
              <line x1="0" y1="20" x2="600" y2="20" stroke="#f1f5f9" className="stroke-slate-100 dark:stroke-slate-800" strokeWidth="1" />
              <line x1="0" y1="60" x2="600" y2="60" stroke="#f1f5f9" className="stroke-slate-100 dark:stroke-slate-800" strokeWidth="1" />
              <line x1="0" y1="100" x2="600" y2="100" stroke="#f1f5f9" className="stroke-slate-100 dark:stroke-slate-800" strokeWidth="1" />
              <line x1="0" y1="140" x2="600" y2="140" stroke="#f1f5f9" className="stroke-slate-100 dark:stroke-slate-800" strokeWidth="1" />
              <line x1="0" y1="180" x2="600" y2="180" stroke="#f8fafc" className="stroke-slate-100 dark:stroke-slate-800" strokeWidth="1.5" />

              {/* Vertical dotted line indicating policy change */}
              <line x1="300" y1="0" x2="300" y2="180" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="4 4" />

              {/* Lines paths */}
              {/* Positive line (Green) */}
              <path d="M 0 60 Q 100 55 200 65 T 300 110 T 400 95 T 500 80 T 600 70" fill="none" stroke="#059669" strokeWidth="2.5" />
              {/* Neutral line (Orange) */}
              <path d="M 0 130 Q 100 128 200 132 T 300 135 T 400 130 T 500 132 T 600 130" fill="none" stroke="#f59e0b" strokeWidth="2" />
              {/* Negative line (Red) */}
              <path d="M 0 180 Q 100 178 200 180 T 300 140 T 400 130 T 500 145 T 600 150" fill="none" stroke="#ef4444" strokeWidth="2" />

              {/* Dotted lines connection circles */}
              <circle cx="300" cy="110" r="4" fill="#059669" />
              <circle cx="300" cy="135" r="4" fill="#f59e0b" />
              <circle cx="300" cy="140" r="4" fill="#ef4444" />
            </svg>

            {/* Policy Annotation Card overlay */}
            <div className="absolute top-[2px] left-[42%] bg-[#fffbeb] dark:bg-amber-950/60 border border-amber-200/80 dark:border-amber-700/50 rounded-xl p-2.5 shadow-sm text-center">
              <p className="text-[11px] font-bold text-amber-800 dark:text-amber-300">Policy change implemented</p>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">March 1, 2026</p>
            </div>

            {/* Chart X axis labels */}
            <div className="flex justify-between items-center mt-3 text-[11px] font-bold text-slate-400 dark:text-slate-500 px-2">
              <span>Jan '26</span>
              <span>Feb '26</span>
              <span>Mar '26</span>
              <span>Apr '26</span>
              <span>May '26</span>
              <span>Jun '26</span>
            </div>
          </div>

          {/* Sentiment Drop card */}
          <div className="bg-slate-50 dark:bg-slate-800/60 rounded-2xl p-5 border border-slate-100 dark:border-slate-800 flex flex-col justify-center">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wide mb-1 block">Key change after policy implementation</span>
            <span className="flex items-center gap-1 text-[26px] font-bold text-red-500 leading-none">
              ↓ 31%
            </span>
            <p className="text-[13px] text-slate-700 dark:text-slate-200 font-semibold mt-2">Positive sentiment drop</p>
            <span className="text-[11px] text-slate-400 font-medium">(Mar – Jun 2026)</span>
          </div>
        </div>

        <div className="bg-purple-50 dark:bg-purple-950/30 border border-purple-100 dark:border-purple-900/50 rounded-xl p-4 mt-6 flex gap-1.5">
          <span className="text-purple-600 dark:text-purple-400 text-[14px]">✨</span>
          <p className="text-[12px] text-purple-900/80 dark:text-purple-300 font-medium leading-relaxed">
            <strong>AI Insight:</strong> The March inflection aligns precisely with the overtime policy change. Post-change satisfaction dropped 31%.
          </p>
        </div>
      </div>

      {/* Related Findings */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-[16px] text-slate-800 dark:text-slate-100">Related Findings</h3>
          <button className="text-[12.5px] font-bold text-[#059669] hover:underline flex items-center gap-0.5 cursor-pointer">
            View all related
            <IconChevronRight />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { id: "Q7", title: "Work-life balance rating", relation: "Strongly Related", relationColor: "text-[#059669] dark:text-emerald-400 bg-[#e8f7f0] dark:bg-emerald-950/40", index: "0.87", trend: "↓ 28%", trendColor: "text-red-500" },
            { id: "Q12", title: "Overtime satisfaction", relation: "Strongly Related", relationColor: "text-[#059669] dark:text-emerald-400 bg-[#e8f7f0] dark:bg-emerald-950/40", index: "0.79", trend: "↓ 32%", trendColor: "text-red-500" },
            { id: "Q8", title: "Stress levels at work", relation: "Related", relationColor: "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40", index: "0.63", trend: "↓ 24%", trendColor: "text-red-500" },
            { id: "Q3", title: "Equipment adequacy", relation: "Weakly Related", relationColor: "text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800", index: "0.34", trend: "↑ 5%", trendColor: "text-emerald-500" }
          ].map((item, idx) => (
            <div key={idx} className="bg-white dark:bg-[#111827] rounded-2xl p-4.5 border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow relative">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[13px] font-bold text-[#059669] dark:text-emerald-400">{item.id}</span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${item.relationColor}`}>{item.relation}</span>
              </div>
              <h4 className="text-[13.5px] font-bold text-slate-800 dark:text-slate-100 leading-snug mb-4">{item.title}</h4>
              <div className="flex items-center justify-between pt-3 border-t border-slate-50 dark:border-slate-800">
                <div className="flex flex-col">
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wide">Correlation</span>
                  <span className="text-[13px] font-bold text-slate-700 dark:text-slate-200">{item.index}</span>
                </div>
                <span className={`text-[13px] font-bold ${item.trendColor}`}>{item.trend}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommended Actions */}
      <div className="bg-white dark:bg-[#111827] rounded-[20px] p-6 border border-slate-100 dark:border-slate-800 shadow-sm mb-8">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-emerald-500 text-[18px]">★</span>
          <h3 className="font-bold text-[16px] text-slate-800 dark:text-slate-100">Recommended Actions</h3>
          <span className="text-[12px] text-slate-400 font-medium ml-2">Based on AI analysis & best practices</span>
        </div>

        <div className="flex flex-col gap-3">
          {[
            { step: "1", title: "Conduct focus groups with Engineering and Operations teams", desc: "Understand the root causes behind low satisfaction and gather specific improvement ideas.", priority: "High Priority", priorityColor: "text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/40", owner: "People Ops" },
            { step: "2", title: "Review and customize policy impact assessment", desc: "Evaluate flexibility for different roles and shifts. Consider department-wide adjustments.", priority: "Medium Priority", priorityColor: "text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40", owner: "HR Analytics" },
            { step: "3", title: "Pilot flexible scheduling program in high-risk departments", desc: "Initiate a 3-month flexible scheduling pilot with measureable outcomes.", priority: "High Priority", priorityColor: "text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/40", owner: "Ops + HR" }
          ].map((item) => (
            <div key={item.step} className="flex items-center justify-between p-4 border border-slate-100 dark:border-slate-800 rounded-xl hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
              <div className="flex items-start gap-4">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-[#059669] dark:text-emerald-400 font-bold text-[13px] shrink-0 mt-0.5">
                  {item.step}
                </span>
                <div className="flex flex-col">
                  <h4 className="text-[14px] font-bold text-slate-800 dark:text-slate-100 leading-tight">{item.title}</h4>
                  <p className="text-[12px] text-slate-400 font-medium mt-1">{item.desc}</p>
                </div>
              </div>

              <div className="flex items-center gap-6 shrink-0">
                <span className={`px-2.5 py-1 rounded text-[11px] font-bold ${item.priorityColor}`}>
                  {item.priority}
                </span>
                <div className="flex flex-col items-end">
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wide">Owner</span>
                  <span className="text-[12px] font-semibold text-slate-600 dark:text-slate-300">{item.owner}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Feedback panel */}
      <div className="flex items-center justify-between border-t border-slate-150 pt-5 mt-4">
        <div className="flex items-center gap-3">
          <span className="text-[13px] font-semibold text-slate-500">Was this insight helpful?</span>
          <button 
            onClick={() => setFeedbackHelpful(true)}
            className={`w-8 h-8 rounded-full border flex items-center justify-center transition-colors cursor-pointer text-[14px] ${
              feedbackHelpful === true ? "bg-emerald-50 border-[#059669] text-[#059669]" : "border-slate-200 text-slate-400 hover:bg-slate-50"
            }`}
          >
            👍
          </button>
          <button 
            onClick={() => setFeedbackHelpful(false)}
            className={`w-8 h-8 rounded-full border flex items-center justify-center transition-colors cursor-pointer text-[14px] ${
              feedbackHelpful === false ? "bg-red-50 border-red-400 text-red-500" : "border-slate-200 text-slate-400 hover:bg-slate-50"
            }`}
          >
            👎
          </button>
        </div>

        <button className="flex items-center gap-2 text-[13px] font-bold text-slate-500 hover:text-slate-800 cursor-pointer">
          💬 Give feedback
        </button>
      </div>
    </div>
  );
}

// --- MAIN EXPORT COMPONENT ---
export default function Questions() {
  const [selectedQuestionId, setSelectedQuestionId] = useState<string | null>(null);

  const [viewMode, setViewMode] = useState<"compact" | "detailed">("detailed");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Filter states
  const [selectedType, setSelectedType] = useState<string>("All");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedPriority, setSelectedPriority] = useState<string>("All");
  const [selectedCompletion, setSelectedCompletion] = useState<string>("All");
  const [sortBy, setSortBy] = useState<string>("Priority: High to Low");

  // Dropdown UI states
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  // Accordion state
  const [sectionsOpen, setSectionsOpen] = useState({
    "Workplace Satisfaction": true,
    "Compensation & Benefits": true,
    "Growth & Development": true,
    "Leadership & Culture": true
  });

  const toggleSection = (section: keyof typeof sectionsOpen) => {
    setSectionsOpen(prev => ({ ...prev, [section]: !prev[section] }));
  };

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(24);

  // Close dropdowns on outside click
  const dropdownRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter & Sort Logic
  const filteredQuestions = useMemo(() => {
    let result = [...ALL_QUESTIONS_DATA];

    // Search Query Filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(item => 
        item.id.toLowerCase().includes(q) || 
        item.text.toLowerCase().includes(q) ||
        item.type.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q)
      );
    }

    // Type Filter
    if (selectedType !== "All") {
      result = result.filter(item => item.type === selectedType);
    }

    // Category Filter
    if (selectedCategory !== "All") {
      result = result.filter(item => item.category === selectedCategory);
    }

    // Priority Filter
    if (selectedPriority !== "All") {
      const target = selectedPriority.toLowerCase().replace(" priority", "");
      result = result.filter(item => item.priority === target);
    }

    // Completion Filter
    if (selectedCompletion !== "All") {
      if (selectedCompletion === "Above 90%") {
        result = result.filter(item => item.completion >= 90);
      } else if (selectedCompletion === "Below 90%") {
        result = result.filter(item => item.completion < 90);
      }
    }

    // Sort Logic
    if (sortBy === "Priority: High to Low") {
      const priorityWeights = { high: 3, medium: 2, low: 1 };
      result.sort((a, b) => priorityWeights[b.priority] - priorityWeights[a.priority]);
    } else if (sortBy === "Priority: Low to High") {
      const priorityWeights = { high: 3, medium: 2, low: 1 };
      result.sort((a, b) => priorityWeights[a.priority] - priorityWeights[b.priority]);
    } else if (sortBy === "Completion Rate") {
      result.sort((a, b) => b.completion - a.completion);
    } else if (sortBy === "Responses") {
      result.sort((a, b) => b.responses - a.responses);
    }

    return result;
  }, [searchQuery, selectedType, selectedCategory, selectedPriority, selectedCompletion, sortBy]);

  // Paginated questions
  const paginatedQuestions = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredQuestions.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredQuestions, currentPage, itemsPerPage]);

  // Dynamic statistics
  const totalResponsesSum = useMemo(() => {
    return filteredQuestions.reduce((acc, q) => acc + q.responses, 0).toLocaleString();
  }, [filteredQuestions]);

  const avgCompletion = useMemo(() => {
    if (filteredQuestions.length === 0) return "0%";
    const sum = filteredQuestions.reduce((acc, q) => acc + q.completion, 0);
    return `${(sum / filteredQuestions.length).toFixed(1)}%`;
  }, [filteredQuestions]);

  const clearAllFilters = () => {
    setSelectedType("All");
    setSelectedCategory("All");
    setSelectedPriority("All");
    setSelectedCompletion("All");
    setSearchQuery("");
  };

  const hasActiveFilters = 
    selectedType !== "All" || 
    selectedCategory !== "All" || 
    selectedPriority !== "All" || 
    selectedCompletion !== "All" ||
    searchQuery !== "";

  // Conditional rendering of the Detail Analysis Page
  if (selectedQuestionId === "Q1") {
    return <QuestionAnalysis onBack={() => setSelectedQuestionId(null)} />;
  }

  return (
    <div className="flex flex-col size-full overflow-y-auto pr-2 pb-10 custom-scrollbar">
      {/* Top Header Section */}
      <div className="mb-6 flex items-center justify-between mt-2">
        <div>
          <h1 className="text-[26px] font-bold text-slate-900 dark:text-white mb-1">Question Explorer</h1>
          <p className="text-[14px] text-slate-500 dark:text-slate-400 font-medium">
            {filteredQuestions.length} questions • {totalResponsesSum} responses
          </p>
        </div>
        
        {/* Compact / Detailed View Toggle */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
          <button 
            onClick={() => setViewMode("compact")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[13px] font-medium transition-all cursor-pointer ${
              viewMode === "compact"
                ? "bg-white dark:bg-[#111827] text-slate-800 dark:text-slate-100 shadow-sm"
                : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
            }`}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
            Compact View
          </button>
          <button 
            onClick={() => setViewMode("detailed")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[13px] font-medium transition-all cursor-pointer ${
              viewMode === "detailed"
                ? "bg-[#e8f7f0] dark:bg-emerald-950/60 text-[#059669] dark:text-emerald-400 font-semibold border border-[#a7f3d0]/30 dark:border-emerald-800/40 shadow-sm"
                : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
            }`}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
            </svg>
            Detailed View
          </button>
        </div>
      </div>

      {/* Search and Filters dropdown row */}
      <div className="flex items-center gap-3 mb-5 w-full relative z-20" ref={dropdownRef}>
        <div className="flex-1 flex items-center gap-2 pl-4 py-2.5 bg-white dark:bg-[#111827] rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <IconSearch />
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search questions, topics, or insights..." 
            className="w-full text-[14px] bg-transparent outline-none text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500"
          />
        </div>
        
        {/* Filter Dropdowns */}
        {[
          { name: "Type", value: selectedType, setter: setSelectedType, options: ["All", "Single Choice", "Multiple Choice", "Ranking", "NPS", "Date", "Long Text", "Yes/No"] },
          { name: "Category", value: selectedCategory, setter: setSelectedCategory, options: ["All", "Workplace Satisfaction", "Compensation & Benefits", "Growth & Development", "Leadership & Culture"] },
          { name: "Priority", value: selectedPriority, setter: setSelectedPriority, options: ["All", "High Priority", "Medium Priority", "Low Priority"] },
          { name: "Completion", value: selectedCompletion, setter: setSelectedCompletion, options: ["All", "Above 90%", "Below 90%"] }
        ].map((filter) => (
          <div key={filter.name} className="relative">
            <button 
              onClick={() => setOpenDropdown(openDropdown === filter.name ? null : filter.name)}
              className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border bg-white dark:bg-[#111827] text-[13px] font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-sm cursor-pointer ${
                filter.value !== "All" ? "border-[#059669] dark:border-emerald-600 text-[#059669] dark:text-emerald-400" : "border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200"
              }`}
            >
              {filter.name}: {filter.value}
              <IconChevronDown />
            </button>
            
            {openDropdown === filter.name && (
              <div className="absolute right-0 mt-2 w-[220px] rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111827] p-1.5 shadow-lg z-50 flex flex-col gap-0.5">
                {filter.options.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => {
                      filter.setter(opt);
                      setOpenDropdown(null);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-lg text-[13px] font-medium transition-all cursor-pointer ${
                      filter.value === opt 
                        ? "bg-[#e8f7f0] dark:bg-emerald-950/60 text-[#059669] dark:text-emerald-400" 
                        : "text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
        
        {hasActiveFilters && (
          <button 
            onClick={clearAllFilters}
            className="text-[13px] font-bold text-[#059669] hover:text-[#047857] transition-colors ml-2 cursor-pointer whitespace-nowrap"
          >
            Clear Filters
          </button>
        )}
      </div>

      {/* Active Filters row */}
      {hasActiveFilters && (
        <div className="flex items-center gap-2.5 mb-6 text-[13px] flex-wrap">
          <span className="font-bold text-slate-500 uppercase tracking-wider text-[11px] mr-1">Active Filters</span>
          {selectedType !== "All" && (
            <div className="flex items-center gap-1.5 px-3 py-1 bg-white border border-[#a7f3d0] rounded-full text-[#059669] font-semibold shadow-sm">
              Type: {selectedType}
              <button onClick={() => setSelectedType("All")} className="text-slate-400 hover:text-slate-600 transition-colors">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          )}
          {selectedCategory !== "All" && (
            <div className="flex items-center gap-1.5 px-3 py-1 bg-white border border-[#a7f3d0] rounded-full text-[#059669] font-semibold shadow-sm">
              Category: {selectedCategory}
              <button onClick={() => setSelectedCategory("All")} className="text-slate-400 hover:text-slate-600 transition-colors">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          )}
          {selectedPriority !== "All" && (
            <div className="flex items-center gap-1.5 px-3 py-1 bg-white border border-[#a7f3d0] rounded-full text-[#059669] font-semibold shadow-sm">
              Priority: {selectedPriority}
              <button onClick={() => setSelectedPriority("All")} className="text-slate-400 hover:text-slate-600 transition-colors">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          )}
          {selectedCompletion !== "All" && (
            <div className="flex items-center gap-1.5 px-3 py-1 bg-white border border-[#a7f3d0] rounded-full text-[#059669] font-semibold shadow-sm">
              Completion: {selectedCompletion}
              <button onClick={() => setSelectedCompletion("All")} className="text-slate-400 hover:text-slate-600 transition-colors">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          )}
          {searchQuery && (
            <div className="flex items-center gap-1.5 px-3 py-1 bg-white border border-[#a7f3d0] rounded-full text-[#059669] font-semibold shadow-sm">
              Query: "{searchQuery}"
              <button onClick={() => setSearchQuery("")} className="text-slate-400 hover:text-slate-600 transition-colors">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          )}
          <button 
            onClick={clearAllFilters}
            className="text-[13px] font-bold text-[#059669] hover:text-[#047857] ml-auto transition-colors cursor-pointer"
          >
            Clear all
          </button>
        </div>
      )}

      {/* Info Stats Banner */}
      <div className="flex items-center justify-between p-4 bg-white dark:bg-[#111827] rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm mb-6 w-full">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#e8f7f0] dark:bg-emerald-950/40 text-[#059669] dark:text-emerald-400">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
            </svg>
          </div>
          <div>
            <h4 className="text-[14px] font-bold text-slate-800 dark:text-slate-100 leading-snug">Showing questions</h4>
            <p className="text-[12px] text-slate-400 font-medium">
              {filteredQuestions.length} of {ALL_QUESTIONS_DATA.length} questions
            </p>
          </div>
        </div>

        {/* Responses Stat */}
        <div className="flex items-center gap-3">
          <div className="text-slate-400">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v5.25c0 .621-.504 1.125-1.125 1.125h-2.25A1.125 1.125 0 013 18.375v-5.25zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125v-9.75zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v14.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
            </svg>
          </div>
          <div>
            <p className="text-[14px] font-bold text-slate-800 dark:text-slate-100 leading-tight">{totalResponsesSum}</p>
            <p className="text-[12px] text-slate-400 font-medium">Total Responses</p>
          </div>
        </div>

        {/* Completion Stat */}
        <div className="flex items-center gap-3">
          <div className="text-slate-400">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z" />
            </svg>
          </div>
          <div>
            <p className="text-[14px] font-bold text-slate-800 dark:text-slate-100 leading-tight">{avgCompletion}</p>
            <p className="text-[12px] text-slate-400 font-medium">Avg. Completion</p>
          </div>
        </div>

        {/* Sort Dropdown */}
        <div className="flex flex-col gap-1 items-end relative">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">Sort by</span>
          <button 
            onClick={() => setOpenDropdown(openDropdown === "sort" ? null : "sort")}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#111827] text-[12px] font-semibold text-[#0f172a] dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 shadow-sm cursor-pointer"
          >
            {sortBy}
            <IconChevronDown />
          </button>
          
          {openDropdown === "sort" && (
            <div className="absolute right-0 mt-[55px] w-[200px] rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111827] p-1.5 shadow-lg z-50 flex flex-col gap-0.5">
              {["Priority: High to Low", "Priority: Low to High", "Completion Rate", "Responses"].map((opt) => (
                <button
                  key={opt}
                  onClick={() => {
                    setSortBy(opt);
                    setOpenDropdown(null);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-lg text-[12px] font-medium transition-all cursor-pointer ${
                    sortBy === opt 
                      ? "bg-[#e8f7f0] dark:bg-emerald-950/60 text-[#059669] dark:text-emerald-400" 
                      : "text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Accordion Categories */}
      <div className="flex flex-col gap-4">
        {[
          { key: "Workplace Satisfaction", label: "Workplace Satisfaction", questions: paginatedQuestions.filter(q => q.category === "Workplace Satisfaction") },
          { key: "Compensation & Benefits", label: "Compensation & Benefits", questions: paginatedQuestions.filter(q => q.category === "Compensation & Benefits") },
          { key: "Growth & Development", label: "Growth & Development", questions: paginatedQuestions.filter(q => q.category === "Growth & Development") },
          { key: "Leadership & Culture", label: "Leadership & Culture", questions: paginatedQuestions.filter(q => q.category === "Leadership & Culture") }
        ].map((sec) => {
          const isSectionOpen = sectionsOpen[sec.key as keyof typeof sectionsOpen];
          const hasQuestions = sec.questions.length > 0;
          
          const catSum = sec.questions.reduce((acc, q) => acc + q.completion, 0);
          const catAvg = sec.questions.length > 0 ? `${(catSum / sec.questions.length).toFixed(1)}%` : "N/A";

          return (
            <div key={sec.key} className="border border-slate-200/80 dark:border-slate-800 bg-[#f8fafc]/50 dark:bg-[#090d16]/50 rounded-[20px] overflow-hidden shadow-sm">
              <button 
                onClick={() => toggleSection(sec.key as keyof typeof sectionsOpen)}
                className="flex items-center justify-between w-full p-4 bg-white dark:bg-[#111827] border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/70 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="text-slate-400 shrink-0">
                    <svg className={`w-5 h-5 transition-transform duration-200 ${isSectionOpen ? "rotate-90" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                  </div>
                  <span className="font-['Inter',sans-serif] font-bold text-[16px] text-slate-800 dark:text-slate-100">{sec.label}</span>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#e8f7f0] dark:bg-emerald-950/50 text-[#059669] dark:text-emerald-400">
                    {sec.questions.length} questions
                  </span>
                </div>
                
                <div className="flex items-center gap-4 text-[13px] font-medium text-slate-500 dark:text-slate-400">
                  <span>Avg. Completion: <strong className="text-slate-800 dark:text-slate-200 font-bold">{catAvg}</strong></span>
                  {isSectionOpen ? <IconChevronUp /> : <IconChevronDown />}
                </div>
              </button>

              {isSectionOpen && (
                <div className="p-6 bg-[#f8fafc]/60 dark:bg-[#090d16]/30">
                  {!hasQuestions ? (
                    <p className="text-slate-400 text-[13px] text-center py-4 font-medium">No matching questions in this category.</p>
                  ) : viewMode === "detailed" ? (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {sec.questions.map((q) => (
                        <div key={q.id} className="bg-white dark:bg-[#111827] rounded-[16px] p-6 border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
                          <div>
                            <div className="flex items-center justify-between mb-4">
                              <div className="flex items-center gap-2">
                                <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-md uppercase ${
                                  q.type === "Single Choice" ? "text-[#059669] dark:text-emerald-400 bg-[#e8f7f0] dark:bg-emerald-950/40" :
                                  q.type === "Multiple Choice" ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40" :
                                  q.type === "Ranking" ? "text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/40" : "text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40"
                                }`}>
                                  {q.type}
                                </span>
                                <span className="text-[12px] font-semibold text-slate-400">{q.id}</span>
                              </div>
                              <span className="text-[12px] font-bold text-[#059669] dark:text-emerald-400">{q.completion}% Complete</span>
                            </div>

                            <h3 className="text-[15px] font-bold text-slate-800 dark:text-slate-100 leading-snug mb-1">
                              {q.text}
                            </h3>
                            <p className="text-[12px] text-slate-400 font-medium mb-5">{q.responses.toLocaleString()} responses</p>

                            {/* Charts rendering */}
                            <div className="mb-6">
                              {q.chartType === "bar" && q.chartData && (
                                <HorizontalBarChart data={q.chartData} />
                              )}
                              {q.chartType === "donut" && q.chartData && (
                                <div className="flex justify-center py-2">
                                  <DonutChart value={q.responses.toLocaleString()} data={q.chartData} />
                                </div>
                              )}
                              {q.chartType === "emoji" && (
                                <div className="py-4">
                                  <EmojiRatingChart />
                                </div>
                              )}
                              {q.chartType === "ranking" && (
                                <div className="py-2">
                                  <RankingList />
                                </div>
                              )}
                              {q.chartType === "nps" && (
                                <div className="flex items-center gap-8 px-2 py-4">
                                  <div className="relative w-24 h-12 overflow-hidden shrink-0">
                                    <div className="absolute w-24 h-24 border-[8px] border-slate-100 dark:border-slate-800 rounded-full border-b-transparent border-l-transparent transform -rotate-45"></div>
                                    <div className="absolute w-24 h-24 border-[8px] border-[#10b981] rounded-full border-b-transparent border-l-transparent transform -rotate-45" style={{clipPath: "polygon(0 0, 100% 0, 100% 50%, 0 50%)"}}></div>
                                    <div className="absolute bottom-0 left-0 w-full flex items-end justify-center pb-1">
                                      <span className="text-[20px] font-bold text-slate-800 dark:text-slate-100">+47</span>
                                    </div>
                                  </div>
                                  <div className="flex flex-col gap-1.5">
                                    <div className="flex items-center justify-between w-full min-w-[100px]">
                                      <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Promoters</span>
                                      <span className="text-[11px] font-bold text-[#10b981]">67%</span>
                                    </div>
                                    <div className="flex items-center justify-between w-full min-w-[100px]">
                                      <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Passives</span>
                                      <span className="text-[11px] font-bold text-[#f59e0b]">20%</span>
                                    </div>
                                    <div className="flex items-center justify-between w-full min-w-[100px]">
                                      <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Detractors</span>
                                      <span className="text-[11px] font-bold text-[#ef4444]">13%</span>
                                    </div>
                                  </div>
                                </div>
                              )}
                              {q.chartType === "text" && (
                                <div className="bg-[#f8fafc] dark:bg-slate-800/50 rounded-xl p-4 border border-slate-100 dark:border-slate-700 relative">
                                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 block">Emerging Frustration Signal</span>
                                  <p className="text-[13px] text-slate-600 dark:text-slate-300 italic font-medium leading-relaxed">
                                    "...reimbursement takes more than 4 weeks on average, causing significant out-of-pocket stress..."
                                  </p>
                                </div>
                              )}
                              {q.chartType === "vertical-bar" && (
                                <div className="flex flex-col gap-2 w-full mt-2">
                                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Start Year Distribution</span>
                                  <div className="flex items-end gap-2 h-20 mt-2">
                                    {[
                                      { year: "2018", value: 30 },
                                      { year: "2019", value: 50 },
                                      { year: "2020", value: 65 },
                                      { year: "2021", value: 80 },
                                      { year: "2022", value: 45 },
                                      { year: "2023", value: 35 },
                                      { year: "2024", value: 20 },
                                    ].map((item, i) => (
                                      <div key={i} className="flex flex-col items-center gap-2 flex-1">
                                        <div className="w-full bg-[#34d399] rounded-t-sm hover:bg-[#10b981] transition-colors" style={{ height: `${item.value}px` }}></div>
                                        <span className="text-[10px] font-medium text-slate-500 dark:text-slate-400">{item.year}</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>

                            {/* AI Insight banner */}
                            {q.insight && (
                              <div className="bg-[#f5f3ff] dark:bg-indigo-950/30 border border-[#ddd6fe]/50 dark:border-indigo-900/40 rounded-xl p-4 mb-4 flex flex-col gap-1.5 relative overflow-hidden">
                                <div className="flex items-center gap-1.5 text-[#7c3aed] dark:text-indigo-400">
                                  <IconSparkles />
                                  <span className="text-[11px] font-bold uppercase tracking-wider">AI Insight</span>
                                </div>
                                <p className="text-[13px] text-[#5b21b6] dark:text-indigo-300 font-medium leading-relaxed">
                                  {q.insight}
                                </p>
                              </div>
                            )}
                          </div>

                          <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800 mt-4">
                            <div className="flex items-center gap-2">
                              {q.priority === "high" ? (
                                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-red-50 dark:bg-red-950/50 text-red-600 dark:text-red-400 text-[12px] font-bold">
                                  {q.priorityScore || 90}
                                </div>
                              ) : (
                                <div className={`w-2.5 h-2.5 rounded-full ${q.priority === "medium" ? "bg-[#f59e0b]" : "bg-slate-400"}`} />
                              )}
                              <div className="flex flex-col">
                                <span className={`text-[10px] font-bold uppercase tracking-wide ${
                                  q.priority === "high" ? "text-red-500 dark:text-red-400" :
                                  q.priority === "medium" ? "text-[#f59e0b] dark:text-amber-400" : "text-slate-400"
                                }`}>
                                  {q.priority === "high" ? "High Priority" : q.priority === "medium" ? "Medium Priority" : "Low Priority"}
                                </span>
                                <span className="text-[11px] text-slate-400 font-medium">Action recommended</span>
                              </div>
                            </div>
                            <button 
                              onClick={() => setSelectedQuestionId(q.id)}
                              className="flex items-center gap-1.5 text-[12px] font-bold text-[#059669] dark:text-emerald-400 hover:text-[#047857] dark:hover:text-emerald-300 transition-all cursor-pointer"
                            >
                              {q.actionText || "View Details"}
                              <IconChevronRight />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    // Compact Table/List View
                    <div className="bg-white dark:bg-[#111827] rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-slate-50/75 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-700 text-slate-400 dark:text-slate-400 text-[11px] font-bold uppercase tracking-wider">
                            <th className="py-3 px-4">ID</th>
                            <th className="py-3 px-4">Type</th>
                            <th className="py-3 px-4">Question Text</th>
                            <th className="py-3 px-4 text-right">Responses</th>
                            <th className="py-3 px-4 text-right">Completion</th>
                            <th className="py-3 px-4 text-center">Priority</th>
                            <th className="py-3 px-4 text-center">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {sec.questions.map((q) => (
                            <tr key={q.id} className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors text-[13px] text-slate-700 dark:text-slate-300">
                              <td className="py-3 px-4 font-bold text-slate-500 dark:text-slate-400">{q.id}</td>
                              <td className="py-3 px-4">
                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                                  q.type === "Single Choice" ? "text-[#059669] dark:text-emerald-400 bg-[#e8f7f0] dark:bg-emerald-950/40" :
                                  q.type === "Multiple Choice" ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40" :
                                  q.type === "Ranking" ? "text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/40" : "text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40"
                                }`}>
                                  {q.type}
                                </span>
                              </td>
                              <td className="py-3 px-4 font-semibold text-slate-800 dark:text-slate-100 max-w-[400px] truncate">{q.text}</td>
                              <td className="py-3 px-4 text-right font-medium text-slate-500 dark:text-slate-400">{q.responses.toLocaleString()}</td>
                              <td className="py-3 px-4 text-right font-bold text-emerald-600 dark:text-emerald-400">{q.completion}%</td>
                              <td className="py-3 px-4 text-center">
                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                                  q.priority === "high" ? "text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/40" :
                                  q.priority === "medium" ? "text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40" : "text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800"
                                }`}>
                                  {q.priority}
                                </span>
                              </td>
                              <td className="py-3 px-4 text-center">
                                <button 
                                  onClick={() => setSelectedQuestionId(q.id)}
                                  className="text-[#059669] dark:text-emerald-400 hover:text-[#047857] dark:hover:text-emerald-300 font-bold text-[12px] transition-colors cursor-pointer"
                                >
                                  View
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Pagination Footer */}
      <div className="mt-10 flex items-center justify-between px-4 w-full">
        <span className="text-[13px] font-medium text-slate-500 dark:text-slate-400">
          Showing 1 to {filteredQuestions.length} of {filteredQuestions.length} questions
        </span>
        
        <div className="flex items-center gap-2">
          <button 
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            className="w-8 h-8 rounded-full border border-slate-200 dark:border-slate-700 flex items-center justify-center hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
          
          <button className="w-8 h-8 rounded-full bg-[#059669] text-white text-[13px] font-bold shadow-md shadow-[#059669]/10">
            {currentPage}
          </button>
          
          <button 
            disabled={currentPage * itemsPerPage >= filteredQuestions.length}
            onClick={() => setCurrentPage(prev => prev + 1)}
            className="w-8 h-8 rounded-full border border-slate-200 dark:border-slate-700 flex items-center justify-center hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[12px] font-medium text-slate-400 uppercase tracking-wide">Show per page</span>
          <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#111827] text-[13px] font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 shadow-sm cursor-pointer">
            {itemsPerPage}
            <IconChevronDown />
          </button>
        </div>
      </div>

      {/* Global styles for scrollbar customization */}
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #cbd5e1;
          border-radius: 10px;
        }
      `}} />
    </div>
  );
}
