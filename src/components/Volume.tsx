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
})``;

export default Volume;
