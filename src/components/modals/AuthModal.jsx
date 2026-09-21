import React, { useState, useEffect } from "react";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  X,
  ArrowRight,
  ShieldCheck,
  GraduationCap,
  Sparkles,
} from "lucide-react";
import { GoogleIcon, GithubIcon } from "../common/PlatformIcons";
import { SkillVerseLogo } from "../common/Logo";

export function AuthModal({
  isOpen,
  onClose,
  onLogin,
  initialMode = "login",
}) {
  const [mode, setMode] = useState(initialMode);
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

  useEffect(() => {
    setMode(initialMode);
    setError("");
  }, [initialMode, isOpen]);

  // Handle ESC key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

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
        username: usernameOrEmail.includes("@") ? usernameOrEmail.split("@")[0] : usernameOrEmail,
        email: usernameOrEmail.includes("@") ? usernameOrEmail : `${usernameOrEmail}@university.edu`,
        name: fullName || (usernameOrEmail.includes("@") ? usernameOrEmail.split("@")[0] : usernameOrEmail) || "Student Developer",
        college: college || "",
        degree: degree || "",
      });
      onClose();
    }, 400);
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
      onClose();
    }, 350);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#0A0D14]/80 backdrop-blur-md transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-md my-8 rounded-3xl bg-[#101522] border border-[#232F47] shadow-[0_24px_60px_rgba(0,0,0,0.8)] p-6 sm:p-8 z-10 animate-in fade-in zoom-in-95 duration-200 text-left">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-[#94A3B8] hover:text-white hover:bg-[#182030] transition-all cursor-pointer"
          title="Close (Esc)"
        >
          <X size={18} />
        </button>

        {/* Logo & Header */}
        <div className="flex items-center gap-3 mb-6">
          <SkillVerseLogo size={42} />
        </div>

        {/* Title & Mode Switcher */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xl font-bold font-display text-white">
              {mode === "login" ? "Welcome back" : "Create your identity"}
            </h2>
            <p className="text-xs text-[#94A3B8] mt-1">
              {mode === "login"
                ? "Sign in to access your verified portfolio"
                : "Join verified student developers today"}
            </p>
          </div>

          <div className="flex items-center p-1 rounded-xl bg-[#0A0D14] border border-[#1F293D] shrink-0">
            <button
              type="button"
              onClick={() => {
                setMode("login");
                setError("");
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
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
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                mode === "signup"
                  ? "bg-[#00C0F3] text-[#0A0D14] shadow-sm"
                  : "text-[#94A3B8] hover:text-white"
              }`}
            >
              Register
            </button>
          </div>
        </div>

        {/* Social Auth Buttons */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          <button
            type="button"
            onClick={() => handleOAuthLogin("google")}
            disabled={loading}
            className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-[#131824] hover:bg-[#182030] border border-[#1F293D] hover:border-[#2A3754] text-xs font-medium text-white transition-all cursor-pointer"
          >
            <GoogleIcon size={16} />
            <span>Google</span>
          </button>

          <button
            type="button"
            onClick={() => handleOAuthLogin("github")}
            disabled={loading}
            className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-[#131824] hover:bg-[#182030] border border-[#1F293D] hover:border-[#2A3754] text-xs font-medium text-white transition-all cursor-pointer"
          >
            <GithubIcon size={16} />
            <span>GitHub</span>
          </button>
        </div>

        <div className="relative flex items-center justify-center mb-5">
          <div className="w-full border-t border-[#1F293D]" />
          <span className="absolute px-3 bg-[#101522] text-[10px] uppercase font-bold text-[#64748B] tracking-wider">
            or continue with
          </span>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="p-3 mb-4 rounded-xl bg-[#EF4444]/10 border border-[#EF4444]/30 text-[#FCA5A5] text-xs">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          {mode === "signup" && (
            <div>
              <label className="block text-xs font-medium text-[#94A3B8] mb-1">
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
            <label className="block text-xs font-medium text-[#94A3B8] mb-1">
              {mode === "signup" ? "Email Address" : "Username or Email"}{" "}
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
                placeholder={mode === "signup" ? "alex@university.edu" : "username or email"}
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-[#0A0D14] border border-[#1F293D] focus:border-[#00C0F3] text-xs text-white placeholder-[#64748B] focus:outline-none transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-[#94A3B8] mb-1">
              Password <span className="text-[#00C0F3]">*</span>
            </label>
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
                  placeholder="MIT / Stanford"
                  className="w-full px-3 py-2 rounded-xl bg-[#0A0D14] border border-[#1F293D] focus:border-[#00C0F3] text-xs text-white placeholder-[#64748B] focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-[11px] font-medium text-[#94A3B8] mb-1">
                  Major / Degree
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

            {mode === "login" && (
              <span className="text-[11px] text-[#00C0F3] hover:underline cursor-pointer">
                Forgot password?
              </span>
            )}
          </div>

          {/* Submit CTA */}
          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center gap-2 py-3 mt-2 rounded-xl text-xs font-semibold bg-[#00C0F3] hover:bg-[#38BDF8] text-[#0A0D14] shadow-[0_8px_20px_rgba(0,192,243,0.25)] transition-all active:scale-[0.98] cursor-pointer disabled:opacity-50"
          >
            {loading ? (
              <span className="inline-block w-4 h-4 border-2 border-[#0A0D14] border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <span>{mode === "login" ? "Sign In to Dashboard" : "Create Free Account"}</span>
                <ArrowRight size={14} />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AuthModal;
