import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { queueToggleAtom } from '../atom';
import { useEffect, useState } from 'react';
import QueueIcon from './icons/queueIcon';
import QueueExit from './icons/queueExit';
import { AnimatePresence } from 'framer-motion';

const QueueToggleBtn = () => {
  const [queueToggle, setQueueToggle] = useRecoilState(queueToggleAtom);
  const [mount, setMount] = useState(false);

  useEffect(() => {
    if (typeof window !== undefined) {
      setMount((prev) => true);
    }
  }, []);

  const queueToggleHandler = () => {
    setQueueToggle((prev) => !prev);
  };

  return (
    <AnimatePresence>
      {mount && (
        <Wrapper onClick={queueToggleHandler} queueToggle={queueToggle}>
          {!queueToggle ? <QueueIcon /> : <QueueExit />}
        </Wrapper>
      )}
    </AnimatePresence>
  );
};

export default QueueToggleBtn;

/* Styled-components */
const Wrapper = styled.div<{ queueToggle: boolean }>`
  z-index: 500;
  width: 50px;
  height: 50px;
  font-weight: 600;
  color: ${(props) => (props.queueToggle ? 'rgba(222, 222, 222, 1)' : '#111')};
  background: ${(props) =>
    props.queueToggle ? 'rgba(110, 110, 110, 0)' : 'rgba(110, 110, 110, 1)'};
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  transition: 0.2s ease-in-out;
  :hover {
    background: rgba(200, 200, 200, 1);
    color: #111;
    cursor: pointer;
  }
`;
