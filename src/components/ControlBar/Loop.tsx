import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { loopAtom } from '../../atom';

const Loop = () => {
  const [isLoop, setIsLoop] = useRecoilState(loopAtom);

  const loopToggleHandler = () => {
    console.log(isLoop);
    setIsLoop((prev) => !prev);
  };

  return (
    <Wrapper onClick={loopToggleHandler} isLoop={isLoop}>
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
          d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
        />
      </svg>
    </Wrapper>
  );
};

export default Loop;

const Wrapper = styled.div<{ isLoop: boolean }>`
  width: 50px;
  font-weight: 600;
  color: ${(props) => (props.isLoop ? '#111' : 'rgba(222, 222, 222, 1)')};
  background: ${(props) => (props.isLoop ? 'rgba(222, 222, 222, 1)' : '#111')};
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  transition: 0.2s ease-in-out;
  :hover {
    //background: rgba(200, 200, 200, 1);
    //color: #111;
    cursor: pointer;
  }
`;
