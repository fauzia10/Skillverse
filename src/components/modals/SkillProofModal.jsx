import React, { useState } from "react";
import {
  FolderKanban,
  FileBadge,
  BadgeCheck,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Play,
  RotateCcw,
  Check,
} from "lucide-react";
import { Modal } from "../common/Modal";
import { LevelBadge } from "../common/Badges";
import { PrimaryButton, SecondaryButton } from "../common/FormControls";
import { getSkillIcon, getSkillProof, getQuestionsForSkill } from "../../data/mockData";

export function SkillProofModal({
  open,
  onClose,
  skill,
  projects = [],
  certificates = [],
  onVerifySkill,
  onNavigate,
}) {
  const [showPractice, setShowPractice] = useState(false);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  if (!skill) return null;

  const Icon = skill.icon || getSkillIcon(skill.name);
  const proof = getSkillProof(skill.name, projects, certificates);
  const questions = getQuestionsForSkill(skill.name);

  // Score calculation for practice
  const score = Object.entries(selectedAnswers).reduce((acc, [qIdx, optIdx]) => {
    return optIdx === questions[parseInt(qIdx, 10)]?.correct ? acc + 1 : acc;
  }, 0);
  const passScore = Math.ceil(questions.length * 0.75);
  const passed = score >= passScore;

  const handleSelectOption = (qIdx, optIdx) => {
    if (submitted) return;
    setSelectedAnswers((prev) => ({ ...prev, [qIdx]: optIdx }));
  };

  const handleResetPractice = () => {
    setSelectedAnswers({});
    setSubmitted(false);
    setCurrentQIndex(0);
  };

  const handleVerify = () => {
    if (onVerifySkill) {
      onVerifySkill(skill.id);
    }
  };

  return (
    <Modal
      open={open}
      onClose={() => {
        handleResetPractice();
        setShowPractice(false);
        onClose();
      }}
      title="Skill Verification & Proof of Work"
      wide
    >
      <div className="space-y-6">
        {/* Header summary */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-[#182030] border border-[#232F47]">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-[#131824] border border-[#232F47] flex items-center justify-center shrink-0 shadow-xs">
              {Icon && <Icon size={22} className="text-[#00C0F3]" />}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h4 className="text-base font-bold text-[#F1F5F9] font-display">{skill.name}</h4>
                <LevelBadge level={skill.level} />
              </div>
              <p className="text-xs text-[#94A3B8] mt-0.5">
                {skill.verified
                  ? "Validated via real-world Proof of Work"
                  : "Unverified · Add project evidence or certificate"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {skill.verified ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-[#062E23] text-[#10B981] border border-[#0F5132]">
                <BadgeCheck size={16} /> Verified Badge Active
              </span>
            ) : (
              <button
                onClick={handleVerify}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-[#00C0F3] text-[#0A0D14] hover:bg-[#38BDF8] active:scale-95 transition-all shadow-xs"
              >
                <Check size={14} /> Endorse / Mark Verified
              </button>
            )}
          </div>
        </div>

        {/* EVIDENCE SECTION 1: PROJECTS */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <FolderKanban size={16} className="text-[#00C0F3]" />
              <h5 className="text-sm font-bold text-[#F1F5F9] font-display">
                Demonstrated in Projects ({proof.projects.length})
              </h5>
            </div>
            {proof.projects.length === 0 && (
              <button
                onClick={() => {
                  onClose();
                  onNavigate?.("projects");
                }}
                className="text-xs text-[#00C0F3] font-semibold hover:underline"
              >
                + Add Project with {skill.name}
              </button>
            )}
          </div>

          {proof.projects.length > 0 ? (
            <div className="space-y-2.5">
              {proof.projects.map((p) => (
                <div
                  key={p.id}
                  className="p-3.5 rounded-xl border border-[#232F47] bg-[#131824] hover:border-[#00C0F3]/40 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-sm font-bold text-[#F1F5F9] truncate">{p.title}</p>
                      <span className="text-[10px] px-2 py-0.5 rounded-md bg-[#0D2D3E] text-[#00C0F3] font-semibold">
                        {p.category}
                      </span>
                    </div>
                    <p className="text-xs text-[#94A3B8] line-clamp-1">{p.description}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    {p.github && (
                      <a
                        href={p.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-[#94A3B8] hover:text-[#F1F5F9] px-2.5 py-1 rounded-lg border border-[#232F47] bg-[#182030]"
                      >
                        <ExternalLink size={12} /> Code
                      </a>
                    )}
                    {p.demo && (
                      <a
                        href={p.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-[#00C0F3] font-semibold hover:bg-[#0D2D3E] px-2.5 py-1 rounded-lg border border-[#00C0F3]/30 bg-[#182030]"
                      >
                        <ExternalLink size={12} /> Live Demo
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-4 rounded-xl border border-dashed border-[#232F47] text-center bg-[#182030]/60">
              <p className="text-xs text-[#94A3B8]">
                No portfolio projects currently tagged with <strong className="text-[#F1F5F9]">{skill.name}</strong>. Tag this skill in a showcase project to provide verifiable GitHub proof to recruiters.
              </p>
            </div>
          )}
        </div>

        {/* EVIDENCE SECTION 2: CERTIFICATES */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <FileBadge size={16} className="text-[#00C0F3]" />
              <h5 className="text-sm font-bold text-[#F1F5F9] font-display">
                Accredited Certificates & Honors ({proof.certificates.length})
              </h5>
            </div>
            {proof.certificates.length === 0 && (
              <button
                onClick={() => {
                  onClose();
                  onNavigate?.("certificates");
                }}
                className="text-xs text-[#00C0F3] font-semibold hover:underline"
              >
                + Add Certificate
              </button>
            )}
          </div>

          {proof.certificates.length > 0 ? (
            <div className="space-y-2.5">
              {proof.certificates.map((c) => (
                <div
                  key={c.id}
                  className="p-3.5 rounded-xl border border-[#232F47] bg-[#131824] flex items-center justify-between gap-3"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-[#F1F5F9] truncate">{c.title}</p>
                    <p className="text-xs text-[#94A3B8]">
                      {c.org} · {c.date} {c.credentialId ? `· ID: ${c.credentialId}` : ""}
                    </p>
                  </div>
                  {c.verified && (
                    <span className="inline-flex items-center gap-1 text-[11px] text-[#10B981] font-semibold bg-[#062E23] px-2 py-0.5 rounded-full shrink-0">
                      <BadgeCheck size={13} /> Accredited
                    </span>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="p-4 rounded-xl border border-dashed border-[#232F47] text-center bg-[#182030]/60">
              <p className="text-xs text-[#94A3B8]">
                No certificates registered covering <strong className="text-[#F1F5F9]">{skill.name}</strong>. Upload a course or university certificate to strengthen this credential.
              </p>
            </div>
          )}
        </div>

        {/* Close footer */}
        <div className="flex justify-end pt-2">
          <SecondaryButton
            onClick={() => {
              handleResetPractice();
              setShowPractice(false);
              onClose();
            }}
          >
            Done
          </SecondaryButton>
        </div>
      </div>
    </Modal>
  );
}

export default SkillProofModal;
