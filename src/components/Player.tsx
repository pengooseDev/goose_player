import ReactPlayer from "react-player";
import { queueAtom, queueIndexAtom } from "../atom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { useEffect, useState, useRef } from "react";
import Controller from "../../src/components/Controller";
import defaultImg from "../assets/img/Pengoose.jpeg";
import Image from "next/image";

const Player = () => {
    const [playerQueue, setPlayerQueue] = useRecoilState<string[]>(queueAtom);
    const [queueIndex, setQueueIndex] = useRecoilState<number>(queueIndexAtom);

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
        console.log(
            "queueIndex : ",
            queueIndex,
            "queueLen : ",
            playerQueue.length - 1
        );

        if (queueIndex >= playerQueue.length - 1) {
            console.log("loop");
            return setQueueIndex((prev) => 0);
        }

        return setQueueIndex((prev) => prev + 1);
    };

    return (
        <Wrapper>
            {hasWindow && playerQueue[queueIndex] ? (
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
            ) : (
                <Monitor>
                    <Image
                        src={defaultImg}
                        layout="fill"
                        objectFit="cover"
                        objectPosition="center"
                    />
                </Monitor>
            )}
            <Controller />
        </Wrapper>
    );
};

export default Player;

const Monitor = styled.div`
    width: 640px;
    height: 360px;
    transform: skew(20deg, 0deg) rotate(20deg);
`;

const Wrapper = styled.div`
    display: flex;
    margin-top: 150px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
`;

const PlayerWrapper = styled.div`
    transform: skew(20deg, 0deg) rotate(20deg);
`;

const PlayerOverlay = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0);
    box-shadow: 0px 0px 10px bisque;
`;
