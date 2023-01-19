import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import ReactPlayer from 'react-player';
import { queueAtom, queueIndexAtom, PIPAtom } from '../../atom';
import { queueUrlTrimmer } from '../../../pages/api/controller/urlTrimmer';

const PIPBtn = () => {
  const [queue, setQueue] = useRecoilState(queueAtom);
  const [queueIndex, setQueueIndex] = useRecoilState(queueIndexAtom);
  const [isPIP, setIsPIP] = useRecoilState<boolean>(PIPAtom);
  const queueData = Object.entries(queue).map(([v, info], i) => info.id);

  const url = queueUrlTrimmer(queueData[queueIndex]);

  const onClickHandler = () => {
    setIsPIP((prev) => !prev);
  };

  return (
    <>
      {ReactPlayer.canEnablePIP(url) && (
        <Wrapper onClick={onClickHandler} isPIP={isPIP}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
            />
          </svg>
        </Wrapper>
      )}
    </>
  );
};

const Wrapper = styled.div<{ isPIP: boolean }>`
  width: 50px;
  font-weight: 600;
  color: ${(props) => (props.isPIP ? '#111' : 'rgba(222, 222, 222, 1)')};
  background: ${(props) => (props.isPIP ? 'rgba(222, 222, 222, 1)' : '#111')};
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

export default PIPBtn;
