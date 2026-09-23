import React, { useState, useMemo } from "react";
import {
  Sparkles,
  RefreshCw,
  CheckSquare,
  Smile,
  Zap,
  Shield,
  ChevronDown,
  Search,
  Calendar,
  MessageSquare,
  Heart,
  Laptop,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Send,
  User,
  Plus
} from "lucide-react";
import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

import { useSurveyData } from "../context/SurveyDataContext";
import ScheduleInterviewModal, { RespondentBookingTarget } from "./ScheduleInterviewModal";

// Import sample profile pictures from imports
import imgProfileAvatar from "../../imports/DonezoDashboard/119adb801822bb7577f873d4b007f7a4899ea16c.png";
import imgAvatar from "../../imports/DonezoDashboard/33cf7140d91e2d226527cd50794e896f2c531f41.png";
import imgAvatar1 from "../../imports/DonezoDashboard/32d55c0bd3bf8bc9b4cabd65f1ca80f4ee20f935.png";
import imgAvatar2 from "../../imports/DonezoDashboard/2ff787ab01ae55f30fa18ab6e74e3bc67288cb6a.png";
import imgAvatar3 from "../../imports/DonezoDashboard/c338a2ddfb97a61bbf8082a7a7da31e072d85582.png";

const AVATAR_LIST = [imgProfileAvatar, imgAvatar, imgAvatar1, imgAvatar2, imgAvatar3];

interface Respondent {
  id: string;
  name: string;
  avatar: string;
  role: string;
  department: string;
  experience: "Senior" | "Lead" | "Manager" | "Junior";
  lastActive: string;
  sentiment: number; // 0-100 score
  topics: ("scheduling" | "communication" | "work-life" | "equipment")[];
}

const INITIAL_RESPONDENTS: Respondent[] = [
  {
    id: "1",
    name: "Sarah Jenkins",
    avatar: imgProfileAvatar,
    role: "Sr. Frontend Lead",
    department: "Engineering",
    experience: "Senior",
    lastActive: "Today, 14:32",
    sentiment: 88,
    topics: ["scheduling", "communication", "work-life"]
  },
  {
    id: "2",
    name: "Devon Carter",
    avatar: imgAvatar,
    role: "VP of Product",
    department: "Product",
    experience: "Lead",
    lastActive: "Today, 11:15",
    sentiment: 94,
    topics: ["communication", "work-life"]
  },
  {
    id: "3",
    name: "Elena Rostova",
    avatar: imgAvatar1,
    role: "Principal Researcher",
    department: "Design / UX",
    experience: "Senior",
    lastActive: "Yesterday",
    sentiment: 42,
    topics: ["scheduling", "equipment"]
  },
  {
    id: "4",
    name: "Marcus Aurelius",
    avatar: imgAvatar2,
    role: "Director of Ops",
    department: "Operations",
    experience: "Manager",
    lastActive: "Yesterday",
    sentiment: 68,
    topics: ["scheduling", "communication"]
  },
  {
    id: "5",
    name: "Lina Vance",
    avatar: imgAvatar3,
    role: "Senior UI Designer",
    department: "Design / UX",
    experience: "Senior",
    lastActive: "Oct 24, 2026",
    sentiment: 12,
    topics: ["scheduling", "equipment"]
  }
];

const PERSONAS = [
  {
    title: "Veteran Engineers",
    count: 842,
    avatar: imgProfileAvatar,
    sentiment: "High Frustration",
    sentimentColor: "bg-rose-50 text-rose-700 border-rose-100",
    topIssue: "Scheduling flexibility",
    similarity: 86
  },
  {
    title: "New Hires",
    count: 511,
    avatar: imgAvatar,
    sentiment: "Very Positive",
    sentimentColor: "bg-emerald-50 text-emerald-700 border-emerald-100",
    topIssue: "Onboarding experience",
    similarity: 72
  },
  {
    title: "Managers & Leads",
    count: 321,
    avatar: imgAvatar1,
    sentiment: "Mixed",
    sentimentColor: "bg-amber-50 text-amber-700 border-amber-100",
    topIssue: "Communication gaps",
    similarity: 64
  },
  {
    title: "Operations Staff",
    count: 204,
    avatar: imgAvatar2,
    sentiment: "High Frustration",
    sentimentColor: "bg-rose-50 text-rose-700 border-rose-100",
    topIssue: "Travel & reimbursement",
    similarity: 79
  }
];

const HEATMAP_DATA = [
  { dept: "Engineering", promoters: 58, passives: 24, detractors: 18, avg: 82 },
  { dept: "Product", promoters: 62, passives: 23, detractors: 15, avg: 84 },
  { dept: "Design / UX", promoters: 55, passives: 27, detractors: 18, avg: 78 },
  { dept: "Operations", promoters: 41, passives: 28, detractors: 31, avg: 64 }
];

const TOPICS_DATA = [
  { id: "scheduling", name: "Scheduling", mentions: "1,248 mentions", change: "+ 34%", icon: Calendar, color: "text-[#059669]", isPos: true },
  { id: "communication", name: "Communication", mentions: "892 mentions", change: "+ 18%", icon: MessageSquare, color: "text-[#3b82f6]", isPos: true },
  { id: "work-life", name: "Work-life balance", mentions: "712 mentions", change: "+ 12%", icon: Heart, color: "text-[#ec4899]", isPos: true },
  { id: "equipment", name: "Equipment", mentions: "645 mentions", change: "- 6%", icon: Laptop, color: "text-[#f59e0b]", isPos: false }
];

export default function Respondents() {
  // Filters
  const { dataset } = useSurveyData();
  const [selectedDept, setSelectedDept] = useState("All Departments");
  const [selectedRole, setSelectedRole] = useState("All Roles");
  const [selectedSentiment, setSelectedSentiment] = useState("All Scores");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSegmentPill, setActiveSegmentPill] = useState("All");

  // Chat State
  const [chatMessages, setChatMessages] = useState<{ sender: "user" | "bot"; text: string }[]>([
    { sender: "bot", text: `Hi! I am your research assistant for ${dataset.fileName}. Ask me anything about the ${dataset.totalRespondents} respondents!` }
  ]);
  const [chatInput, setChatInput] = useState("");
  const [bookingTarget, setBookingTarget] = useState<RespondentBookingTarget | null>(null);
  const [showScheduler, setShowScheduler] = useState(false);

  const handleOpenScheduler = (respondent: Respondent) => {
    setBookingTarget({
      name: respondent.name,
      role: respondent.role,
      email: `${respondent.name.toLowerCase().replace(/[^a-z]/g, "")}@quantumly.com`,
      sentiment: respondent.sentiment >= 70 ? "Positive" : respondent.sentiment >= 50 ? "Neutral" : "Negative",
      npsScore: Math.round(respondent.sentiment / 10),
    });
    setShowScheduler(true);
  };

  // Recharts Donut data
  const pieData = [
    { name: "Promoters", value: dataset.promotersPct, color: "#10b981" },
    { name: "Passives", value: dataset.passivesPct, color: "#94a3b8" },
    { name: "Detractors", value: dataset.detractorsPct, color: "#ef4444" }
  ];

  // Dynamically mapped respondents list
  const respondentsList: Respondent[] = useMemo(() => {
    return dataset.respondents.map((item, idx) => ({
      id: item.id,
      name: item.name,
      avatar: AVATAR_LIST[idx % AVATAR_LIST.length],
      role: item.role,
      department: item.role.includes("Developer") || item.role.includes("Engineer") ? "Engineering" : item.role.includes("Design") || item.role.includes("UX") ? "Design" : "Product",
      experience: idx % 3 === 0 ? "Lead" : idx % 2 === 0 ? "Senior" : "Manager",
      lastActive: "Today, " + (10 + (idx % 12)) + ":00 AM",
      sentiment: item.npsScore * 10,
      topics: ["scheduling", "communication", "work-life", "equipment"]
    }));
  }, [dataset.respondents]);

  // Filter Logic
  const filteredRespondents = useMemo(() => {
    return respondentsList.filter((item) => {
      if (
        searchQuery &&
        !item.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !item.role.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }

      if (selectedDept !== "All Departments" && item.department !== selectedDept) {
        return false;
      }

      if (selectedSentiment === "Promoters (70-100)" && item.sentiment < 70) return false;
      if (selectedSentiment === "Passives (50-69)" && (item.sentiment < 50 || item.sentiment >= 70)) return false;
      if (selectedSentiment === "Detractors (0-49)" && item.sentiment >= 50) return false;

      if (activeSegmentPill === "Promoters" && item.sentiment < 70) return false;
      if (activeSegmentPill === "Passives" && (item.sentiment < 50 || item.sentiment >= 70)) return false;
      if (activeSegmentPill === "Detractors" && item.sentiment >= 50) return false;

      return true;
    });
  }, [respondentsList, searchQuery, selectedDept, selectedSentiment, activeSegmentPill]);

  const handleAskAssistant = (promptText: string) => {
    if (!promptText.trim()) return;
    const newMsg = { sender: "user" as const, text: promptText };
    setChatMessages((prev) => [...prev, newMsg]);

    setTimeout(() => {
      let reply = "I analyzed our 2,847 tracked respondents. Let me check that metric for you.";
      const query = promptText.toLowerCase();

      if (query.includes("frustrated") || query.includes("detractor")) {
        reply = "The most frustrated group is **Operations Staff** (204 respondents, High Frustration, average sentiment 64) and **Veteran Engineers** in Engineering, primarily due to Scheduling and Travel/Reimbursement policies.";
      } else if (query.includes("sentiment") || query.includes("compare")) {
        reply = "Product has the highest sentiment with **62% Promoters** and an average score of **84**. Operations shows the lowest score of **64** with **31% Detractors**.";
      } else if (query.includes("engineering") || query.includes("issue")) {
        reply = "For the Engineering team, the top frustration is **Scheduling flexibility** (86% similarity match) with overall average score at 82.";
      }

      setChatMessages((prev) => [...prev, { sender: "bot" as const, text: reply }]);
    }, 600);
  };

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    handleAskAssistant(chatInput);
    setChatInput("");
  };

  return (
    <div className="w-full overflow-y-auto flex flex-col h-[calc(100vh-120px)] relative">
      <div className="flex flex-row gap-[24px] items-start p-[32px] w-full max-w-[1550px] mx-auto pb-32">

        {/* Main Column */}
        <div className="flex-1 flex flex-col gap-[28px] min-w-0">

          {/* Header Row */}
          <div className="flex justify-between items-end w-full">
            <div className="flex flex-col gap-[2px]">
              <span className="font-['Inter',sans-serif] font-semibold text-[#059669] dark:text-emerald-400 text-[11px] uppercase tracking-widest">
                UX DEMOGRAPHICS
              </span>
              <div className="flex items-baseline gap-[12px]">
                <h1 className="font-['Inter',sans-serif] font-bold text-[#0f172a] dark:text-white text-[32px] leading-tight">
                  Respondents
                </h1>
                <span className="font-['Inter',sans-serif] text-slate-500 dark:text-slate-400 text-[14px]">
                  2,847 total respondents tracked
                </span>
              </div>
            </div>
            <button className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111827] hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-slate-300 shadow-sm cursor-pointer">
              <RefreshCw className="size-[16px]" />
            </button>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-4 gap-[16px] w-full">
            {/* KPI 1 */}
            <div className="rounded-[20px] p-[20px] bg-white dark:bg-[#111827] border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between h-[150px]">
              <div className="flex justify-between items-start">
                <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                  SURVEY COMPLETED
                </span>
                <div className="bg-[#e8f7f0] dark:bg-emerald-950/50 text-[#059669] dark:text-emerald-400 p-1.5 rounded-lg">
                  <CheckSquare className="size-[14px]" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-[26px] font-extrabold text-slate-900 dark:text-white leading-tight">
                  2,482
                </span>
                <span className="text-[11px] font-semibold text-[#059669] dark:text-emerald-400 mt-0.5">
                  ↑ 12% vs last week
                </span>
              </div>
            </div>

            {/* KPI 2 */}
            <div className="rounded-[20px] p-[20px] bg-white dark:bg-[#111827] border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between h-[150px]">
              <div className="flex justify-between items-start">
                <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                  AVERAGE SENTIMENT
                </span>
                <div className="bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 p-1.5 rounded-lg text-center">
                  <Smile className="size-[14px] mx-auto" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-[26px] font-extrabold text-slate-900 dark:text-white leading-tight">
                  76
                </span>
                <span className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 mt-0.5">
                  Highly Positive overall
                </span>
              </div>
            </div>

            {/* KPI 3 */}
            <div className="rounded-[20px] p-[20px] bg-white dark:bg-[#111827] border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between h-[150px]">
              <div className="flex justify-between items-start">
                <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                  RESPONSE RATE
                </span>
                <div className="bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 p-1.5 rounded-lg">
                  <Zap className="size-[14px]" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-[26px] font-extrabold text-slate-900 dark:text-white leading-tight">
                  94.2%
                </span>
                <span className="text-[11px] font-semibold text-amber-600 dark:text-amber-400 mt-0.5">
                  1.5 min avg completion
                </span>
              </div>
            </div>

            {/* KPI 4 */}
            <div className="rounded-[20px] p-[20px] bg-white dark:bg-[#111827] border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between h-[150px]">
              <div className="flex justify-between items-start">
                <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                  DETRACTORS RESOLVED
                </span>
                <div className="bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 p-1.5 rounded-lg">
                  <Shield className="size-[14px]" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-[26px] font-extrabold text-slate-900 dark:text-white leading-tight">
                  184
                </span>
                <span className="text-[11px] font-semibold text-rose-600 dark:text-rose-400 mt-0.5">
                  34 queued for follow-up
                </span>
              </div>
            </div>
          </div>

          {/* Filters Area */}
          <div className="flex flex-col gap-[16px] w-full">
            <div className="flex flex-wrap gap-[12px] items-center">
              {/* Department Dropdown */}
              <div className="relative">
                <select
                  value={selectedDept}
                  onChange={(e) => setSelectedDept(e.target.value)}
                  className="appearance-none pl-3 pr-8 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111827] text-[13px] font-semibold text-slate-700 dark:text-slate-200 shadow-sm outline-none focus:border-[#059669] cursor-pointer"
                >
                  <option>All Departments</option>
                  <option>Engineering</option>
                  <option>Product</option>
                  <option>Design / UX</option>
                  <option>Operations</option>
                </select>
                <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 size-[14px] text-slate-400 pointer-events-none" />
              </div>

              {/* Role dropdown */}
              <div className="relative">
                <select
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  className="appearance-none pl-3 pr-8 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111827] text-[13px] font-semibold text-slate-700 dark:text-slate-200 shadow-sm outline-none focus:border-[#059669] cursor-pointer"
                >
                  <option>Seniors & Leads</option>
                  <option>Managers</option>
                  <option>All Experience levels</option>
                </select>
                <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 size-[14px] text-slate-400 pointer-events-none" />
              </div>

              {/* Sentiment Range dropdown */}
              <div className="relative">
                <select
                  value={selectedSentiment}
                  onChange={(e) => setSelectedSentiment(e.target.value)}
                  className="appearance-none pl-3 pr-8 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111827] text-[13px] font-semibold text-slate-700 dark:text-slate-200 shadow-sm outline-none focus:border-[#059669] cursor-pointer"
                >
                  <option>All Scores</option>
                  <option>Promoters (70-100)</option>
                  <option>Passives (50-69)</option>
                  <option>Detractors (0-49)</option>
                </select>
                <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 size-[14px] text-slate-400 pointer-events-none" />
              </div>

              {/* Search Bar */}
              <div className="flex-1 min-w-[200px] relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-[16px] text-slate-400" />
                <input
                  type="text"
                  placeholder="Filter by name or topic..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111827] text-[13px] text-slate-700 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 shadow-sm outline-none focus:border-[#059669] focus:ring-1 focus:ring-[#059669]"
                />
              </div>
            </div>

            {/* Segment Pills */}
            <div className="flex gap-[8px] items-center">
              <button
                onClick={() => setActiveSegmentPill("All")}
                className={`px-3 py-1.5 rounded-full text-[12px] font-bold border transition-all cursor-pointer ${activeSegmentPill === "All"
                    ? "bg-[#e8f7f0] dark:bg-emerald-950/60 border-[#059669] dark:border-emerald-600 text-[#059669] dark:text-emerald-300"
                    : "bg-white dark:bg-[#111827] border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                  }`}
              >
                All Respondents <span className="ml-1 opacity-70">2847</span>
              </button>
              <button
                onClick={() => setActiveSegmentPill("Promoters")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-bold border transition-all cursor-pointer ${activeSegmentPill === "Promoters"
                    ? "bg-emerald-50 dark:bg-emerald-950/60 border-emerald-600 dark:border-emerald-600 text-emerald-700 dark:text-emerald-300"
                    : "bg-white dark:bg-[#111827] border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                  }`}
              >
                <span className="size-[6px] rounded-full bg-emerald-500" />
                Promoters <span className="ml-1 opacity-70">1842</span>
              </button>
              <button
                onClick={() => setActiveSegmentPill("Passives")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-bold border transition-all cursor-pointer ${activeSegmentPill === "Passives"
                    ? "bg-slate-100 dark:bg-slate-800 border-slate-400 dark:border-slate-600 text-slate-700 dark:text-slate-200"
                    : "bg-white dark:bg-[#111827] border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                  }`}
              >
                <span className="size-[6px] rounded-full bg-slate-400" />
                Passives <span className="ml-1 opacity-70">620</span>
              </button>
              <button
                onClick={() => setActiveSegmentPill("Detractors")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-bold border transition-all cursor-pointer ${activeSegmentPill === "Detractors"
                    ? "bg-rose-50 dark:bg-rose-950/60 border-rose-500 dark:border-rose-600 text-rose-700 dark:text-rose-300"
                    : "bg-white dark:bg-[#111827] border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                  }`}
              >
                <span className="size-[6px] rounded-full bg-rose-500" />
                Detractors <span className="ml-1 opacity-70">385</span>
              </button>
            </div>
          </div>

          {/* AI Identified Respondent Personas */}
          <div className="flex flex-col gap-[16px] w-full">
            <div className="flex justify-between items-center w-full">
              <div className="flex items-center gap-[8px]">
                <Sparkles className="size-[16px] text-indigo-600 dark:text-indigo-400" />
                <span className="text-[12px] font-extrabold text-[#0f172a] dark:text-white uppercase tracking-wider">
                  AI IDENTIFIED RESPONDENT PERSONAS
                </span>
                <span className="text-[11px] text-slate-400 dark:text-slate-500">
                  AI groups respondents by shared sentiment, role and themes.
                </span>
              </div>
              <button className="text-[12px] font-bold text-[#059669] dark:text-emerald-400 hover:underline flex items-center gap-1 cursor-pointer">
                View all personas <ArrowRight className="size-[12px]" />
              </button>
            </div>

            {/* Persona Cards Grid */}
            <div className="grid grid-cols-4 gap-[16px] w-full">
              {PERSONAS.map((persona, index) => (
                <div
                  key={index}
                  className="rounded-[20px] p-[16px] bg-white dark:bg-[#111827] border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between h-[200px]"
                >
                  <div className="flex flex-col gap-[10px]">
                    {/* User profile */}
                    <div className="flex gap-[10px] items-center">
                      <div className="rounded-full size-[36px] overflow-hidden border border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800">
                        <img src={persona.avatar} alt="" className="size-full object-cover" />
                      </div>
                      <div className="flex flex-col leading-none">
                        <span className="text-[13px] font-bold text-slate-800 dark:text-slate-100">
                          {persona.title}
                        </span>
                        <span className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">
                          {persona.count} respondents
                        </span>
                      </div>
                    </div>

                    {/* Badge */}
                    <span className={`px-2 py-0.5 border rounded-full text-[10px] font-bold self-start ${persona.sentimentColor} dark:bg-slate-800 dark:border-slate-700`}>
                      {persona.sentiment}
                    </span>
                  </div>

                  <div className="flex flex-col gap-[8px] border-t border-slate-50 dark:border-slate-800/80 pt-[12px]">
                    <div className="flex flex-col leading-none">
                      <span className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                        TOP ISSUE
                      </span>
                      <span className="text-[12.5px] font-bold text-slate-700 dark:text-slate-200 mt-1">
                        {persona.topIssue}
                      </span>
                    </div>

                    {/* Similarity Bar */}
                    <div className="flex items-center justify-between gap-[8px]">
                      <div className="flex-1 h-[6px] bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-emerald-500 rounded-full"
                          style={{ width: `${persona.similarity}%` }}
                        />
                      </div>
                      <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                        {persona.similarity}%
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sentiment Heatmap & Topics Row */}
          <div className="grid grid-cols-2 gap-[24px] w-full">
            {/* Sentiment Heatmap Card */}
            <div className="rounded-[24px] p-[24px] bg-white dark:bg-[#111827] border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between min-h-[300px]">
              <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-3">
                <span className="text-[12px] font-bold text-slate-800 dark:text-slate-200 tracking-wider uppercase">
                  SENTIMENT HEATMAP
                </span>
                <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
                  <Plus className="size-[16px]" />
                </button>
              </div>

              {/* Heatmap Table */}
              <div className="w-full mt-2">
                <div className="grid grid-cols-5 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider border-b border-slate-50 dark:border-slate-800 pb-2 mb-2">
                  <div className="col-span-1">Department</div>
                  <div className="text-center">Promoters</div>
                  <div className="text-center">Passives</div>
                  <div className="text-center">Detractors</div>
                  <div className="text-right">Avg Score</div>
                </div>

                <div className="flex flex-col gap-2.5">
                  {HEATMAP_DATA.map((row, i) => (
                    <div key={i} className="grid grid-cols-5 text-[12.5px] font-medium text-slate-600 dark:text-slate-300 items-center">
                      <div className="font-bold text-slate-800 dark:text-slate-200">{row.dept}</div>
                      <div className="text-center bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 py-1.5 rounded-lg border border-emerald-100/50 dark:border-emerald-900/40 font-bold mx-1">
                        {row.promoters}%
                      </div>
                      <div className="text-center bg-slate-50 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 py-1.5 rounded-lg border border-slate-100 dark:border-slate-700 font-bold mx-1">
                        {row.passives}%
                      </div>
                      <div className="text-center bg-rose-50/70 dark:bg-rose-950/50 text-rose-700 dark:text-rose-300 py-1.5 rounded-lg border border-rose-100/50 dark:border-rose-900/40 font-bold mx-1">
                        {row.detractors}%
                      </div>
                      <div className={`text-right font-extrabold ${row.avg >= 75 ? "text-emerald-600 dark:text-emerald-400" : "text-rose-500 dark:text-rose-400"}`}>
                        {row.avg}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Color Gradient Key */}
              <div className="flex items-center justify-between text-[10px] font-semibold text-slate-400 dark:text-slate-500 border-t border-slate-50 dark:border-slate-800 pt-3 mt-4">
                <span>More Positive</span>
                <div className="flex-1 mx-[12px] h-[5px] rounded-full bg-gradient-to-r from-emerald-500 via-amber-400 to-rose-500" />
                <span>More Negative</span>
              </div>
            </div>

            {/* Top Discovered Topics Card */}
            <div className="rounded-[24px] p-[24px] bg-white dark:bg-[#111827] border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between min-h-[300px]">
              <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-3">
                <span className="text-[12px] font-bold text-slate-800 dark:text-slate-200 tracking-wider uppercase">
                  TOP DISCOVERED TOPICS
                </span>
                <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
                  <Plus className="size-[16px]" />
                </button>
              </div>

              {/* Topics List */}
              <div className="flex flex-col gap-2 flex-1 justify-center py-2">
                {TOPICS_DATA.map((topic, i) => {
                  const Icon = topic.icon;
                  return (
                    <div key={i} className="flex items-center justify-between py-1.5 border-b border-slate-50 dark:border-slate-800/80 last:border-0">
                      <div className="flex items-center gap-[12px]">
                        <div className="bg-[#f8fafc] dark:bg-slate-800 text-slate-500 dark:text-slate-400 p-2.5 rounded-xl border border-slate-100 dark:border-slate-700">
                          <Icon className="size-[16px]" />
                        </div>
                        <div className="flex flex-col leading-none">
                          <span className="text-[13px] font-bold text-slate-800 dark:text-slate-200">{topic.name}</span>
                          <span className="text-[11px] text-slate-400 dark:text-slate-500 mt-1">{topic.mentions}</span>
                        </div>
                      </div>
                      <span className={`text-[12.5px] font-extrabold ${topic.isPos ? "text-emerald-600 dark:text-emerald-400" : "text-rose-500 dark:text-rose-400"}`}>
                        {topic.change}
                      </span>
                    </div>
                  );
                })}
              </div>

              <button className="text-[12px] font-bold text-[#059669] dark:text-emerald-400 hover:underline text-left self-start mt-2 cursor-pointer">
                View all topics {"->"}
              </button>
            </div>
          </div>

          {/* All Respondents Table */}
          <div className="rounded-[24px] bg-white dark:bg-[#111827] border border-slate-200/80 dark:border-slate-800 shadow-sm overflow-hidden w-full flex flex-col">
            <div className="p-[24px] border-b border-slate-100 dark:border-slate-800">
              <h2 className="text-[16px] font-bold text-slate-800 dark:text-slate-100 leading-tight">
                ALL RESPONDENTS
              </h2>
              <p className="text-[12px] text-slate-400 dark:text-slate-500 mt-1">
                Explore individual insights and sentiment drivers.
              </p>
            </div>

            {/* Table */}
            <div className="w-full overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-900/60 text-[10px] font-bold text-slate-400 dark:text-slate-400 uppercase tracking-wider border-b border-slate-100 dark:border-slate-800">
                    <th className="py-3 px-[24px]">Respondent</th>
                    <th className="py-3 px-4">Department</th>
                    <th className="py-3 px-4">Role/Level</th>
                    <th className="py-3 px-4">Last Active</th>
                    <th className="py-3 px-4">Sentiment</th>
                    <th className="py-3 px-4">Key Topics</th>
                    <th className="py-3 px-[24px] text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {filteredRespondents.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors text-[13px] text-slate-600 dark:text-slate-300 font-medium">
                      {/* Name/Avatar */}
                      <td className="py-3.5 px-[24px] flex items-center gap-[12px]">
                        <div className="rounded-full size-[32px] overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shrink-0">
                          <img src={item.avatar} alt="" className="size-full object-cover" />
                        </div>
                        <div className="flex flex-col leading-none">
                          <span className="font-bold text-slate-800 dark:text-slate-100">{item.name}</span>
                          <span className="text-[10px] text-slate-400 dark:text-slate-500 mt-1">{item.role}</span>
                        </div>
                      </td>

                      {/* Department */}
                      <td className="py-3.5 px-4 text-slate-700 dark:text-slate-200 font-semibold">{item.department}</td>

                      {/* Role/Level */}
                      <td className="py-3.5 px-4">
                        <span className="px-[8px] py-[3px] rounded-lg text-[11px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                          {item.experience}
                        </span>
                      </td>

                      {/* Last Active */}
                      <td className="py-3.5 px-4 text-slate-400 dark:text-slate-500">{item.lastActive}</td>

                      {/* Sentiment score */}
                      <td className="py-3.5 px-4">
                        <span className={`text-[14px] font-extrabold ${item.sentiment >= 70
                            ? "text-emerald-600 dark:text-emerald-400"
                            : item.sentiment >= 50
                              ? "text-amber-500 dark:text-amber-400"
                              : "text-rose-500 dark:text-rose-400"
                          }`}>
                          {item.sentiment}
                        </span>
                        <span className="text-[10px] text-slate-400 dark:text-slate-500 block mt-0.5">
                          {item.sentiment >= 70 ? "Promoter" : item.sentiment >= 50 ? "Passive" : "Detractor"}
                        </span>
                      </td>

                      {/* Key Topics */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-[6px] text-slate-400 dark:text-slate-500">
                          <Calendar className="size-[14px]" />
                          <MessageSquare className="size-[14px]" />
                          <Heart className="size-[14px]" />
                          <span className="text-[11px] font-bold text-slate-300 dark:text-slate-600 ml-1">+2</span>
                        </div>
                      </td>

                      {/* Action */}
                      <td className="py-3.5 px-[24px] text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => handleOpenScheduler(item)}
                            className="px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 border border-emerald-200 dark:border-emerald-800 text-[#059669] dark:text-emerald-400 font-bold text-[11px] flex items-center gap-1.5 transition-all cursor-pointer shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                          >
                            <Calendar className="size-3.5" />
                            <span>Schedule Call</span>
                          </button>
                          <button
                            type="button"
                            className="px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all font-bold text-[11px] text-slate-600 dark:text-slate-300 cursor-pointer shadow-xs"
                          >
                            Profile
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredRespondents.length === 0 && (
                    <tr>
                      <td colSpan={7} className="py-8 text-center text-slate-400 dark:text-slate-500 font-semibold">
                        No respondents match the selected filter criteria.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Footer */}
            <div className="flex justify-between items-center py-4 px-[24px] border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40">
              <span className="text-[11.5px] font-semibold text-slate-400 dark:text-slate-500">
                Showing 1-{filteredRespondents.length} of 2,847
              </span>

              <div className="flex items-center gap-[4px]">
                <button className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-400 cursor-pointer">
                  <ChevronLeft className="size-[14px]" />
                </button>
                <button className="size-[28px] rounded-lg text-[11.5px] font-bold bg-[#e8f7f0] dark:bg-emerald-950/60 border border-[#059669] dark:border-emerald-600 text-[#059669] dark:text-emerald-300 flex items-center justify-center cursor-pointer">
                  1
                </button>
                <button className="size-[28px] rounded-lg text-[11.5px] font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center cursor-pointer">
                  2
                </button>
                <button className="size-[28px] rounded-lg text-[11.5px] font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center cursor-pointer">
                  3
                </button>
                <span className="text-[11px] font-bold text-slate-300 dark:text-slate-600 px-1">...</span>
                <button className="size-[28px] rounded-lg text-[11.5px] font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center cursor-pointer">
                  475
                </button>
                <button className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-400 cursor-pointer">
                  <ChevronRight className="size-[14px]" />
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Right Sidebar */}
        <div className="w-[340px] shrink-0 flex flex-col gap-[24px] sticky top-0">
          {/* Research Assistant Card */}
          <div className="rounded-[24px] p-[24px] bg-white dark:bg-[#111827] border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col gap-[20px]">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-[6px]">
                <Sparkles className="size-[16px] text-emerald-600 dark:text-emerald-400" />
                <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 tracking-wider uppercase">
                  RESEARCH ASSISTANT
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="size-[6px] rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 tracking-wide uppercase">AI Active</span>
              </div>
            </div>

            {/* AI Summary Block */}
            <div className="flex flex-col gap-[8px]">
              <div className="flex gap-[6px] items-center text-[11.5px] font-bold text-slate-800 dark:text-slate-200">
                <Sparkles className="size-[14px] text-indigo-500" />
                <span>AI SUMMARY</span>
              </div>
              <p className="text-[12.5px] text-slate-500 dark:text-slate-400 leading-relaxed">
                Scheduling is the top driver of frustration across Engineering and Operations teams. Communication gaps remain a close second, especially among Managers. Travel & Reimbursement concerns are rising in Sales and Operations.
              </p>
              <button className="text-[12px] font-bold text-[#059669] dark:text-emerald-400 hover:underline text-left mt-1 cursor-pointer flex items-center gap-1">
                View full summary <ArrowRight className="size-[12px]" />
              </button>
            </div>

            {/* Donut Chart section */}
            <div className="border-t border-slate-50 dark:border-slate-800 pt-[16px] flex flex-col gap-[12px]">
              <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 tracking-wider uppercase">
                SENTIMENT DISTRIBUTION
              </span>

              <div className="flex items-center gap-[16px]">
                {/* Donut graphic */}
                <div className="size-[96px] relative shrink-0">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={28}
                        outerRadius={40}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  {/* Center Text */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center leading-none text-center">
                    <span className="text-[13px] font-extrabold text-slate-800 dark:text-slate-100">76%</span>
                    <span className="text-[8px] text-slate-400 dark:text-slate-500 font-semibold mt-0.5">Positive</span>
                  </div>
                </div>

                {/* Legend list */}
                <div className="flex-1 flex flex-col gap-1.5 text-[12px] font-medium text-slate-600 dark:text-slate-300">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="size-[7px] rounded-full bg-[#10b981]" />
                      <span>Promoters</span>
                    </div>
                    <span className="font-bold text-slate-800 dark:text-slate-100">64.7%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="size-[7px] rounded-full bg-[#94a3b8]" />
                      <span>Passives</span>
                    </div>
                    <span className="font-bold text-slate-800 dark:text-slate-100">21.8%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="size-[7px] rounded-full bg-[#ef4444]" />
                      <span>Detractors</span>
                    </div>
                    <span className="font-bold text-slate-800 dark:text-slate-100">13.5%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Recommended Actions */}
            <div className="border-t border-slate-50 dark:border-slate-800 pt-[16px] flex flex-col gap-[12px]">
              <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 tracking-wider uppercase">
                RECOMMENDED ACTIONS
              </span>
              <div className="flex flex-col gap-[8px]">
                <button
                  type="button"
                  onClick={() => handleAskAssistant("Show issues for Engineering detractors")}
                  className="w-full text-left p-3 rounded-xl border border-slate-100 dark:border-slate-800 bg-[#f8fafc] dark:bg-slate-800/60 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex justify-between items-center text-[12.5px] font-semibold text-slate-700 dark:text-slate-200 shadow-sm cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <User className="size-[14px] text-indigo-500" />
                    <span>Interview 42 detractors in Engineering</span>
                  </div>
                  <ChevronRight className="size-[14px] text-slate-400 shrink-0" />
                </button>

                <button
                  type="button"
                  onClick={() => handleAskAssistant("Who are the 34 queued respondents?")}
                  className="w-full text-left p-3 rounded-xl border border-slate-100 dark:border-slate-800 bg-[#f8fafc] dark:bg-slate-800/60 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex justify-between items-center text-[12.5px] font-semibold text-slate-700 dark:text-slate-200 shadow-sm cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <MessageSquare className="size-[14px] text-emerald-500" />
                    <span>Follow up with 34 queued respondents</span>
                  </div>
                  <ChevronRight className="size-[14px] text-slate-400 shrink-0" />
                </button>

                <button
                  type="button"
                  onClick={() => handleAskAssistant("Deep dive scheduling concerns")}
                  className="w-full text-left p-3 rounded-xl border border-slate-100 dark:border-slate-800 bg-[#f8fafc] dark:bg-slate-800/60 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex justify-between items-center text-[12.5px] font-semibold text-slate-700 dark:text-slate-200 shadow-sm cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <Zap className="size-[14px] text-amber-500" />
                    <span>Deep dive into scheduling issues</span>
                  </div>
                  <ChevronRight className="size-[14px] text-slate-400 shrink-0" />
                </button>
              </div>
              <button className="text-[12px] font-bold text-[#059669] dark:text-emerald-400 hover:underline text-left cursor-pointer flex items-center gap-1">
                View all actions <ArrowRight className="size-[12px]" />
              </button>
            </div>

            {/* Ask Assistant Chat Box */}
            <div className="border-t border-slate-100 dark:border-slate-800 pt-[16px] flex flex-col gap-[12px]">
              <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 tracking-wider uppercase">
                ASK ASSISTANT
              </span>
              <span className="text-[12px] text-slate-500 dark:text-slate-400 font-semibold leading-none">
                What would you like to know?
              </span>

              {/* Chat Messages */}
              <div className="h-[120px] overflow-y-auto rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800 p-2.5 flex flex-col gap-2">
                {chatMessages.map((msg, i) => (
                  <div
                    key={i}
                    className={`max-w-[85%] rounded-xl px-2.5 py-1.5 text-[11px] leading-relaxed ${msg.sender === "user"
                        ? "bg-[#e8f7f0] dark:bg-emerald-950/60 text-[#059669] dark:text-emerald-300 self-end font-semibold"
                        : "bg-white dark:bg-[#111827] text-slate-600 dark:text-slate-200 border border-slate-100 dark:border-slate-800 self-start font-medium"
                      }`}
                  >
                    {msg.text}
                  </div>
                ))}
              </div>

              {/* Suggested Questions */}
              <div className="flex flex-col gap-[6px]">
                <button
                  type="button"
                  onClick={() => handleAskAssistant("Who are the most frustrated respondents?")}
                  className="w-full text-left px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/70 hover:bg-[#e8f7f0] dark:hover:bg-emerald-950/50 hover:border-[#059669] dark:hover:border-emerald-600 hover:text-[#059669] dark:hover:text-emerald-300 transition-all text-[11px] font-semibold text-slate-600 dark:text-slate-300 cursor-pointer"
                >
                  Who are the most frustrated respondents?
                </button>
                <button
                  type="button"
                  onClick={() => handleAskAssistant("Compare sentiment across departments")}
                  className="w-full text-left px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/70 hover:bg-[#e8f7f0] dark:hover:bg-emerald-950/50 hover:border-[#059669] dark:hover:border-emerald-600 hover:text-[#059669] dark:hover:text-emerald-300 transition-all text-[11px] font-semibold text-slate-600 dark:text-slate-300 cursor-pointer"
                >
                  Compare sentiment across departments
                </button>
                <button
                  type="button"
                  onClick={() => handleAskAssistant("Show top issues for Engineering team")}
                  className="w-full text-left px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/70 hover:bg-[#e8f7f0] dark:hover:bg-emerald-950/50 hover:border-[#059669] dark:hover:border-emerald-600 hover:text-[#059669] dark:hover:text-emerald-300 transition-all text-[11px] font-semibold text-slate-600 dark:text-slate-300 cursor-pointer"
                >
                  Show top issues for Engineering team
                </button>
              </div>

              {/* Chat Input */}
              <form onSubmit={handleSendChat} className="relative flex items-center mt-1">
                <input
                  type="text"
                  placeholder="Ask a question..."
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  className="w-full pl-3 pr-9 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 text-[12px] text-slate-700 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 outline-none focus:border-[#059669] dark:focus:border-emerald-500"
                />
                <button type="submit" className="absolute right-2 text-slate-400 dark:text-slate-500 hover:text-[#059669] dark:hover:text-emerald-400 cursor-pointer">
                  <Send className="size-[14px]" />
                </button>
              </form>
            </div>

          </div>
        </div>

      </div>

      {/* Timezone-Aware Interview Scheduler Modal */}
      <ScheduleInterviewModal
        open={showScheduler}
        onOpenChange={setShowScheduler}
        target={bookingTarget}
      />
    </div>
  );
}
