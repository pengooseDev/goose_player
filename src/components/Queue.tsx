import styled from "styled-components";
import { queueIndexAtom, queueAtom, queueToggleAtom } from "../atom";
import { useRecoilState } from "recoil";
import List from "./List";
import { motion } from "framer-motion";
import QueueToggleBtn from "./QueueToggleBtn";

interface Info {
    id: string;
    title: string[];
    thumbnail: string;
    duration: string;
    owner: string;
}

type Queue = Info[];

const Queue = () => {
    const [queue, setQueue] = useRecoilState(queueAtom);
    const [queueToggle, setQueueToggle] = useRecoilState(queueToggleAtom);

    return (
        <Container
            queueToggle={queueToggle}
            variants={wrapperVariants}
            initial="from"
            animate="to"
            exit="exit"
        >
            <Wrapper>
                <Header>
                    {queueToggle ? <QueueToggleBtn /> : <>|</>}
                    <Title>Your Queue</Title>
                </Header>
                <QueueWrapper>
                    <QueueList>
                        {Object.entries(queue).map(([v, info], i) => {
                            return (
                                <List
                                    key={`${Object(info).id} + ${i}`}
                                    info={Object(info)}
                                />
                            );
                        })}
                    </QueueList>
                </QueueWrapper>
            </Wrapper>
        </Container>
    );
};

//Object.entries(queue).map([v,info],i) = > {}
//위 경우 value가 type이 무엇이든 넘어갈 때 string으로 넘어가고 다시 형 변환 되는듯.

export default Queue;

/* Framer */

const wrapperVariants = {
    from: { left: -360, opacity: 1 },
    to: {
        left: 0,
        opacity: 1,
        transition: { type: "linear", duration: 0.15 },
    },
    exit: { left: -360, opacity: 0, transition: { duration: 0.15 } },
};

const Container = styled(motion.div)<{ queueToggle: boolean }>`
    transition: ease-in-out;
    position: absolute;
    top: 20%;
    display: flex;
    justify-content: center;
    z-index: 3;
`;

const Wrapper = styled.div`
    background: rgb(30, 30, 30);
    backdrop-filter: blur(10px);
    position: relative;
    z-index: 5;
    display: flex;
    flex-direction: column;
    width: 500px;
    padding: 10px;
    border-radius: 5px;
`;

const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 5px 5px 10px 0px;
`;

const Title = styled.div`
    color: whitesmoke;
    font-weight: 600;
    font-size: 20px;
    padding: 5px 0px;
`;

const QueueWrapper = styled.div`
    height: 600px;
    overflow-y: auto;
`;

const QueueList = styled.div`
    display: grid;
    grid-template-rows: repeat(1, minmax(0, 1fr));
    grid-auto-flow: row;
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
