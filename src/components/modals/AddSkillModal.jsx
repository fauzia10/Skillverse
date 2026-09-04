import React, { useState } from "react";
import { Sparkles } from "lucide-react";
import { Modal } from "../common/Modal";
import { TextField, PrimaryButton, SecondaryButton } from "../common/FormControls";

export function AddSkillModal({ open, onClose, onSave }) {
  const [name, setName] = useState("");
  const [level, setLevel] = useState("Beginner");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState("");

  const handleSave = () => {
    if (!name.trim()) {
      setError("Enter a skill name to continue.");
      return;
    }
    onSave({ id: Date.now(), name: name.trim(), level, verified, icon: Sparkles });
    setName("");
    setLevel("Beginner");
    setVerified(false);
    setError("");
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} title="Add a skill">
      <TextField
        label="Skill name"
        placeholder="e.g. Tableau"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
          setError("");
        }}
      />
      {error && <p className="text-xs text-[#C15B5B] -mt-3 mb-4">{error}</p>}
      <div className="mb-4">
        <span className="block text-sm font-medium text-[#1F4045] mb-1.5">Level</span>
        <div className="flex gap-2">
          {["Beginner", "Intermediate", "Advanced"].map((l) => (
            <button
              key={l}
              type="button"
              onClick={() => setLevel(l)}
              className={`flex-1 py-2 rounded-xl text-sm border transition-colors ${
                level === l ? "border-[#E9A6A6] bg-[#F7E6E6] text-[#CF7F83] font-medium" : "border-[#E8E4DF] text-[#738083]"
              }`}
            >
              {l}
            </button>
          ))}
        </div>
      </div>
      <label className="flex items-center gap-2.5 mb-6 cursor-pointer select-none">
        <input
          type="checkbox"
          checked={verified}
          onChange={(e) => setVerified(e.target.checked)}
          className="w-4 h-4 rounded accent-[#4B8B79]"
        />
        <span className="text-sm text-[#315C61]">Mark as assessed / verified</span>
      </label>
      <div className="flex gap-3">
        <PrimaryButton onClick={handleSave} className="flex-1">
          Save skill
        </PrimaryButton>
        <SecondaryButton onClick={onClose} className="flex-1">
          Cancel
        </SecondaryButton>
      </div>
    </Modal>
  );
}

export default AddSkillModal;
