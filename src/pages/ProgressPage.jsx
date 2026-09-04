import React from "react";
import { ArrowRight } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Card } from "../components/common/Card";
import { SectionHeading } from "../components/common/SectionHeading";
import { LevelBadge } from "../components/common/Badges";
import { PROGRESS_DATA, BADGE_PROGRESSION } from "../data/mockData";

export function ProgressPage() {
  return (
    <div className="space-y-6">
      <Card className="p-6 sm:p-8">
        <SectionHeading title="Growth Progress" />
        <div className="h-64" role="img" aria-label="Line chart showing career readiness score rising from 61% in September to 81% in March">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={PROGRESS_DATA} margin={{ top: 5, right: 20, left: -10, bottom: 0 }}>
              <CartesianGrid stroke="#F2ECEE" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#707584" }} axisLine={{ stroke: "#E9E2E5" }} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: "#707584" }} axisLine={false} tickLine={false} domain={[40, 100]} />
              <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #E9E2E5", boxShadow: "0 4px 16px rgba(0,0,0,0.06)" }} />
              <Line type="monotone" dataKey="score" stroke="#BA203B" strokeWidth={3} dot={{ fill: "#BA203B", r: 5, stroke: "#FFFFFF", strokeWidth: 2 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <p className="text-sm text-[#1B7352] font-semibold mt-2">Your readiness score has improved by 20% over the last 6 months.</p>
      </Card>

      <Card className="p-6 sm:p-8">
        <SectionHeading title="Badge & skill progression" />
        <div className="space-y-3">
          {BADGE_PROGRESSION.map((b) => (
            <div key={b.skill} className="flex items-center justify-between p-4 rounded-2xl bg-[#FAF8F9] border border-[#E9E2E5]">
              <span className="text-sm font-semibold text-[#101218]">{b.skill}</span>
              <div className="flex items-center gap-2 text-xs">
                <LevelBadge level={b.from} />
                <ArrowRight size={14} className="text-[#BA203B]" />
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
