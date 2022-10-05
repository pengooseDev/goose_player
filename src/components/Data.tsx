import { axiosAtom } from "../atom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { IAxiosAtom } from "../atom";

const Data = () => {
    const [axiosData, setAxiosData] = useRecoilState(axiosAtom);
    console.log(axiosData);
    return (
        <div>
            <h1>data</h1>
            <div>
                {axiosData.map((v, i) => (
                    <div key={i}>1</div>
                ))}
            </div>
        </div>
    );
};

export default Data;
