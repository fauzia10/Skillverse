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
import { LoginPage } from "./pages/LoginPage";
import { LandingPage } from "./pages/LandingPage";

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
  const [publicView, setPublicView] = useState("landing"); // "landing" | "login"
  const [authMode, setAuthMode] = useState("login"); // "login" | "signup"

  // Authentication State
  const [authUser, setAuthUser] = useState(() =>
    loadState("skillverse_auth_user", {
      isAuthenticated: false,
      username: "",
      name: "",
      email: "",
    })
  );

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
    saveState("skillverse_auth_user", authUser);
  }, [authUser]);

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

  const handleLogin = (userData) => {
    const isGoogle = userData.type === "google";
    const isOtp = userData.type === "email_otp";
    const isSignup = userData.type === "credentials_signup" || isGoogle || isOtp;

    const user = {
      isAuthenticated: true,
      username: userData.username || (userData.email ? userData.email.split("@")[0] : "student"),
      name: userData.name || "Student Developer",
      email: userData.email || "student@university.edu",
      provider: userData.provider || (isGoogle ? "Google Identity Services" : "SkillVerse Credentials"),
    };
    setAuthUser(user);

    if (isGoogle) {
      const initial = (userData.name || "G").charAt(0).toUpperCase();
      const googleAvatar =
        "data:image/svg+xml;utf8," +
        encodeURIComponent(`
        <svg xmlns='http://www.w3.org/2000/svg' width='96' height='96'>
          <rect width='96' height='96' rx='48' fill='#4285F4'/>
          <text x='50%' y='56%' dominant-baseline='middle' text-anchor='middle' fill='#FFFFFF' font-size='42' font-family='Inter, sans-serif' font-weight='700'>${initial}</text>
        </svg>`);
      setAvatar(googleAvatar);
    } else {
      setAvatar(DEFAULT_AVATAR);
    }

    if (isSignup) {
      // 100% clean slate for newly registered student
      setSkills([]);
      setProjects([]);
      setCertificates([]);
      setProfile({
        ...INITIAL_PROFILE,
        name: userData.name || "Student Developer",
        email: userData.email || (isGoogle ? "student@gmail.com" : "student@university.edu"),
        college: userData.college || "",
        degree: userData.degree || "",
      });
      showToast(`Welcome to SkillVerse, ${userData.name || "Student"}! Fresh student portfolio ready. 🚀`);
    } else {
      if (userData.name) {
        setProfile((prev) => ({
          ...prev,
          name: userData.name || prev.name || "Student Developer",
          email: userData.email || prev.email || "student@university.edu",
          college: userData.college || prev.college || "",
          degree: userData.degree || prev.degree || "",
          githubUsername: userData.githubUsername || prev.githubUsername,
        }));
      }
      showToast(`Welcome back, ${userData.name || "Student"}! Signed in successfully. 🎉`);
    }
  };

  const handleLogout = () => {
    setAuthUser({ isAuthenticated: false });
    setPublicView("landing");
    showToast("Signed out. You can sign back in anytime.");
  };

  const handleOpenAuth = (mode = "login") => {
    setAuthMode(mode);
    setPublicView("login");
  };

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
    showToast("All data reset to initial state.");
  };

  useEffect(() => {
    document.title = "SkillVerse · Verified Student Identity & Growth Platform";
  }, []);

  // If user is not authenticated, show Landing Page or Login Page
  if (!authUser?.isAuthenticated) {
    return (
      <div
        className="min-h-screen bg-[#0A0D14] text-[#F1F5F9] font-[Inter,sans-serif]"
        style={{ fontFamily: "Inter, system-ui, sans-serif" }}
      >
        <LandingPage onLogin={handleLogin} />
        <Toast show={toast.show} message={toast.message} />
      </div>
    );
  }

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
          setProfile={setProfile}
          showToast={showToast}
          onAddSkill={handleAddSkill}
          onAddProject={handleAddProject}
          onNavigate={setActivePage}
          avatar={avatar}
        />
      );
  }

  return (
    <div
      className="min-h-screen bg-[#0A0D14] text-[#F1F5F9] font-[Inter,sans-serif]"
      style={{ fontFamily: "Inter, system-ui, sans-serif" }}
    >
      <Sidebar
        activePage={activePage}
        onNavigate={setActivePage}
        onLogout={handleLogout}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        profile={profile}
        avatar={avatar}
      />

      <div className="min-w-0 md:pl-[72px] pb-20 md:pb-8 transition-all duration-300">
        <Header
          onNavigate={setActivePage}
          onLogout={handleLogout}
          profile={profile}
          avatar={avatar}
          title={activePage === "dashboard" ? null : PAGE_TITLES[activePage]}
        />
        <main className="p-4 sm:px-8 sm:pb-8 pt-2 sm:pt-4">{page}</main>
      </div>

      <Toast show={toast.show} message={toast.message} />
    </div>
  );
}
