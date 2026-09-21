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
        <p className="text-xs sm:text-sm text-[#94A3B8] mb-6">
          <strong className="text-[#F1F5F9]">{verifiedCount} of {skills.length} skills</strong> verified via portfolio projects and accredited credentials. Tap any skill card to inspect evidence or run a practice check.
        </p>

        {skills.length === 0 ? (
          <div className="text-center py-12 border border-dashed border-[#1F293D] rounded-3xl bg-[#182030]/50">
            <Sparkles size={36} className="mx-auto text-[#00C0F3] mb-2" />
            <p className="text-sm font-bold text-[#F1F5F9] font-display">No skills added yet</p>
            <p className="text-xs text-[#94A3B8] mb-4">Add your technical proficiencies, tools, and languages to start verifying proof of work.</p>
            <PrimaryButton onClick={() => setModal(true)} className="!px-4 !py-2 text-xs font-bold">
              <Plus size={14} /> Add First Skill
            </PrimaryButton>
          </div>
        ) : (
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
                  className="group flex flex-col justify-between p-4 sm:p-5 rounded-3xl border border-[#1F293D] bg-[#182030]/60 hover:bg-[#1C2538] hover:border-[#00C0F3]/40 hover:shadow-[0_8px_24px_rgba(0,0,0,0.4)] active:scale-[0.99] transition-all cursor-pointer text-left select-none gap-3.5"
                >
                  <div className="flex items-start gap-3.5">
                    <div className="w-11 h-11 rounded-2xl bg-[#131824] border border-[#1F293D] flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                      {Icon && <Icon size={19} className="text-[#00C0F3]" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <p className="text-sm font-bold text-[#F1F5F9] truncate font-display">{s.name}</p>
                        {onDeleteSkill && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onDeleteSkill(s.id);
                            }}
                            className="p-1 text-[#64748B] hover:text-[#FB7185] hover:bg-[#FB7185]/10 rounded-lg transition-all -mr-1 -mt-1"
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

                  <div className="flex items-center justify-between pt-2.5 border-t border-[#1F293D] text-xs">
                    <span className={`inline-flex items-center gap-1.5 text-[11px] font-semibold truncate max-w-[170px] ${
                      hasProof ? "text-[#A3E635]" : "text-[#94A3B8]"
                    }`}>
                      <ProofIcon size={13} className={hasProof ? "text-[#A3E635]" : "text-[#64748B]"} />
                      <span className="truncate">{proofLabel}</span>
                    </span>

                    <span className="text-[11px] text-[#00C0F3] font-bold group-hover:underline">
                      View Proof →
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
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
