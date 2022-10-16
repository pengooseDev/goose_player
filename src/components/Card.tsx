import styled from "styled-components";
import { queueAtom, queueIndexAtom } from "../atom";
import { useRecoilState } from "recoil";
import { Video } from "../types";
import Checked from "./Checked";
import { AnimatePresence, motion } from "framer-motion";

const Card = ({ data }: { data: Video }) => {
    const { title, id, thumbnail, duration, owner } = data;
    const [queue, setQueue] = useRecoilState(queueAtom);
    const [queueIndex, setQueueIndex] = useRecoilState(queueIndexAtom);

    const isDuplicate = Boolean(queue.filter((i) => i.id === id).length);

    const cardClickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
        if (isDuplicate) {
            //이미 있는 경우 삭제.
            setQueue((prev) => {
                const newArray = [...prev];
                const targetIndex = queue.map((i) => i.id === id).indexOf(true);
                newArray.splice(targetIndex, 1);
                return newArray;
            });
            return;
        }

        setQueue((prev) => {
            return [...prev, data];
        });

        setQueueIndex((prev) => queueIndex);
    };

    return (
        <Container>
            <Wrapper
                id={id}
                isDuplicate={isDuplicate}
                onClick={cardClickHandler}
            >
                <Thumbnail thumbnail={thumbnail} />
                <Info>
                    <Title>{title}</Title>
                    <SubInfo>
                        <Duration>{duration}</Duration>
                        <Owner>{owner}</Owner>
                    </SubInfo>
                </Info>
            </Wrapper>
            <AnimatePresence>
                {isDuplicate && (
                    <DuplicatedOverlay
                        variants={overlayVariant}
                        initial="from"
                        animate="to"
                        exit="exit"
                    >
                        <Checked />
                    </DuplicatedOverlay>
                )}
            </AnimatePresence>
        </Container>
    );
};

export default Card;

interface ThumbnailProps {
    thumbnail: string;
}

const Container = styled.div`
    position: relative;
`;

const Info = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 10px;
    font-weight: 600;
    background: transparent;
    width: 300px;
    border-radius: 3px;
    overflow-y: auto;
`;

const SubInfo = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
`;

const Title = styled.div``;

const Duration = styled.div`
    font-size: 12.5px;
`;

const Owner = styled.div`
    font-size: 12.5px;
`;

const Wrapper = styled.div<{ id: string; isDuplicate: boolean }>`
    display: flex;
    justify-content: space-between;
    background: ${(props) =>
        props.isDuplicate
            ? "rgba(255, 255, 255, 0.2)"
            : "rgba(255, 255, 255, 0.2)"};
    border-radius: 3px;
    padding: 10px;
    height: 8rem;
    transition: 0.1s ease-in-out;
    color: #111827;
    :hover {
        background: rgba(0, 0, 0, 0.65);
        cursor: pointer;
        color: #cbd5e1;
    }
`;

const Thumbnail = styled.div<ThumbnailProps>`
    background: url(${(props) => props.thumbnail});
    background-size: contain;
    background-repeat: no-repeat;
    border-radius: 5px;
    width: 200px;
`;

const DuplicatedOverlay = styled(motion.div)`
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(222, 222, 222, 0.1);
    backdrop-filter: blur(5px);
    border-radius: 4px 0px 0px 4px;
    width: 193px;
    height: 108px;
    margin: 10px 0px 0px 10px;
    top: 0;
    left: 0;
    :hover {
        cursor: pointer;
    }
`;

const overlayVariant = {
    from: { opacity: 0 },
    to: { opacity: 1, transition: { duration: 0.2 } },
    exit: { opacity: 0, transition: { duration: 0.2 } },
};
