import React, { useState } from "react";
import { FileBadge, Plus } from "lucide-react";
import { Modal } from "../common/Modal";
import { TextField, TextArea, PrimaryButton, SecondaryButton } from "../common/FormControls";

export function AddCertificateModal({ open, onClose, onSave }) {
  const [title, setTitle] = useState("");
  const [org, setOrg] = useState("");
  const [date, setDate] = useState("");
  const [credentialId, setCredentialId] = useState("");
  const [skills, setSkills] = useState("");
  const [description, setDescription] = useState("");
  const [verificationUrl, setVerificationUrl] = useState("");
  const [error, setError] = useState("");

  const handleSave = () => {
    if (!title.trim() || !org.trim()) {
      setError("Please fill in both Certificate Title and Issuing Organization.");
      return;
    }

    const skillsArray = skills
      ? skills.split(",").map((s) => s.trim()).filter(Boolean)
      : ["General Proficiency"];

    const newCert = {
      id: Date.now(),
      title: title.trim(),
      org: org.trim(),
      date: date.trim() || "Recent",
      verified: true,
      credentialId: credentialId.trim() || `SV-${Math.floor(10000 + Math.random() * 90000)}`,
      skills: skillsArray,
      description: description.trim() || `Demonstrated competency in ${title.trim()} through verified coursework.`,
      verificationUrl: verificationUrl.trim() || "https://skillverse.edu/verify",
    };

    onSave(newCert);
    setTitle("");
    setOrg("");
    setDate("");
    setCredentialId("");
    setSkills("");
    setDescription("");
    setVerificationUrl("");
    setError("");
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} title="Add Certificate or Credential" wide={true}>
      <div className="space-y-4">
        {error && (
          <div className="p-3 rounded-xl bg-[#FCEBEF] border border-[#F5CAD3] text-xs text-[#BA203B] font-medium">
            {error}
          </div>
        )}

        <div className="grid sm:grid-cols-2 gap-4">
          <TextField
            label="Certificate Title"
            placeholder="e.g. AWS Certified Cloud Practitioner"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              setError("");
            }}
          />
          <TextField
            label="Issuing Organization"
            placeholder="e.g. Amazon Web Services (AWS) / Coursera"
            value={org}
            onChange={(e) => {
              setOrg(e.target.value);
              setError("");
            }}
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <TextField
            label="Issue Date"
            placeholder="e.g. Feb 2026"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <TextField
            label="Credential ID"
            placeholder="e.g. AWS-CCP-94812"
            value={credentialId}
            onChange={(e) => setCredentialId(e.target.value)}
          />
        </div>

        <TextField
          label="Skills Covered (comma separated)"
          placeholder="e.g. Cloud Computing, EC2, S3, IAM"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
        />

        <TextField
          label="Verification URL"
          placeholder="https://aws.amazon.com/verification/..."
          value={verificationUrl}
          onChange={(e) => setVerificationUrl(e.target.value)}
        />

        <TextArea
          label="Description / Key Achievements"
          rows={2}
          placeholder="Brief summary of what was accomplished during this certification..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <div className="flex gap-3 pt-2">
          <PrimaryButton onClick={handleSave} className="flex-1">
            <Plus size={16} /> Save Certificate
          </PrimaryButton>
          <SecondaryButton onClick={onClose} className="flex-1">
            Cancel
          </SecondaryButton>
        </div>
      </div>
    </Modal>
  );
}

export default AddCertificateModal;
