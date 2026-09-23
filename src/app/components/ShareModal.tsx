import React, { useState, useEffect } from "react";
import { X, Search, Check, Copy, Shield, Users, Lock, Globe, Key, HelpCircle } from "lucide-react";
import imgSarah from "../../imports/DonezoDashboard/119adb801822bb7577f873d4b007f7a4899ea16c.png";
import imgJames from "../../imports/DonezoDashboard/33cf7140d91e2d226527cd50794e896f2c531f41.png";
import imgDavid from "../../imports/DonezoDashboard/32d55c0bd3bf8bc9b4cabd65f1ca80f4ee20f935.png";
import imgMarcus from "../../imports/DonezoDashboard/2ff787ab01ae55f30fa18ab6e74e3bc67288cb6a.png";

interface Collaborator {
  name: string;
  email: string;
  role: "Owner" | "Editor" | "Viewer" | "Commenter" | "Admin";
  avatar: string;
  status?: string;
}

interface ShareModalProps {
  onClose: () => void;
  onShareSuccess: () => void;
}

export default function ShareModal({ onClose, onShareSuccess }: ShareModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState<"Editor" | "Viewer" | "Commenter" | "Admin">("Editor");
  const [linkSharingType, setLinkSharingType] = useState<"private" | "org" | "anyone" | "password">("private");
  const [copied, setCopied] = useState(false);
  const [addedMessage, setAddedMessage] = useState<string | null>(null);

  const [collaborators, setCollaborators] = useState<Collaborator[]>([
    { name: "Sarah Chen", email: "sarah.chen@inspin.io", role: "Owner", avatar: imgSarah, status: "Active now" }
  ]);

  const recentCollaborators = [
    { name: "Amit Trivedi", email: "amit@inspin.io", avatar: imgDavid },
    { name: "Vijay Sharma", email: "vijay@inspin.io", avatar: imgMarcus },
    { name: "James O'Brien", email: "james@inspin.io", avatar: imgJames }
  ];

  const handleCopyLink = () => {
    navigator.clipboard.writeText("https://inspin.io/share/cs2026-f8k2m9");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAddCollaborator = (name: string, email: string) => {
    // Avoid double adding
    if (collaborators.some(c => c.name === name)) return;
    
    const newCollaborator: Collaborator = {
      name,
      email,
      role: selectedRole,
      avatar: imgJames, // default fallback
      status: "Just added"
    };

    setCollaborators([...collaborators, newCollaborator]);
    setAddedMessage(`${name} added as ${selectedRole}`);
    setSearchQuery("");
    setTimeout(() => setAddedMessage(null), 3000);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Share Project"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4"
    >
      {/* Modal Card Container */}
      <div className="w-full max-w-[720px] bg-white rounded-[24px] border border-slate-100 shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="flex items-start justify-between p-6 border-b border-slate-100">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <h2 className="font-['Inter:Bold',sans-serif] font-bold text-slate-800 text-[18px]">Share Project</h2>
              <span className="px-2 py-0.5 rounded-md bg-[#e8f7f0] text-[#059669] text-[10px] font-bold tracking-wide uppercase">Active</span>
            </div>
            <p className="text-[12px] text-slate-400 font-medium">Onboarding Issues • Created by Sarah Chen</p>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors text-slate-400 hover:text-slate-600 cursor-pointer">
            <X className="size-5" />
          </button>
        </div>

        {/* Modal Content - Two Columns */}
        <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 md:grid-cols-12 gap-6 border-b border-slate-100 max-h-[500px]">
          
          {/* Left Column (Collaborators & Inviting) */}
          <div className="md:col-span-7 flex flex-col gap-4">
            
            {/* Invite People Input */}
            <div className="flex flex-col gap-1.5 relative">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Invite People</label>
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search by name or email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-[#059669] outline-none text-[13px] font-medium"
                />
              </div>

              {/* Added Feedback Toast */}
              {addedMessage && (
                <div className="text-[12px] text-[#059669] font-semibold flex items-center gap-1.5 mt-1 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-100">
                  <Check className="size-3.5" />
                  {addedMessage}
                </div>
              )}

              {/* Auto-suggest dropdown when typing */}
              {searchQuery && (
                <div className="absolute top-[68px] left-0 right-0 bg-white border border-slate-200 shadow-lg rounded-xl p-1.5 z-20 flex flex-col gap-0.5">
                  {recentCollaborators
                    .filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.email.toLowerCase().includes(searchQuery.toLowerCase()))
                    .map(c => (
                      <button
                        key={c.email}
                        onClick={() => handleAddCollaborator(c.name, c.email)}
                        className="flex items-center gap-2.5 p-2 w-full text-left rounded-lg hover:bg-slate-50 text-[13px] font-medium text-slate-700 cursor-pointer"
                      >
                        <img alt="" className="size-6 rounded-full object-cover" src={c.avatar} />
                        <div className="flex flex-col">
                          <span>{c.name}</span>
                          <span className="text-[10px] text-slate-400">{c.email}</span>
                        </div>
                      </button>
                    ))
                  }
                </div>
              )}
            </div>

            {/* Recent Collaborators Quick Actions */}
            {!searchQuery && (
              <div className="flex flex-col gap-2">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Recent Collaborators</span>
                <div className="flex flex-row flex-wrap gap-2">
                  {recentCollaborators.map(c => (
                    <button
                      key={c.email}
                      onClick={() => handleAddCollaborator(c.name, c.email)}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 border border-slate-200 hover:bg-slate-100 rounded-full text-[12px] font-semibold text-slate-600 transition-colors cursor-pointer"
                    >
                      <img alt="" className="size-5 rounded-full object-cover" src={c.avatar} />
                      {c.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* People with Access List */}
            <div className="flex flex-col gap-2.5 mt-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">People with Access</span>
                <span className="text-[11px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">{collaborators.length}</span>
              </div>
              
              <div className="flex flex-col gap-2">
                {collaborators.map((c) => (
                  <div key={c.email} className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50/50 transition-colors">
                    <div className="flex items-center gap-2.5">
                      <img alt="" className="size-8 rounded-full object-cover" src={c.avatar} />
                      <div className="flex flex-col">
                        <span className="text-[13px] font-bold text-slate-800 leading-snug">{c.name}</span>
                        <span className="text-[11px] text-slate-400">{c.email}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-[11px] px-2.5 py-1 rounded-lg font-bold border ${
                        c.role === "Owner" 
                          ? "bg-slate-50 border-slate-200 text-slate-500" 
                          : "bg-emerald-50 border-[#a7f3d0] text-[#059669]"
                      }`}>
                        {c.role}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column (Roles & Link Sharing) */}
          <div className="md:col-span-5 flex flex-col gap-4 border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-6">
            
            {/* Invite Role Picker */}
            <div className="flex flex-col gap-2">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Invite Role</span>
              
              <div className="flex flex-col gap-2">
                {[
                  { id: "Admin", label: "Admin", desc: "Full access including sharing settings" },
                  { id: "Editor", label: "Editor", desc: "Can view, edit response rules, and update project settings" },
                  { id: "Commenter", label: "Commenter", desc: "Can view and leave comments" },
                  { id: "Viewer", label: "Viewer", desc: "Can view analytics reports and responses only" }
                ].map((roleOption) => (
                  <div
                    key={roleOption.id}
                    onClick={() => setSelectedRole(roleOption.id as any)}
                    className={`p-3 rounded-xl border transition-all cursor-pointer flex justify-between items-center ${
                      selectedRole === roleOption.id
                        ? "bg-[#e8f7f0]/40 border-[#059669]"
                        : "border-slate-100 hover:border-slate-200"
                    }`}
                  >
                    <div className="flex flex-col gap-0.5 pr-2">
                      <span className="text-[12.5px] font-bold text-slate-800">{roleOption.label}</span>
                      <span className="text-[10px] text-slate-400 font-medium leading-normal">{roleOption.desc}</span>
                    </div>
                    <div className={`size-4 rounded-full border flex items-center justify-center ${
                      selectedRole === roleOption.id ? "border-[#059669] bg-[#059669] text-white" : "border-slate-200"
                    }`}>
                      {selectedRole === roleOption.id && <Check className="size-2.5 stroke-[3]" />}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Link Sharing Mode */}
            <div className="flex flex-col gap-2 border-t border-slate-100 pt-4 mt-2">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Link Sharing</span>
              
              <div className="flex flex-col gap-2">
                {[
                  { id: "private", label: "Private (Only invited people)" },
                  { id: "org", label: "Organization (Anyone in domain)" },
                  { id: "anyone", label: "Anyone with Link" },
                  { id: "password", label: "Password Protected" },
                ].map((opt) => (
                  <label key={opt.id} className="flex items-center gap-2 text-[12.5px] font-semibold text-slate-700 cursor-pointer">
                    <input
                      type="radio"
                      name="linkSharing"
                      checked={linkSharingType === opt.id}
                      onChange={() => setLinkSharingType(opt.id as any)}
                      className="accent-[#059669]"
                    />
                    {opt.label}
                  </label>
                ))}
              </div>
            </div>

          </div>

        </div>

        {/* Modal Link Copy Section */}
        <div className="px-6 py-4 bg-slate-50/50 border-b border-slate-100 flex flex-col gap-2">
          <div className="flex items-center justify-between text-[11px] font-semibold text-slate-400">
            <span>Link Sharing Status</span>
            <span className="text-[#059669] bg-[#e8f7f0] px-2 py-0.5 rounded font-bold">30 days left</span>
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              readOnly
              value="https://inspin.io/share/cs2026-f8k2m9"
              className="flex-1 bg-white border border-slate-200 rounded-xl px-3 py-2 text-[13px] font-medium text-slate-600 outline-none"
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
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-400">
            <Lock className="size-3.5 text-slate-400" />
            End-to-end encrypted sharing settings
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-slate-600 hover:text-slate-800 text-[13px] font-semibold cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={onShareSuccess}
              className="px-5 py-2.5 rounded-xl bg-[#059669] hover:bg-[#047857] text-white text-[13px] font-bold cursor-pointer transition-colors shadow-sm shadow-emerald-100"
            >
              Send Invites
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
