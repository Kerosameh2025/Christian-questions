import { motion } from "framer-motion";
import { Trophy, RotateCcw, Home, Star } from "lucide-react";
import CrossIcon from "./CrossIcon";
import Footer from "./Footer";
import ThemeToggle from "./ThemeToggle";

interface QuizEndProps {
  correct: number;
  incorrect: number;
  total: number;
  onPlayAgain: () => void;
  onHome: () => void;
}

const QuizEnd = ({ correct, incorrect, total, onPlayAgain, onHome }: QuizEndProps) => {
  const percentage = total > 0 ? Math.round((correct / total) * 100) : 0;
  const getMessage = () => {
    if (percentage >= 90) return "ممتاز! أداء رائع 🌟";
    if (percentage >= 70) return "جيد جداً! أحسنت 👏";
    if (percentage >= 50) return "جيد! واصل التعلم 📖";
    return "لا تيأس! حاول مرة أخرى 💪";
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background via-background to-accent/30 relative overflow-hidden" dir="rtl">
      <ThemeToggle />

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 right-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
      </div>

      <div className="flex-1 flex items-center justify-center p-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md bg-card/80 backdrop-blur-md rounded-3xl shadow-2xl border border-border/40 p-8 text-center relative overflow-hidden"
        >
          <div className="absolute top-4 left-4 opacity-[0.04]">
            <CrossIcon size={100} animated={false} />
          </div>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring" as const, stiffness: 200 }}
            className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-secondary to-secondary/70 flex items-center justify-center shadow-lg shadow-secondary/30"
          >
            <Trophy className="w-12 h-12 text-secondary-foreground" />
          </motion.div>

          <h2 className="text-3xl font-black mb-2 text-card-foreground">انتهت المسابقة!</h2>
          <p className="text-lg text-muted-foreground mb-8">{getMessage()}</p>

          <div className="relative w-36 h-36 mx-auto mb-8">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="42" fill="none" stroke="hsl(var(--muted))" strokeWidth="6" />
              <motion.circle
                cx="50" cy="50" r="42" fill="none"
                stroke="hsl(var(--primary))"
                strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray={264}
                initial={{ strokeDashoffset: 264 }}
                animate={{ strokeDashoffset: 264 - (264 * percentage) / 100 }}
                transition={{ duration: 1.5, delay: 0.5 }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-4xl font-black text-card-foreground">{percentage}%</span>
            </div>
          </div>

          <div className="flex justify-center gap-4 mb-8">
            <div className="text-center bg-success/10 px-5 py-3 rounded-2xl flex-1">
              <div className="flex items-center justify-center gap-1 text-success font-bold text-xl">
                <Star className="w-5 h-5" /> {correct}
              </div>
              <div className="text-sm text-muted-foreground mt-1">صحيح</div>
            </div>
            <div className="text-center bg-muted/50 px-5 py-3 rounded-2xl flex-1">
              <div className="font-bold text-xl text-card-foreground">{total}</div>
              <div className="text-sm text-muted-foreground mt-1">إجمالي</div>
            </div>
            <div className="text-center bg-destructive/10 px-5 py-3 rounded-2xl flex-1">
              <div className="font-bold text-xl text-destructive">{incorrect}</div>
              <div className="text-sm text-muted-foreground mt-1">خطأ</div>
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={onPlayAgain}
              className="w-full flex items-center justify-center gap-2 p-4 rounded-2xl bg-gradient-to-l from-primary to-primary/80 text-primary-foreground font-bold shadow-lg shadow-primary/20 hover:shadow-xl transition-all duration-200 active:scale-[0.98]"
            >
              <RotateCcw className="w-5 h-5" />
              العب مرة أخرى
            </button>
            <button
              onClick={onHome}
              className="w-full flex items-center justify-center gap-2 p-4 rounded-2xl border-2 border-border text-foreground font-bold hover:bg-accent transition-all duration-200 active:scale-[0.98]"
            >
              <Home className="w-5 h-5" />
              الصفحة الرئيسية
            </button>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default QuizEnd;
