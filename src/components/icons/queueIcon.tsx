import styled from 'styled-components';
import { motion } from 'framer-motion';

/* framer-motion */
const wrapperVariants = {
  from: {
    opacity: 0,
    transition: {
      duration: 0.2,
    },
  },
  to: {
    opacity: 1,
    transition: {
      duration: 0.2,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.2,
    },
  },
};

const QueueIcon = () => {
  return (
    <Svg
      variants={wrapperVariants}
      initial="from"
      animate="to"
      exit="exit"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
      />
    </Svg>
  );
};

export default QueueIcon;

const Svg = styled(motion.svg)``;
