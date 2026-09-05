import React, { useState } from "react";
import { Plus, BadgeCheck, Trash2, FolderKanban, FileBadge, ExternalLink, Sparkles } from "lucide-react";
import { Card } from "../components/common/Card";
import { SectionHeading } from "../components/common/SectionHeading";
import { LevelBadge } from "../components/common/Badges";
import { PrimaryButton } from "../components/common/FormControls";
import { AddSkillModal } from "../components/modals/AddSkillModal";
import { SkillProofModal } from "../components/modals/SkillProofModal";
import { getSkillIcon, getSkillProof } from "../data/mockData";

export function SkillsPage({
  skills = [],
  projects = [],
  certificates = [],
  onAddSkill,
  onDeleteSkill,
  onVerifySkill,
  onNavigate,
}) {
  const [modal, setModal] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const verifiedCount = skills.filter((s) => s.verified).length;

  return (
    <div className="space-y-6">
      <Card className="p-6 sm:p-8">
        <SectionHeading
          title="Skills & Proof of Work"
          action={
            <PrimaryButton onClick={() => setModal(true)} className="!px-4 !py-2 text-xs font-bold">
              <Plus size={15} /> Add Skill
            </PrimaryButton>
          }
        />
        <p className="text-xs sm:text-sm text-[#64748B] mb-6">
          <strong className="text-[#111827]">{verifiedCount} of {skills.length} skills</strong> verified via portfolio projects and accredited credentials. Tap any skill card to inspect evidence or run a practice check.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {skills.map((s) => {
            const Icon = s.icon || getSkillIcon(s.name);
            const proof = getSkillProof(s.name, projects, certificates);
            const hasProof = s.verified || proof.hasProof;

            let proofLabel = "Pending proof";
            let ProofIcon = Sparkles;
            if (proof.projects.length > 0) {
              proofLabel = `Project: ${proof.projects[0].title.split(" ")[0]}`;
              ProofIcon = FolderKanban;
            } else if (proof.certificates.length > 0) {
              proofLabel = `Cert: ${proof.certificates[0].org.split(" ")[0]}`;
              ProofIcon = FileBadge;
            } else if (s.verified) {
              proofLabel = "Verified on Ledger";
              ProofIcon = BadgeCheck;
            }

            return (
              <div
                key={s.id}
                role="button"
                tabIndex={0}
                onClick={() => setSelectedSkill(s)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setSelectedSkill(s);
                  }
                }}
                className="group flex flex-col justify-between p-4 sm:p-5 rounded-3xl border border-[#E2EBF0] bg-[#F4F8FA]/60 hover:bg-white hover:border-[#CBD5E1] hover:shadow-[0_8px_24px_rgba(20,40,60,0.06)] active:scale-[0.99] transition-all cursor-pointer text-left select-none gap-3.5"
              >
                <div className="flex items-start gap-3.5">
                  <div className="w-11 h-11 rounded-2xl bg-white border border-[#E2EBF0] flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                    {Icon && <Icon size={19} className="text-[#111827]" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <p className="text-sm font-bold text-[#111827] truncate font-display">{s.name}</p>
                      {onDeleteSkill && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onDeleteSkill(s.id);
                          }}
                          className="p-1 text-[#94A3B8] hover:text-[#EF4444] hover:bg-[#FEE2E2] rounded-lg transition-all -mr-1 -mt-1"
                          title="Delete Skill"
                          aria-label="Delete Skill"
                        >
                          <Trash2 size={13} />
                        </button>
                      )}
                    </div>
                    <LevelBadge level={s.level} />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2.5 border-t border-[#E2EBF0] text-xs">
                  <span className={`inline-flex items-center gap-1.5 text-[11px] font-semibold truncate max-w-[170px] ${
                    hasProof ? "text-[#2E4D0C]" : "text-[#64748B]"
                  }`}>
                    <ProofIcon size={13} className={hasProof ? "text-[#2E4D0C]" : "text-[#94A3B8]"} />
                    <span className="truncate">{proofLabel}</span>
                  </span>

                  <span className="text-[11px] text-[#111827] font-bold group-hover:underline">
                    View Proof →
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      <AddSkillModal open={modal} onClose={() => setModal(false)} onSave={onAddSkill} />

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

export default SkillsPage;
