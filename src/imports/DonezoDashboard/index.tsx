import svgPaths from "./svg-5x7mcc5rt7";
import imgDownloadAppBanner from "./c2e46341bacb74b8483e8440425ea6e3caf9fea3.png";
import imgProfileAvatar from "./119adb801822bb7577f873d4b007f7a4899ea16c.png";
import imgAvatar from "./33cf7140d91e2d226527cd50794e896f2c531f41.png";
import imgAvatar1 from "./32d55c0bd3bf8bc9b4cabd65f1ca80f4ee20f935.png";
import imgAvatar2 from "./2ff787ab01ae55f30fa18ab6e74e3bc67288cb6a.png";
import imgAvatar3 from "./c338a2ddfb97a61bbf8082a7a7da31e072d85582.png";
import imgTimeTrackerCard from "./e65731394c345c90a65ffa7e0fb75a9d9e24a2c2.png";

function CheckSquare() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="check-square">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="check-square">
          <path d={svgPaths.p3dd3d760} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function IconWrapperCheckSquare() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center overflow-clip relative shrink-0 size-[18px]" data-name="icon-wrapper-check-square">
      <CheckSquare />
    </div>
  );
}

function LogoIcon() {
  return (
    <div className="bg-[#114e32] content-stretch flex items-center justify-center relative rounded-[10px] shrink-0 size-[32px]" data-name="logo-icon">
      <IconWrapperCheckSquare />
    </div>
  );
}

function Logo() {
  return (
    <div className="content-stretch flex gap-[12px] items-center pl-[16px] relative shrink-0" data-name="logo">
      <LogoIcon />
      <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[normal] not-italic relative shrink-0 text-[#0f172a] text-[20px] whitespace-nowrap">Donezo</p>
    </div>
  );
}

function Layout() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="layout">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="layout">
          <path d={svgPaths.p34775e00} id="Vector" stroke="var(--stroke-0, #15803D)" strokeLinecap="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function IconWrapperLayout() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center overflow-clip relative shrink-0 size-[20px]" data-name="icon-wrapper-layout">
      <Layout />
    </div>
  );
}

function SidebarItemDashboard() {
  return (
    <div className="bg-[#dcfce7] relative rounded-[12px] shrink-0 w-full" data-name="sidebar-item-Dashboard">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center px-[16px] py-[12px] relative size-full">
          <IconWrapperLayout />
          <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] min-w-px not-italic relative text-[#14532d] text-[14px]">Dashboard</p>
          <div className="absolute bg-[#15803d] bottom-[8px] left-0 rounded-[2px] top-[8px] w-[4px]" data-name="Rectangle" />
        </div>
      </div>
    </div>
  );
}

function List() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="list">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="list">
          <path d={svgPaths.p24561400} id="Vector" stroke="var(--stroke-0, #64748B)" strokeLinecap="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function IconWrapperList() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center overflow-clip relative shrink-0 size-[20px]" data-name="icon-wrapper-list">
      <List />
    </div>
  );
}

function Badge() {
  return (
    <div className="bg-[#114e32] content-stretch flex items-start px-[8px] py-[2px] relative rounded-[99px] shrink-0" data-name="badge">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[10px] text-white whitespace-nowrap">12+</p>
    </div>
  );
}

function SidebarItemTasks() {
  return (
    <div className="relative rounded-[12px] shrink-0 w-full" data-name="sidebar-item-Tasks">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center px-[16px] py-[12px] relative size-full">
          <IconWrapperList />
          <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium leading-[normal] min-w-px not-italic relative text-[#64748b] text-[14px]">Tasks</p>
          <Badge />
        </div>
      </div>
    </div>
  );
}

function Calendar() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="calendar">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="calendar">
          <path d={svgPaths.p376ce800} id="Vector" stroke="var(--stroke-0, #64748B)" strokeLinecap="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function IconWrapperCalendar() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center overflow-clip relative shrink-0 size-[20px]" data-name="icon-wrapper-calendar">
      <Calendar />
    </div>
  );
}

function SidebarItemCalendar() {
  return (
    <div className="relative rounded-[12px] shrink-0 w-full" data-name="sidebar-item-Calendar">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center px-[16px] py-[12px] relative size-full">
          <IconWrapperCalendar />
          <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium leading-[normal] min-w-px not-italic relative text-[#64748b] text-[14px]">Calendar</p>
        </div>
      </div>
    </div>
  );
}

function BarChart() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="bar-chart-2">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="bar-chart-2">
          <path d={svgPaths.p2489bc90} id="Vector" stroke="var(--stroke-0, #64748B)" strokeLinecap="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function IconWrapperBarChart() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center overflow-clip relative shrink-0 size-[20px]" data-name="icon-wrapper-bar-chart-2">
      <BarChart />
    </div>
  );
}

function SidebarItemAnalytics() {
  return (
    <div className="relative rounded-[12px] shrink-0 w-full" data-name="sidebar-item-Analytics">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center px-[16px] py-[12px] relative size-full">
          <IconWrapperBarChart />
          <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium leading-[normal] min-w-px not-italic relative text-[#64748b] text-[14px]">Analytics</p>
        </div>
      </div>
    </div>
  );
}

function Users() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="users">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="users">
          <path d={svgPaths.p1165c980} id="Vector" stroke="var(--stroke-0, #64748B)" strokeLinecap="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function IconWrapperUsers() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center overflow-clip relative shrink-0 size-[20px]" data-name="icon-wrapper-users">
      <Users />
    </div>
  );
}

function SidebarItemTeam() {
  return (
    <div className="relative rounded-[12px] shrink-0 w-full" data-name="sidebar-item-Team">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center px-[16px] py-[12px] relative size-full">
          <IconWrapperUsers />
          <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium leading-[normal] min-w-px not-italic relative text-[#64748b] text-[14px]">Team</p>
        </div>
      </div>
    </div>
  );
}

function GroupMenu() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-name="group-menu">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[#64748b] text-[11px] whitespace-nowrap">MENU</p>
      <SidebarItemDashboard />
      <SidebarItemTasks />
      <SidebarItemCalendar />
      <SidebarItemAnalytics />
      <SidebarItemTeam />
    </div>
  );
}

function Settings() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="settings">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="settings">
          <path d={svgPaths.pc965540} id="Vector" stroke="var(--stroke-0, #64748B)" strokeLinecap="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function IconWrapperSettings() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center overflow-clip relative shrink-0 size-[20px]" data-name="icon-wrapper-settings">
      <Settings />
    </div>
  );
}

function SidebarItemSettings() {
  return (
    <div className="relative rounded-[12px] shrink-0 w-full" data-name="sidebar-item-Settings">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center px-[16px] py-[12px] relative size-full">
          <IconWrapperSettings />
          <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium leading-[normal] min-w-px not-italic relative text-[#64748b] text-[14px]">Settings</p>
        </div>
      </div>
    </div>
  );
}

function HelpCircle() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="help-circle">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_1_89)" id="help-circle">
          <path d={svgPaths.p1fb62380} id="Vector" stroke="var(--stroke-0, #64748B)" strokeLinecap="round" strokeWidth="2" />
        </g>
        <defs>
          <clipPath id="clip0_1_89">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function IconWrapperHelpCircle() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center overflow-clip relative shrink-0 size-[20px]" data-name="icon-wrapper-help-circle">
      <HelpCircle />
    </div>
  );
}

function SidebarItemHelp() {
  return (
    <div className="relative rounded-[12px] shrink-0 w-full" data-name="sidebar-item-Help">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center px-[16px] py-[12px] relative size-full">
          <IconWrapperHelpCircle />
          <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium leading-[normal] min-w-px not-italic relative text-[#64748b] text-[14px]">Help</p>
        </div>
      </div>
    </div>
  );
}

function LogOut() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="log-out">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="log-out">
          <path d={svgPaths.p3307f400} id="Vector" stroke="var(--stroke-0, #64748B)" strokeLinecap="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function IconWrapperLogOut() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center overflow-clip relative shrink-0 size-[20px]" data-name="icon-wrapper-log-out">
      <LogOut />
    </div>
  );
}

function SidebarItemLogout() {
  return (
    <div className="relative rounded-[12px] shrink-0 w-full" data-name="sidebar-item-Logout">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center px-[16px] py-[12px] relative size-full">
          <IconWrapperLogOut />
          <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium leading-[normal] min-w-px not-italic relative text-[#64748b] text-[14px]">Logout</p>
        </div>
      </div>
    </div>
  );
}

function GroupGeneral() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-name="group-general">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[#64748b] text-[11px] whitespace-nowrap">GENERAL</p>
      <SidebarItemSettings />
      <SidebarItemHelp />
      <SidebarItemLogout />
    </div>
  );
}

function NavGroups() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full" data-name="nav-groups">
      <GroupMenu />
      <GroupGeneral />
    </div>
  );
}

function Spacer() {
  return <div className="flex-[1_0_0] min-h-px relative w-[100px]" data-name="spacer" />;
}

function Smartphone() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="smartphone">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="smartphone">
          <path d={svgPaths.p374b4600} id="Vector" stroke="var(--stroke-0, #14532D)" strokeLinecap="round" />
        </g>
      </svg>
    </div>
  );
}

function IconWrapperSmartphone() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center overflow-clip relative shrink-0 size-[16px]" data-name="icon-wrapper-smartphone">
      <Smartphone />
    </div>
  );
}

function PromoIcon() {
  return (
    <div className="bg-white content-stretch flex items-center justify-center relative rounded-[6px] shrink-0 size-[28px]" data-name="promo-icon">
      <IconWrapperSmartphone />
    </div>
  );
}

function PromoText() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[4px] items-start leading-[normal] not-italic relative shrink-0 w-[162px]" data-name="promo-text">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold relative shrink-0 text-[13px] text-white w-full">Download our Mobile App</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal relative shrink-0 text-[#d1fae5] text-[11px] w-full">Get easy in another way</p>
    </div>
  );
}

function DownloadButton() {
  return (
    <div className="bg-white relative rounded-[8px] shrink-0 w-full" data-name="download-button">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center px-[16px] py-[8px] relative size-full">
          <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[#114e32] text-[12px] whitespace-nowrap">Download</p>
        </div>
      </div>
    </div>
  );
}

function DownloadAppBanner() {
  return (
    <div className="relative rounded-[16px] shrink-0 w-full" data-name="download-app-banner">
      <div aria-hidden className="absolute inset-0 pointer-events-none rounded-[16px]">
        <img alt="" className="absolute max-w-none object-cover rounded-[16px] size-full" src={imgDownloadAppBanner} />
        <div className="absolute bg-[rgba(17,78,50,0.85)] inset-0 rounded-[16px]" />
      </div>
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col gap-[12px] items-start p-[16px] relative size-full">
          <PromoIcon />
          <PromoText />
          <DownloadButton />
        </div>
      </div>
    </div>
  );
}

function Sidebar() {
  return (
    <div className="bg-white relative self-stretch shrink-0 w-[260px]" data-name="sidebar">
      <div aria-hidden className="absolute border-[#e2e8f0] border-r border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex flex-col gap-[32px] items-start p-[24px] relative size-full">
        <Logo />
        <NavGroups />
        <Spacer />
        <DownloadAppBanner />
      </div>
    </div>
  );
}

function Search() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="search">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="search">
          <path d={svgPaths.p3f6e0f00} id="Vector" stroke="var(--stroke-0, #64748B)" strokeLinecap="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function IconWrapperSearch() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center overflow-clip relative shrink-0 size-[16px]" data-name="icon-wrapper-search">
      <Search />
    </div>
  );
}

function Shortcut() {
  return (
    <div className="bg-[#f4f7f6] content-stretch flex items-start px-[6px] py-[2px] relative rounded-[4px] shrink-0" data-name="shortcut">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#64748b] text-[11px] whitespace-nowrap">⌘ F</p>
    </div>
  );
}

function SearchInputWrapper() {
  return (
    <div className="bg-white content-stretch flex gap-[12px] items-center px-[16px] py-[10px] relative rounded-[12px] shrink-0 w-[360px]" data-name="search-input-wrapper">
      <div aria-hidden className="absolute border border-[#e2e8f0] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <IconWrapperSearch />
      <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[normal] min-w-px not-italic relative text-[#64748b] text-[14px]">Search task</p>
      <Shortcut />
    </div>
  );
}

function Mail() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="mail">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="mail">
          <path d={svgPaths.pd3d5900} id="Vector" stroke="var(--stroke-0, #0F172A)" strokeLinecap="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function IconWrapperMail() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center overflow-clip relative shrink-0 size-[18px]" data-name="icon-wrapper-mail">
      <Mail />
    </div>
  );
}

function IconBtn() {
  return (
    <div className="bg-white content-stretch flex items-center justify-center relative rounded-[20px] shrink-0 size-[40px]" data-name="icon-btn">
      <div aria-hidden className="absolute border border-[#e2e8f0] border-solid inset-0 pointer-events-none rounded-[20px]" />
      <IconWrapperMail />
    </div>
  );
}

function Bell() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="bell">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="bell">
          <path d={svgPaths.p13cb380} id="Vector" stroke="var(--stroke-0, #0F172A)" strokeLinecap="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function IconWrapperBell() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center overflow-clip relative shrink-0 size-[18px]" data-name="icon-wrapper-bell">
      <Bell />
    </div>
  );
}

function IconBtn1() {
  return (
    <div className="bg-white content-stretch flex items-center justify-center relative rounded-[20px] shrink-0 size-[40px]" data-name="icon-btn">
      <div aria-hidden className="absolute border border-[#e2e8f0] border-solid inset-0 pointer-events-none rounded-[20px]" />
      <IconWrapperBell />
    </div>
  );
}

function UtilityIcons() {
  return (
    <div className="content-stretch flex gap-[12px] items-start relative shrink-0" data-name="utility-icons">
      <IconBtn />
      <IconBtn1 />
    </div>
  );
}

function ProfileMeta() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[2px] items-start leading-[normal] not-italic relative shrink-0 whitespace-nowrap" data-name="profile-meta">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold relative shrink-0 text-[#0f172a] text-[14px]">Totok Michael</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal relative shrink-0 text-[#64748b] text-[11px]">tmichael20@mail.com</p>
    </div>
  );
}

function UserProfile() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0" data-name="user-profile">
      <div className="relative shrink-0 size-[40px]" data-name="profile-avatar">
        <img alt="" className="absolute block inset-0 max-w-none size-full" height="40" src={imgProfileAvatar} width="40" />
      </div>
      <ProfileMeta />
    </div>
  );
}

function TopBarRight() {
  return (
    <div className="content-stretch flex gap-[24px] items-center relative shrink-0" data-name="top-bar-right">
      <UtilityIcons />
      <UserProfile />
    </div>
  );
}

function TopBar() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="top-bar">
      <SearchInputWrapper />
      <TopBarRight />
    </div>
  );
}

function HeadingTexts() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[4px] items-start leading-[normal] not-italic relative shrink-0 whitespace-nowrap" data-name="heading-texts">
      <p className="font-['Inter:Bold',sans-serif] font-bold relative shrink-0 text-[#0f172a] text-[28px]">Dashboard</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal relative shrink-0 text-[#64748b] text-[14px]">Plan, prioritize, and accomplish your tasks with ease.</p>
    </div>
  );
}

function Plus() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="plus">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="plus">
          <path d={svgPaths.p1529f7e0} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function IconWrapperPlus() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center overflow-clip relative shrink-0 size-[16px]" data-name="icon-wrapper-plus">
      <Plus />
    </div>
  );
}

function BtnAddProject() {
  return (
    <div className="bg-[#114e32] content-stretch flex gap-[8px] items-center px-[16px] py-[10px] relative rounded-[12px] shrink-0" data-name="btn-add-project">
      <IconWrapperPlus />
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap">Add Project</p>
    </div>
  );
}

function BtnImport() {
  return (
    <div className="bg-white content-stretch flex items-center px-[16px] py-[10px] relative rounded-[12px] shrink-0" data-name="btn-import">
      <div aria-hidden className="absolute border border-[#e2e8f0] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[#0f172a] text-[14px] whitespace-nowrap">Import Data</p>
    </div>
  );
}

function HeadingButtons() {
  return (
    <div className="content-stretch flex gap-[12px] items-start relative shrink-0" data-name="heading-buttons">
      <BtnAddProject />
      <BtnImport />
    </div>
  );
}

function DashboardHeader() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="dashboard-header">
      <HeadingTexts />
      <HeadingButtons />
    </div>
  );
}

function ArrowCircle() {
  return (
    <div className="bg-[#15803d] content-stretch flex items-center justify-center relative rounded-[16px] shrink-0 size-[32px]" data-name="arrow-circle">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap">↗</p>
    </div>
  );
}

function CardTop() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="card-top">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap">Total Projects</p>
      <ArrowCircle />
    </div>
  );
}

function IncreaseBadge() {
  return (
    <div className="bg-white content-stretch flex items-start px-[6px] py-[2px] relative rounded-[6px] shrink-0" data-name="increase-badge">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[11px] text-white whitespace-nowrap">5%</p>
    </div>
  );
}

function CardFooter() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="card-footer">
      <IncreaseBadge />
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[11px] text-white whitespace-nowrap">Increased from last month</p>
    </div>
  );
}

function MetricCard() {
  return (
    <div className="bg-[#114e32] flex-[1_0_0] min-w-px relative rounded-[20px] self-stretch" data-name="metric-card">
      <div className="content-stretch flex flex-col gap-[12px] items-start p-[24px] relative size-full">
        <CardTop />
        <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[normal] not-italic relative shrink-0 text-[36px] text-white whitespace-nowrap">24</p>
        <CardFooter />
      </div>
    </div>
  );
}

function ArrowCircle1() {
  return (
    <div className="bg-white content-stretch flex items-center justify-center relative rounded-[16px] shrink-0 size-[32px]" data-name="arrow-circle">
      <div aria-hidden className="absolute border border-[#e2e8f0] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[#0f172a] text-[14px] whitespace-nowrap">↗</p>
    </div>
  );
}

function CardTop1() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="card-top">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[#64748b] text-[14px] whitespace-nowrap">Ended Projects</p>
      <ArrowCircle1 />
    </div>
  );
}

function TrendingUp() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="trending-up">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="trending-up">
          <path d={svgPaths.p3baed800} id="Vector" stroke="var(--stroke-0, #15803D)" strokeLinecap="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function IconWrapperTrendingUp() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center overflow-clip relative shrink-0 size-[14px]" data-name="icon-wrapper-trending-up">
      <TrendingUp />
    </div>
  );
}

function CardFooter1() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="card-footer">
      <IconWrapperTrendingUp />
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#64748b] text-[11px] whitespace-nowrap">Increased from last month</p>
    </div>
  );
}

function MetricCard1() {
  return (
    <div className="bg-white drop-shadow-[0px_4px_6px_rgba(0,0,0,0.02)] flex-[1_0_0] min-w-px relative rounded-[20px] self-stretch" data-name="metric-card">
      <div aria-hidden className="absolute border border-[#e2e8f0] border-solid inset-0 pointer-events-none rounded-[20px]" />
      <div className="content-stretch flex flex-col gap-[12px] items-start p-[24px] relative size-full">
        <CardTop1 />
        <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[normal] not-italic relative shrink-0 text-[#0f172a] text-[36px] whitespace-nowrap">10</p>
        <CardFooter1 />
      </div>
    </div>
  );
}

function ArrowCircle2() {
  return (
    <div className="bg-white content-stretch flex items-center justify-center relative rounded-[16px] shrink-0 size-[32px]" data-name="arrow-circle">
      <div aria-hidden className="absolute border border-[#e2e8f0] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[#0f172a] text-[14px] whitespace-nowrap">↗</p>
    </div>
  );
}

function CardTop2() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="card-top">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[#64748b] text-[14px] whitespace-nowrap">Running Projects</p>
      <ArrowCircle2 />
    </div>
  );
}

function TrendingUp1() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="trending-up">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="trending-up">
          <path d={svgPaths.p3baed800} id="Vector" stroke="var(--stroke-0, #15803D)" strokeLinecap="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function IconWrapperTrendingUp1() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center overflow-clip relative shrink-0 size-[14px]" data-name="icon-wrapper-trending-up">
      <TrendingUp1 />
    </div>
  );
}

function CardFooter2() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="card-footer">
      <IconWrapperTrendingUp1 />
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#64748b] text-[11px] whitespace-nowrap">Increased from last month</p>
    </div>
  );
}

function MetricCard2() {
  return (
    <div className="bg-white drop-shadow-[0px_4px_6px_rgba(0,0,0,0.02)] flex-[1_0_0] min-w-px relative rounded-[20px] self-stretch" data-name="metric-card">
      <div aria-hidden className="absolute border border-[#e2e8f0] border-solid inset-0 pointer-events-none rounded-[20px]" />
      <div className="content-stretch flex flex-col gap-[12px] items-start p-[24px] relative size-full">
        <CardTop2 />
        <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[normal] not-italic relative shrink-0 text-[#0f172a] text-[36px] whitespace-nowrap">12</p>
        <CardFooter2 />
      </div>
    </div>
  );
}

function ArrowCircle3() {
  return (
    <div className="bg-white content-stretch flex items-center justify-center relative rounded-[16px] shrink-0 size-[32px]" data-name="arrow-circle">
      <div aria-hidden className="absolute border border-[#e2e8f0] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[#0f172a] text-[14px] whitespace-nowrap">↘</p>
    </div>
  );
}

function CardTop3() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="card-top">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[#64748b] text-[14px] whitespace-nowrap">Pending Project</p>
      <ArrowCircle3 />
    </div>
  );
}

function TrendingUp2() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="trending-up">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="trending-up">
          <path d={svgPaths.p3baed800} id="Vector" stroke="var(--stroke-0, #15803D)" strokeLinecap="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function IconWrapperTrendingUp2() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center overflow-clip relative shrink-0 size-[14px]" data-name="icon-wrapper-trending-up">
      <TrendingUp2 />
    </div>
  );
}

function CardFooter3() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="card-footer">
      <IconWrapperTrendingUp2 />
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#64748b] text-[11px] whitespace-nowrap">On Discuss</p>
    </div>
  );
}

function MetricCard3() {
  return (
    <div className="bg-white drop-shadow-[0px_4px_6px_rgba(0,0,0,0.02)] flex-[1_0_0] min-w-px relative rounded-[20px] self-stretch" data-name="metric-card">
      <div aria-hidden className="absolute border border-[#e2e8f0] border-solid inset-0 pointer-events-none rounded-[20px]" />
      <div className="content-stretch flex flex-col gap-[12px] items-start p-[24px] relative size-full">
        <CardTop3 />
        <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[normal] not-italic relative shrink-0 text-[#0f172a] text-[36px] whitespace-nowrap">2</p>
        <CardFooter3 />
      </div>
    </div>
  );
}

function MetricsRow() {
  return (
    <div className="content-stretch flex gap-[16px] h-[165px] items-start relative shrink-0 w-full" data-name="metrics-row">
      <MetricCard />
      <MetricCard1 />
      <MetricCard2 />
      <MetricCard3 />
    </div>
  );
}

function ColS() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-center relative shrink-0" data-name="col-s">
      <div className="bg-[#e2e8f0] h-[60px] relative rounded-[8px] shrink-0 w-[32px]" data-name="bar" />
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#64748b] text-[12px] whitespace-nowrap">S</p>
    </div>
  );
}

function ColM() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-center relative shrink-0" data-name="col-m">
      <div className="bg-[#114e32] h-[90px] relative rounded-[8px] shrink-0 w-[32px]" data-name="bar" />
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#64748b] text-[12px] whitespace-nowrap">M</p>
    </div>
  );
}

function ChartTooltip() {
  return (
    <div className="absolute bg-[#10b981] content-stretch flex items-start left-0 px-[8px] py-[4px] rounded-[6px] top-[-24px]" data-name="chart-tooltip">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[10px] text-white whitespace-nowrap">74%</p>
    </div>
  );
}

function ColT() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-center relative shrink-0" data-name="col-t">
      <ChartTooltip />
      <div className="bg-[#34d399] h-[75px] relative rounded-[8px] shrink-0 w-[32px]" data-name="bar" />
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#64748b] text-[12px] whitespace-nowrap">T</p>
    </div>
  );
}

function ColW() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-center relative shrink-0" data-name="col-w">
      <div className="bg-[#114e32] h-[105px] relative rounded-[8px] shrink-0 w-[32px]" data-name="bar" />
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#64748b] text-[12px] whitespace-nowrap">W</p>
    </div>
  );
}

function ColT1() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-center relative shrink-0" data-name="col-t">
      <div className="bg-[#e2e8f0] h-[80px] relative rounded-[8px] shrink-0 w-[32px]" data-name="bar" />
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#64748b] text-[12px] whitespace-nowrap">T</p>
    </div>
  );
}

function ColF() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-center relative shrink-0" data-name="col-f">
      <div className="bg-[#e2e8f0] h-[50px] relative rounded-[8px] shrink-0 w-[32px]" data-name="bar" />
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#64748b] text-[12px] whitespace-nowrap">F</p>
    </div>
  );
}

function ColS1() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-center relative shrink-0" data-name="col-s">
      <div className="bg-[#e2e8f0] h-[70px] relative rounded-[8px] shrink-0 w-[32px]" data-name="bar" />
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#64748b] text-[12px] whitespace-nowrap">S</p>
    </div>
  );
}

function MockChartContainer() {
  return (
    <div className="content-stretch flex h-[120px] items-end justify-between pb-[8px] relative shrink-0 w-full" data-name="mock-chart-container">
      <ColS />
      <ColM />
      <ColT />
      <ColW />
      <ColT1 />
      <ColF />
      <ColS1 />
    </div>
  );
}

function AnalyticsPanel() {
  return (
    <div className="bg-white flex-[1_0_0] min-w-px relative rounded-[20px]" data-name="analytics-panel">
      <div aria-hidden className="absolute border border-[#e2e8f0] border-solid inset-0 pointer-events-none rounded-[20px]" />
      <div className="content-stretch flex flex-col gap-[16px] items-start p-[20px] relative size-full">
        <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[#0f172a] text-[16px] whitespace-nowrap">Project Analytics</p>
        <MockChartContainer />
      </div>
    </div>
  );
}

function MoreHorizontal() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="more-horizontal">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="more-horizontal">
          <g id="Vector">
            <path d={svgPaths.p33f06300} stroke="var(--stroke-0, #64748B)" strokeLinecap="round" strokeWidth="2" />
            <path d={svgPaths.p1c8a3c80} stroke="var(--stroke-0, #64748B)" strokeLinecap="round" strokeWidth="2" />
            <path d={svgPaths.p116c5a00} stroke="var(--stroke-0, #64748B)" strokeLinecap="round" strokeWidth="2" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function IconWrapperMoreHorizontal() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center overflow-clip relative shrink-0 size-[16px]" data-name="icon-wrapper-more-horizontal">
      <MoreHorizontal />
    </div>
  );
}

function RemindersHeader() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="reminders-header">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[#0f172a] text-[16px] whitespace-nowrap">Reminders</p>
      <IconWrapperMoreHorizontal />
    </div>
  );
}

function ReminderCard() {
  return (
    <div className="relative shrink-0 w-full" data-name="reminder-card">
      <div aria-hidden className="absolute border-[#43db83] border-l-3 border-solid inset-0 pointer-events-none" />
      <div className="[word-break:break-word] content-stretch flex flex-col gap-[4px] items-start leading-[normal] not-italic pl-[12px] relative size-full">
        <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold relative shrink-0 text-[#0f172a] text-[14px] w-full">Meeting with Arc Company</p>
        <p className="font-['Inter:Regular',sans-serif] font-normal relative shrink-0 text-[#64748b] text-[12px] w-full">Time : 02.00 pm - 04.00 pm</p>
      </div>
    </div>
  );
}

function Video() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="video">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="video">
          <path d={svgPaths.p3eebff00} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function IconWrapperVideo() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center overflow-clip relative shrink-0 size-[16px]" data-name="icon-wrapper-video">
      <Video />
    </div>
  );
}

function BtnStartMeeting() {
  return (
    <div className="bg-[#114e32] relative rounded-[12px] shrink-0 w-full" data-name="btn-start-meeting">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex gap-[8px] items-center justify-center px-[16px] py-[10px] relative size-full">
          <IconWrapperVideo />
          <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[13px] text-white whitespace-nowrap">Start Meeting</p>
        </div>
      </div>
    </div>
  );
}

function RemindersPanel() {
  return (
    <div className="bg-white content-stretch flex flex-col gap-[16px] items-start justify-center p-[20px] relative rounded-[20px] shrink-0 w-[260px]" data-name="reminders-panel">
      <div aria-hidden className="absolute border border-[#e2e8f0] border-solid inset-0 pointer-events-none rounded-[20px]" />
      <RemindersHeader />
      <ReminderCard />
      <BtnStartMeeting />
    </div>
  );
}

function SubRowAnalytics() {
  return (
    <div className="content-stretch flex gap-[16px] items-start relative shrink-0 w-full" data-name="sub-row-analytics">
      <AnalyticsPanel />
      <RemindersPanel />
    </div>
  );
}

function BtnAddMember() {
  return (
    <div className="bg-[#f4f7f6] content-stretch flex items-center px-[12px] py-[6px] relative rounded-[8px] shrink-0" data-name="btn-add-member">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[#114e32] text-[11px] whitespace-nowrap">+ Add Member</p>
    </div>
  );
}

function TeamHeader() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="team-header">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[#0f172a] text-[16px] whitespace-nowrap">Team Collaboration</p>
      <BtnAddMember />
    </div>
  );
}

function TeamInfo() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[2px] items-start min-w-px not-italic relative whitespace-nowrap" data-name="team-info">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[#0f172a] text-[13px]">Alexandra Deff</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[0] min-w-full overflow-hidden relative shrink-0 text-[#64748b] text-[11px] text-ellipsis w-[min-content]">
        <span className="leading-[normal]">{`Working on `}</span>
        <span className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] text-[#0f172a]">Github Project Repository</span>
      </p>
    </div>
  );
}

function StatusBadge() {
  return (
    <div className="bg-[#dcfce7] content-stretch flex items-start px-[10px] py-[4px] relative rounded-[8px] shrink-0" data-name="status-badge">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[#15803d] text-[11px] whitespace-nowrap">Completed</p>
    </div>
  );
}

function TeamRowAlexandraDeff() {
  return (
    <div className="content-stretch flex gap-[12px] items-center py-[10px] relative shrink-0 w-full" data-name="team-row-Alexandra Deff">
      <div className="relative shrink-0 size-[36px]" data-name="avatar">
        <img alt="" className="absolute block inset-0 max-w-none size-full" height="36" src={imgAvatar} width="36" />
      </div>
      <TeamInfo />
      <StatusBadge />
    </div>
  );
}

function TeamInfo1() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[2px] items-start min-w-px not-italic relative whitespace-nowrap" data-name="team-info">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[#0f172a] text-[13px]">Edwin Adenike</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[0] min-w-full overflow-hidden relative shrink-0 text-[#64748b] text-[11px] text-ellipsis w-[min-content]">
        <span className="leading-[normal]">{`Working on `}</span>
        <span className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] text-[#0f172a]">Integrate User Authentication System</span>
      </p>
    </div>
  );
}

function StatusBadge1() {
  return (
    <div className="bg-[#fef9c3] content-stretch flex items-start px-[10px] py-[4px] relative rounded-[8px] shrink-0" data-name="status-badge">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[#a16207] text-[11px] whitespace-nowrap">In Progress</p>
    </div>
  );
}

function TeamRowEdwinAdenike() {
  return (
    <div className="content-stretch flex gap-[12px] items-center py-[10px] relative shrink-0 w-full" data-name="team-row-Edwin Adenike">
      <div className="relative shrink-0 size-[36px]" data-name="avatar">
        <img alt="" className="absolute block inset-0 max-w-none size-full" height="36" src={imgAvatar1} width="36" />
      </div>
      <TeamInfo1 />
      <StatusBadge1 />
    </div>
  );
}

function TeamInfo2() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[2px] items-start min-w-px not-italic relative whitespace-nowrap" data-name="team-info">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[#0f172a] text-[13px]">Isaac Oluwatemilorun</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[0] min-w-full overflow-hidden relative shrink-0 text-[#64748b] text-[11px] text-ellipsis w-[min-content]">
        <span className="leading-[normal]">{`Working on `}</span>
        <span className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] text-[#0f172a]">Develop Search and Filter Functionality</span>
      </p>
    </div>
  );
}

function StatusBadge2() {
  return (
    <div className="bg-[#f1f5f9] content-stretch flex items-start px-[10px] py-[4px] relative rounded-[8px] shrink-0" data-name="status-badge">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[#475569] text-[11px] whitespace-nowrap">Pending</p>
    </div>
  );
}

function TeamRowIsaacOluwatemilorun() {
  return (
    <div className="content-stretch flex gap-[12px] items-center py-[10px] relative shrink-0 w-full" data-name="team-row-Isaac Oluwatemilorun">
      <div className="relative shrink-0 size-[36px]" data-name="avatar">
        <img alt="" className="absolute block inset-0 max-w-none size-full" height="36" src={imgAvatar2} width="36" />
      </div>
      <TeamInfo2 />
      <StatusBadge2 />
    </div>
  );
}

function TeamInfo3() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[2px] items-start min-w-px not-italic relative whitespace-nowrap" data-name="team-info">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[#0f172a] text-[13px]">David Oshodi</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[0] min-w-full overflow-hidden relative shrink-0 text-[#64748b] text-[11px] text-ellipsis w-[min-content]">
        <span className="leading-[normal]">{`Working on `}</span>
        <span className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] text-[#0f172a]">Responsive Layout for Homepage</span>
      </p>
    </div>
  );
}

function StatusBadge3() {
  return (
    <div className="bg-[#fef9c3] content-stretch flex items-start px-[10px] py-[4px] relative rounded-[8px] shrink-0" data-name="status-badge">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[#a16207] text-[11px] whitespace-nowrap">In Progress</p>
    </div>
  );
}

function TeamRowDavidOshodi() {
  return (
    <div className="content-stretch flex gap-[12px] items-center py-[10px] relative shrink-0 w-full" data-name="team-row-David Oshodi">
      <div className="relative shrink-0 size-[36px]" data-name="avatar">
        <img alt="" className="absolute block inset-0 max-w-none size-full" height="36" src={imgAvatar3} width="36" />
      </div>
      <TeamInfo3 />
      <StatusBadge3 />
    </div>
  );
}

function TeamList() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-name="team-list">
      <TeamRowAlexandraDeff />
      <TeamRowEdwinAdenike />
      <TeamRowIsaacOluwatemilorun />
      <TeamRowDavidOshodi />
    </div>
  );
}

function TeamPanel() {
  return (
    <div className="bg-white relative rounded-[20px] shrink-0 w-full" data-name="team-panel">
      <div aria-hidden className="absolute border border-[#e2e8f0] border-solid inset-0 pointer-events-none rounded-[20px]" />
      <div className="content-stretch flex flex-col gap-[12px] items-start p-[20px] relative size-full">
        <TeamHeader />
        <TeamList />
      </div>
    </div>
  );
}

function GridLeftCol() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[16px] h-full items-start min-w-px relative" data-name="grid-left-col">
      <SubRowAnalytics />
      <TeamPanel />
    </div>
  );
}

function CenteredLabels() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 [word-break:break-word] absolute content-stretch flex flex-col gap-[2px] items-center leading-[normal] left-1/2 not-italic top-[calc(50%+20px)] whitespace-nowrap" data-name="centered-labels">
      <p className="font-['Inter:Bold',sans-serif] font-bold relative shrink-0 text-[#0f172a] text-[28px]">41%</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal relative shrink-0 text-[#64748b] text-[11px]">Project Ended</p>
    </div>
  );
}

function CircleContainer() {
  return (
    <div className="content-stretch flex flex-col h-[140px] items-center justify-center relative shrink-0 w-full" data-name="circle-container">
      <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[120px] top-1/2" data-name="track-bg">
        <div className="absolute bottom-1/2 left-0 right-0 top-0">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 120 60">
            <path d={svgPaths.p3b906500} fill="var(--fill-0, #E2E8F0)" id="track-bg" />
          </svg>
        </div>
      </div>
      <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[120px] top-1/2" data-name="progress-fill">
        <div className="absolute bottom-1/2 left-0 right-[61.16%] top-[1.99%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 46.6084 57.6176">
            <path d={svgPaths.p15cf9280} fill="var(--fill-0, #114E32)" id="progress-fill" />
          </svg>
        </div>
      </div>
      <CenteredLabels />
    </div>
  );
}

function LegItem() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="leg-item">
      <div className="relative shrink-0 size-[8px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 8">
          <circle cx="4" cy="4" fill="var(--fill-0, #114E32)" id="Ellipse" r="4" />
        </svg>
      </div>
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#64748b] text-[11px] whitespace-nowrap">Completed</p>
    </div>
  );
}

function LegItem1() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="leg-item">
      <div className="relative shrink-0 size-[8px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 8">
          <circle cx="4" cy="4" fill="var(--fill-0, #34D399)" id="Ellipse" r="4" />
        </svg>
      </div>
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#64748b] text-[11px] whitespace-nowrap">In Progress</p>
    </div>
  );
}

function LegItem2() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="leg-item">
      <div className="relative shrink-0 size-[8px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 8">
          <circle cx="4" cy="4" fill="var(--fill-0, #E2E8F0)" id="Ellipse" r="4" />
        </svg>
      </div>
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#64748b] text-[11px] whitespace-nowrap">Pending</p>
    </div>
  );
}

function LegendRow() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="legend-row">
      <LegItem />
      <LegItem1 />
      <LegItem2 />
    </div>
  );
}

function ProjectProgressPanel() {
  return (
    <div className="bg-white relative rounded-[20px] shrink-0 w-full" data-name="project-progress-panel">
      <div aria-hidden className="absolute border border-[#e2e8f0] border-solid inset-0 pointer-events-none rounded-[20px]" />
      <div className="content-stretch flex flex-col gap-[16px] items-start p-[20px] relative size-full">
        <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[#0f172a] text-[16px] whitespace-nowrap">Project Progress</p>
        <CircleContainer />
        <LegendRow />
      </div>
    </div>
  );
}

function BtnNewProject() {
  return (
    <div className="content-stretch flex items-center px-[10px] py-[6px] relative rounded-[8px] shrink-0" data-name="btn-new-project">
      <div aria-hidden className="absolute border border-[#e2e8f0] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[#0f172a] text-[11px] whitespace-nowrap">+ New</p>
    </div>
  );
}

function ProjectsHeader() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="projects-header">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[#0f172a] text-[16px] whitespace-nowrap">Project</p>
      <BtnNewProject />
    </div>
  );
}

function Folder() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="folder">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="folder">
          <path d={svgPaths.p212c5d80} id="Vector" stroke="var(--stroke-0, #3B82F6)" strokeLinecap="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function IconWrapperFolder() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center overflow-clip relative shrink-0 size-[16px]" data-name="icon-wrapper-folder">
      <Folder />
    </div>
  );
}

function ProjectIconIndicator() {
  return (
    <div className="bg-[rgba(59,130,246,0.08)] content-stretch flex items-center justify-center relative rounded-[8px] shrink-0 size-[32px]" data-name="project-icon-indicator">
      <IconWrapperFolder />
    </div>
  );
}

function ProjectInfo() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[2px] items-start leading-[normal] min-w-px not-italic relative whitespace-nowrap" data-name="project-info">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold overflow-hidden relative shrink-0 text-[#0f172a] text-[13px] text-ellipsis">Develop API Endpoints</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal relative shrink-0 text-[#64748b] text-[11px]">Due date: Nov 26, 2024</p>
    </div>
  );
}

function ProjectItemDevelopApiEndpoints() {
  return (
    <div className="content-stretch flex gap-[12px] items-center py-[12px] relative shrink-0 w-full" data-name="project-item-Develop API Endpoints">
      <div aria-hidden className="absolute border-[#e2e8f0] border-b border-solid inset-0 pointer-events-none" />
      <ProjectIconIndicator />
      <ProjectInfo />
    </div>
  );
}

function Folder1() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="folder">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="folder">
          <path d={svgPaths.p212c5d80} id="Vector" stroke="var(--stroke-0, #F59E0B)" strokeLinecap="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function IconWrapperFolder1() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center overflow-clip relative shrink-0 size-[16px]" data-name="icon-wrapper-folder">
      <Folder1 />
    </div>
  );
}

function ProjectIconIndicator1() {
  return (
    <div className="bg-[#f59e0b] content-stretch flex items-center justify-center relative rounded-[8px] shrink-0 size-[32px]" data-name="project-icon-indicator">
      <IconWrapperFolder1 />
    </div>
  );
}

function ProjectInfo1() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[2px] items-start leading-[normal] min-w-px not-italic relative whitespace-nowrap" data-name="project-info">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold overflow-hidden relative shrink-0 text-[#0f172a] text-[13px] text-ellipsis">Build Dashboard</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal relative shrink-0 text-[#64748b] text-[11px]">Due date: Nov 30, 2024</p>
    </div>
  );
}

function ProjectItemBuildDashboard() {
  return (
    <div className="content-stretch flex gap-[12px] items-center py-[12px] relative shrink-0 w-full" data-name="project-item-Build Dashboard">
      <div aria-hidden className="absolute border-[#e2e8f0] border-b border-solid inset-0 pointer-events-none" />
      <ProjectIconIndicator1 />
      <ProjectInfo1 />
    </div>
  );
}

function Folder2() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="folder">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="folder">
          <path d={svgPaths.p212c5d80} id="Vector" stroke="var(--stroke-0, #EF4444)" strokeLinecap="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function IconWrapperFolder2() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center overflow-clip relative shrink-0 size-[16px]" data-name="icon-wrapper-folder">
      <Folder2 />
    </div>
  );
}

function ProjectIconIndicator2() {
  return (
    <div className="bg-[#ef4444] content-stretch flex items-center justify-center relative rounded-[8px] shrink-0 size-[32px]" data-name="project-icon-indicator">
      <IconWrapperFolder2 />
    </div>
  );
}

function ProjectInfo2() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[2px] items-start leading-[normal] min-w-px not-italic relative whitespace-nowrap" data-name="project-info">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold overflow-hidden relative shrink-0 text-[#0f172a] text-[13px] text-ellipsis">Optimize Page Load</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal relative shrink-0 text-[#64748b] text-[11px]">Due date: Dec 5, 2024</p>
    </div>
  );
}

function ProjectItemOptimizePageLoad() {
  return (
    <div className="content-stretch flex gap-[12px] items-center py-[12px] relative shrink-0 w-full" data-name="project-item-Optimize Page Load">
      <div aria-hidden className="absolute border-[#e2e8f0] border-b border-solid inset-0 pointer-events-none" />
      <ProjectIconIndicator2 />
      <ProjectInfo2 />
    </div>
  );
}

function Folder3() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="folder">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="folder">
          <path d={svgPaths.p212c5d80} id="Vector" stroke="var(--stroke-0, #8B5CF6)" strokeLinecap="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function IconWrapperFolder3() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center overflow-clip relative shrink-0 size-[16px]" data-name="icon-wrapper-folder">
      <Folder3 />
    </div>
  );
}

function ProjectIconIndicator3() {
  return (
    <div className="bg-[rgba(139,92,246,0.08)] content-stretch flex items-center justify-center relative rounded-[8px] shrink-0 size-[32px]" data-name="project-icon-indicator">
      <IconWrapperFolder3 />
    </div>
  );
}

function ProjectInfo3() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[2px] items-start leading-[normal] min-w-px not-italic relative whitespace-nowrap" data-name="project-info">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold overflow-hidden relative shrink-0 text-[#0f172a] text-[13px] text-ellipsis">Cross-Browser Testing</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal relative shrink-0 text-[#64748b] text-[11px]">Due date: Dec 6, 2024</p>
    </div>
  );
}

function ProjectItemCrossBrowserTesting() {
  return (
    <div className="content-stretch flex gap-[12px] items-center py-[12px] relative shrink-0 w-full" data-name="project-item-Cross-Browser Testing">
      <div aria-hidden className="absolute border-[#e2e8f0] border-b border-solid inset-0 pointer-events-none" />
      <ProjectIconIndicator3 />
      <ProjectInfo3 />
    </div>
  );
}

function ListItems() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="list-items">
      <ProjectItemDevelopApiEndpoints />
      <ProjectItemBuildDashboard />
      <ProjectItemOptimizePageLoad />
      <ProjectItemCrossBrowserTesting />
    </div>
  );
}

function ProjectsListPanel() {
  return (
    <div className="bg-white relative rounded-[20px] shrink-0 w-full" data-name="projects-list-panel">
      <div aria-hidden className="absolute border border-[#e2e8f0] border-solid inset-0 pointer-events-none rounded-[20px]" />
      <div className="content-stretch flex flex-col gap-[12px] items-start p-[20px] relative size-full">
        <ProjectsHeader />
        <ListItems />
      </div>
    </div>
  );
}

function Pause() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="pause">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="pause">
          <g id="Vector">
            <path d={svgPaths.p26327d80} stroke="var(--stroke-0, #114E32)" strokeLinecap="round" strokeWidth="2" />
            <path d={svgPaths.p35b50300} stroke="var(--stroke-0, #114E32)" strokeLinecap="round" strokeWidth="2" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function IconWrapperPause() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center overflow-clip relative shrink-0 size-[14px]" data-name="icon-wrapper-pause">
      <Pause />
    </div>
  );
}

function CtrlPause() {
  return (
    <div className="bg-white content-stretch flex items-center justify-center relative rounded-[16px] shrink-0 size-[32px]" data-name="ctrl-pause">
      <IconWrapperPause />
    </div>
  );
}

function Square() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="square">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g clipPath="url(#clip0_1_3)" id="square">
          <path d={svgPaths.pc71600} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeWidth="2" />
        </g>
        <defs>
          <clipPath id="clip0_1_3">
            <rect fill="white" height="14" width="14" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function IconWrapperSquare() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center overflow-clip relative shrink-0 size-[14px]" data-name="icon-wrapper-square">
      <Square />
    </div>
  );
}

function CtrlStop() {
  return (
    <div className="bg-[#ef4444] content-stretch flex items-center justify-center relative rounded-[16px] shrink-0 size-[32px]" data-name="ctrl-stop">
      <IconWrapperSquare />
    </div>
  );
}

function TrackerControls() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full" data-name="tracker-controls">
      <CtrlPause />
      <CtrlStop />
    </div>
  );
}

function TimeTrackerCard() {
  return (
    <div className="relative rounded-[20px] shrink-0 w-full" data-name="time-tracker-card">
      <div aria-hidden className="absolute inset-0 pointer-events-none rounded-[20px]">
        <img alt="" className="absolute max-w-none object-cover rounded-[20px] size-full" src={imgTimeTrackerCard} />
        <div className="absolute bg-[rgba(17,78,50,0.9)] inset-0 rounded-[20px]" />
      </div>
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col gap-[16px] items-start p-[20px] relative size-full">
          <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[#d1fae5] text-[13px] w-full">Time Tracker</p>
          <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[normal] not-italic relative shrink-0 text-[32px] text-white w-full">01:24:08</p>
          <TrackerControls />
        </div>
      </div>
    </div>
  );
}

function GridRightCol() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] h-full items-start relative shrink-0 w-[340px]" data-name="grid-right-col">
      <ProjectProgressPanel />
      <ProjectsListPanel />
      <TimeTrackerCard />
    </div>
  );
}

function DashboardGrid() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[16px] items-start min-h-px relative w-full" data-name="dashboard-grid">
      <GridLeftCol />
      <GridRightCol />
    </div>
  );
}

function WorkspaceContainer() {
  return (
    <div className="flex-[1_0_0] h-[1115px] min-w-px relative" data-name="workspace-container">
      <div className="content-stretch flex flex-col gap-[24px] items-start p-[24px] relative size-full">
        <TopBar />
        <DashboardHeader />
        <MetricsRow />
        <DashboardGrid />
      </div>
    </div>
  );
}

function DonezoDashboardFrame() {
  return (
    <div className="bg-[#f4f7f6] content-stretch flex items-start overflow-clip relative rounded-[32px] shadow-[0px_16px_40px_0px_rgba(15,23,42,0.08)] shrink-0 w-[1360px]" data-name="donezo-dashboard-frame">
      <Sidebar />
      <WorkspaceContainer />
    </div>
  );
}

export default function DonezoDashboard() {
  return (
    <div className="bg-[#ebf1f5] content-stretch flex flex-col items-center justify-center p-[40px] relative size-full" data-name="donezo-dashboard">
      <DonezoDashboardFrame />
    </div>
  );
}