import React from "react";
import { Card } from "../components/common/Card";
import { SectionHeading } from "../components/common/SectionHeading";
import { CircularProgress, ProgressBar } from "../components/common/Progress";
import { PriorityBadge } from "../components/common/Badges";
import { GAP_DATA, gapPriority } from "../data/mockData";

export function GapAnalysisPage({ careerGoal }) {
  return (
    <div className="space-y-6 max-w-4xl">
      <Card className="p-6 sm:p-8">
        <SectionHeading title={`Career Readiness — ${careerGoal}`} />
        <div className="flex flex-col sm:flex-row items-center gap-6 mb-6">
          <CircularProgress value={72} size={120} label="Ready" />
          <div className="flex-1 space-y-3 w-full">
            {[
              { label: "Academic Foundations", value: 78, color: "bg-[#10B981]" },
              { label: "Verified Technical Skills", value: 65, color: "bg-[#00C0F3]" },
              { label: "Collaborative & Soft Skills", value: 74, color: "bg-[#A3E635]" },
              { label: "Portfolio & Practical Experience", value: 60, color: "bg-[#FB7185]" },
            ].map((m) => (
              <div key={m.label}>
                <div className="flex justify-between text-xs text-[#F1F5F9] mb-1">
                  <span className="font-medium">{m.label}</span>
                  <span className="font-bold">{m.value}%</span>
                </div>
                <ProgressBar value={m.value} colorClass={m.color} />
              </div>
            ))}
          </div>
        </div>
        <p className="text-xs text-[#94A3B8] border-t border-[#1F293D] pt-4">
          This is a transparent, rule-based verification score calculated from your active proofs, coursework, and target role requirements.
        </p>
      </Card>

      <Card className="p-6 sm:p-8">
        <SectionHeading title="Full Skill Gap Analysis" />
        <p className="text-xs sm:text-sm text-[#94A3B8] mb-5">
          Levels are evaluated Beginner = 1, Intermediate = 2, Advanced = 3. Target high-priority gaps to increase candidate match percentage.
        </p>
        <div className="overflow-x-auto -mx-2">
          <table className="w-full text-sm min-w-[520px]">
            <thead>
              <tr className="text-left text-xs text-[#94A3B8] uppercase tracking-wider border-b border-[#1F293D]">
                <th className="py-3 px-3.5 font-bold">Skill</th>
                <th className="py-3 px-3.5 font-bold">Current Level</th>
                <th className="py-3 px-3.5 font-bold">Required Level</th>
                <th className="py-3 px-3.5 font-bold">Priority Status</th>
              </tr>
            </thead>
            <tbody>
              {GAP_DATA.map((g) => (
                <tr key={g.skill} className="border-b border-[#1F293D] last:border-0 hover:bg-[#182030] transition-colors">
                  <td className="py-3.5 px-3.5 text-[#F1F5F9] font-bold font-display">{g.skill}</td>
                  <td className="py-3.5 px-3.5 text-[#94A3B8] font-medium">{g.current}</td>
                  <td className="py-3.5 px-3.5 text-[#94A3B8] font-medium">{g.required}</td>
                  <td className="py-3.5 px-3.5">
                    <PriorityBadge priority={gapPriority(g.curVal, g.reqVal)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

export default GapAnalysisPage;
