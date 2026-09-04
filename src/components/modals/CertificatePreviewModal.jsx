import React, { useState } from "react";
import { BadgeCheck, ExternalLink, Printer, Copy, Check, Award, ShieldCheck, Sparkles } from "lucide-react";
import { Modal } from "../common/Modal";
import { PrimaryButton, SecondaryButton } from "../common/FormControls";

export function CertificatePreviewModal({ open, onClose, cert, studentName = "Rahul Sharma" }) {
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
        <div className="relative p-6 sm:p-10 rounded-2xl bg-gradient-to-b from-[#FFFDFD] via-[#FAF7F8] to-[#FFF9FA] border-4 border-[#BA203B]/20 shadow-[0_8px_30px_rgba(186,32,59,0.08)] overflow-hidden">
          {/* Decorative Background Accents */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-radial from-[#BA203B]/10 to-transparent rounded-full -mr-16 -mt-16 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-radial from-[#1B7352]/10 to-transparent rounded-full -ml-16 -mb-16 pointer-events-none" />

          {/* Top Bar with Issuer & Verification Seal */}
          <div className="flex items-center justify-between border-b border-[#E9E2E5] pb-4 mb-6">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#BA203B] text-white flex items-center justify-center font-bold font-display shadow-sm">
                SV
              </div>
              <div>
                <p className="text-xs font-bold text-[#101218] uppercase tracking-wider">SkillVerse Credential Registry</p>
                <p className="text-[11px] text-[#707584]">Tamper-Evident Verified Record</p>
              </div>
            </div>

            {cert.verified ? (
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8F7F1] text-[#1B7352] border border-[#C6EFE0] text-xs font-bold">
                <BadgeCheck size={16} /> Verified Authentic
              </div>
            ) : (
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF8EB] text-[#B57C1E] border border-[#FFE8BF] text-xs font-bold">
                Self-Reported
              </div>
            )}
          </div>

          {/* Certificate Body */}
          <div className="text-center space-y-4 py-2">
            <p className="text-xs font-semibold text-[#BA203B] uppercase tracking-widest">Certificate of Achievement</p>
            <p className="text-xs text-[#707584]">This certifies that</p>
            
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#101218] font-display">
              {studentName}
            </h2>

            <p className="text-xs text-[#707584] max-w-sm mx-auto">
              has successfully fulfilled all requirements and demonstrated certified proficiency in
            </p>

            <div className="p-4 rounded-xl bg-white border border-[#E9E2E5] max-w-lg mx-auto shadow-xs">
              <h3 className="text-lg sm:text-xl font-bold text-[#BA203B] font-display mb-1">
                {cert.title}
              </h3>
              <p className="text-xs font-medium text-[#101218]">
                Issued by <span className="font-bold">{cert.org}</span>
              </p>
            </div>

            {cert.description && (
              <p className="text-xs text-[#707584] max-w-md mx-auto italic">
                "{cert.description}"
              </p>
            )}

            {/* Skills Badges */}
            {cert.skills && cert.skills.length > 0 && (
              <div className="pt-2">
                <p className="text-[11px] font-semibold text-[#707584] uppercase tracking-wider mb-2">Validated Competencies</p>
                <div className="flex flex-wrap justify-center gap-1.5 max-w-md mx-auto">
                  {cert.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[#FAF8F9] text-[#101218] border border-[#E9E2E5]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Certificate Footer Metadata */}
          <div className="flex flex-col sm:flex-row items-center justify-between pt-6 border-t border-[#E9E2E5] mt-6 gap-4 text-xs">
            <div className="text-center sm:text-left">
              <p className="text-[#707584]">Issue Date: <span className="font-semibold text-[#101218]">{cert.date}</span></p>
              <p className="text-[#707584]">Credential ID: <span className="font-mono font-semibold text-[#101218]">{cert.credentialId || "SV-78291-REG"}</span></p>
            </div>

            <div className="flex items-center gap-3">
              {/* Simulated QR Code */}
              <div className="w-12 h-12 rounded-lg bg-white border border-[#E9E2E5] p-1 flex items-center justify-center shadow-xs">
                <div className="grid grid-cols-3 gap-0.5 w-full h-full p-0.5">
                  <div className="bg-[#101218] rounded-[2px]" />
                  <div className="bg-[#BA203B] rounded-[2px]" />
                  <div className="bg-[#101218] rounded-[2px]" />
                  <div className="bg-[#101218] rounded-[2px]" />
                  <div className="bg-transparent rounded-[2px]" />
                  <div className="bg-[#101218] rounded-[2px]" />
                  <div className="bg-[#BA203B] rounded-[2px]" />
                  <div className="bg-[#101218] rounded-[2px]" />
                  <div className="bg-[#101218] rounded-[2px]" />
                </div>
              </div>
              <div className="text-left">
                <p className="text-[11px] font-bold text-[#101218]">Scan or Click to Verify</p>
                <p className="text-[10px] text-[#707584]">Secured by SkillVerse Network</p>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <div className="flex gap-2">
            <button
              onClick={handleCopyLink}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold border border-[#E9E2E5] bg-white hover:bg-[#FAF8F9] text-[#101218] transition-colors shadow-xs"
            >
              {copied ? <Check size={14} className="text-[#1B7352]" /> : <Copy size={14} />}
              {copied ? "Copied to Clipboard!" : "Copy Credential Link"}
            </button>
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold border border-[#E9E2E5] bg-white hover:bg-[#FAF8F9] text-[#101218] transition-colors shadow-xs"
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
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-[#BA203B] text-white hover:bg-[#A3182F] transition-colors shadow-xs"
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
