import axios from "axios";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { axiosAtom } from "../atom";
import { API_URL_SEARCH } from "../../pages/api/middlewares/urls";

const SearchBar = () => {
    const [inputValue, setInputValue] = useState("");
    const [axiosData, setAxiosData] = useRecoilState(axiosAtom);

    /* onSubmitHandler */
    const searchHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            /*원하는 데이터를 편하게 사용하기 위해선, 
            parsing의 과정을 거쳐야 함.
            이 과정에서 regex를 이용하면 정확하고 효율적으로 데이터를 손질할 수 있음.
            */
            const res = await axios.get(API_URL_SEARCH, {
                params: { query: inputValue },
            });
            const {
                data: { result },
            } = res;
            setAxiosData((prev) => result);
        } catch (err) {
            console.log("ERR!", err);
        }
    };

    /* onChangeHandler */
    const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const target = e.currentTarget.value;
        setInputValue((prev) => target);
    };

    return (
        <form onSubmit={searchHandler} method="GET">
            <div>Search</div>
            <input
                type="text"
                onChange={inputChangeHandler}
                value={inputValue}
            ></input>
            <button>Search</button>
        </form>
    );
};

export default SearchBar;
