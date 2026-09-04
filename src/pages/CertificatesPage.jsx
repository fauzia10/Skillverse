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
          title="Certificates & Credentials"
          action={
            <PrimaryButton onClick={() => setAddModalOpen(true)} className="!px-4 !py-2 text-xs">
              <Plus size={15} /> Add Certificate
            </PrimaryButton>
          }
        />
        <p className="text-sm text-[#707584] mb-6">
          Official credentials, university honors, and accredited certificates validated on the SkillVerse ledger.
        </p>

        {/* Dynamic Metric Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {[
            { label: "Certificates", value: certificates.length },
            { label: "Verified Credentials", value: verifiedCount },
            { label: "Active Projects", value: projectsCount },
            { label: "Skill Badges", value: skillsCount },
          ].map((c) => (
            <div key={c.label} className="text-center p-4 rounded-2xl bg-[#FAF8F9] border border-[#E9E2E5]">
              <p className="text-2xl font-bold text-[#101218] font-display">{c.value}</p>
              <p className="text-xs text-[#707584]">{c.label}</p>
            </div>
          ))}
        </div>

        {/* Certificates List */}
        <div className="space-y-3">
          {certificates.length === 0 ? (
            <div className="text-center py-10 border border-dashed border-[#E9E2E5] rounded-2xl">
              <FileBadge size={36} className="mx-auto text-[#A0A6B5] mb-2" />
              <p className="text-sm font-semibold text-[#101218]">No certificates added yet</p>
              <p className="text-xs text-[#707584] mb-4">Add your course completion certificates and licenses.</p>
              <PrimaryButton onClick={() => setAddModalOpen(true)} className="!px-4 !py-2 text-xs">
                <Plus size={14} /> Add First Certificate
              </PrimaryButton>
            </div>
          ) : (
            certificates.map((c) => (
              <div
                key={c.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-3.5 p-4 rounded-2xl border border-[#E9E2E5] bg-[#FAF8F9] hover:bg-white hover:border-[#BA203B]/50 hover:shadow-xs transition-all"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-11 h-11 rounded-xl bg-[#FCEBEF] border border-[#F5CAD3] flex items-center justify-center shrink-0">
                    <FileBadge size={20} className="text-[#BA203B]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="text-sm font-bold text-[#101218] truncate">{c.title}</p>
                      {c.verified ? (
                        <span className="inline-flex items-center gap-1 text-[11px] text-[#1B7352] font-semibold bg-[#E8F7F1] px-2 py-0.5 rounded-full border border-[#C6EFE0]">
                          <BadgeCheck size={13} /> Verified
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] text-[#B57C1E] font-semibold bg-[#FFF8EB] px-2 py-0.5 rounded-full border border-[#FFE8BF]">
                          Self-Reported
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[#707584]">
                      {c.org} · {c.date} {c.credentialId ? `· ID: ${c.credentialId}` : ""}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                  <button
                    onClick={() => setPreviewCert(c)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs text-[#BA203B] font-semibold bg-white hover:bg-[#FCEBEF] border border-[#E9E2E5] transition-colors"
                  >
                    <Eye size={13} /> View Certificate
                  </button>

                  {onDeleteCertificate && (
                    <button
                      onClick={() => onDeleteCertificate(c.id)}
                      className="p-1.5 rounded-xl text-[#707584] hover:text-[#BA203B] hover:bg-[#FCEBEF] transition-colors"
                      title="Delete Certificate"
                      aria-label="Delete Certificate"
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

      {/* Add Certificate Modal */}
      <AddCertificateModal
        open={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onSave={onAddCertificate}
      />

      {/* Certificate Preview Modal */}
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
