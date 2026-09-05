import React, { useState } from "react";
import { FileBadge, BadgeCheck, Plus, ExternalLink, Trash2, Eye } from "lucide-react";
import { Card } from "../components/common/Card";
import { SectionHeading } from "../components/common/SectionHeading";
import { PrimaryButton, SecondaryButton } from "../components/common/FormControls";
import { AddCertificateModal } from "../components/modals/AddCertificateModal";
import { CertificatePreviewModal } from "../components/modals/CertificatePreviewModal";

export function CertificatesPage({
  certificates = [],
  onAddCertificate,
  onDeleteCertificate,
  studentName = "Rahul Sharma",
  projectsCount = 4,
  skillsCount = 7,
}) {
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [previewCert, setPreviewCert] = useState(null);

  const verifiedCount = certificates.filter((c) => c.verified).length;

  return (
    <div className="space-y-6">
      <Card className="p-6 sm:p-8">
        <SectionHeading
          title="Certificates & Verified Credentials"
          action={
            <PrimaryButton onClick={() => setAddModalOpen(true)} className="!px-4 !py-2 text-xs font-bold">
              <Plus size={15} /> Add Certificate
            </PrimaryButton>
          }
        />
        <p className="text-xs sm:text-sm text-[#64748B] mb-6">
          Official credentials, university honors, and accredited certificates validated on the SkillVerse ledger.
        </p>

        {/* Dynamic Bento Metric Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 mb-6">
          {[
            { label: "Total Certificates", value: certificates.length, bg: "bg-[#F4F8FA]", text: "text-[#111827]" },
            { label: "Verified on Ledger", value: verifiedCount, bg: "bg-[#EDF9D4]", text: "text-[#2E4D0C]" },
            { label: "Active Projects", value: projectsCount, bg: "bg-[#DDF5F2]", text: "text-[#0C453E]" },
            { label: "Skill Proofs", value: skillsCount, bg: "bg-[#FDE5E5]", text: "text-[#5C1B1B]" },
          ].map((c) => (
            <div key={c.label} className={`text-center p-4 rounded-3xl ${c.bg} border border-[#E2EBF0] shadow-xs`}>
              <p className={`text-2xl font-black ${c.text} font-display`}>{c.value}</p>
              <p className="text-[11px] text-[#64748B] font-semibold mt-0.5">{c.label}</p>
            </div>
          ))}
        </div>

        {/* Certificates List */}
        <div className="space-y-3">
          {certificates.length === 0 ? (
            <div className="text-center py-12 border border-dashed border-[#CBD5E1] rounded-3xl bg-[#F4F8FA]/50">
              <FileBadge size={36} className="mx-auto text-[#94A3B8] mb-2" />
              <p className="text-sm font-bold text-[#111827] font-display">No certificates added yet</p>
              <p className="text-xs text-[#64748B] mb-4">Add your course completion certificates and verified credentials.</p>
              <PrimaryButton onClick={() => setAddModalOpen(true)} className="!px-4 !py-2 text-xs font-bold">
                <Plus size={14} /> Add First Certificate
              </PrimaryButton>
            </div>
          ) : (
            certificates.map((c) => (
              <div
                key={c.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-3.5 p-4 sm:p-5 rounded-3xl border border-[#E2EBF0] bg-[#F4F8FA]/60 hover:bg-white hover:border-[#CBD5E1] hover:shadow-sm transition-all"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-12 h-12 rounded-2xl bg-[#DDF5F2] border border-[#A5E3DC] flex items-center justify-center shrink-0">
                    <FileBadge size={22} className="text-[#0C453E]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-0.5">
                      <p className="text-sm font-bold text-[#111827] truncate font-display">{c.title}</p>
                      {c.verified ? (
                        <span className="inline-flex items-center gap-1 text-[11px] text-[#2E4D0C] font-bold bg-[#EDF9D4] px-2.5 py-0.5 rounded-full border border-[#D5F29B]">
                          <BadgeCheck size={13} /> Verified
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] text-[#92400E] font-semibold bg-[#FEF3C7] px-2.5 py-0.5 rounded-full border border-[#FDE68A]">
                          Self-Reported
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[#64748B]">
                      {c.org} · {c.date} {c.credentialId ? `· ID: ${c.credentialId}` : ""}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                  <button
                    onClick={() => setPreviewCert(c)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-2xl text-xs text-[#111827] font-bold bg-white hover:bg-[#F4F8FA] border border-[#E2EBF0] shadow-sm transition-colors"
                  >
                    <Eye size={13} /> View Certificate
                  </button>

                  {onDeleteCertificate && (
                    <button
                      onClick={() => onDeleteCertificate(c.id)}
                      className="p-2 text-[#94A3B8] hover:text-[#EF4444] hover:bg-[#FEE2E2] rounded-2xl transition-all"
                      title="Delete Certificate"
                    >
                      <Trash2 size={15} />
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </Card>

      <AddCertificateModal
        open={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onSave={onAddCertificate}
      />

      <CertificatePreviewModal
        open={Boolean(previewCert)}
        onClose={() => setPreviewCert(null)}
        cert={previewCert}
        studentName={studentName}
      />
    </div>
  );
}

export default CertificatesPage;
