import React, { useState, useRef } from "react";
import { Camera, Trash2, CheckCircle2 } from "lucide-react";
import { Card } from "../components/common/Card";
import { SectionHeading } from "../components/common/SectionHeading";
import { TextField, TextArea, SelectField, PrimaryButton, SecondaryButton } from "../components/common/FormControls";
import { COURSEWORK, CAREER_OPTIONS, DEFAULT_AVATAR } from "../data/mockData";

export function ProfilePage({ profile, setProfile, avatar, setAvatar, showToast }) {
  const [form, setForm] = useState(profile);
  const fileRef = useRef(null);

  const handlePhoto = (e) => {
    const file = e.target.files?.[0];
    if (file) setAvatar(URL.createObjectURL(file));
  };

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const save = () => {
    setProfile(form);
    showToast("Profile changes saved.");
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <Card className="p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <div className="text-center">
            <img
              src={avatar}
              alt="Profile"
              className="w-24 h-24 rounded-3xl object-cover border-2 border-[#2A3754] shadow-md mb-3 ring-2 ring-[#00C0F3]/20"
            />
            <div className="flex gap-2 justify-center flex-wrap">
              <SecondaryButton onClick={() => fileRef.current?.click()} className="!px-3 !py-1.5 text-xs">
                <Camera size={13} /> {avatar.includes("blob:") ? "Change Photo" : "Upload Photo"}
              </SecondaryButton>
              {avatar.includes("blob:") && (
                <button
                  onClick={() => setAvatar(DEFAULT_AVATAR)}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-2xl text-xs text-[#FB7185] hover:bg-[#36121C] transition-colors"
                >
                  <Trash2 size={13} /> Remove
                </button>
              )}
            </div>
            <input ref={fileRef} type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={handlePhoto} />
            <p className="text-[11px] text-[#94A3B8] mt-2 max-w-[160px]">Upload a JPG, PNG, or WebP image.</p>
          </div>

          <div className="flex-1 w-full grid sm:grid-cols-2 gap-x-4">
            <TextField label="Full name" value={form.name} onChange={set("name")} />
            <TextField label="College / University" value={form.college} onChange={set("college")} />
            <TextField label="Degree" value={form.degree} onChange={set("degree")} />
            <TextField label="Department" value={form.department} onChange={set("department")} />
            <TextField label="Current year / semester" value={form.year} onChange={set("year")} />
            <TextField label="Location" value={form.location} onChange={set("location")} />
            <TextField label="Email" type="email" value={form.email} onChange={set("email")} />
          </div>
        </div>
        <TextArea label="Short professional introduction" rows={3} value={form.bio} onChange={set("bio")} className="mt-2" />
      </Card>

      <Card className="p-6 sm:p-8">
        <SectionHeading title="Academic Details & Coursework" />
        <div className="grid sm:grid-cols-2 gap-x-4">
          <TextField label="CGPA / Grade" value={form.cgpa} onChange={set("cgpa")} />
        </div>
        <div className="mb-4">
          <span className="block text-xs font-bold text-[#F1F5F9] uppercase tracking-wider mb-2">Relevant coursework</span>
          <div className="flex flex-wrap gap-2">
            {COURSEWORK.map((c) => (
              <span key={c} className="px-3.5 py-1.5 rounded-full text-xs bg-[#0D2D3E] text-[#00C0F3] font-bold border border-[#164863]">
                {c}
              </span>
            ))}
          </div>
        </div>
        <TextArea label="Academic achievements" rows={2} value={form.achievements} onChange={set("achievements")} />
      </Card>

      <Card className="p-6 sm:p-8">
        <SectionHeading title="Developer & Coding Profiles" />
        <p className="text-xs text-[#94A3B8] -mt-2 mb-5">
          Connect your GitHub, LeetCode, and Codeforces profiles so recruiters and companies can view your verified coding metrics.
        </p>

        <div className="space-y-4">
          {/* GitHub */}
          <div className="p-5 rounded-3xl bg-[#182030] border border-[#232F47]">
            <p className="text-xs font-bold text-[#F1F5F9] mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#00C0F3]" />
              <span>GitHub Developer Profile</span>
            </p>
            <div className="grid sm:grid-cols-2 gap-x-4">
              <TextField label="GitHub Username / Handle" value={form.githubUsername || ""} onChange={set("githubUsername")} placeholder="e.g. rahul-sharma" />
              <TextField label="GitHub Profile URL" value={form.github || ""} onChange={set("github")} placeholder="https://github.com/..." />
              <TextField label="Public Repositories Count" type="number" value={form.githubRepos || ""} onChange={set("githubRepos")} placeholder="18" />
              <TextField label="Annual Contributions / Commits" type="number" value={form.githubContributions || ""} onChange={set("githubContributions")} placeholder="340" />
            </div>
          </div>

          {/* LeetCode */}
          <div className="p-5 rounded-3xl bg-[#182030] border border-[#232F47]">
            <p className="text-xs font-bold text-[#F1F5F9] mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#F59E0B]" />
              <span>LeetCode Competitive Programming</span>
            </p>
            <div className="grid sm:grid-cols-2 gap-x-4">
              <TextField label="LeetCode Username" value={form.leetcodeUsername || ""} onChange={set("leetcodeUsername")} placeholder="e.g. rahul_codes" />
              <TextField label="LeetCode Profile URL" value={form.leetcode || ""} onChange={set("leetcode")} placeholder="https://leetcode.com/u/..." />
              <TextField label="Total Problems Solved" type="number" value={form.leetcodeSolved || ""} onChange={set("leetcodeSolved")} placeholder="428" />
              <TextField label="Contest Rating" type="number" value={form.leetcodeRating || ""} onChange={set("leetcodeRating")} placeholder="1845" />
            </div>
            <div className="grid grid-cols-3 gap-2 mt-2">
              <TextField label="Easy" type="number" value={form.leetcodeEasy || ""} onChange={set("leetcodeEasy")} />
              <TextField label="Medium" type="number" value={form.leetcodeMedium || ""} onChange={set("leetcodeMedium")} />
              <TextField label="Hard" type="number" value={form.leetcodeHard || ""} onChange={set("leetcodeHard")} />
            </div>
          </div>

          {/* Codeforces & LinkedIn */}
          <div className="p-5 rounded-3xl bg-[#182030] border border-[#232F47]">
            <p className="text-xs font-bold text-[#F1F5F9] mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#38BDF8]" />
              <span>Codeforces & Professional Links</span>
            </p>
            <div className="grid sm:grid-cols-2 gap-x-4">
              <TextField label="Codeforces Handle" value={form.codeforcesHandle || ""} onChange={set("codeforcesHandle")} placeholder="e.g. rahul_sharma" />
              <TextField label="Codeforces Profile URL" value={form.codeforces || ""} onChange={set("codeforces")} placeholder="https://codeforces.com/profile/..." />
              <TextField label="Codeforces Rating" type="number" value={form.codeforcesRating || ""} onChange={set("codeforcesRating")} placeholder="1492" />
              <TextField label="Codeforces Rank Title" value={form.codeforcesRank || ""} onChange={set("codeforcesRank")} placeholder="Specialist / Expert" />
              <div className="sm:col-span-2">
                <TextField label="LinkedIn Profile URL" value={form.linkedin || ""} onChange={set("linkedin")} placeholder="https://linkedin.com/in/..." />
              </div>
            </div>
          </div>
        </div>
      </Card>

      <div className="flex gap-3 pb-4">
        <PrimaryButton onClick={save}>Save Changes</PrimaryButton>
        <SecondaryButton onClick={() => setForm(profile)}>Cancel</SecondaryButton>
      </div>
    </div>
  );
}

export default ProfilePage;
