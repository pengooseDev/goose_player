import {atom} from "recoil";

interface IAxiosAtom {
    data:string;
}

export const axiosAtom = atom<IAxiosAtom>({
    key:"axiosAtom",
    default:{data:""}
})