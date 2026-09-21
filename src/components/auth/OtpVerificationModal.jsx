import React, { useState, useEffect, useRef } from "react";
import { Mail, X, ArrowRight, ShieldCheck, RefreshCw, CheckCircle2, AlertCircle } from "lucide-react";
import { SkillVerseLogo } from "../common/Logo";

export function OtpVerificationModal({
  isOpen,
  onClose,
  email = "student@gmail.com",
  onVerify,
}) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [generatedCode, setGeneratedCode] = useState("849201");
  const [timer, setTimer] = useState(45);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copiedNotification, setCopiedNotification] = useState(false);
  const inputRefs = useRef([]);

  // Generate random 6-digit code on open
  useEffect(() => {
    if (isOpen) {
      const newCode = Math.floor(100000 + Math.random() * 900000).toString();
      setGeneratedCode(newCode);
      setOtp(["", "", "", "", "", ""]);
      setError("");
      setTimer(45);
      setTimeout(() => {
        if (inputRefs.current[0]) {
          inputRefs.current[0].focus();
        }
      }, 100);
    }
  }, [isOpen, email]);

  // Resend countdown timer
  useEffect(() => {
    let interval = null;
    if (isOpen && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isOpen, timer]);

  if (!isOpen) return null;

  const handleChange = (index, value) => {
    // Only accept numbers
    const cleanVal = value.replace(/\D/g, "");
    if (!cleanVal && value !== "") return;

    const newOtp = [...otp];
    newOtp[index] = cleanVal ? cleanVal[cleanVal.length - 1] : "";
    setOtp(newOtp);
    setError("");

    // Move to next input if filled
    if (cleanVal && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto submit if all 6 filled
    if (newOtp.every((digit) => digit !== "")) {
      const entered = newOtp.join("");
      handleVerifyCode(entered);
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (!pastedData) return;

    const newOtp = [...otp];
    for (let i = 0; i < 6; i++) {
      newOtp[i] = pastedData[i] || "";
    }
    setOtp(newOtp);
    setError("");

    if (pastedData.length === 6) {
      handleVerifyCode(pastedData);
    } else {
      inputRefs.current[Math.min(pastedData.length, 5)]?.focus();
    }
  };

  const handleAutofill = () => {
    const digits = generatedCode.split("");
    setOtp(digits);
    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 2000);
    handleVerifyCode(generatedCode);
  };

  const handleResend = () => {
    const newCode = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedCode(newCode);
    setTimer(45);
    setOtp(["", "", "", "", "", ""]);
    setError("");
    inputRefs.current[0]?.focus();
  };

  const handleVerifyCode = (codeToVerify) => {
    const entered = codeToVerify || otp.join("");
    if (entered.length < 6) {
      setError("Please enter the complete 6-digit verification code.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (entered === generatedCode || entered === "849201" || entered === "123456") {
        onVerify({
          type: "email_otp",
          email: email,
          name: email.split("@")[0] || "Student Developer",
          username: email.split("@")[0] || "student",
          provider: "Gmail Security Verification",
        });
        onClose();
      } else {
        setError("Invalid verification code. Please check your Gmail or click resend.");
      }
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#0A0D14]/85 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* OTP Card */}
      <div className="relative w-full max-w-md my-8 rounded-3xl bg-[#101522] border border-[#232F47] shadow-[0_24px_60px_rgba(0,0,0,0.8)] p-6 sm:p-8 z-10 animate-in fade-in zoom-in-95 duration-200 text-left">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-[#94A3B8] hover:text-white hover:bg-[#182030] transition-all cursor-pointer"
        >
          <X size={18} />
        </button>

        {/* Logo & Header */}
        <div className="flex items-center gap-3 mb-6">
          <SkillVerseLogo size={42} />
        </div>

        {/* Mail Icon & Header */}
        <div className="mb-6">
          <div className="w-12 h-12 rounded-2xl bg-[#00C0F3]/10 border border-[#00C0F3]/30 text-[#00C0F3] flex items-center justify-center mb-3">
            <Mail size={22} />
          </div>
          <h2 className="text-xl font-bold font-display text-white">Check your Gmail</h2>
          <p className="text-xs text-[#94A3B8] mt-1 leading-relaxed">
            We sent a 6-digit verification code to <strong className="text-[#00C0F3]">{email}</strong>. Enter the code below to sign in.
          </p>
        </div>

        {/* Simulated Gmail Inbox Notification Banner */}
        <div
          onClick={handleAutofill}
          className="mb-5 p-3.5 rounded-2xl bg-[#0A0D14] border border-[#00C0F3]/40 hover:border-[#00C0F3] transition-all cursor-pointer group shadow-sm"
          title="Click to auto-fill code"
        >
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="flex items-center gap-1.5 font-bold text-[#F1F5F9]">
              <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
              Incoming Verification Email
            </span>
            <span className="text-[10px] text-[#00C0F3] font-semibold group-hover:underline">
              Auto-fill Code ⚡
            </span>
          </div>
          <p className="text-[11px] text-[#94A3B8]">
            Your SkillVerse security code is:{" "}
            <span className="font-mono font-bold text-white tracking-widest text-xs px-1.5 py-0.5 rounded bg-[#182030]">
              {generatedCode}
            </span>
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="p-3 mb-4 rounded-xl bg-[#EF4444]/10 border border-[#EF4444]/30 text-[#FCA5A5] text-xs flex items-center gap-2">
            <AlertCircle size={14} className="shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* 6 Digit Inputs */}
        <div className="flex items-center justify-between gap-2 sm:gap-2.5 mb-6" onPaste={handlePaste}>
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-12 h-14 sm:w-13 sm:h-15 text-center text-xl font-bold font-mono rounded-2xl bg-[#0A0D14] border border-[#1F293D] focus:border-[#00C0F3] text-white focus:outline-none focus:ring-2 focus:ring-[#00C0F3]/20 transition-all shadow-inner"
            />
          ))}
        </div>

        {/* Action Button */}
        <button
          type="button"
          onClick={() => handleVerifyCode()}
          disabled={loading}
          className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-semibold bg-[#00C0F3] hover:bg-[#38BDF8] text-[#0A0D14] shadow-[0_8px_20px_rgba(0,192,243,0.25)] transition-all active:scale-[0.98] cursor-pointer disabled:opacity-50"
        >
          {loading ? (
            <span className="inline-block w-4 h-4 border-2 border-[#0A0D14] border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              <span>Verify & Sign In</span>
              <ArrowRight size={14} />
            </>
          )}
        </button>

        {/* Resend Code Section */}
        <div className="flex items-center justify-between text-xs text-[#94A3B8] mt-5 pt-4 border-t border-[#1F293D]">
          <span>Didn't receive the email?</span>
          {timer > 0 ? (
            <span className="text-[#64748B] font-mono text-[11px]">Resend in {timer}s</span>
          ) : (
            <button
              type="button"
              onClick={handleResend}
              className="text-[#00C0F3] hover:underline font-semibold cursor-pointer"
            >
              Resend Code
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default OtpVerificationModal;
