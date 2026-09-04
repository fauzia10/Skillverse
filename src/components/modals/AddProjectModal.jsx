import React, { useState } from "react";
import { Modal } from "../common/Modal";
import { TextField, TextArea, SelectField, PrimaryButton, SecondaryButton } from "../common/FormControls";

export function AddProjectModal({ open, onClose, onSave }) {
  const empty = { title: "", category: "App", description: "", skills: "", github: "", demo: "" };
  const [form, setForm] = useState(empty);
  const [errors, setErrors] = useState({});

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const handleSave = () => {
    const errs = {};
    if (!form.title.trim()) errs.title = "Title is required.";
    if (!form.category) errs.category = "Choose a category.";
    if (!form.description.trim()) errs.description = "Add a short description.";
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    const skillList = form.skills.split(",").map((s) => s.trim()).filter(Boolean);
    const usageList = skillList.length
      ? skillList.map((name, i) => ({
          name,
          value: Math.round(100 / skillList.length) - i,
        }))
      : [{ name: form.category, value: 100 }];

    onSave({
      id: Date.now(),
      title: form.title.trim(),
      category: form.category,
      description: form.description.trim(),
      skills: skillList,
      github: form.github || "https://github.com/",
      demo: form.demo || "https://example.com/",
      visual: "campus",
      usage: usageList,
    });
    setForm(empty);
    setErrors({});
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} title="Add a project" wide>
      <TextField label="Project title" placeholder="e.g. Attendance Tracker" value={form.title} onChange={set("title")} />
      {errors.title && <p className="text-xs text-[#C15B5B] -mt-3 mb-4">{errors.title}</p>}
      <SelectField label="Category" options={["App", "Website", "Hardware", "Other"]} value={form.category} onChange={set("category")} />
      <TextArea label="Short description" rows={3} placeholder="What does this project do?" value={form.description} onChange={set("description")} />
      {errors.description && <p className="text-xs text-[#C15B5B] -mt-3 mb-4">{errors.description}</p>}
      <TextField label="Skills / technologies used (comma separated)" placeholder="React, Node.js, MongoDB" value={form.skills} onChange={set("skills")} />
      <div className="grid sm:grid-cols-2 gap-x-4">
        <TextField label="GitHub URL" placeholder="https://github.com/…" value={form.github} onChange={set("github")} />
        <TextField label="Demo URL" placeholder="https://…" value={form.demo} onChange={set("demo")} />
      </div>
      <div className="flex gap-3 mt-2">
        <PrimaryButton onClick={handleSave} className="flex-1">
          Save project
        </PrimaryButton>
        <SecondaryButton onClick={onClose} className="flex-1">
          Cancel
        </SecondaryButton>
      </div>
    </Modal>
  );
}

export default AddProjectModal;
