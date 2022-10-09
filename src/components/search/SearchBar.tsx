import axios from "axios";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { axiosAtom, loadingAtom } from "../../atom";
import { API_URL_SEARCH } from "../../../pages/api/controller/urlTrimmer";

const SearchBar = () => {
    const [inputValue, setInputValue] = useState("");
    const [axiosData, setAxiosData] = useRecoilState(axiosAtom);
    const [isLoading, setLoading] = useRecoilState(loadingAtom);

    /* onSubmitHandler */
    const searchHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading((prev) => !prev);
        try {
            const res = await axios.get(API_URL_SEARCH, {
                params: { query: inputValue },
            });
            const {
                data: { result },
            } = res;
            setAxiosData((prev) => result);
            setLoading((prev) => !prev);
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
