import React, { useState } from "react";
import { Folder, Plus, MessageSquare, HelpCircle, User, Sparkles, Filter, ArrowUpDown } from "lucide-react";
import { ResponsiveContainer, AreaChart, Area } from "recharts";

import imgSarah from "../../imports/DonezoDashboard/119adb801822bb7577f873d4b007f7a4899ea16c.png";
import imgJames from "../../imports/DonezoDashboard/33cf7140d91e2d226527cd50794e896f2c531f41.png";
import imgDavid from "../../imports/DonezoDashboard/32d55c0bd3bf8bc9b4cabd65f1ca80f4ee20f935.png";
import imgMarcus from "../../imports/DonezoDashboard/2ff787ab01ae55f30fa18ab6e74e3bc67288cb6a.png";
import imgLucas from "../../imports/DonezoDashboard/c338a2ddfb97a61bbf8082a7a7da31e072d85582.png";

interface CollectionItem {
  name: string;
  count: number;
}

const COLLECTIONS: CollectionItem[] = [
  { name: "All Findings", count: 24 },
  { name: "Scheduling Issues", count: 8 },
  { name: "Communication Gaps", count: 6 },
  { name: "Quick Wins", count: 4 },
  { name: "Leadership Review", count: 3 },
  { name: "Unorganized", count: 3 },
];

const TREND_DATA = [
  { value: 90 },
  { value: 82 },
  { value: 75 },
  { value: 68 },
  { value: 54 },
  { value: 48 },
  { value: 32 },
];

export default function SavedFindings() {
  const [selectedCollection, setSelectedCollection] = useState("All Findings");

  return (
    <div className="flex-1 flex flex-row h-[calc(100vh-120px)] relative overflow-hidden bg-[#f4f7f6]">
      
      {/* Collections Left Panel */}
      <div className="w-[240px] shrink-0 border-r border-slate-200/80 bg-white/50 backdrop-blur-md flex flex-col p-4 gap-4 overflow-y-auto">
        <div>
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-3">
            Collections
          </span>
          <div className="flex flex-col gap-1">
            {COLLECTIONS.map((c) => (
              <div
                key={c.name}
                onClick={() => setSelectedCollection(c.name)}
                className={`flex items-center justify-between p-2 rounded-xl text-[13px] font-medium transition-all cursor-pointer ${
                  selectedCollection === c.name
                    ? "bg-[#e8f7f0] text-[#059669]"
                    : "text-slate-600 hover:bg-slate-100/50"
                }`}
              >
                <div className="flex items-center gap-2">
                  <Folder className="size-4 shrink-0" />
                  <span className="truncate">{c.name}</span>
                </div>
                <span className={`text-[11px] px-2 py-0.5 rounded-full font-bold ${
                  selectedCollection === c.name ? "bg-[#dcfce7] text-[#15803d]" : "bg-slate-100 text-slate-500"
                }`}>
                  {c.count}
                </span>
              </div>
            ))}
          </div>
        </div>

        <button className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl border border-dashed border-slate-300 text-slate-500 text-[13px] font-semibold hover:bg-white hover:border-slate-400 transition-all cursor-pointer mt-2">
          <Plus className="size-4" />
          New Collection
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden p-6 gap-6">
        
        {/* Sub-header Controls */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <h1 className="font-['Inter:Bold',sans-serif] font-bold text-[#0f172a] text-[22px]">
              Saved Findings
            </h1>
            <span className="text-[12px] text-slate-500 font-medium">
              24 findings across 6 collections
            </span>
          </div>

          <div className="flex gap-2 text-[12px] font-semibold">
            <button className="flex items-center gap-1.5 px-3 py-2 bg-white border border-slate-200 rounded-xl text-slate-700 hover:bg-slate-50 cursor-pointer">
              <Filter className="size-3.5 text-slate-400" />
              Filter
            </button>
            <button className="flex items-center gap-1.5 px-3 py-2 bg-white border border-slate-200 rounded-xl text-slate-700 hover:bg-slate-50 cursor-pointer">
              <ArrowUpDown className="size-3.5 text-slate-400" />
              Sort
            </button>
            <button className="flex items-center gap-1.5 px-3 py-2 bg-[#059669] hover:bg-[#047857] text-white rounded-xl cursor-pointer">
              <Plus className="size-3.5" />
              Save Finding
            </button>
          </div>
        </div>

        {/* Grid of Finding Cards */}
        <div className="flex-1 overflow-y-auto pr-1">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-24">
            
            {/* Card 1 */}
            <div className="bg-white rounded-[20px] border border-slate-100 p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between min-h-[220px]">
              <div className="flex flex-col gap-3">
                <div className="flex flex-wrap gap-1.5">
                  <span className="px-2 py-0.5 rounded-lg bg-emerald-50 text-emerald-700 text-[10px] font-bold">Scheduling</span>
                  <span className="px-2 py-0.5 rounded-lg bg-rose-50 text-rose-700 text-[10px] font-bold">High Priority</span>
                </div>
                <h4 className="text-[14px] font-bold text-slate-800 leading-snug">
                  Scheduling Flexibility Crisis in Engineering
                </h4>
                <p className="text-[12.5px] text-slate-500 font-medium italic leading-relaxed">
                  "The lack of core hour structure makes collaborating with global teams incredibly frustrating, leading to burnout."
                </p>
                <div className="flex flex-col gap-1.5 mt-1">
                  <div className="flex justify-between text-[10px] font-semibold text-slate-400">
                    <span>Sentiment Analysis</span>
                    <span className="text-rose-600 font-bold">62% Negative</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="w-[62%] h-full bg-rose-500" />
                  </div>
                </div>
              </div>
              <div className="border-t border-slate-50 pt-3 mt-4 flex justify-between items-center text-[11px] font-semibold text-slate-400">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <MessageSquare className="size-3" /> 12 quotes
                  </span>
                  <span className="flex items-center gap-1">
                    <HelpCircle className="size-3" /> 3 questions
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <img alt="" className="size-5 rounded-full object-cover" src={imgSarah} />
                  <span>Dr. Sarah Chen</span>
                  <span>•</span>
                  <span>Jul 14</span>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-[20px] border border-slate-100 p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between min-h-[220px]">
              <div className="flex flex-col gap-3">
                <div className="flex flex-wrap gap-1.5">
                  <span className="px-2 py-0.5 rounded-lg bg-indigo-50 text-indigo-700 text-[10px] font-bold">Communication</span>
                  <span className="px-2 py-0.5 rounded-lg bg-rose-50 text-rose-700 text-[10px] font-bold">Trending Down</span>
                </div>
                <h4 className="text-[14px] font-bold text-slate-800 leading-snug">
                  Communication Sentiment Decline Post-March
                </h4>
                <div className="flex items-center justify-between gap-4 mt-2">
                  <div className="w-[120px] h-14 shrink-0">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={TREND_DATA}>
                        <defs>
                          <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.2}/>
                            <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <Area type="monotone" dataKey="value" stroke="#f43f5e" strokeWidth={2} fillOpacity={1} fill="url(#colorValue)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex flex-col text-right">
                    <span className="text-[20px] font-bold text-rose-600 leading-tight">-32%</span>
                    <span className="text-[10px] text-slate-400 font-semibold">Delta since Q1</span>
                  </div>
                </div>
              </div>
              <div className="border-t border-slate-50 pt-3 mt-4 flex justify-between items-center text-[11px] font-semibold text-slate-400">
                <div />
                <div className="flex items-center gap-1.5">
                  <img alt="" className="size-5 rounded-full object-cover" src={imgJames} />
                  <span>James Park</span>
                  <span>•</span>
                  <span>Jul 13</span>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-[20px] border border-slate-100 p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between min-h-[220px]">
              <div className="flex flex-col gap-3">
                <div className="flex flex-wrap gap-1.5">
                  <span className="px-2 py-0.5 rounded-lg bg-emerald-50 text-emerald-700 text-[10px] font-bold">Location</span>
                  <span className="px-2 py-0.5 rounded-lg bg-green-50 text-green-700 text-[10px] font-bold">Positive</span>
                </div>
                <h4 className="text-[14px] font-bold text-slate-800 leading-snug">
                  Remote Workers Report Higher Satisfaction
                </h4>
                <div className="flex items-center gap-6 mt-1">
                  <div className="flex flex-col">
                    <span className="text-[18px] font-bold text-emerald-600 leading-tight">72%</span>
                    <span className="text-[10px] text-slate-400 font-semibold">Fully Remote</span>
                  </div>
                  <div className="border-l border-slate-100 h-6" />
                  <div className="flex flex-col">
                    <span className="text-[18px] font-bold text-slate-700 leading-tight">38%</span>
                    <span className="text-[10px] text-slate-400 font-semibold">On-site Only</span>
                  </div>
                </div>
                <p className="text-[12px] text-slate-500 font-medium leading-relaxed">
                  Data indicates a strong 34-point satisfaction lead for fully remote cohorts over those strictly bound to the HQ premises.
                </p>
              </div>
              <div className="border-t border-slate-50 pt-3 mt-4 flex justify-between items-center text-[11px] font-semibold text-slate-400">
                <div />
                <div className="flex items-center gap-1.5">
                  <img alt="" className="size-5 rounded-full object-cover" src={imgDavid} />
                  <span>David K.</span>
                  <span>•</span>
                  <span>Jul 12</span>
                </div>
              </div>
            </div>

            {/* Card 4 */}
            <div className="bg-white rounded-[20px] border border-slate-100 p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between min-h-[220px]">
              <div className="flex flex-col gap-3">
                <div className="flex flex-wrap gap-1.5">
                  <span className="px-2 py-0.5 rounded-lg bg-amber-50 text-amber-700 text-[10px] font-bold">Equipment</span>
                  <span className="px-2 py-0.5 rounded-lg bg-orange-50 text-orange-700 text-[10px] font-bold">Correlation</span>
                </div>
                <h4 className="text-[14px] font-bold text-slate-800 leading-snug">
                  Equipment Age Correlates with NPS
                </h4>
                <p className="text-[12px] text-slate-500 font-medium leading-relaxed">
                  Analysis of raw machine assets indicates laptops aged 3+ years have a strict negative correlation with team NPS output (-0.68 score correlation).
                </p>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  <span className="px-2 py-1 bg-slate-50 border border-slate-100 rounded-lg text-[10px] text-slate-500 font-semibold">
                    Question Q3
                  </span>
                  <span className="px-2 py-1 bg-slate-50 border border-slate-100 rounded-lg text-[10px] text-slate-500 font-semibold">
                    Question Q14
                  </span>
                </div>
              </div>
              <div className="border-t border-slate-50 pt-3 mt-4 flex justify-between items-center text-[11px] font-semibold text-slate-400">
                <div />
                <div className="flex items-center gap-1.5">
                  <img alt="" className="size-5 rounded-full object-cover" src={imgMarcus} />
                  <span>Marcus Aurelius</span>
                  <span>•</span>
                  <span>Jul 11</span>
                </div>
              </div>
            </div>

            {/* Card 5 */}
            <div className="bg-white rounded-[20px] border border-slate-100 p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between min-h-[220px]">
              <div className="flex flex-col gap-3">
                <div className="flex flex-wrap gap-1.5">
                  <span className="px-2 py-0.5 rounded-lg bg-emerald-50 text-emerald-700 text-[10px] font-bold">Scheduling</span>
                  <span className="px-2 py-0.5 rounded-lg bg-rose-50 text-rose-700 text-[10px] font-bold">Critical</span>
                  <span className="px-2 py-0.5 rounded-lg bg-purple-50 text-purple-700 text-[10px] font-bold flex items-center gap-0.5">
                    <Sparkles className="size-2.5 text-purple-600" /> AI Detected
                  </span>
                </div>
                <h4 className="text-[14px] font-bold text-slate-800 leading-snug">
                  Overtime Policy as Root Cause
                </h4>
                
                <div className="bg-purple-50/40 border border-purple-100/80 rounded-xl p-3.5 flex flex-col gap-1.5 mt-1">
                  <span className="text-[9px] font-bold text-purple-700 tracking-wider uppercase flex items-center gap-1">
                    <Sparkles className="size-3 text-purple-600" />
                    AI Cognitive Insight
                  </span>
                  <p className="text-[11.5px] text-purple-950 font-medium leading-relaxed">
                    A high concentration of negative sentiments correlates with recent updates in the weekend shift overtime calculations. Recommend reviewing Q3 and Q4.
                  </p>
                </div>
              </div>
              <div className="border-t border-slate-50 pt-3 mt-4 flex justify-between items-center text-[10px] font-bold text-purple-500 uppercase tracking-wider">
                <span>Auto Generated by AI</span>
                <span className="font-semibold text-slate-400 lowercase first-letter:uppercase">Jul 10</span>
              </div>
            </div>

            {/* Card 6 */}
            <div className="bg-white rounded-[20px] border border-slate-100 p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between min-h-[220px]">
              <div className="flex flex-col gap-3">
                <div className="flex flex-wrap gap-1.5">
                  <span className="px-2 py-0.5 rounded-lg bg-cyan-50 text-cyan-700 text-[10px] font-bold">Travel</span>
                  <span className="px-2 py-0.5 rounded-lg bg-blue-50 text-blue-700 text-[10px] font-bold">Emerging</span>
                </div>
                <h4 className="text-[14px] font-bold text-slate-800 leading-snug">
                  Travel Reimbursement Frustration Emerging
                </h4>
                <p className="text-[12.5px] text-slate-500 font-medium italic leading-relaxed">
                  "The 45-day cycle time for travel expense approvals is quite painful."
                </p>
              </div>
              <div className="border-t border-slate-50 pt-3 mt-4 flex justify-between items-center text-[11px] font-semibold text-slate-400">
                <div />
                <div className="flex items-center gap-1.5">
                  <img alt="" className="size-5 rounded-full object-cover" src={imgLucas} />
                  <span>Lucas Vance</span>
                  <span>•</span>
                  <span>Jul 9</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom Activity Timeline */}
        <div className="bg-white rounded-[20px] border border-slate-100 p-5 shadow-sm mt-auto">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-4">
            Activity Timeline of Saved Findings
          </span>
          <div className="relative w-full flex items-center justify-between px-4 pb-2">
            
            {/* Horizontal connection line */}
            <div className="absolute left-[36px] right-[36px] top-1/2 -translate-y-1/2 h-0.5 bg-slate-100 z-0" />
            
            {[
              { date: "Jul 8", color: "bg-slate-300" },
              { date: "Jul 9", color: "bg-cyan-500" },
              { date: "Jul 10", color: "bg-purple-500" },
              { date: "Jul 11", color: "bg-amber-500" },
              { date: "Jul 12", color: "bg-emerald-500" },
              { date: "Jul 13", color: "bg-rose-500" },
              { date: "Jul 14", color: "bg-rose-500" },
              { date: "Jul 15", color: "bg-slate-300" },
            ].map((pt) => (
              <div key={pt.date} className="flex flex-col items-center gap-2 relative z-10">
                <div className={`size-3 rounded-full border-2 border-white ring-2 ring-slate-100 ${pt.color} transition-all hover:scale-125`} />
                <span className="text-[11px] font-bold text-slate-400">{pt.date}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
