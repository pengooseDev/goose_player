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
      const res = await axios
        .post(API_URL_SEARCH, { inputValue })
        .then((res) => {
          console.log("res : ", res);
          setAxiosData((prev) => res);
        })
        .catch((e) => console.log("ERR : ", e));
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
