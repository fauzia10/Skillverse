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
      {/* Top Banner Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="p-5 flex items-center gap-4 bg-gradient-to-br from-white to-[#FAF8F9]">
          <div className="w-12 h-12 rounded-2xl bg-[#E8F7F1] border border-[#C6EFE0] flex items-center justify-center text-[#1B7352]">
            <BadgeCheck size={26} />
          </div>
          <div>
            <p className="text-2xl font-bold text-[#101218] font-display">{verifiedSkills.length} / {skills.length}</p>
            <p className="text-xs text-[#707584]">Verified Skills ({verificationRate}%)</p>
          </div>
        </Card>

        <Card className="p-5 flex items-center gap-4 bg-gradient-to-br from-white to-[#FAF8F9]">
          <div className="w-12 h-12 rounded-2xl bg-[#FCEBEF] border border-[#F5CAD3] flex items-center justify-center text-[#BA203B]">
            <FolderKanban size={26} />
          </div>
          <div>
            <p className="text-2xl font-bold text-[#101218] font-display">{projectBacked.length}</p>
            <p className="text-xs text-[#707584]">Project-Backed Proofs</p>
          </div>
        </Card>

        <Card className="p-5 flex items-center gap-4 bg-gradient-to-br from-white to-[#FAF8F9]">
          <div className="w-12 h-12 rounded-2xl bg-[#FFF8EB] border border-[#FFE8BF] flex items-center justify-center text-[#B57C1E]">
            <FileBadge size={26} />
          </div>
          <div>
            <p className="text-2xl font-bold text-[#101218] font-display">{certificateBacked.length}</p>
            <p className="text-xs text-[#707584]">Certified Credentials</p>
          </div>
        </Card>
      </div>

      <Card className="p-6 sm:p-8">
        <SectionHeading
          title="Proof of Work Verification Ledger"
          action={
            <div className="text-xs text-[#707584] hidden sm:block">
              Recruiter-trusted evidence: Verified through GitHub code & certificates
            </div>
          }
        />
        <p className="text-sm text-[#707584] mb-6">
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
                className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl border border-[#E9E2E5] bg-[#FAF8F9] hover:bg-white hover:border-[#BA203B]/50 hover:shadow-xs transition-all gap-4"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-11 h-11 rounded-xl bg-white border border-[#E9E2E5] flex items-center justify-center shrink-0 shadow-xs">
                    <Icon size={19} className="text-[#BA203B]" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="text-sm font-bold text-[#101218]">{s.name}</p>
                      <LevelBadge level={s.level} />
                      {isVerified && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#1B7352] bg-[#E8F7F1] px-2 py-0.5 rounded-full border border-[#C6EFE0]">
                          <BadgeCheck size={12} /> Verified
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[#707584] mt-1 truncate">
                      {proof.projects.length > 0 ? (
                        <span>📁 Project proof: <strong>{proof.projects[0].title}</strong></span>
                      ) : proof.certificates.length > 0 ? (
                        <span>📜 Accredited by: <strong>{proof.certificates[0].org}</strong></span>
                      ) : (
                        <span>⚠️ No proof linked yet · Tag in a project or add certificate</span>
                      )}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                  <SecondaryButton
                    onClick={() => setSelectedSkill(s)}
                    className="!px-3.5 !py-1.5 text-xs text-[#BA203B] hover:bg-[#FCEBEF]"
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
