import React, { useState } from "react";
import { BadgeCheck, ExternalLink, Printer, Copy, Check, Award, ShieldCheck, Sparkles } from "lucide-react";
import { Modal } from "../common/Modal";
import { PrimaryButton, SecondaryButton } from "../common/FormControls";

export function CertificatePreviewModal({ open, onClose, cert, studentName = "Student Developer" }) {
  const [copied, setCopied] = useState(false);

  if (!cert) return null;

  const handleCopyLink = () => {
    const url = cert.verificationUrl || window.location.href;
    navigator.clipboard?.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <Modal open={open} onClose={onClose} title="Digital Credential Certificate" wide={true}>
      <div className="space-y-6">
        {/* Certificate Card */}
        <div className="relative p-6 sm:p-10 rounded-2xl bg-gradient-to-b from-[#131824] via-[#161D2B] to-[#131824] border-2 border-[#00C0F3]/30 shadow-[0_8px_35px_rgba(0,0,0,0.5)] overflow-hidden text-[#F1F5F9]">
          {/* Decorative Background Accents */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-radial from-[#00C0F3]/15 to-transparent rounded-full -mr-16 -mt-16 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-radial from-[#10B981]/15 to-transparent rounded-full -ml-16 -mb-16 pointer-events-none" />

          {/* Top Bar with Issuer & Verification Seal */}
          <div className="flex items-center justify-between border-b border-[#232F47] pb-4 mb-6">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#00C0F3] text-[#0A0D14] flex items-center justify-center font-extrabold font-display shadow-sm">
                SV
              </div>
              <div>
                <p className="text-xs font-bold text-[#F1F5F9] uppercase tracking-wider">SkillVerse Credential Registry</p>
                <p className="text-[11px] text-[#94A3B8]">Tamper-Evident Verified Record</p>
              </div>
            </div>

            {cert.verified ? (
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#062E23] text-[#10B981] border border-[#0F5132] text-xs font-bold">
                <BadgeCheck size={16} /> Verified Authentic
              </div>
            ) : (
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#3A2A10] text-[#FBBF24] border border-[#5C4218] text-xs font-bold">
                Self-Reported
              </div>
            )}
          </div>

          {/* Certificate Body */}
          <div className="text-center space-y-4 py-2">
            <p className="text-xs font-semibold text-[#00C0F3] uppercase tracking-widest">Certificate of Achievement</p>
            <p className="text-xs text-[#94A3B8]">This certifies that</p>
            
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#F1F5F9] font-display">
              {studentName}
            </h2>

            <p className="text-xs text-[#94A3B8] max-w-sm mx-auto">
              has successfully fulfilled all requirements and demonstrated certified proficiency in
            </p>

            <div className="p-4 rounded-xl bg-[#182030] border border-[#232F47] max-w-lg mx-auto shadow-sm">
              <h3 className="text-lg sm:text-xl font-bold text-[#00C0F3] font-display mb-1">
                {cert.title}
              </h3>
              <p className="text-xs font-medium text-[#F1F5F9]">
                Issued by <span className="font-bold text-[#A3E635]">{cert.org}</span>
              </p>
            </div>

            {cert.description && (
              <p className="text-xs text-[#94A3B8] max-w-md mx-auto italic">
                "{cert.description}"
              </p>
            )}

            {/* Skills Badges */}
            {cert.skills && cert.skills.length > 0 && (
              <div className="pt-2">
                <p className="text-[11px] font-semibold text-[#94A3B8] uppercase tracking-wider mb-2">Validated Competencies</p>
                <div className="flex flex-wrap justify-center gap-1.5 max-w-md mx-auto">
                  {cert.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[#131824] text-[#F1F5F9] border border-[#232F47]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Certificate Footer Metadata */}
          <div className="flex flex-col sm:flex-row items-center justify-between pt-6 border-t border-[#232F47] mt-6 gap-4 text-xs">
            <div className="text-center sm:text-left">
              <p className="text-[#94A3B8]">Issue Date: <span className="font-semibold text-[#F1F5F9]">{cert.date}</span></p>
              <p className="text-[#94A3B8]">Credential ID: <span className="font-mono font-semibold text-[#00C0F3]">{cert.credentialId || "SV-78291-REG"}</span></p>
            </div>

            <div className="flex items-center gap-3">
              {/* Simulated QR Code */}
              <div className="w-12 h-12 rounded-lg bg-[#182030] border border-[#232F47] p-1 flex items-center justify-center shadow-xs">
                <div className="grid grid-cols-3 gap-0.5 w-full h-full p-0.5">
                  <div className="bg-[#00C0F3] rounded-[2px]" />
                  <div className="bg-[#A3E635] rounded-[2px]" />
                  <div className="bg-[#00C0F3] rounded-[2px]" />
                  <div className="bg-[#00C0F3] rounded-[2px]" />
                  <div className="bg-transparent rounded-[2px]" />
                  <div className="bg-[#00C0F3] rounded-[2px]" />
                  <div className="bg-[#A3E635] rounded-[2px]" />
                  <div className="bg-[#00C0F3] rounded-[2px]" />
                  <div className="bg-[#00C0F3] rounded-[2px]" />
                </div>
              </div>
              <div className="text-left">
                <p className="text-[11px] font-bold text-[#F1F5F9]">Scan or Click to Verify</p>
                <p className="text-[10px] text-[#94A3B8]">Secured by SkillVerse Network</p>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <div className="flex gap-2">
            <button
              onClick={handleCopyLink}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold border border-[#232F47] bg-[#182030] hover:bg-[#202B40] text-[#F1F5F9] transition-colors shadow-xs"
            >
              {copied ? <Check size={14} className="text-[#10B981]" /> : <Copy size={14} />}
              {copied ? "Copied to Clipboard!" : "Copy Credential Link"}
            </button>
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold border border-[#232F47] bg-[#182030] hover:bg-[#202B40] text-[#F1F5F9] transition-colors shadow-xs"
            >
              <Printer size={14} /> Print / Save PDF
            </button>
          </div>

          <div className="flex gap-2">
            {cert.verificationUrl && (
              <a
                href={cert.verificationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-[#00C0F3] text-[#0A0D14] hover:bg-[#38BDF8] transition-colors shadow-xs"
              >
                External Issuer Link <ExternalLink size={13} />
              </a>
            )}
            <SecondaryButton onClick={onClose} className="!px-4 !py-2 text-xs">
              Close
            </SecondaryButton>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default CertificatePreviewModal;
