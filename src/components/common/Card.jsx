import React from "react";

export function Card({ children, className = "", onClick }) {
  return (
    <div
      onClick={onClick}
      className={`bg-[#131824] text-[#F1F5F9] rounded-[26px] border border-[#1F293D] shadow-[0_8px_30px_rgba(0,0,0,0.35)] transition-all duration-200 ${
        onClick ? "cursor-pointer hover:border-[#2A3754] hover:shadow-[0_12px_36px_rgba(0,0,0,0.45)] hover:bg-[#161D2B]" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}

export default Card;
