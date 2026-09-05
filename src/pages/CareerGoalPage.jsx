import React, { useState } from "react";
import { Card } from "../components/common/Card";
import { SectionHeading } from "../components/common/SectionHeading";
import { SelectField, PrimaryButton } from "../components/common/FormControls";
import { CAREER_OPTIONS } from "../data/mockData";
import { Target, Sparkles } from "lucide-react";

export function CareerGoalPage({ profile, setProfile, showToast }) {
  const [goal, setGoal] = useState(profile.careerGoal);

  return (
    <Card className="p-6 sm:p-8 max-w-xl">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-11 h-11 rounded-2xl bg-[#DDF5F2] border border-[#A5E3DC] flex items-center justify-center text-[#0C453E] shadow-sm">
          <Target size={22} />
        </div>
        <div>
          <h2 className="text-xl font-black text-[#111827] font-display">Target Career Objective</h2>
          <p className="text-xs text-[#64748B]">Personalized benchmarks and career readiness trajectory</p>
        </div>
      </div>

      <p className="text-xs sm:text-sm text-[#64748B] mb-5 leading-relaxed">
        Your target career dynamically shapes your verified Skill-Gap analysis, recommended coursework, and candidate readiness score for recruiters.
      </p>

      <SelectField label="Target career" options={CAREER_OPTIONS} value={goal} onChange={(e) => setGoal(e.target.value)} />

      <PrimaryButton
        onClick={() => {
          setProfile({ ...profile, careerGoal: goal });
          showToast("Career goal updated successfully.");
        }}
        className="mt-2"
      >
        Save Career Objective
      </PrimaryButton>
    </Card>
  );
}

export default CareerGoalPage;
