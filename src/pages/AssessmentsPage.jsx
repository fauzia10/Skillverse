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
        <div className="bg-[#EDF9D4] rounded-3xl p-5 border border-[#D5F29B] flex items-center gap-4 shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-[#2E4D0C] shadow-sm shrink-0">
            <BadgeCheck size={26} />
          </div>
          <div>
            <p className="text-2xl font-black text-[#2E4D0C] font-display">{verifiedSkills.length} / {skills.length}</p>
            <p className="text-xs text-[#2E4D0C]/80 font-bold">Verified Skills ({verificationRate}%)</p>
          </div>
        </div>

        <div className="bg-[#DDF5F2] rounded-3xl p-5 border border-[#A5E3DC] flex items-center gap-4 shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-[#0C453E] shadow-sm shrink-0">
            <FolderKanban size={26} />
          </div>
          <div>
            <p className="text-2xl font-black text-[#0C453E] font-display">{projectBacked.length}</p>
            <p className="text-xs text-[#0C453E]/80 font-bold">Project-Backed Proofs</p>
          </div>
        </div>

        <div className="bg-[#FDE5E5] rounded-3xl p-5 border border-[#F8B6B6] flex items-center gap-4 shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-[#5C1B1B] shadow-sm shrink-0">
            <FileBadge size={26} />
          </div>
          <div>
            <p className="text-2xl font-black text-[#5C1B1B] font-display">{certificateBacked.length}</p>
            <p className="text-xs text-[#5C1B1B]/80 font-bold">Certified Credentials</p>
          </div>
        </div>
      </div>

      <Card className="p-6 sm:p-8">
        <SectionHeading
          title="Proof of Work Verification Ledger"
          action={
            <div className="text-xs text-[#64748B] hidden sm:block font-semibold">
              🔒 Recruiter-trusted evidence verified through GitHub & accredited certificates
            </div>
          }
        />
        <p className="text-xs sm:text-sm text-[#64748B] mb-6">
          Skills are validated through real-world portfolio projects and accredited course certificates. Tap any skill to inspect linked evidence or run an optional conceptual self-check.
        </p>

        <div className="space-y-3">
          {skills.map((s) => {
            const Icon = getSkillIcon(s.name);
            const proof = getSkillProof(s.name, projects, certificates);
            const isVerified = s.verified || proof.hasProof;

            return (
              <div
                key={s.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:p-5 rounded-3xl border border-[#E2EBF0] bg-[#F4F8FA]/60 hover:bg-white hover:border-[#CBD5E1] hover:shadow-sm transition-all gap-4"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-11 h-11 rounded-2xl bg-white border border-[#E2EBF0] flex items-center justify-center shrink-0 shadow-sm">
                    <Icon size={19} className="text-[#111827]" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <p className="text-sm font-bold text-[#111827] font-display">{s.name}</p>
                      <LevelBadge level={s.level} />
                      {isVerified && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#2E4D0C] bg-[#EDF9D4] px-2.5 py-0.5 rounded-full border border-[#D5F29B]">
                          <BadgeCheck size={12} /> Verified
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[#64748B] truncate">
                      {proof.projects.length > 0 ? (
                        <span>📁 Project proof: <strong className="text-[#111827]">{proof.projects[0].title}</strong></span>
                      ) : proof.certificates.length > 0 ? (
                        <span>📜 Accredited by: <strong className="text-[#111827]">{proof.certificates[0].org}</strong></span>
                      ) : (
                        <span className="text-[#64748B]">⚠️ No proof linked yet · Tag in a project or add certificate</span>
                      )}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                  <SecondaryButton
                    onClick={() => setSelectedSkill(s)}
                    className="!px-3.5 !py-2 text-xs font-bold text-[#111827]"
                  >
                    <Eye size={13} /> View Evidence
                  </SecondaryButton>
                </div>
              </div>
            );
          })}
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
