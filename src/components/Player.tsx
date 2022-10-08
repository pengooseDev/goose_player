import ReactPlayer from "react-player";
import { queueAtom } from "../atom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { useEffect, useState } from "react";

const Player = () => {
    const [playerQueue, setPlayerQueue] = useRecoilState(queueAtom);
    const [queueIndex, setQueueIndex] = useState<number>(0);
    console.log("queue: ", playerQueue);

    const [hasWindow, setHasWindow] = useState(false);
    useEffect(() => {
        if (typeof window !== "undefined") {
            setHasWindow(true);
        }
    }, []);

    return (
        <Wrapper>
            {hasWindow && playerQueue[queueIndex] && (
                <PlayerWrapper>
                    <PlayerOverlay />
                    <ReactPlayer
                        url={playerQueue[queueIndex]}
                        mute={false}
                        playing={true}
                        controls={false}
                    />
                </PlayerWrapper>
            )}
            <Controller>
                <button
                    onClick={() => {
                        console.log(1);
                    }}
                >
                    next
                </button>
            </Controller>
        </Wrapper>
    );
};

export default Player;

const Wrapper = styled.div`
    display: flex;
    transform: skew(20deg, 0deg) rotate(20deg);
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.3);
`;

const Controller = styled.div`
    background: teal;
    width: 50%;
`;

const PlayerWrapper = styled.div`
    position: relative;
`;

const PlayerOverlay = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.56);
`;
