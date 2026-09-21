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
        <p className="text-xs sm:text-sm text-[#94A3B8] mb-6">
          Official credentials, university honors, and accredited certificates validated on the SkillVerse ledger.
        </p>

        {/* Dynamic Bento Metric Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 mb-6">
          {[
            { label: "Total Certificates", value: certificates.length, bg: "bg-[#182030]", border: "border-[#1F293D]", text: "text-[#F1F5F9]" },
            { label: "Verified on Ledger", value: verifiedCount, bg: "bg-[#10B981]/10", border: "border-[#10B981]/30", text: "text-[#10B981]" },
            { label: "Active Projects", value: projectsCount, bg: "bg-[#00C0F3]/10", border: "border-[#00C0F3]/30", text: "text-[#00C0F3]" },
            { label: "Skill Proofs", value: skillsCount, bg: "bg-[#A3E635]/10", border: "border-[#A3E635]/30", text: "text-[#A3E635]" },
          ].map((c) => (
            <div key={c.label} className={`text-center p-4 rounded-3xl ${c.bg} border ${c.border} shadow-xs`}>
              <p className={`text-2xl font-black ${c.text} font-display`}>{c.value}</p>
              <p className="text-[11px] text-[#94A3B8] font-semibold mt-0.5">{c.label}</p>
            </div>
          ))}
        </div>

        {/* Certificates List */}
        <div className="space-y-3">
          {certificates.length === 0 ? (
            <div className="text-center py-12 border border-dashed border-[#1F293D] rounded-3xl bg-[#182030]/50">
              <FileBadge size={36} className="mx-auto text-[#64748B] mb-2" />
              <p className="text-sm font-bold text-[#F1F5F9] font-display">No certificates added yet</p>
              <p className="text-xs text-[#94A3B8] mb-4">Add your course completion certificates and verified credentials.</p>
              <PrimaryButton onClick={() => setAddModalOpen(true)} className="!px-4 !py-2 text-xs font-bold">
                <Plus size={14} /> Add First Certificate
              </PrimaryButton>
            </div>
          ) : (
            certificates.map((c) => (
              <div
                key={c.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-3.5 p-4 sm:p-5 rounded-3xl border border-[#1F293D] bg-[#182030]/60 hover:bg-[#1C2538] hover:border-[#00C0F3]/40 hover:shadow-sm transition-all"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-12 h-12 rounded-2xl bg-[#00C0F3]/10 border border-[#00C0F3]/30 flex items-center justify-center shrink-0">
                    <FileBadge size={22} className="text-[#00C0F3]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-0.5">
                      <p className="text-sm font-bold text-[#F1F5F9] truncate font-display">{c.title}</p>
                      {c.verified ? (
                        <span className="inline-flex items-center gap-1 text-[11px] text-[#10B981] font-bold bg-[#10B981]/15 px-2.5 py-0.5 rounded-full border border-[#10B981]/30">
                          <BadgeCheck size={13} /> Verified
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] text-[#F59E0B] font-semibold bg-[#F59E0B]/15 px-2.5 py-0.5 rounded-full border border-[#F59E0B]/30">
                          Self-Reported
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[#94A3B8]">
                      {c.org} · {c.date} {c.credentialId ? `· ID: ${c.credentialId}` : ""}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                  <button
                    onClick={() => setPreviewCert(c)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-2xl text-xs text-[#F1F5F9] font-bold bg-[#131824] hover:bg-[#182030] border border-[#1F293D] shadow-sm transition-colors"
                  >
                    <Eye size={13} /> View Certificate
                  </button>

                  {onDeleteCertificate && (
                    <button
                      onClick={() => onDeleteCertificate(c.id)}
                      className="p-2 text-[#64748B] hover:text-[#FB7185] hover:bg-[#FB7185]/10 rounded-2xl transition-all"
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
