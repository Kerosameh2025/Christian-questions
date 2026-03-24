export interface QuizQuestion {
  id: number;
  section: string;
  question: string;
  type: string;
  options: string[];
  answer: string;
}

export type QuizMode = "section" | "mixed";
export type GameState = "home" | "playing" | "finished";
