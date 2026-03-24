export function fisherYatesShuffle<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function generateDistractors(
  correctAnswer: string,
  allAnswers: string[],
  count: number = 3
): string[] {
  const others = allAnswers.filter((a) => a !== correctAnswer);
  const shuffled = fisherYatesShuffle(others);
  return shuffled.slice(0, count);
}

export function truncateAnswer(answer: string, maxLen: number = 60): string {
  // Extract the key part before parenthetical references
  const clean = answer.split("(")[0].trim();
  if (clean.length <= maxLen) return clean;
  return clean.substring(0, maxLen) + "...";
}
