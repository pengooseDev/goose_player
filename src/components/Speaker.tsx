import styled from "styled-components";

const Speaker = () => {
  return (
    <>
      <Wrapper>
        <Bar bgColor={"#2a2a2a"}>
          <Top />
          <Right />
          <Circle />
          <BigCircle />
          <SmallCircle />
          <Circle />
          <Overlay />
        </Bar>
        <Bar bgColor={"#2a2a2a"}>
          <Top />
          <Right />
          <Circle />
          <BigCircle />
          <SmallCircle />
          <Circle />
          <Overlay />
        </Bar>
      </Wrapper>
    </>
  );
};

const Overlay = styled.div`
  //background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(0px);
  position: absolute;
  width: 100%;
  height: 100%;
`;

const Wrapper = styled.div`
  position: absolute;
  z-index: 0;
  display: flex;
  justify-content: space-between;
  margin-left: 0px;
  margin-bottom: 50px;
  width: 990px;
  height: 300px;
  transform: rotate(18deg) skew(18deg);
`;

const Bar = styled.div<{ bgColor: string }>`
  position: relative;
  background: ${(props) => props.bgColor};
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  width: 100px;
  height: 300px;
  div {
    margin: 5px 0px;
  }
  box-shadow: 5px -10px 10px rgba(255, 216, 150, 0.2);
`;

const Top = styled.div`
  transform: skew(-50deg) rotate(0deg);
  position: absolute;
  top: -10px;
  left: 4px;
  background: rgba(111, 111, 111, 1);
  width: 100px;
  height: 5px;
`;

const Right = styled.div`
  transform: rotate(-40deg) skew(-40deg);
  position: absolute;
  top: 28px;
  left: 98px;
  background: black;
  width: 10px;
  height: 230px;
`;

const BigCircle = styled.div`
  width: 60px;
  height: 60px;
  background: radial-gradient(ellipse at top, rgba(0, 0, 0, 0.3), black, black),
    radial-gradient(
      ellipse at right,
      black,
      rgba(111, 111, 111, 0.5),
      rgba(111, 111, 111, 0.5),
      black
    ),
    radial-gradient(
      ellipse at bottom,
      black,
      rgba(0, 0, 0, 0.3),
      rgba(111, 111, 111, 0.5),
      black,
      black,
      black
    ),
    radial-gradient(
      ellipse at left,
      white,
      white,
      white,
      white,
      black,
      black,
      black
    );
  backdrop-filter: blur(13px);
  border-radius: 50%;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.7);
`;

const Circle = styled.div`
  width: 35px;
  height: 35px;
  background: radial-gradient(ellipse at top, rgba(0, 0, 0, 0.3), black, black),
    radial-gradient(
      ellipse at right,
      black,
      rgba(111, 111, 111, 0.5),
      rgba(111, 111, 111, 0.5),
      black
    ),
    radial-gradient(
      ellipse at bottom,
      black,
      rgba(0, 0, 0, 0.3),
      rgba(111, 111, 111, 0.5),
      black,
      black,
      black
    ),
    radial-gradient(
      ellipse at left,
      white,
      white,
      white,
      white,
      black,
      black,
      black
    );
  backdrop-filter: blur(13px);
  border-radius: 50%;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.7);
`;

const SmallCircle = styled.div`
  width: 20px;
  height: 20px;
  background: radial-gradient(ellipse at top, rgba(0, 0, 0, 0.3), black, black),
    radial-gradient(
      ellipse at right,
      black,
      rgba(111, 111, 111, 0.5),
      rgba(111, 111, 111, 0.5),
      black
    ),
    radial-gradient(
      ellipse at bottom,
      black,
      rgba(0, 0, 0, 0.3),
      rgba(111, 111, 111, 0.5),
      black,
      black,
      black
    ),
    radial-gradient(
      ellipse at left,
      white,
      white,
      white,
      white,
      black,
      black,
      black
    );
  backdrop-filter: blur(13px);
  border-radius: 50%;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.7);
`;
export default Speaker;
