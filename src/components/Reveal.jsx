import { motion } from 'framer-motion';

// Gentle one-time reveal. Honours reduced-motion through <MotionConfig reducedMotion="user"> in App.
export default function Reveal({ children, delay = 0, y = 14, className, as = 'div' }) {
  const Tag = motion[as] || motion.div;
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -6% 0px' }}
      transition={{ duration: 0.8, delay, ease: [0.22, 0.61, 0.36, 1] }}
    >
      {children}
    </Tag>
  );
}
