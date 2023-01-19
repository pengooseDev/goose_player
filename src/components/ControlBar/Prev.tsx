import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { searchToggleAtom, queueAtom, queueIndexAtom } from '../../atom';

const PrevBtn = () => {
  const [queue, setQueue] = useRecoilState(queueAtom);
  const [queueIndex, setQueueIndex] = useRecoilState<number>(queueIndexAtom);

  const clickHandler = () => {
    if (queueIndex === 0) return moveLastSong();

    return setQueueIndex((prev) => prev - 1);
  };

  const moveLastSong = () => {
    const queueData = Object.entries(queue).map(([v, info], i) => v);
    return setQueueIndex((prev) => queueData.length - 1);
  };

  return (
    <Wrapper onClick={clickHandler}>
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
          d="M15.75 19.5L8.25 12l7.5-7.5"
        />
      </svg>
    </Wrapper>
  );
};

export default PrevBtn;

const Wrapper = styled.div`
  width: 50px;
  font-weight: 600;
  color: rgba(222, 222, 222, 1);
  background: #111;
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
