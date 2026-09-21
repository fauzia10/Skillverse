import React, { useState, useEffect } from "react";
import { CheckCircle2, XCircle, Award, Sparkles, ChevronRight, ChevronLeft, RotateCcw, BadgeCheck } from "lucide-react";
import { Modal } from "../common/Modal";
import { PrimaryButton, SecondaryButton } from "../common/FormControls";
import { getQuestionsForSkill, getSkillIcon } from "../../data/mockData";

export function AssessmentModal({ open, onClose, skill, onComplete }) {
  const [questions, setQuestions] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showReview, setShowReview] = useState(false);

  useEffect(() => {
    if (skill && open) {
      const qList = getQuestionsForSkill(skill.name);
      setQuestions(qList);
      setCurrentIdx(0);
      setAnswers({});
      setIsSubmitted(false);
      setShowReview(false);
    }
  }, [skill, open]);

  if (!skill) return null;

  const SkillIcon = getSkillIcon(skill.name);
  const currentQ = questions[currentIdx];
  const totalQuestions = questions.length;
  const answeredCount = Object.keys(answers).length;

  const handleSelectOption = (optionIdx) => {
    if (isSubmitted) return;
    setAnswers((prev) => ({
      ...prev,
      [currentIdx]: optionIdx,
    }));
  };

  // Calculate score
  let correctCount = 0;
  questions.forEach((q, idx) => {
    if (answers[idx] === q.correct) {
      correctCount++;
    }
  });
  const scorePercent = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;
  const isPassed = scorePercent >= 75; // 75% threshold (3 out of 4)

  const handleSubmit = () => {
    setIsSubmitted(true);
  };

  const handleFinishAndVerify = () => {
    if (isPassed) {
      onComplete?.({
        skillId: skill.id,
        skillName: skill.name,
        passed: true,
        score: scorePercent,
      });
    }
    onClose();
  };

  const handleRetry = () => {
    setAnswers({});
    setCurrentIdx(0);
    setIsSubmitted(false);
    setShowReview(false);
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={`${skill.name} Skill Assessment`}
      wide={true}
    >
      {!isSubmitted ? (
        <div className="space-y-6">
          {/* Header Progress */}
          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#182030] border border-[#232F47]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#0D2D3E] border border-[#164863] flex items-center justify-center">
                <SkillIcon size={20} className="text-[#00C0F3]" />
              </div>
              <div>
                <p className="text-sm font-bold text-[#F1F5F9]">{skill.name} Proficiency Test</p>
                <p className="text-xs text-[#94A3B8]">Level: {skill.level} · Passing Score: 75%</p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#131824] border border-[#232F47] text-[#F1F5F9]">
                Question {currentIdx + 1} of {totalQuestions}
              </span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-[#1F293D] h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-[#00C0F3] h-full transition-all duration-300"
              style={{ width: `${((currentIdx + 1) / totalQuestions) * 100}%` }}
            />
          </div>

          {/* Question Body */}
          {currentQ && (
            <div className="space-y-4">
              <h4 className="text-base font-semibold text-[#F1F5F9] leading-relaxed">
                {currentQ.question}
              </h4>

              <div className="space-y-2.5">
                {currentQ.options.map((option, idx) => {
                  const isSelected = answers[currentIdx] === idx;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSelectOption(idx)}
                      className={`w-full text-left p-4 rounded-xl border text-sm transition-all flex items-start gap-3 ${
                        isSelected
                          ? "border-[#00C0F3] bg-[#0D2D3E] text-[#F1F5F9] font-medium shadow-xs ring-1 ring-[#00C0F3]"
                          : "border-[#232F47] bg-[#131824] hover:bg-[#182030] text-[#F1F5F9]"
                      }`}
                    >
                      <span
                        className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${
                          isSelected
                            ? "bg-[#00C0F3] text-[#0A0D14]"
                            : "border border-[#64748B] text-[#94A3B8]"
                        }`}
                      >
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span className="flex-1">{option}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Action Navigation */}
          <div className="flex items-center justify-between pt-4 border-t border-[#232F47]">
            <SecondaryButton
              onClick={() => setCurrentIdx((p) => Math.max(0, p - 1))}
              disabled={currentIdx === 0}
              className={currentIdx === 0 ? "opacity-50 cursor-not-allowed" : ""}
            >
              <ChevronLeft size={16} /> Previous
            </SecondaryButton>

            <div className="flex gap-2">
              {currentIdx < totalQuestions - 1 ? (
                <PrimaryButton
                  onClick={() => setCurrentIdx((p) => Math.min(totalQuestions - 1, p + 1))}
                  disabled={answers[currentIdx] === undefined}
                >
                  Next <ChevronRight size={16} />
                </PrimaryButton>
              ) : (
                <PrimaryButton
                  onClick={handleSubmit}
                  disabled={answeredCount < totalQuestions}
                  className="!bg-[#10B981] !text-[#0A0D14] hover:!bg-[#34D399]"
                >
                  Submit Assessment <BadgeCheck size={16} />
                </PrimaryButton>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* Results Screen */
        <div className="space-y-6 text-center py-4">
          <div className="mx-auto w-16 h-16 rounded-full flex items-center justify-center shadow-lg animate-[tabPop_0.3s_ease]">
            {isPassed ? (
              <div className="w-16 h-16 rounded-full bg-[#062E23] border-2 border-[#0F5132] flex items-center justify-center text-[#10B981]">
                <BadgeCheck size={36} />
              </div>
            ) : (
              <div className="w-16 h-16 rounded-full bg-[#36121C] border-2 border-[#541B2C] flex items-center justify-center text-[#FB7185]">
                <RotateCcw size={32} />
              </div>
            )}
          </div>

          <div>
            <span
              className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2 ${
                isPassed
                  ? "bg-[#062E23] text-[#10B981] border border-[#0F5132]"
                  : "bg-[#36121C] text-[#FB7185] border border-[#541B2C]"
              }`}
            >
              {isPassed ? "Assessment Passed 🎉" : "Assessment Not Passed"}
            </span>
            <h3 className="text-2xl font-extrabold text-[#F1F5F9] font-display">
              {isPassed ? `Verified: ${skill.name} Badge Earned!` : "Keep Practicing!"}
            </h3>
            <p className="text-sm text-[#94A3B8] max-w-md mx-auto mt-1">
              {isPassed
                ? `Congratulations! You scored ${scorePercent}% (${correctCount}/${totalQuestions} correct) and met the verified proficiency criteria.`
                : `You scored ${scorePercent}% (${correctCount}/${totalQuestions} correct). A minimum score of 75% is required to earn the verified badge.`}
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 max-w-sm mx-auto p-4 rounded-2xl bg-[#182030] border border-[#232F47]">
            <div>
              <p className="text-xs text-[#94A3B8]">Total Questions</p>
              <p className="text-lg font-bold text-[#F1F5F9]">{totalQuestions}</p>
            </div>
            <div>
              <p className="text-xs text-[#94A3B8]">Correct Answers</p>
              <p className="text-lg font-bold text-[#10B981]">{correctCount}</p>
            </div>
            <div>
              <p className="text-xs text-[#94A3B8]">Final Score</p>
              <p className={`text-lg font-bold ${isPassed ? "text-[#10B981]" : "text-[#FB7185]"}`}>
                {scorePercent}%
              </p>
            </div>
          </div>

          {/* Toggle Answers Review */}
          <div>
            <button
              onClick={() => setShowReview((prev) => !prev)}
              className="text-xs font-semibold text-[#00C0F3] hover:underline"
            >
              {showReview ? "Hide Question Breakdown ▲" : "View Answers & Explanations ▼"}
            </button>
          </div>

          {showReview && (
            <div className="space-y-4 text-left border-t border-[#232F47] pt-4 max-h-60 overflow-y-auto">
              {questions.map((q, idx) => {
                const isUserCorrect = answers[idx] === q.correct;
                return (
                  <div
                    key={q.id}
                    className={`p-4 rounded-xl border text-xs ${
                      isUserCorrect
                        ? "bg-[#062E23]/40 border-[#0F5132]"
                        : "bg-[#36121C]/40 border-[#541B2C]"
                    }`}
                  >
                    <div className="flex items-start gap-2 mb-2 font-semibold text-[#F1F5F9]">
                      {isUserCorrect ? (
                        <CheckCircle2 size={16} className="text-[#10B981] shrink-0 mt-0.5" />
                      ) : (
                        <XCircle size={16} className="text-[#FB7185] shrink-0 mt-0.5" />
                      )}
                      <span>
                        {idx + 1}. {q.question}
                      </span>
                    </div>
                    <div className="space-y-1 pl-6">
                      <p className="text-[#94A3B8]">
                        <span className="font-semibold text-[#F1F5F9]">Your answer:</span>{" "}
                        {q.options[answers[idx]] || "No answer"}
                      </p>
                      {!isUserCorrect && (
                        <p className="text-[#10B981] font-semibold">
                          <span>Correct answer:</span> {q.options[q.correct]}
                        </p>
                      )}
                      <p className="text-[#94A3B8] italic pt-1 border-t border-[#232F47]">
                        {q.explanation}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Modal Actions */}
          <div className="flex gap-3 justify-center pt-2">
            {isPassed ? (
              <PrimaryButton onClick={handleFinishAndVerify} className="w-full max-w-xs">
                Claim Verified Badge <Award size={16} />
              </PrimaryButton>
            ) : (
              <>
                <PrimaryButton onClick={handleRetry} className="flex-1 max-w-xs">
                  <RotateCcw size={15} /> Retake Test
                </PrimaryButton>
                <SecondaryButton onClick={onClose} className="flex-1 max-w-xs">
                  Close
                </SecondaryButton>
              </>
            )}
          </div>
        </div>
      )}
    </Modal>
  );
}

export default AssessmentModal;
