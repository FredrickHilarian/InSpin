import React, { useState } from "react";
import { Search, ChevronDown, Check, UserPlus, Info, AlertTriangle, Copy, QrCode, Eye, RotateCw, ExternalLink, Calendar, Plus, Mail, ShieldAlert, Key, Users, Globe, Lock } from "lucide-react";
import imgSarah from "../../imports/DonezoDashboard/119adb801822bb7577f873d4b007f7a4899ea16c.png";
import imgJames from "../../imports/DonezoDashboard/33cf7140d91e2d226527cd50794e896f2c531f41.png";
import imgDavid from "../../imports/DonezoDashboard/32d55c0bd3bf8bc9b4cabd65f1ca80f4ee20f935.png";
import imgMarcus from "../../imports/DonezoDashboard/2ff787ab01ae55f30fa18ab6e74e3bc67288cb6a.png";

interface SharingSettingsProps {
  onSendInvitations: () => void;
  onOpenActivityLog: () => void;
}

export default function SharingSettings({ onSendInvitations, onOpenActivityLog }: SharingSettingsProps) {
  const [activeSubTab, setActiveSubTab] = useState<"invite" | "permissions" | "link" | "guests">("invite");

  // Invite Tab States
  const [selectedCollaborators, setSelectedCollaborators] = useState<string[]>(["Amit Trivedi", "Vijay Sharma", "James O'Brien"]);
  const [inviteEmail, setInviteEmail] = useState("");
  const [pendingInvitations, setPendingInvitations] = useState([
    { email: "client@acmecorp.com", status: "Pending Invitation" }
  ]);

  // Permissions Tab States
  const [collaborators, setCollaborators] = useState([
    { name: "Sarah Chen", role: "Owner", email: "sarah.chen@inspin.io", status: "Active now", avatar: imgSarah },
    { name: "Amit Trivedi", role: "Admin", email: "amit.trivedi@inspin.io", status: "Active 2h ago", avatar: imgDavid },
    { name: "Aisha Johnson", role: "Admin", email: "aisha.j@inspin.io", status: "Active 1d ago", avatar: imgMarcus },
    { name: "Vijay Sharma", role: "Editor", email: "vijay.sharma@inspin.io", status: "Active 5h ago", avatar: imgJames },
    { name: "Tom Nakamura", role: "Commenter", email: "tom.n@inspin.io", status: "Active 3d ago", avatar: imgJames },
    { name: "James O'Brien", role: "Viewer", email: "james.o@inspin.io", status: "Active 1w ago", avatar: imgJames }
  ]);
  const [roleWarningUser, setRoleWarningUser] = useState<string | null>(null);

  // Link Sharing Tab States
  const [accessLevel, setAccessLevel] = useState<"private" | "org" | "anyone" | "password">("anyone");
  const [passwordProtection, setPasswordProtection] = useState(false);
  const [expirationDate, setExpirationDate] = useState(true);
  const [maxUses, setMaxUses] = useState(true);
  const [maxUsesCount, setMaxUsesCount] = useState(50);
  const [disableDownload, setDisableDownload] = useState(true);
  const [allowComments, setAllowComments] = useState(true);
  const [allowCopy, setAllowCopy] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);

  // External Guests Tab States
  const [guestEmail, setGuestEmail] = useState("jennifer.walsh@acmecorp.com");
  const [guestOrg, setGuestOrg] = useState("Acme Corp");
  const [guestRole, setGuestRole] = useState("VP of Product");
  const [guestAccessLevel, setGuestAccessLevel] = useState<"viewer" | "commenter" | "editor">("viewer");
  const [guestRequireNda, setGuestRequireNda] = useState(true);
  const [personalMessage, setPersonalMessage] = useState(
    "Hi Jennifer, I'd like to share our Onboarding Issues research findings with you. The key insights around onboarding drop-offs and sign-up friction should be particularly relevant to our upcoming product roadmap discussion."
  );
  const [sharedContent, setSharedContent] = useState({
    executiveSummary: true,
    keyFindings: true,
    aiInsights: true,
    charts: true,
    rawSurvey: false,
    respondentDetails: false
  });

  const toggleCollaborator = (name: string) => {
    if (selectedCollaborators.includes(name)) {
      setSelectedCollaborators(selectedCollaborators.filter(c => c !== name));
    } else {
      setSelectedCollaborators([...selectedCollaborators, name]);
    }
  };

  const handleRoleChange = (name: string, newRole: string) => {
    if (name === "Aisha Johnson" && newRole !== "Admin") {
      setRoleWarningUser(newRole);
    } else {
      setCollaborators(collaborators.map(c => c.name === name ? { ...c, role: newRole } : c));
      setRoleWarningUser(null);
    }
  };

  const confirmRoleChange = () => {
    if (roleWarningUser) {
      setCollaborators(collaborators.map(c => c.name === "Aisha Johnson" ? { ...c, role: roleWarningUser } : c));
      setRoleWarningUser(null);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText("https://inspin.io/share/cs2026-f8k2m9y4x1v");
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2000);
  };

  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-120px)] relative overflow-y-auto">
      <div className="flex flex-col gap-[20px] p-[32px] w-full max-w-[1440px] mx-auto pb-40">
        
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-[12px] font-semibold text-slate-400">
          <span>Settings</span>
          <span>&gt;</span>
          <span>Sharing</span>
          <span>&gt;</span>
          <span className="text-[#059669] capitalize">{activeSubTab}</span>
        </div>

        {/* Header Title */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <h1 className="font-['Inter:Bold',sans-serif] font-bold text-slate-800 text-[24px] leading-tight flex items-center gap-2">
              {activeSubTab === "invite" && "Invite Collaborators"}
              {activeSubTab === "permissions" && "Permission Management"}
              {activeSubTab === "link" && "Link Sharing"}
              {activeSubTab === "guests" && "Invite External Guest"}
            </h1>
            <p className="text-[13px] text-slate-400 font-medium">
              {activeSubTab === "invite" && "Add teammates, departments, or external guests to this project"}
              {activeSubTab === "permissions" && "Control access levels for all project collaborators"}
              {activeSubTab === "link" && "Configure secure access links for external stakeholders"}
              {activeSubTab === "guests" && "Share research findings securely with clients and stakeholders outside your organization"}
            </p>
          </div>

          {activeSubTab === "permissions" && (
            <div className="flex items-center gap-2.5">
              <button
                onClick={onOpenActivityLog}
                className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-slate-700 text-[13px] font-semibold flex items-center gap-1.5 hover:bg-slate-50 cursor-pointer shadow-sm"
              >
                <RotateCw className="size-4 text-slate-400" />
                Activity Log
              </button>
              <button
                onClick={() => setActiveSubTab("invite")}
                className="px-4 py-2 bg-[#059669] hover:bg-[#047857] text-white rounded-xl text-[13px] font-semibold flex items-center gap-1.5 shadow-sm shadow-emerald-100 cursor-pointer"
              >
                <Plus className="size-4" />
                Invite People
              </button>
            </div>
          )}
        </div>

        {/* Tab Navigation Menu */}
        <div className="bg-white/80 border border-slate-100 p-1.5 rounded-xl flex gap-1 shadow-sm">
          {[
            { id: "invite", label: "Invite" },
            { id: "permissions", label: "Permissions" },
            { id: "link", label: "Link Sharing" },
            { id: "guests", label: "External Guests" }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id as any)}
              className={`flex-1 py-2.5 rounded-lg text-[13px] font-bold transition-all cursor-pointer ${
                activeSubTab === tab.id
                  ? "bg-[#e8f7f0] text-[#059669] shadow-sm"
                  : "text-slate-500 hover:text-slate-700 hover:bg-slate-50"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ─── TAB CONTENT: INVITE ────────────────────────────────────────── */}
        {activeSubTab === "invite" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Left Column (Search & Suggestions) */}
            <div className="lg:col-span-8 flex flex-col gap-6">
              
              {/* Search Block */}
              <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm flex items-center gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search by name, email, team, or department..."
                    className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-[#059669] outline-none text-[13px] font-medium"
                  />
                </div>
                <div className="flex gap-1.5 text-[12px] font-bold">
                  {["All", "Researchers", "Stakeholders", "External"].map((f, i) => (
                    <span
                      key={f}
                      className={`px-2.5 py-1.5 rounded-lg cursor-pointer transition-colors ${
                        i === 0 ? "bg-[#059669] text-white" : "bg-slate-50 border border-slate-100 text-slate-600 hover:bg-slate-100"
                      }`}
                    >
                      {f}
                    </span>
                  ))}
                </div>
              </div>

              {/* Suggested for You Grid */}
              <div className="flex flex-col gap-3">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                  Suggested for You (Based on recent projects and activity)
                </span>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { name: "Amit Trivedi", role: "Sales Manager", dept: "Sales Team", loc: "San Francisco", av: "MR", active: "Active now" },
                    { name: "Vijay Sharma", role: "UX Designer", dept: "Product Team", loc: "London", av: "PP", active: "Active 1h ago" },
                    { name: "James O'Brien", role: "Data Scientist", dept: "Analytics Team", loc: "New York", av: "JO", active: "Active 3h ago" }
                  ].map((card) => {
                    const isSelected = selectedCollaborators.includes(card.name);
                    return (
                      <div
                        key={card.name}
                        className={`bg-white rounded-2xl border p-5 shadow-sm flex flex-col justify-between min-h-[220px] transition-all relative ${
                          isSelected ? "border-[#059669] ring-2 ring-emerald-50" : "border-slate-100"
                        }`}
                      >
                        <span className="text-[9px] text-slate-400 font-bold flex items-center gap-1 absolute top-3.5 left-4">
                          <span className="size-1.5 rounded-full bg-emerald-500" />
                          {card.active}
                        </span>

                        <div className="flex flex-col items-center text-center mt-4">
                          <div className="size-10 rounded-full bg-teal-50 border border-teal-100 text-teal-700 flex items-center justify-center text-[12px] font-bold mb-2">
                            {card.av}
                          </div>
                          <span className="text-[13.5px] font-bold text-slate-800">{card.name}</span>
                          <span className="text-[11px] text-slate-400 font-semibold">{card.role}</span>
                          <span className="text-[10px] text-slate-400 font-medium mt-1">{card.loc}</span>
                          <span className="px-2 py-0.5 rounded bg-slate-50 border border-slate-100 text-[10px] font-semibold text-slate-400 mt-2">
                            {card.dept}
                          </span>
                        </div>

                        <div className="mt-4 flex flex-col gap-2">
                          <div className="relative">
                            <select className="w-full text-slate-700 text-[11px] font-bold border border-slate-200 rounded-lg py-1.5 px-3 bg-white appearance-none">
                              <option>Editor</option>
                              <option>Viewer</option>
                              <option>Admin</option>
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 size-3 text-slate-400 pointer-events-none" />
                          </div>
                          <button
                            onClick={() => toggleCollaborator(card.name)}
                            className={`w-full py-1.5 rounded-lg text-[11.5px] font-bold transition-all cursor-pointer ${
                              isSelected 
                                ? "bg-[#059669] text-white" 
                                : "border border-[#059669] text-[#059669] hover:bg-emerald-50/50"
                            }`}
                          >
                            {isSelected ? "Invite" : "Invite"}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Recent Collaborators */}
              <div className="flex flex-col gap-3">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                  Recent Collaborators
                </span>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { name: "Elena Vasquez", role: "Product...", desc: "Mobile Ap...", av: imgSarah },
                    { name: "Tom Nakamura", role: "UX Designer", desc: "Design Spr...", av: imgMarcus },
                    { name: "Aisha Johnson", role: "VP Research", desc: "Global Per...", av: imgDavid },
                    { name: "David Kim", role: "Engineer", desc: "Platform R...", av: imgSarah }
                  ].map((user) => {
                    const isSelected = selectedCollaborators.includes(user.name);
                    return (
                      <div key={user.name} className="bg-white rounded-2xl border border-slate-100 p-3 shadow-sm flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <img alt="" className="size-7 rounded-full object-cover" src={user.av} />
                          <div className="flex flex-col truncate">
                            <span className="text-[12px] font-bold text-slate-800 truncate leading-snug">{user.name}</span>
                            <span className="text-[10px] text-slate-400 font-medium truncate">{user.role}</span>
                          </div>
                        </div>
                        <button
                          onClick={() => toggleCollaborator(user.name)}
                          className={`size-6 rounded-lg flex items-center justify-center border transition-colors cursor-pointer ${
                            isSelected ? "bg-[#059669] border-[#059669] text-white" : "border-slate-200 text-slate-400 hover:bg-slate-50"
                          }`}
                        >
                          <Plus className="size-3.5" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Teams */}
              <div className="flex flex-col gap-3">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                  Teams
                </span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { name: "Research Team", count: 8, tags: ["UX Research", "Design", "Prototyping"] },
                    { name: "UX Designers", count: 12, tags: ["Data Science", "Product", "Mixpanel"] }
                  ].map((team) => (
                    <div key={team.name} className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm flex flex-col justify-between min-h-[140px]">
                      <div className="flex flex-col gap-2">
                        <span className="text-[13.5px] font-bold text-slate-800">{team.name}</span>
                        <span className="text-[11px] text-slate-400 font-medium">{team.count} members</span>
                        <div className="flex gap-1.5">
                          {team.tags.map(t => (
                            <span key={t} className="px-2 py-0.5 rounded bg-slate-50 border border-slate-100 text-[10px] font-semibold text-slate-400">{t}</span>
                          ))}
                        </div>
                      </div>
                      <button className="w-full py-2 bg-slate-50 border border-slate-200 hover:bg-slate-100 rounded-xl text-[12px] font-bold text-[#0f172a] transition-all cursor-pointer mt-4">
                        Invite Entire Team
                      </button>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Column (Departments & External Email Form) */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              
              {/* Departments Card */}
              <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm flex flex-col gap-4">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                  <Users className="size-4 text-slate-400" />
                  Departments
                </span>
                <div className="flex flex-col gap-3">
                  {[
                    { name: "Design", count: 24 },
                    { name: "Product", count: 18 },
                    { name: "Engineering", count: 42 }
                  ].map((dept) => (
                    <div key={dept.name} className="flex items-center justify-between p-2 rounded-xl bg-slate-50/50 border border-slate-100/50">
                      <div className="flex items-center gap-2">
                        <div className="size-7 bg-slate-100 rounded-lg flex items-center justify-center text-[11px] font-bold text-slate-500">
                          {dept.name.charAt(0)}
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[12.5px] font-bold text-slate-700">{dept.name}</span>
                          <span className="text-[10px] text-slate-400 font-semibold">{dept.count} members</span>
                        </div>
                      </div>
                      <button className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-[11px] font-bold text-slate-600 hover:bg-slate-50 shadow-sm cursor-pointer">
                        Add All
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* External Guests Card */}
              <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm flex flex-col gap-4">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                  <Mail className="size-4 text-slate-400" />
                  External Guests
                </span>

                <div className="flex flex-col gap-3">
                  <div className="flex flex-col gap-1">
                    <label className="text-[11px] font-semibold text-slate-500">Invite by Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                      <input
                        type="email"
                        placeholder="Enter email address..."
                        value={inviteEmail}
                        onChange={(e) => setInviteEmail(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-[#059669] outline-none text-[13px]"
                      />
                    </div>
                  </div>
                  <button className="text-[#059669] text-[12px] font-bold flex items-center gap-1 hover:underline cursor-pointer">
                    <Plus className="size-3.5" /> Add another
                  </button>
                </div>

                <div className="border-t border-slate-100 pt-4 mt-2 flex flex-col gap-2.5">
                  {pendingInvitations.map((inv) => (
                    <div key={inv.email} className="flex justify-between items-center bg-slate-50 border border-slate-100 rounded-xl p-3">
                      <div className="flex flex-col truncate pr-2">
                        <span className="text-[12px] font-bold text-slate-700 truncate leading-snug">{inv.email}</span>
                        <span className="text-[10px] text-amber-600 font-semibold">{inv.status}</span>
                      </div>
                      <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500">
                        <button className="text-[#059669] hover:underline">Resend</button>
                        <span>•</span>
                        <button className="text-rose-600 hover:underline">Remove</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        )}

        {/* ─── TAB CONTENT: PERMISSIONS ──────────────────────────────────── */}
        {activeSubTab === "permissions" && (
          <div className="flex flex-col gap-6">
            
            {/* Permission Levels Cheat Sheet Card */}
            <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm flex flex-col gap-4">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                Permission Levels
              </span>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {[
                  { title: "Owner", color: "bg-teal-50 border-teal-100 text-teal-700", desc: "Full control. Transfer ownership, delete project, manage all settings." },
                  { title: "Admin", color: "bg-slate-900 text-white border-transparent", desc: "Manage members, change permissions, edit and share findings." },
                  { title: "Editor", color: "bg-emerald-50 border-emerald-100 text-emerald-700", desc: "Create and edit findings, add comments, export data." },
                  { title: "Commenter", color: "bg-amber-50 border-amber-100 text-amber-700", desc: "View all content, leave comments and annotations." },
                  { title: "Viewer", color: "bg-slate-50 border-slate-200 text-slate-600", desc: "Read-only access to shared findings and reports." }
                ].map((level) => (
                  <div key={level.title} className="flex flex-col gap-1.5 border border-slate-100 rounded-xl p-3.5 bg-slate-50/30">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold w-fit uppercase ${level.color}`}>
                      {level.title}
                    </span>
                    <p className="text-[10px] text-slate-500 font-medium leading-normal">{level.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Collaborators List Card */}
            <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm flex flex-col gap-6">
              
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <span className="font-['Inter:Bold',sans-serif] font-bold text-slate-800 text-[16px]">6 Collaborators</span>
                <div className="flex gap-4 text-[12px] font-bold text-slate-500">
                  <span className="text-[#059669] border-b-2 border-[#059669] pb-4 cursor-pointer">All (6)</span>
                  <span className="hover:text-slate-800 pb-4 cursor-pointer">Admins (2)</span>
                  <span className="hover:text-slate-800 pb-4 cursor-pointer">Editors (1)</span>
                  <span className="hover:text-slate-800 pb-4 cursor-pointer">Commenters (1)</span>
                  <span className="hover:text-slate-800 pb-4 cursor-pointer">Viewers (2)</span>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                {collaborators.map((c) => {
                  const hasWarning = c.name === "Aisha Johnson" && roleWarningUser !== null;
                  return (
                    <div key={c.name} className="flex flex-col gap-2">
                      <div className="flex items-center justify-between p-3.5 rounded-xl border border-slate-50 bg-white shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center gap-3">
                          <img alt="" className="size-9 rounded-full object-cover" src={c.avatar} />
                          <div className="flex flex-col">
                            <span className="text-[13.5px] font-bold text-slate-800 leading-snug">{c.name}</span>
                            <span className="text-[11px] text-slate-400 font-semibold">{c.email}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-6">
                          <span className="text-[11px] text-slate-400 font-semibold">{c.status}</span>
                          {c.role === "Owner" ? (
                            <div className="flex items-center gap-2">
                              <span className="px-2.5 py-1 bg-teal-50 border border-teal-100 text-teal-700 text-[11px] font-bold rounded-lg uppercase">
                                Owner
                              </span>
                              <button className="text-[11.5px] text-[#059669] font-bold hover:underline">
                                Transfer Ownership
                              </button>
                            </div>
                          ) : (
                            <div className="relative">
                              <select
                                value={c.role}
                                onChange={(e) => handleRoleChange(c.name, e.target.value)}
                                className="px-3 py-1.5 text-[11px] font-bold text-slate-700 border border-slate-200 rounded-lg bg-white outline-none cursor-pointer appearance-none pr-8 min-w-[120px]"
                              >
                                <option>Admin</option>
                                <option>Editor</option>
                                <option>Commenter</option>
                                <option>Viewer</option>
                              </select>
                              <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 size-3.5 text-slate-400 pointer-events-none" />
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Warning box for Aisha Johnson role downgrade */}
                      {hasWarning && (
                        <div className="bg-amber-50 border border-amber-200/80 rounded-xl p-3.5 flex items-center justify-between text-[12.5px] font-semibold text-amber-800 animate-in slide-in-from-top-1">
                          <span className="flex items-center gap-2">
                            <AlertTriangle className="size-4 text-amber-600 shrink-0" />
                            Removing admin access from Aisha Johnson will revoke their ability to manage members and sharing settings. This action can be reversed.
                          </span>
                          <div className="flex gap-2 shrink-0">
                            <button onClick={() => setRoleWarningUser(null)} className="px-3 py-1.5 rounded-lg text-slate-500 hover:text-slate-700 bg-white border border-slate-200">
                              Cancel
                            </button>
                            <button onClick={confirmRoleChange} className="px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white">
                              Confirm Change
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

            </div>

          </div>
        )}

        {/* ─── TAB CONTENT: LINK SHARING ─────────────────────────────────── */}
        {activeSubTab === "link" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Column 1: Configs */}
            <div className="lg:col-span-8 flex flex-col gap-6">
              
              {/* Access Level Selector */}
              <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm flex flex-col gap-4">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Access Level</span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { id: "private", title: "Private", desc: "Only invited collaborators can access", icon: Lock },
                    { id: "org", title: "Organization", desc: "Anyone in your organization can access", icon: Users },
                    { id: "anyone", title: "Anyone with Link", desc: "Anyone with this link can view", icon: Globe },
                    { id: "password", title: "Password Protected", desc: "Requires password to access", icon: Key }
                  ].map((level) => (
                    <div
                      key={level.id}
                      onClick={() => setAccessLevel(level.id as any)}
                      className={`p-4 rounded-xl border cursor-pointer flex gap-3.5 transition-all ${
                        accessLevel === level.id
                          ? "bg-[#e8f7f0]/30 border-[#059669]"
                          : "border-slate-100 hover:border-slate-200"
                      }`}
                    >
                      <input
                        type="radio"
                        checked={accessLevel === level.id}
                        onChange={() => {}}
                        className="accent-[#059669] mt-0.5"
                      />
                      <div className="flex flex-col gap-0.5">
                        <span className="text-[13.5px] font-bold text-slate-800 flex items-center gap-1.5">
                          <level.icon className="size-4 text-slate-500" />
                          {level.title}
                        </span>
                        <span className="text-[11px] text-slate-400 font-semibold">{level.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Security Settings Switches */}
              <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm flex flex-col gap-4">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block border-b border-slate-100 pb-2">
                  Security Settings
                </span>

                <div className="flex flex-col gap-4">
                  
                  <div className="flex justify-between items-center">
                    <span className="text-[13px] text-slate-700 font-medium">Password Protection</span>
                    <button
                      onClick={() => setPasswordProtection(!passwordProtection)}
                      className={`w-10 h-6 rounded-full transition-colors relative flex items-center ${
                        passwordProtection ? "bg-[#10b981]" : "bg-slate-200"
                      }`}
                    >
                      <div className={`size-4 rounded-full bg-white transition-transform absolute ${passwordProtection ? "translate-x-5" : "translate-x-1"}`} />
                    </button>
                  </div>

                  <div className="flex flex-col gap-3">
                    <div className="flex justify-between items-center">
                      <span className="text-[13px] text-slate-700 font-medium">Expiration Date</span>
                      <button
                        onClick={() => setExpirationDate(!expirationDate)}
                        className={`w-10 h-6 rounded-full transition-colors relative flex items-center ${
                          expirationDate ? "bg-[#10b981]" : "bg-slate-200"
                        }`}
                      >
                        <div className={`size-4 rounded-full bg-white transition-transform absolute ${expirationDate ? "translate-x-5" : "translate-x-1"}`} />
                      </button>
                    </div>
                    {expirationDate && (
                      <div className="flex items-center gap-2 p-2 bg-slate-50 border border-slate-100 rounded-xl w-[220px]">
                        <Calendar className="size-4 text-slate-400" />
                        <span className="text-[12.5px] font-semibold text-slate-600">Aug 15, 2026</span>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col gap-3">
                    <div className="flex justify-between items-center">
                      <span className="text-[13px] text-slate-700 font-medium">Maximum Uses</span>
                      <button
                        onClick={() => setMaxUses(!maxUses)}
                        className={`w-10 h-6 rounded-full transition-colors relative flex items-center ${
                          maxUses ? "bg-[#10b981]" : "bg-slate-200"
                        }`}
                      >
                        <div className={`size-4 rounded-full bg-white transition-transform absolute ${maxUses ? "translate-x-5" : "translate-x-1"}`} />
                      </button>
                    </div>
                    {maxUses && (
                      <div className="flex items-center gap-3 bg-slate-50 border border-slate-100 rounded-xl px-3 py-1.5 w-[140px] justify-between text-[13px] font-semibold text-slate-700">
                        <button onClick={() => setMaxUsesCount(Math.max(1, maxUsesCount - 5))} className="hover:text-slate-900">-</button>
                        <span>{maxUsesCount} uses</span>
                        <button onClick={() => setMaxUsesCount(maxUsesCount + 5)} className="hover:text-slate-900">+</button>
                      </div>
                    )}
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-[13px] text-slate-700 font-medium">Disable Download</span>
                    <button
                      onClick={() => setDisableDownload(!disableDownload)}
                      className={`w-10 h-6 rounded-full transition-colors relative flex items-center ${
                        disableDownload ? "bg-[#10b981]" : "bg-slate-200"
                      }`}
                    >
                      <div className={`size-4 rounded-full bg-white transition-transform absolute ${disableDownload ? "translate-x-5" : "translate-x-1"}`} />
                    </button>
                  </div>

                </div>
              </div>

              {/* Link Permissions */}
              <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm flex flex-col gap-4">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block border-b border-slate-100 pb-2">
                  Link Permissions
                </span>

                <div className="flex flex-col gap-4">
                  <div className="flex justify-between items-center">
                    <span className="text-[13px] text-slate-700 font-medium">Allow Comments</span>
                    <button
                      onClick={() => setAllowComments(!allowComments)}
                      className={`w-10 h-6 rounded-full transition-colors relative flex items-center ${
                        allowComments ? "bg-[#10b981]" : "bg-slate-200"
                      }`}
                    >
                      <div className={`size-4 rounded-full bg-white transition-transform absolute ${allowComments ? "translate-x-5" : "translate-x-1"}`} />
                    </button>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-[13px] text-slate-700 font-medium">Allow Copy</span>
                    <button
                      onClick={() => setAllowCopy(!allowCopy)}
                      className={`w-10 h-6 rounded-full transition-colors relative flex items-center ${
                        allowCopy ? "bg-[#10b981]" : "bg-slate-200"
                      }`}
                    >
                      <div className={`size-4 rounded-full bg-white transition-transform absolute ${allowCopy ? "translate-x-5" : "translate-x-1"}`} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Copy Shared URL Bar */}
              <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm flex flex-col gap-3">
                <div className="flex items-center gap-2 border border-slate-200 rounded-xl px-4 py-2.5 bg-slate-50 justify-between">
                  <span className="text-[13px] text-slate-500 font-medium truncate">https://inspin.io/share/cs2026-f8k2m9y4x1v</span>
                  <Lock className="size-4 text-slate-400 shrink-0" />
                </div>
                
                <div className="flex gap-2">
                  <button
                    onClick={handleCopyLink}
                    className={`flex-1 py-2.5 rounded-xl text-[12.5px] font-bold flex items-center justify-center gap-2 cursor-pointer shadow-sm transition-all border ${
                      linkCopied
                        ? "bg-[#e8f7f0] border-[#a7f3d0] text-[#059669]"
                        : "bg-[#059669] border-transparent text-white hover:bg-[#047857]"
                    }`}
                  >
                    {linkCopied ? (
                      <>
                        <Check className="size-4" />
                        Link Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="size-4" />
                        Copy Link
                      </>
                    )}
                  </button>
                  <button className="size-10 border border-slate-200 rounded-xl bg-white hover:bg-slate-50 text-slate-500 flex items-center justify-center cursor-pointer shadow-sm">
                    <QrCode className="size-4" />
                  </button>
                  <button className="size-10 border border-slate-200 rounded-xl bg-white hover:bg-slate-50 text-slate-500 flex items-center justify-center cursor-pointer shadow-sm">
                    <Eye className="size-4" />
                  </button>
                  <button className="size-10 border border-slate-200 rounded-xl bg-white hover:bg-slate-50 text-slate-500 flex items-center justify-center cursor-pointer shadow-sm">
                    <RotateCw className="size-4" />
                  </button>
                </div>

                <div className="text-center text-[10.5px] font-semibold text-slate-400 mt-1">
                  Link created Jul 15, 2026 • Used 12 times • Expires Aug 15, 2026
                </div>
              </div>

            </div>

            {/* Column 2: Live Preview & Activity */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              
              {/* Live Preview Card */}
              <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm flex flex-col gap-3">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                  <Eye className="size-4 text-slate-400" />
                  Live Preview
                </span>
                <p className="text-[10px] text-slate-400 font-semibold mb-1">See how recipients will experience your shared link</p>

                {/* Miniature mock browser viewport */}
                <div className="border border-slate-100 rounded-xl p-3 bg-slate-50 flex flex-col gap-2 relative">
                  <div className="flex items-center gap-1 border-b border-slate-200/80 pb-2">
                    <div className="size-1.5 rounded-full bg-rose-400" />
                    <div className="size-1.5 rounded-full bg-amber-400" />
                    <div className="size-1.5 rounded-full bg-emerald-400" />
                    <span className="text-[8px] text-slate-400 truncate max-w-[140px] ml-4 bg-white px-2 py-0.5 rounded border border-slate-100">
                      inspin.io/share/cs2026...
                    </span>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-1.5 justify-between">
                      <span className="text-[9px] font-bold text-slate-800">Onboarding Issues</span>
                      <span className="text-[7px] text-purple-700 bg-purple-50 px-1 py-0.5 rounded font-bold">Findings Report</span>
                    </div>
                    <span className="text-[7px] text-slate-400">Shared by Sarah Chen • Design Team</span>
                    
                    <div className="h-1 bg-slate-300 rounded w-20 mt-1" />
                    <div className="h-1 bg-slate-200 rounded w-32" />
                    
                    <div className="h-3 bg-[#e8f7f0] rounded w-full mt-2" />
                    <div className="h-3 bg-[#e8f7f0] rounded w-full" />
                  </div>
                </div>
              </div>

              {/* Security Summary Card */}
              <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm flex flex-col gap-4">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                  Security Summary
                </span>
                
                <div className="flex flex-col gap-3 text-[12px] font-semibold text-slate-600">
                  <div className="flex items-center gap-2 text-emerald-600">
                    <Check className="size-4 shrink-0" />
                    Enterprise SSO enabled
                  </div>
                  <div className="flex items-center gap-2 text-emerald-600">
                    <Check className="size-4 shrink-0" />
                    Link expires Aug 15, 2026
                  </div>
                  <div className="flex items-center gap-2 text-emerald-600">
                    <Check className="size-4 shrink-0" />
                    Limited to 50 uses
                  </div>
                  <div className="flex items-center gap-2 text-emerald-600">
                    <Check className="size-4 shrink-0" />
                    Downloads disabled
                  </div>
                  <div className="flex items-center gap-2 text-emerald-600">
                    <Check className="size-4 shrink-0" />
                    Comments enabled
                  </div>
                  
                  {/* Warning: no password protection active */}
                  <div className="flex items-start gap-2 text-amber-600 mt-2 bg-amber-50/40 p-2.5 rounded-xl border border-amber-100/50">
                    <AlertTriangle className="size-4 shrink-0 mt-0.5" />
                    <div className="flex flex-col">
                      <span>No password protection</span>
                      <span className="text-[10px] text-slate-400 font-semibold">Consider adding a password for sensitive data</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-slate-100 pt-3 mt-1">
                  <span className="text-[11px] text-slate-400 font-bold">Security Level</span>
                  <span className="text-[11px] text-emerald-600 font-bold">Strong (80%)</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="w-[80%] h-full bg-emerald-500" />
                </div>
              </div>

              {/* Recent Link Activity */}
              <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm flex flex-col gap-4">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                  Recent Link Activity
                </span>
                
                <div className="flex flex-col gap-3">
                  {[
                    { title: "Link accessed", desc: "Unknown • New York", time: "2h ago", dot: "bg-emerald-500" },
                    { title: "Link accessed", desc: "client@acmecorp.com • London", time: "1d ago", dot: "bg-emerald-500" },
                    { title: "Link shared via email", desc: "Sarah Chen", time: "3d ago", dot: "bg-blue-500" },
                    { title: "Link created", desc: "Sarah Chen", time: "Jul 15, 2026", dot: "bg-slate-400" }
                  ].map((act, i) => (
                    <div key={i} className="flex justify-between items-start text-[12px] font-semibold text-slate-700">
                      <div className="flex gap-2">
                        <div className={`size-2 rounded-full ${act.dot} mt-1.5`} />
                        <div className="flex flex-col">
                          <span>{act.title}</span>
                          <span className="text-[10px] text-slate-400 font-semibold">{act.desc}</span>
                        </div>
                      </div>
                      <span className="text-[11px] text-slate-400 whitespace-nowrap">{act.time}</span>
                    </div>
                  ))}
                </div>

                <button className="w-full py-2 bg-slate-50 border border-slate-200 hover:bg-slate-100 rounded-xl text-[12px] font-bold text-[#0f172a] transition-all cursor-pointer mt-1">
                  View Full Activity Log →
                </button>
              </div>

            </div>

          </div>
        )}

        {/* ─── TAB CONTENT: EXTERNAL GUESTS ──────────────────────────────── */}
        {activeSubTab === "guests" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Column 1: Details & Permissions */}
            <div className="lg:col-span-8 flex flex-col gap-6">
              
              {/* Guest Details */}
              <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm flex flex-col gap-4">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                  Guest Details
                </span>

                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[12px] font-semibold text-slate-600">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                      <input
                        type="email"
                        value={guestEmail}
                        onChange={(e) => setGuestEmail(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 border border-slate-200/80 focus:border-[#059669] focus:ring-1 focus:ring-[#059669] outline-none text-[13px] font-medium text-slate-800 rounded-xl"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[12px] font-semibold text-slate-600">Organization</label>
                      <input
                        type="text"
                        value={guestOrg}
                        onChange={(e) => setGuestOrg(e.target.value)}
                        className="w-full px-4 py-2.5 border border-slate-200/80 focus:border-[#059669] focus:ring-1 focus:ring-[#059669] outline-none text-[13px] font-medium text-slate-800 rounded-xl"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[12px] font-semibold text-slate-600">Role / Title</label>
                      <input
                        type="text"
                        value={guestRole}
                        onChange={(e) => setGuestRole(e.target.value)}
                        className="w-full px-4 py-2.5 border border-slate-200/80 focus:border-[#059669] focus:ring-1 focus:ring-[#059669] outline-none text-[13px] font-medium text-slate-800 rounded-xl"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Access & Permissions */}
              <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm flex flex-col gap-4">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                  Access & Permissions
                </span>

                <div className="flex flex-col gap-4">
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { id: "viewer", label: "Viewer", desc: "Read-only access to shared findings" },
                      { id: "commenter", label: "Commenter", desc: "Can view and leave comments" },
                      { id: "editor", label: "Editor", desc: "Can edit shared sections", badge: "REQ. APPROVAL" }
                    ].map((opt) => (
                      <div
                        key={opt.id}
                        onClick={() => setGuestAccessLevel(opt.id as any)}
                        className={`p-3.5 rounded-xl border cursor-pointer flex flex-col gap-1 relative ${
                          guestAccessLevel === opt.id
                            ? "bg-[#e8f7f0]/30 border-[#059669]"
                            : "border-slate-100 hover:border-slate-200"
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <span className="text-[13px] font-bold text-slate-800">{opt.label}</span>
                          <input
                            type="radio"
                            checked={guestAccessLevel === opt.id}
                            onChange={() => {}}
                            className="accent-[#059669]"
                          />
                        </div>
                        <span className="text-[10px] text-slate-400 font-semibold leading-relaxed mt-0.5">{opt.desc}</span>
                        {opt.badge && (
                          <span className="absolute top-2 right-8 text-[7.5px] font-bold bg-amber-50 text-amber-600 border border-amber-100 rounded px-1 scale-90">
                            {opt.badge}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between items-center border-t border-slate-50 pt-3">
                    <div className="flex flex-col">
                      <span className="text-[13px] text-slate-700 font-medium">Access Expires</span>
                      <span className="text-[10px] text-slate-400 font-semibold">30 days from now</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-slate-50 border border-slate-100 rounded-xl w-[180px]">
                      <Calendar className="size-4 text-slate-400" />
                      <span className="text-[12px] font-bold text-slate-600">Aug 15, 2026</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center border-t border-slate-50 pt-3">
                    <div className="flex flex-col">
                      <span className="text-[13px] text-slate-700 font-medium">Require NDA acceptance</span>
                      <span className="text-[10px] text-slate-400 font-semibold">Guest must accept NDA before accessing content</span>
                    </div>
                    <button
                      onClick={() => setGuestRequireNda(!guestRequireNda)}
                      className={`w-10 h-6 rounded-full transition-colors relative flex items-center ${
                        guestRequireNda ? "bg-[#10b981]" : "bg-slate-200"
                      }`}
                    >
                      <div className={`size-4 rounded-full bg-white transition-transform absolute ${guestRequireNda ? "translate-x-5" : "translate-x-1"}`} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Personal Message */}
              <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm flex flex-col gap-2">
                <div className="flex justify-between items-center text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  <span>Personal Message <span className="text-slate-400 normal-case">(Optional)</span></span>
                  <span className="text-[10px] text-slate-400 font-medium lowercase leading-normal">{personalMessage.length} / 500</span>
                </div>
                <textarea
                  value={personalMessage}
                  onChange={(e) => setPersonalMessage(e.target.value.substring(0, 500))}
                  rows={4}
                  className="w-full p-4 border border-slate-200/80 focus:border-[#059669] focus:ring-1 focus:ring-[#059669] outline-none text-[13px] font-medium text-slate-700 rounded-xl bg-slate-50/50"
                />
              </div>

              {/* Shared Content Checklist */}
              <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm flex flex-col gap-4">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                  Shared Content
                </span>
                <span className="text-[10px] text-slate-400 font-semibold -mt-2 block">Select which parts of the project to share with this guest</span>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                  {[
                    { id: "executiveSummary", label: "Executive Summary", secure: false },
                    { id: "keyFindings", label: "Key Findings", secure: false },
                    { id: "aiInsights", label: "AI Insights", secure: true },
                    { id: "charts", label: "Charts & Visualizations", secure: false },
                    { id: "rawSurvey", label: "Raw Survey Data", restricted: true },
                    { id: "respondentDetails", label: "Respondent Details", restricted: true }
                  ].map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-3 bg-slate-50/50 border border-slate-100 rounded-xl">
                      <label className="flex items-center gap-2.5 text-[12.5px] font-semibold text-slate-700 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={(sharedContent as any)[item.id]}
                          onChange={(e) => setSharedContent({ ...sharedContent, [item.id]: e.target.checked })}
                          className="accent-[#059669] size-3.5"
                        />
                        {item.label}
                      </label>
                      
                      {item.secure && (
                        <span className="px-1.5 py-0.5 rounded bg-purple-50 text-purple-600 text-[8px] font-bold flex items-center gap-0.5 border border-purple-100">
                          <Plus className="size-2" />
                          AI GENERATED
                        </span>
                      )}

                      {item.restricted && (
                        <span className="px-1.5 py-0.5 rounded bg-amber-50 text-amber-600 text-[8px] font-bold border border-amber-100">
                          Restricted {item.id === "respondentDetails" && "— Contains PII"}
                        </span>
                      )}
                    </div>
                  ))}
                </div>

                <div className="border-t border-slate-100 pt-3 mt-2 text-[11px] font-bold text-slate-400">
                  {Object.values(sharedContent).filter(Boolean).length} of 6 sections selected
                </div>
              </div>

              {/* Bottom Send Invitation Buttons */}
              <div className="flex flex-col gap-3">
                <button
                  onClick={onSendInvitations}
                  className="w-full py-3 bg-[#059669] hover:bg-[#047857] text-white font-bold text-[13.5px] rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 shadow-sm shadow-emerald-100"
                >
                  <Mail className="size-4" />
                  Send Invitation
                </button>
                <button className="w-full py-3 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-[13.5px] rounded-xl transition-all cursor-pointer">
                  Save as Draft
                </button>
              </div>

            </div>

            {/* Column 2: Guest Rules & Previews */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              
              {/* Email Preview Card */}
              <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm flex flex-col gap-3">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                  Email Preview
                </span>

                <div className="border border-slate-100 rounded-xl p-4 bg-slate-50/50 flex flex-col gap-3 relative text-[11.5px] text-slate-600 leading-relaxed font-medium">
                  <div className="flex items-center gap-1.5 font-bold text-slate-700 border-b border-slate-100 pb-2">
                    <div className="size-6 bg-emerald-500 rounded-lg flex items-center justify-center text-white text-[11px] font-bold">i</div>
                    InSpin
                  </div>
                  
                  <div className="flex flex-col gap-1 text-center py-2">
                    <span className="text-[14px] font-bold text-slate-800 leading-tight">You've been invited to collaborate</span>
                    <span className="text-[10px] text-slate-400">Sarah Chen has invited you to view research findings</span>
                  </div>

                  <div className="bg-white border border-slate-200 rounded-xl p-3 flex justify-between items-center">
                    <div className="flex flex-col">
                      <span className="text-[11px] font-bold text-slate-800">Onboarding Issues</span>
                      <span className="text-[9px] text-slate-400">Research Team • Onboarding Issues</span>
                    </div>
                  </div>

                  <p className="italic bg-slate-50 p-2.5 rounded-lg border border-slate-100 text-[10.5px] mt-1 text-slate-500 leading-normal">
                    "Hi Jennifer, I'd like to share our Onboarding Issues research findings with you..."
                  </p>

                  <button className="w-full py-2 bg-[#059669] text-white rounded-lg text-[11px] font-bold mt-2 cursor-pointer text-center">
                    View Research Findings
                  </button>

                  <div className="text-center text-[9px] text-slate-400 font-semibold border-t border-slate-100 pt-3 mt-1">
                    This invitation expires Aug 15, 2026
                  </div>
                </div>
              </div>

              {/* Guest Access Rules */}
              <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                    Guest Access Rules
                  </span>
                </div>
                
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider">What guests can do</span>
                    <div className="flex flex-col gap-1.5 text-[11px] font-semibold text-slate-600">
                      {["View selected findings and reports", "Leave comments on shared content", "Export permitted visualizations", "Access via secure link"].map(c => (
                        <div key={c} className="flex items-center gap-1.5 text-emerald-600">
                          <Check className="size-3.5 shrink-0" />
                          <span className="text-slate-600">{c}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 border-t border-slate-100 pt-3.5">
                    <span className="text-[10px] font-bold text-rose-600 uppercase tracking-wider">What guests cannot do</span>
                    <div className="flex flex-col gap-1.5 text-[11px] font-semibold text-slate-600">
                      {["Access raw survey data", "View respondent PII", "Invite other collaborators", "Modify project settings", "Access other projects"].map(c => (
                        <div key={c} className="flex items-center gap-1.5 text-rose-600">
                          <span className="text-rose-500 font-bold">✕</span>
                          <span className="text-slate-600">{c}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Enterprise Security Card */}
              <div className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm flex flex-col gap-2">
                <span className="text-[11px] font-bold text-slate-700 flex items-center gap-1.5">
                  <ShieldAlert className="size-4 text-emerald-600" />
                  Enterprise Security
                </span>
                <p className="text-[10px] text-slate-400 font-medium leading-relaxed">
                  All external access is logged, encrypted in transit, and compliant with SOC 2 Type II requirements.
                </p>
                <span className="text-[9px] text-[#059669] font-bold hover:underline cursor-pointer">
                  Audit trail available in Settings → Security
                </span>
              </div>

            </div>

          </div>
        )}

        {/* ─── BOTTOM BAR: FLOATING SELECTED COLLABORATORS (ONLY ACTIVE IN INVITE TAB) ─── */}
        {activeSubTab === "invite" && selectedCollaborators.length > 0 && (
          <div className="fixed bottom-6 left-[292px] right-8 bg-white border border-slate-200 shadow-2xl rounded-2xl p-4 flex items-center justify-between z-40 animate-in slide-in-from-bottom-4 duration-300">
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                <div className="size-7 bg-teal-500 border-2 border-white rounded-full flex items-center justify-center text-[10px] font-bold text-white">MR</div>
                <div className="size-7 bg-emerald-500 border-2 border-white rounded-full flex items-center justify-center text-[10px] font-bold text-white">PP</div>
                <div className="size-7 bg-indigo-500 border-2 border-white rounded-full flex items-center justify-center text-[10px] font-bold text-white">JO</div>
              </div>
              <span className="text-[13px] font-bold text-slate-700">{selectedCollaborators.length} people selected</span>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSelectedCollaborators([])}
                className="px-4 py-2 text-slate-500 hover:text-slate-700 text-[12.5px] font-bold cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={onSendInvitations}
                className="px-5 py-2.5 bg-[#059669] hover:bg-[#047857] text-white text-[12.5px] font-bold rounded-xl transition-all cursor-pointer shadow-sm shadow-emerald-100"
              >
                Send Invitations
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
