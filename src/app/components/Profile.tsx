import React, { useState } from "react";
import { User, Shield, Key, Bell, CreditCard, ChevronDown, Check, Upload, Globe, Slack } from "lucide-react";
import imgProfileAvatar from "../../imports/InspinAppShell/0203bd2613d5605abe749b389b256bf0fd1a56b1.png";
import { useTheme, Theme } from "../context/ThemeContext";

interface ProfileProps {
  onLogout?: () => void;
}

export default function Profile({ onLogout }: ProfileProps) {
  const { theme, setTheme } = useTheme();
  const [fullName, setFullName] = useState("Dr. Aria Thorne");
  const [email, setEmail] = useState("aria.thorne@anthropic.com");
  const [role, setRole] = useState("Lead Researcher");
  const [organization, setOrganization] = useState("Anthropic Research Labs");
  const [timezone, setTimezone] = useState("Pacific Standard Time (PST) - UTC-8");

  const [emailDigest, setEmailDigest] = useState(true);
  const [aiAlerts, setAiAlerts] = useState(true);
  const [mentionNotifications, setMentionNotifications] = useState(true);

  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-120px)] relative overflow-y-auto">
      <div className="flex flex-col gap-[24px] p-4 sm:p-[40px] w-full max-w-[1200px] mx-auto pb-32">

        {/* Profile Summary Card */}
        <div className="bg-white dark:bg-[#111827] rounded-[24px] border border-slate-100 dark:border-slate-800 p-6 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-colors">
          <div className="flex items-center gap-6">
            <div className="relative rounded-full size-[72px] overflow-hidden border border-slate-100 dark:border-slate-700 shrink-0">
              <img alt="Aria Thorne" className="object-cover size-full" src={imgProfileAvatar} />
            </div>
            <div className="flex flex-col gap-1">
              <h2 className="font-['Inter:Bold',sans-serif] font-bold text-[#0f172a] dark:text-slate-100 text-[20px] leading-tight">
                Dr. Aria Thorne
              </h2>
              <div className="text-[13px] text-slate-500 dark:text-slate-400 font-medium">
                Lead Researcher <span className="mx-1.5 text-slate-300 dark:text-slate-600">•</span> Anthropic Research Labs
              </div>
              <div className="text-[12px] text-slate-400 dark:text-slate-500">
                aria.thorne@anthropic.com <span className="mx-1.5 text-slate-300 dark:text-slate-600">•</span> Member since January 2024
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-700 dark:text-slate-200 font-semibold text-[13px] hover:bg-slate-50 dark:hover:bg-slate-800 transition-all cursor-pointer">
              Edit Profile
            </button>
          </div>
        </div>

        {/* 2-Column Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">

          {/* Account Settings Form */}
          <div className="lg:col-span-2 bg-white dark:bg-[#111827] rounded-[24px] border border-slate-100 dark:border-slate-800 p-6 shadow-sm flex flex-col gap-6 transition-colors">
            <h3 className="font-['Inter:Bold',sans-serif] font-bold text-[#0f172a] dark:text-slate-100 text-[16px]">
              Account Settings
            </h3>

            {/* Profile upload area */}
            <div className="border border-dashed border-slate-200 dark:border-slate-700 rounded-xl p-6 flex flex-row items-center gap-4 bg-slate-50/50 dark:bg-slate-800/40">
              <div className="size-10 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                <Upload className="size-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-[13px] font-semibold text-slate-700 dark:text-slate-200">Upload a new profile photo</span>
                <span className="text-[11px] text-slate-400 dark:text-slate-500">JPEG or PNG up to 5MB</span>
              </div>
            </div>

            {/* Fields */}
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[12px] font-semibold text-slate-600 dark:text-slate-400">Full Name</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200/80 dark:border-slate-700 bg-white dark:bg-slate-800/80 focus:border-[#059669] focus:ring-1 focus:ring-[#059669] outline-none text-[13px] font-medium text-slate-800 dark:text-slate-100 transition-colors"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[12px] font-semibold text-slate-600 dark:text-slate-400">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200/80 dark:border-slate-700 bg-white dark:bg-slate-800/80 focus:border-[#059669] focus:ring-1 focus:ring-[#059669] outline-none text-[13px] font-medium text-slate-800 dark:text-slate-100 transition-colors"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[12px] font-semibold text-slate-600 dark:text-slate-400">Role / Title</label>
                <input
                  type="text"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200/80 dark:border-slate-700 bg-white dark:bg-slate-800/80 focus:border-[#059669] focus:ring-1 focus:ring-[#059669] outline-none text-[13px] font-medium text-slate-800 dark:text-slate-100 transition-colors"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[12px] font-semibold text-slate-600 dark:text-slate-400">Organization</label>
                <input
                  type="text"
                  value={organization}
                  onChange={(e) => setOrganization(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200/80 dark:border-slate-700 bg-white dark:bg-slate-800/80 focus:border-[#059669] focus:ring-1 focus:ring-[#059669] outline-none text-[13px] font-medium text-slate-800 dark:text-slate-100 transition-colors"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[12px] font-semibold text-slate-600 dark:text-slate-400">Time Zone</label>
                <div className="relative">
                  <select
                    value={timezone}
                    onChange={(e) => setTimezone(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200/80 dark:border-slate-700 bg-white dark:bg-slate-800/80 focus:border-[#059669] focus:ring-1 focus:ring-[#059669] outline-none text-[13px] font-medium text-slate-800 dark:text-slate-100 appearance-none transition-colors"
                  >
                    <option>Pacific Standard Time (PST) - UTC-8</option>
                    <option>Eastern Standard Time (EST) - UTC-5</option>
                    <option>Greenwich Mean Time (GMT) - UTC+0</option>
                    <option>Central European Time (CET) - UTC+1</option>
                    <option>India Standard Time (IST) - UTC+5:30</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                    <ChevronDown className="size-4" />
                  </div>
                </div>
              </div>
            </div>

            <button className="w-full py-3 rounded-xl bg-[#059669] hover:bg-[#047857] text-white font-bold text-[14px] transition-colors cursor-pointer mt-2 shadow-sm shadow-emerald-100 dark:shadow-none">
              Save Changes
            </button>
          </div>

          {/* Right Column Statistics & Preferences */}
          <div className="flex flex-col gap-6">

            {/* Research Activity Card */}
            <div className="bg-white dark:bg-[#111827] rounded-[24px] border border-slate-100 dark:border-slate-800 p-6 shadow-sm flex flex-col gap-4 transition-colors">
              <h3 className="font-['Inter:Bold',sans-serif] font-bold text-[#0f172a] dark:text-slate-100 text-[15px]">
                Research Activity
              </h3>
              <div className="flex flex-col gap-3 text-[13px] font-medium">
                <div className="flex justify-between items-center py-1">
                  <span className="text-slate-500 dark:text-slate-400">Total Projects</span>
                  <span className="text-slate-800 dark:text-slate-200 font-bold">24</span>
                </div>
                <div className="flex justify-between items-center py-1 border-t border-slate-50 dark:border-slate-800">
                  <span className="text-slate-500 dark:text-slate-400">Active Surveys</span>
                  <span className="text-slate-800 dark:text-slate-200 font-bold">6</span>
                </div>
                <div className="flex justify-between items-center py-1 border-t border-slate-50 dark:border-slate-800">
                  <span className="text-slate-500 dark:text-slate-400">AI Insights Generated</span>
                  <span className="text-[#8b5cf6] font-bold">1,847</span>
                </div>
                <div className="flex justify-between items-center py-1 border-t border-slate-50 dark:border-slate-800">
                  <span className="text-slate-500 dark:text-slate-400">Reports Published</span>
                  <span className="text-[#10b981] font-bold">18</span>
                </div>
              </div>
            </div>

            {/* Preferences Card */}
            <div className="bg-white dark:bg-[#111827] rounded-[24px] border border-slate-100 dark:border-slate-800 p-6 shadow-sm flex flex-col gap-4 transition-colors">
              <h3 className="font-['Inter:Bold',sans-serif] font-bold text-[#0f172a] dark:text-slate-100 text-[15px]">
                Preferences
              </h3>

              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">App Theme</label>
                <div className="grid grid-cols-3 gap-2">
                  {(["light", "dark", "system"] as const).map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setTheme(t)}
                      className={`px-3 py-2 rounded-xl text-[12px] font-semibold capitalize border transition-all cursor-pointer ${
                        theme === t
                          ? "bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 text-emerald-700 dark:text-emerald-300 ring-1 ring-emerald-500"
                          : "border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Toggles */}
              <div className="flex flex-col gap-4 mt-2">
                <div className="flex justify-between items-center">
                  <span className="text-[13px] text-slate-700 dark:text-slate-300 font-medium">Email digest reports</span>
                  <button
                    onClick={() => setEmailDigest(!emailDigest)}
                    className={`w-10 h-6 rounded-full transition-colors relative flex items-center ${emailDigest ? "bg-[#10b981]" : "bg-slate-200 dark:bg-slate-700"}`}
                  >
                    <div
                      className={`size-4 rounded-full bg-white transition-transform shadow-sm absolute ${emailDigest ? "translate-x-5" : "translate-x-1"}`}
                    />
                  </button>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-[13px] text-slate-700 dark:text-slate-300 font-medium">AI insight alerts</span>
                  <button
                    onClick={() => setAiAlerts(!aiAlerts)}
                    className={`w-10 h-6 rounded-full transition-colors relative flex items-center ${aiAlerts ? "bg-[#10b981]" : "bg-slate-200 dark:bg-slate-700"}`}
                  >
                    <div
                      className={`size-4 rounded-full bg-white transition-transform shadow-sm absolute ${aiAlerts ? "translate-x-5" : "translate-x-1"}`}
                    />
                  </button>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-[13px] text-slate-700 dark:text-slate-300 font-medium">Mention notifications</span>
                  <button
                    onClick={() => setMentionNotifications(!mentionNotifications)}
                    className={`w-10 h-6 rounded-full transition-colors relative flex items-center ${mentionNotifications ? "bg-[#10b981]" : "bg-slate-200 dark:bg-slate-700"}`}
                  >
                    <div
                      className={`size-4 rounded-full bg-white transition-transform shadow-sm absolute ${mentionNotifications ? "translate-x-5" : "translate-x-1"}`}
                    />
                  </button>
                </div>
              </div>

              {/* Connected Accounts */}
              <div className="border-t border-slate-100 dark:border-slate-800 pt-4 mt-2">
                <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-3">
                  Connected Accounts
                </span>
                <div className="flex flex-row flex-wrap gap-2.5">
                  <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#f0fdf4] dark:bg-emerald-950/40 border border-[#dcfce7] dark:border-emerald-800/40 rounded-full text-[#15803d] dark:text-emerald-400 text-[12px] font-semibold">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                    Slack Connected
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#f0fdf4] dark:bg-emerald-950/40 border border-[#dcfce7] dark:border-emerald-800/40 rounded-full text-[#15803d] dark:text-emerald-400 text-[12px] font-semibold">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                    Google Connected
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
