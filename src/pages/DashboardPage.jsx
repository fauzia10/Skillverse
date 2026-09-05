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
  const baseScore = 50;
  const skillBonus = Math.min(25, verifiedCount * 5);
  const projectBonus = Math.min(15, (projects?.length || 0) * 3);
  const certBonus = Math.min(10, (certificates?.length || 0) * 2.5);
  const readinessScore = Math.min(
    98,
    Math.round(baseScore + skillBonus + projectBonus + certBonus)
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Page Title */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#111827] font-display tracking-tight">
            My Activity
          </h2>
          <p className="text-xs sm:text-sm text-[#64748B] mt-0.5">
            Verified proof-of-work, learning ledger & career readiness.
          </p>
        </div>
      </div>

      {/* HERO STUDENT BANNER CARD */}
      <div className="bg-white rounded-[28px] border border-[#E2EBF0] p-6 sm:p-8 shadow-[0_4px_24px_rgba(20,40,60,0.03)] relative overflow-hidden">
        {/* Top Row: Avatar + Student Meta + Top-Right Action Controls */}
        <div className="flex flex-col sm:flex-row sm:items-start gap-5 justify-between">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
            <div className="relative shrink-0">
              <img
                src={avatar || "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=240&auto=format&fit=crop&q=80"}
                alt={profile?.name || "Student Profile"}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl object-cover border-2 border-white shadow-md ring-2 ring-[#111827]/10"
              />
              <div
                className="absolute -bottom-1.5 -right-1.5 w-6 h-6 rounded-full bg-[#2D9F75] border-2 border-white flex items-center justify-center text-white shadow-sm"
                title="Identity Verified"
              >
                <BadgeCheck size={14} />
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl sm:text-2xl font-black text-[#111827] font-display">
                  {profile?.name || "Rahul Sharma"}
                </h3>
              </div>
              <p className="text-xs text-[#64748B] mt-0.5 font-medium">
                <span className="text-[#111827] font-bold">Student Developer</span> · 286 days on the platform
              </p>

              {/* 4-Item Contact Grid with Micro-Icons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-1.5 mt-3 text-xs text-[#64748B]">
                <div className="flex items-center gap-2">
                  <Phone size={13} className="text-[#94A3B8] shrink-0" />
                  <span className="truncate">{profile?.phone || "+91 98765-43210"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail size={13} className="text-[#94A3B8] shrink-0" />
                  <span className="truncate">{profile?.email || "rahul.sharma@university.edu"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={13} className="text-[#94A3B8] shrink-0" />
                  <span className="truncate">{profile?.location || "Bangalore, India"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Building2 size={13} className="text-[#94A3B8] shrink-0" />
                  <span className="truncate">{profile?.college || "National Institute of Tech"}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons Top-Right */}
          <div className="flex items-center gap-2 self-end sm:self-start">
            <button
              onClick={() => onNavigate("profile")}
              className="w-9 h-9 rounded-full bg-[#F4F8FA] hover:bg-[#111827] hover:text-white text-[#64748B] flex items-center justify-center transition-all shadow-sm"
              title="Verified Student Identity"
            >
              <Lock size={15} />
            </button>
            <button
              onClick={() => onNavigate("profile")}
              className="w-9 h-9 rounded-full bg-[#F4F8FA] hover:bg-[#111827] hover:text-white text-[#64748B] flex items-center justify-center transition-all shadow-sm"
              title="Edit Profile"
            >
              <Edit3 size={15} />
            </button>
          </div>
        </div>

        {/* Bottom Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-5 border-t border-[#F1F5F9]">
          <div>
            <p className="text-xs text-[#94A3B8] font-medium">Total Skills</p>
            <p className="text-xl sm:text-2xl font-black text-[#111827] font-display mt-0.5">
              {skills.length}
            </p>
          </div>
          <div>
            <p className="text-xs text-[#94A3B8] font-medium">Verified Skills</p>
            <p className="text-xl sm:text-2xl font-black text-[#2E4D0C] font-display mt-0.5">
              {verifiedCount}
            </p>
          </div>
          <div>
            <p className="text-xs text-[#94A3B8] font-medium">Projects Built</p>
            <p className="text-xl sm:text-2xl font-black text-[#0C453E] font-display mt-0.5">
              {projects?.length || 0}
            </p>
          </div>
          <div>
            <p className="text-xs text-[#94A3B8] font-medium">Readiness Score</p>
            <p className="text-xl sm:text-2xl font-black text-[#5C1B1B] font-display mt-0.5">
              {readinessScore}%
            </p>
          </div>
        </div>

        {/* Multi-Segment Pastel Bottom Accent Line */}
        <div className="flex h-1.5 w-full rounded-full overflow-hidden mt-5 bg-[#F1F5F9]">
          <div className="w-1/4 bg-[#F8B6B6]" />
          <div className="w-1/4 bg-[#A5E3DC]" />
          <div className="w-1/4 bg-[#D5F29B]" />
          <div className="w-1/4 bg-[#FDE047]" />
        </div>
      </div>

      {/* "MY SUMMARY" 3 PASTEL BENTO CARDS ROW */}
      <div>
        <div className="flex items-center justify-between mb-3 px-1">
          <h3 className="text-lg font-extrabold text-[#111827] font-display">
            My Summary
          </h3>
          <span className="text-xs text-[#64748B] font-semibold">This Month</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Card 1: Lime Pastel (Verified Skills) */}
          <div
            onClick={() => onNavigate("skills")}
            className="bg-[#D5F29B] rounded-3xl p-5 shadow-sm hover:shadow-md cursor-pointer transition-all duration-200 group flex flex-col justify-between h-36"
          >
            <div className="flex items-start justify-between">
              <div>
                <h4 className="text-sm font-bold text-[#2E4D0C] font-display leading-tight">
                  Verified
                  <br />
                  Skills
                </h4>
                <p className="text-[10px] text-[#2E4D0C]/70 mt-1">
                  Updated today
                </p>
              </div>
              <div className="w-7 h-7 rounded-full bg-white/60 group-hover:bg-white flex items-center justify-center text-[#2E4D0C] transition-colors">
                <ArrowUpRight size={15} />
              </div>
            </div>

            <div className="flex items-end justify-end">
              <span className="text-3xl font-black text-[#2E4D0C] font-display">
                {verifiedCount}
              </span>
            </div>
          </div>

          {/* Card 2: Aqua Pastel (Active Projects & Showcase) */}
          <div
            onClick={() => onNavigate("projects")}
            className="bg-[#A5E3DC] rounded-3xl p-5 shadow-sm hover:shadow-md cursor-pointer transition-all duration-200 group flex flex-col justify-between h-36"
          >
            <div className="flex items-start justify-between">
              <div>
                <h4 className="text-sm font-bold text-[#0C453E] font-display leading-tight">
                  Active
                  <br />
                  Projects
                </h4>
                <p className="text-[10px] text-[#0C453E]/70 mt-1">
                  Live on GitHub
                </p>
              </div>
              <div className="w-7 h-7 rounded-full bg-white/60 group-hover:bg-white flex items-center justify-center text-[#0C453E] transition-colors">
                <ArrowUpRight size={15} />
              </div>
            </div>

            <div className="flex items-end justify-end">
              <span className="text-3xl font-black text-[#0C453E] font-display">
                {projects?.length || 0}
              </span>
            </div>
          </div>

          {/* Card 3: Coral Pastel (Skill Gap & Career Readiness) */}
          <div
            onClick={() => onNavigate("gap")}
            className="bg-[#F8B6B6] rounded-3xl p-5 shadow-sm hover:shadow-md cursor-pointer transition-all duration-200 group flex flex-col justify-between h-36"
          >
            <div className="flex items-start justify-between">
              <div>
                <h4 className="text-sm font-bold text-[#5C1B1B] font-display leading-tight">
                  Readiness
                  <br />
                  Score
                </h4>
                <p className="text-[10px] text-[#5C1B1B]/70 mt-1">
                  Target: {profile?.careerGoal?.split(" ")[0] || "AI Dev"}
                </p>
              </div>
              <div className="w-7 h-7 rounded-full bg-white/60 group-hover:bg-white flex items-center justify-center text-[#5C1B1B] transition-colors">
                <ArrowUpRight size={15} />
              </div>
            </div>

            <div className="flex items-end justify-end">
              <span className="text-3xl font-black text-[#5C1B1B] font-display">
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
            <p className="text-xs text-[#64748B] -mt-2">
              Verified problem-solving metrics and GitHub repositories aggregated for recruiters.
            </p>
          </div>
          <button
            onClick={() => onNavigate("profile")}
            className="text-xs font-bold text-[#111827] hover:underline"
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
          <div className="h-44" role="img" aria-label="Line chart showing career readiness score rising">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={PROGRESS_DATA} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid stroke="#EEF4F7" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#64748B" }} axisLine={{ stroke: "#E2EBF0" }} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "#64748B" }} axisLine={false} tickLine={false} domain={[40, 100]} />
                <Tooltip contentStyle={{ borderRadius: 16, border: "1px solid #E2EBF0", boxShadow: "0 8px 24px rgba(20,40,60,0.06)" }} />
                <Line type="monotone" dataKey="score" stroke="#111827" strokeWidth={3} dot={{ fill: "#111827", r: 4, stroke: "#FFFFFF", strokeWidth: 2 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <p className="text-xs text-[#2E4D0C] font-bold mt-2">
            📈 Readiness score has improved by +21% over the last 6 months.
          </p>
        </Card>

        {/* Skill Gaps */}
        <Card className="p-6 sm:p-7">
          <SectionHeading title="Priority Skill Gaps" />
          <div className="space-y-2.5 mb-3">
            {GAP_DATA.slice(0, 3).map((g) => (
              <button
                key={g.skill}
                onClick={() => onNavigate("gap")}
                className="w-full flex items-center justify-between gap-2 text-xs p-2.5 rounded-2xl hover:bg-[#F4F8FA] transition-all text-left border border-transparent hover:border-[#E2EBF0]"
              >
                <span className="text-[#111827] font-semibold truncate">{g.skill}</span>
                <PriorityBadge priority={gapPriority(g.curVal, g.reqVal)} />
              </button>
            ))}
          </div>
          <button
            onClick={() => onNavigate("gap")}
            className="text-xs font-bold text-[#111827] hover:underline block pt-2 border-t border-[#F1F5F9]"
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
