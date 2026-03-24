import { useState, useEffect, useCallback } from "react";
import { QuizQuestion, QuizMode, GameState } from "@/types/quiz";
import { fisherYatesShuffle } from "@/utils/shuffle";
import HomeScreen from "@/components/quiz/HomeScreen";
import QuizCard from "@/components/quiz/QuizCard";
import QuizEnd from "@/components/quiz/QuizEnd";

const Index = () => {
  const [allQuestions, setAllQuestions] = useState<QuizQuestion[]>([]);
  const [gameState, setGameState] = useState<GameState>("home");
  const [activeQuestions, setActiveQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [incorrect, setIncorrect] = useState(0);
  const [sections, setSections] = useState<string[]>([]);

  useEffect(() => {
    fetch("/quiz_questions.json")
      .then((res) => res.json())
      .then((data: QuizQuestion[]) => {
        setAllQuestions(data);
        const uniqueSections = [...new Set(data.map((q) => q.section))];
        setSections(uniqueSections);
      });
  }, []);

  const startQuiz = useCallback(
    (mode: QuizMode, section?: string) => {
      let questions =
        mode === "mixed"
          ? allQuestions
          : allQuestions.filter((q) => q.section === section);
      questions = fisherYatesShuffle(questions);
      setActiveQuestions(questions);
      setCurrentIndex(0);
      setCorrect(0);
      setIncorrect(0);
      setGameState("playing");
    },
    [allQuestions]
  );

  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect) setCorrect((c) => c + 1);
    else setIncorrect((c) => c + 1);
  };

  const handleNext = () => {
    if (currentIndex + 1 >= activeQuestions.length) {
      setGameState("finished");
    } else {
      setCurrentIndex((i) => i + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((i) => i - 1);
    }
  };

  const handleReset = () => {
    setCorrect(0);
    setIncorrect(0);
    setCurrentIndex(0);
    setActiveQuestions(fisherYatesShuffle(activeQuestions));
    setGameState("playing");
  };

  const goHome = () => setGameState("home");

  if (allQuestions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const currentQuestion = activeQuestions[currentIndex];
  const sectionAnswers = currentQuestion
    ? allQuestions
        .filter((q) => q.section === currentQuestion.section)
        .map((q) => q.answer)
    : [];

  return (
    <>
      {gameState === "home" && (
        <HomeScreen sections={sections} onStart={startQuiz} />
      )}
      {gameState === "playing" && currentQuestion && (
        <QuizCard
          key={currentQuestion.id}
          question={currentQuestion}
          allAnswersInSection={sectionAnswers}
          currentIndex={currentIndex}
          totalQuestions={activeQuestions.length}
          correctCount={correct}
          incorrectCount={incorrect}
          onAnswer={handleAnswer}
          onNext={handleNext}
          onPrev={handlePrev}
          canGoPrev={currentIndex > 0}
          onReset={handleReset}
          onHome={goHome}
        />
      )}
      {gameState === "finished" && (
        <QuizEnd
          correct={correct}
          incorrect={incorrect}
          total={activeQuestions.length}
          onPlayAgain={handleReset}
          onHome={goHome}
        />
      )}
    </>
  );
};

export default Index;
