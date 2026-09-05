import React from "react";

export function SectionHeading({ eyebrow, title, action }) {
  return (
    <div className="flex items-center justify-between mb-4">
      <div>
        {eyebrow && <p className="text-xs font-semibold uppercase tracking-wider text-[#111827] mb-0.5">{eyebrow}</p>}
        <h3 className="text-lg font-bold text-[#111827] font-display">{title}</h3>
      </div>
      {action}
    </div>
  );
}

export default SectionHeading;
