import styled from "styled-components";
import { useRecoilState } from "recoil";
import { queueToggleAtom } from "../atom";

const QueueToggleBtn = () => {
    const [queueToggle, setQueueToggle] = useRecoilState(queueToggleAtom);

    const queueToggleHandler = () => {
        setQueueToggle((prev) => !prev);
    };

    return (
        <Wrapper onClick={queueToggleHandler} queueToggle={queueToggle}>
            {!queueToggle ? (
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
                        d="M8.25 4.5l7.5 7.5-7.5 7.5"
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
                        d="M15.75 19.5L8.25 12l7.5-7.5"
                    />
                </svg>
            )}
        </Wrapper>
    );
};

export default QueueToggleBtn;

const Wrapper = styled.div<{ queueToggle: boolean }>`
    position: ${(props) => (props.queueToggle ? null : "absolute")};
    z-index: 3;
    left: ${(props) => (props.queueToggle ? "0px" : "0px")};
    top: 50%;

    width: 36px;
    height: 36px;
    border-radius: 18px;
    padding: 3px;
    font-weight: 600;
    left: 10px;

    color: ${(props) =>
        props.queueToggle ? "rgba(222, 222, 222, 1)" : "#111"};
    background: ${(props) =>
        props.queueToggle ? "#111" : "rgba(222, 222, 222, 1)"};
    display: flex;
    align-items: center;
    justify-content: center;
    transition: 0.2s ease-in-out;
    :hover {
        background: ${(props) =>
            props.queueToggle ? "#111" : "rgba(222, 222, 222, 1)"};
        color: ${(props) =>
            props.queueToggle ? "rgba(222, 222, 222, 1)" : "#111"};
        cursor: pointer;
    }
`;
