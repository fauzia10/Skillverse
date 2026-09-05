import React, { useState, useEffect, useCallback } from "react";
import { Sidebar } from "./components/layout/Sidebar";
import { Header } from "./components/layout/Header";
import { Toast } from "./components/common/Toast";

import { DashboardPage } from "./pages/DashboardPage";
import { ProfilePage } from "./pages/ProfilePage";
import { SkillsPage } from "./pages/SkillsPage";
import { AssessmentsPage } from "./pages/AssessmentsPage";
import { CareerGoalPage } from "./pages/CareerGoalPage";
import { GapAnalysisPage } from "./pages/GapAnalysisPage";
import { ProjectsPage } from "./pages/ProjectsPage";
import { CertificatesPage } from "./pages/CertificatesPage";
import { ProgressPage } from "./pages/ProgressPage";
import { SettingsPage } from "./pages/SettingsPage";

import { PAGE_TITLES } from "./constants/navigation";
import {
  INITIAL_SKILLS,
  INITIAL_PROJECTS,
  INITIAL_CERTIFICATES,
  INITIAL_PROFILE,
  DEFAULT_SETTINGS,
  DEFAULT_AVATAR,
} from "./data/mockData";
import {
  loadState,
  saveState,
  clearAllState,
  STORAGE_KEYS,
} from "./utils/storage";

export default function App() {
  const [activePage, setActivePage] = useState("dashboard");
  const [mobileOpen, setMobileOpen] = useState(false);

  // Persistent States with localStorage
  const [avatar, setAvatar] = useState(() =>
    loadState(STORAGE_KEYS.AVATAR, DEFAULT_AVATAR)
  );
  const [profile, setProfile] = useState(() =>
    loadState(STORAGE_KEYS.PROFILE, INITIAL_PROFILE)
  );
  const [skills, setSkills] = useState(() =>
    loadState(STORAGE_KEYS.SKILLS, INITIAL_SKILLS)
  );
  const [projects, setProjects] = useState(() =>
    loadState(STORAGE_KEYS.PROJECTS, INITIAL_PROJECTS)
  );
  const [certificates, setCertificates] = useState(() =>
    loadState(STORAGE_KEYS.CERTIFICATES, INITIAL_CERTIFICATES)
  );
  const [settings, setSettings] = useState(() =>
    loadState(STORAGE_KEYS.SETTINGS, DEFAULT_SETTINGS)
  );

  const [toast, setToast] = useState({ show: false, message: "" });

  // Sync to LocalStorage
  useEffect(() => {
    saveState(STORAGE_KEYS.AVATAR, avatar);
  }, [avatar]);

  useEffect(() => {
    saveState(STORAGE_KEYS.PROFILE, profile);
  }, [profile]);

  useEffect(() => {
    saveState(STORAGE_KEYS.SKILLS, skills);
  }, [skills]);

  useEffect(() => {
    saveState(STORAGE_KEYS.PROJECTS, projects);
  }, [projects]);

  useEffect(() => {
    saveState(STORAGE_KEYS.CERTIFICATES, certificates);
  }, [certificates]);

  useEffect(() => {
    saveState(STORAGE_KEYS.SETTINGS, settings);
  }, [settings]);

  const showToast = useCallback((message) => {
    setToast({ show: true, message });
    setTimeout(() => setToast({ show: false, message: "" }), 2800);
  }, []);

  const handleAddSkill = (skill) => {
    setSkills((prev) => [skill, ...prev]);
    showToast(`Skill "${skill.name}" added successfully.`);
  };

  const handleDeleteSkill = (skillId) => {
    setSkills((prev) => prev.filter((s) => s.id !== skillId));
    showToast("Skill removed.");
  };

  const handleVerifySkill = (skillId) => {
    setSkills((prev) =>
      prev.map((s) => (s.id === skillId ? { ...s, verified: true } : s))
    );
    showToast("Proficiency assessment passed! Verified badge awarded. 🎉");
  };

  const handleAddProject = (project) => {
    setProjects((prev) => [project, ...prev]);
    showToast(`Project "${project.title}" published to showcase.`);
  };

  const handleAddCertificate = (cert) => {
    setCertificates((prev) => [cert, ...prev]);
    showToast("Certificate added to verified ledger.");
  };

  const handleDeleteCertificate = (certId) => {
    setCertificates((prev) => prev.filter((c) => c.id !== certId));
    showToast("Certificate deleted.");
  };

  const handleUpdateSettings = (newSettings) => {
    setSettings(newSettings);
    showToast("Settings updated.");
  };

  const handleResetData = () => {
    clearAllState();
    setAvatar(DEFAULT_AVATAR);
    setProfile(INITIAL_PROFILE);
    setSkills(INITIAL_SKILLS);
    setProjects(INITIAL_PROJECTS);
    setCertificates(INITIAL_CERTIFICATES);
    setSettings(DEFAULT_SETTINGS);
    showToast("All data reset to initial demo state.");
  };

  useEffect(() => {
    document.title = "SkillVerse · Verified Student Identity & Growth Platform";
  }, []);

  let page;
  switch (activePage) {
    case "profile":
      page = (
        <ProfilePage
          profile={profile}
          setProfile={setProfile}
          avatar={avatar}
          setAvatar={setAvatar}
          showToast={showToast}
        />
      );
      break;
    case "skills":
      page = (
        <SkillsPage
          skills={skills}
          projects={projects}
          certificates={certificates}
          onAddSkill={handleAddSkill}
          onDeleteSkill={handleDeleteSkill}
          onVerifySkill={handleVerifySkill}
          onNavigate={setActivePage}
        />
      );
      break;
    case "assessments":
      page = (
        <AssessmentsPage
          skills={skills}
          projects={projects}
          certificates={certificates}
          onVerifySkill={handleVerifySkill}
          onNavigate={setActivePage}
        />
      );
      break;
    case "goal":
      page = (
        <CareerGoalPage
          profile={profile}
          setProfile={setProfile}
          showToast={showToast}
        />
      );
      break;
    case "gap":
      page = <GapAnalysisPage careerGoal={profile.careerGoal} />;
      break;
    case "projects":
      page = (
        <ProjectsPage
          projects={projects}
          onAddProject={handleAddProject}
        />
      );
      break;
    case "certificates":
      page = (
        <CertificatesPage
          certificates={certificates}
          onAddCertificate={handleAddCertificate}
          onDeleteCertificate={handleDeleteCertificate}
          studentName={profile.name}
          projectsCount={projects.length}
          skillsCount={skills.length}
        />
      );
      break;
    case "progress":
      page = <ProgressPage />;
      break;
    case "settings":
      page = (
        <SettingsPage
          settings={settings}
          onUpdateSettings={handleUpdateSettings}
          profile={profile}
          onResetData={handleResetData}
          showToast={showToast}
        />
      );
      break;
    default:
      page = (
        <DashboardPage
          skills={skills}
          projects={projects}
          certificates={certificates}
          profile={profile}
          onAddSkill={handleAddSkill}
          onAddProject={handleAddProject}
          onNavigate={setActivePage}
          avatar={avatar}
        />
      );
  }

  return (
    <div
      className="min-h-screen bg-[#EBF2F6] text-[#111827] font-[Inter,sans-serif] flex"
      style={{ fontFamily: "Inter, system-ui, sans-serif" }}
    >
      <Sidebar
        activePage={activePage}
        onNavigate={setActivePage}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      <div className="flex-1 min-w-0 pb-20 md:pb-0">
        <Header
          onNavigate={setActivePage}
          title={activePage === "dashboard" ? null : PAGE_TITLES[activePage]}
        />
        <main className="p-4 sm:px-8 sm:pb-8 pt-2 sm:pt-4">{page}</main>
      </div>

      <Toast show={toast.show} message={toast.message} />
    </div>
  );
}
