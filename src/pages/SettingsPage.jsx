import React, { useState } from "react";
import {
  Settings,
  Bell,
  Shield,
  User,
  Database,
  Download,
  RotateCcw,
  Check,
  Moon,
  Sun,
  Eye,
  Lock,
  Mail,
  Smartphone,
} from "lucide-react";
import { Card } from "../components/common/Card";
import { SectionHeading } from "../components/common/SectionHeading";
import { TextField, PrimaryButton, SecondaryButton } from "../components/common/FormControls";

export function SettingsPage({
  settings = {},
  onUpdateSettings,
  profile = {},
  onResetData,
  showToast,
}) {
  const [activeTab, setActiveTab] = useState("notifications");
  const [localSettings, setLocalSettings] = useState(settings);
  const [saved, setSaved] = useState(false);

  const toggleNotif = (key) => {
    setLocalSettings((prev) => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: !prev.notifications?.[key],
      },
    }));
  };

  const togglePrivacy = (key) => {
    setLocalSettings((prev) => ({
      ...prev,
      privacy: {
        ...prev.privacy,
        [key]: !prev.privacy?.[key],
      },
    }));
  };

  const handleSaveSettings = () => {
    onUpdateSettings?.(localSettings);
    setSaved(true);
    showToast?.("Settings saved successfully.");
    setTimeout(() => setSaved(false), 2000);
  };

  const handleExportData = () => {
    const fullData = {
      exportDate: new Date().toISOString(),
      profile,
      settings: localSettings,
      exportedFrom: "SkillVerse Platform",
    };
    const blob = new Blob([JSON.stringify(fullData, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `skillverse_export_${profile.name?.replace(/\s+/g, "_") || "user"}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast?.("Data exported as JSON file.");
  };

  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset all data back to demo defaults? This will overwrite your local changes.")) {
      onResetData?.();
      showToast?.("Platform data reset to sample defaults.");
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Settings Navigation Bento Tabs */}
      <div className="flex flex-wrap gap-2 pb-2">
        {[
          { id: "notifications", label: "Notifications", icon: Bell },
          { id: "privacy", label: "Privacy & Security", icon: Shield },
          { id: "account", label: "Account Profile", icon: User },
          { id: "data", label: "Data Management", icon: Database },
        ].map((t) => {
          const Icon = t.icon;
          const isActive = activeTab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all ${
                isActive
                  ? "bg-[#111827] text-white shadow-sm"
                  : "bg-white border border-[#E2EBF0] text-[#64748B] hover:text-[#111827] hover:bg-[#F4F8FA]"
              }`}
            >
              <Icon size={15} />
              <span>{t.label}</span>
            </button>
          );
        })}
      </div>

      {/* Notifications Tab */}
      {activeTab === "notifications" && (
        <Card className="p-6 sm:p-8 space-y-6 animate-[fadeIn_0.2s_ease]">
          <div>
            <SectionHeading title="Notification Preferences" />
            <p className="text-xs sm:text-sm text-[#64748B] -mt-2">
              Choose how you want to be notified about assessment results, course completions, and career goals.
            </p>
          </div>

          <div className="space-y-3.5">
            {[
              {
                key: "emailDigests",
                title: "Weekly Learning & Skill Digest",
                desc: "Receive a personalized weekly summary of your readiness score, gap analysis, and recommended lessons.",
              },
              {
                key: "assessmentReminders",
                title: "Assessment & Badge Reminders",
                desc: "Get notified when unverified skills become eligible for certification quizzes.",
              },
              {
                key: "projectMilestones",
                title: "Project Milestone & Recruiter Views",
                desc: "Receive alerts when recruiters view your portfolio or projects receive verification stamps.",
              },
              {
                key: "readinessAlerts",
                title: "Career Readiness Target Alerts",
                desc: "Instant notifications whenever completing a project or test raises your career readiness percentage.",
              },
            ].map((item) => (
              <div
                key={item.key}
                className="flex items-center justify-between p-4 sm:p-5 rounded-3xl bg-[#F4F8FA] border border-[#E2EBF0] hover:bg-white transition-colors"
              >
                <div className="pr-4">
                  <p className="text-sm font-bold text-[#111827] font-display">{item.title}</p>
                  <p className="text-xs text-[#64748B] mt-0.5">{item.desc}</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer shrink-0">
                  <input
                    type="checkbox"
                    checked={Boolean(localSettings.notifications?.[item.key])}
                    onChange={() => toggleNotif(item.key)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-[#CBD5E1] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#111827]"></div>
                </label>
              </div>
            ))}
          </div>

          <div className="pt-2">
            <PrimaryButton onClick={handleSaveSettings}>
              {saved ? <Check size={16} /> : null}
              {saved ? "Preferences Saved" : "Save Preferences"}
            </PrimaryButton>
          </div>
        </Card>
      )}

      {/* Privacy & Security Tab */}
      {activeTab === "privacy" && (
        <Card className="p-6 sm:p-8 space-y-6 animate-[fadeIn_0.2s_ease]">
          <div>
            <SectionHeading title="Privacy & Security Controls" />
            <p className="text-xs sm:text-sm text-[#64748B] -mt-2">
              Manage who can see your digital skill credentials, projects, and readiness metrics.
            </p>
          </div>

          <div className="space-y-3.5">
            {[
              {
                key: "publicPortfolio",
                title: "Public Student Portfolio URL",
                desc: "Make your verified skills, projects, and certificates publicly viewable via your unique link.",
              },
              {
                key: "recruiterSearch",
                title: "Allow Verified Recruiters to Discover Profile",
                desc: "Permit industry hiring partners and campus placement coordinators to contact you for matching roles.",
              },
              {
                key: "showReadinessScores",
                title: "Display Career Readiness Percentile",
                desc: "Show your benchmark readiness score on your public portfolio badge.",
              },
            ].map((item) => (
              <div
                key={item.key}
                className="flex items-center justify-between p-4 sm:p-5 rounded-3xl bg-[#F4F8FA] border border-[#E2EBF0] hover:bg-white transition-colors"
              >
                <div className="pr-4">
                  <p className="text-sm font-bold text-[#111827] font-display">{item.title}</p>
                  <p className="text-xs text-[#64748B] mt-0.5">{item.desc}</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer shrink-0">
                  <input
                    type="checkbox"
                    checked={Boolean(localSettings.privacy?.[item.key])}
                    onChange={() => togglePrivacy(item.key)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-[#CBD5E1] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#111827]"></div>
                </label>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-3xl bg-[#EDF9D4] border border-[#D5F29B] flex items-start gap-3">
            <Shield size={20} className="text-[#2E4D0C] shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-bold text-[#2E4D0C]">Two-Factor Authentication (2FA)</p>
              <p className="text-xs text-[#2E4D0C]/80 mt-0.5">
                Two-factor authentication is active on your university Single Sign-On (SSO) account.
              </p>
            </div>
          </div>

          <div className="pt-2">
            <PrimaryButton onClick={handleSaveSettings}>
              {saved ? <Check size={16} /> : null}
              {saved ? "Preferences Saved" : "Save Privacy Settings"}
            </PrimaryButton>
          </div>
        </Card>
      )}

      {/* Account Tab */}
      {activeTab === "account" && (
        <Card className="p-6 sm:p-8 space-y-6 animate-[fadeIn_0.2s_ease]">
          <div>
            <SectionHeading title="Account Information" />
            <p className="text-xs sm:text-sm text-[#64748B] -mt-2">
              Connected academic identifiers and system defaults.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <TextField label="Student Registration ID" value={profile.studentId || "CS2023-8942"} disabled className="opacity-80" />
            <TextField label="Registered Academic Email" value={profile.email || "rahul.sharma@example.edu"} disabled className="opacity-80" />
            <TextField label="University / Institute" value={profile.college || "ABC University"} disabled className="opacity-80" />
            <TextField label="Department & Major" value={`${profile.department || "Computer Science"}`} disabled className="opacity-80" />
          </div>

          <div className="p-4 rounded-3xl bg-[#F4F8FA] border border-[#E2EBF0] space-y-1.5">
            <p className="text-xs font-bold text-[#111827]">Single Sign-On (SSO) Status</p>
            <p className="text-xs text-[#64748B]">
              Your student account is authenticated via your institutional portal. Profile details like CGPA and enrolled courses sync with the campus registry.
            </p>
          </div>
        </Card>
      )}

      {/* Data Management Tab */}
      {activeTab === "data" && (
        <Card className="p-6 sm:p-8 space-y-6 animate-[fadeIn_0.2s_ease]">
          <div>
            <SectionHeading title="Data Backup & Storage Management" />
            <p className="text-xs sm:text-sm text-[#64748B] -mt-2">
              Export your portfolio data, manage local caching, or reset your workspace.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {/* Export Card */}
            <div className="p-5 rounded-3xl bg-[#F4F8FA] border border-[#E2EBF0] flex flex-col justify-between space-y-4">
              <div>
                <div className="w-10 h-10 rounded-2xl bg-white border border-[#E2EBF0] flex items-center justify-center text-[#111827] mb-3 shadow-xs">
                  <Download size={20} />
                </div>
                <h4 className="text-sm font-bold text-[#111827] font-display">Export Portfolio (JSON)</h4>
                <p className="text-xs text-[#64748B] mt-1">
                  Download a complete backup archive of your profile, verified badges, projects, certificates, and scores.
                </p>
              </div>
              <PrimaryButton onClick={handleExportData} className="!w-full !text-xs">
                <Download size={14} /> Download JSON Backup
              </PrimaryButton>
            </div>

            {/* Reset Card */}
            <div className="p-5 rounded-3xl bg-[#FDE5E5] border border-[#F8B6B6] flex flex-col justify-between space-y-4">
              <div>
                <div className="w-10 h-10 rounded-2xl bg-white border border-[#F8B6B6] flex items-center justify-center text-[#5C1B1B] mb-3 shadow-xs">
                  <RotateCcw size={20} />
                </div>
                <h4 className="text-sm font-bold text-[#5C1B1B] font-display">Reset to Sample Data</h4>
                <p className="text-xs text-[#5C1B1B]/80 mt-1">
                  Restore all skills, projects, certificates, and profile details back to the initial sample state.
                </p>
              </div>
              <SecondaryButton onClick={handleReset} className="!w-full !text-xs text-[#5C1B1B] hover:bg-white">
                <RotateCcw size={14} /> Reset Demo Data
              </SecondaryButton>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}

export default SettingsPage;
