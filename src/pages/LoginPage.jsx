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
  GraduationCap,
  BadgeCheck,
  CheckCircle2,
  FolderKanban,
  Trophy,
} from "lucide-react";
import { GoogleIcon, GithubIcon } from "../components/common/PlatformIcons";
import { SkillVerseLogo } from "../components/common/Logo";

export function LoginPage({ onLogin, onBackToLanding, initialMode = "login" }) {
  const [mode, setMode] = useState(initialMode); // "login" | "signup"
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

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
        username: usernameOrEmail,
        email: usernameOrEmail.includes("@") ? usernameOrEmail : `${usernameOrEmail}@university.edu`,
        name: fullName || usernameOrEmail.split("@")[0] || "Student",
        college: college || "",
        degree: degree || "",
      });
    }, 450);
  };

  const handleOAuthLogin = (provider) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (provider === "google") {
        onLogin({
          type: "google",
          name: "Google Student",
          email: "student@gmail.com",
          username: "google_student",
          provider: "Google",
          college: "",
          degree: "",
        });
      } else if (provider === "github") {
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
    }, 400);
  };

  return (
    <div className="min-h-screen bg-[#0A0D14] text-[#F1F5F9] flex flex-col justify-center relative overflow-hidden selection:bg-[#00C0F3] selection:text-[#0A0D14] font-[Inter,sans-serif]">
      {/* Luminous Ambient Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#00C0F3]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#10B981]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#A3E635]/5 rounded-full blur-[180px] pointer-events-none" />

      {/* Decorative Grid Overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#F1F5F9 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
        }}
      />

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
          {/* Left Hero / Highlights Column (Hidden on tiny screens) */}
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
              {/* Subtle top card neon line */}
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
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${mode === "login"
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
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${mode === "signup"
                        ? "bg-[#00C0F3] text-[#0A0D14] shadow-sm"
                        : "text-[#94A3B8] hover:text-[#F1F5F9]"
                      }`}
                  >
                    Register
                  </button>
                </div>
              </div>

              {/* OAuth Social Logins */}
              <div className="grid sm:grid-cols-2 gap-3 mb-6">
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

              {/* Divider */}
              <div className="relative flex items-center justify-center mb-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-[#1F293D]"></div>
                </div>
                <div className="relative px-3 bg-[#131824] text-[11px] font-semibold text-[#64748B] uppercase tracking-wider">
                  or sign in with username & email
                </div>
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
                        Full Name
                      </label>
                      <div className="relative">
                        <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#64748B]" />
                        <input
                          type="text"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="e.g. Rahul Sharma"
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
                    Username or Academic Email
                  </label>
                  <div className="relative">
                    <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#64748B]" />
                    <input
                      type="text"
                      value={usernameOrEmail}
                      onChange={(e) => setUsernameOrEmail(e.target.value)}
                      placeholder="username or student@university.edu"
                      className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-[#182030] border border-[#232F47] text-sm text-[#F1F5F9] placeholder-[#64748B] focus:border-[#00C0F3] focus:ring-2 focus:ring-[#00C0F3]/20 outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-bold text-[#F1F5F9] uppercase tracking-wider">
                      Password
                    </label>
                    {mode === "login" && (
                      <button
                        type="button"
                        onClick={() => alert("Password reset link sent to your registered academic email address.")}
                        className="text-xs text-[#00C0F3] hover:underline"
                      >
                        Forgot password?
                      </button>
                    )}
                  </div>
                  <div className="relative">
                    <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#64748B]" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full pl-10 pr-10 py-2.5 rounded-2xl bg-[#182030] border border-[#232F47] text-sm text-[#F1F5F9] placeholder-[#64748B] focus:border-[#00C0F3] focus:ring-2 focus:ring-[#00C0F3]/20 outline-none transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#64748B] hover:text-[#F1F5F9] transition-colors"
                      tabIndex={-1}
                      title={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                {/* Remember Me */}
                <div className="flex items-center justify-between pt-1">
                  <label className="inline-flex items-center gap-2 cursor-pointer text-xs text-[#94A3B8] select-none">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="rounded bg-[#182030] border-[#232F47] text-[#00C0F3] focus:ring-[#00C0F3]/20 focus:ring-offset-0 h-4 w-4"
                    />
                    <span>Remember this device</span>
                  </label>

                  <span className="text-xs text-[#64748B] hidden sm:inline">256-bit encrypted</span>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-2 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl text-sm font-bold bg-gradient-to-r from-[#00C0F3] to-[#38BDF8] hover:from-[#38BDF8] hover:to-[#00C0F3] text-[#0A0D14] shadow-[0_12px_24px_-6px_rgba(0,192,243,0.35)] hover:shadow-[0_16px_32px_-6px_rgba(0,192,243,0.5)] active:scale-[0.99] transition-all cursor-pointer font-display"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-[#0A0D14] border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>{mode === "login" ? "Sign In to SkillVerse" : "Create My Student Account"}</span>
                      <ArrowRight size={16} />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="mt-10 text-center text-xs text-[#64748B]">
          <p>
            Protected by institutional authentication. By signing in, you accept SkillVerse's Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
