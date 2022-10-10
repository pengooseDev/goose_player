import styled from "styled-components";
import { useRecoilState } from "recoil";
import { isPlayingAtom } from "../../src/atom";

const Pause = () => {
    const [isPlaying, setIsPlaying] = useRecoilState(isPlayingAtom);

    const pauseToggleHandler = () => {
        console.log(isPlaying);
        setIsPlaying((prev) => !prev);
    };

    return (
        <Wrapper onClick={pauseToggleHandler} isPlaying={isPlaying}>
            {isPlaying ? (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 5.25v13.5m-7.5-13.5v13.5"
                    />
                </svg>
            ) : (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"
                    />
                </svg>
            )}
        </Wrapper>
    );
};

export default Pause;

const Wrapper = styled.div<{ isPlaying: boolean }>`
    width: 50px;
    font-weight: 600;
    color: ${(props) => (props.isPlaying ? "rgba(222, 222, 222, 1)" : "#111")};
    background: ${(props) =>
        props.isPlaying ? "#111" : "rgba(222, 222, 222, 1)"};
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    transition: 0.2s ease-in-out;
    :hover {
        background: rgba(200, 200, 200, 1);
        color: #111;
        cursor: pointer;
    }
`;
