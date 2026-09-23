import React, { useState } from "react";
import { User, Shield, Key, Bell, CreditCard, ChevronDown, Check, Upload, Globe, Slack } from "lucide-react";
import imgProfileAvatar from "../../imports/InspinAppShell/0203bd2613d5605abe749b389b256bf0fd1a56b1.png";

interface ProfileProps {
  onLogout?: () => void;
}

export default function Profile({ onLogout }: ProfileProps) {
  const [fullName, setFullName] = useState("Dr. Aria Thorne");
  const [email, setEmail] = useState("aria.thorne@anthropic.com");
  const [role, setRole] = useState("Lead Researcher");
  const [organization, setOrganization] = useState("Anthropic Research Labs");
  const [timezone, setTimezone] = useState("Pacific Standard Time (PST) - UTC-8");
  const [theme, setTheme] = useState("System Preference");

  const [emailDigest, setEmailDigest] = useState(true);
  const [aiAlerts, setAiAlerts] = useState(true);
  const [mentionNotifications, setMentionNotifications] = useState(true);

  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-120px)] relative overflow-y-auto">
      <div className="flex flex-col gap-[24px] p-[40px] w-full max-w-[1200px] mx-auto pb-32">

        {/* Profile Summary Card */}
        <div className="bg-white rounded-[24px] border border-slate-100 p-6 shadow-sm flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="relative rounded-full size-[72px] overflow-hidden border border-slate-100">
              <img alt="Aria Thorne" className="object-cover size-full" src={imgProfileAvatar} />
            </div>
            <div className="flex flex-col gap-1">
              <h2 className="font-['Inter:Bold',sans-serif] font-bold text-[#0f172a] text-[20px] leading-tight">
                Dr. Aria Thorne
              </h2>
              <div className="text-[13px] text-slate-500 font-medium">
                Lead Researcher <span className="mx-1.5 text-slate-300">•</span> Anthropic Research Labs
              </div>
              <div className="text-[12px] text-slate-400">
                aria.thorne@anthropic.com <span className="mx-1.5 text-slate-300">•</span> Member since January 2024
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 border border-slate-200 rounded-xl text-slate-700 font-semibold text-[13px] hover:bg-slate-50 transition-all cursor-pointer">
              Edit Profile
            </button>
            {/* {onLogout && (
              <button 
                onClick={onLogout}
                className="px-4 py-2 bg-rose-50 border border-rose-200 hover:bg-rose-100/70 rounded-xl text-rose-600 font-semibold text-[13px] transition-all cursor-pointer shadow-sm"
              >
                Sign Out
              </button>
            )} */}
          </div>
        </div>

        {/* 2-Column Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">

          {/* Account Settings Form */}
          <div className="lg:col-span-2 bg-white rounded-[24px] border border-slate-100 p-6 shadow-sm flex flex-col gap-6">
            <h3 className="font-['Inter:Bold',sans-serif] font-bold text-[#0f172a] text-[16px]">
              Account Settings
            </h3>

            {/* Profile upload area */}
            <div className="border border-dashed border-slate-200 rounded-xl p-6 flex flex-row items-center gap-4 bg-slate-50/50">
              <div className="size-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <Upload className="size-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-[13px] font-semibold text-slate-700">Upload a new profile photo</span>
                <span className="text-[11px] text-slate-400">JPEG or PNG up to 5MB</span>
              </div>
            </div>

            {/* Fields */}
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[12px] font-semibold text-slate-600">Full Name</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200/80 focus:border-[#059669] focus:ring-1 focus:ring-[#059669] outline-none text-[13px] font-medium text-slate-800"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[12px] font-semibold text-slate-600">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200/80 focus:border-[#059669] focus:ring-1 focus:ring-[#059669] outline-none text-[13px] font-medium text-slate-800"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[12px] font-semibold text-slate-600">Role / Title</label>
                <input
                  type="text"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200/80 focus:border-[#059669] focus:ring-1 focus:ring-[#059669] outline-none text-[13px] font-medium text-slate-800"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[12px] font-semibold text-slate-600">Organization</label>
                <input
                  type="text"
                  value={organization}
                  onChange={(e) => setOrganization(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200/80 focus:border-[#059669] focus:ring-1 focus:ring-[#059669] outline-none text-[13px] font-medium text-slate-800"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[12px] font-semibold text-slate-600">Time Zone</label>
                <div className="relative">
                  <select
                    value={timezone}
                    onChange={(e) => setTimezone(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200/80 focus:border-[#059669] focus:ring-1 focus:ring-[#059669] outline-none text-[13px] font-medium text-slate-800 appearance-none bg-white"
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

            <button className="w-full py-3 rounded-xl bg-[#059669] hover:bg-[#047857] text-white font-bold text-[14px] transition-colors cursor-pointer mt-2 shadow-sm shadow-emerald-100">
              Save Changes
            </button>
          </div>

          {/* Right Column Statistics & Preferences */}
          <div className="flex flex-col gap-6">

            {/* Research Activity Card */}
            <div className="bg-white rounded-[24px] border border-slate-100 p-6 shadow-sm flex flex-col gap-4">
              <h3 className="font-['Inter:Bold',sans-serif] font-bold text-[#0f172a] text-[15px]">
                Research Activity
              </h3>
              <div className="flex flex-col gap-3 text-[13px] font-medium">
                <div className="flex justify-between items-center py-1">
                  <span className="text-slate-500">Total Projects</span>
                  <span className="text-slate-800 font-bold">24</span>
                </div>
                <div className="flex justify-between items-center py-1 border-t border-slate-50">
                  <span className="text-slate-500">Active Surveys</span>
                  <span className="text-slate-800 font-bold">6</span>
                </div>
                <div className="flex justify-between items-center py-1 border-t border-slate-50">
                  <span className="text-slate-500">AI Insights Generated</span>
                  <span className="text-[#8b5cf6] font-bold">1,847</span>
                </div>
                <div className="flex justify-between items-center py-1 border-t border-slate-50">
                  <span className="text-slate-500">Reports Published</span>
                  <span className="text-[#10b981] font-bold">18</span>
                </div>
              </div>
            </div>

            {/* Preferences Card */}
            <div className="bg-white rounded-[24px] border border-slate-100 p-6 shadow-sm flex flex-col gap-4">
              <h3 className="font-['Inter:Bold',sans-serif] font-bold text-[#0f172a] text-[15px]">
                Preferences
              </h3>

              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">App Theme</label>
                <div className="relative">
                  <select
                    value={theme}
                    onChange={(e) => setTheme(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:border-[#059669] outline-none text-[13px] font-medium text-slate-800 appearance-none bg-white"
                  >
                    <option>System Preference</option>
                    <option>Light Mode</option>
                    <option>Dark Mode</option>
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                    <ChevronDown className="size-4" />
                  </div>
                </div>
              </div>

              {/* Toggles */}
              <div className="flex flex-col gap-4 mt-2">
                <div className="flex justify-between items-center">
                  <span className="text-[13px] text-slate-700 font-medium">Email digest reports</span>
                  <button
                    onClick={() => setEmailDigest(!emailDigest)}
                    className={`w-10 h-6 rounded-full transition-colors relative flex items-center ${emailDigest ? "bg-[#10b981]" : "bg-slate-200"
                      }`}
                  >
                    <div
                      className={`size-4 rounded-full bg-white transition-transform shadow-sm absolute ${emailDigest ? "translate-x-5" : "translate-x-1"
                        }`}
                    />
                  </button>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-[13px] text-slate-700 font-medium">AI insight alerts</span>
                  <button
                    onClick={() => setAiAlerts(!aiAlerts)}
                    className={`w-10 h-6 rounded-full transition-colors relative flex items-center ${aiAlerts ? "bg-[#10b981]" : "bg-slate-200"
                      }`}
                  >
                    <div
                      className={`size-4 rounded-full bg-white transition-transform shadow-sm absolute ${aiAlerts ? "translate-x-5" : "translate-x-1"
                        }`}
                    />
                  </button>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-[13px] text-slate-700 font-medium">Mention notifications</span>
                  <button
                    onClick={() => setMentionNotifications(!mentionNotifications)}
                    className={`w-10 h-6 rounded-full transition-colors relative flex items-center ${mentionNotifications ? "bg-[#10b981]" : "bg-slate-200"
                      }`}
                  >
                    <div
                      className={`size-4 rounded-full bg-white transition-transform shadow-sm absolute ${mentionNotifications ? "translate-x-5" : "translate-x-1"
                        }`}
                    />
                  </button>
                </div>
              </div>

              {/* Connected Accounts */}
              <div className="border-t border-slate-100 pt-4 mt-2">
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-3">
                  Connected Accounts
                </span>
                <div className="flex flex-row flex-wrap gap-2.5">
                  <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#f0fdf4] border border-[#dcfce7] rounded-full text-[#15803d] text-[12px] font-semibold">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                    Slack Connected
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#f0fdf4] border border-[#dcfce7] rounded-full text-[#15803d] text-[12px] font-semibold">
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
