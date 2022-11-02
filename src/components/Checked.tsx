import styled from "styled-components";

const Checked = () => {
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
            d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </Wrapper>
    </Container>
  );
};

export default Checked;

const Container = styled.div`
  display: flex;
  align-items: center;
  margin-left: -10px;
  padding-right: 5px;
`;

const Wrapper = styled.div`
  width: 50px;
  height: 50px;
  color: whitesmoke;
  background: #111;
  padding: 4px;
  border-radius: 15px;
  padding: 3px;
  font-weight: 600;
`;
