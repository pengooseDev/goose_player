import styled from "styled-components";

const Delete = () => {
    const deleteHandler = () => {
        console.log(1);
    };
    return (
        <Wrapper onClick={deleteHandler}>
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
                    d="M6 18L18 6M6 6l12 12"
                />
            </svg>
        </Wrapper>
    );
};

export default Delete;

const Wrapper = styled.div`
    border-radius: 0px 3px 3px 0px;
    width: 25px;
    margin: -10px 0px -10px 0px;
    display: flex;
    padding: 3px;
    transition: 0.2s ease-in-out;
    :hover {
        background: tomato;
        color: #111;
    }
`;
