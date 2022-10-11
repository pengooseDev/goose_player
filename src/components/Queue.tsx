import styled from "styled-components";
import { queueIndexAtom, queueAtom, queueToggleAtom } from "../atom";
import { useRecoilState } from "recoil";

const Queue = () => {
    const [queue, setQueue] = useRecoilState(queueAtom);
    const [queueIndex, setQueueIndex] = useRecoilState(queueIndexAtom);
    const [queueToggle, setQueueToggle] = useRecoilState(queueToggleAtom);

    return (
        <Wrapper>
            <Title>Queue</Title>
            <QueueList>
                {queue.map((i) => (
                    <Item>{i}</Item>
                ))}
            </QueueList>
        </Wrapper>
    );
};

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

const Item = styled.div`
    background: rgba(255, 255, 255, 0.3);
    padding: 5px;
    margin-bottom: 5px;
`;
