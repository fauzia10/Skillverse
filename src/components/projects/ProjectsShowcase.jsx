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
        <FolderKanban size={30} className="mx-auto text-[#BA203B] mb-3" />
        <p className="text-[#101218] font-bold mb-1 font-display">No projects yet</p>
        <p className="text-sm text-[#707584] mb-4">Add your first project to showcase your technical skills.</p>
        <PrimaryButton onClick={() => setAddOpen(true)}>
          <Plus size={16} /> Add Project
        </PrimaryButton>
        <AddProjectModal open={addOpen} onClose={() => setAddOpen(false)} onSave={onAddProject} />
      </Card>
    );
  }

  const DetailIcon = hovered ? CATEGORY_ICON[hovered.category] || Briefcase : FolderKanban;
  const chartData = hovered?.usage || [];

  return (
    <Card className="p-5 sm:p-6">
      <SectionHeading
        title="Projects Showcase"
        action={
          <SecondaryButton onClick={() => setAddOpen(true)} className="!px-3.5 !py-2 text-xs">
            <Plus size={15} /> Add Project
          </SecondaryButton>
        }
      />
      <p className="text-sm text-[#707584] -mt-2 mb-5">
        Tap or click any project to view full details, live demo, and tech breakdown.
      </p>

      <div className="relative">
        {/* Tiles */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
          {projects.map((p, index) => {
            const isHovered = hoveredId === p.id;
            const dimmed = hoveredId && !isHovered && !isTouch;
            const Icon = CATEGORY_ICON[p.category] || Briefcase;
            // On a 4-column layout, tiles in the 3rd & 4th columns open to the left
            const openLeft = index % 4 >= 2;
            return (
              <div key={p.id} className="relative">
                <button
                  onMouseEnter={() => setHoveredId(p.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  onFocus={() => setHoveredId(p.id)}
                  onBlur={() => setHoveredId(null)}
                  onClick={() => setDetailProject(p)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setDetailProject(p);
                    }
                  }}
                  className={`group relative w-full text-left rounded-[18px] border overflow-hidden bg-white transition-all duration-200 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-[#BA203B] focus-visible:ring-offset-2 ${
                    isHovered
                      ? "shadow-[0_12px_28px_rgba(186,32,59,0.18)] -translate-y-1 border-[#BA203B]"
                      : "border-[#E9E2E5] hover:border-[#D5C9CE]"
                  } ${dimmed ? "opacity-60" : "opacity-100"}`}
                >
                  <div className="h-20 relative">
                    <ProjectVisual variant={p.visual} className="h-full" />
                  </div>
                  <div className="p-3">
                    <p className="text-xs font-bold text-[#101218] truncate mb-0.5">{p.title}</p>
                    <p className="text-[11px] text-[#707584] flex items-center gap-1">
                      <Icon size={11} className="text-[#BA203B]" /> {p.category}
                    </p>
                  </div>
                </button>

                {/* Floating tab — opens right for left tiles, opens left for right tiles */}
                {isHovered && !isTouch && (
                  <div
                    className={`hidden lg:block absolute top-0 ${
                      openLeft
                        ? "right-[calc(100%+14px)] animate-[tabPopLeft_0.18s_ease]"
                        : "left-[calc(100%+14px)] animate-[tabPop_0.18s_ease]"
                    } w-[320px] z-50 pointer-events-none`}
                  >
                    <div className="rounded-[22px] border border-[#E9E2E5] bg-white shadow-[0_20px_48px_rgba(16,18,24,0.18)] overflow-hidden">
                      <div className="h-28 relative">
                        <ProjectVisual variant={p.visual} className="h-full" />
                      </div>
                      <div className="p-4 sm:p-5">
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#FCEBEF] text-[#BA203B] border border-[#F5CAD3] mb-2">
                          <DetailIcon size={11} /> {p.category}
                        </span>
                        <p className="text-sm font-bold text-[#101218] mb-1.5 leading-snug">{p.title}</p>
                        <p className="text-xs text-[#707584] mb-3.5 leading-relaxed line-clamp-2">{p.description}</p>

                        <p className="text-[10px] font-bold text-[#101218] uppercase tracking-wider mb-2">Languages & Tech Used</p>
                        <div className="h-[96px] -ml-2 mb-2">
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={p.usage || []} layout="vertical" margin={{ top: 0, right: 12, left: 0, bottom: 0 }}>
                              <XAxis type="number" hide domain={[0, 100]} />
                              <YAxis
                                type="category"
                                dataKey="name"
                                width={84}
                                tick={{ fontSize: 10, fill: "#101218", fontWeight: 600 }}
                                axisLine={false}
                                tickLine={false}
                              />
                              <Bar dataKey="value" radius={[0, 5, 5, 0]} barSize={10}>
                                {(p.usage || []).map((entry, i) => (
                                  <Cell key={entry.name} fill={TECH_CHART_COLORS[i % TECH_CHART_COLORS.length]} />
                                ))}
                              </Bar>
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                        <p className="text-xs text-[#BA203B] font-semibold mt-2.5">Click tile for full project details →</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Mobile/tablet: tapped preview shown inline below the grid */}
        {isTouch && hovered && (
          <div key={hovered.id} className="lg:hidden mt-4 rounded-[20px] border border-[#E9E2E5] bg-[#FAF8F9] overflow-hidden animate-[detailFade_0.25s_ease]">
            <div className="h-28 relative">
              <ProjectVisual variant={hovered.visual} className="h-full" />
            </div>
            <div className="p-4">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-[#FCEBEF] text-[#BA203B] border border-[#F5CAD3] mb-2">
                <DetailIcon size={12} /> {hovered.category}
              </span>
              <p className="text-sm font-bold text-[#101218] mb-1.5">{hovered.title}</p>
              <p className="text-xs text-[#707584] mb-3">{hovered.description}</p>
              <div className="h-[100px] -ml-2 mb-3">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} layout="vertical" margin={{ top: 0, right: 12, left: 0, bottom: 0 }}>
                    <XAxis type="number" hide domain={[0, 100]} />
                    <YAxis type="category" dataKey="name" width={84} tick={{ fontSize: 10, fill: "#101218" }} axisLine={false} tickLine={false} />
                    <Bar dataKey="value" radius={[0, 6, 6, 0]} barSize={10}>
                      {chartData.map((entry, i) => (
                        <Cell key={entry.name} fill={TECH_CHART_COLORS[i % TECH_CHART_COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <PrimaryButton onClick={() => setDetailProject(hovered)} className="!px-3 !py-1.5 text-xs">
                View Details
              </PrimaryButton>
            </div>
          </div>
        )}
      </div>

      <AddProjectModal open={addOpen} onClose={() => setAddOpen(false)} onSave={onAddProject} />

      {detailProject && (
        <Modal open={!!detailProject} onClose={() => setDetailProject(null)} title={detailProject.title} wide>
          <div className="h-48 rounded-[20px] overflow-hidden mb-4 border border-[#E9E2E5]">
            <ProjectVisual variant={detailProject.visual} className="h-full" />
          </div>
          <p className="text-sm text-[#707584] mb-4 leading-relaxed">{detailProject.description}</p>
          <div className="flex flex-wrap gap-1.5 mb-5">
            {detailProject.skills.map((s) => (
              <span key={s} className="px-3 py-1 rounded-full text-xs bg-[#FCEBEF] border border-[#F5CAD3] text-[#BA203B] font-semibold">
                {s}
              </span>
            ))}
          </div>
          <div className="flex gap-2.5">
            <a href={detailProject.github} target="_blank" rel="noopener noreferrer">
              <SecondaryButton>
                <GithubIcon size={15} /> GitHub
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
