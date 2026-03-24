import { motion } from "framer-motion";

interface CrossIconProps {
  size?: number;
  className?: string;
  animated?: boolean;
}

const CrossIcon = ({ size = 48, className = "", animated = true }: CrossIconProps) => {
  const Wrapper = animated ? motion.div : "div";
  const animProps = animated
    ? {
        initial: { opacity: 0, scale: 0, rotate: -30 },
        animate: { opacity: 1, scale: 1, rotate: 0 },
        transition: { delay: 0.1, type: "spring" as const, stiffness: 180, damping: 15 },
      }
    : {};

  return (
    <Wrapper className={className} {...animProps}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="crossGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--secondary))" />
            <stop offset="100%" stopColor="hsl(var(--secondary) / 0.7)" />
          </linearGradient>
        </defs>
        {/* Vertical beam */}
        <rect x="26" y="6" width="12" height="52" rx="3" fill="url(#crossGrad)" />
        {/* Horizontal beam */}
        <rect x="14" y="18" width="36" height="12" rx="3" fill="url(#crossGrad)" />
        {/* Shine */}
        <rect x="28" y="8" width="4" height="48" rx="2" fill="hsl(var(--secondary) / 0.3)" />
        <rect x="16" y="20" width="32" height="4" rx="2" fill="hsl(var(--secondary) / 0.3)" />
      </svg>
    </Wrapper>
  );
};

export default CrossIcon;
