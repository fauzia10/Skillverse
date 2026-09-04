import React, { useState } from "react";
import { Plus, BadgeCheck, FileBadge, Sparkles, UserCheck } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
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
  const readinessScore = Math.min(98, Math.round(baseScore + skillBonus + projectBonus + certBonus));

  return (
    <div className="space-y-6">
      {/* HERO SECTION WITH BIG PROFILE PHOTO */}
      <Card className="overflow-hidden border-[#E9E2E5] shadow-[0_4px_24px_rgba(186,32,59,0.06)] bg-white">
        <div className="grid lg:grid-cols-[1.3fr_1fr] items-center">
          {/* Left Greeting & Readiness Column */}
          <div className="p-7 sm:p-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FCEBEF] border border-[#F5CAD3] text-[11px] font-bold text-[#BA203B] tracking-wider uppercase mb-3">
              <Sparkles size={13} />
              <span>YOUR JOURNEY. VERIFIED. LIMITLESS.</span>
            </div>
            
            <div className="mb-2">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#101218] font-display">
                Hi, {profile?.name ? profile.name.split(" ")[0] : "Rahul"}! 👋
              </h2>
              <p className="text-sm text-[#BA203B] font-semibold font-display mt-0.5">
                Build your future, one verified skill at a time.
              </p>
            </div>

            <p className="text-sm text-[#707584] mb-4 max-w-md leading-relaxed">
              Your digital identity, achievements, projects, verified certificates, and career readiness score — all unified in one platform.
            </p>

            <p className="text-xs font-semibold text-[#101218] mb-5 px-3 py-2 rounded-xl bg-[#FAF8F9] border border-[#E9E2E5] inline-block">
              🎓 {profile?.degree || "B.Tech"} {profile?.department || "Computer Science"} · {profile?.year || "Semester 5"} · {profile?.college || "ABC University"}
            </p>

            <div className="mb-6 max-w-xs">
              <div className="flex justify-between text-xs text-[#707584] mb-1.5 font-medium">
                <span>Profile completion</span>
                <span className="font-bold text-[#BA203B]">82%</span>
              </div>
              <ProgressBar value={82} colorClass="bg-gradient-to-r from-[#BA203B] to-[#E23E5B]" />
            </div>

            <div className="flex flex-wrap gap-3">
              <PrimaryButton onClick={() => onNavigate("profile")}>View My Profile</PrimaryButton>
              <SecondaryButton onClick={() => onNavigate("gap")}>Career Readiness</SecondaryButton>
            </div>
          </div>

          {/* Right Column: Clean Big Profile Photo without glow or mid partition */}
          <div className="hidden lg:flex items-center justify-center p-8">
            <div
              onClick={() => onNavigate("profile")}
              className="relative group cursor-pointer"
              title="Click to view & edit full profile"
            >
              <img
                src={avatar}
                alt={profile?.name || "Rahul Sharma"}
                className="w-40 h-40 xl:w-48 xl:h-48 rounded-full object-cover border-4 border-white shadow-xl group-hover:scale-105 transition-transform duration-300"
              />
              <div
                className="absolute bottom-2 right-2 w-10 h-10 rounded-full bg-[#2D9F75] border-4 border-white flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform duration-300"
                title="Verified Student Identity"
              >
                <BadgeCheck size={22} />
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Developer & Coding Profiles */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <SectionHeading title="Developer & Competitive Coding Profiles" />
            <p className="text-xs text-[#707584] -mt-2">
              Verified problem-solving metrics and GitHub repositories aggregated for recruiters.
            </p>
          </div>
          <button
            onClick={() => onNavigate("profile")}
            className="text-xs text-[#BA203B] font-semibold hover:underline"
          >
            Edit Profiles →
          </button>
        </div>
        <CodingProfilesWidget profile={profile} />
      </Card>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Career Readiness */}
        <Card className="p-6 lg:col-span-1">
          <SectionHeading title="Career Readiness" />
          <div className="flex items-center gap-4 mb-4">
            <CircularProgress value={readinessScore} label="Ready" />
            <div>
              <p className="text-xs text-[#707584]">Target career</p>
              <p className="text-base font-bold text-[#101218]">{profile?.careerGoal || "Data Analyst"}</p>
            </div>
          </div>
          <p className="text-sm text-[#1B7352] font-semibold mb-4">
            {readinessScore >= 75
              ? "You are making strong progress toward your career goal."
              : "Complete pending assessments to improve your readiness score."}
          </p>

          <div className="space-y-3 mb-4">
            {[
              { label: "Academic", value: 78 },
              { label: "Technical Skills", value: Math.min(95, 55 + verifiedCount * 6) },
              { label: "Soft Skills", value: 74 },
              { label: "Practical Experience", value: Math.min(90, 45 + (projects?.length || 0) * 10) },
            ].map((m) => (
              <div key={m.label}>
                <div className="flex justify-between text-xs text-[#101218] mb-1">
                  <span>{m.label}</span>
                  <span className="font-semibold">{m.value}%</span>
                </div>
                <ProgressBar value={m.value} colorClass="bg-[#BA203B]" />
              </div>
            ))}
          </div>
          <button onClick={() => onNavigate("gap")} className="text-sm text-[#BA203B] font-semibold hover:underline">
            View Full Analysis →
          </button>
          <p className="text-xs text-[#707584] mt-3 leading-relaxed border-t border-[#E9E2E5] pt-3">
            Your score is calculated using your verified skills, projects, and benchmarks.
          </p>
        </Card>

        {/* Skills & Badges */}
        <Card className="p-6 lg:col-span-1">
          <SectionHeading
            title="Top Skills & Proof"
            action={
              <SecondaryButton onClick={() => setSkillModal(true)} className="!px-3 !py-1.5 text-xs">
                <Plus size={14} /> Add
              </SecondaryButton>
            }
          />
          <div className="flex flex-wrap gap-2 mb-4">
            {skills.slice(0, 7).map((s) => {
              const Icon = s.icon || getSkillIcon(s.name);
              return (
                <button
                  key={s.id}
                  onClick={() => onNavigate("skills")}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#E9E2E5] bg-[#FAF8F9] text-xs transition-all hover:border-[#BA203B] hover:bg-white active:scale-95 cursor-pointer text-left"
                >
                  {Icon && <Icon size={13} className="text-[#BA203B]" />}
                  <span className="text-[#101218] font-semibold">{s.name}</span>
                  <LevelBadge level={s.level} />
                  {s.verified && <BadgeCheck size={14} className="text-[#1B7352]" />}
                </button>
              );
            })}
          </div>
          <p className="text-xs text-[#707584] mb-3">{verifiedCount} of {skills.length} skills verified</p>
          <button onClick={() => onNavigate("skills")} className="text-sm text-[#BA203B] font-semibold hover:underline">
            View All Skills →
          </button>
        </Card>

        {/* Skill Gap */}
        <Card className="p-6 lg:col-span-1">
          <SectionHeading title="Priority Skill Gaps" />
          <div className="space-y-2.5 mb-4">
            {GAP_DATA.slice(0, 4).map((g) => (
              <button
                key={g.skill}
                onClick={() => onNavigate("gap")}
                className="w-full flex items-center justify-between gap-2 text-sm p-1.5 -mx-1.5 rounded-xl hover:bg-[#FAF8F9] active:scale-[0.99] transition-all text-left"
              >
                <span className="text-[#101218] font-medium truncate">{g.skill}</span>
                <PriorityBadge priority={gapPriority(g.curVal, g.reqVal)} />
              </button>
            ))}
          </div>
          <p className="text-xs text-[#707584] mb-3">Focus on high-priority gaps first to improve your {profile?.careerGoal || "Data Analyst"} readiness.</p>
          <button onClick={() => onNavigate("gap")} className="text-sm text-[#BA203B] font-semibold hover:underline">
            View Full Skill Gap Analysis →
          </button>
        </Card>
      </div>

      {/* Projects showcase */}
      <ProjectsShowcase projects={projects} onAddProject={onAddProject} />

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Certificates */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <SectionHeading title="Recent Certificates" />
            <button onClick={() => onNavigate("certificates")} className="text-xs text-[#BA203B] font-semibold hover:underline">
              View All ({certificates?.length || 0}) →
            </button>
          </div>
          <div className="space-y-3">
            {(certificates || []).slice(0, 3).map((c) => (
              <button
                key={c.id}
                onClick={() => onNavigate("certificates")}
                className="w-full flex items-center gap-3 p-2 rounded-xl hover:bg-[#FAF8F9] active:scale-[0.99] transition-colors text-left"
              >
                <div className="w-10 h-10 rounded-xl bg-[#FCEBEF] border border-[#F5CAD3] flex items-center justify-center shrink-0">
                  <FileBadge size={18} className="text-[#BA203B]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-[#101218] truncate">{c.title}</p>
                  <p className="text-xs text-[#707584]">{c.org} · {c.date}</p>
                </div>
                {c.verified && <BadgeCheck size={16} className="text-[#1B7352] shrink-0" />}
              </button>
            ))}
          </div>
        </Card>

        {/* Growth chart */}
        <Card className="p-6">
          <SectionHeading title="Growth Progress" />
          <div className="h-44" role="img" aria-label="Line chart showing career readiness score rising from 61% in September to 82% in March">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={PROGRESS_DATA} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid stroke="#F2ECEE" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#707584" }} axisLine={{ stroke: "#E9E2E5" }} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: "#707584" }} axisLine={false} tickLine={false} domain={[40, 100]} />
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #E9E2E5", boxShadow: "0 4px 16px rgba(0,0,0,0.06)" }} />
                <Line type="monotone" dataKey="score" stroke="#BA203B" strokeWidth={3} dot={{ fill: "#BA203B", r: 4, stroke: "#FFFFFF", strokeWidth: 2 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <p className="text-sm text-[#1B7352] font-semibold mt-2">Your readiness score has improved over the last 6 months.</p>
        </Card>
      </div>

      <AddSkillModal open={skillModal} onClose={() => setSkillModal(false)} onSave={onAddSkill} />
    </div>
  );
}

export default DashboardPage;
