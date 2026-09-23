import React, { useState } from "react";
import {
  Bookmark,
  ChevronDown,
  Cpu,
  Megaphone,
  Sparkles,
  GitBranch,
  Users,
  Compass,
  ArrowRight,
  HelpCircle,
  TrendingUp,
  Clock,
  Send,
  Plus,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
  MessageSquare,
  FileText,
  AlertOctagon,
  Settings
} from "lucide-react";

// Types
interface SegmentData {
  name: string;
  respondents: number;
  avgSatisfaction: number;
  satisfactionLabel: string;
  nps: number;
  concern: string;
  sentiment: { neg: number; neu: number; pos: number };
  transcripts: { text: string; author: string }[];
  recommendations: { icon: "calendar" | "search" | "bell" | "file"; title: string; desc: string; priority: "CRITICAL" | "MEDIUM" | "EFFICIENT" }[];
}

export default function Segments() {
  // State for active segment filters
  const [activeFilterTab, setActiveFilterTab] = useState("Department");
  const [segment1, setSegment1] = useState("Engineering");
  const [segment2, setSegment2] = useState("Marketing");

  // Interactive states
  const [bookmarked1, setBookmarked1] = useState(false);
  const [bookmarked2, setBookmarked2] = useState(false);

  // Research Assistant checkbox state
  const [actionsChecked, setActionsChecked] = useState([false, false]);

  // Ask Assistant chat state
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState<string[]>([]);

  // Sample data to make page dynamic depending on selected segments
  const segmentDataMap: Record<string, SegmentData> = {
    Engineering: {
      name: "Engineering Segment",
      respondents: 847,
      avgSatisfaction: 3.1,
      satisfactionLabel: "Below Average",
      nps: -12,
      concern: "Scheduling",
      sentiment: { neg: 70, neu: 20, pos: 10 },
      transcripts: [
        {
          text: "The core working hours feel like an archaic way of measuring technical contribution. My best work happens late at night.",
          author: "Senior Backend Engineer, 8 Yrs"
        },
        {
          text: "Too many manual approvals slow everything down. We lose momentum constantly.",
          author: "DevOps Engineer, 4 Yrs"
        }
      ],
      recommendations: [
        {
          icon: "calendar",
          title: "Introduce Async-First Work Week",
          desc: "Reduce context switching and improve deep work outcomes.",
          priority: "CRITICAL"
        },
        {
          icon: "search",
          title: "Audit Overlap Meeting Loads",
          desc: "Identify redundant syncs and reduce by 30%.",
          priority: "MEDIUM"
        }
      ]
    },
    Marketing: {
      name: "Marketing Segment",
      respondents: 312,
      avgSatisfaction: 4.4,
      satisfactionLabel: "Highly Satisfied",
      nps: 62,
      concern: "Communication",
      sentiment: { neg: 10, neu: 25, pos: 65 },
      transcripts: [
        {
          text: "I have complete freedom on how I organize my campaigns. As long as the results are there, no one micro-manages.",
          author: "Brand Specialist, 2 Yrs"
        },
        {
          text: "Our open Slack culture is amazing, I can reach anyone and get answers instantly.",
          author: "Growth Coordinator, 1 Yr"
        }
      ],
      recommendations: [
        {
          icon: "bell",
          title: "Standardize Slack Quiet Hours",
          desc: "Reduce notification fatigue and ensure focus.",
          priority: "CRITICAL"
        },
        {
          icon: "file",
          title: "Document Autonomy Best Practices",
          desc: "Codify what \"freedom with alignment\" looks like.",
          priority: "EFFICIENT"
        }
      ]
    },
    Sales: {
      name: "Sales Segment",
      respondents: 245,
      avgSatisfaction: 3.8,
      satisfactionLabel: "Average",
      nps: 22,
      concern: "Quota Pressures",
      sentiment: { neg: 35, neu: 30, pos: 35 },
      transcripts: [
        {
          text: "CRM logging requirements take up almost 2 hours of my day. I'd rather be on calls.",
          author: "Account Executive, 3 Yrs"
        },
        {
          text: "Commission structures change quarterly, creating high stress and lack of trust.",
          author: "Sales Manager, 5 Yrs"
        }
      ],
      recommendations: [
        {
          icon: "file",
          title: "Simplify CRM Data Entry",
          desc: "Automate task logging with AI integrations.",
          priority: "MEDIUM"
        },
        {
          icon: "bell",
          title: "Establish Stable Commission Cycles",
          desc: "Commit to half-year targets to build confidence.",
          priority: "CRITICAL"
        }
      ]
    },
    Support: {
      name: "Support Segment",
      respondents: 178,
      avgSatisfaction: 2.9,
      satisfactionLabel: "Below Average",
      nps: -24,
      concern: "Ticket Overload",
      sentiment: { neg: 75, neu: 15, pos: 10 },
      transcripts: [
        {
          text: "Customers expect immediate responses on chat, but we don't have enough coverage on weekends.",
          author: "Support Representative, 1 Yr"
        },
        {
          text: "We lack direct documentation access to common product bugs, leading to slow routing.",
          author: "Tier 2 Support Lead, 3 Yrs"
        }
      ],
      recommendations: [
        {
          icon: "calendar",
          title: "Weekend Rotation Support Staff",
          desc: "Introduce compensation packages for weekend shifts.",
          priority: "CRITICAL"
        },
        {
          icon: "search",
          title: "Centralize Bug KB Access",
          desc: "Ensure seamless engineering updates sync directly.",
          priority: "EFFICIENT"
        }
      ]
    }
  };

  // Get active data based on dropdown selection
  const data1 = segmentDataMap[segment1] || segmentDataMap["Engineering"];
  const data2 = segmentDataMap[segment2] || segmentDataMap["Marketing"];

  // Dropdown list
  const availableSegments = ["Engineering", "Marketing", "Sales", "Support"];

  const handleSendChat = () => {
    if (!chatInput.trim()) return;
    setChatMessages((prev) => [...prev, chatInput]);
    const responseText = chatInput.toLowerCase().includes("schedule")
      ? "Scheduling conflicts represent 34% of dissatisfied reports. We recommend trying out the Async-First Work Week."
      : "Comparing these cohorts indicates a high correlation between operational autonomy and a high Net Promoter Score.";
    setTimeout(() => {
      setChatMessages((prev) => [...prev, `AI Assistant: ${responseText}`]);
    }, 800);
    setChatInput("");
  };

  // SVG drawing logic for Sentiment Donuts
  const getDonutSegments = (neg: number, neu: number, pos: number) => {
    const total = neg + neu + pos;
    const r = 40;
    const circ = 2 * Math.PI * r;

    // Offset calculations
    const dashNeg = (neg / total) * circ;
    const dashNeu = (neu / total) * circ;
    const dashPos = (pos / total) * circ;

    return {
      circ,
      dashNeg,
      dashNeu,
      dashPos
    };
  };

  const donut1 = getDonutSegments(data1.sentiment.neg, data1.sentiment.neu, data1.sentiment.pos);
  const donut2 = getDonutSegments(data2.sentiment.neg, data2.sentiment.neu, data2.sentiment.pos);

  return (
    <div className="w-full flex flex-row gap-[24px] h-[calc(100vh-120px)] overflow-hidden text-slate-800 px-[32px] py-[8px] max-w-[1440px] mx-auto">
      {/* Left Scrollable Area (Main content) */}
      <div className="flex-1 h-full overflow-y-auto pr-[16px] flex flex-col gap-[24px] pb-32">

        {/* Section Header */}
        <div className="flex items-center justify-between w-full">
          <div className="flex flex-col gap-[6px] items-start">
            <h1 className="font-['Inter',sans-serif] font-bold text-[#0f172a] dark:text-slate-100 text-[32px] leading-tight">
              Segment Analysis
            </h1>
            <p className="font-['Inter',sans-serif] font-medium text-slate-500 dark:text-slate-400 text-[14px]">
              Compare respondent cross-sections side-by-side with statistical significance overlays.
            </p>
          </div>

          <div className="flex flex-col items-end gap-[4px]">
            <span className="font-['Inter',sans-serif] font-semibold text-slate-400 text-[11px] uppercase tracking-wider">
              Research Dossier
            </span>
            <div className="flex items-center gap-[6px] text-slate-500 dark:text-slate-400 text-[12px] font-medium">
              <Clock className="size-[14px] text-slate-400" />
              <span>Updated 12 mins ago</span>
              <span className="text-emerald-500">●</span>
            </div>
          </div>
        </div>

        {/* Segment Selector & Filter Tab Bar */}
        <div className="flex flex-col md:flex-col justify-between gap-[16px] w-full bg-white dark:bg-[#111827] p-[16px] rounded-[20px] border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <div className="flex flex-wrap items-center gap-[12px]">
            {/* Segment Dropdown 1 */}
            <div className="relative">
              <select
                value={segment1}
                onChange={(e) => setSegment1(e.target.value)}
                className="appearance-none font-semibold text-[#0f172a] dark:text-slate-200 text-[15px] bg-[#f4f7f6] dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-[12px] py-[8px] pl-[36px] pr-[32px] cursor-pointer focus:outline-none transition-colors"
              >
                {availableSegments.map((seg) => (
                  <option key={seg} value={seg} className="bg-white dark:bg-slate-900">{seg}</option>
                ))}
              </select>
              <div className="absolute left-[12px] top-1/2 -translate-y-1/2 text-emerald-600 dark:text-emerald-400">
                <GitBranch className="size-[16px]" />
              </div>
              <div className="absolute right-[12px] top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                <ChevronDown className="size-[16px]" />
              </div>
            </div>

            <span className="text-slate-400 font-semibold text-[13px]">VS</span>

            {/* Segment Dropdown 2 */}
            <div className="relative">
              <select
                value={segment2}
                onChange={(e) => setSegment2(e.target.value)}
                className="appearance-none font-semibold text-[#0f172a] dark:text-slate-200 text-[15px] bg-[#f4f7f6] dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-[12px] py-[8px] pl-[36px] pr-[32px] cursor-pointer focus:outline-none transition-colors"
              >
                {availableSegments.map((seg) => (
                  <option key={seg} value={seg} className="bg-white dark:bg-slate-900">{seg}</option>
                ))}
              </select>
              <div className="absolute left-[12px] top-1/2 -translate-y-1/2 text-indigo-600 dark:text-indigo-400">
                <Compass className="size-[16px]" />
              </div>
              <div className="absolute right-[12px] top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                <ChevronDown className="size-[16px]" />
              </div>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center gap-[8px]">
            {["Experience", "Location", "Role", "Age", "Gender", "Department"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveFilterTab(tab)}
                className={`px-[12px] py-[6px] rounded-[10px] text-[13px] font-semibold transition-all cursor-pointer ${activeFilterTab === tab
                  ? "bg-[#0f172a] dark:bg-emerald-600 text-white"
                  : "bg-[#f4f7f6] dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-[#e8ecea] dark:hover:bg-slate-700"
                  }`}
              >
                {tab}
              </button>
            ))}

            <button className="flex items-center gap-[6px] border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 px-[12px] py-[6px] rounded-[10px] text-[13px] font-semibold transition-all">
              <SlidersHorizontal className="size-[13px]" />
              <span>More Filters</span>
            </button>
          </div>
        </div>

        {/* Segment Summary Side-by-Side Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px] w-full">
          {/* Segment Card 1 */}
          <div className="bg-white dark:bg-[#111827] rounded-[24px] border border-slate-200/80 dark:border-slate-800 shadow-sm p-[24px] relative flex justify-between items-start">
            <div className="flex flex-col gap-[14px]">
              <div className="flex items-center gap-[8px]">
                <h3 className="font-bold text-[#0f172a] dark:text-slate-100 text-[18px]">{data1.name}</h3>
                <button
                  onClick={() => setBookmarked1(!bookmarked1)}
                  className="text-slate-400 hover:text-slate-600 transition-colors"
                >
                  <Bookmark className={`size-[18px] ${bookmarked1 ? "fill-emerald-600 text-emerald-600" : ""}`} />
                </button>
              </div>

              <div className="flex flex-col gap-[4px]">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Total Respondents</span>
                <span className="text-[32px] font-extrabold text-[#0f172a] dark:text-slate-100 leading-none">{data1.respondents}</span>
              </div>

              <div className="flex flex-col gap-[4px]">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Average Satisfaction</span>
                <div className="flex items-baseline gap-[8px]">
                  <span className="text-[24px] font-extrabold text-[#0f172a] dark:text-slate-100 leading-none">{data1.avgSatisfaction} / 5.0</span>
                  <span className={`px-[8px] py-[2.5px] rounded-full text-[11px] font-bold ${data1.avgSatisfaction >= 4 ? "bg-[#dcfce7] dark:bg-emerald-950/60 text-[#15803d] dark:text-emerald-400" : "bg-[#fee2e2] dark:bg-rose-950/60 text-[#ef4444] dark:text-rose-400"
                    }`}>
                    {data1.satisfactionLabel}
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-[4px]">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Net Promoter Score (NPS)</span>
                <span className={`text-[32px] font-extrabold leading-none ${data1.nps >= 0 ? "text-[#10b981]" : "text-[#f43f5e]"}`}>
                  {data1.nps >= 0 ? `+${data1.nps}` : data1.nps}
                </span>
              </div>

              <div className="flex flex-col gap-[4px]">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Primary Internal Concern</span>
                <span className="text-[20px] font-extrabold text-[#0f172a] dark:text-slate-100">{data1.concern}</span>
              </div>
            </div>
          </div>

          {/* Segment Card 2 */}
          <div className="bg-white dark:bg-[#111827] rounded-[24px] border border-slate-200/80 dark:border-slate-800 shadow-sm p-[24px] relative flex justify-between items-start">
            <div className="flex flex-col gap-[14px]">
              <div className="flex items-center gap-[8px]">
                <h3 className="font-bold text-[#0f172a] dark:text-slate-100 text-[18px]">{data2.name}</h3>
                <button
                  onClick={() => setBookmarked2(!bookmarked2)}
                  className="text-slate-400 hover:text-slate-600 transition-colors"
                >
                  <Bookmark className={`size-[18px] ${bookmarked2 ? "fill-indigo-600 text-indigo-600" : ""}`} />
                </button>
              </div>

              <div className="flex flex-col gap-[4px]">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Total Respondents</span>
                <span className="text-[32px] font-extrabold text-[#0f172a] dark:text-slate-100 leading-none">{data2.respondents}</span>
              </div>

              <div className="flex flex-col gap-[4px]">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Average Satisfaction</span>
                <div className="flex items-baseline gap-[8px]">
                  <span className="text-[24px] font-extrabold text-[#0f172a] dark:text-slate-100 leading-none">{data2.avgSatisfaction} / 5.0</span>
                  <span className={`px-[8px] py-[2.5px] rounded-full text-[11px] font-bold ${data2.avgSatisfaction >= 4 ? "bg-[#dcfce7] dark:bg-emerald-950/60 text-[#15803d] dark:text-emerald-400" : "bg-[#fee2e2] dark:bg-rose-950/60 text-[#ef4444] dark:text-rose-400"
                    }`}>
                    {data2.satisfactionLabel}
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-[4px]">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Net Promoter Score (NPS)</span>
                <span className={`text-[32px] font-extrabold leading-none ${data2.nps >= 0 ? "text-[#10b981]" : "text-[#f43f5e]"}`}>
                  {data2.nps >= 0 ? `+${data2.nps}` : data2.nps}
                </span>
              </div>

              <div className="flex flex-col gap-[4px]">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Primary Internal Concern</span>
                <span className="text-[20px] font-extrabold text-[#0f172a] dark:text-slate-100">{data2.concern}</span>
              </div>
            </div>
          </div>
        </div>

        {/* AI Comparative Syntheses Alert Block */}
        <div className="bg-[#faf5ff] dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800/40 rounded-[20px] p-[20px] relative flex flex-col gap-[12px] shadow-sm">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-[10px]">
              <div className="bg-purple-100 dark:bg-purple-900/60 text-purple-700 dark:text-purple-300 p-[8px] rounded-[10px]">
                <Sparkles className="size-[16px]" />
              </div>
              <h4 className="font-bold text-purple-950 dark:text-purple-200 text-[15px]">AI Comparative Syntheses</h4>
            </div>
            <span className="text-rose-600 dark:text-rose-400 text-[12px] font-bold tracking-wide">p-value &lt; 0.001</span>
          </div>

          <p className="text-[#3b2d54] dark:text-purple-300 text-[14px] leading-relaxed">
            A significant {(Math.abs(data1.avgSatisfaction - data2.avgSatisfaction)).toFixed(1)}-point satisfaction gap exists between {segment1} and {segment2}. NLP analysis of open-ended responses reveals this delta is primarily driven by <strong className="text-purple-950 dark:text-purple-100">Scheduling Flexibility (34% higher concern in {segment1})</strong> versus <strong className="text-purple-950 dark:text-purple-100">Communication Channels (58% higher concern in {segment2})</strong>. The difference is statistically robust and suggests systemic operational friction in technical pipelines.
          </p>

          <div className="flex justify-end mt-[4px]">
            <button className="flex items-center gap-[6px] text-purple-700 dark:text-purple-300 font-bold text-[12px] hover:text-purple-900 dark:hover:text-purple-200 transition-colors">
              <span>View full AI summary</span>
              <ArrowRight className="size-[14px]" />
            </button>
          </div>
        </div>

        {/* Theme Dominance Comparison */}
        <div className="bg-white dark:bg-[#111827] rounded-[24px] border border-slate-200/80 dark:border-slate-800 shadow-sm p-[24px] flex flex-col gap-[16px]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-[8px]">
              <h3 className="font-bold text-[#0f172a] dark:text-slate-100 text-[18px]">Theme Dominance Comparison</h3>
              <HelpCircle className="size-[16px] text-slate-400 cursor-pointer" />
            </div>
            <div className="flex items-center gap-[16px] text-[12px] font-semibold text-slate-600 dark:text-slate-300">
              <div className="flex items-center gap-[6px]">
                <span className="size-[8px] rounded-full bg-emerald-500"></span>
                <span>{segment1}</span>
              </div>
              <div className="flex items-center gap-[6px]">
                <span className="size-[8px] rounded-full bg-indigo-500"></span>
                <span>{segment2}</span>
              </div>
            </div>
          </div>

          {/* Comparison Rows */}
          <div className="flex flex-col gap-[14px] mt-[6px]">
            {/* Row 1 */}
            <div className="flex items-center gap-[12px] text-[13px] font-medium text-slate-700 dark:text-slate-300">
              <div className="w-[180px] shrink-0 font-semibold text-[#0f172a] dark:text-slate-100">Scheduling & Clocking</div>
              <div className="w-[160px] shrink-0">
                <span className="bg-red-50 dark:bg-rose-950/50 text-red-600 dark:text-rose-400 px-[8px] py-[2.5px] rounded-full text-[10px] font-bold">SIGNIFICANT DIFFERENCE</span>
              </div>
              <div className="w-[36px] text-right font-bold text-emerald-600 dark:text-emerald-400">73%</div>
              <div className="flex-1 h-[8px] rounded-full bg-slate-100 dark:bg-slate-800 relative overflow-hidden">
                <div className="absolute left-0 top-0 h-full bg-emerald-500 rounded-l-full transition-all" style={{ width: "73%" }}></div>
                <div className="absolute right-0 top-0 h-full bg-indigo-500 rounded-r-full transition-all" style={{ width: "22%" }}></div>
              </div>
              <div className="w-[36px] text-left font-bold text-indigo-600 dark:text-indigo-400 ml-[6px]">22%</div>
            </div>

            {/* Row 2 */}
            <div className="flex items-center gap-[12px] text-[13px] font-medium text-slate-700 dark:text-slate-300">
              <div className="w-[180px] shrink-0 font-semibold text-[#0f172a] dark:text-slate-100">Communication Barriers</div>
              <div className="w-[160px] shrink-0">
                <span className="bg-red-50 dark:bg-rose-950/50 text-red-600 dark:text-rose-400 px-[8px] py-[2.5px] rounded-full text-[10px] font-bold">SIGNIFICANT DIFFERENCE</span>
              </div>
              <div className="w-[36px] text-right font-bold text-emerald-600 dark:text-emerald-400">30%</div>
              <div className="flex-1 h-[8px] rounded-full bg-slate-100 dark:bg-slate-800 relative overflow-hidden">
                <div className="absolute left-0 top-0 h-full bg-emerald-500 rounded-l-full transition-all" style={{ width: "30%" }}></div>
                <div className="absolute right-0 top-0 h-full bg-indigo-500 rounded-r-full transition-all" style={{ width: "42%" }}></div>
              </div>
              <div className="w-[36px] text-left font-bold text-indigo-600 dark:text-indigo-400 ml-[6px]">42%</div>
            </div>

            {/* Row 3 */}
            <div className="flex items-center gap-[12px] text-[13px] font-medium text-slate-700 dark:text-slate-300">
              <div className="w-[180px] shrink-0 font-semibold text-[#0f172a] dark:text-slate-100">Equipment & Workspace</div>
              <div className="w-[160px] shrink-0">
                <span className="bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 px-[8px] py-[2.5px] rounded-full text-[10px] font-bold">MODERATE DIFFERENCE</span>
              </div>
              <div className="w-[36px] text-right font-bold text-emerald-600 dark:text-emerald-400">48%</div>
              <div className="flex-1 h-[8px] rounded-full bg-slate-100 dark:bg-slate-800 relative overflow-hidden">
                <div className="absolute left-0 top-0 h-full bg-emerald-500 rounded-l-full transition-all" style={{ width: "48%" }}></div>
                <div className="absolute right-0 top-0 h-full bg-indigo-500 rounded-r-full transition-all" style={{ width: "32%" }}></div>
              </div>
              <div className="w-[36px] text-left font-bold text-indigo-600 dark:text-indigo-400 ml-[6px]">32%</div>
            </div>

            {/* Row 4 */}
            <div className="flex items-center gap-[12px] text-[13px] font-medium text-slate-700 dark:text-slate-300">
              <div className="w-[180px] shrink-0 font-semibold text-[#0f172a] dark:text-slate-100">Travel & Commuting</div>
              <div className="w-[160px] shrink-0">
                <span className="bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 px-[8px] py-[2.5px] rounded-full text-[10px] font-bold">MODERATE DIFFERENCE</span>
              </div>
              <div className="w-[36px] text-right font-bold text-emerald-600 dark:text-emerald-400">43%</div>
              <div className="flex-1 h-[8px] rounded-full bg-slate-100 dark:bg-slate-800 relative overflow-hidden">
                <div className="absolute left-0 top-0 h-full bg-emerald-500 rounded-l-full transition-all" style={{ width: "43%" }}></div>
                <div className="absolute right-0 top-0 h-full bg-indigo-500 rounded-r-full transition-all" style={{ width: "58%" }}></div>
              </div>
              <div className="w-[36px] text-left font-bold text-indigo-600 dark:text-indigo-400 ml-[6px]">58%</div>
            </div>

            {/* Row 5 */}
            <div className="flex items-center gap-[12px] text-[13px] font-medium text-slate-700 dark:text-slate-300">
              <div className="w-[180px] shrink-0 font-semibold text-[#0f172a] dark:text-slate-100">Payment & Compensations</div>
              <div className="w-[160px] shrink-0">
                <span className="bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 px-[8px] py-[2.5px] rounded-full text-[10px] font-bold">MODERATE DIFFERENCE</span>
              </div>
              <div className="w-[36px] text-right font-bold text-emerald-600 dark:text-emerald-400">48%</div>
              <div className="flex-1 h-[8px] rounded-full bg-slate-100 dark:bg-slate-800 relative overflow-hidden">
                <div className="absolute left-0 top-0 h-full bg-emerald-500 rounded-l-full transition-all" style={{ width: "48%" }}></div>
                <div className="absolute right-0 top-0 h-full bg-indigo-500 rounded-r-full transition-all" style={{ width: "52%" }}></div>
              </div>
              <div className="w-[36px] text-left font-bold text-indigo-600 dark:text-indigo-400 ml-[6px]">52%</div>
            </div>
          </div>

          {/* Note Panel */}
          <div className="bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 rounded-[12px] p-[12px] text-[12px] text-slate-500 dark:text-slate-300 leading-relaxed mt-[6px]">
            <strong>AI INTERPRETATION:</strong> Engineering sentiment is heavily impacted by scheduling rigidity and tool limitations, while Marketing sentiment is driven by communication silos and cross-functional misalignment.
          </div>
        </div>

        {/* Sentiment Distribution */}
        <div className="bg-white dark:bg-[#111827] rounded-[24px] border border-slate-200/80 dark:border-slate-800 shadow-sm p-[24px] flex flex-col gap-[20px]">
          <div className="flex items-center gap-[8px]">
            <h3 className="font-bold text-[#0f172a] dark:text-slate-100 text-[18px]">Sentiment Distribution</h3>
            <HelpCircle className="size-[16px] text-slate-400 cursor-pointer" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px] items-center justify-center">
            {/* Donut Chart Segment 1 */}
            <div className="flex flex-col items-center justify-center p-[16px] border border-slate-100 dark:border-slate-800 rounded-[16px]">
              <span className="text-[13px] font-semibold text-slate-500 dark:text-slate-400 mb-[16px]">{segment1} Sentiment</span>

              {/* SVG Donut */}
              <div className="relative size-[160px] flex items-center justify-center">
                <svg className="size-full transform -rotate-90" viewBox="0 0 36 36">
                  <circle cx="18" cy="18" r="15.915" fill="transparent" stroke="#f1f5f9" className="stroke-slate-100 dark:stroke-slate-800" strokeWidth="4.5" />
                  {/* Positive sector */}
                  <circle
                    cx="18"
                    cy="18"
                    r="15.915"
                    fill="transparent"
                    stroke="#10b981"
                    strokeWidth="4.5"
                    strokeDasharray={`${data1.sentiment.pos} 100`}
                    strokeDashoffset={0}
                  />
                  {/* Neutral sector */}
                  <circle
                    cx="18"
                    cy="18"
                    r="15.915"
                    fill="transparent"
                    stroke="#94a3b8"
                    strokeWidth="4.5"
                    strokeDasharray={`${data1.sentiment.neu} 100`}
                    strokeDashoffset={-data1.sentiment.pos}
                  />
                  {/* Negative sector */}
                  <circle
                    cx="18"
                    cy="18"
                    r="15.915"
                    fill="transparent"
                    stroke="#f43f5e"
                    strokeWidth="4.5"
                    strokeDasharray={`${data1.sentiment.neg} 100`}
                    strokeDashoffset={-(data1.sentiment.pos + data1.sentiment.neu)}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-[10px]">
                  <span className={`text-[12px] font-bold uppercase tracking-wider leading-none ${data1.sentiment.neg >= 50 ? "text-[#f43f5e]" : "text-[#10b981]"
                    }`}>
                    {data1.sentiment.neg >= 50 ? "Negative" : "Positive"} Sentiment
                  </span>
                  <span className={`text-[32px] font-extrabold leading-tight mt-[4px] ${data1.sentiment.neg >= 50 ? "text-[#f43f5e]" : "text-[#10b981]"
                    }`}>
                    {data1.sentiment.neg >= 50 ? `${data1.sentiment.neg}%` : `${data1.sentiment.pos}%`}
                  </span>
                </div>
              </div>

              {/* Legend */}
              <div className="flex items-center gap-[12px] text-[12px] font-medium text-slate-500 dark:text-slate-400 mt-[16px]">
                <div className="flex items-center gap-[4px]">
                  <span className="size-[8px] rounded-full bg-rose-500"></span>
                  <span>Neg ({data1.sentiment.neg}%)</span>
                </div>
                <div className="flex items-center gap-[4px]">
                  <span className="size-[8px] rounded-full bg-slate-400"></span>
                  <span>Neu ({data1.sentiment.neu}%)</span>
                </div>
                <div className="flex items-center gap-[4px]">
                  <span className="size-[8px] rounded-full bg-emerald-500"></span>
                  <span>Pos ({data1.sentiment.pos}%)</span>
                </div>
              </div>
            </div>

            {/* Donut Chart Segment 2 */}
            <div className="flex flex-col items-center justify-center p-[16px] border border-slate-100 dark:border-slate-800 rounded-[16px]">
              <span className="text-[13px] font-semibold text-slate-500 dark:text-slate-400 mb-[16px]">{segment2} Sentiment</span>

              {/* SVG Donut */}
              <div className="relative size-[160px] flex items-center justify-center">
                <svg className="size-full transform -rotate-90" viewBox="0 0 36 36">
                  <circle cx="18" cy="18" r="15.915" fill="transparent" stroke="#f1f5f9" className="stroke-slate-100 dark:stroke-slate-800" strokeWidth="4.5" />
                  {/* Positive sector */}
                  <circle
                    cx="18"
                    cy="18"
                    r="15.915"
                    fill="transparent"
                    stroke="#10b981"
                    strokeWidth="4.5"
                    strokeDasharray={`${data2.sentiment.pos} 100`}
                    strokeDashoffset={0}
                  />
                  {/* Neutral sector */}
                  <circle
                    cx="18"
                    cy="18"
                    r="15.915"
                    fill="transparent"
                    stroke="#94a3b8"
                    strokeWidth="4.5"
                    strokeDasharray={`${data2.sentiment.neu} 100`}
                    strokeDashoffset={-data2.sentiment.pos}
                  />
                  {/* Negative sector */}
                  <circle
                    cx="18"
                    cy="18"
                    r="15.915"
                    fill="transparent"
                    stroke="#f43f5e"
                    strokeWidth="4.5"
                    strokeDasharray={`${data2.sentiment.neg} 100`}
                    strokeDashoffset={-(data2.sentiment.pos + data2.sentiment.neu)}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-[10px]">
                  <span className={`text-[12px] font-bold uppercase tracking-wider leading-none ${data2.sentiment.pos >= 50 ? "text-[#10b981]" : "text-[#f43f5e]"
                    }`}>
                    {data2.sentiment.pos >= 50 ? "Positive" : "Negative"} Sentiment
                  </span>
                  <span className={`text-[32px] font-extrabold leading-tight mt-[4px] ${data2.sentiment.pos >= 50 ? "text-[#10b981]" : "text-[#f43f5e]"
                    }`}>
                    {data2.sentiment.pos >= 50 ? `${data2.sentiment.pos}%` : `${data2.sentiment.neg}%`}
                  </span>
                </div>
              </div>

              {/* Legend */}
              <div className="flex items-center gap-[12px] text-[12px] font-medium text-slate-500 dark:text-slate-400 mt-[16px]">
                <div className="flex items-center gap-[4px]">
                  <span className="size-[8px] rounded-full bg-emerald-500"></span>
                  <span>Pos ({data2.sentiment.pos}%)</span>
                </div>
                <div className="flex items-center gap-[4px]">
                  <span className="size-[8px] rounded-full bg-slate-400"></span>
                  <span>Neu ({data2.sentiment.neu}%)</span>
                </div>
                <div className="flex items-center gap-[4px]">
                  <span className="size-[8px] rounded-full bg-rose-500"></span>
                  <span>Neg ({data2.sentiment.neg}%)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Note Panel */}
          <div className="bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 rounded-[12px] p-[12px] text-[12px] text-slate-500 dark:text-slate-300 leading-relaxed mt-[6px]">
            <strong>AI COMMENTARY:</strong> {segment1} responses show high levels of negative sentiment ({data1.sentiment.neg}%) concentrated in {data1.concern.toLowerCase()}, tool reliability, and rigid processes. {segment2} shows strong positive sentiment ({data2.sentiment.pos}%) with concerns centered on {data2.concern.toLowerCase()} clarity and stakeholder alignment.
          </div>
        </div>

        {/* Representative Voices */}
        <div className="bg-white dark:bg-[#111827] rounded-[24px] border border-slate-200/80 dark:border-slate-800 shadow-sm p-[24px] flex flex-col gap-[20px]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-[8px]">
              <h3 className="font-bold text-[#0f172a] dark:text-slate-100 text-[18px]">Representative Voices</h3>
              <HelpCircle className="size-[16px] text-slate-400 cursor-pointer" />
            </div>
            <div className="flex items-center gap-[10px] text-slate-400">
              <button className="p-[4px] hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"><ChevronLeft className="size-[16px]" /></button>
              <button className="p-[4px] hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"><ChevronRight className="size-[16px]" /></button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-[20px]">
            {/* Columns left */}
            <div className="flex flex-col gap-[14px]">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{segment1.toUpperCase()} TRANSCRIPTS</span>
              {data1.transcripts.map((t, idx) => (
                <div key={idx} className="bg-[#f8fafc] dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 rounded-[16px] p-[16px] flex flex-col gap-[10px]">
                  <p className="text-[#334155] dark:text-slate-300 text-[13.5px] italic leading-relaxed">
                    "{t.text}"
                  </p>
                  <span className="text-[11px] font-bold text-slate-400">— {t.author}</span>
                </div>
              ))}
            </div>

            {/* Columns right */}
            <div className="flex flex-col gap-[14px]">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{segment2.toUpperCase()} TRANSCRIPTS</span>
              {data2.transcripts.map((t, idx) => (
                <div key={idx} className="bg-[#f8fafc] dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 rounded-[16px] p-[16px] flex flex-col gap-[10px]">
                  <p className="text-[#334155] dark:text-slate-300 text-[13.5px] italic leading-relaxed">
                    "{t.text}"
                  </p>
                  <span className="text-[11px] font-bold text-slate-400">— {t.author}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Strategic Recommendations */}
        <div className="bg-white dark:bg-[#111827] rounded-[24px] border border-slate-200/80 dark:border-slate-800 shadow-sm p-[24px] flex flex-col gap-[20px]">
          <div className="flex items-center gap-[8px]">
            <h3 className="font-bold text-[#0f172a] dark:text-slate-100 text-[18px]">Strategic Recommendations</h3>
            <HelpCircle className="size-[16px] text-slate-400 cursor-pointer" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px]">
            {/* Recommendations segment 1 */}
            <div className="flex flex-col gap-[16px]">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">FOR {segment1.toUpperCase()} PIPELINES</span>
              <div className="flex flex-col gap-[12px]">
                {data1.recommendations.map((rec, idx) => (
                  <div key={idx} className="flex items-start gap-[12px] bg-[#f8fafc] dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 rounded-[16px] p-[16px] hover:shadow-sm transition-shadow">
                    <div className="bg-[#dcfce7] dark:bg-emerald-950/60 text-[#15803d] dark:text-emerald-400 p-[10px] rounded-[12px] flex items-center justify-center shrink-0">
                      {rec.icon === "calendar" ? <Plus className="size-[18px]" /> : <Compass className="size-[18px]" />}
                    </div>
                    <div className="flex-1 flex flex-col gap-[4px]">
                      <div className="flex items-start justify-between gap-[8px]">
                        <h4 className="font-bold text-[#0f172a] dark:text-slate-100 text-[14px]">{rec.title}</h4>
                        <span className={`px-[6px] py-[1.5px] rounded text-[9px] font-extrabold tracking-wider ${rec.priority === "CRITICAL" ? "bg-red-100 dark:bg-red-950/60 text-red-700 dark:text-red-400" : rec.priority === "MEDIUM" ? "bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400" : "bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-400"
                          }`}>{rec.priority}</span>
                      </div>
                      <p className="text-slate-500 dark:text-slate-300 text-[12px] leading-relaxed">{rec.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommendations segment 2 */}
            <div className="flex flex-col gap-[16px]">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">FOR {segment2.toUpperCase()} PIPELINES</span>
              <div className="flex flex-col gap-[12px]">
                {data2.recommendations.map((rec, idx) => (
                  <div key={idx} className="flex items-start gap-[12px] bg-[#f8fafc] dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 rounded-[16px] p-[16px] hover:shadow-sm transition-shadow">
                    <div className="bg-[#eef2ff] dark:bg-indigo-950/60 text-[#6366f1] dark:text-indigo-400 p-[10px] rounded-[12px] flex items-center justify-center shrink-0">
                      {rec.icon === "bell" ? <MessageSquare className="size-[18px]" /> : <FileText className="size-[18px]" />}
                    </div>
                    <div className="flex-1 flex flex-col gap-[4px]">
                      <div className="flex items-start justify-between gap-[8px]">
                        <h4 className="font-bold text-[#0f172a] dark:text-slate-100 text-[14px]">{rec.title}</h4>
                        <span className={`px-[6px] py-[1.5px] rounded text-[9px] font-extrabold tracking-wider ${rec.priority === "CRITICAL" ? "bg-red-100 dark:bg-red-950/60 text-red-700 dark:text-red-400" : rec.priority === "MEDIUM" ? "bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400" : "bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-400"
                          }`}>{rec.priority}</span>
                      </div>
                      <p className="text-slate-500 dark:text-slate-300 text-[12px] leading-relaxed">{rec.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* ================= RIGHT COLUMN (RESEARCH ASSISTANT) ================= */}
      <div className="w-[360px] h-full shrink-0 flex flex-col gap-[20px] bg-white dark:bg-[#111827] border border-slate-200/80 dark:border-slate-800 rounded-[24px] p-[24px] shadow-sm overflow-y-auto">

        {/* Header */}
        <div className="flex items-center justify-between pb-[16px] border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-[10px]">
            <div className="bg-purple-100 dark:bg-purple-900/60 text-purple-700 dark:text-purple-300 p-[8px] rounded-[10px]">
              <Sparkles className="size-[18px]" />
            </div>
            <h3 className="font-bold text-[#0f172a] dark:text-slate-100 text-[16px]">Research Assistant</h3>
          </div>

          <div className="flex items-center gap-[6px]">
            <span className="size-[8px] rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">AI Active</span>
          </div>
        </div>

        {/* AI Summary Block */}
        <div className="flex flex-col gap-[10px]">
          <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">AI Summary</h4>
          <p className="text-slate-600 dark:text-slate-300 text-[13px] leading-relaxed">
            Scheduling is the top driver of frustration in {segment1}, while communication gaps are the biggest concern in {segment2}. Prioritize schedule flexibility initiatives for {segment1} and cross-team communication improvements for {segment2}.
          </p>
          <button className="flex items-center gap-[4px] text-[#15803d] dark:text-emerald-400 font-bold text-[12px] hover:underline mt-[2px] cursor-pointer">
            <span>View full summary</span>
            <ArrowRight className="size-[12px]" />
          </button>
        </div>

        {/* Sentiment Distribution Donut */}
        <div className="flex flex-col gap-[12px] pt-[16px] border-t border-slate-100 dark:border-slate-800">
          <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Sentiment Distribution</h4>

          <div className="flex items-center gap-[16px]">
            {/* SVG donut chart */}
            <div className="relative size-[72px] shrink-0">
              <svg className="size-full transform -rotate-90" viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="15.915" fill="transparent" stroke="#f1f5f9" className="stroke-slate-100 dark:stroke-slate-800" strokeWidth="4" />

                {/* Green Promoters: 64% */}
                <circle
                  cx="18"
                  cy="18"
                  r="15.915"
                  fill="transparent"
                  stroke="#10b981"
                  strokeWidth="4"
                  strokeDasharray="64 100"
                  strokeDashoffset="0"
                />

                {/* Yellow Passives: 21% */}
                <circle
                  cx="18"
                  cy="18"
                  r="15.915"
                  fill="transparent"
                  stroke="#f59e0b"
                  strokeWidth="4"
                  strokeDasharray="21 100"
                  strokeDashoffset="-64"
                />

                {/* Red Detractors: 15% */}
                <circle
                  cx="18"
                  cy="18"
                  r="15.915"
                  fill="transparent"
                  stroke="#ef4444"
                  strokeWidth="4"
                  strokeDasharray="15 100"
                  strokeDashoffset="-85"
                />
              </svg>
            </div>

            {/* Legend with percentages */}
            <div className="flex-1 flex flex-col gap-[4px] text-[12px] font-medium text-slate-600 dark:text-slate-300">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-[6px]">
                  <span className="size-[6px] rounded-full bg-emerald-500"></span>
                  <span>Promoters</span>
                </div>
                <span className="font-bold text-slate-800 dark:text-slate-100">64%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-[6px]">
                  <span className="size-[6px] rounded-full bg-amber-500"></span>
                  <span>Passives</span>
                </div>
                <span className="font-bold text-slate-800 dark:text-slate-100">21%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-[6px]">
                  <span className="size-[6px] rounded-full bg-rose-500"></span>
                  <span>Detractors</span>
                </div>
                <span className="font-bold text-slate-800 dark:text-slate-100">15%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Trend Over Time Sparklines */}
        <div className="flex flex-col gap-[10px] pt-[16px] border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center justify-between">
            <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Trend Over Time</h4>
            <span className="text-[11px] text-slate-400 font-medium">Last 8 weeks</span>
          </div>

          {/* Sparkline Visual SVG */}
          <div className="h-[52px] w-full bg-[#f8fafc] dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 rounded-[12px] p-[10px] flex items-center justify-center">
            <svg className="w-full h-full" viewBox="0 0 200 40">
              {/* Green Sparkline line */}
              <path
                d="M 10 30 Q 30 25 50 18 T 90 28 T 130 12 T 170 18 T 190 8"
                fill="transparent"
                stroke="#10b981"
                strokeWidth="2"
                strokeLinecap="round"
              />
              {/* Red Sparkline line */}
              <path
                d="M 10 38 Q 30 35 50 37 T 90 32 T 130 36 T 170 34 T 190 33"
                fill="transparent"
                stroke="#ef4444"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>

        {/* Recommended Actions */}
        <div className="flex flex-col gap-[10px] pt-[16px] border-t border-slate-100 dark:border-slate-800">
          <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Recommended Actions</h4>

          <div className="flex flex-col gap-[10px]">
            {/* Action item 1 */}
            <div
              onClick={() => setActionsChecked([!actionsChecked[0], actionsChecked[1]])}
              className="flex items-center gap-[12px] bg-[#f8fafc] dark:bg-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-[14px] p-[12px] cursor-pointer transition-all"
            >
              <input
                type="checkbox"
                checked={actionsChecked[0]}
                onChange={() => { }}
                className="rounded border-slate-300 dark:border-slate-600 text-emerald-600 focus:ring-emerald-500 size-[16px] pointer-events-none"
              />
              <div className="flex-1 min-w-px">
                <p className="text-[13px] font-semibold text-[#0f172a] dark:text-slate-100 truncate">Interview 42 detractors in {segment1}</p>
              </div>
              <ArrowRight className="size-[14px] text-slate-400 shrink-0" />
            </div>

            {/* Action item 2 */}
            <div
              onClick={() => setActionsChecked([actionsChecked[0], !actionsChecked[1]])}
              className="flex items-center gap-[12px] bg-[#f8fafc] dark:bg-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-[14px] p-[12px] cursor-pointer transition-all"
            >
              <input
                type="checkbox"
                checked={actionsChecked[1]}
                onChange={() => { }}
                className="rounded border-slate-300 dark:border-slate-600 text-emerald-600 focus:ring-emerald-500 size-[16px] pointer-events-none"
              />
              <div className="flex-1 min-w-px">
                <p className="text-[13px] font-semibold text-[#0f172a] dark:text-slate-100 truncate">Follow up with 34 queued respondents</p>
              </div>
              <ArrowRight className="size-[14px] text-slate-400 shrink-0" />
            </div>
          </div>
        </div>

        {/* Ask Assistant Prompt Block */}
        <div className="flex flex-col gap-[10px] pt-[16px] border-t border-slate-100 dark:border-slate-800">
          <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Ask Assistant</h4>
          <span className="text-[12px] text-slate-400 font-medium">What would you like to know?</span>

          {/* Quick Prompts */}
          <div className="flex flex-col gap-[6px]">
            <button
              onClick={() => setChatInput("Why is scheduling the biggest issue?")}
              className="w-full text-left bg-slate-50 dark:bg-slate-800 hover:bg-[#eef2ff] dark:hover:bg-slate-700 border border-slate-100 dark:border-slate-700 rounded-[10px] p-[8px] text-[12px] font-semibold text-slate-700 dark:text-slate-200 transition-colors"
            >
              Why is scheduling the biggest issue?
            </button>
            <button
              onClick={() => setChatInput(`Compare sentiment of ${segment1} across experience levels`)}
              className="w-full text-left bg-slate-50 dark:bg-slate-800 hover:bg-[#eef2ff] dark:hover:bg-slate-700 border border-slate-100 dark:border-slate-700 rounded-[10px] p-[8px] text-[12px] font-semibold text-slate-700 dark:text-slate-200 transition-colors"
            >
              Compare sentiment of {segment1} across experience levels
            </button>
          </div>

          {/* Chat History */}
          {chatMessages.length > 0 && (
            <div className="flex flex-col gap-[8px] max-h-[120px] overflow-y-auto bg-slate-50 dark:bg-slate-800/60 p-[8px] rounded-[10px] border border-slate-100 dark:border-slate-700 mt-[4px]">
              {chatMessages.map((msg, idx) => (
                <div key={idx} className={`text-[12px] p-[6px] rounded-lg ${msg.startsWith("AI Assistant:")
                  ? "bg-purple-50 dark:bg-purple-950/60 text-purple-900 dark:text-purple-200 border border-purple-100 dark:border-purple-800/50"
                  : "bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-100 border border-slate-200/60 dark:border-slate-600 self-end"
                  }`}>
                  {msg}
                </div>
              ))}
            </div>
          )}

          {/* Send Input Bar */}
          <div className="flex items-center gap-[8px] mt-[4px]">
            <input
              type="text"
              placeholder="Ask anything..."
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendChat()}
              className="flex-1 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-[12px] px-[12px] py-[8px] text-[13px] font-medium text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-slate-300 dark:focus:border-slate-600"
            />
            <button
              onClick={handleSendChat}
              className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-[12px] p-[8px] flex items-center justify-center cursor-pointer transition-colors"
            >
              <Send className="size-[16px]" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
