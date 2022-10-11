import styled from "styled-components";
import { queueIndexAtom, queueAtom } from "../atom";
import { useRecoilState } from "recoil";

const Queue = () => {
    const [queue, setQueue] = useRecoilState(queueAtom);
    const [queueIndex, setQueueIndex] = useRecoilState(queueIndexAtom);

    return (
        <Wrapper>
            <h1>Queue</h1>
            {queue.map((i) => (
                <div>{i}</div>
            ))}
        </Wrapper>
    );
};

export default Queue;

const Wrapper = styled.div`
    position: absolute;
    color: white;
`;
