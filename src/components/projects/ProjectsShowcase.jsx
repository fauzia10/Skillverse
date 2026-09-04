import React, { useState } from "react";
import { FolderKanban, Plus, ExternalLink, Briefcase, Sparkles, Layers, Code, Globe, Cpu } from "lucide-react";
import { BarChart, Bar, Cell, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { Card } from "../common/Card";
import { SectionHeading } from "../common/SectionHeading";
import { Modal } from "../common/Modal";
import { PrimaryButton, SecondaryButton } from "../common/FormControls";
import { ProjectVisual, CATEGORY_ICON } from "../common/Visuals";
import { TECH_CHART_COLORS } from "../../constants/colors";
import { AddProjectModal } from "../modals/AddProjectModal";

function GithubIcon({ size = 15, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

const CATEGORY_STYLES = {
  App: {
    accentGrad: "from-[#BA203B] to-[#E23E5B]",
    glowShadow: "hover:shadow-[0_16px_32px_-8px_rgba(186,32,59,0.22)]",
    borderColor: "hover:border-[#BA203B]",
    iconBg: "bg-[#FCEBEF]",
    iconBorder: "border-[#F5CAD3]",
    iconColor: "text-[#BA203B]",
    badgeBg: "bg-[#FCEBEF]",
    badgeText: "text-[#BA203B]",
    badgeBorder: "border-[#F5CAD3]",
  },
  Website: {
    accentGrad: "from-[#2563EB] to-[#60A5FA]",
    glowShadow: "hover:shadow-[0_16px_32px_-8px_rgba(37,99,235,0.22)]",
    borderColor: "hover:border-[#2563EB]",
    iconBg: "bg-[#EFF6FF]",
    iconBorder: "border-[#BFDBFE]",
    iconColor: "text-[#2563EB]",
    badgeBg: "bg-[#EFF6FF]",
    badgeText: "text-[#2563EB]",
    badgeBorder: "border-[#BFDBFE]",
  },
  Hardware: {
    accentGrad: "from-[#059669] to-[#34D399]",
    glowShadow: "hover:shadow-[0_16px_32px_-8px_rgba(5,150,105,0.22)]",
    borderColor: "hover:border-[#059669]",
    iconBg: "bg-[#ECFDF5]",
    iconBorder: "border-[#A7F3D0]",
    iconColor: "text-[#059669]",
    badgeBg: "bg-[#ECFDF5]",
    badgeText: "text-[#059669]",
    badgeBorder: "border-[#A7F3D0]",
  },
  "Data Analysis": {
    accentGrad: "from-[#D97706] to-[#FBBF24]",
    glowShadow: "hover:shadow-[0_16px_32px_-8px_rgba(217,119,6,0.22)]",
    borderColor: "hover:border-[#D97706]",
    iconBg: "bg-[#FFFBEB]",
    iconBorder: "border-[#FDE68A]",
    iconColor: "text-[#D97706]",
    badgeBg: "bg-[#FFFBEB]",
    badgeText: "text-[#D97706]",
    badgeBorder: "border-[#FDE68A]",
  },
  Other: {
    accentGrad: "from-[#7C3AED] to-[#A78BFA]",
    glowShadow: "hover:shadow-[0_16px_32px_-8px_rgba(124,58,237,0.22)]",
    borderColor: "hover:border-[#7C3AED]",
    iconBg: "bg-[#F5F3FF]",
    iconBorder: "border-[#DDD6FE]",
    iconColor: "text-[#7C3AED]",
    badgeBg: "bg-[#F5F3FF]",
    badgeText: "text-[#7C3AED]",
    badgeBorder: "border-[#DDD6FE]",
  },
};

export function ProjectsShowcase({ projects, onAddProject }) {
  const [addOpen, setAddOpen] = useState(false);
  const [detailProject, setDetailProject] = useState(null);

  if (!projects.length) {
    return (
      <Card className="p-10 text-center">
        <FolderKanban size={32} className="mx-auto text-[#BA203B] mb-3" />
        <p className="text-[#101218] font-bold text-lg mb-1 font-display">No projects yet</p>
        <p className="text-sm text-[#707584] mb-4">Add your first project to showcase your technical skills and portfolio.</p>
        <PrimaryButton onClick={() => setAddOpen(true)}>
          <Plus size={16} /> Add Project
        </PrimaryButton>
        <AddProjectModal open={addOpen} onClose={() => setAddOpen(false)} onSave={onAddProject} />
      </Card>
    );
  }

  return (
    <Card className="p-5 sm:p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <SectionHeading title="Interactive Projects Showcase" />
          <p className="text-xs text-[#707584] -mt-2">
            Production builds, open-source repositories, and verified engineering achievements.
          </p>
        </div>
        <SecondaryButton onClick={() => setAddOpen(true)} className="!px-3.5 !py-2 text-xs shrink-0">
          <Plus size={15} /> Add Project
        </SecondaryButton>
      </div>

      {/* Unified 3-Column Card Grid (Matching Coding Profiles Widget) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((p) => {
          const style = CATEGORY_STYLES[p.category] || CATEGORY_STYLES.Other;
          const Icon = CATEGORY_ICON[p.category] || Briefcase;
          const totalStackCount = p.skills?.length || 0;

          return (
            <div
              key={p.id}
              onClick={() => setDetailProject(p)}
              className={`group relative p-5 rounded-2xl border border-[#E9E2E5] bg-gradient-to-br from-white via-[#FFFDFD] to-[#FAF8F9] ${style.borderColor} ${style.glowShadow} hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer`}
            >
              {/* Top Accent Gradient Bar on Hover */}
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${style.accentGrad} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

              <div>
                {/* Header: Category Icon + Title + Links */}
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className={`w-10 h-10 rounded-xl ${style.iconBg} ${style.iconBorder} border flex items-center justify-center ${style.iconColor} shrink-0 group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-[0_4px_12px_rgba(186,32,59,0.18)] transition-all duration-300`}>
                      <Icon size={20} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-[#101218] group-hover:text-[#BA203B] transition-colors duration-200 truncate">
                        {p.title}
                      </p>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${style.badgeBg} ${style.badgeText} ${style.badgeBorder} border`}>
                          {p.category}
                        </span>
                        <span className="text-[11px] text-[#707584]">· {totalStackCount} tech skills</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 shrink-0" onClick={(e) => e.stopPropagation()}>
                    {p.github && (
                      <a
                        href={p.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg text-[#707584] hover:text-[#101218] hover:bg-[#F0EEF0] transition-colors"
                        title="Open GitHub Repo"
                      >
                        <GithubIcon size={15} />
                      </a>
                    )}
                    {p.demo && (
                      <a
                        href={p.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg text-[#707584] hover:text-[#BA203B] hover:bg-[#FCEBEF] transition-colors"
                        title="Live Demo"
                      >
                        <ExternalLink size={15} />
                      </a>
                    )}
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs text-[#707584] mb-3.5 leading-relaxed line-clamp-2">
                  {p.description}
                </p>

                {/* Tech Stack Distribution Stacked Bar */}
                {p.usage && p.usage.length > 0 && (
                  <div className="mb-3.5">
                    <div className="flex items-center justify-between text-[11px] mb-1.5 font-medium text-[#707584]">
                      <span>Code Composition</span>
                      <span className="font-bold text-[#101218]">
                        {p.usage[0]?.name} {p.usage[0]?.value}%
                      </span>
                    </div>
                    <div className="w-full h-2 rounded-full overflow-hidden bg-[#E9E2E5] flex gap-[1px]">
                      {p.usage.map((u, i) => (
                        <div
                          key={u.name}
                          style={{
                            width: `${u.value}%`,
                            backgroundColor: TECH_CHART_COLORS[i % TECH_CHART_COLORS.length],
                          }}
                          className="h-full first:rounded-l-full last:rounded-r-full transition-all duration-300 hover:opacity-80"
                          title={`${u.name}: ${u.value}%`}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Skill Pills */}
                <div className="flex flex-wrap gap-1.5 text-[10px] font-semibold text-[#555A68]">
                  {p.skills?.slice(0, 4).map((s) => (
                    <span
                      key={s}
                      className="px-2 py-0.5 rounded-md bg-white border border-[#E9E2E5] hover:scale-105 hover:border-[#BA203B] hover:text-[#BA203B] transition-all cursor-default"
                    >
                      {s}
                    </span>
                  ))}
                  {p.skills?.length > 4 && (
                    <span className="px-2 py-0.5 rounded-md bg-[#FAF8F9] border border-[#E9E2E5] text-[#707584]">
                      +{p.skills.length - 4} more
                    </span>
                  )}
                </div>
              </div>

              {/* Card Footer */}
              <div className="mt-4 pt-3 border-t border-[#F2ECEE] text-xs font-semibold text-[#BA203B] hover:text-[#9c152d] flex items-center justify-between group/link">
                <span className="group-hover/link:underline">View Architecture & Metrics</span>
                <ExternalLink size={12} className="group-hover:translate-x-1 transition-transform duration-200" />
              </div>
            </div>
          );
        })}
      </div>

      <AddProjectModal open={addOpen} onClose={() => setAddOpen(false)} onSave={onAddProject} />

      {/* Project Detail Modal */}
      {detailProject && (
        <Modal open={!!detailProject} onClose={() => setDetailProject(null)} title={detailProject.title} wide>
          <div className="h-44 sm:h-52 rounded-[20px] overflow-hidden mb-4 border border-[#E9E2E5] relative shadow-inner">
            <ProjectVisual variant={detailProject.visual} className="h-full" />
          </div>

          <div className="flex items-center gap-2 mb-3">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-[#FCEBEF] text-[#BA203B] border border-[#F5CAD3]">
              <Sparkles size={12} /> {detailProject.category}
            </span>
            <span className="text-xs text-[#707584]">Verified Technical Portfolio Artifact</span>
          </div>

          <p className="text-sm text-[#707584] mb-4 leading-relaxed">{detailProject.description}</p>

          {/* Languages & Technologies Breakdown */}
          {detailProject.usage && detailProject.usage.length > 0 && (
            <div className="mb-5 p-4 rounded-xl bg-[#FAF8F9] border border-[#E9E2E5]">
              <p className="text-xs font-bold text-[#101218] uppercase tracking-wider mb-2">
                Tech Stack Distribution
              </p>
              <div className="h-[100px] -ml-2">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={detailProject.usage} layout="vertical" margin={{ top: 0, right: 12, left: 0, bottom: 0 }}>
                    <XAxis type="number" hide domain={[0, 100]} />
                    <YAxis
                      type="category"
                      dataKey="name"
                      width={84}
                      tick={{ fontSize: 11, fill: "#101218", fontWeight: 600 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Bar dataKey="value" radius={[0, 6, 6, 0]} barSize={12}>
                      {detailProject.usage.map((entry, i) => (
                        <Cell key={entry.name} fill={TECH_CHART_COLORS[i % TECH_CHART_COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          <div className="flex flex-wrap gap-1.5 mb-5">
            {detailProject.skills?.map((s) => (
              <span key={s} className="px-3 py-1 rounded-full text-xs bg-white border border-[#E9E2E5] text-[#101218] font-semibold">
                {s}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap gap-2.5">
            {detailProject.github && (
              <a href={detailProject.github} target="_blank" rel="noopener noreferrer">
                <SecondaryButton>
                  <GithubIcon size={15} /> Open GitHub Repository
                </SecondaryButton>
              </a>
            )}
            {detailProject.demo && (
              <a href={detailProject.demo} target="_blank" rel="noopener noreferrer">
                <PrimaryButton>
                  <ExternalLink size={15} /> Launch Live Application
                </PrimaryButton>
              </a>
            )}
          </div>
        </Modal>
      )}
    </Card>
  );
}

export default ProjectsShowcase;
