import React, { useState, useEffect } from "react";
import { X, User, ArrowRight, ShieldCheck, Mail, Lock, Sparkles } from "lucide-react";
import { GoogleIcon } from "../common/PlatformIcons";

export function GoogleAuthModal({ isOpen, onClose, onSelectAccount }) {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [step, setStep] = useState("email"); // "email" | "confirm"

  useEffect(() => {
    if (isOpen) {
      setEmail("");
      setFullName("");
      setLoading(false);
      setError("");
      setStep("email");
    }
  }, [isOpen]);

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

  const handleNext = (e) => {
    if (e) e.preventDefault();
    setError("");

    const cleanEmail = email.trim();
    if (!cleanEmail) {
      setError("Enter a valid Google email address or phone.");
      return;
    }

    const fullEmail = cleanEmail.includes("@") ? cleanEmail : `${cleanEmail}@gmail.com`;
    const inferredName = fullName.trim() || fullEmail.split("@")[0].replace(/[._]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onSelectAccount({
        type: "google",
        name: inferredName,
        email: fullEmail,
        username: fullEmail.split("@")[0],
        provider: "Google Identity Services",
      });
      onClose();
    }, 300);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto font-[Inter,sans-serif]">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Authentic Google Sign-In Card */}
      <div className="relative w-full max-w-[430px] rounded-3xl bg-[#202124] border border-[#3C4043] shadow-[0_24px_70px_rgba(0,0,0,0.9)] text-white p-7 sm:p-9 z-10 animate-in fade-in zoom-in-95 duration-200 text-left">
        {/* Close Button */}
        <button
          onClick={onClose}
          type="button"
          className="absolute top-5 right-5 p-2 rounded-full text-[#9AA0A6] hover:text-white hover:bg-[#303134] transition-all cursor-pointer"
          title="Close (Esc)"
        >
          <X size={18} />
        </button>

        {/* Google Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#303134] mb-3 shadow-inner">
            <GoogleIcon size={26} />
          </div>
          <h2 className="text-2xl font-normal text-[#E8EAED] tracking-normal font-sans">
            Sign in with Google
          </h2>
          <p className="text-xs text-[#9AA0A6] mt-1.5">
            to continue to <span className="text-[#8AB4F8] font-semibold">SkillVerse</span>
          </p>
        </div>

        {loading ? (
          <div className="py-12 text-center space-y-4">
            <div className="inline-block w-9 h-9 border-3 border-[#8AB4F8] border-t-transparent rounded-full animate-spin" />
            <p className="text-xs text-[#E8EAED]">
              Connecting with Google Identity Services...
            </p>
          </div>
        ) : (
          <form onSubmit={handleNext} className="space-y-4">
            {error && (
              <div className="p-3 rounded-xl bg-[#EA4335]/15 border border-[#EA4335]/40 text-[#F28B82] text-xs">
                {error}
              </div>
            )}

            <div>
              <label className="block text-xs text-[#9AA0A6] mb-1.5 font-medium">
                Email or phone <span className="text-[#8AB4F8]">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#80868B]">
                  <Mail size={16} />
                </div>
                <input
                  type="email"
                  autoFocus
                  required
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError("");
                  }}
                  placeholder="name@gmail.com"
                  className="w-full pl-10 pr-3.5 py-3 rounded-xl bg-[#303134] border border-[#5F6368] focus:border-[#8AB4F8] text-sm text-white placeholder-[#80868B] focus:outline-none transition-colors"
                />
              </div>
              <div className="flex justify-start mt-1.5">
                <button
                  type="button"
                  onClick={() => setEmail("student@gmail.com")}
                  className="text-[11px] text-[#8AB4F8] hover:underline cursor-pointer"
                >
                  Forgot email?
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs text-[#9AA0A6] mb-1.5 font-medium">
                Display Name (Optional)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#80868B]">
                  <User size={16} />
                </div>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Fauzia Khan"
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-[#303134] border border-[#5F6368] focus:border-[#8AB4F8] text-xs text-white placeholder-[#80868B] focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div className="text-[11px] text-[#9AA0A6] leading-relaxed pt-1">
              Not your computer? Use Guest mode to sign in privately.{" "}
              <span className="text-[#8AB4F8] hover:underline cursor-pointer">Learn more</span>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between pt-3">
              <button
                type="button"
                onClick={onClose}
                className="text-xs text-[#8AB4F8] font-medium hover:underline cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="px-6 py-2.5 rounded-full bg-[#8AB4F8] hover:bg-[#AECBFA] text-[#202124] text-xs font-bold transition-all cursor-pointer shadow-md active:scale-98 flex items-center gap-1.5"
              >
                <span>Next</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </form>
        )}

        {/* Security & Disclaimer Footer */}
        <div className="mt-8 pt-4 border-t border-[#3C4043] text-[11px] text-[#9AA0A6] leading-relaxed">
          <p>
            Google Identity Services will share your verified account details with SkillVerse.
          </p>
          <div className="flex items-center justify-between text-[10px] text-[#80868B] mt-3">
            <span>English (United States)</span>
            <div className="flex gap-2">
              <span className="hover:underline cursor-pointer">Help</span>
              <span>·</span>
              <span className="hover:underline cursor-pointer">Privacy</span>
              <span>·</span>
              <span className="hover:underline cursor-pointer">Terms</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GoogleAuthModal;
