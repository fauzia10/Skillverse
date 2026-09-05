import React from "react";

export function Card({ children, className = "", onClick }) {
  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-[26px] border border-[#E2EBF0] shadow-[0_4px_20px_rgba(20,40,60,0.03)] transition-all duration-200 ${
        onClick ? "cursor-pointer hover:border-[#CBD5E1] hover:shadow-[0_8px_24px_rgba(20,40,60,0.06)]" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}

export default Card;
