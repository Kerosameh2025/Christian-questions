import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, ListChecks, ArrowLeft, ArrowRight, RotateCcw, CheckCircle2, XCircle, Home } from "lucide-react";
import { QuizQuestion } from "@/types/quiz";
import { fisherYatesShuffle, generateDistractors, truncateAnswer } from "@/utils/shuffle";
import ThemeToggle from "./ThemeToggle";

interface QuizCardProps {
  question: QuizQuestion;
  allAnswersInSection: string[];
  currentIndex: number;
  totalQuestions: number;
  correctCount: number;
  incorrectCount: number;
  onAnswer: (correct: boolean) => void;
  onNext: () => void;
  onPrev: () => void;
  canGoPrev: boolean;
  onReset: () => void;
  onHome: () => void;
}

const QuizCard = ({
  question,
  allAnswersInSection,
  currentIndex,
  totalQuestions,
  correctCount,
  incorrectCount,
  onAnswer,
  onNext,
  onPrev,
  canGoPrev,
  onReset,
  onHome,
}: QuizCardProps) => {
  const [showOptions, setShowOptions] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [options, setOptions] = useState<string[]>([]);
  const [answered, setAnswered] = useState(false);

  const correctTruncated = truncateAnswer(question.answer);

  const handleShowOptions = () => {
    const distractors = generateDistractors(correctTruncated, allAnswersInSection.map(a => truncateAnswer(a)));
    const allOptions = fisherYatesShuffle([correctTruncated, ...distractors]);
    setOptions(allOptions);
    setShowOptions(true);
  };

  const handleShowAnswer = () => {
    setShowAnswer(true);
    setAnswered(true);
  };

  const handleSelectOption = (option: string) => {
    if (answered) return;
    setSelectedOption(option);
    setAnswered(true);
    const isCorrect = option === correctTruncated;
    onAnswer(isCorrect);
  };

  const getOptionStyle = (option: string) => {
    if (!selectedOption) return "border-border/60 hover:border-primary/40 hover:bg-accent/40 hover:shadow-md";
    if (option === correctTruncated) return "border-success bg-success/10 text-success ring-2 ring-success/20";
    if (option === selectedOption) return "border-destructive bg-destructive/10 text-destructive ring-2 ring-destructive/20";
    return "border-border/30 opacity-40";
  };

  const progress = ((currentIndex + 1) / totalQuestions) * 100;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background via-background to-accent/20 relative overflow-hidden" dir="rtl">
      <ThemeToggle />

      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-5 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-5 w-80 h-80 bg-secondary/8 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/70 backdrop-blur-xl border-b border-border/40">
        <div className="max-w-2xl mx-auto px-4 py-2.5">
          {/* Top row: nav + score */}
          <div className="flex items-center justify-between mb-2">
            {/* Right side (RTL): Home + Reset */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={onHome}
                className="p-2 rounded-xl hover:bg-accent transition-all duration-200 group"
                aria-label="الصفحة الرئيسية"
              >
                <Home className="w-4.5 h-4.5 text-muted-foreground group-hover:text-primary transition-colors" />
              </button>
              <button
                onClick={onReset}
                className="p-2 rounded-xl hover:bg-accent transition-all duration-200 group"
                aria-label="إعادة المسابقة"
              >
                <RotateCcw className="w-4.5 h-4.5 text-muted-foreground group-hover:text-primary transition-colors" />
              </button>
            </div>

            {/* Center: Score badges */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 bg-success/10 text-success px-3 py-1 rounded-full text-sm font-bold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{correctCount}</span>
              </div>
              <div className="text-xs text-muted-foreground font-medium">
                {currentIndex + 1}/{totalQuestions}
              </div>
              <div className="flex items-center gap-1.5 bg-destructive/10 text-destructive px-3 py-1 rounded-full text-sm font-bold">
                <XCircle className="w-3.5 h-3.5" />
                <span>{incorrectCount}</span>
              </div>
            </div>

            {/* Left side (RTL): Section badge */}
            <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full border border-primary/15 max-w-[120px] truncate">
              {question.section}
            </span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="h-1 bg-muted/40">
          <motion.div
            className="h-full bg-gradient-to-l from-primary via-primary/80 to-secondary/60 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-start justify-center p-4 pt-6 sm:pt-8 relative z-10">
        <motion.div
          key={question.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-2xl"
        >
          {/* Question Card */}
          <div className="bg-card/80 backdrop-blur-md rounded-3xl shadow-2xl border border-border/30 p-6 sm:p-8 mb-6 relative overflow-hidden">
            {/* Subtle decorative cross watermark */}
            <div className="absolute -top-2 -left-2 opacity-[0.03] rotate-12">
              <svg width="120" height="120" viewBox="0 0 64 64" fill="none">
                <rect x="26" y="6" width="12" height="52" rx="3" fill="currentColor" />
                <rect x="14" y="18" width="36" height="12" rx="3" fill="currentColor" />
              </svg>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold leading-[1.8] text-card-foreground relative z-10">
              {question.question}
            </h2>
          </div>

          {/* Action Buttons */}
          <AnimatePresence mode="wait">
            {!showOptions && !showAnswer && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex gap-3 mb-6"
              >
                <button
                  onClick={handleShowOptions}
                  className="flex-1 flex items-center justify-center gap-2 p-4 rounded-2xl bg-gradient-to-l from-primary to-primary/80 text-primary-foreground font-bold shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all duration-200 active:scale-[0.98]"
                >
                  <ListChecks className="w-5 h-5" />
                  عرض الاختيارات
                </button>
                <button
                  onClick={handleShowAnswer}
                  className="flex-1 flex items-center justify-center gap-2 p-4 rounded-2xl bg-secondary text-secondary-foreground font-bold shadow-lg shadow-secondary/20 hover:shadow-xl hover:shadow-secondary/30 transition-all duration-200 active:scale-[0.98]"
                >
                  <Eye className="w-5 h-5" />
                  عرض الإجابة
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Options */}
          <AnimatePresence>
            {showOptions && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="space-y-3 mb-6"
              >
                {options.map((option, i) => (
                  <motion.button
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                    whileTap={!answered ? { scale: 0.98 } : {}}
                    onClick={() => handleSelectOption(option)}
                    disabled={answered}
                    className={`w-full text-right p-4 rounded-2xl border-2 font-medium transition-all duration-300 ${getOptionStyle(option)}`}
                  >
                    {option}
                  </motion.button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Direct Answer */}
          <AnimatePresence>
            {showAnswer && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-success/10 border-2 border-success/20 rounded-2xl p-5 sm:p-7 mb-6 shadow-lg"
              >
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-success shrink-0 mt-1" />
                  <p className="text-base sm:text-lg leading-[1.8] font-medium text-foreground">
                    {question.answer}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation Buttons */}
          <AnimatePresence>
            {answered && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex gap-3"
              >
                {canGoPrev && (
                  <button
                    onClick={onPrev}
                    className="flex items-center justify-center gap-2 px-5 py-4 rounded-2xl border-2 border-border text-foreground font-bold hover:bg-accent transition-all duration-200"
                  >
                    <ArrowRight className="w-5 h-5" />
                    السابق
                  </button>
                )}
                <button
                  onClick={onNext}
                  className="flex-1 flex items-center justify-center gap-2 p-4 rounded-2xl bg-gradient-to-l from-primary to-primary/80 text-primary-foreground font-bold text-lg shadow-lg shadow-primary/20 hover:shadow-xl transition-all duration-200"
                >
                  السؤال التالي
                  <ArrowLeft className="w-5 h-5" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Back button when not answered */}
          {!answered && canGoPrev && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={onPrev}
              className="mt-4 flex items-center justify-center gap-2 mx-auto px-6 py-3 rounded-2xl text-muted-foreground hover:text-foreground hover:bg-accent/60 transition-all duration-200 font-medium"
            >
              <ArrowRight className="w-4 h-4" />
              الرجوع للسؤال السابق
            </motion.button>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default QuizCard;
