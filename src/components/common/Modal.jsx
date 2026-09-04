import React, { useEffect } from "react";
import { X } from "lucide-react";

export function Modal({ open, onClose, title, children, wide = false, size }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const sizeClass = size
    ? size === "sm"
      ? "max-w-md"
      : size === "md"
      ? "max-w-lg sm:max-w-xl"
      : size === "lg"
      ? "max-w-2xl sm:max-w-3xl"
      : "max-w-3xl sm:max-w-4xl"
    : wide
    ? "max-w-2xl sm:max-w-3xl lg:max-w-4xl"
    : "max-w-md sm:max-w-xl";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#101218]/65 backdrop-blur-sm"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className={`bg-white rounded-[24px] w-full ${sizeClass} max-h-[90vh] overflow-y-auto shadow-2xl border border-[#E9E2E5] animate-[fadeIn_0.2s_ease]`}
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        <div className="flex items-center justify-between px-6 sm:px-8 py-5 border-b border-[#E9E2E5] sticky top-0 bg-white/95 backdrop-blur-md rounded-t-[24px] z-10">
          <h3 className="text-lg sm:text-xl font-bold text-[#101218] font-display">{title}</h3>
          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="p-2 rounded-full text-[#707584] hover:bg-[#FCEBEF] hover:text-[#BA203B] transition-colors"
          >
            <X size={19} />
          </button>
        </div>
        <div className="p-6 sm:p-8">{children}</div>
      </div>
    </div>
  );
}

export default Modal;
