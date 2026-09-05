import React from "react";
import { ArrowRight, TrendingUp } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Card } from "../components/common/Card";
import { SectionHeading } from "../components/common/SectionHeading";
import { LevelBadge } from "../components/common/Badges";
import { PROGRESS_DATA, BADGE_PROGRESSION } from "../data/mockData";

export function ProgressPage() {
  return (
    <div className="space-y-6 max-w-4xl">
      <Card className="p-6 sm:p-8">
        <SectionHeading title="Growth & Milestone Trajectory" />
        <div className="h-64" role="img" aria-label="Line chart showing career readiness score rising from 61% in September to 81% in March">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={PROGRESS_DATA} margin={{ top: 5, right: 20, left: -10, bottom: 0 }}>
              <CartesianGrid stroke="#EEF4F7" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#64748B" }} axisLine={{ stroke: "#E2EBF0" }} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#64748B" }} axisLine={false} tickLine={false} domain={[40, 100]} />
              <Tooltip contentStyle={{ borderRadius: 16, border: "1px solid #E2EBF0", boxShadow: "0 8px 24px rgba(20,40,60,0.06)" }} />
              <Line type="monotone" dataKey="score" stroke="#111827" strokeWidth={3} dot={{ fill: "#111827", r: 5, stroke: "#FFFFFF", strokeWidth: 2 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-3 p-3 rounded-2xl bg-[#EDF9D4] border border-[#D5F29B] inline-flex items-center gap-2">
          <TrendingUp size={16} className="text-[#2E4D0C]" />
          <p className="text-xs text-[#2E4D0C] font-bold">Your readiness score has improved by +21% over the last 6 months.</p>
        </div>
      </Card>

      <Card className="p-6 sm:p-8">
        <SectionHeading title="Badge & Skill Progression" />
        <div className="space-y-3">
          {BADGE_PROGRESSION.map((b) => (
            <div key={b.skill} className="flex items-center justify-between p-4 rounded-3xl bg-[#F4F8FA] border border-[#E2EBF0]">
              <span className="text-sm font-bold text-[#111827] font-display">{b.skill}</span>
              <div className="flex items-center gap-2 text-xs">
                <LevelBadge level={b.from} />
                <ArrowRight size={14} className="text-[#64748B]" />
                <LevelBadge level={b.to} />
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

export default ProgressPage;
