import { motion } from 'framer-motion';

// Fade in animation
export const FadeIn = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5, delay }}
  >
    {children}
  </motion.div>
);

// Slide up animation
export const SlideUp = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
  >
    {children}
  </motion.div>
);

// Scale in animation
export const ScaleIn = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.3, delay }}
  >
    {children}
  </motion.div>
);

// Stagger children animation
export const StaggerContainer = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial="hidden"
    animate="visible"
    variants={{
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.1
        }
      }
    }}
  >
    {children}
  </motion.div>
);

// Stagger item animation
export const StaggerItem = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    variants={{
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 }
    }}
  >
    {children}
  </motion.div>
);

// Button hover animation
export const AnimatedButton = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <motion.button
    className={className}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    transition={{ duration: 0.2 }}
  >
    {children}
  </motion.button>
);

// Card hover animation
export const AnimatedCard = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <motion.div
    className={className}
    whileHover={{ y: -5, boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
    transition={{ duration: 0.3 }}
  >
    {children}
  </motion.div>
);

// Page transition animation
export const PageTransition = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: 20 }}
    transition={{ duration: 0.3 }}
  >
    {children}
  </motion.div>
); 