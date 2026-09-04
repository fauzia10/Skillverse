import React from "react";

export function Card({ children, className = "" }) {
  return (
    <div className={`bg-white rounded-[22px] border border-[#E9E2E5] shadow-[0_2px_16px_rgba(16,18,24,0.04)] ${className}`}>
      {children}
    </div>
  );
}

export default Card;
