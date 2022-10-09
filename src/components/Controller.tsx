import styled from "styled-components";
import { useRecoilState } from "recoil";
import { searchToggleAtom, queueAtom, queueIndexAtom } from "../atom";

import IconSearch from "./search/IconSearch";

const Controller = () => {
    const [playerQueue, setPlayerQueue] = useRecoilState<string[]>(queueAtom);
    const [queueIndex, setQueueIndex] = useRecoilState<number>(queueIndexAtom);

    const next = () => {
        //id로 한 번 확인하고 삭제된 노래일 경우 인덱스로 확인.

        if (queueIndex >= playerQueue.length - 1) {
            return setQueueIndex((prev) => 0);
        }

        return setQueueIndex((prev) => prev + 1);
    };

    return (
        <Wrapper>
            <IconSearch />

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

const Wrapper = styled.div`
    display: flex;
    background: rgba(0, 0, 0, 0.5);
    padding: 10px;
    transform: skew(20deg, 0deg) rotate(20deg);
    width: 100%;
`;

const PlayerController = styled.div`
    background: teal;
    width: 50%;
`;

export default Controller;
