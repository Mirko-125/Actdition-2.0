import { motion } from "framer-motion";

const animationVariants = {
  initial: { opacity: 0, scale: 0.8, rotate: -15, x: 100 },
  animate: { opacity: 1, scale: 1, rotate: 0, x: 0 },
  exit: { opacity: 0, scale: 0.8, rotate: 15, x: -100 },
};

export default function AnimatedPage({ children }) {
  return (
    <motion.div
      variants={animationVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{
        duration: 1.2,
        ease: [0.6, 0.01, 0.05, 0.9],
      }}
      style={{ position: "absolute", width: "100%" }}
    >
      {children}
    </motion.div>
  );
}
