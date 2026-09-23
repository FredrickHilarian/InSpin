import React, { useState } from "react";
import { Check, Copy, ExternalLink, HelpCircle, ArrowLeft, Plus } from "lucide-react";

interface Invitation {
  name: string;
  email?: string;
  role: string;
  status: "Sent" | "Pending";
  color: string;
}

interface SharedSuccessProps {
  onBack: () => void;
  onOpenProject: () => void;
  onSendAnother: () => void;
  onViewActivity: () => void;
}

const INVITATIONS: Invitation[] = [
  { name: "Amit Trivedi", role: "Editor", status: "Sent", color: "MR" },
  { name: "Vijay Sharma", role: "Viewer", status: "Sent", color: "PP" },
  { name: "James O'Brien", role: "Commenter", status: "Sent", color: "JO" },
  { name: "jennifer.walsh@acmecorp.com", role: "External - Viewer", status: "Pending", color: "JW" }
];

export default function SharedSuccess({ onBack, onOpenProject, onSendAnother, onViewActivity }: SharedSuccessProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText("https://inspin.io/share/cs2026-f8k2m9");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-120px)] relative overflow-y-auto bg-slate-50/30">
      <div className="flex flex-col items-center justify-center p-[40px] w-full max-w-[800px] mx-auto pb-32">
        
        {/* Animated Checkmark Illustration */}
        <div className="relative size-[100px] mb-6 flex items-center justify-center">
          {/* Radial layout decoration dots */}
          <div className="absolute top-1 left-2 size-2 bg-teal-400 rounded-full animate-bounce" />
          <div className="absolute top-4 right-1 size-2.5 bg-[#8b5cf6] rounded-full" />
          <div className="absolute bottom-2 left-6 size-2 bg-amber-400 rounded-full" />
          <div className="absolute bottom-6 right-2 size-1.5 bg-emerald-400 rounded-full" />
          
          <div className="size-[72px] bg-[#10b981] rounded-full flex items-center justify-center text-white shadow-lg shadow-emerald-100 ring-4 ring-emerald-50">
            <Check className="size-10 stroke-[3]" />
          </div>
        </div>

        {/* Success Card Wrapper */}
        <div className="w-full bg-white rounded-[24px] border border-slate-100 shadow-sm p-8 flex flex-col gap-6 text-center max-w-[580px]">
          
          <div className="flex flex-col gap-1.5">
            <h1 className="font-['Inter:Bold',sans-serif] font-bold text-slate-800 text-[22px] leading-tight">
              Project Shared Successfully
            </h1>
            <p className="text-[13px] text-slate-400 font-medium">
              Your research is now accessible to your team
            </p>
          </div>

          {/* Metrics summary row */}
          <div className="grid grid-cols-3 divide-x divide-slate-100 border-y border-slate-100/60 py-4 mt-2">
            <div className="flex flex-col gap-0.5">
              <span className="text-[20px] font-bold text-slate-800 leading-tight">4</span>
              <span className="text-[11px] text-slate-400 font-semibold">Collaborators</span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-[20px] font-bold text-[#8b5cf6] leading-tight">1</span>
              <span className="text-[11px] text-slate-400 font-semibold">External Guest</span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-[20px] font-bold text-[#10b981] leading-tight">2</span>
              <span className="text-[11px] text-slate-400 font-semibold">Teams Invited</span>
            </div>
          </div>

          {/* Shared Link Copy Box */}
          <div className="flex flex-col gap-2 mt-2 text-left">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Shared Link</label>
            <div className="flex gap-2">
              <input
                type="text"
                readOnly
                value="https://inspin.io/share/cs2026-f8k2m9"
                className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-[13px] font-medium text-slate-600 outline-none"
              />
              <button
                onClick={handleCopyLink}
                className={`px-4 py-2 rounded-xl font-bold text-[12px] flex items-center gap-1.5 cursor-pointer shadow-sm transition-all border ${
                  copied 
                    ? "bg-[#e8f7f0] border-[#a7f3d0] text-[#059669]" 
                    : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                }`}
              >
                {copied ? (
                  <>
                    <Check className="size-4" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="size-3.5" />
                    Copy Link
                  </>
                )}
              </button>
            </div>
            <span className="text-[11px] text-slate-400 font-medium">
              Link expires Aug 15, 2026 • Password protected
            </span>
          </div>

          {/* Invitations Sent List */}
          <div className="flex flex-col gap-3 text-left mt-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Invitations Sent</span>
            <div className="flex flex-col gap-2">
              {INVITATIONS.map((inv) => (
                <div key={inv.name} className="flex items-center justify-between p-2 rounded-xl bg-slate-50/50 border border-slate-100/60">
                  <div className="flex items-center gap-2">
                    <div className="size-7 bg-teal-50 border border-teal-100 rounded-full flex items-center justify-center text-[11px] font-bold text-[#059669]">
                      {inv.color}
                    </div>
                    <span className="text-[13px] font-bold text-slate-700 truncate max-w-[180px]">{inv.name}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] font-bold">
                    <span className="px-2 py-0.5 rounded-lg bg-slate-100 text-slate-500 font-semibold">{inv.role}</span>
                    <span className={`px-2 py-0.5 rounded-lg flex items-center gap-1 ${
                      inv.status === "Sent" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"
                    }`}>
                      <Check className="size-3" />
                      {inv.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Success Actions */}
        <div className="flex flex-col items-center gap-4 mt-8 w-full max-w-[580px]">
          <div className="flex gap-3 justify-center w-full">
            <button
              onClick={onOpenProject}
              className="px-6 py-3 rounded-xl bg-[#059669] hover:bg-[#047857] text-white font-bold text-[14px] flex items-center gap-1.5 cursor-pointer shadow-sm transition-colors"
            >
              Open Project
              <ExternalLink className="size-4" />
            </button>
            <button
              onClick={onViewActivity}
              className="px-6 py-3 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-[14px] flex items-center gap-1.5 cursor-pointer shadow-sm transition-all"
            >
              View Activity
            </button>
          </div>

          <div className="flex items-center gap-4 text-[12.5px] font-semibold text-slate-500 mt-2">
            <button onClick={onSendAnother} className="text-[#059669] hover:underline flex items-center gap-1 cursor-pointer">
              <Plus className="size-3.5" />
              Send Another Invitation
            </button>
            <span className="text-slate-300">|</span>
            <button onClick={onBack} className="text-slate-500 hover:underline flex items-center gap-1 cursor-pointer">
              <ArrowLeft className="size-3.5" />
              Back to Settings
            </button>
          </div>
        </div>

        {/* Footer note */}
        <div className="mt-12 text-center flex flex-col gap-1 text-[11px] font-semibold text-slate-400 max-w-[400px]">
          <p>All collaborators will receive an email notification with access instructions.</p>
          <p>Manage permissions anytime in Settings → Sharing</p>
        </div>

      </div>
    </div>
  );
}
