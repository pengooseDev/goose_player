import ReactPlayer from 'react-player';
import {
  volumeAtom,
  queueAtom,
  queueIndexAtom,
  isPlayingAtom,
  loopAtom,
  durationAtom,
  currentTimeAtom,
  PIPAtom,
} from '../../atom';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import React, { useEffect, useState, useRef } from 'react';
import Controller from '../ControlBar/Controller';
import defaultImg from '../../assets/img/Pengoose.jpeg';
import Image from 'next/image';
import { queueUrlTrimmer } from '../../../pages/api/controller/urlTrimmer';
import Speaker from './Speaker';
import DurationInfo from '../DurationInfo';

const Player = () => {
  const [queue, setQueue] = useRecoilState(queueAtom);
  const [queueIndex, setQueueIndex] = useRecoilState(queueIndexAtom);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingAtom);
  const [duration, setDuration] = useRecoilState(durationAtom);
  const [currentTime, setCurrentTime] = useRecoilState(currentTimeAtom);
  const isLoop = useRecoilValue(loopAtom);
  const volume = useRecoilValue(volumeAtom);
  const isPIP = useRecoilValue(PIPAtom);
  const playerRef = useRef(null);

  const [hasWindow, setHasWindow] = useState(false);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setHasWindow(true);
    }
  }, []);

  const queueData = Object.entries(queue).map(([v, info], i) => info.id);

  const onStartHandler = () => {
    if (!playerRef?.current) return;
    //@ts-ignore
    const refDuration = playerRef?.current.getDuration();
    setDuration((prev) => refDuration);
  };

  const seekHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!playerRef?.current) return;
    const targetTime = Number(e.currentTarget.value);
    setCurrentTime(targetTime);
    //@ts-ignore
    playerRef.current.seekTo(targetTime);
  };

  const onProgressHandler = () => {
    if (!playerRef?.current) return;
    //@ts-ignore
    const refCurrentTime = playerRef.current.getCurrentTime();
    setCurrentTime(refCurrentTime);
  };

  /* onEndedHandler */
  const onEndedHandler = () => {
    return next();
  };

  const next = () => {
    if (queueIndex >= queueData.length - 1) {
      return setQueueIndex((prev) => 0);
    }
    return setQueueIndex((prev) => prev + 1);
  };

  const playingToggle = () => {
    setIsPlaying((prev) => !prev);
  };

  return (
    <Wrapper>
      <Right queueData={queueData} />
      <Top />
      <Left />
      <Speaker />
      <DurationInfo />
      <Wall />
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
              onStart={onStartHandler}
              onEnded={onEndedHandler}
              onProgress={onProgressHandler}
              pip={isPIP}
            />
            <VideoRange
              onChange={seekHandler}
              max={duration}
              value={currentTime}
            />
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

const Right = styled.div<{ queueData: string[] }>`
  position: absolute;
  margin-left: 685px;
  margin-bottom: ${(props) =>
    props.queueData.length === 0 ? '-222px' : '-222px'};
  transform: skew(-20deg) rotate(-20deg);
  box-shadow: 5px 0px 10px bisque;
  height: ${(props) =>
    props.queueData.length === 0 ? '445px' : '445px'}; //426
  width: 5px;
  background: black;
`;

const VideoRange = styled.input.attrs({ type: 'range' })`
  position: absolute;
  z-index: 10;
  overflow: hidden;
  -webkit-appearance: none;
  margin-top: -1px;
  margin-left: 0px; //이거 안하면 뒤틀림.
  height: 15px;
  width: 100%;
  background: rgba(222, 222, 222, 0.6);
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
    box-shadow: -100vw 0 0 100vw rgba(0, 0, 0, 0.75);
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
  transform: skew(0deg) rotate(0deg);
`;

const Wall = styled.div`
  position: absolute;
  bottom: -125px;
  width: 150vh;
  height: 100%;
  z-index: -1;
  background: #111;
  padding: 1000px;
  box-shadow: 0px 20px 50px rgba(1, 1, 1, 1);

  transform: skew(20deg) rotate(20deg);
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
