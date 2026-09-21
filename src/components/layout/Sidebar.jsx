import React, { useState } from "react";
import {
  LayoutDashboard,
  Award,
  ClipboardCheck,
  Target,
  TrendingUp,
  FolderKanban,
  FileBadge,
  LineChart as LineChartIcon,
  Settings,
  User,
  ChevronDown,
  BadgeCheck,
  Menu,
  X,
  Sparkles,
} from "lucide-react";
import { SkillVerseIcon } from "../common/Logo";

export function Sidebar({
  activePage,
  onNavigate,
  mobileOpen,
  setMobileOpen,
  profile,
  avatar,
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [openSections, setOpenSections] = useState({
    menu: true,
    skills: true,
    showcase: true,
  });

  const toggleSection = (section) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  // Removed "My Activity" - Dashboard opens automatically by default and via Logo
  const menuItems = [
    { id: "profile", label: "Overview", icon: User },
    { id: "progress", label: "My Stats", icon: LineChartIcon },
  ];

  const skillItems = [
    { id: "skills", label: "Skills List", icon: Award },
    { id: "assessments", label: "Proof Ledger", icon: ClipboardCheck },
    { id: "gap", label: "Gap Analysis", icon: TrendingUp },
  ];

  const showcaseItems = [
    { id: "projects", label: "Projects", icon: FolderKanban },
    { id: "certificates", label: "Certificates", icon: FileBadge },
    { id: "goal", label: "Career Goal", icon: Target },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const allItems = [...menuItems, ...skillItems, ...showcaseItems];

  const studentAvatar =
    avatar ||
    "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=120&auto=format&fit=crop&q=80";
  const studentName = profile?.name || "Rahul Sharma";
  const studentEmail = profile?.email || "rahul@university.edu";

  const renderNavGroup = (title, items, sectionKey) => (
    <div className="mb-3">
      {/* Section Header (visible on expand) */}
      <div
        onClick={() => toggleSection(sectionKey)}
        className="flex items-center justify-between px-3 py-1 text-[11px] font-bold text-[#94A3B8] uppercase tracking-wider cursor-pointer hover:text-[#F1F5F9] select-none transition-opacity duration-200"
      >
        <span className="truncate">{title}</span>
        <ChevronDown
          size={13}
          className={`transition-transform duration-200 shrink-0 ${
            openSections[sectionKey] ? "rotate-0" : "-rotate-90 text-[#64748B]"
          }`}
        />
      </div>

      {openSections[sectionKey] && (
        <div className="space-y-1 mt-1">
          {items.map((item) => {
            const Icon = item.icon;
            const active = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  setMobileOpen?.(false);
                }}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-semibold transition-all select-none ${
                  active
                    ? "bg-[#182338] text-[#00C0F3] border border-[#233554] shadow-sm"
                    : "text-[#94A3B8] hover:bg-[#131824] hover:text-[#F1F5F9]"
                }`}
              >
                <Icon
                  size={17}
                  className={`shrink-0 ${active ? "text-[#00C0F3]" : "text-[#94A3B8]"}`}
                />
                <span className="truncate whitespace-nowrap">{item.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Desktop Hover-Expand Sidebar Container */}
      <div
        className="hidden md:block fixed top-0 left-0 bottom-0 z-50 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{ width: isHovered ? "260px" : "72px" }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <aside
          className={`h-full bg-[#0E1320] border-r border-[#1F293D] flex flex-col justify-between overflow-y-auto overflow-x-hidden transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isHovered
              ? "w-[260px] p-4 shadow-[0_10px_35px_rgba(0,0,0,0.5)]"
              : "w-[72px] p-3 shadow-[0_2px_10px_rgba(0,0,0,0.2)]"
          }`}
        >
          {/* Top Section: Brand Logo & Profile Overview */}
          <div>
            {/* Logo Header (Clicking takes to default Dashboard) */}
            <button
              onClick={() => onNavigate("dashboard")}
              className={`flex items-center w-full rounded-2xl transition-all select-none mb-3 ${
                isHovered
                  ? "p-2 justify-start hover:bg-[#131824]"
                  : "justify-center p-1.5 hover:bg-[#131824]"
              }`}
              title="SkillVerse Dashboard"
            >
              {isHovered ? (
                <div className="flex items-center h-10 px-1 overflow-hidden">
                  <SkillVerseIcon size={38} className="h-9 w-auto max-w-[210px] object-contain" />
                </div>
              ) : (
                <div className="flex items-center justify-center w-10 h-10">
                  <SkillVerseIcon size={32} className="w-8 h-8 object-contain" />
                </div>
              )}
            </button>

            {/* Unified Profile Overview (Left Sidebar Header) */}
            <div
              onClick={() => onNavigate("profile")}
              className={`rounded-2xl transition-all cursor-pointer border select-none mb-4 ${
                activePage === "profile"
                  ? "bg-[#182338] border-[#2A3754] shadow-sm"
                  : "bg-[#131824]/90 border-[#1F293D] hover:bg-[#182030] hover:border-[#2A3754]"
              } ${isHovered ? "p-2.5" : "p-1.5 flex justify-center"}`}
              title="Profile Overview"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="relative shrink-0">
                  <img
                    src={studentAvatar}
                    alt={studentName}
                    className="w-9 h-9 rounded-xl object-cover border border-[#2A3754] shadow-xs"
                  />
                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-[#10B981] border-2 border-[#131824] rounded-full" />
                </div>
                {isHovered && (
                  <div className="min-w-0 flex-1 overflow-hidden">
                    <div className="flex items-center gap-1">
                      <h4 className="text-xs font-bold text-[#F1F5F9] truncate font-display">
                        {studentName}
                      </h4>
                      <BadgeCheck size={13} className="text-[#10B981] shrink-0" />
                    </div>
                    <p className="text-[10px] text-[#94A3B8] truncate">
                      {studentEmail}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Navigation Groups when Expanded */}
            {isHovered ? (
              <nav className="space-y-1">
                {renderNavGroup("Menu", menuItems, "menu")}
                {renderNavGroup("Skills & Growth", skillItems, "skills")}
                {renderNavGroup("Showcase", showcaseItems, "showcase")}
              </nav>
            ) : (
              /* Compact Icon Rail when Collapsed */
              <nav className="flex flex-col items-center gap-2 py-1">
                {allItems.map((item) => {
                  const Icon = item.icon;
                  const active = activePage === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => onNavigate(item.id)}
                      title={item.label}
                      className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all ${
                        active
                          ? "bg-[#182338] text-[#00C0F3] border border-[#233554] shadow-sm"
                          : "text-[#94A3B8] hover:bg-[#131824] hover:text-[#F1F5F9]"
                      }`}
                    >
                      <Icon size={18} />
                    </button>
                  );
                })}
              </nav>
            )}
          </div>

          {/* Bottom Settings Button (when collapsed) */}
          {!isHovered && (
            <div className="pt-2 flex flex-col items-center">
              <button
                onClick={() => onNavigate("settings")}
                title="Settings"
                className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all ${
                  activePage === "settings"
                    ? "bg-[#182338] text-[#00C0F3] border border-[#233554]"
                    : "text-[#94A3B8] hover:bg-[#131824] hover:text-[#F1F5F9]"
                }`}
              >
                <Settings size={18} />
              </button>
            </div>
          )}
        </aside>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0E1320]/95 backdrop-blur-md border-t border-[#1F293D] flex items-center justify-around px-2 py-2">
        <button
          onClick={() => onNavigate("dashboard")}
          className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl text-[10px] font-semibold transition-colors ${
            activePage === "dashboard" ? "text-[#00C0F3] font-bold" : "text-[#94A3B8]"
          }`}
        >
          <LayoutDashboard size={18} />
          <span>Home</span>
        </button>
        <button
          onClick={() => onNavigate("profile")}
          className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl text-[10px] font-semibold transition-colors ${
            activePage === "profile" ? "text-[#00C0F3] font-bold" : "text-[#94A3B8]"
          }`}
        >
          <User size={18} />
          <span>Overview</span>
        </button>
        <button
          onClick={() => onNavigate("skills")}
          className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl text-[10px] font-semibold transition-colors ${
            activePage === "skills" ? "text-[#00C0F3] font-bold" : "text-[#94A3B8]"
          }`}
        >
          <Award size={18} />
          <span>Skills</span>
        </button>
        <button
          onClick={() => onNavigate("projects")}
          className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl text-[10px] font-semibold transition-colors ${
            activePage === "projects" ? "text-[#00C0F3] font-bold" : "text-[#94A3B8]"
          }`}
        >
          <FolderKanban size={18} />
          <span>Projects</span>
        </button>
        <button
          onClick={() => setMobileOpen(true)}
          className="flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl text-[10px] font-semibold text-[#94A3B8]"
        >
          <Menu size={18} />
          <span>More</span>
        </button>
      </nav>

      {/* Mobile Slide-Up Full Drawer */}
      {mobileOpen && (
        <div
          className="md:hidden fixed inset-0 z-50 bg-[#0A0D14]/80 backdrop-blur-sm"
          onMouseDown={(e) => e.target === e.currentTarget && setMobileOpen(false)}
        >
          <div className="absolute bottom-0 left-0 right-0 bg-[#0E1320] border-t border-[#1F293D] rounded-t-[32px] p-5 max-h-[85vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between mb-4 px-1">
              <div className="flex items-center">
                <SkillVerseIcon size={34} className="h-8 w-auto max-w-[180px] object-contain" />
              </div>
              <button
                onClick={() => setMobileOpen(false)}
                className="w-8 h-8 rounded-full bg-[#182030] border border-[#232F47] flex items-center justify-center text-[#94A3B8] hover:text-white shadow-xs"
              >
                <X size={16} />
              </button>
            </div>

            {/* Profile Bar in Mobile Menu */}
            <div
              onClick={() => {
                onNavigate("profile");
                setMobileOpen(false);
              }}
              className="flex items-center gap-3 p-3 rounded-2xl bg-[#131824] border border-[#1F293D] mb-4 cursor-pointer"
            >
              <img
                src={studentAvatar}
                alt={studentName}
                className="w-10 h-10 rounded-xl object-cover border border-[#2A3754]"
              />
              <div>
                <h4 className="text-xs font-bold text-[#F1F5F9]">{studentName}</h4>
                <p className="text-[10px] text-[#94A3B8]">{studentEmail}</p>
              </div>
            </div>

            <div className="space-y-3">
              {renderNavGroup("Menu", menuItems, "menu")}
              {renderNavGroup("Skills & Growth", skillItems, "skills")}
              {renderNavGroup("Showcase", showcaseItems, "showcase")}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Sidebar;
