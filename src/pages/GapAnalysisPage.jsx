import React from "react";
import { Card } from "../components/common/Card";
import { SectionHeading } from "../components/common/SectionHeading";
import { CircularProgress, ProgressBar } from "../components/common/Progress";
import { PriorityBadge } from "../components/common/Badges";
import { GAP_DATA, gapPriority } from "../data/mockData";

export function GapAnalysisPage({ careerGoal }) {
  return (
    <div className="space-y-6">
      <Card className="p-6 sm:p-8">
        <SectionHeading title={`Career Readiness — ${careerGoal}`} />
        <div className="flex flex-col sm:flex-row items-center gap-6 mb-6">
          <CircularProgress value={72} size={120} label="Ready" />
          <div className="flex-1 space-y-3 w-full">
            {[
              { label: "Academic", value: 78 },
              { label: "Technical Skills", value: 65 },
              { label: "Soft Skills", value: 74 },
              { label: "Practical Experience", value: 60 },
            ].map((m) => (
              <div key={m.label}>
                <div className="flex justify-between text-xs text-[#101218] mb-1">
                  <span>{m.label}</span>
                  <span className="font-semibold">{m.value}%</span>
                </div>
                <ProgressBar value={m.value} colorClass="bg-[#BA203B]" />
              </div>
            ))}
          </div>
        </div>
        <p className="text-xs text-[#707584] border-t border-[#E9E2E5] pt-4">
          This is a transparent, rule-based MVP score calculated from your verified skills, coursework, projects, and benchmarks.
        </p>
      </Card>

      <Card className="p-6 sm:p-8">
        <SectionHeading title="Full Skill Gap Analysis" />
        <p className="text-sm text-[#707584] mb-5">
          Levels are scored Beginner = 1, Intermediate = 2, Advanced = 3. A gap of 2+ is High priority, a gap of 1 is
          Medium, and a gap of 0 or less is Ready.
        </p>
        <div className="overflow-x-auto -mx-2">
          <table className="w-full text-sm min-w-[520px]">
            <thead>
              <tr className="text-left text-xs text-[#707584] border-b border-[#E9E2E5]">
                <th className="py-2.5 px-3 font-semibold">Skill</th>
                <th className="py-2.5 px-3 font-semibold">Current level</th>
                <th className="py-2.5 px-3 font-semibold">Required level</th>
                <th className="py-2.5 px-3 font-semibold">Priority</th>
              </tr>
            </thead>
            <tbody>
              {GAP_DATA.map((g) => (
                <tr key={g.skill} className="border-b border-[#F2ECEE] last:border-0 hover:bg-[#FAF8F9] transition-colors">
                  <td className="py-3 px-3 text-[#101218] font-semibold">{g.skill}</td>
                  <td className="py-3 px-3 text-[#707584]">{g.current}</td>
                  <td className="py-3 px-3 text-[#707584]">{g.required}</td>
                  <td className="py-3 px-3">
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
