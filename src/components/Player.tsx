import ReactPlayer from "react-player";
import { queueAtom } from "../atom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { useEffect, useState, useRef } from "react";

const Player = () => {
    const [playerQueue, setPlayerQueue] = useRecoilState<string[]>(queueAtom);
    const [queueIndex, setQueueIndex] = useState<number>(0);
    const playerRef = useRef(null);

    const [hasWindow, setHasWindow] = useState(false);
    useEffect(() => {
        if (typeof window !== "undefined") {
            setHasWindow(true);
        }
    }, []);

    /* playAlgorithm */
    const playAlgorithm = () => {
        console.log("Ended!");
        next();
    };

    const next = () => {
        //id로 한 번 확인하고 삭제된 노래일 경우 인덱스로 확인.
        console.log("ref:", playerRef);

        if (queueIndex >= playerQueue.length - 1) {
            return setQueueIndex((prev) => 0);
        }

        return setQueueIndex((prev) => prev + 1);
    };

    return (
        <Wrapper>
            {hasWindow && playerQueue[queueIndex] && (
                <PlayerWrapper>
                    <PlayerOverlay />
                    <ReactPlayer
                        ref={playerRef}
                        url={playerQueue[queueIndex]}
                        mute="false"
                        playing={true}
                        controls={false}
                        onEnded={playAlgorithm}
                    />
                </PlayerWrapper>
            )}
            <PlayerController>
                <button
                    onClick={() => {
                        next();
                    }}
                >
                    next
                </button>
            </PlayerController>
        </Wrapper>
    );
};

export default Player;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: tomato;
`;

const PlayerController = styled.div`
    background: teal;
    width: 50%;
`;

const PlayerWrapper = styled.div`
    background: teal;
    transform: skew(20deg, 0deg) rotate(20deg);
    position: relative;
`;

const PlayerOverlay = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.56);
`;
