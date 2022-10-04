import axios from "axios";
import { useState } from "react";
import { API_URL_SEARCH } from "../pages/api/middlewares/urls";

const SearchBar = () => {
    const [inputValue, setInputValue] = useState("");

    /* onSubmitHandler */
    const searchHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const res = await axios.post(API_URL_SEARCH, { inputValue });
        console.log(111, res);
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
