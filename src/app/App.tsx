import imgRectangle from "../imports/InspinAppShell/0203bd2613d5605abe749b389b256bf0fd1a56b1.png";
import imgViz from "../imports/InspinAppShell/27ba1ceec64cebea42b1b101a0b0f81cba8c7eb0.png";
import React, { useState } from "react";
import {
  LayoutGrid,
  Sparkles,
  HelpCircle,
  Layers,
  PieChart,
  Users,
  Bookmark,
  BarChart3,
  Settings,
  UploadCloud,
  Folder,
  ChevronDown,
  Search,
  Bell,
  Clock,
  Lightbulb,
  TrendingUp,
  Activity,
  Smile,
  ArrowRight,
  ChevronRight,
  User as UserIcon,
  LogOut,
  Calendar,
  RotateCcw,
} from "lucide-react";
import InspinLogo from "./components/Logo";
import DataImport from "./components/DataImport";
import ResearchOverview from "./components/ResearchOverview";
import AIInsights from "./components/AIInsights";
import Questions from "./components/Questions";
import Themes from "./components/Themes";
import Segments from "./components/Segments";
import Respondents from "./components/Respondents";
import SearchPopover from "./components/SearchPopover";
import SearchResultsModal from "./components/SearchResultsModal";
import ComparisonModal from "./components/ComparisonModal";
import Profile from "./components/Profile";
import Reports from "./components/Reports";
import SavedFindings from "./components/SavedFindings";
import Notifications from "./components/Notifications";
import ShareModal from "./components/ShareModal";
import SharedSuccess from "./components/SharedSuccess";
import ActivityTimeline from "./components/ActivityTimeline";
import SharingSettings from "./components/SharingSettings";
import AuthScreen from "./components/AuthScreen";
import HelpSupport from "./components/HelpSupport";
import AssistantDrawer from "./components/AssistantDrawer";
import { useSurveyData, WorkspaceItem } from "./context/SurveyDataContext";

// ─── Sidebar Nav Items ───────────────────────────────────────────────────────

function NavItem({
  icon,
  label,
  active,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-current={active ? "page" : undefined}
      className={`relative rounded-[12px] shrink-0 w-full text-left cursor-pointer transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#059669] focus-visible:ring-offset-2 ${
        active
          ? "bg-[#e8f7f0] text-[#059669] font-semibold"
          : "bg-transparent text-[#64748b] hover:bg-[#f8fafc] hover:text-[#334155]"
      }`}
    >
      <div className="flex flex-row items-center size-full">
        <div className="flex gap-[12px] items-center px-[16px] py-[10px] size-full">
          {icon}
          <span className="font-['Inter',sans-serif] font-medium text-[14px] whitespace-nowrap">
            {label}
          </span>
        </div>
      </div>
    </button>
  );
}

function Sidebar({ 
  activeTab, 
  setActiveTab, 
  onLogout,
  onHelpSupport
}: { 
  activeTab: string; 
  setActiveTab: (tab: string) => void; 
  onLogout: () => void; 
  onHelpSupport: () => void;
}) {
  const [showUserMenu, setShowUserMenu] = useState(false);
  return (
    <div
      className="flex flex-col gap-[28px] h-full items-start px-[18px] py-[28px] relative rounded-[24px] shrink-0 w-[260px]"
      style={{
        background: "rgba(255,255,255,0.75)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(226, 232, 240, 0.8)",
        boxShadow: "0 4px 24px rgba(15, 23, 42, 0.04)",
      }}
    >
      <InspinLogo />

      {/* Navigation */}
      <div className="flex flex-col gap-[4px] items-start relative shrink-0 w-full">
        <NavItem icon={<LayoutGrid className="size-5 shrink-0" />} label="Overview" active={activeTab === "Overview"} onClick={() => setActiveTab("Overview")} />
        <NavItem icon={<Sparkles className="size-5 shrink-0" />} label="AI Insights" active={activeTab === "AI Insights"} onClick={() => setActiveTab("AI Insights")} />
        <NavItem icon={<HelpCircle className="size-5 shrink-0" />} label="Questions" active={activeTab === "Questions"} onClick={() => setActiveTab("Questions")} />
        <NavItem icon={<Layers className="size-5 shrink-0" />} label="Themes" active={activeTab === "Themes"} onClick={() => setActiveTab("Themes")} />
        <NavItem icon={<PieChart className="size-5 shrink-0" />} label="Segments" active={activeTab === "Segments"} onClick={() => setActiveTab("Segments")} />
        <NavItem icon={<Users className="size-5 shrink-0" />} label="Respondents" active={activeTab === "Respondents"} onClick={() => setActiveTab("Respondents")} />
        <NavItem icon={<Bookmark className="size-5 shrink-0" />} label="Saved Findings" active={activeTab === "Saved Findings"} onClick={() => setActiveTab("Saved Findings")} />
        <NavItem icon={<BarChart3 className="size-5 shrink-0" />} label="Reports" active={activeTab === "Reports"} onClick={() => setActiveTab("Reports")} />
        <NavItem icon={<UploadCloud className="size-5 shrink-0" />} label="Data Import" active={activeTab === "Data Import"} onClick={() => setActiveTab("Data Import")} />
        <NavItem icon={<Settings className="size-5 shrink-0" />} label="Settings" active={activeTab === "Settings"} onClick={() => setActiveTab("Settings")} />
      </div>

      {/* Spacer */}
      <div className="flex-[1_0_0] min-h-px" />

      {/* User & Help section */}
      <div className="flex flex-col gap-[12px] w-full shrink-0 relative">
        {/* User Popover Menu */}
        {showUserMenu && (
          <div className="absolute bottom-[66px] left-0 right-0 bg-white border border-slate-200/80 rounded-2xl shadow-xl p-2.5 z-50 flex flex-col gap-1.5 animate-in slide-in-from-bottom-2 duration-200">
            <button
              type="button"
              onClick={() => {
                setActiveTab("Profile");
                setShowUserMenu(false);
              }}
              className="flex items-center gap-2 px-3 py-2 hover:bg-slate-50 rounded-xl text-[12px] font-bold text-slate-700 w-full text-left cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
            >
              <UserIcon className="size-4 text-slate-400" />
              <span>View Profile</span>
            </button>
            <button
              type="button"
              onClick={() => {
                onLogout();
                setShowUserMenu(false);
              }}
              className="flex items-center gap-2 px-3 py-2 hover:bg-rose-50 rounded-xl text-[12px] font-bold text-rose-600 w-full text-left cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500"
            >
              <LogOut className="size-4 text-rose-400" />
              <span>Sign Out</span>
            </button>
          </div>
        )}

        {/* User Card */}
        <button 
          type="button"
          onClick={() => setShowUserMenu(!showUserMenu)}
          aria-expanded={showUserMenu}
          aria-label="User account menu"
          className="flex gap-[12px] items-center p-3 rounded-[16px] border border-slate-100 bg-white/80 w-full text-left cursor-pointer hover:bg-slate-50 transition-colors shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
        >
          <div className="relative rounded-full shrink-0 size-[36px] overflow-hidden">
            <img alt="Dr. Aria Thorne" className="absolute inset-0 object-cover size-full" src={imgRectangle} />
          </div>
          <div className="flex flex-[1_0_0] flex-col gap-[1px] items-start min-w-px">
            <p className="font-['Inter',sans-serif] font-semibold text-[#0f172a] text-[13px] leading-tight whitespace-nowrap">Dr. Aria Thorne</p>
            <p className="font-['Inter',sans-serif] font-normal text-[#64748b] text-[11px] leading-tight">Lead Researcher</p>
          </div>
          <ChevronDown className="size-3.5 text-slate-400 shrink-0" />
        </button>

        {/* Help & Support Button */}
        <button 
          type="button"
          onClick={onHelpSupport}
          className="flex gap-[10px] items-center px-4 py-3 rounded-[16px] border border-slate-100 bg-white/50 w-full text-left cursor-pointer hover:bg-slate-50 transition-all text-slate-600 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
        >
          <HelpCircle className="size-4 text-slate-500 shrink-0" />
          <span className="font-['Inter',sans-serif] font-semibold text-[13px]">Help & Support</span>
        </button>
      </div>
    </div>
  );
}


// ─── Top Nav Bar ─────────────────────────────────────────────────────────────

function TopNavBar({
  workspace,
  setWorkspace,
  onFocusSearch,
  searchVal,
  showSearchPopover,
  setShowSearchPopover,
  setSearchVal,
  onSelectSuggestion,
  onTriggerSearch,
  onClickNotifications,
  unreadNotificationsCount,
  onClickShare,
  onClickAskAssistant
}: {
  workspace: string;
  setWorkspace: (ws: string) => void;
  onFocusSearch: () => void;
  searchVal: string;
  showSearchPopover: boolean;
  setShowSearchPopover: (show: boolean) => void;
  setSearchVal: (val: string) => void;
  onSelectSuggestion: (suggestion: string) => void;
  onTriggerSearch: (query: string) => void;
  onClickNotifications?: () => void;
  unreadNotificationsCount?: number;
  onClickShare?: () => void;
  onClickAskAssistant?: () => void;
}) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { workspaces, activeWorkspace, selectWorkspace } = useSurveyData();

  return (
    <div 
      className="flex items-center justify-between gap-2 lg:gap-3 h-14 sm:h-16 px-3 sm:px-5 rounded-[20px] sm:rounded-[24px] w-full shrink-0 relative"
      style={{
        background: "rgba(255,255,255,0.80)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        border: "1px solid rgba(226,232,240,0.7)",
        boxShadow: "0 4px 16px rgba(15,23,42,0.04)",
        zIndex: 50,
      }}
    >
      {/* Project Selector Wrapper */}
      <div className="relative shrink-0">
        <button
          type="button"
          onClick={() => setDropdownOpen(!dropdownOpen)}
          aria-expanded={dropdownOpen}
          className="flex gap-1.5 sm:gap-2 items-center px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl bg-[#f4f7f6] border border-[#e2e8f0] shrink-0 hover:bg-[#eaeaea] transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
        >
          <Folder className="size-3.5 sm:size-4 text-[#15803d] shrink-0" />
          <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#0f172a] text-[12px] sm:text-[13px] leading-normal truncate max-w-[90px] sm:max-w-[130px] md:max-w-[160px] lg:max-w-[180px] xl:max-w-[220px]">
            {activeWorkspace.name}
          </p>
          <ChevronDown className="size-3.5 text-slate-400 shrink-0" />
        </button>

        {dropdownOpen && (
          <>
            {/* Backdrop to close dropdown */}
            <div className="fixed inset-0 z-40" onClick={() => setDropdownOpen(false)} />
            
            {/* Dropdown Menu */}
            <div 
              className="absolute left-0 mt-2 w-[260px] sm:w-[300px] rounded-xl border border-slate-200/80 bg-white/95 backdrop-blur-md p-1.5 shadow-lg z-50 flex flex-col gap-0.5"
              style={{
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)"
              }}
            >
              {workspaces.map((ws: WorkspaceItem) => (
                <button
                  key={ws.id}
                  type="button"
                  onClick={() => {
                    selectWorkspace(ws.id);
                    setDropdownOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-lg text-[13px] font-medium transition-all cursor-pointer flex justify-between items-center ${
                    activeWorkspace.id === ws.id 
                      ? "bg-[#dcfce7] text-[#15803d]" 
                      : "text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  <span className="truncate max-w-[180px]">{ws.name}</span>
                  <span className="text-[10px] text-slate-400 font-normal">{ws.dataset.totalRespondents} resp</span>
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Search Wrapper - Responsive & Centered */}
      <div className="relative flex-1 min-w-0 max-w-[380px] mx-1 sm:mx-2">
        <button 
          type="button"
          onClick={onFocusSearch}
          className="flex gap-2 h-9 sm:h-10 items-center px-3 sm:px-3.5 rounded-full bg-[#f4f7f6] border border-[#e2e8f0] w-full text-left cursor-pointer hover:bg-[#eaeaea] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 overflow-hidden min-w-0"
        >
          <Search className="size-3.5 sm:size-4 text-slate-400 shrink-0" />
          <p className="font-['Inter:Regular',sans-serif] font-normal text-[#94a3b8] text-[12px] sm:text-[13px] truncate flex-1 min-w-0">
            {searchVal ? (
              searchVal
            ) : (
              <>
                <span className="hidden xl:inline">Search questions, insights, themes...</span>
                <span className="hidden sm:inline xl:hidden">Search research...</span>
                <span className="sm:hidden">Search...</span>
              </>
            )}
          </p>
        </button>

        {showSearchPopover && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setShowSearchPopover(false)} />
            <SearchPopover
              onClose={() => setShowSearchPopover(false)}
              onSelectSuggestion={onSelectSuggestion}
              searchVal={searchVal || ""}
              setSearchVal={setSearchVal}
              onTriggerSearch={onTriggerSearch}
            />
          </>
        )}
      </div>

      {/* Right controls - Balanced on Right */}
      <div className="flex gap-1.5 sm:gap-2.5 items-center shrink-0">
        {/* Share Button */}
        <button
          type="button"
          onClick={onClickShare}
          className="px-2.5 sm:px-3.5 py-1.5 sm:py-2 bg-[#059669] hover:bg-[#047857] text-white rounded-xl text-[12px] sm:text-[13px] font-bold cursor-pointer transition-all shadow-xs flex items-center gap-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 active:scale-95 shrink-0"
        >
          Share
        </button>

        {/* Ask Assistant */}
        <button
          type="button"
          onClick={onClickAskAssistant}
          className="flex gap-1.5 items-center px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl bg-[#dcfce7] border border-[#15803d]/40 shrink-0 hover:bg-[#bbf7d0] transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 active:scale-95"
        >
          <Sparkles className="size-3.5 sm:size-4 text-[#15803d] shrink-0" />
          <span className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#14532d] text-[12px] sm:text-[13px] whitespace-nowrap">
            <span className="hidden xl:inline">Ask Assistant</span>
            <span className="hidden md:inline xl:hidden">Assistant</span>
            <span className="md:hidden">AI</span>
          </span>
        </button>

        {/* Notification Bell */}
        <button 
          type="button"
          onClick={onClickNotifications}
          aria-label="View notifications"
          className="relative flex items-center justify-center rounded-xl size-8 sm:size-9 bg-[#f4f7f6] border border-slate-200/60 cursor-pointer hover:bg-slate-200 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 shrink-0"
        >
          <Bell className="size-3.5 sm:size-4 text-slate-600 shrink-0" />
          {unreadNotificationsCount !== undefined && unreadNotificationsCount > 0 && (
            <div className="absolute -right-1 -top-1 bg-[#ef4444] text-white text-[9px] font-bold rounded-full size-4 sm:size-[17px] flex items-center justify-center border-2 border-white">
              {unreadNotificationsCount}
            </div>
          )}
        </button>
      </div>
    </div>
  );
}

// ─── KPI Cards ───────────────────────────────────────────────────────────────

function GlassCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`relative rounded-[20px] ${className}`}
      style={{
        background: "rgba(255,255,255,0.80)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        border: "1px solid rgba(226,232,240,0.8)",
        boxShadow: "0 4px 16px rgba(15,23,42,0.04)",
      }}
    >
      {children}
    </div>
  );
}

function KpiRespondents() {
  const { dataset } = useSurveyData();
  return (
    <GlassCard className="flex-[1_0_0] min-w-px">
      <div className="flex items-start justify-between p-[24px]">
        <div className="flex flex-col gap-[12px] items-start">
          <div className="flex gap-[8px] items-center">
            <div className="bg-[#dcfce7] flex items-center justify-center rounded-[8px] size-[32px] text-[#15803d]">
              <Users className="size-[16px]" />
            </div>
            <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#64748b] text-[12px] uppercase tracking-wide">Respondents</p>
          </div>
          <div className="flex flex-col gap-[4px]">
            <p className="font-['Inter:Bold',sans-serif] font-bold text-[#0f172a] text-[32px] leading-normal">{dataset.totalRespondents}</p>
            <div className="flex gap-[4px] items-center">
              <TrendingUp className="size-[12px] text-[#15803d]" />
              <p className="font-['Inter:Medium',sans-serif] font-medium text-[#15803d] text-[12px]">NPS +{dataset.npsScore} overall</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-start justify-end self-stretch">
          <div className="p-2.5 bg-emerald-50 rounded-xl text-emerald-600">
            <TrendingUp className="size-5" />
          </div>
        </div>
      </div>
    </GlassCard>
  );
}

function KpiThemesSynced() {
  const { dataset } = useSurveyData();
  return (
    <GlassCard className="flex-[1_0_0] min-w-px">
      <div className="flex items-start justify-between p-[24px]">
        <div className="flex flex-col gap-[12px] items-start">
          <div className="flex gap-[8px] items-center">
            <div className="bg-[#eef2ff] flex items-center justify-center rounded-[8px] size-[32px] text-[#6366f1]">
              <Layers className="size-[16px]" />
            </div>
            <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#64748b] text-[12px] uppercase tracking-wide">AI Themes Synced</p>
          </div>
          <div className="flex flex-col gap-[4px]">
            <p className="font-['Inter:Bold',sans-serif] font-bold text-[#0f172a] text-[32px] leading-normal">{dataset.themes.length}</p>
            <p className="font-['Inter:Medium',sans-serif] font-medium text-[#6366f1] text-[12px]">{dataset.positiveSentimentPct}% Positive sentiment</p>
          </div>
        </div>
        <div className="flex flex-col items-start justify-end self-stretch">
          <div className="p-2.5 bg-indigo-50 rounded-xl text-indigo-600">
            <Sparkles className="size-5" />
          </div>
        </div>
      </div>
    </GlassCard>
  );
}

function KpiSavedFindings() {
  return (
    <GlassCard className="flex-[1_0_0] min-w-px">
      <div className="flex items-start justify-between p-[24px]">
        <div className="flex flex-col gap-[12px] items-start">
          <div className="flex gap-[8px] items-center">
            <div className="bg-[#eff6ff] flex items-center justify-center rounded-[8px] size-[32px] text-[#3b82f6]">
              <Bookmark className="size-[16px]" />
            </div>
            <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#64748b] text-[12px] uppercase tracking-wide">Saved Findings</p>
          </div>
          <div className="flex flex-col gap-[4px]">
            <p className="font-['Inter:Bold',sans-serif] font-bold text-[#0f172a] text-[32px] leading-normal">89</p>
            <p className="font-['Inter:Medium',sans-serif] font-medium text-[#64748b] text-[12px]">Shared across 3 teams</p>
          </div>
        </div>
        <div className="flex flex-col items-start justify-end self-stretch">
          <div className="p-2.5 bg-blue-50 rounded-xl text-blue-600">
            <BarChart3 className="size-5" />
          </div>
        </div>
      </div>
    </GlassCard>
  );
}

// ─── Main Workspace ───────────────────────────────────────────────────────────

function VisualizerRings() {
  return (
    <div className="flex items-center justify-center relative rounded-[100px] size-[200px] border border-[#e2e8f0]">
      <div className="h-[109px] relative w-[110px] overflow-hidden">
        <img alt="" className="absolute h-[197.68%] left-[-96.94%] max-w-none top-[-46.33%] w-[293.69%]" src={imgViz} />
      </div>
      {/* Dashed outer ring */}
      <div className="absolute rounded-[75px] size-[150px] left-[25px] top-[25px] border border-dashed border-[rgba(21,128,61,0.2)]" />
      {/* Small icon markers */}
      <div className="absolute bg-[#dcfce7] flex items-center justify-center rounded-[12px] size-[24px] left-[12px] top-[40px] text-[#15803d]">
        <Sparkles className="size-3" />
      </div>
      <div className="absolute bg-[#dcfce7] flex h-[24px] items-center justify-center left-[160px] rounded-[12px] top-[24px] w-[28px] text-[#15803d]">
        <PieChart className="size-3" />
      </div>
      <div className="absolute bg-[#eff6ff] flex items-center justify-center left-[155px] rounded-[12px] size-[24px] top-[136px] text-[#3b82f6]">
        <Activity className="size-3" />
      </div>
      <div className="absolute bg-[#fefce8] flex items-center justify-center left-[20px] rounded-[12px] size-[24px] top-[130px] text-[#ca8a04]">
        <Lightbulb className="size-3" />
      </div>
    </div>
  );
}

function QuickLink({
  iconBg,
  icon,
  title,
  sub,
  onClick,
}: {
  iconBg: string;
  icon: React.ReactNode;
  title: string;
  sub: string;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="relative rounded-[16px] w-full text-left hover:shadow-md transition-shadow cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#114e32]"
      style={{
        background: "rgba(255,255,255,0.90)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        border: "1px solid rgba(226,232,240,0.8)",
      }}
    >
      <div className="flex items-center gap-[16px] p-[16px]">
        <div className={`flex items-center justify-center rounded-[12px] size-[40px] ${iconBg}`}>{icon}</div>
        <div className="flex flex-[1_0_0] flex-col gap-[2px] items-start min-w-px">
          <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#0f172a] text-[14px] whitespace-nowrap">{title}</p>
          <p className="font-['Inter:Regular',sans-serif] font-normal text-[#64748b] text-[12px]">{sub}</p>
        </div>
        <ChevronRight className="size-4 text-[#94a3b8] shrink-0" />
      </div>
    </button>
  );
}

function MainWorkspace({ onNavigate }: { onNavigate?: (tab: string) => void }) {
  return (
    <div
      className="flex-[1_0_0] relative rounded-[24px] w-full"
      style={{
        background: "rgba(255,255,255,0.75)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        border: "1px solid rgba(226,232,240,0.6)",
        boxShadow: "0 8px 32px rgba(15,23,42,0.04)",
      }}
    >
      <div className="flex flex-col gap-[24px] items-start p-[32px] size-full">
        {/* Content area */}
        <div className="flex flex-[1_0_0] gap-[32px] items-start w-full">
          {/* Empty State */}
          <div className="flex-[1_0_0] relative">
            <div className="flex flex-col items-center justify-center gap-[24px] py-[40px]">
              <VisualizerRings />
              <div className="flex flex-col gap-[8px] items-center text-center">
                <p className="font-['Inter:Bold',sans-serif] font-bold text-[#0f172a] text-[16px]">No active session panel selected</p>
                <p className="font-['Inter:Regular',sans-serif] font-normal text-[#64748b] text-[12px] leading-relaxed max-w-[380px]">
                  {`Choose "AI Insights" or any navigation module in the floating sidebar to begin mapping user behavior and uncover insights.`}
                </p>
              </div>
              <div className="flex gap-[12px] items-center">
                <button
                  type="button"
                  onClick={() => onNavigate?.("AI Insights")}
                  className="bg-[#114e32] flex gap-[8px] items-center px-[18px] py-[10px] rounded-[10px] cursor-pointer hover:bg-[#15803d] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#114e32]"
                >
                  <Sparkles className="size-3.5 text-white" />
                  <p className="font-['Inter:Bold',sans-serif] font-bold text-white text-[12px] whitespace-nowrap">Explore AI Insights</p>
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate?.("ActivityTimeline")}
                  className="flex gap-[8px] items-center px-[18px] py-[10px] rounded-[10px] cursor-pointer hover:bg-[#f4f7f6] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
                  style={{ border: "1px solid #e2e8f0", background: "white" }}
                >
                  <Clock className="size-3.5 text-[#64748b]" />
                  <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#0f172a] text-[12px] whitespace-nowrap">View Recent Activity</p>
                </button>
              </div>
            </div>
          </div>

          {/* Get Started Column */}
          <div className="flex flex-col gap-[16px] items-start w-[320px] shrink-0">
            <div className="flex gap-[6px] items-center">
              <Sparkles className="size-3.5 text-[#15803d]" />
              <p className="font-['Inter:Bold',sans-serif] font-bold text-[#0f172a] text-[12px]">Get started with</p>
            </div>
            <div className="flex flex-col gap-[10px] items-start w-full">
              <QuickLink
                iconBg="bg-[#dcfce7]"
                icon={<Sparkles className="size-5 text-[#15803d]" />}
                title="AI Insights"
                sub="Discover AI-powered themes"
                onClick={() => onNavigate?.("AI Insights")}
              />
              <QuickLink
                iconBg="bg-[#eff6ff]"
                icon={<BarChart3 className="size-5 text-[#3b82f6]" />}
                title="Questions"
                sub="Explore survey responses"
                onClick={() => onNavigate?.("Questions")}
              />
              <QuickLink
                iconBg="bg-[#eef2ff]"
                icon={<PieChart className="size-5 text-[#6366f1]" />}
                title="Segments"
                sub="Analyze specific user groups"
                onClick={() => onNavigate?.("Segments")}
              />
              <QuickLink
                iconBg="bg-[#fff7ed]"
                icon={<Layers className="size-5 text-[#f97316]" />}
                title="Reports"
                sub="Generate and share reports"
                onClick={() => onNavigate?.("Reports")}
              />
            </div>
          </div>
        </div>

        {/* Pro Tip Footer */}
        <div className="relative rounded-[16px] w-full bg-[#f4f7f6] border border-[#e2e8f0]">
          <div className="flex items-center justify-between px-[16px] py-[12px]">
            <div className="flex gap-[10px] items-center">
              <Lightbulb className="size-4 text-[#15803d] shrink-0" />
              <div className="flex flex-col items-start">
                <p className="font-['Inter:Bold',sans-serif] font-bold text-[#0f172a] text-[12px]">Pro tip</p>
                <p className="font-['Inter:Regular',sans-serif] font-normal text-[#64748b] text-[11px]">Ask InSpin AI anything about your survey data</p>
              </div>
            </div>
            <div className="flex gap-[8px] items-center">
              {["What are the top pain points?", "Show themes by sentiment", "Compare segments"].map((q) => (
                <button
                  key={q}
                  type="button"
                  onClick={() => onNavigate?.("AI Insights")}
                  className="bg-white flex items-center px-[12px] py-[6px] rounded-[8px] border border-[#e2e8f0] cursor-pointer hover:bg-[#dcfce7] hover:border-[#86efac] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#114e32]"
                >
                  <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#0f172a] text-[11px] whitespace-nowrap">{q}</p>
                </button>
              ))}
              <button
                type="button"
                aria-label="Refresh suggestions"
                className="bg-white flex items-center justify-center rounded-[8px] size-[28px] border border-[#e2e8f0] cursor-pointer hover:bg-slate-50 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-400"
              >
                <RotateCcw className="size-3 text-[#64748b]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main Content Area ────────────────────────────────────────────────────────

function MainContent({ onNavigate }: { onNavigate?: (tab: string) => void }) {
  return (
    <div className="w-full overflow-y-auto flex flex-col h-[calc(100vh-120px)] relative">
      <div className="flex flex-col gap-[32px] items-start p-[40px] w-full max-w-[1440px] mx-auto pb-32">
        {/* Welcome Heading */}
        <div className="flex flex-col gap-[8px] items-start w-full">
          <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#15803d] text-[13px] uppercase tracking-wider">Overview</p>
          <p className="font-['Inter:Bold',sans-serif] font-bold text-[#0f172a] text-[32px] leading-tight whitespace-nowrap">Welcome back, Research Lead</p>
          <p className="font-['Inter:Regular',sans-serif] font-normal text-[#475569] text-[16px]">Here is what happened with InSpin during your customer satisfaction study today.</p>
        </div>

        {/* KPI Row */}
        <div className="flex gap-[16px] items-start w-full">
          <KpiRespondents />
          <KpiThemesSynced />
          <KpiSavedFindings />
        </div>

        {/* Main Workspace Card */}
        <MainWorkspace onNavigate={onNavigate} />
      </div>
    </div>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [activeTab, setActiveTab] = useState("Overview");
  const [selectedWorkspace, setSelectedWorkspace] = useState("InSpin Workspace");

  const [showSearchPopover, setShowSearchPopover] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  const [searchVal, setSearchVal] = useState("");
  const [showShareModal, setShowShareModal] = useState(false);
  const [showAssistantDrawer, setShowAssistantDrawer] = useState(false);

  if (!isLoggedIn) {
    return (
      <AuthScreen 
        onLogin={() => {
          setActiveTab("Overview");
          setSelectedWorkspace("InSpin Workspace");
          setIsLoggedIn(true);
        }} 
      />
    );
  }

  return (
    <div className="bg-[#f4f7f6] flex items-start relative min-h-screen w-full overflow-hidden">

      {/* Search Results Modal */}
      {showSearchResults && (
        <SearchResultsModal
          onClose={() => setShowSearchResults(false)}
          query={searchVal}
          onOpenComparison={() => {
            setShowSearchResults(false);
            setShowComparison(true);
          }}
        />
      )}

      {/* Comparison Modal */}
      {showComparison && (
        <ComparisonModal
          onClose={() => setShowComparison(false)}
        />
      )}

      {/* Share Modal */}
      {showShareModal && (
        <ShareModal
          onClose={() => setShowShareModal(false)}
          onShareSuccess={() => {
            setShowShareModal(false);
            setActiveTab("SharedSuccess");
          }}
        />
      )}

      {/* Assistant Drawer */}
      {showAssistantDrawer && (
        <AssistantDrawer
          onClose={() => setShowAssistantDrawer(false)}
          workspaceName={selectedWorkspace}
        />
      )}
      {/* Subtle background gradients matching Donezo's green palette */}
      <div className="pointer-events-none absolute left-[-150px] size-[700px] top-[-150px] opacity-30">
        <svg className="block size-full" fill="none" viewBox="0 0 1100 1100">
          <g filter="url(#gf-tl)" opacity="0.15">
            <circle cx="550" cy="550" fill="#15803d" r="400" />
          </g>
          <defs>
            <filter id="gf-tl" colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="1100" width="1100" x="0" y="0">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
              <feGaussianBlur result="effect1_foregroundBlur" stdDeviation="80" />
            </filter>
          </defs>
        </svg>
      </div>
      <div className="pointer-events-none absolute right-[-100px] size-[800px] top-[-200px] opacity-20">
        <svg className="block size-full" fill="none" viewBox="0 0 1100 1100">
          <g filter="url(#gf-tr)" opacity="0.12">
            <circle cx="550" cy="550" fill="#4ade80" r="450" />
          </g>
          <defs>
            <filter id="gf-tr" colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="1100" width="1100" x="0" y="0">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
              <feGaussianBlur result="effect1_foregroundBlur" stdDeviation="90" />
            </filter>
          </defs>
        </svg>
      </div>

      {/* Sidebar */}
      <div className="relative h-screen p-[16px] shrink-0">
        <Sidebar 
          activeTab={activeTab} 
          setActiveTab={(tab) => {
            setActiveTab(tab);
            if (tab === "Themes") {
              setSelectedWorkspace("Q1 Employee Autonomy Study");
            }
          }}
          onLogout={() => setIsLoggedIn(false)}
          onHelpSupport={() => setActiveTab("HelpSupport")}
        />
      </div>

      {/* Main Panel */}
      <div className="flex-[1_0_0] h-screen flex flex-col gap-[16px] px-[16px] py-[16px] overflow-hidden">
        <TopNavBar
          workspace={selectedWorkspace}
          setWorkspace={setSelectedWorkspace}
          onFocusSearch={() => setShowSearchPopover(true)}
          searchVal={searchVal}
          showSearchPopover={showSearchPopover}
          setShowSearchPopover={setShowSearchPopover}
          setSearchVal={setSearchVal}
          onSelectSuggestion={(suggestion) => {
            setShowSearchPopover(false);
            setSearchVal(suggestion);
            if (suggestion.includes("Compare") || suggestion.includes("compare")) {
              setShowComparison(true);
            } else {
              setShowSearchResults(true);
            }
          }}
          onTriggerSearch={(query) => {
            setShowSearchPopover(false);
            setShowSearchResults(true);
          }}
          onClickNotifications={() => {
            setActiveTab("Notifications");
          }}
          unreadNotificationsCount={7}
          onClickShare={() => {
            setShowShareModal(true);
          }}
          onClickAskAssistant={() => {
            setShowAssistantDrawer(true);
          }}
        />
        {activeTab === "Notifications" ? (
          <Notifications />
        ) : activeTab === "SharedSuccess" ? (
          <SharedSuccess
            onBack={() => setActiveTab("Settings")}
            onOpenProject={() => {
              setSelectedWorkspace("Customer Satisfaction Survey 2026");
              setActiveTab("Overview");
            }}
            onSendAnother={() => setShowShareModal(true)}
            onViewActivity={() => setActiveTab("ActivityTimeline")}
          />
        ) : activeTab === "ActivityTimeline" ? (
          <ActivityTimeline />
        ) : activeTab === "Saved Findings" ? (
          <SavedFindings />
        ) : activeTab === "Reports" ? (
          <Reports />
        ) : activeTab === "Settings" ? (
          <SharingSettings
            onSendInvitations={() => setActiveTab("SharedSuccess")}
            onOpenActivityLog={() => setActiveTab("ActivityTimeline")}
          />
        ) : activeTab === "Profile" ? (
          <Profile onLogout={() => setIsLoggedIn(false)} />
        ) : activeTab === "HelpSupport" ? (
          <HelpSupport />
        ) : activeTab === "Data Import" ? (
          <DataImport
            onExploreInsights={() => {
              setActiveTab("Overview");
            }}
          />
        ) : activeTab === "Overview" ? (
          <ResearchOverview onGenerateReport={() => setActiveTab("Reports")} onNavigate={(tab) => setActiveTab(tab)} />
        ) : activeTab === "AI Insights" ? (
          <AIInsights onGenerateReport={() => setActiveTab("Reports")} />
        ) : activeTab === "Questions" ? (
          <Questions />
        ) : activeTab === "Themes" ? (
          <Themes />
        ) : activeTab === "Segments" ? (
          <Segments />
        ) : activeTab === "Respondents" ? (
          <Respondents />
        ) : (
          <MainContent onNavigate={(tab) => setActiveTab(tab)} />
        )}
      </div>
    </div>
  );
}

