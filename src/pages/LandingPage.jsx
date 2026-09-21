import React, { useState } from "react";
import {
  Code2,
  FolderKanban,
  FileBadge,
  TrendingUp,
  ArrowRight,
  ArrowUp,
  ShieldCheck,
  CheckCircle2,
  Lock,
  User,
  Mail,
  Eye,
  EyeOff,
  Sparkles,
  BadgeCheck,
  Trophy,
  KeyRound,
} from "lucide-react";
import { GoogleIcon, GithubIcon } from "../components/common/PlatformIcons";
import { SkillVerseLogo } from "../components/common/Logo";
import { GoogleAuthModal } from "../components/auth/GoogleAuthModal";
import { OtpVerificationModal } from "../components/auth/OtpVerificationModal";

export function LandingPage({ onLogin }) {
  // Auth Form State
  const [mode, setMode] = useState("login"); // "login" | "signup"
  const [authMethod, setAuthMethod] = useState("password"); // "password" | "otp"
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [college, setCollege] = useState("");
  const [degree, setDegree] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Modals
  const [googleModalOpen, setGoogleModalOpen] = useState(false);
  const [otpModalOpen, setOtpModalOpen] = useState(false);

  const scrollToAuth = (targetMode = "login") => {
    setMode(targetMode);
    setError("");
    const element = document.getElementById("auth-section");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSendOtp = (e) => {
    if (e) e.preventDefault();
    if (!usernameOrEmail.trim()) {
      setError("Please enter your Gmail or academic email to receive the code.");
      return;
    }
    const email = usernameOrEmail.includes("@") ? usernameOrEmail : `${usernameOrEmail}@gmail.com`;
    setError("");
    setOtpModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (authMethod === "otp") {
      handleSendOtp();
      return;
    }

    if (!usernameOrEmail.trim()) {
      setError("Please enter your username or email address.");
      return;
    }
    if (!password) {
      setError("Please enter your password.");
      return;
    }
    if (mode === "signup" && !fullName.trim()) {
      setError("Please enter your full name.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (onLogin) {
        onLogin({
          type: mode === "signup" ? "credentials_signup" : "credentials_login",
          username: usernameOrEmail.includes("@")
            ? usernameOrEmail.split("@")[0]
            : usernameOrEmail,
          email: usernameOrEmail.includes("@")
            ? usernameOrEmail
            : `${usernameOrEmail}@university.edu`,
          name:
            fullName ||
            (usernameOrEmail.includes("@")
              ? usernameOrEmail.split("@")[0]
              : usernameOrEmail) ||
            "Student Developer",
          college: college || "",
          degree: degree || "",
        });
      }
    }, 400);
  };

  const handleOAuthLogin = (provider) => {
    if (provider === "google") {
      setGoogleModalOpen(true);
      return;
    }

    // GitHub OAuth simulation
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (onLogin) {
        onLogin({
          type: "github",
          name: "GitHub Developer",
          email: "developer@github.com",
          username: "github_developer",
          githubUsername: "github_developer",
          provider: "GitHub",
          college: "",
          degree: "",
        });
      }
    }, 350);
  };

  const handleSelectGoogleAccount = (googleUser) => {
    if (onLogin) {
      onLogin({
        type: "google",
        name: googleUser.name,
        email: googleUser.email,
        username: googleUser.username,
        provider: "Google Identity Services",
        college: "",
        degree: "",
      });
    }
  };

  const handleVerifyOtpUser = (otpUser) => {
    if (onLogin) {
      onLogin({
        type: mode === "signup" ? "credentials_signup" : "email_otp",
        name: fullName || otpUser.name || "Student Developer",
        email: otpUser.email,
        username: otpUser.username,
        college: college || "",
        degree: degree || "",
        provider: "Gmail Security Verification",
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0D14] text-[#F1F5F9] font-[Inter,sans-serif] selection:bg-[#00C0F3] selection:text-[#0A0D14] antialiased scroll-smooth">
      {/* Subtle Top Ambient Border Light */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00C0F3]/40 to-transparent" />

      {/* Modern Minimal Navigation Bar */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-[#0A0D14]/90 border-b border-[#1A202C] px-4 sm:px-8 py-3.5">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <SkillVerseLogo size={46} />
          </div>

          <nav className="hidden md:flex items-center gap-8 text-xs font-medium text-[#94A3B8]">
            <button
              onClick={scrollToTop}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Overview
            </button>
            <a href="#features" className="hover:text-white transition-colors">
              Features
            </a>
            <a href="#workflow" className="hover:text-white transition-colors">
              How It Works
            </a>
            <button
              onClick={() => scrollToAuth("login")}
              className="text-[#00C0F3] hover:text-[#38BDF8] font-semibold transition-colors cursor-pointer"
            >
              Sign In
            </button>
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => scrollToAuth("login")}
              className="px-3.5 py-1.5 rounded-xl text-xs font-medium text-[#94A3B8] hover:text-white hover:bg-[#131824] transition-all cursor-pointer"
            >
              Sign In
            </button>

            <button
              onClick={() => scrollToAuth("signup")}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs font-semibold bg-[#00C0F3] hover:bg-[#38BDF8] text-[#0A0D14] shadow-sm transition-all active:scale-[0.98] cursor-pointer"
            >
              <span>Create Account</span>
              <ArrowRight size={13} />
            </button>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section id="overview" className="max-w-5xl mx-auto px-4 sm:px-6 pt-24 sm:pt-32 pb-20 text-center">
        {/* Crisp Top Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#131824] border border-[#1F293D] text-[#94A3B8] text-xs font-medium mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00C0F3]" />
          <span>The Verified Student Developer Identity</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-6xl font-black font-display tracking-tight text-white max-w-4xl mx-auto leading-[1.12]">
          One link for your code, ratings, and projects.
        </h1>

        {/* Hero Subtitle */}
        <p className="text-sm sm:text-base text-[#94A3B8] max-w-2xl mx-auto mt-5 leading-relaxed">
          Connect your LeetCode, GitHub, Codeforces, HackerRank, GeeksforGeeks, and CodeChef handles. Build a clean, verified portfolio recruiters actually trust.
        </p>

        {/* Hero CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mt-9">
          <button
            type="button"
            onClick={() => scrollToAuth("signup")}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl text-sm font-semibold bg-[#00C0F3] hover:bg-[#38BDF8] text-[#0A0D14] shadow-[0_8px_20px_rgba(0,192,243,0.25)] hover:shadow-[0_12px_28px_rgba(0,192,243,0.35)] transition-all active:scale-[0.98] cursor-pointer"
          >
            <span>Create Free Account</span>
            <ArrowRight size={16} />
          </button>

          <button
            type="button"
            onClick={() => setGoogleModalOpen(true)}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl text-sm font-semibold bg-[#131824] hover:bg-[#182030] text-[#F1F5F9] border border-[#1F293D] hover:border-[#4285F4]/60 transition-all cursor-pointer shadow-sm active:scale-[0.98]"
          >
            <GoogleIcon size={18} />
            <span>Continue with Google</span>
          </button>

          <button
            type="button"
            onClick={() => scrollToAuth("login")}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl text-sm font-medium bg-[#131824]/60 hover:bg-[#182030] text-[#94A3B8] hover:text-white border border-[#1F293D] transition-all cursor-pointer"
          >
            <span>Sign In</span>
          </button>
        </div>

        <p className="text-[11px] text-[#64748B] mt-4">
          Free for students & universities · Instant Google Sign-In or Gmail Verification
        </p>

        {/* Platform Quick Badges */}
        <div className="mt-14 pt-10 border-t border-[#1A202C] flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 text-xs font-semibold text-[#94A3B8]">
          <span className="text-[#64748B] text-[11px] uppercase tracking-wider font-bold mr-1">Integrates with:</span>
          {["LeetCode", "GitHub", "Codeforces", "HackerRank", "GeeksforGeeks", "CodeChef"].map((platform) => (
            <span
              key={platform}
              className="px-3 py-1.5 rounded-xl bg-[#131824] border border-[#1F293D] text-[#CBD5E1] text-xs"
            >
              {platform}
            </span>
          ))}
        </div>
      </section>

      {/* CORE FEATURES BENTO SECTION */}
      <section id="features" className="max-w-6xl mx-auto px-4 sm:px-6 py-20 border-t border-[#1A202C]">
        <div className="text-center mb-12">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#00C0F3]">
            Platform Capabilities
          </p>
          <h2 className="text-2xl sm:text-3xl font-black font-display text-white mt-1.5">
            Designed for authentic student growth
          </h2>
          <p className="text-xs sm:text-sm text-[#94A3B8] max-w-md mx-auto mt-2">
            Built to present tangible, recruiter-trusted proof of your engineering skills.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Card 1: Coding Profiles Hub */}
          <div className="md:col-span-2 p-6 sm:p-8 rounded-3xl bg-[#131824] border border-[#1F293D] flex flex-col justify-between">
            <div>
              <div className="w-11 h-11 rounded-2xl bg-[#00C0F3]/10 border border-[#00C0F3]/20 flex items-center justify-center text-[#00C0F3] mb-4">
                <Code2 size={22} />
              </div>
              <h3 className="text-lg font-bold text-white font-display">
                Unified Developer Profiles
              </h3>
              <p className="text-xs sm:text-sm text-[#94A3B8] mt-2 leading-relaxed">
                Connect your LeetCode, GitHub, Codeforces, HackerRank, GeeksforGeeks, and CodeChef handles in seconds. All key stats—solved problems, ratings, commit counts, and contest ranks—are displayed directly on your profile.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#1F293D] flex items-center gap-3 text-xs text-[#00C0F3] font-semibold">
              <span>LeetCode · GitHub · Codeforces · HackerRank · GFG · CodeChef</span>
            </div>
          </div>

          {/* Card 2: Project Proofs */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#131824] border border-[#1F293D] flex flex-col justify-between">
            <div>
              <div className="w-11 h-11 rounded-2xl bg-[#10B981]/10 border border-[#10B981]/20 flex items-center justify-center text-[#10B981] mb-4">
                <FolderKanban size={22} />
              </div>
              <h3 className="text-lg font-bold text-white font-display">
                Project Showcase
              </h3>
              <p className="text-xs sm:text-sm text-[#94A3B8] mt-2 leading-relaxed">
                Add projects with repository URLs, live demo previews, technology tags, and architecture summaries.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#1F293D] text-xs text-[#10B981] font-semibold">
              Live Demo & Repo Links
            </div>
          </div>

          {/* Card 3: Skill Gap Analysis */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#131824] border border-[#1F293D] flex flex-col justify-between">
            <div>
              <div className="w-11 h-11 rounded-2xl bg-[#A3E635]/10 border border-[#A3E635]/20 flex items-center justify-center text-[#A3E635] mb-4">
                <TrendingUp size={22} />
              </div>
              <h3 className="text-lg font-bold text-white font-display">
                Target Role Skill Gap Engine
              </h3>
              <p className="text-xs sm:text-sm text-[#94A3B8] mt-2 leading-relaxed">
                Choose a target career (Software Developer, AI/ML, Full Stack, Data Science) and benchmark your skills against industry standards.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#1F293D] text-xs text-[#A3E635] font-semibold">
              Benchmark Readiness Trajectory
            </div>
          </div>

          {/* Card 4: Certificates */}
          <div className="md:col-span-2 p-6 sm:p-8 rounded-3xl bg-[#131824] border border-[#1F293D] flex flex-col justify-between">
            <div>
              <div className="w-11 h-11 rounded-2xl bg-[#38BDF8]/10 border border-[#38BDF8]/20 flex items-center justify-center text-[#38BDF8] mb-4">
                <FileBadge size={22} />
              </div>
              <h3 className="text-lg font-bold text-white font-display">
                Verified Credentials & Coursework
              </h3>
              <p className="text-xs sm:text-sm text-[#94A3B8] mt-2 leading-relaxed">
                Organize university honors, coursework, and course certificates with verification URLs and credential IDs. Link certificates directly as evidence for verified skills.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#1F293D] text-xs text-[#38BDF8] font-semibold">
              Official Credential Ledger
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS WORKFLOW */}
      <section id="workflow" className="max-w-6xl mx-auto px-4 sm:px-6 py-20 border-t border-[#1A202C]">
        <div className="text-center mb-12">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#94A3B8]">
            Simple Workflow
          </p>
          <h2 className="text-2xl sm:text-3xl font-black font-display text-white mt-1.5">
            How SkillVerse Works
          </h2>
        </div>

        <div className="grid sm:grid-cols-3 gap-6">
          {[
            {
              step: "01",
              title: "Create Account",
              desc: "Sign up with your academic or personal email to create your student developer identity.",
            },
            {
              step: "02",
              title: "Link Profiles & Projects",
              desc: "Add your LeetCode, GitHub, Codeforces, HackerRank, GFG, and CodeChef handles and showcase projects.",
            },
            {
              step: "03",
              title: "Share With Recruiters",
              desc: "Share your unified portfolio link with internship recruiters, campus placement cells, and peers.",
            },
          ].map((s) => (
            <div
              key={s.step}
              className="p-6 rounded-2xl bg-[#131824] border border-[#1F293D]"
            >
              <span className="text-2xl font-black text-[#00C0F3] font-display block mb-2">
                {s.step}
              </span>
              <h4 className="text-sm font-bold text-white font-display">{s.title}</h4>
              <p className="text-xs text-[#94A3B8] mt-2 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CONTINUOUS SMOOTH SLIDE-IN LOGIN & REGISTER SECTION */}
      <section
        id="auth-section"
        className="relative min-h-screen py-24 sm:py-28 px-4 sm:px-6 border-t border-[#1A202C] bg-gradient-to-b from-[#0A0D14] via-[#0E1320] to-[#0A0D14] flex flex-col justify-center items-center"
      >
        {/* Ambient Glows */}
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-[#00C0F3]/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#10B981]/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto w-full">
          {/* Back to Top / Slide Up Prompt */}
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#1F293D]/60">
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#131824] hover:bg-[#182030] text-[#94A3B8] hover:text-white border border-[#1F293D] hover:border-[#00C0F3]/40 text-xs font-semibold transition-all group cursor-pointer"
            >
              <ArrowUp size={14} className="group-hover:-translate-y-0.5 transition-transform text-[#00C0F3]" />
              <span>Slide Up to Overview</span>
            </button>

            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/30">
              <ShieldCheck size={14} /> Verified Student Identity
            </span>
          </div>

          {/* Split Bento Auth Row */}
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Highlights */}
            <div className="hidden lg:flex lg:col-span-5 flex-col justify-between space-y-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#00C0F3]/10 border border-[#00C0F3]/30 text-[#00C0F3] text-xs font-bold mb-4 shadow-sm">
                  <Sparkles size={14} /> The Future of Student Portfolios
                </div>

                <h2 className="text-3xl font-black text-white font-display tracking-tight leading-tight">
                  Empower your skills with{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00C0F3] via-[#38BDF8] to-[#A3E635]">
                    verifiable proof
                  </span>
                  .
                </h2>

                <p className="text-xs sm:text-sm text-[#94A3B8] mt-3.5 leading-relaxed">
                  SkillVerse transforms self-reported claims into immutable evidence validated by live GitHub repositories, competitive ratings, and accredited coursework.
                </p>
              </div>

              {/* Bento Feature Points */}
              <div className="space-y-3">
                {[
                  {
                    icon: BadgeCheck,
                    color: "text-[#10B981]",
                    bg: "bg-[#10B981]/10",
                    border: "border-[#10B981]/30",
                    title: "Ledger-Verified Badges",
                    desc: "Recruiter-trusted proof connected to real-world code & tests",
                  },
                  {
                    icon: Trophy,
                    color: "text-[#FFA116]",
                    bg: "bg-[#FFA116]/10",
                    border: "border-[#FFA116]/30",
                    title: "Competitive Coding Integration",
                    desc: "Live sync with LeetCode, GitHub, Codeforces & CodeChef",
                  },
                  {
                    icon: FolderKanban,
                    color: "text-[#00C0F3]",
                    bg: "bg-[#00C0F3]/10",
                    border: "border-[#00C0F3]/30",
                    title: "Interactive Project Showcase",
                    desc: "Rich live demo previews, repository links, and tech stacks",
                  },
                ].map((feat) => {
                  const Icon = feat.icon;
                  return (
                    <div
                      key={feat.title}
                      className="p-3.5 rounded-2xl bg-[#131824]/80 border border-[#1F293D] flex items-start gap-3.5 hover:border-[#232F47] transition-all"
                    >
                      <div className={`w-9 h-9 rounded-xl ${feat.bg} ${feat.border} border flex items-center justify-center ${feat.color} shrink-0`}>
                        <Icon size={18} />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-[#F1F5F9]">{feat.title}</h4>
                        <p className="text-[11px] text-[#94A3B8] mt-0.5">{feat.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="pt-2 flex items-center gap-2 text-xs text-[#64748B]">
                <CheckCircle2 size={15} className="text-[#10B981]" />
                <span>Adopted across top university engineering departments</span>
              </div>
            </div>

            {/* Right Column: Full Interactive Auth Card */}
            <div className="lg:col-span-7">
              <div className="rounded-3xl border border-[#1F293D] bg-[#131824]/90 backdrop-blur-xl p-6 sm:p-9 shadow-[0_24px_48px_rgba(0,0,0,0.5)] relative overflow-hidden">
                {/* Top Accent Line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#00C0F3] via-[#A3E635] to-[#10B981]" />

                {/* Title & Mode Switcher */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
                  <div>
                    <h3 className="text-2xl font-black text-white font-display">
                      {mode === "login" ? "Sign in to SkillVerse" : "Create Student Account"}
                    </h3>
                    <p className="text-xs text-[#94A3B8] mt-1">
                      {mode === "login"
                        ? "Access your verified portfolio, readiness scores, and proofs."
                        : "Start building your verified student identity and credentials."}
                    </p>
                  </div>

                  {/* Mode Pill Toggle */}
                  <div className="p-1 rounded-2xl bg-[#0A0D14] border border-[#1F293D] flex items-center shrink-0 self-start sm:self-auto">
                    <button
                      type="button"
                      onClick={() => {
                        setMode("login");
                        setError("");
                      }}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        mode === "login"
                          ? "bg-[#00C0F3] text-[#0A0D14] shadow-sm"
                          : "text-[#94A3B8] hover:text-white"
                      }`}
                    >
                      Sign In
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setMode("signup");
                        setError("");
                      }}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        mode === "signup"
                          ? "bg-[#00C0F3] text-[#0A0D14] shadow-sm"
                          : "text-[#94A3B8] hover:text-white"
                      }`}
                    >
                      Register
                    </button>
                  </div>
                </div>

                {/* Social Login Buttons */}
                <div className="grid grid-cols-2 gap-3 mb-5">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setGoogleModalOpen(true);
                    }}
                    disabled={loading}
                    className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-[#0A0D14] hover:bg-[#182030] border border-[#1F293D] hover:border-[#4285F4]/60 text-xs font-medium text-white transition-all cursor-pointer group active:scale-98 shadow-sm"
                  >
                    <GoogleIcon size={16} />
                    <span>Continue with Google</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleOAuthLogin("github")}
                    disabled={loading}
                    className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-[#0A0D14] hover:bg-[#182030] border border-[#1F293D] hover:border-[#2A3754] text-xs font-medium text-white transition-all cursor-pointer"
                  >
                    <GithubIcon size={16} />
                    <span>Continue with GitHub</span>
                  </button>
                </div>

                {/* Auth Method Switcher (Password vs Email OTP) */}
                <div className="flex items-center justify-between p-1.5 rounded-2xl bg-[#0A0D14] border border-[#1F293D] mb-5">
                  <button
                    type="button"
                    onClick={() => {
                      setAuthMethod("password");
                      setError("");
                    }}
                    className={`flex-1 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                      authMethod === "password"
                        ? "bg-[#182030] text-[#00C0F3] font-bold border border-[#232F47]"
                        : "text-[#94A3B8] hover:text-white"
                    }`}
                  >
                    <Lock size={13} />
                    <span>Password Sign In</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setAuthMethod("otp");
                      setError("");
                    }}
                    className={`flex-1 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                      authMethod === "otp"
                        ? "bg-[#182030] text-[#00C0F3] font-bold border border-[#232F47]"
                        : "text-[#94A3B8] hover:text-white"
                    }`}
                  >
                    <KeyRound size={13} />
                    <span>Gmail 6-Digit OTP</span>
                  </button>
                </div>

                {/* Error Alert */}
                {error && (
                  <div className="p-3 mb-4 rounded-xl bg-[#EF4444]/10 border border-[#EF4444]/30 text-[#FCA5A5] text-xs">
                    {error}
                  </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  {mode === "signup" && (
                    <div>
                      <label className="block text-xs font-medium text-[#94A3B8] mb-1.5">
                        Full Name <span className="text-[#00C0F3]">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#64748B]">
                          <User size={15} />
                        </div>
                        <input
                          type="text"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="Alex Rivera"
                          className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-[#0A0D14] border border-[#1F293D] focus:border-[#00C0F3] text-xs text-white placeholder-[#64748B] focus:outline-none transition-colors"
                        />
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-medium text-[#94A3B8] mb-1.5">
                      {authMethod === "otp" ? "Gmail or Academic Email" : "Username or Email"}{" "}
                      <span className="text-[#00C0F3]">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#64748B]">
                        <Mail size={15} />
                      </div>
                      <input
                        type="text"
                        value={usernameOrEmail}
                        onChange={(e) => setUsernameOrEmail(e.target.value)}
                        placeholder={authMethod === "otp" ? "yourname@gmail.com" : "username or student@university.edu"}
                        className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-[#0A0D14] border border-[#1F293D] focus:border-[#00C0F3] text-xs text-white placeholder-[#64748B] focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  {authMethod === "password" ? (
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="block text-xs font-medium text-[#94A3B8]">
                          Password <span className="text-[#00C0F3]">*</span>
                        </label>
                        {mode === "login" && (
                          <span className="text-[11px] text-[#00C0F3] hover:underline cursor-pointer">
                            Forgot password?
                          </span>
                        )}
                      </div>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#64748B]">
                          <Lock size={15} />
                        </div>
                        <input
                          type={showPassword ? "text" : "password"}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="••••••••••••"
                          className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-[#0A0D14] border border-[#1F293D] focus:border-[#00C0F3] text-xs text-white placeholder-[#64748B] focus:outline-none transition-colors"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#64748B] hover:text-white transition-colors cursor-pointer"
                        >
                          {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="p-3.5 rounded-2xl bg-[#0A0D14] border border-[#1F293D] text-xs text-[#94A3B8] flex items-center gap-2">
                      <KeyRound size={16} className="text-[#00C0F3] shrink-0" />
                      <span>A 6-digit one-time verification code will be sent to your Gmail inbox.</span>
                    </div>
                  )}

                  {mode === "signup" && (
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-medium text-[#94A3B8] mb-1">
                          University / College
                        </label>
                        <input
                          type="text"
                          value={college}
                          onChange={(e) => setCollege(e.target.value)}
                          placeholder="ABC University"
                          className="w-full px-3 py-2 rounded-xl bg-[#0A0D14] border border-[#1F293D] focus:border-[#00C0F3] text-xs text-white placeholder-[#64748B] focus:outline-none transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-medium text-[#94A3B8] mb-1">
                          Degree / Major
                        </label>
                        <input
                          type="text"
                          value={degree}
                          onChange={(e) => setDegree(e.target.value)}
                          placeholder="B.Tech CS"
                          className="w-full px-3 py-2 rounded-xl bg-[#0A0D14] border border-[#1F293D] focus:border-[#00C0F3] text-xs text-white placeholder-[#64748B] focus:outline-none transition-colors"
                        />
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between text-xs pt-1">
                    <label className="flex items-center gap-2 cursor-pointer text-[#94A3B8] hover:text-white">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="w-3.5 h-3.5 rounded bg-[#0A0D14] border-[#1F293D] text-[#00C0F3] focus:ring-0 focus:ring-offset-0"
                      />
                      <span>Remember this device</span>
                    </label>

                    <span className="text-[11px] text-[#64748B]">256-bit encrypted</span>
                  </div>

                  {/* Submit Action */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full inline-flex items-center justify-center gap-2 py-3 mt-2 rounded-xl text-xs font-semibold bg-[#00C0F3] hover:bg-[#38BDF8] text-[#0A0D14] shadow-[0_8px_20px_rgba(0,192,243,0.25)] transition-all active:scale-[0.98] cursor-pointer disabled:opacity-50"
                  >
                    {loading ? (
                      <span className="inline-block w-4 h-4 border-2 border-[#0A0D14] border-t-transparent rounded-full animate-spin" />
                    ) : authMethod === "otp" ? (
                      <>
                        <span>Send 6-Digit Code to Gmail</span>
                        <ArrowRight size={14} />
                      </>
                    ) : (
                      <>
                        <span>
                          {mode === "login"
                            ? "Sign In to SkillVerse"
                            : "Create Free Student Account"}
                        </span>
                        <ArrowRight size={14} />
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MINIMAL FOOTER */}
      <footer className="border-t border-[#1A202C] py-8 text-center text-xs text-[#64748B]">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center">
            <SkillVerseLogo size={38} />
          </div>
          <p>© 2026 SkillVerse · Verified Student Identity & Growth Platform</p>
          <div className="flex gap-4 text-[#94A3B8]">
            <button
              onClick={() => scrollToAuth("login")}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Sign In
            </button>
            <button
              onClick={() => scrollToAuth("signup")}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Register
            </button>
          </div>
        </div>
      </footer>

      {/* Google Sign-In Account Chooser Modal */}
      <GoogleAuthModal
        isOpen={googleModalOpen}
        onClose={() => setGoogleModalOpen(false)}
        onSelectAccount={handleSelectGoogleAccount}
      />

      {/* 6-Digit Gmail OTP Verification Modal */}
      <OtpVerificationModal
        isOpen={otpModalOpen}
        onClose={() => setOtpModalOpen(false)}
        email={usernameOrEmail.includes("@") ? usernameOrEmail : `${usernameOrEmail}@gmail.com`}
        onVerify={handleVerifyOtpUser}
      />
    </div>
  );
}

export default LandingPage;
