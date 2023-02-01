import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { queueToggleAtom } from '../atom';
import { useEffect, useState } from 'react';
import QueueIcon from './icons/queueIcon';

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
    <>
      {mount && (
        <Wrapper onClick={queueToggleHandler} queueToggle={queueToggle}>
          {!queueToggle ? (
            <QueueIcon />
          ) : (
            <svg
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
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          )}
        </Wrapper>
      )}
    </>
  );
};

export default QueueToggleBtn;

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
