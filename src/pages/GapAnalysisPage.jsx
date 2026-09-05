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
              { label: "Academic Foundations", value: 78, color: "bg-[#2E4D0C]" },
              { label: "Verified Technical Skills", value: 65, color: "bg-[#111827]" },
              { label: "Collaborative & Soft Skills", value: 74, color: "bg-[#0C453E]" },
              { label: "Portfolio & Practical Experience", value: 60, color: "bg-[#5C1B1B]" },
            ].map((m) => (
              <div key={m.label}>
                <div className="flex justify-between text-xs text-[#111827] mb-1">
                  <span className="font-medium">{m.label}</span>
                  <span className="font-bold">{m.value}%</span>
                </div>
                <ProgressBar value={m.value} colorClass={m.color} />
              </div>
            ))}
          </div>
        </div>
        <p className="text-xs text-[#64748B] border-t border-[#E2EBF0] pt-4">
          This is a transparent, rule-based verification score calculated from your active proofs, coursework, and target role requirements.
        </p>
      </Card>

      <Card className="p-6 sm:p-8">
        <SectionHeading title="Full Skill Gap Analysis" />
        <p className="text-xs sm:text-sm text-[#64748B] mb-5">
          Levels are evaluated Beginner = 1, Intermediate = 2, Advanced = 3. Target high-priority gaps to increase candidate match percentage.
        </p>
        <div className="overflow-x-auto -mx-2">
          <table className="w-full text-sm min-w-[520px]">
            <thead>
              <tr className="text-left text-xs text-[#64748B] uppercase tracking-wider border-b border-[#E2EBF0]">
                <th className="py-3 px-3.5 font-bold">Skill</th>
                <th className="py-3 px-3.5 font-bold">Current Level</th>
                <th className="py-3 px-3.5 font-bold">Required Level</th>
                <th className="py-3 px-3.5 font-bold">Priority Status</th>
              </tr>
            </thead>
            <tbody>
              {GAP_DATA.map((g) => (
                <tr key={g.skill} className="border-b border-[#E2EBF0] last:border-0 hover:bg-[#F4F8FA] transition-colors">
                  <td className="py-3.5 px-3.5 text-[#111827] font-bold font-display">{g.skill}</td>
                  <td className="py-3.5 px-3.5 text-[#64748B] font-medium">{g.current}</td>
                  <td className="py-3.5 px-3.5 text-[#64748B] font-medium">{g.required}</td>
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
