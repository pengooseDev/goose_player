import styled from "styled-components";
import { volumeAtom } from "../atom";
import { useRecoilState } from "recoil";
import React from "react";

const Volume = () => {
  const [volume, setVolume] = useRecoilState(volumeAtom);

  const volumeChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.currentTarget.value);
    setVolume((prev) => value);
  };

  return <VolumeInput value={volume} onChange={volumeChangeHandler} />;
};

const VolumeInput = styled.input.attrs({
  type: "range",
  min: 0,
  max: 1,
  step: 0.1,
})`
  overflow: hidden;
  height: 12.5px;
  -webkit-appearance: none;
  background: rgba(111, 111, 111, 0.6);
  box-shadow: 0px 0px 5px rgba(222, 222, 222, 0.5);

  margin-left: 15px;

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

export default Volume;
