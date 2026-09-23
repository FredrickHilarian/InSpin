import React, { useState } from "react";
import { Check, MessageSquare, Sparkles, FolderKanban, Download, Bell, HelpCircle } from "lucide-react";

interface NotificationItem {
  id: string;
  type: "mention" | "ai" | "project" | "digest" | "export" | "comment" | "system";
  content: string;
  time: string;
  actionLabel: string;
  unread: boolean;
  color: string;
}

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: "1",
    type: "mention",
    content: "@Marcus Rivera mentioned you in Customer Satisfaction Survey feedback analysis",
    time: "5 min ago",
    actionLabel: "View",
    unread: true,
    color: "#10b981", // Emerald/Teal
  },
  {
    id: "2",
    type: "ai",
    content: "AI detected a new emerging theme: Remote Work Flexibility scoring 34% negative sentiment increase",
    time: "12 min ago",
    actionLabel: "Explore Theme",
    unread: true,
    color: "#10b981",
  },
  {
    id: "3",
    type: "project",
    content: "Sarah Chen shared Research Project: Employee NPS Q2 2026 with you as Editor",
    time: "1 hour ago",
    actionLabel: "Open Project",
    unread: true,
    color: "#10b981",
  },
  {
    id: "4",
    type: "digest",
    content: "Weekly AI Digest: 3 new patterns detected across 2 active surveys. Key finding: scheduling complaints correlate with department size",
    time: "3 hours ago",
    actionLabel: "View Digest",
    unread: true,
    color: "#6366f1", // Purple
  },
  {
    id: "5",
    type: "export",
    content: "Export complete: Customer Satisfaction Survey 2026 report is ready for download",
    time: "5 hours ago",
    actionLabel: "Download",
    unread: true,
    color: "#f59e0b", // Orange
  },
  {
    id: "6",
    type: "comment",
    content: "Priya Patel commented on Question Q7 analysis: Great insight about the correlation",
    time: "Yesterday",
    actionLabel: "Reply",
    unread: true,
    color: "#10b981",
  },
  {
    id: "7",
    type: "system",
    content: "System: Your organization upgraded to InSpin Enterprise. New features available.",
    time: "2 days ago",
    actionLabel: "Learn More",
    unread: false,
    color: "#64748b", // Slate
  },
];

export default function Notifications() {
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [activeFilter, setActiveFilter] = useState<"all" | "unread" | "mentions" | "ai">("all");

  const unreadCount = notifications.filter((n) => n.unread).length;
  const mentionsCount = notifications.filter((n) => n.type === "mention" || n.type === "comment").length;
  const aiCount = notifications.filter((n) => n.type === "ai" || n.type === "digest").length;

  const filteredNotifications = notifications.filter((n) => {
    if (activeFilter === "unread") return n.unread;
    if (activeFilter === "mentions") return n.type === "mention" || n.type === "comment";
    if (activeFilter === "ai") return n.type === "ai" || n.type === "digest";
    return true;
  });

  const handleMarkAllRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, unread: false })));
  };

  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-120px)] relative overflow-y-auto">
      <div className="flex flex-col gap-[24px] p-[40px] w-full max-w-[1200px] mx-auto pb-32">
        
        {/* Header */}
        <div className="flex items-center justify-between w-full">
          <h1 className="font-['Inter:Bold',sans-serif] font-bold text-[#0f172a] text-[32px] leading-tight">
            Notifications
          </h1>
          <button
            onClick={handleMarkAllRead}
            className="text-[#059669] font-medium text-[14px] hover:underline cursor-pointer"
          >
            Mark all as read
          </button>
        </div>

        {/* Filters */}
        <div className="flex gap-[8px] items-center">
          <button
            onClick={() => setActiveFilter("all")}
            className={`px-[16px] py-[8px] rounded-full text-[13px] font-semibold transition-all ${
              activeFilter === "all"
                ? "bg-[#059669] text-white"
                : "bg-white border border-[#e2e8f0] text-slate-600 hover:bg-slate-50"
            }`}
          >
            All ({notifications.length})
          </button>
          <button
            onClick={() => setActiveFilter("unread")}
            className={`px-[16px] py-[8px] rounded-full text-[13px] font-semibold transition-all border ${
              activeFilter === "unread"
                ? "bg-[#059669] text-white border-transparent"
                : "bg-white border-[#e2e8f0] text-[#059669] hover:bg-slate-50"
            }`}
          >
            Unread ({unreadCount})
          </button>
          <button
            onClick={() => setActiveFilter("mentions")}
            className={`px-[16px] py-[8px] rounded-full text-[13px] font-semibold transition-all border ${
              activeFilter === "mentions"
                ? "bg-[#059669] text-white border-transparent"
                : "bg-white border-[#e2e8f0] text-slate-600 hover:bg-slate-50"
            }`}
          >
            Mentions ({mentionsCount})
          </button>
          <button
            onClick={() => setActiveFilter("ai")}
            className={`px-[16px] py-[8px] rounded-full text-[13px] font-semibold transition-all border ${
              activeFilter === "ai"
                ? "bg-[#059669] text-white border-transparent"
                : "bg-white border-[#e2e8f0] text-slate-600 hover:bg-slate-50"
            }`}
          >
            AI Insights ({aiCount})
          </button>
        </div>

        {/* Notifications List */}
        <div className="flex flex-col gap-[12px] w-full">
          {filteredNotifications.map((notif) => (
            <div
              key={notif.id}
              className={`flex items-center justify-between p-[20px] rounded-[16px] bg-white border border-slate-100 shadow-sm transition-all hover:shadow-md relative pl-[32px]`}
            >
              {/* Colored side indicator dot */}
              <div
                className="absolute left-[16px] top-1/2 -translate-y-1/2 w-[6px] h-[6px] rounded-full"
                style={{ backgroundColor: notif.color }}
              />

              <div className="flex flex-col gap-[4px] items-start pr-[24px] flex-1">
                <p className="font-['Inter',sans-serif] text-[14px] text-slate-800 font-medium leading-relaxed">
                  {notif.content}
                </p>
                <p className="font-['Inter',sans-serif] text-[12px] text-slate-400">
                  {notif.time}
                </p>
              </div>

              <button
                className="px-[16px] py-[8px] rounded-[10px] bg-white border border-slate-200 text-slate-700 text-[13px] font-semibold hover:bg-slate-50 transition-all shrink-0 cursor-pointer shadow-sm"
              >
                {notif.actionLabel}
              </button>
            </div>
          ))}

          {filteredNotifications.length === 0 && (
            <div className="flex flex-col items-center justify-center py-[64px] text-slate-400">
              <p className="text-[14px]">No notifications found in this filter.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
