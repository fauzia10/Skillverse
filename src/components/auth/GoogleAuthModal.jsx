import React, { useState } from "react";
import { X, User, ArrowRight, ShieldCheck, ChevronRight, Plus } from "lucide-react";
import { GoogleIcon } from "../common/PlatformIcons";

export function GoogleAuthModal({ isOpen, onClose, onSelectAccount }) {
  const [customMode, setCustomMode] = useState(false);
  const [customEmail, setCustomEmail] = useState("");
  const [customName, setCustomName] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  if (!isOpen) return null;

  const defaultAccounts = [
    {
      id: "acc_1",
      name: "Sophia Chen",
      email: "sophia.chen@gmail.com",
      avatarBg: "bg-[#4285F4]",
      initials: "SC",
    },
    {
      id: "acc_2",
      name: "Alex Rivera",
      email: "alex.rivera.dev@gmail.com",
      avatarBg: "bg-[#EA4335]",
      initials: "AR",
    },
  ];

  const handlePick = (acc) => {
    setSelectedUser(acc);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onSelectAccount({
        type: "google",
        name: acc.name,
        email: acc.email,
        username: acc.email.split("@")[0],
        provider: "Google Identity Services",
      });
      onClose();
    }, 600);
  };

  const handleCustomSubmit = (e) => {
    e.preventDefault();
    if (!customEmail.trim()) return;

    const email = customEmail.includes("@") ? customEmail : `${customEmail}@gmail.com`;
    const name = customName.trim() || email.split("@")[0];

    setSelectedUser({ name, email });
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onSelectAccount({
        type: "google",
        name: name,
        email: email,
        username: email.split("@")[0],
        provider: "Google Identity Services",
      });
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Google Sign-In Card (Authentic Google Identity Style) */}
      <div className="relative w-full max-w-[420px] rounded-3xl bg-[#202124] border border-[#3C4043] shadow-[0_20px_50px_rgba(0,0,0,0.8)] text-white p-7 sm:p-8 z-10 animate-in fade-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-[#9AA0A6] hover:text-white hover:bg-[#303134] transition-all cursor-pointer"
        >
          <X size={18} />
        </button>

        {/* Google Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#303134] mb-3">
            <GoogleIcon size={24} />
          </div>
          <h2 className="text-xl font-medium text-[#E8EAED] tracking-normal font-sans">
            {customMode ? "Sign in with Google" : "Choose an account"}
          </h2>
          <p className="text-xs text-[#9AA0A6] mt-1">
            to continue to <span className="text-[#8AB4F8] font-medium">SkillVerse</span>
          </p>
        </div>

        {loading ? (
          <div className="py-12 text-center space-y-4">
            <div className="inline-block w-8 h-8 border-3 border-[#8AB4F8] border-t-transparent rounded-full animate-spin" />
            <p className="text-xs text-[#9AA0A6]">
              Signing in as <strong className="text-white">{selectedUser?.name || "Google User"}</strong>...
            </p>
          </div>
        ) : customMode ? (
          /* Custom Google Account Entry Form */
          <form onSubmit={handleCustomSubmit} className="space-y-4">
            <div>
              <label className="block text-xs text-[#9AA0A6] mb-1.5">
                Google / Gmail Address
              </label>
              <input
                type="text"
                autoFocus
                value={customEmail}
                onChange={(e) => setCustomEmail(e.target.value)}
                placeholder="your.name@gmail.com"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#303134] border border-[#5F6368] focus:border-[#8AB4F8] text-xs text-white placeholder-[#80868B] focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs text-[#9AA0A6] mb-1.5">
                Your Full Name (Optional)
              </label>
              <input
                type="text"
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
                placeholder="e.g. Alex Rivera"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#303134] border border-[#5F6368] focus:border-[#8AB4F8] text-xs text-white placeholder-[#80868B] focus:outline-none transition-colors"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={() => setCustomMode(false)}
                className="text-xs text-[#8AB4F8] hover:underline cursor-pointer"
              >
                ← Back to accounts
              </button>

              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-[#8AB4F8] hover:bg-[#AECBFA] text-[#202124] text-xs font-semibold transition-all cursor-pointer"
              >
                Continue
              </button>
            </div>
          </form>
        ) : (
          /* Account List */
          <div className="space-y-2">
            {defaultAccounts.map((acc) => (
              <button
                key={acc.id}
                onClick={() => handlePick(acc)}
                className="w-full flex items-center justify-between p-3 rounded-2xl hover:bg-[#303134] border border-transparent hover:border-[#3C4043] transition-all text-left cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-9 h-9 rounded-full ${acc.avatarBg} text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-sm`}
                  >
                    {acc.initials}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-[#E8EAED] group-hover:text-white truncate">
                      {acc.name}
                    </p>
                    <p className="text-[11px] text-[#9AA0A6] truncate">{acc.email}</p>
                  </div>
                </div>
                <ChevronRight size={16} className="text-[#80868B] group-hover:text-white transition-colors" />
              </button>
            ))}

            {/* Use Another Account Button */}
            <button
              onClick={() => setCustomMode(true)}
              className="w-full flex items-center gap-3 p-3 rounded-2xl hover:bg-[#303134] border border-transparent hover:border-[#3C4043] transition-all text-left cursor-pointer group mt-2"
            >
              <div className="w-9 h-9 rounded-full bg-[#303134] border border-[#5F6368] text-[#8AB4F8] flex items-center justify-center shrink-0">
                <Plus size={16} />
              </div>
              <div>
                <p className="text-xs font-medium text-[#8AB4F8] group-hover:text-[#AECBFA]">
                  Use another Google account
                </p>
                <p className="text-[11px] text-[#9AA0A6]">Sign in with any @gmail.com address</p>
              </div>
            </button>
          </div>
        )}

        {/* Security & Disclaimer Footer */}
        <div className="mt-6 pt-4 border-t border-[#3C4043] text-[11px] text-[#9AA0A6] leading-relaxed">
          <p>
            To continue, Google will share your name, email address, and profile picture with SkillVerse.
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
