import styled from "styled-components";
import NextBtn from "./Next";

import IconSearch from "./search/IconSearch";

const Controller = () => {
    return (
        <Wrapper>
            <NextBtn />
            <IconSearch />
        </Wrapper>
    );
};

const Wrapper = styled.div`
    position: relative;
    right: 20px;

    display: flex;
    justify-content: center;

    width: 640px;
    background: rgba(0, 0, 0, 0.5);
    padding: 10px;
    border-radius: 0px 0px 5px 5px;

    transform: skew(20deg, 0deg) rotate(20deg);
`;

export default Controller;
