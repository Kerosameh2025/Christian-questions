import { motion } from "framer-motion";
import {
  Shuffle, Sparkles, BookOpen, Users,
  Wind, Flame, Ear, Church, Heart,
  Baby, Crown, Droplets, HandHeart, UserCheck,
  Star, RotateCcw, Cross, Sunrise, Eye,
  Scroll, Shield, Sword, Gem
} from "lucide-react";
import { QuizMode } from "@/types/quiz";
import CrossIcon from "./CrossIcon";
import Footer from "./Footer";
import ThemeToggle from "./ThemeToggle";

interface HomeScreenProps {
  sections: string[];
  onStart: (mode: QuizMode, section?: string) => void;
}

const sectionConfig: Record<string, { icon: React.ElementType; gradient: string; iconColor: string }> = {
  "أوليات في الكتاب المقدس": {
    icon: Star,
    gradient: "from-amber-500/15 to-amber-500/5 border-amber-500/25 hover:border-amber-500/50 hover:shadow-amber-500/10",
    iconColor: "text-amber-500",
  },
  "شخصيات وأحداث متنوعة": {
    icon: Users,
    gradient: "from-violet-500/15 to-violet-500/5 border-violet-500/25 hover:border-violet-500/50 hover:shadow-violet-500/10",
    iconColor: "text-violet-500",
  },
  "الرسل الاثنا عشر": {
    icon: Cross,
    gradient: "from-blue-600/15 to-blue-600/5 border-blue-600/25 hover:border-blue-600/50 hover:shadow-blue-600/10",
    iconColor: "text-blue-600",
  },
  "معاونو بولس الرسول وتلاميذه": {
    icon: UserCheck,
    gradient: "from-teal-500/15 to-teal-500/5 border-teal-500/25 hover:border-teal-500/50 hover:shadow-teal-500/10",
    iconColor: "text-teal-500",
  },
  "الروح القدس": {
    icon: Flame,
    gradient: "from-orange-500/15 to-orange-500/5 border-orange-500/25 hover:border-orange-500/50 hover:shadow-orange-500/10",
    iconColor: "text-orange-500",
  },
  "الصوم وطرق تكلم الله": {
    icon: Ear,
    gradient: "from-emerald-500/15 to-emerald-500/5 border-emerald-500/25 hover:border-emerald-500/50 hover:shadow-emerald-500/10",
    iconColor: "text-emerald-500",
  },
  "ظهورات المسيح بعد القيامة": {
    icon: Sunrise,
    gradient: "from-yellow-500/15 to-yellow-500/5 border-yellow-500/25 hover:border-yellow-500/50 hover:shadow-yellow-500/10",
    iconColor: "text-yellow-500",
  },
  "النساء في الكتاب المقدس": {
    icon: Heart,
    gradient: "from-pink-500/15 to-pink-500/5 border-pink-500/25 hover:border-pink-500/50 hover:shadow-pink-500/10",
    iconColor: "text-pink-500",
  },
  "الأطفال في الكتاب المقدس": {
    icon: Baby,
    gradient: "from-sky-500/15 to-sky-500/5 border-sky-500/25 hover:border-sky-500/50 hover:shadow-sky-500/10",
    iconColor: "text-sky-500",
  },
  "الملوك والأنبياء": {
    icon: Crown,
    gradient: "from-amber-600/15 to-amber-600/5 border-amber-600/25 hover:border-amber-600/50 hover:shadow-amber-600/10",
    iconColor: "text-amber-600",
  },
  "الأسرار الكنسية والشعائر": {
    icon: Droplets,
    gradient: "from-indigo-500/15 to-indigo-500/5 border-indigo-500/25 hover:border-indigo-500/50 hover:shadow-indigo-500/10",
    iconColor: "text-indigo-500",
  },
  "العمل والعطاء": {
    icon: HandHeart,
    gradient: "from-rose-500/15 to-rose-500/5 border-rose-500/25 hover:border-rose-500/50 hover:shadow-rose-500/10",
    iconColor: "text-rose-500",
  },
  "لاهوت المسيح وسلطانه": {
    icon: Shield,
    gradient: "from-primary/15 to-primary/5 border-primary/25 hover:border-primary/50 hover:shadow-primary/10",
    iconColor: "text-primary",
  },
  "الخطية وعواقبها": {
    icon: RotateCcw,
    gradient: "from-red-500/15 to-red-500/5 border-red-500/25 hover:border-red-500/50 hover:shadow-red-500/10",
    iconColor: "text-red-500",
  },
};

const defaultConfig = {
  icon: BookOpen,
  gradient: "from-muted to-muted/50 border-border hover:border-primary/30",
  iconColor: "text-primary",
};

const HomeScreen = ({ sections, onStart }: HomeScreenProps) => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background via-background to-accent/30 relative overflow-hidden" dir="rtl">
      <ThemeToggle />

      {/* Decorative background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-10 right-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-primary/3 rounded-full blur-2xl" />
      </div>

      <div className="flex-1 flex flex-col items-center justify-start p-4 pt-8 sm:pt-12 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 w-full max-w-4xl"
        >
          <CrossIcon size={72} className="mx-auto mb-5" />
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-4xl sm:text-5xl font-black text-foreground mb-3"
          >
            مسابقة مسيحية
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-muted-foreground text-lg flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-secondary" />
            اختبر معلوماتك الكتابية والدينية
            <Sparkles className="w-4 h-4 text-secondary" />
          </motion.p>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="w-full max-w-4xl"
        >
          {/* Mixed Mode Button */}
          <motion.button
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onStart("mixed")}
            className="w-full flex items-center gap-4 p-5 sm:p-6 rounded-2xl bg-gradient-to-l from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/35 transition-all duration-300 mb-8"
          >
            <div className="w-14 h-14 rounded-xl bg-primary-foreground/15 flex items-center justify-center shrink-0">
              <Shuffle className="w-7 h-7" />
            </div>
            <div className="text-right flex-1">
              <div className="font-bold text-xl">أسئلة مختلطة</div>
              <div className="text-sm opacity-80">أسئلة عشوائية من جميع الأقسام</div>
            </div>
          </motion.button>

          {/* Divider */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 h-px bg-gradient-to-l from-transparent via-border to-transparent" />
            <span className="text-sm text-muted-foreground font-semibold px-3 py-1.5 bg-muted/50 rounded-full">اختر قسماً</span>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
          </div>

          {/* Section Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 mb-8">
            {sections.map((section, i) => {
              const config = sectionConfig[section] || defaultConfig;
              const Icon = config.icon;
              return (
                <motion.button
                  key={section}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + i * 0.04 }}
                  whileHover={{ scale: 1.05, y: -4 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => onStart("section", section)}
                  className={`flex flex-col items-center justify-center gap-3 p-4 sm:p-5 rounded-2xl border-2 bg-gradient-to-br transition-all duration-300 hover:shadow-xl group ${config.gradient}`}
                >
                  <div className={`w-12 h-12 rounded-2xl bg-card/90 dark:bg-card/60 flex items-center justify-center shadow-sm group-hover:shadow-md group-hover:scale-110 transition-all duration-300`}>
                    <Icon className={`w-6 h-6 ${config.iconColor}`} />
                  </div>
                  <span className="font-bold text-foreground text-xs sm:text-sm text-center leading-tight line-clamp-2">
                    {section}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default HomeScreen;
