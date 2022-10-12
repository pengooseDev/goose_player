import styled from "styled-components";
import { queueIndexAtom, queueAtom, queueToggleAtom } from "../atom";
import { useRecoilState } from "recoil";
import List from "./List";

const Queue = () => {
    const [queue, setQueue] = useRecoilState(queueAtom);
    const [queueIndex, setQueueIndex] = useRecoilState(queueIndexAtom);
    const [queueToggle, setQueueToggle] = useRecoilState(queueToggleAtom);

    const overlayToggleHandler = () => {
        setQueueToggle((prev) => false);
    };

    return (
        <>
            <Overlay onClick={overlayToggleHandler}></Overlay>

            <Container>
                <Wrapper>
                    <Title>
                        <span>My Play List</span>
                        <Exit />
                    </Title>
                    <QueueList>
                        {Object.entries(queue).map(([key, value], i) => (
                            <List info={Object(value)} />
                        ))}
                    </QueueList>
                </Wrapper>
            </Container>
        </>
    );
};

//Object.entries(queue).map([key,value],i) = > {}
//위 경우 value가 type이 무엇이든 넘어갈 때 string으로 넘어가고 다시 형 변환 되는듯.

export default Queue;

const Overlay = styled.div`
    position: fixed;
    z-index: 1;
    top: 0px;
    left: 0px;
    width: 100vw;
    height: 100vh;
`;

const Container = styled.div`
    position: absolute;
    top: 20%;
    display: flex;
    justify-content: center;
`;

const Wrapper = styled.div`
    background: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(10px);
    position: relative;
    z-index: 5;
    display: flex;
    flex-direction: column;
    width: 570px;
    padding: 10px;
    border-radius: 5px;
    box-shadow: 1px 3px 15px rgba(111, 111, 111, 0.5);
`;

const Title = styled.div`
    background: #111;
    color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 30px;
    font-weight: 600;
    padding: 5px 10px;
    border-radius: 5px;
    margin-bottom: 13.5px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.6);
`;

const QueueList = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 10px;
    height: 600px;
    overflow-y: auto;
    padding-right: 10px;
`;

const Exit = () => {
    const [queueToggle, setQueueToggle] = useRecoilState(queueToggleAtom);

    const queueToggleHandler = () => {
        setQueueToggle((prev) => false);
    };
    return (
        <ExitWrapper onClick={queueToggleHandler}>
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
                    d="M6 18L18 6M6 6l12 12"
                />
            </svg>
        </ExitWrapper>
    );
};

const ExitWrapper = styled.div`
    width: 40px;
    height: 40px;
    font-weight: 600;
    display: flex;
    padding: 3px;
    border-radius: 3px;
    :hover {
        cursor: pointer;
    }
`;
