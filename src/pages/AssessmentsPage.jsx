import React, { useState } from "react";
import { BadgeCheck, FolderKanban, FileBadge, Sparkles, Plus, ExternalLink, Play, Eye } from "lucide-react";
import { Card } from "../components/common/Card";
import { SectionHeading } from "../components/common/SectionHeading";
import { PrimaryButton, SecondaryButton } from "../components/common/FormControls";
import { SkillProofModal } from "../components/modals/SkillProofModal";
import { LevelBadge } from "../components/common/Badges";
import { getSkillIcon, getSkillProof } from "../data/mockData";

export function AssessmentsPage({
  skills = [],
  projects = [],
  certificates = [],
  onVerifySkill,
  onNavigate,
}) {
  const [selectedSkill, setSelectedSkill] = useState(null);

  const verifiedSkills = skills.filter((s) => s.verified);
  const projectBacked = skills.filter((s) => getSkillProof(s.name, projects, certificates).projects.length > 0);
  const certificateBacked = skills.filter((s) => getSkillProof(s.name, projects, certificates).certificates.length > 0);
  const verificationRate = skills.length > 0 ? Math.round((verifiedSkills.length / skills.length) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* Top Banner Bento Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-[#10B981]/10 rounded-3xl p-5 border border-[#10B981]/30 flex items-center gap-4 shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-[#131824] border border-[#10B981]/30 flex items-center justify-center text-[#10B981] shadow-sm shrink-0">
            <BadgeCheck size={26} />
          </div>
          <div>
            <p className="text-2xl font-black text-[#10B981] font-display">{verifiedSkills.length} / {skills.length}</p>
            <p className="text-xs text-[#10B981]/80 font-bold">Verified Skills ({verificationRate}%)</p>
          </div>
        </div>

        <div className="bg-[#00C0F3]/10 rounded-3xl p-5 border border-[#00C0F3]/30 flex items-center gap-4 shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-[#131824] border border-[#00C0F3]/30 flex items-center justify-center text-[#00C0F3] shadow-sm shrink-0">
            <FolderKanban size={26} />
          </div>
          <div>
            <p className="text-2xl font-black text-[#00C0F3] font-display">{projectBacked.length}</p>
            <p className="text-xs text-[#00C0F3]/80 font-bold">Project-Backed Proofs</p>
          </div>
        </div>

        <div className="bg-[#A3E635]/10 rounded-3xl p-5 border border-[#A3E635]/30 flex items-center gap-4 shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-[#131824] border border-[#A3E635]/30 flex items-center justify-center text-[#A3E635] shadow-sm shrink-0">
            <FileBadge size={26} />
          </div>
          <div>
            <p className="text-2xl font-black text-[#A3E635] font-display">{certificateBacked.length}</p>
            <p className="text-xs text-[#A3E635]/80 font-bold">Certified Credentials</p>
          </div>
        </div>
      </div>

      <Card className="p-6 sm:p-8">
        <SectionHeading
          title="Proof of Work Verification Ledger"
          action={
            <div className="text-xs text-[#94A3B8] hidden sm:block font-semibold">
              🔒 Recruiter-trusted evidence verified through GitHub & accredited certificates
            </div>
          }
        />
        <p className="text-xs sm:text-sm text-[#94A3B8] mb-6">
          Skills are validated through real-world portfolio projects and accredited course certificates. Tap any skill to inspect linked evidence or run an optional conceptual self-check.
        </p>

        <div className="space-y-3">
          {skills.length === 0 ? (
            <div className="text-center py-12 border border-dashed border-[#1F293D] rounded-3xl bg-[#182030]/50">
              <BadgeCheck size={36} className="mx-auto text-[#10B981] mb-2" />
              <p className="text-sm font-bold text-[#F1F5F9] font-display">No skills available for verification</p>
              <p className="text-xs text-[#94A3B8] mb-4">Add skills to your portfolio first, then link projects, certificates, or complete assessments.</p>
              <PrimaryButton onClick={() => onNavigate("skills")} className="!px-4 !py-2 text-xs font-bold">
                Go to Skills Page →
              </PrimaryButton>
            </div>
          ) : (
            skills.map((s) => {
              const Icon = getSkillIcon(s.name);
              const proof = getSkillProof(s.name, projects, certificates);
              const isVerified = s.verified || proof.hasProof;

              return (
                <div
                  key={s.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:p-5 rounded-3xl border border-[#1F293D] bg-[#182030]/60 hover:bg-[#1C2538] hover:border-[#00C0F3]/40 hover:shadow-sm transition-all gap-4"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="w-11 h-11 rounded-2xl bg-[#131824] border border-[#1F293D] flex items-center justify-center shrink-0 shadow-sm">
                      <Icon size={19} className="text-[#00C0F3]" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <p className="text-sm font-bold text-[#F1F5F9] font-display">{s.name}</p>
                        <LevelBadge level={s.level} />
                        {isVerified && (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#10B981] bg-[#10B981]/15 px-2.5 py-0.5 rounded-full border border-[#10B981]/30">
                            <BadgeCheck size={12} /> Verified
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-[#94A3B8] truncate">
                        {proof.projects.length > 0 ? (
                          <span>📁 Project proof: <strong className="text-[#F1F5F9]">{proof.projects[0].title}</strong></span>
                        ) : proof.certificates.length > 0 ? (
                          <span>📜 Accredited by: <strong className="text-[#F1F5F9]">{proof.certificates[0].org}</strong></span>
                        ) : (
                          <span className="text-[#64748B]">⚠️ No proof linked yet · Tag in a project or add certificate</span>
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                    <SecondaryButton
                      onClick={() => setSelectedSkill(s)}
                      className="!px-3.5 !py-2 text-xs font-bold text-[#F1F5F9]"
                    >
                      <Eye size={13} /> View Evidence
                    </SecondaryButton>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </Card>

      {/* Skill Proof Modal */}
      <SkillProofModal
        open={Boolean(selectedSkill)}
        onClose={() => setSelectedSkill(null)}
        skill={selectedSkill}
        projects={projects}
        certificates={certificates}
        onVerifySkill={onVerifySkill}
        onNavigate={onNavigate}
      />
    </div>
  );
}

export default AssessmentsPage;
