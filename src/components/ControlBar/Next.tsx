import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { searchToggleAtom, queueAtom, queueIndexAtom } from '../../atom';

const NextBtn = () => {
  const [queue, setQueue] = useRecoilState(queueAtom);
  const [queueIndex, setQueueIndex] = useRecoilState<number>(queueIndexAtom);
  const queueData = Object.entries(queue).map(([v, info], i) => v);
  const firstSong = isFirstSong(queueIndex, queueData);

  const onClickHandler = () => {
    if (firstSong) return moveFirstSong();
    return setQueueIndex((prev) => prev + 1);
  };

  const moveFirstSong = () => {
    return setQueueIndex((prev) => 0);
  };

  return (
    <Wrapper onClick={onClickHandler}>
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
    </Wrapper>
  );
};

export default NextBtn;

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

const isFirstSong = (queueIndex: number, queueData: string[]) => {
  if (queueIndex >= queueData.length - 1) return true;
  return false;
};
