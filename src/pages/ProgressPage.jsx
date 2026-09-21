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
              <CartesianGrid stroke="#1F293D" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={{ stroke: "#1F293D" }} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} domain={[40, 100]} />
              <Tooltip contentStyle={{ borderRadius: 16, backgroundColor: "#131824", borderColor: "#1F293D", color: "#F1F5F9", boxShadow: "0 8px 24px rgba(0,0,0,0.5)" }} itemStyle={{ color: "#00C0F3", fontWeight: 700 }} />
              <Line type="monotone" dataKey="score" stroke="#00C0F3" strokeWidth={3} dot={{ fill: "#00C0F3", r: 5, stroke: "#131824", strokeWidth: 2 }} activeDot={{ r: 7, fill: "#A3E635", stroke: "#131824", strokeWidth: 2 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-3 p-3 rounded-2xl bg-[#10B981]/10 border border-[#10B981]/30 inline-flex items-center gap-2">
          <TrendingUp size={16} className="text-[#10B981]" />
          <p className="text-xs text-[#10B981] font-bold">Your readiness score has improved by +21% over the last 6 months.</p>
        </div>
      </Card>

      <Card className="p-6 sm:p-8">
        <SectionHeading title="Badge & Skill Progression" />
        <div className="space-y-3">
          {BADGE_PROGRESSION.map((b) => (
            <div key={b.skill} className="flex items-center justify-between p-4 rounded-3xl bg-[#182030] border border-[#1F293D]">
              <span className="text-sm font-bold text-[#F1F5F9] font-display">{b.skill}</span>
              <div className="flex items-center gap-2 text-xs">
                <LevelBadge level={b.from} />
                <ArrowRight size={14} className="text-[#94A3B8]" />
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
