import React, { useState, useRef } from "react";
import { Camera, Trash2 } from "lucide-react";
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
    <div className="space-y-6 max-w-3xl">
      <Card className="p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <div className="text-center">
            <img
              src={avatar}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover border-2 border-[#E9E2E5] shadow-sm mb-3 ring-2 ring-[#BA203B]/20"
            />
            <div className="flex gap-2 justify-center flex-wrap">
              <SecondaryButton onClick={() => fileRef.current?.click()} className="!px-3 !py-1.5 text-xs">
                <Camera size={13} /> {avatar.includes("blob:") ? "Change Photo" : "Upload Photo"}
              </SecondaryButton>
              {avatar.includes("blob:") && (
                <button
                  onClick={() => setAvatar(DEFAULT_AVATAR)}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs text-[#BA203B] hover:bg-[#FCEBEF] transition-colors"
                >
                  <Trash2 size={13} /> Remove
                </button>
              )}
            </div>
            <input ref={fileRef} type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={handlePhoto} />
            <p className="text-[11px] text-[#707584] mt-2 max-w-[160px]">Upload a JPG, PNG, or WebP image.</p>
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
        <SectionHeading title="Academic details" />
        <div className="grid sm:grid-cols-2 gap-x-4">
          <TextField label="CGPA" value={form.cgpa} onChange={set("cgpa")} />
        </div>
        <div className="mb-4">
          <span className="block text-sm font-semibold text-[#101218] mb-1.5">Relevant coursework</span>
          <div className="flex flex-wrap gap-2">
            {COURSEWORK.map((c) => (
              <span key={c} className="px-3 py-1.5 rounded-full text-xs bg-[#FCEBEF] text-[#BA203B] font-semibold border border-[#F5CAD3]">
                {c}
              </span>
            ))}
          </div>
        </div>
        <TextArea label="Academic achievements" rows={2} value={form.achievements} onChange={set("achievements")} />
      </Card>

      <Card className="p-6 sm:p-8">
        <SectionHeading title="Developer & Coding Profiles" />
        <p className="text-xs text-[#707584] mb-4">
          Connect your GitHub, LeetCode, and Codeforces profiles so recruiters and companies can view your verified coding stats.
        </p>

        <div className="space-y-4">
          {/* GitHub */}
          <div className="p-4 rounded-xl bg-[#FAF8F9] border border-[#E9E2E5]">
            <p className="text-xs font-bold text-[#101218] mb-3 flex items-center gap-1.5">
              <span>🐙 GitHub Profile</span>
            </p>
            <div className="grid sm:grid-cols-2 gap-x-4">
              <TextField label="GitHub Username / Handle" value={form.githubUsername || ""} onChange={set("githubUsername")} placeholder="e.g. rahul-sharma" />
              <TextField label="GitHub Profile URL" value={form.github || ""} onChange={set("github")} placeholder="https://github.com/..." />
              <TextField label="Public Repositories Count" type="number" value={form.githubRepos || ""} onChange={set("githubRepos")} placeholder="18" />
              <TextField label="Annual Contributions / Commits" type="number" value={form.githubContributions || ""} onChange={set("githubContributions")} placeholder="340" />
            </div>
          </div>

          {/* LeetCode */}
          <div className="p-4 rounded-xl bg-[#FAF8F9] border border-[#E9E2E5]">
            <p className="text-xs font-bold text-[#101218] mb-3 flex items-center gap-1.5">
              <span>🟡 LeetCode Profile</span>
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
          <div className="p-4 rounded-xl bg-[#FAF8F9] border border-[#E9E2E5]">
            <p className="text-xs font-bold text-[#101218] mb-3 flex items-center gap-1.5">
              <span>🔵 Codeforces & Professional Links</span>
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
