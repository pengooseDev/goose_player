import { axiosAtom } from "../atom";
import { useRecoilState } from "recoil";
import styled from "styled-components";

const Data = () => {
  const [axiosData, setAxiosData] = useRecoilState(axiosAtom);
  return (
    <div>
      <h1>data</h1>
      <div>{axiosData.data}</div>
    </div>
  );
};

export default Data;
