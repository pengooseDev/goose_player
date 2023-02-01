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

const QueueExit = () => {
  return (
    <Svg
      variants={wrapperVariants}
      initial="from"
      animate="to"
      exit="exit"
      xmlns="http://www.w3.org/2000/Svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
      />
    </Svg>
  );
};

export default QueueExit;

const Svg = styled(motion.svg)``;
