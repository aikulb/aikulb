import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useSpring, useInView, AnimatePresence } from 'framer-motion';
import { useAnimationAccessibility, calculateTilt } from '../utils/animationUtils';

/**
 * Top Page Scroll Progress Bar (Requirement 20)
 * 2-3px progress bar at top of website using aikulb gradient
 */
export const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#6C4CFF] via-[#8B5CF6] to-[#3B82F6] z-[100] origin-left shadow-[0_0_10px_rgba(108,76,255,0.8)] pointer-events-none"
    />
  );
};

/**
 * Scroll Reveal Wrapper (Requirement 4)
 * Triggers fade-up animation when element enters viewport (once: true)
 */
export const ScrollReveal = ({
  children,
  className = "",
  delay = 0,
  yOffset = 35,
  duration = 0.7
}) => {
  const { prefersReducedMotion } = useAnimationAccessibility();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1.0],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/**
 * Stagger Container & Items for Grid Cards (Requirement 5)
 * Card 1 -> 100ms -> Card 2 -> 100ms -> Card 3...
 */
export const StaggerContainer = ({ children, className = "", staggerDelay = 0.1 }) => {
  const { prefersReducedMotion } = useAnimationAccessibility();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-40px" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const StaggerItem = ({ children, className = "" }) => {
  const { prefersReducedMotion } = useAnimationAccessibility();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.98 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1.0],
      },
    },
  };

  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  );
};

/**
 * Mouse 3D Card Tilt Component (Requirement 8)
 * Max rotateX ±4°, rotateY ±6°. Disabled on touch/mobile and reduced motion.
 */
export const Card3DTilt = ({
  children,
  className = "",
  maxRotateX = 4,
  maxRotateY = 6,
}) => {
  const ref = useRef(null);
  const [rotate, setRotate] = useState({ rotateX: 0, rotateY: 0 });
  const { isTouchDevice, prefersReducedMotion } = useAnimationAccessibility();

  const handleMouseMove = (e) => {
    if (isTouchDevice || prefersReducedMotion) return;
    const computed = calculateTilt(e, ref.current, maxRotateX, maxRotateY);
    setRotate(computed);
  };

  const handleMouseLeave = () => {
    setRotate({ rotateX: 0, rotateY: 0 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX: rotate.rotateX,
        rotateY: rotate.rotateY,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
      }}
      style={{ perspective: 1000 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/**
 * Magnetic CTA Button Wrapper (Requirement 15)
 * Max movement 3-5px towards cursor. Disabled on mobile/touch.
 */
export const MagneticButton = ({ children, className = "", strength = 4 }) => {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const { isTouchDevice, prefersReducedMotion } = useAnimationAccessibility();

  const handleMouseMove = (e) => {
    if (isTouchDevice || prefersReducedMotion) return;
    const rect = ref.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * strength * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * strength * 2;
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 250, damping: 15 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/**
 * Animated Numerical Counter (Requirement 11)
 * Smoothly increments from 0 to target value when scrolled into view.
 */
export const AnimatedCounter = ({ from = 0, to, suffix = "", duration = 2 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [count, setCount] = useState(from);

  useEffect(() => {
    if (!isInView) return;

    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
      // Ease out cubic
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeProgress * (to - from) + from));
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setCount(to);
      }
    };
    requestAnimationFrame(step);
  }, [isInView, from, to, duration]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
};

/**
 * Original Animated NFC Signal (Requirement 9)
 * 3-4 expanding circular waves scaling outward and fading with delay offsets.
 */
export const OriginalNfcSignal = ({ className = "w-16 h-16" }) => {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {/* Central Chip Node */}
      <div className="w-3.5 h-3.5 rounded-full bg-[#6C4CFF] shadow-[0_0_12px_#6C4CFF] z-10" />

      {/* 4 Expanding Pulse Rings */}
      {[0, 0.6, 1.2, 1.8].map((delay, index) => (
        <motion.div
          key={index}
          initial={{ scale: 0.5, opacity: 0.8 }}
          animate={{ scale: 2.2, opacity: 0 }}
          transition={{
            duration: 2.4,
            repeat: Infinity,
            delay,
            ease: "easeOut",
          }}
          className="absolute inset-0 rounded-full border-2 border-[#6C4CFF]/60 pointer-events-none"
        />
      ))}
    </div>
  );
};

/**
 * AI Network Visualization Nodes (Requirement 18)
 * Subtle glowing nodes and connecting lines for AI features section
 */
export const AiNodesBackground = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="aiLineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6C4CFF" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#22D3EE" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.1" />
          </linearGradient>
        </defs>

        {/* Connecting Lines */}
        <line x1="15%" y1="20%" x2="45%" y2="50%" stroke="url(#aiLineGrad)" strokeWidth="1.5" strokeDasharray="4 4" />
        <line x1="45%" y1="50%" x2="80%" y2="30%" stroke="url(#aiLineGrad)" strokeWidth="1.5" strokeDasharray="4 4" />
        <line x1="45%" y1="50%" x2="70%" y2="75%" stroke="url(#aiLineGrad)" strokeWidth="1.5" strokeDasharray="4 4" />
        <line x1="15%" y1="20%" x2="25%" y2="75%" stroke="url(#aiLineGrad)" strokeWidth="1.5" strokeDasharray="4 4" />

        {/* Pulsing Nodes */}
        <g>
          <circle cx="15%" cy="20%" r="4" fill="#6C4CFF" />
          <circle cx="15%" cy="20%" r="9" fill="none" stroke="#6C4CFF" strokeWidth="1" className="animate-ping" />
        </g>
        <g>
          <circle cx="45%" cy="50%" r="5" fill="#22D3EE" />
          <circle cx="45%" cy="50%" r="12" fill="none" stroke="#22D3EE" strokeWidth="1" className="animate-ping duration-1000" />
        </g>
        <g>
          <circle cx="80%" cy="30%" r="4" fill="#3B82F6" />
          <circle cx="80%" cy="30%" r="8" fill="none" stroke="#3B82F6" strokeWidth="1" className="animate-ping duration-700" />
        </g>
        <g>
          <circle cx="70%" cy="75%" r="4" fill="#8B5CF6" />
        </g>
        <g>
          <circle cx="25%" cy="75%" r="4" fill="#6C4CFF" />
        </g>
      </svg>
    </div>
  );
};

/**
 * Skeleton Loader Placeholder (Requirement 22)
 * Subtle shimmering placeholder card for loading states
 */
export const SkeletonLoader = ({ className = "h-48 w-full rounded-2xl" }) => {
  return (
    <div className={`bg-neutral-800/50 animate-pulse relative overflow-hidden ${className}`}>
      <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/5 to-transparent animate-[shimmer_2s_infinite]" />
    </div>
  );
};
