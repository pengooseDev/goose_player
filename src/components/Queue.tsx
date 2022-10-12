import styled from "styled-components";
import { queueIndexAtom, queueAtom, queueToggleAtom } from "../atom";
import { useRecoilState } from "recoil";
import List from "./List";

const Queue = () => {
    const [queue, setQueue] = useRecoilState(queueAtom);
    const [queueIndex, setQueueIndex] = useRecoilState(queueIndexAtom);
    const [queueToggle, setQueueToggle] = useRecoilState(queueToggleAtom);

    return (
        <Wrapper>
            <Title>Queue</Title>
            <QueueList>
                {Object.entries(queue).map(([key, value], i) => (
                    <List info={Object(value)} />
                ))}
            </QueueList>
        </Wrapper>
    );
};

//Object.entries(queue).map([key,value],i) = > {}
//위 경우 value가 type이 무엇이든 넘어갈 때 string으로 넘어가고 다시 형 변환 되는듯.

export default Queue;

const Wrapper = styled.div`
    position: absolute;
    color: white;
    background: rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(2px);
    padding: 10px;
    border-radius: 5px;
`;

const Title = styled.div`
    background: rgba(255, 255, 255, 0.3);
    padding: 5px;
    border-radius: 3px;
`;

const QueueList = styled.div`
    margin-top: 5px;
`;
