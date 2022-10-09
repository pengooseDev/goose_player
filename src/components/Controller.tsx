import styled from "styled-components";
import { useRecoilState } from "recoil";
import { searchToggleAtom } from "../atom";
import IconSearch from "./search/IconSearch";

const Controller = () => {
    return (
        <Wrapper>
            <IconSearch />
        </Wrapper>
    );
};

const Wrapper = styled.div`
    display: flex;
    background: blue;
    padding: 10px;
`;

export default Controller;
