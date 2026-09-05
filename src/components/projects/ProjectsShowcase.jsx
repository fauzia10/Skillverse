import React, { useState, useEffect, useMemo } from "react";
import { FolderKanban, Plus, ExternalLink, Briefcase } from "lucide-react";
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

export function ProjectsShowcase({ projects, onAddProject }) {
  const [hoveredId, setHoveredId] = useState(null);
  const [addOpen, setAddOpen] = useState(false);
  const [detailProject, setDetailProject] = useState(null);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    setIsTouch(window.matchMedia("(hover: none)").matches);
  }, []);

  const hovered = useMemo(() => projects.find((p) => p.id === hoveredId) || null, [hoveredId, projects]);

  if (!projects.length) {
    return (
      <Card className="p-10 text-center">
        <FolderKanban size={32} className="mx-auto text-[#111827] mb-3" />
        <p className="text-[#111827] font-bold mb-1 font-display">No projects yet</p>
        <p className="text-xs text-[#64748B] mb-4">Add your first project to showcase your technical skills.</p>
        <PrimaryButton onClick={() => setAddOpen(true)}>
          <Plus size={16} /> Add Project
        </PrimaryButton>
        <AddProjectModal open={addOpen} onClose={() => setAddOpen(false)} onSave={onAddProject} />
      </Card>
    );
  }

  const DetailIcon = hovered ? CATEGORY_ICON[hovered.category] || Briefcase : FolderKanban;

  return (
    <Card className="p-6 sm:p-7">
      <SectionHeading
        title="Featured Projects & Showcase"
        action={
          <SecondaryButton onClick={() => setAddOpen(true)} className="!px-3.5 !py-2 text-xs">
            <Plus size={15} /> Add Project
          </SecondaryButton>
        }
      />
      <p className="text-xs text-[#64748B] -mt-2 mb-5">
        Hover or tap any project to inspect live proof-of-work, code analytics, and architecture demo.
      </p>

      <div className="relative">
        {/* Tiles */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
          {projects.map((p, index) => {
            const isHovered = hoveredId === p.id;
            const dimmed = hoveredId && !isHovered && !isTouch;
            const Icon = CATEGORY_ICON[p.category] || Briefcase;
            const openLeft = index % 4 >= 2;
            return (
              <div key={p.id} className="relative">
                <button
                  onMouseEnter={() => setHoveredId(p.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  onFocus={() => setHoveredId(p.id)}
                  onBlur={() => setHoveredId(null)}
                  onClick={() => setDetailProject(p)}
                  className={`group relative w-full text-left rounded-3xl border overflow-hidden bg-white transition-all duration-200 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-[#111827] focus-visible:ring-offset-2 ${
                    isHovered
                      ? "shadow-[0_14px_32px_rgba(20,40,60,0.12)] -translate-y-1 border-[#111827]"
                      : "border-[#E2EBF0] hover:border-[#CBD5E1]"
                  } ${dimmed ? "opacity-60" : "opacity-100"}`}
                >
                  <div className="h-24 relative p-2 pb-0">
                    <ProjectVisual variant={p.visual} className="h-full rounded-2xl" />
                  </div>
                  <div className="p-3.5">
                    <p className="text-xs font-bold text-[#111827] truncate mb-1 font-display">{p.title}</p>
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#64748B]">
                        <Icon size={11} className="text-[#111827]" /> {p.category}
                      </span>
                      <span className="text-[10px] text-[#2E4D0C] font-bold bg-[#EDF9D4] px-2 py-0.5 rounded-full">
                        Live
                      </span>
                    </div>
                  </div>
                </button>

                {/* Floating tab — Bento Preview */}
                {isHovered && !isTouch && (
                  <div
                    className={`hidden lg:block absolute top-0 ${
                      openLeft
                        ? "right-[calc(100%+14px)] animate-[tabPopLeft_0.18s_ease]"
                        : "left-[calc(100%+14px)] animate-[tabPop_0.18s_ease]"
                    } w-[330px] z-50 pointer-events-none`}
                  >
                    <div className="rounded-[28px] border border-[#E2EBF0] bg-white shadow-[0_24px_54px_rgba(20,40,60,0.16)] overflow-hidden">
                      <div className="h-28 relative p-2.5 pb-0">
                        <ProjectVisual variant={p.visual} className="h-full rounded-2xl" />
                      </div>
                      <div className="p-5">
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-bold bg-[#DDF5F2] text-[#0C453E] border border-[#A5E3DC] mb-2">
                          <DetailIcon size={11} /> {p.category}
                        </span>
                        <p className="text-sm font-bold text-[#111827] mb-1.5 leading-snug font-display">{p.title}</p>
                        <p className="text-xs text-[#64748B] mb-3.5 leading-relaxed line-clamp-2">{p.description}</p>

                        <p className="text-[10px] font-bold text-[#111827] uppercase tracking-wider mb-2">Tech Stack Breakdown</p>
                        <div className="h-[96px] -ml-2 mb-2">
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={p.usage || []} layout="vertical" margin={{ top: 0, right: 12, left: 0, bottom: 0 }}>
                              <XAxis type="number" hide domain={[0, 100]} />
                              <YAxis
                                dataKey="name"
                                type="category"
                                width={84}
                                tick={{ fontSize: 10, fill: "#111827", fontWeight: 600 }}
                                axisLine={false}
                                tickLine={false}
                              />
                              <Bar dataKey="value" radius={[0, 6, 6, 0]} barSize={9}>
                                {(p.usage || []).map((entry, i) => (
                                  <Cell key={entry.name} fill={TECH_CHART_COLORS[i % TECH_CHART_COLORS.length]} />
                                ))}
                              </Bar>
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                        <p className="text-xs text-[#111827] font-bold mt-2.5">Click tile for full project modal →</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <AddProjectModal open={addOpen} onClose={() => setAddOpen(false)} onSave={onAddProject} />

      {detailProject && (
        <Modal open={!!detailProject} onClose={() => setDetailProject(null)} title={detailProject.title} wide>
          <div className="h-48 rounded-3xl overflow-hidden mb-4 border border-[#E2EBF0] p-2 bg-[#F4F8FA]">
            <ProjectVisual variant={detailProject.visual} className="h-full rounded-2xl" />
          </div>
          <p className="text-xs sm:text-sm text-[#64748B] mb-4 leading-relaxed">{detailProject.description}</p>
          <div className="flex flex-wrap gap-2 mb-5">
            {detailProject.skills.map((s) => (
              <span key={s} className="px-3 py-1 rounded-full text-xs bg-[#EDF9D4] border border-[#D5F29B] text-[#2E4D0C] font-bold">
                {s}
              </span>
            ))}
          </div>
          <div className="flex gap-3">
            <a href={detailProject.github} target="_blank" rel="noopener noreferrer">
              <SecondaryButton>
                <GithubIcon size={15} /> GitHub Repo
              </SecondaryButton>
            </a>
            <a href={detailProject.demo} target="_blank" rel="noopener noreferrer">
              <PrimaryButton>
                <ExternalLink size={15} /> Live Demo
              </PrimaryButton>
            </a>
          </div>
        </Modal>
      )}
    </Card>
  );
}

export default ProjectsShowcase;
