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
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-[#FAF8F9] border border-[#E9E2E5]">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-white border border-[#E9E2E5] flex items-center justify-center shrink-0 shadow-xs">
              {Icon && <Icon size={22} className="text-[#BA203B]" />}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h4 className="text-base font-bold text-[#101218] font-display">{skill.name}</h4>
                <LevelBadge level={skill.level} />
              </div>
              <p className="text-xs text-[#707584] mt-0.5">
                {skill.verified
                  ? "Validated via real-world Proof of Work"
                  : "Unverified · Add project evidence or certificate"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {skill.verified ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-[#E8F7F1] text-[#1B7352] border border-[#C6EFE0]">
                <BadgeCheck size={16} /> Verified Badge Active
              </span>
            ) : (
              <button
                onClick={handleVerify}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-[#BA203B] text-white hover:bg-[#A31C34] active:scale-95 transition-all shadow-xs"
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
              <FolderKanban size={16} className="text-[#BA203B]" />
              <h5 className="text-sm font-bold text-[#101218] font-display">
                Demonstrated in Projects ({proof.projects.length})
              </h5>
            </div>
            {proof.projects.length === 0 && (
              <button
                onClick={() => {
                  onClose();
                  onNavigate?.("projects");
                }}
                className="text-xs text-[#BA203B] font-semibold hover:underline"
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
                  className="p-3.5 rounded-xl border border-[#E9E2E5] bg-white hover:border-[#BA203B]/40 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-sm font-bold text-[#101218] truncate">{p.title}</p>
                      <span className="text-[10px] px-2 py-0.5 rounded-md bg-[#FCEBEF] text-[#BA203B] font-semibold">
                        {p.category}
                      </span>
                    </div>
                    <p className="text-xs text-[#707584] line-clamp-1">{p.description}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    {p.github && (
                      <a
                        href={p.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-[#707584] hover:text-[#101218] px-2.5 py-1 rounded-lg border border-[#E9E2E5] bg-[#FAF8F9]"
                      >
                        <ExternalLink size={12} /> Code
                      </a>
                    )}
                    {p.demo && (
                      <a
                        href={p.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-[#BA203B] font-semibold hover:bg-[#FCEBEF] px-2.5 py-1 rounded-lg border border-[#F5CAD3] bg-[#FAF8F9]"
                      >
                        <ExternalLink size={12} /> Live Demo
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-4 rounded-xl border border-dashed border-[#E9E2E5] text-center bg-[#FAF8F9]">
              <p className="text-xs text-[#707584]">
                No portfolio projects currently tagged with <strong>{skill.name}</strong>. Tag this skill in a showcase project to provide verifiable GitHub proof to recruiters.
              </p>
            </div>
          )}
        </div>

        {/* EVIDENCE SECTION 2: CERTIFICATES */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <FileBadge size={16} className="text-[#BA203B]" />
              <h5 className="text-sm font-bold text-[#101218] font-display">
                Accredited Certificates & Honors ({proof.certificates.length})
              </h5>
            </div>
            {proof.certificates.length === 0 && (
              <button
                onClick={() => {
                  onClose();
                  onNavigate?.("certificates");
                }}
                className="text-xs text-[#BA203B] font-semibold hover:underline"
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
                  className="p-3.5 rounded-xl border border-[#E9E2E5] bg-white flex items-center justify-between gap-3"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-[#101218] truncate">{c.title}</p>
                    <p className="text-xs text-[#707584]">
                      {c.org} · {c.date} {c.credentialId ? `· ID: ${c.credentialId}` : ""}
                    </p>
                  </div>
                  {c.verified && (
                    <span className="inline-flex items-center gap-1 text-[11px] text-[#1B7352] font-semibold bg-[#E8F7F1] px-2 py-0.5 rounded-full shrink-0">
                      <BadgeCheck size={13} /> Accredited
                    </span>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="p-4 rounded-xl border border-dashed border-[#E9E2E5] text-center bg-[#FAF8F9]">
              <p className="text-xs text-[#707584]">
                No certificates registered covering <strong>{skill.name}</strong>. Upload a course or university certificate to strengthen this credential.
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
