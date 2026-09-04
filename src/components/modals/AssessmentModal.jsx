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
          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#FAF8F9] border border-[#E9E2E5]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#FCEBEF] border border-[#F5CAD3] flex items-center justify-center">
                <SkillIcon size={20} className="text-[#BA203B]" />
              </div>
              <div>
                <p className="text-sm font-bold text-[#101218]">{skill.name} Proficiency Test</p>
                <p className="text-xs text-[#707584]">Level: {skill.level} · Passing Score: 75%</p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-white border border-[#E9E2E5] text-[#101218]">
                Question {currentIdx + 1} of {totalQuestions}
              </span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-[#E9E2E5] h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-[#BA203B] h-full transition-all duration-300"
              style={{ width: `${((currentIdx + 1) / totalQuestions) * 100}%` }}
            />
          </div>

          {/* Question Body */}
          {currentQ && (
            <div className="space-y-4">
              <h4 className="text-base font-semibold text-[#101218] leading-relaxed">
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
                          ? "border-[#BA203B] bg-[#FCEBEF]/60 text-[#101218] font-medium shadow-xs ring-1 ring-[#BA203B]"
                          : "border-[#E9E2E5] bg-white hover:bg-[#FAF8F9] text-[#101218]"
                      }`}
                    >
                      <span
                        className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${
                          isSelected
                            ? "bg-[#BA203B] text-white"
                            : "border border-[#A0A6B5] text-[#707584]"
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
          <div className="flex items-center justify-between pt-4 border-t border-[#E9E2E5]">
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
                  className="!bg-gradient-to-r !from-[#1B7352] !to-[#14573E]"
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
              <div className="w-16 h-16 rounded-full bg-[#E8F7F1] border-2 border-[#C6EFE0] flex items-center justify-center text-[#1B7352]">
                <BadgeCheck size={36} />
              </div>
            ) : (
              <div className="w-16 h-16 rounded-full bg-[#FCEBEF] border-2 border-[#F5CAD3] flex items-center justify-center text-[#BA203B]">
                <RotateCcw size={32} />
              </div>
            )}
          </div>

          <div>
            <span
              className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2 ${
                isPassed
                  ? "bg-[#E8F7F1] text-[#1B7352] border border-[#C6EFE0]"
                  : "bg-[#FCEBEF] text-[#BA203B] border border-[#F5CAD3]"
              }`}
            >
              {isPassed ? "Assessment Passed 🎉" : "Assessment Not Passed"}
            </span>
            <h3 className="text-2xl font-extrabold text-[#101218] font-display">
              {isPassed ? `Verified: ${skill.name} Badge Earned!` : "Keep Practicing!"}
            </h3>
            <p className="text-sm text-[#707584] max-w-md mx-auto mt-1">
              {isPassed
                ? `Congratulations! You scored ${scorePercent}% (${correctCount}/${totalQuestions} correct) and met the verified proficiency criteria.`
                : `You scored ${scorePercent}% (${correctCount}/${totalQuestions} correct). A minimum score of 75% is required to earn the verified badge.`}
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 max-w-sm mx-auto p-4 rounded-2xl bg-[#FAF8F9] border border-[#E9E2E5]">
            <div>
              <p className="text-xs text-[#707584]">Total Questions</p>
              <p className="text-lg font-bold text-[#101218]">{totalQuestions}</p>
            </div>
            <div>
              <p className="text-xs text-[#707584]">Correct Answers</p>
              <p className="text-lg font-bold text-[#1B7352]">{correctCount}</p>
            </div>
            <div>
              <p className="text-xs text-[#707584]">Final Score</p>
              <p className={`text-lg font-bold ${isPassed ? "text-[#1B7352]" : "text-[#BA203B]"}`}>
                {scorePercent}%
              </p>
            </div>
          </div>

          {/* Toggle Answers Review */}
          <div>
            <button
              onClick={() => setShowReview((prev) => !prev)}
              className="text-xs font-semibold text-[#BA203B] hover:underline"
            >
              {showReview ? "Hide Question Breakdown ▲" : "View Answers & Explanations ▼"}
            </button>
          </div>

          {showReview && (
            <div className="space-y-4 text-left border-t border-[#E9E2E5] pt-4 max-h-60 overflow-y-auto">
              {questions.map((q, idx) => {
                const isUserCorrect = answers[idx] === q.correct;
                return (
                  <div
                    key={q.id}
                    className={`p-4 rounded-xl border text-xs ${
                      isUserCorrect
                        ? "bg-[#E8F7F1]/40 border-[#C6EFE0]"
                        : "bg-[#FCEBEF]/40 border-[#F5CAD3]"
                    }`}
                  >
                    <div className="flex items-start gap-2 mb-2 font-semibold text-[#101218]">
                      {isUserCorrect ? (
                        <CheckCircle2 size={16} className="text-[#1B7352] shrink-0 mt-0.5" />
                      ) : (
                        <XCircle size={16} className="text-[#BA203B] shrink-0 mt-0.5" />
                      )}
                      <span>
                        {idx + 1}. {q.question}
                      </span>
                    </div>
                    <div className="space-y-1 pl-6">
                      <p className="text-[#707584]">
                        <span className="font-semibold text-[#101218]">Your answer:</span>{" "}
                        {q.options[answers[idx]] || "No answer"}
                      </p>
                      {!isUserCorrect && (
                        <p className="text-[#1B7352] font-semibold">
                          <span>Correct answer:</span> {q.options[q.correct]}
                        </p>
                      )}
                      <p className="text-[#707584] italic pt-1 border-t border-[#E9E2E5]/60">
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
