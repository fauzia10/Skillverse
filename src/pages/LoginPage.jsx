import React, { useState } from "react";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Zap,
  BadgeCheck,
  CheckCircle2,
  FolderKanban,
  Trophy,
  KeyRound,
} from "lucide-react";
import { GoogleIcon, GithubIcon } from "../components/common/PlatformIcons";
import { SkillVerseLogo } from "../components/common/Logo";
import { GoogleAuthModal } from "../components/auth/GoogleAuthModal";
import { OtpVerificationModal } from "../components/auth/OtpVerificationModal";

export function LoginPage({ onLogin, onBackToLanding, initialMode = "login" }) {
  const [mode, setMode] = useState(initialMode); // "login" | "signup"
  const [authMethod, setAuthMethod] = useState("password"); // "password" | "otp"
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Form State
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

  const handleSendOtp = (e) => {
    if (e) e.preventDefault();
    if (!usernameOrEmail.trim()) {
      setError("Please enter your Gmail or academic email to receive the code.");
      return;
    }
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
      onLogin({
        type: mode === "signup" ? "credentials_signup" : "credentials_login",
        username: usernameOrEmail.includes("@") ? usernameOrEmail.split("@")[0] : usernameOrEmail,
        email: usernameOrEmail.includes("@") ? usernameOrEmail : `${usernameOrEmail}@university.edu`,
        name: fullName || (usernameOrEmail.includes("@") ? usernameOrEmail.split("@")[0] : usernameOrEmail) || "Student Developer",
        college: college || "",
        degree: degree || "",
      });
    }, 400);
  };

  const handleOAuthLogin = (provider) => {
    if (provider === "google") {
      setGoogleModalOpen(true);
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
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
    }, 350);
  };

  const handleSelectGoogleAccount = (googleUser) => {
    onLogin({
      type: "google",
      name: googleUser.name,
      email: googleUser.email,
      username: googleUser.username,
      provider: "Google Identity Services",
      college: "",
      degree: "",
    });
  };

  const handleVerifyOtpUser = (otpUser) => {
    onLogin({
      type: mode === "signup" ? "credentials_signup" : "email_otp",
      name: fullName || otpUser.name || "Student Developer",
      email: otpUser.email,
      username: otpUser.username,
      college: college || "",
      degree: degree || "",
      provider: "Gmail Security Verification",
    });
  };

  return (
    <div className="min-h-screen bg-[#0A0D14] text-[#F1F5F9] flex flex-col justify-center relative overflow-hidden selection:bg-[#00C0F3] selection:text-[#0A0D14] font-[Inter,sans-serif]">
      {/* Luminous Ambient Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#00C0F3]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#10B981]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12 w-full">
        {/* Top Header & Logo */}
        <div className="flex items-center justify-between mb-8 sm:mb-10">
          <div className="flex items-center gap-4">
            {onBackToLanding && (
              <button
                type="button"
                onClick={onBackToLanding}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#131824] hover:bg-[#182030] text-[#94A3B8] hover:text-[#F1F5F9] border border-[#1F293D] hover:border-[#00C0F3]/40 text-xs font-semibold transition-all group cursor-pointer"
              >
                <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform text-[#00C0F3]" />
                <span>Back to Home</span>
              </button>
            )}
            <div className="flex items-center">
              <SkillVerseLogo size={56} />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/30">
              <ShieldCheck size={14} /> Verified Student Identity
            </span>
          </div>
        </div>

        {/* Main Bento Split */}
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          {/* Left Hero / Highlights Column */}
          <div className="hidden lg:flex lg:col-span-5 flex-col justify-between space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#00C0F3]/10 border border-[#00C0F3]/30 text-[#00C0F3] text-xs font-bold mb-4 shadow-sm">
                <Sparkles size={14} /> The Future of Student Portfolios
              </div>

              <h1 className="text-3xl sm:text-4xl font-black text-[#F1F5F9] font-display tracking-tight leading-tight">
                Empower your skills with <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00C0F3] via-[#38BDF8] to-[#A3E635]">verifiable proof</span>.
              </h1>

              <p className="text-sm text-[#94A3B8] mt-3.5 leading-relaxed">
                SkillVerse transforms self-reported claims into immutable evidence validated by live GitHub repositories, competitive ratings, and accredited coursework.
              </p>
            </div>

            {/* Feature Bento Mini-Cards */}
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
                    className="p-4 rounded-2xl bg-[#131824]/80 border border-[#1F293D] backdrop-blur-md flex items-start gap-3.5 hover:border-[#232F47] transition-all shadow-xs"
                  >
                    <div className={`w-10 h-10 rounded-xl ${feat.bg} ${feat.border} border flex items-center justify-center ${feat.color} shrink-0`}>
                      <Icon size={19} />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-[#F1F5F9]">{feat.title}</h4>
                      <p className="text-[11px] text-[#94A3B8] mt-0.5">{feat.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Trusted Badge */}
            <div className="pt-2 flex items-center gap-2 text-xs text-[#64748B]">
              <CheckCircle2 size={15} className="text-[#10B981]" />
              <span>Adopted across top university engineering departments</span>
            </div>
          </div>

          {/* Right Auth Card */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-[#1F293D] bg-[#131824]/90 backdrop-blur-xl p-6 sm:p-9 shadow-[0_24px_48px_rgba(0,0,0,0.5)] relative overflow-hidden">
              {/* Top Accent Line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#00C0F3] via-[#A3E635] to-[#10B981]" />

              {/* Title & Mode Switcher */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
                <div>
                  <h2 className="text-2xl font-black text-[#F1F5F9] font-display">
                    {mode === "login" ? "Sign in to SkillVerse" : "Create Student Account"}
                  </h2>
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
                        : "text-[#94A3B8] hover:text-[#F1F5F9]"
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
                        : "text-[#94A3B8] hover:text-[#F1F5F9]"
                    }`}
                  >
                    Register
                  </button>
                </div>
              </div>

              {/* OAuth Social Logins */}
              <div className="grid sm:grid-cols-2 gap-3 mb-5">
                <button
                  type="button"
                  onClick={() => handleOAuthLogin("google")}
                  disabled={loading}
                  className="flex items-center justify-center gap-3 px-4 py-3 rounded-2xl bg-[#182030] hover:bg-[#1E283D] border border-[#232F47] hover:border-[#4285F4]/60 text-sm font-bold text-[#F1F5F9] transition-all hover:scale-[1.01] active:scale-[0.99] group shadow-xs cursor-pointer"
                >
                  <GoogleIcon size={19} className="group-hover:scale-110 transition-transform" />
                  <span>Continue with Google</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleOAuthLogin("github")}
                  disabled={loading}
                  className="flex items-center justify-center gap-3 px-4 py-3 rounded-2xl bg-[#182030] hover:bg-[#1E283D] border border-[#232F47] hover:border-[#00C0F3]/60 text-sm font-bold text-[#F1F5F9] transition-all hover:scale-[1.01] active:scale-[0.99] group shadow-xs cursor-pointer"
                >
                  <GithubIcon size={19} className="group-hover:scale-110 transition-transform" />
                  <span>Continue with GitHub</span>
                </button>
              </div>

              {/* Auth Method Switcher */}
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
                <div className="mb-4 p-3 rounded-2xl bg-[#FB7185]/10 border border-[#FB7185]/30 text-[#FB7185] text-xs font-semibold flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FB7185]" />
                  {error}
                </div>
              )}

              {/* Main Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {mode === "signup" && (
                  <>
                    <div>
                      <label className="block text-xs font-bold text-[#F1F5F9] uppercase tracking-wider mb-1.5">
                        Full Name <span className="text-[#00C0F3]">*</span>
                      </label>
                      <div className="relative">
                        <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#64748B]" />
                        <input
                          type="text"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="e.g. Alex Rivera"
                          className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-[#182030] border border-[#232F47] text-sm text-[#F1F5F9] placeholder-[#64748B] focus:border-[#00C0F3] focus:ring-2 focus:ring-[#00C0F3]/20 outline-none transition-all"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-[#F1F5F9] uppercase tracking-wider mb-1.5">
                          College / University
                        </label>
                        <input
                          type="text"
                          value={college}
                          onChange={(e) => setCollege(e.target.value)}
                          placeholder="ABC University"
                          className="w-full px-3.5 py-2.5 rounded-2xl bg-[#182030] border border-[#232F47] text-sm text-[#F1F5F9] placeholder-[#64748B] focus:border-[#00C0F3] focus:ring-2 focus:ring-[#00C0F3]/20 outline-none transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-[#F1F5F9] uppercase tracking-wider mb-1.5">
                          Degree & Major
                        </label>
                        <input
                          type="text"
                          value={degree}
                          onChange={(e) => setDegree(e.target.value)}
                          placeholder="B.Tech Computer Science"
                          className="w-full px-3.5 py-2.5 rounded-2xl bg-[#182030] border border-[#232F47] text-sm text-[#F1F5F9] placeholder-[#64748B] focus:border-[#00C0F3] focus:ring-2 focus:ring-[#00C0F3]/20 outline-none transition-all"
                        />
                      </div>
                    </div>
                  </>
                )}

                {/* Username or Email */}
                <div>
                  <label className="block text-xs font-bold text-[#F1F5F9] uppercase tracking-wider mb-1.5">
                    {authMethod === "otp" ? "Gmail or Academic Email" : "Username or Academic Email"}{" "}
                    <span className="text-[#00C0F3]">*</span>
                  </label>
                  <div className="relative">
                    <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#64748B]" />
                    <input
                      type="text"
                      value={usernameOrEmail}
                      onChange={(e) => setUsernameOrEmail(e.target.value)}
                      placeholder={authMethod === "otp" ? "yourname@gmail.com" : "username or student@university.edu"}
                      className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-[#182030] border border-[#232F47] text-sm text-[#F1F5F9] placeholder-[#64748B] focus:border-[#00C0F3] focus:ring-2 focus:ring-[#00C0F3]/20 outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Password Input (only in password mode) */}
                {authMethod === "password" ? (
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="block text-xs font-bold text-[#F1F5F9] uppercase tracking-wider">
                        Password <span className="text-[#00C0F3]">*</span>
                      </label>
                      {mode === "login" && (
                        <span className="text-xs font-semibold text-[#00C0F3] hover:underline cursor-pointer">
                          Forgot password?
                        </span>
                      )}
                    </div>
                    <div className="relative">
                      <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#64748B]" />
                      <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••••••"
                        className="w-full pl-10 pr-11 py-2.5 rounded-2xl bg-[#182030] border border-[#232F47] text-sm text-[#F1F5F9] placeholder-[#64748B] focus:border-[#00C0F3] focus:ring-2 focus:ring-[#00C0F3]/20 outline-none transition-all"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#64748B] hover:text-[#F1F5F9] transition-colors cursor-pointer"
                      >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="p-3.5 rounded-2xl bg-[#0A0D14] border border-[#1F293D] text-xs text-[#94A3B8] flex items-center gap-2">
                    <KeyRound size={16} className="text-[#00C0F3] shrink-0" />
                    <span>A 6-digit one-time verification code will be sent to your Gmail inbox.</span>
                  </div>
                )}

                {/* Remember Me */}
                <div className="flex items-center justify-between pt-1">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 rounded-md border-[#232F47] bg-[#182030] text-[#00C0F3] focus:ring-0 focus:ring-offset-0 transition-colors"
                    />
                    <span className="text-xs text-[#94A3B8]">Remember this device</span>
                  </label>
                  <span className="text-xs text-[#64748B]">256-bit encrypted</span>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 px-4 rounded-2xl bg-[#00C0F3] hover:bg-[#38BDF8] text-[#0A0D14] font-black text-sm transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 shadow-[0_8px_20px_rgba(0,192,243,0.25)] cursor-pointer disabled:opacity-50"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-[#0A0D14] border-t-transparent rounded-full animate-spin" />
                  ) : authMethod === "otp" ? (
                    <>
                      <span>Send 6-Digit Code to Gmail</span>
                      <ArrowRight size={16} />
                    </>
                  ) : (
                    <>
                      <span>{mode === "login" ? "Sign In to SkillVerse" : "Create Student Account"}</span>
                      <ArrowRight size={16} />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

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

export default LoginPage;
