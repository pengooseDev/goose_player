import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { queueToggleAtom } from '../atom';
import { useEffect, useState } from 'react';

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
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
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
  position: absolute;
  z-index: 3;
  top: 50%;
  left: 15px;

  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;

  border-radius: 15px;
  padding: 3px;
  font-weight: 600;

  color: '#111';
  background: rgba(222, 222, 222, 1);
  :hover {
    cursor: pointer;
  }
`;
