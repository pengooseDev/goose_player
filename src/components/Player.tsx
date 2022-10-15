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
            <Right />
            <Top />
            <Left />
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

const Left = styled.div`
    position: absolute;
    margin-left: -668px;
    margin-bottom: 624px;
    transform: skew(20deg) rotate(70deg);
    height: 8px;
    width: 8px;
    background: black;
`;

const Top = styled.div`
    position: absolute;
    margin-left: 10px;
    margin-bottom: 410px;
    transform: skew(70deg) rotate(70deg);
    box-shadow: 0px -10px 10px bisque;
    height: 15px;
    width: 233px;
    background: black;
`;

const Right = styled.div`
    position: absolute;
    margin-left: 685px;
    margin-bottom: -160px;
    transform: skew(-20deg) rotate(-20deg);
    box-shadow: 0px 0px 10px bisque;
    height: 376px;
    width: 5px;
    background: black;
`;

const VideoRange = styled.input.attrs({ type: "range" })`
    position: absolute;
    z-index: 10;
    overflow: hidden;
    -webkit-appearance: none;
    margin-top: -1px;
    margin-left: 0px; //이거 안하면 뒤틀림.
    height: 15px;
    width: 100%;
    background: rgba(222, 222, 222, 1);
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
`;
