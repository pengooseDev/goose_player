import styled from "styled-components";

const DragHandle = () => {
    return (
        <Container>
            <Wrapper>
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
                        d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
                    />
                </svg>
            </Wrapper>
        </Container>
    );
};

export default DragHandle;

const Container = styled.div`
    display: flex;
    align-items: center;
    margin-left: -10px;
    padding-right: 5px;
`;

const Wrapper = styled.div`
    width: 30px;
    height: 30px;
    padding: 4px;

    border-radius: 15px;
    padding: 3px;
    font-weight: 600;

    color: "rgba(222, 222, 222, 1)";
    background: "rgb(30,30,30)";
    :hover {
        cursor: pointer;
    }
`;
