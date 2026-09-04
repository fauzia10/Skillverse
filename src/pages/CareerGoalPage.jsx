import React, { useState } from "react";
import { Card } from "../components/common/Card";
import { SectionHeading } from "../components/common/SectionHeading";
import { SelectField, PrimaryButton } from "../components/common/FormControls";
import { CAREER_OPTIONS } from "../data/mockData";

export function CareerGoalPage({ profile, setProfile, showToast }) {
  const [goal, setGoal] = useState(profile.careerGoal);

  return (
    <Card className="p-6 sm:p-8 max-w-lg">
      <SectionHeading title="Career Goal" />
      <p className="text-sm text-[#738083] mb-5">Your target career shapes your Career Readiness score and skill-gap analysis.</p>
      <SelectField label="Target career" options={CAREER_OPTIONS} value={goal} onChange={(e) => setGoal(e.target.value)} />
      <PrimaryButton
        onClick={() => {
          setProfile({ ...profile, careerGoal: goal });
          showToast("Career goal updated.");
        }}
      >
        Save Career Goal
      </PrimaryButton>
    </Card>
  );
}

export default CareerGoalPage;
