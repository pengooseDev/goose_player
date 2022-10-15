import ReactPlayer from "react-player";
import {
    volumeAtom,
    queueAtom,
    queueIndexAtom,
    isPlayingAtom,
    loopAtom,
} from "../atom";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { useEffect, useState, useRef } from "react";
import Controller from "../../src/components/Controller";
import defaultImg from "../assets/img/Pengoose.jpeg";
import Image from "next/image";
import { queueUrlTrimmer } from "../../pages/api/controller/urlTrimmer";

const Player = () => {
    const [queue, setQueue] = useRecoilState(queueAtom);
    const [queueIndex, setQueueIndex] = useRecoilState(queueIndexAtom);
    const [isPlaying, setIsPlaying] = useRecoilState(isPlayingAtom);
    const isLoop = useRecoilValue(loopAtom);
    const volume = useRecoilValue(volumeAtom);
    const playerRef = useRef(null);

    const [hasWindow, setHasWindow] = useState(false);
    useEffect(() => {
        if (typeof window !== "undefined") {
            setHasWindow(true);
        }
    }, []);

    const queueData = Object.entries(queue).map(([v, info], i) => info.id);

    /* onEndedHandler */
    const onEndedHandler = () => {
        if (isLoop) {
            console.log("loop : ", isLoop);
            console.log("isPlaying : ", isPlaying, "=> true");
            return setIsPlaying((prev) => true);
        }
        console.log("!!!", isLoop);
        return next();
    };

    const next = () => {
        //id로 한 번 확인하고 삭제된 노래일 경우 인덱스로 확인.
        if (queueIndex >= queueData.length - 1) {
            console.log("loop");
            return setQueueIndex((prev) => 0);
        }
        return setQueueIndex((prev) => prev + 1);
    };

    const playingToggle = () => {
        setIsPlaying((prev) => !prev);
    };

    /*
  Object.entries(queue)
   */

    return (
        <Wrapper>
            {hasWindow && queueData[queueIndex] ? (
                <>
                    <PlayerWrapper>
                        <PlayerOverlay onClick={playingToggle} />
                        <ReactPlayer
                            ref={playerRef}
                            url={queueUrlTrimmer(queueData[queueIndex])}
                            mute="false"
                            playing={isPlaying}
                            controls={false}
                            loop={isLoop}
                            volume={volume}
                            onEnded={onEndedHandler}
                        />
                        <VideoRange />
                    </PlayerWrapper>
                </>
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

const VideoRange = styled.input.attrs({ type: "range" })`
    position: absolute;
    z-index: 10;
    overflow: hidden;
    -webkit-appearance: none;

    margin-left: 0px;
    height: 15px;
    width: 100%;
    background: rgba(111, 111, 111, 0.6);
    box-shadow: 0px 0px 5px rgba(222, 222, 222, 0.5);

    :focus {
        outline: none;
    }

    ::-webkit-slider-runnable-track {
        width: 100%;
        height: 100%;
        cursor: pointer;
        border-radius: 5px;
    }

    ::-webkit-slider-thumb {
        -webkit-appearance: none;
        width: 10px;
        height: 100%;
        background: whitesmoke;

        cursor: pointer;
        box-shadow: -100vw 0 0 100vw rgba(0, 0, 0, 0.65);
    }
`;

const Monitor = styled.div`
    width: 640px;
    height: 360px;
    transform: skew(20deg) rotate(20deg);
`;

const Wrapper = styled.div`
    display: flex;
    margin-top: 200px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
`;

const PlayerWrapper = styled.div`
    transform: skew(20deg) rotate(20deg);
`;

const PlayerOverlay = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0);
    box-shadow: 0px -5px 10px bisque;
`;
