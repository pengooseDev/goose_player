import styled from "styled-components";

const Wrapper = styled.div`
    padding: 10px;
    background: #111;
    color: whitesmoke;
    font-weight: 600;
    font-size: 20px;
`;

interface INavProps {
    title: string;
}

const Nav = ({ title }: INavProps) => {
    return <Wrapper>{title}</Wrapper>;
};

export default Nav;
