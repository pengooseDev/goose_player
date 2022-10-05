import { atom } from "recoil";
import { v1 } from "uuid";

export type IAxiosAtom = object[];

export const axiosAtom = atom<IAxiosAtom>({
    key: `axiosAtom/${v1()}`,
    default: [],
});
