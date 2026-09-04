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
            <PrimaryButton onClick={() => setModal(true)} className="!px-4 !py-2 text-sm">
              <Plus size={15} /> Add Skill
            </PrimaryButton>
          }
        />
        <p className="text-sm text-[#707584] mb-5">
          {verifiedCount} of {skills.length} skills verified via portfolio projects and accredited credentials. Tap any skill to inspect evidence or run a practice check.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
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
              proofLabel = "Verified";
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
                className="group flex flex-col justify-between p-4 rounded-2xl border border-[#E9E2E5] bg-[#FAF8F9] hover:bg-white hover:border-[#BA203B]/60 hover:shadow-sm active:scale-[0.99] transition-all cursor-pointer text-left select-none gap-3"
              >
                <div className="flex items-start gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-white border border-[#E9E2E5] flex items-center justify-center shrink-0 shadow-xs">
                    {Icon && <Icon size={18} className="text-[#BA203B]" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <p className="text-sm font-bold text-[#101218] truncate">{s.name}</p>
                      {onDeleteSkill && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onDeleteSkill(s.id);
                          }}
                          className="p-1 text-[#707584] hover:text-[#BA203B] hover:bg-[#FCEBEF] rounded-lg transition-all -mr-1 -mt-1"
                          title="Delete Skill"
                          aria-label="Delete Skill"
                        >
                          <Trash2 size={14} />
                        </button>
                      )}
                    </div>
                    <LevelBadge level={s.level} />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-[#F2ECEE] text-xs">
                  <span className={`inline-flex items-center gap-1 text-[11px] font-medium truncate max-w-[170px] ${
                    hasProof ? "text-[#1B7352]" : "text-[#707584]"
                  }`}>
                    <ProofIcon size={12} className={hasProof ? "text-[#1B7352]" : "text-[#707584]"} />
                    <span className="truncate">{proofLabel}</span>
                  </span>

                  <span className="text-[11px] text-[#BA203B] font-semibold group-hover:underline">
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
