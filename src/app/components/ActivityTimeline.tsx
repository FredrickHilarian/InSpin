import React, { useState } from "react";
import { Clock, Download, MessageSquare, Edit, Eye, ShieldAlert, UserPlus, Link2, ChevronDown, Search, ArrowUpDown, Shield } from "lucide-react";
import imgAmit from "../../imports/DonezoDashboard/33cf7140d91e2d226527cd50794e896f2c531f41.png";

interface ActivityItem {
  id: string;
  user: string;
  role: string;
  initials: string;
  colorClass: string;
  dotColor: string;
  action: string;
  detail?: string;
  quote?: string;
  badgeDetail?: { from: string; to: string };
  time: string;
  icon: any;
  dateGroup: "TODAY" | "YESTERDAY";
}

const ACTIVITIES: ActivityItem[] = [
  {
    id: "1",
    user: "Sarah Chen",
    role: "Owner",
    initials: "SC",
    colorClass: "bg-teal-50 border-teal-100 text-teal-700",
    dotColor: "bg-teal-500",
    action: "exported the report as PDF Executive Summary Report",
    time: "12 minutes ago • 2:34 PM",
    icon: Download,
    dateGroup: "TODAY"
  },
  {
    id: "2",
    user: "Amit Trivedi",
    role: "Editor",
    initials: "MR",
    colorClass: "bg-emerald-50 border-emerald-100 text-emerald-700",
    dotColor: "bg-emerald-500",
    action: "commented on Onboarding Drop-off Theme",
    quote: "The correlation between sign-up complexity and drop-off rates is striking. We should highlight this in the executive presentation.",
    time: "1 hour ago • 1:48 PM",
    icon: MessageSquare,
    dateGroup: "TODAY"
  },
  {
    id: "3",
    user: "Vijay Sharma",
    role: "Editor",
    initials: "PP",
    colorClass: "bg-purple-50 border-purple-100 text-purple-700",
    dotColor: "bg-purple-500",
    action: "edited AI Insights Key Findings",
    detail: "Updated 3 insight cards, added new theme cluster",
    time: "2 hours ago • 12:15 PM",
    icon: Edit,
    dateGroup: "TODAY"
  },
  {
    id: "4",
    user: "Elena Vasquez",
    role: "Viewer",
    initials: "EV",
    colorClass: "bg-blue-50 border-blue-100 text-blue-700",
    dotColor: "bg-blue-500",
    action: "viewed the report Onboarding Issues",
    detail: "Viewed for 8 minutes",
    time: "3 hours ago • 11:22 AM",
    icon: Eye,
    dateGroup: "TODAY"
  },
  {
    id: "5",
    user: "Aisha Johnson",
    role: "Admin",
    initials: "AJ",
    colorClass: "bg-amber-50 border-amber-100 text-amber-700",
    dotColor: "bg-amber-500",
    action: "changed permissions for Tom Nakamura",
    badgeDetail: { from: "Viewer", to: "Commenter" },
    time: "Yesterday • 4:30 PM",
    icon: Shield,
    dateGroup: "YESTERDAY"
  },
  {
    id: "6",
    user: "James O'Brien",
    role: "Commenter",
    initials: "JO",
    colorClass: "bg-green-50 border-green-100 text-green-700",
    dotColor: "bg-green-500",
    action: "joined the project",
    detail: "Invited by Sarah Chen",
    time: "Yesterday • 10:15 AM",
    icon: UserPlus,
    dateGroup: "YESTERDAY"
  },
  {
    id: "7",
    user: "David Kim",
    role: "Editor",
    initials: "DK",
    colorClass: "bg-teal-50 border-teal-100 text-teal-700",
    dotColor: "bg-teal-500",
    action: "shared a link External stakeholder report",
    detail: "Viewer access • Expires Aug 15, 2026",
    time: "Yesterday • 9:00 AM",
    icon: Link2,
    dateGroup: "YESTERDAY"
  }
];

export default function ActivityTimeline() {
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredActivities = ACTIVITIES.filter((act) => {
    // text search
    const matchesSearch = act.user.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          act.action.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (!matchesSearch) return false;

    // filter tabs
    if (filter === "views") return act.icon === Eye;
    if (filter === "comments") return act.icon === MessageSquare;
    if (filter === "edits") return act.icon === Edit;
    if (filter === "exports") return act.icon === Download;
    if (filter === "access") return act.icon === Shield || act.icon === UserPlus || act.icon === Link2;
    
    return true;
  });

  return (
    <div className="flex-1 flex flex-row h-[calc(100vh-120px)] relative overflow-hidden bg-[#f4f7f6]">
      
      {/* Center Feed Area */}
      <div className="flex-1 overflow-y-auto p-8 flex flex-col gap-6">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <h1 className="font-['Inter:Bold',sans-serif] font-bold text-slate-800 text-[22px] flex items-center gap-2">
              <Clock className="size-6 text-slate-700" />
              Activity Timeline
            </h1>
            <p className="text-[13px] text-slate-400 font-medium">Track all collaboration events across your project</p>
          </div>
          <button className="px-4 py-2 border border-slate-200 bg-white rounded-xl text-slate-700 text-[13px] font-semibold flex items-center gap-1.5 hover:bg-slate-50 cursor-pointer shadow-sm">
            <Download className="size-4 text-slate-500" />
            Export Log
          </button>
        </div>

          <div className="flex flex-col gap-3.5 w-full">
            {/* Row 1: Search */}
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search activity..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl outline-none text-[13px] focus:border-[#059669] shadow-sm font-medium"
              />
            </div>

            {/* Row 2: Pills & User Dropdown */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap gap-1.5 text-[12px]">
                {[
                  { id: "all", label: "All Activity", icon: null },
                  { id: "views", label: "Views", icon: Eye },
                  { id: "comments", label: "Comments", icon: MessageSquare },
                  { id: "edits", label: "Edits", icon: Edit },
                  { id: "exports", label: "Exports", icon: Download },
                  { id: "access", label: "Access", icon: Shield }
                ].map((tab) => {
                  const IconComponent = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setFilter(tab.id)}
                      className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                        filter === tab.id
                          ? "bg-[#059669] text-white shadow-sm shadow-emerald-100 font-semibold"
                          : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 font-medium"
                      }`}
                    >
                      {IconComponent && <IconComponent className="size-3.5" />}
                      {tab.label}
                    </button>
                  );
                })}
              </div>

              <div className="relative">
                <button className="px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-[12px] font-bold text-slate-600 flex items-center gap-1 hover:bg-slate-50 cursor-pointer shadow-sm">
                  User: <span className="text-slate-800">All Users</span>
                  <ChevronDown className="size-3.5" />
                </button>
              </div>
            </div>
          </div>

        {/* Timeline Event Feed */}
        <div className="flex flex-col gap-8 relative pb-24">
          
          {/* Vertical continuous timeline bar */}
          <div className="absolute left-6 top-4 bottom-8 w-0.5 bg-slate-200/60" />

          {/* Group 1: Today */}
          {filteredActivities.filter(a => a.dateGroup === "TODAY").length > 0 && (
            <div className="flex flex-col gap-4">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider pl-12">
                Today - Jul 17, 2026
              </span>
              
              <div className="flex flex-col gap-4">
                {filteredActivities
                  .filter((a) => a.dateGroup === "TODAY")
                  .map((a) => (
                    <div key={a.id} className="flex items-start gap-4 relative pl-12 group">
                      
                      {/* Left timeline dot */}
                      <div className="absolute left-4 top-3.5 -translate-x-1/2 flex items-center justify-center size-[24px] rounded-full bg-white z-10">
                        <div className={`size-3 rounded-full ${a.dotColor} ring-4 ring-white`} />
                      </div>

                      {/* Content Card */}
                      <div className="flex-1 bg-white border border-slate-100/80 rounded-[20px] p-4 flex items-center justify-between shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-start gap-3.5 flex-1 pr-6">
                          <div className={`size-9 rounded-full flex items-center justify-center text-[13px] font-bold shrink-0 ${a.colorClass}`}>
                            {a.initials}
                          </div>
                          
                          <div className="flex flex-col gap-1.5 flex-1 mt-0.5">
                            <p className="text-[13.5px] text-slate-600 leading-normal">
                              <span className="font-bold text-slate-800">{a.user}</span>{" "}
                              <span className="px-1.5 py-0.5 rounded-md bg-slate-50 border border-slate-100 text-[10px] font-bold text-slate-400 uppercase ml-1 mr-2">{a.role}</span>
                              {a.action}
                            </p>
                            
                            {/* Sub-quote or detailed texts */}
                            {a.quote && (
                              <div className="border-l-4 border-emerald-500 bg-emerald-50/20 p-3 rounded-r-xl mt-1 max-w-[560px]">
                                <p className="text-[12.5px] text-slate-600 italic font-medium leading-relaxed">
                                  "{a.quote}"
                                </p>
                              </div>
                            )}

                            {a.detail && (
                              <p className="text-[12px] text-slate-400 font-medium mt-0.5 flex items-center gap-1">
                                {a.detail}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-4 shrink-0 text-slate-400">
                          <span className="text-[11.5px] font-medium text-slate-400 whitespace-nowrap">{a.time}</span>
                          <div className="size-8 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-500 shadow-sm">
                            <a.icon className="size-4" />
                          </div>
                        </div>
                      </div>

                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* Group 2: Yesterday */}
          {filteredActivities.filter(a => a.dateGroup === "YESTERDAY").length > 0 && (
            <div className="flex flex-col gap-4">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider pl-12">
                Yesterday - Jul 16, 2026
              </span>
              
              <div className="flex flex-col gap-4">
                {filteredActivities
                  .filter((a) => a.dateGroup === "YESTERDAY")
                  .map((a) => (
                    <div key={a.id} className="flex items-start gap-4 relative pl-12 group">
                      
                      {/* Left timeline dot */}
                      <div className="absolute left-4 top-3.5 -translate-x-1/2 flex items-center justify-center size-[24px] rounded-full bg-white z-10">
                        <div className={`size-3 rounded-full ${a.dotColor} ring-4 ring-white`} />
                      </div>

                      {/* Content Card */}
                      <div className="flex-1 bg-white border border-slate-100/80 rounded-[20px] p-4 flex items-center justify-between shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-start gap-3.5 flex-1 pr-6">
                          <div className={`size-9 rounded-full flex items-center justify-center text-[13px] font-bold shrink-0 ${a.colorClass}`}>
                            {a.initials}
                          </div>
                          
                          <div className="flex flex-col gap-1.5 flex-1 mt-0.5">
                            <p className="text-[13.5px] text-slate-600 leading-normal">
                              <span className="font-bold text-slate-800">{a.user}</span>{" "}
                              <span className="px-1.5 py-0.5 rounded-md bg-slate-50 border border-slate-100 text-[10px] font-bold text-slate-400 uppercase ml-1 mr-2">{a.role}</span>
                              {a.action}
                            </p>
                            
                            {/* Permission Changes Flow Indicators */}
                            {a.badgeDetail && (
                              <div className="flex items-center gap-2 mt-1.5 text-[11.5px] font-bold">
                                <span className="px-2 py-0.5 bg-slate-100 text-slate-500 rounded">{a.badgeDetail.from}</span>
                                <span className="text-slate-300">→</span>
                                <span className="px-2 py-0.5 bg-amber-50 text-amber-700 border border-amber-100 rounded">{a.badgeDetail.to}</span>
                              </div>
                            )}

                            {a.detail && (
                              <p className="text-[12px] text-slate-400 font-medium mt-0.5 flex items-center gap-1">
                                {a.detail}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-4 shrink-0 text-slate-400">
                          <span className="text-[11.5px] font-medium text-slate-400 whitespace-nowrap">{a.time}</span>
                          <div className="size-8 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-500 shadow-sm">
                            <a.icon className="size-4" />
                          </div>
                        </div>
                      </div>

                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* Load More Button */}
          <div className="flex flex-col items-center justify-center gap-1.5 py-4 pl-12">
            <button className="px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-[13px] font-bold text-slate-700 flex items-center gap-1.5 hover:bg-slate-50 cursor-pointer shadow-sm">
              Load More Activity
              <ChevronDown className="size-4 text-slate-400" />
            </button>
            <span className="text-[11px] font-semibold text-slate-400">47 more events this month</span>
          </div>

        </div>

      </div>

      {/* Right Statistics Digest Sidebar */}
      <div className="w-[280px] shrink-0 border-l border-slate-200/80 bg-white/50 backdrop-blur-md flex flex-col p-6 gap-6 overflow-y-auto">
        
        {/* Statistics List */}
        <div className="flex flex-col gap-1.5">
          <h3 className="font-['Inter:Bold',sans-serif] font-bold text-slate-800 text-[15px]">This Week</h3>
          <span className="text-[11px] text-slate-400 font-medium block mb-2">Project activity digest</span>
          
          <div className="flex flex-col gap-3 text-[13px] font-medium text-slate-600">
            <div className="flex items-center gap-3">
              <Eye className="size-4 text-slate-400" />
              <span>23 views</span>
            </div>
            <div className="flex items-center gap-3">
              <MessageSquare className="size-4 text-slate-400" />
              <span>8 comments</span>
            </div>
            <div className="flex items-center gap-3">
              <Edit className="size-4 text-slate-400" />
              <span>5 edits</span>
            </div>
            <div className="flex items-center gap-3">
              <Download className="size-4 text-slate-400" />
              <span>3 exports</span>
            </div>
            <div className="flex items-center gap-3">
              <Shield className="size-4 text-slate-400" />
              <span>2 permission changes</span>
            </div>
          </div>
        </div>

        {/* Most Active User */}
        <div className="border-t border-slate-100 pt-4 flex flex-col gap-2">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Most Active User</span>
          <div className="flex items-center gap-3">
            <img alt="Amit Trivedi" className="size-9 rounded-full object-cover" src={imgAmit} />
            <div className="flex flex-col">
              <span className="text-[13px] font-bold text-slate-800">Amit Trivedi</span>
              <span className="text-[11px] text-slate-400 font-semibold">8 events logged</span>
            </div>
          </div>
        </div>

        {/* Activity Trend Graph */}
        <div className="border-t border-slate-100 pt-4 flex flex-col gap-3">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Activity Trend</span>
          
          {/* Custom miniature column chart representation */}
          <div className="flex items-end justify-between h-[64px] px-1">
            {[
              { day: "M", val: "h-[30%]" },
              { day: "T", val: "h-[50%]" },
              { day: "W", val: "h-[40%]" },
              { day: "T", val: "h-[85%]" },
              { day: "F", val: "h-[70%]" },
              { day: "S", val: "h-[20%]" },
              { day: "S", val: "h-[30%]" }
            ].map((col) => (
              <div key={col.day} className="flex flex-col items-center gap-1.5 h-full justify-end flex-1">
                <div className={`w-1.5 rounded-t-full bg-emerald-500 ${col.val} min-h-[4px]`} />
                <span className="text-[10px] font-bold text-slate-400">{col.day}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
