import React, { useState } from "react";
import {
  Plus,
  BadgeCheck,
  FileBadge,
  Sparkles,
  Phone,
  Mail,
  MapPin,
  Building2,
  Lock,
  Edit3,
  ArrowUpRight,
  TrendingUp,
  Award,
  FolderKanban,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card } from "../components/common/Card";
import { SectionHeading } from "../components/common/SectionHeading";
import { LevelBadge, PriorityBadge } from "../components/common/Badges";
import { ProgressBar, CircularProgress } from "../components/common/Progress";
import { PrimaryButton, SecondaryButton } from "../components/common/FormControls";
import { AddSkillModal } from "../components/modals/AddSkillModal";
import { ProjectsShowcase } from "../components/projects/ProjectsShowcase";
import { GAP_DATA, gapPriority, PROGRESS_DATA, getSkillIcon } from "../data/mockData";
import { CodingProfilesWidget } from "../components/profile/CodingProfilesWidget";

export function DashboardPage({
  skills = [],
  projects = [],
  certificates = [],
  profile = {},
  onAddSkill,
  onAddProject,
  onNavigate,
  avatar,
}) {
  const [skillModal, setSkillModal] = useState(false);

  const verifiedCount = skills.filter((s) => s.verified).length;
  const hasAnyData = skills.length > 0 || (projects?.length || 0) > 0 || (certificates?.length || 0) > 0;
  const baseScore = hasAnyData ? 30 : 0;
  const skillBonus = Math.min(30, verifiedCount * 6 + skills.length * 2);
  const projectBonus = Math.min(25, (projects?.length || 0) * 8);
  const certBonus = Math.min(15, (certificates?.length || 0) * 5);
  const readinessScore = hasAnyData
    ? Math.min(98, Math.round(baseScore + skillBonus + projectBonus + certBonus))
    : 0;

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Page Title */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#F1F5F9] font-display tracking-tight">
            Dashboard
          </h2>
          <p className="text-xs sm:text-sm text-[#94A3B8] mt-0.5">
            Verified proof-of-work, learning ledger & career readiness.
          </p>
        </div>
      </div>

      {/* HERO STUDENT BANNER CARD */}
      <div className="bg-[#131824] rounded-[28px] border border-[#1F293D] p-6 sm:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.35)] relative overflow-hidden">
        {/* Top Row: Avatar + Student Meta + Top-Right Action Controls */}
        <div className="flex flex-col sm:flex-row sm:items-start gap-5 justify-between">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
            <div className="relative shrink-0">
              <img
                src={avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=240&auto=format&fit=crop&q=80"}
                alt={profile?.name || "Student Profile"}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl object-cover border-2 border-[#2A3754] shadow-md ring-2 ring-[#00C0F3]/20"
              />
              <div
                className="absolute -bottom-1.5 -right-1.5 w-6 h-6 rounded-full bg-[#10B981] border-2 border-[#131824] flex items-center justify-center text-[#0A0D14] shadow-sm"
                title="Identity Verified"
              >
                <BadgeCheck size={14} />
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl sm:text-2xl font-black text-[#F1F5F9] font-display">
                  {profile?.name || "Student Developer"}
                </h3>
              </div>
              <p className="text-xs text-[#94A3B8] mt-0.5 font-medium">
                <span className="text-[#00C0F3] font-bold">{profile?.careerGoal || "Student Developer"}</span> · Verified Ledger
              </p>

              {/* 4-Item Contact Grid with Micro-Icons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-1.5 mt-3 text-xs text-[#94A3B8]">
                <div className="flex items-center gap-2">
                  <Phone size={13} className="text-[#64748B] shrink-0" />
                  <span className="truncate">{profile?.phone || "Phone not added"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail size={13} className="text-[#64748B] shrink-0" />
                  <span className="truncate">{profile?.email || "Email not added"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={13} className="text-[#64748B] shrink-0" />
                  <span className="truncate">{profile?.location || "Location not added"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Building2 size={13} className="text-[#64748B] shrink-0" />
                  <span className="truncate">{profile?.college || "University / College"}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons Top-Right */}
          <div className="flex items-center gap-2 self-end sm:self-start">
            <button
              onClick={() => onNavigate("profile")}
              className="w-9 h-9 rounded-full bg-[#182030] border border-[#232F47] hover:bg-[#202B40] text-[#94A3B8] hover:text-[#F1F5F9] flex items-center justify-center transition-all shadow-sm cursor-pointer"
              title="Verified Student Identity"
            >
              <Lock size={15} />
            </button>
            <button
              onClick={() => onNavigate("profile")}
              className="w-9 h-9 rounded-full bg-[#182030] border border-[#232F47] hover:bg-[#202B40] text-[#94A3B8] hover:text-[#F1F5F9] flex items-center justify-center transition-all shadow-sm cursor-pointer"
              title="Edit Profile"
            >
              <Edit3 size={15} />
            </button>
          </div>
        </div>

        {/* Bottom Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-5 border-t border-[#1F293D]">
          <div>
            <p className="text-xs text-[#94A3B8] font-medium">Total Skills</p>
            <p className="text-xl sm:text-2xl font-black text-[#F1F5F9] font-display mt-0.5">
              {skills.length}
            </p>
          </div>
          <div>
            <p className="text-xs text-[#94A3B8] font-medium">Verified Skills</p>
            <p className="text-xl sm:text-2xl font-black text-[#A3E635] font-display mt-0.5">
              {verifiedCount}
            </p>
          </div>
          <div>
            <p className="text-xs text-[#94A3B8] font-medium">Projects Built</p>
            <p className="text-xl sm:text-2xl font-black text-[#00C0F3] font-display mt-0.5">
              {projects?.length || 0}
            </p>
          </div>
          <div>
            <p className="text-xs text-[#94A3B8] font-medium">Readiness Score</p>
            <p className="text-xl sm:text-2xl font-black text-[#FB7185] font-display mt-0.5">
              {readinessScore}%
            </p>
          </div>
        </div>

        {/* Multi-Segment Accent Line */}
        <div className="flex h-1.5 w-full rounded-full overflow-hidden mt-5 bg-[#1F293D]">
          <div className="w-1/4 bg-[#FB7185]" />
          <div className="w-1/4 bg-[#00C0F3]" />
          <div className="w-1/4 bg-[#A3E635]" />
          <div className="w-1/4 bg-[#FBBF24]" />
        </div>
      </div>

      {/* "MY SUMMARY" 3 PASTEL BENTO CARDS ROW */}
      <div>
        <div className="flex items-center justify-between mb-3 px-1">
          <h3 className="text-lg font-extrabold text-[#F1F5F9] font-display">
            My Summary
          </h3>
          <span className="text-xs text-[#94A3B8] font-semibold">This Month</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Card 1: Lime Bento (Verified Skills) */}
          <div
            onClick={() => onNavigate("skills")}
            className="bg-gradient-to-br from-[#16330E] to-[#0E2008] border border-[#2D5A1B] rounded-3xl p-5 shadow-sm hover:shadow-[0_8px_25px_rgba(163,230,53,0.15)] cursor-pointer transition-all duration-200 group flex flex-col justify-between h-36"
          >
            <div className="flex items-start justify-between">
              <div>
                <h4 className="text-sm font-bold text-[#A3E635] font-display leading-tight">
                  Verified
                  <br />
                  Skills
                </h4>
                <p className="text-[10px] text-[#A3E635]/70 mt-1">
                  Updated today
                </p>
              </div>
              <div className="w-7 h-7 rounded-full bg-[#A3E635]/20 group-hover:bg-[#A3E635] flex items-center justify-center text-[#A3E635] group-hover:text-[#0A0D14] transition-colors">
                <ArrowUpRight size={15} />
              </div>
            </div>

            <div className="flex items-end justify-end">
              <span className="text-3xl font-black text-[#A3E635] font-display">
                {verifiedCount}
              </span>
            </div>
          </div>

          {/* Card 2: Aqua Bento (Active Projects & Showcase) */}
          <div
            onClick={() => onNavigate("projects")}
            className="bg-gradient-to-br from-[#0B3346] to-[#072230] border border-[#144F6D] rounded-3xl p-5 shadow-sm hover:shadow-[0_8px_25px_rgba(0,192,243,0.15)] cursor-pointer transition-all duration-200 group flex flex-col justify-between h-36"
          >
            <div className="flex items-start justify-between">
              <div>
                <h4 className="text-sm font-bold text-[#00C0F3] font-display leading-tight">
                  Active
                  <br />
                  Projects
                </h4>
                <p className="text-[10px] text-[#00C0F3]/70 mt-1">
                  Live on GitHub
                </p>
              </div>
              <div className="w-7 h-7 rounded-full bg-[#00C0F3]/20 group-hover:bg-[#00C0F3] flex items-center justify-center text-[#00C0F3] group-hover:text-[#0A0D14] transition-colors">
                <ArrowUpRight size={15} />
              </div>
            </div>

            <div className="flex items-end justify-end">
              <span className="text-3xl font-black text-[#00C0F3] font-display">
                {projects?.length || 0}
              </span>
            </div>
          </div>

          {/* Card 3: Coral Bento (Skill Gap & Career Readiness) */}
          <div
            onClick={() => onNavigate("gap")}
            className="bg-gradient-to-br from-[#3D1420] to-[#280C14] border border-[#5C1F2E] rounded-3xl p-5 shadow-sm hover:shadow-[0_8px_25px_rgba(251,113,133,0.15)] cursor-pointer transition-all duration-200 group flex flex-col justify-between h-36"
          >
            <div className="flex items-start justify-between">
              <div>
                <h4 className="text-sm font-bold text-[#FB7185] font-display leading-tight">
                  Readiness
                  <br />
                  Score
                </h4>
                <p className="text-[10px] text-[#FB7185]/70 mt-1">
                  Target: {profile?.careerGoal?.split(" ")[0] || "AI Dev"}
                </p>
              </div>
              <div className="w-7 h-7 rounded-full bg-[#FB7185]/20 group-hover:bg-[#FB7185] flex items-center justify-center text-[#FB7185] group-hover:text-[#0A0D14] transition-colors">
                <ArrowUpRight size={15} />
              </div>
            </div>

            <div className="flex items-end justify-end">
              <span className="text-3xl font-black text-[#FB7185] font-display">
                {readinessScore}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Developer & Competitive Coding Profiles */}
      <Card className="p-6 sm:p-7">
        <div className="flex items-center justify-between mb-4">
          <div>
            <SectionHeading title="Developer & Competitive Coding Profiles" />
            <p className="text-xs text-[#94A3B8] -mt-2">
              Verified problem-solving metrics and GitHub repositories aggregated for recruiters.
            </p>
          </div>
          <button
            onClick={() => onNavigate("profile")}
            className="text-xs font-bold text-[#00C0F3] hover:underline"
          >
            Edit Profiles →
          </button>
        </div>
        <CodingProfilesWidget profile={profile} />
      </Card>

      {/* Projects showcase */}
      <ProjectsShowcase projects={projects} onAddProject={onAddProject} />

      {/* Growth progress & Skill Gaps */}
      <div className="grid sm:grid-cols-2 gap-6">
        {/* Growth chart */}
        <Card className="p-6 sm:p-7">
          <SectionHeading title="Growth Progress" />
          {PROGRESS_DATA.length > 0 ? (
            <>
              <div className="h-44" role="img" aria-label="Line chart showing career readiness score rising">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={PROGRESS_DATA} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid stroke="#1F293D" vertical={false} />
                    <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={{ stroke: "#1F293D" }} tickLine={false} />
                    <YAxis tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} domain={[40, 100]} />
                    <Tooltip contentStyle={{ borderRadius: 16, backgroundColor: "#182030", border: "1px solid #232F47", color: "#F1F5F9", boxShadow: "0 8px 24px rgba(0,0,0,0.4)" }} />
                    <Line type="monotone" dataKey="score" stroke="#00C0F3" strokeWidth={3} dot={{ fill: "#00C0F3", r: 4, stroke: "#131824", strokeWidth: 2 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <p className="text-xs text-[#A3E635] font-bold mt-2">
                📈 Readiness score tracked in real-time as you add skills & projects.
              </p>
            </>
          ) : (
            <div className="h-44 flex flex-col items-center justify-center text-center p-4 border border-dashed border-[#1F293D] rounded-2xl bg-[#182030]/40">
              <TrendingUp size={28} className="text-[#00C0F3] mb-2" />
              <p className="text-xs font-bold text-[#F1F5F9]">Milestone Trajectory</p>
              <p className="text-[11px] text-[#94A3B8] max-w-[240px] mt-0.5">
                Add skills, pass proficiency checks, and publish projects to generate your growth trajectory.
              </p>
            </div>
          )}
        </Card>

        {/* Skill Gaps */}
        <Card className="p-6 sm:p-7">
          <SectionHeading title="Priority Skill Gaps" />
          {GAP_DATA.length > 0 ? (
            <div className="space-y-2.5 mb-3">
              {GAP_DATA.slice(0, 3).map((g) => (
                <button
                  key={g.skill}
                  onClick={() => onNavigate("gap")}
                  className="w-full flex items-center justify-between gap-2 text-xs p-2.5 rounded-2xl hover:bg-[#182030] transition-all text-left border border-transparent hover:border-[#232F47]"
                >
                  <span className="text-[#F1F5F9] font-semibold truncate">{g.skill}</span>
                  <PriorityBadge priority={gapPriority(g.curVal, g.reqVal)} />
                </button>
              ))}
            </div>
          ) : (
            <div className="py-6 text-center border border-dashed border-[#1F293D] rounded-2xl bg-[#182030]/40 mb-3">
              <Sparkles size={24} className="mx-auto text-[#A3E635] mb-1.5" />
              <p className="text-xs font-bold text-[#F1F5F9]">Custom Gap Analysis</p>
              <p className="text-[11px] text-[#94A3B8] max-w-[240px] mx-auto mt-0.5">
                Targeting <strong className="text-[#00C0F3]">{profile?.careerGoal || "Software Developer"}</strong>. Add skills to benchmark your gaps.
              </p>
            </div>
          )}
          <button
            onClick={() => onNavigate("gap")}
            className="text-xs font-bold text-[#00C0F3] hover:underline block pt-2 border-t border-[#1F293D]"
          >
            View Full Skill Gap Analysis →
          </button>
        </Card>
      </div>

      <AddSkillModal open={skillModal} onClose={() => setSkillModal(false)} onSave={onAddSkill} />
    </div>
  );
}

export default DashboardPage;
