import styled from "styled-components";
import { durationAtom, currentTimeAtom } from "../atom";
import { useRecoilState } from "recoil";

const DurationInfo = () => {
    const [duration, setDuration] = useRecoilState(durationAtom);
    const [currentTime, setCurrentTime] = useRecoilState(currentTimeAtom);

    const currentTimeHours = Math.floor(currentTime / 3600);
    const currentTimeMinutes = Math.floor(currentTime / 60);
    const currentTimeSeconds = Math.floor(currentTime % 60);
    const durationHours = Math.floor(duration / 3600);
    const durationMinutes = Math.floor(duration / 60);
    const durationSeconds = Math.floor(duration % 60);
    return (
        <Wrapper>
            <CurrentTime>
                {durationHours === 0
                    ? null
                    : currentTimeHours >= 10
                    ? currentTimeHours
                    : durationHours >= 10
                    ? `0${currentTimeHours}`
                    : currentTimeHours}
                {durationHours === 0 ? null : ":"}
                {durationMinutes === 0
                    ? null
                    : currentTimeMinutes >= 10
                    ? currentTimeMinutes % 60 >= 10
                        ? currentTimeMinutes % 60
                        : `0${currentTimeMinutes % 60}`
                    : durationMinutes >= 10
                    ? `0${currentTimeMinutes}`
                    : currentTimeMinutes}
                {durationMinutes === 0 ? null : ":"}
                {durationSeconds === 0
                    ? null
                    : currentTimeSeconds >= 10
                    ? currentTimeSeconds
                    : durationMinutes >= 1
                    ? `0${currentTimeSeconds}`
                    : currentTimeSeconds}
            </CurrentTime>
            <Duration>
                {durationHours === 0
                    ? null
                    : durationHours >= 10
                    ? durationHours
                    : durationHours >= 10
                    ? `0${durationHours}`
                    : durationHours}
                {durationHours === 0 ? null : ":"}
                {durationMinutes === 0
                    ? null
                    : durationMinutes >= 10
                    ? durationMinutes % 60 >= 10
                        ? durationMinutes % 60
                        : `0${durationMinutes % 60}`
                    : durationMinutes >= 10
                    ? `0${durationMinutes}`
                    : durationMinutes}
                {durationMinutes === 0 ? null : ":"}
                {durationSeconds === 0
                    ? null
                    : durationSeconds >= 10
                    ? durationSeconds
                    : durationMinutes >= 1
                    ? `0${durationSeconds}`
                    : durationSeconds}
            </Duration>
        </Wrapper>
    );
};

export default DurationInfo;

const Wrapper = styled.div`
    transform: skew(20deg) rotate(20deg);
    position: absolute;
    margin: -350px -480px 0px 0px;
    z-index: 5;
    width: 100px;
    height: 100px;
    color: rgba(255, 255, 255, 0.6);
    font-size: 20px;
    text-shadow: 0px 0px 5px white;
`;

const CurrentTime = styled.div`
    position: absolute;
    left: 57px;
    top: 10px;
    font-size: 20px;
    transition: ease-in-out 0.2s;
    transform: skew(-2deg) rotate(-2deg);
    :hover {
        color: white;
    }
`;

const Duration = styled.div`
    position: absolute;
    left: 70px;
    top: 36px;
    font-size: 25px;
    transition: ease-in-out 0.2s;
    :hover {
        color: white;
    }
`;
