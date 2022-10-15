import { atom } from "recoil";
import { v1 } from "uuid";
import { Video } from "./types";

/* Axios Atom */
export const axiosAtom = atom<Video[]>({
    key: `axiosAtom/${v1()}`,
    default: [],
});

/* loadingAtom */
export const loadingAtom = atom<boolean>({
    key: `loadingAtom/${v1()}`,
    default: false,
});

/* queueAtom */
export const queueAtom = atom<Video[]>({
    key: `queueAtom/${v1()}`,
    default: [],
});

/* searchToggleAtom */
export const searchToggleAtom = atom({
    key: `searchToggleAtom/${v1()}`,
    default: false,
});

/* Queue Index */
export const queueIndexAtom = atom<number>({
    key: `queueIndexAtom/${v1()}`,
    default: 0,
});

/* isPlayingAtom */
export const isPlayingAtom = atom({
    key: `isPlayingAtom/${v1()}`,
    default: true,
});

/* loopAtom */
export const loopAtom = atom<boolean>({
    key: `loopAtom/${v1()}`,
    default: false,
});

/* volumeAtom */
export const volumeAtom = atom<number>({
    key: `volumeAtom/${v1()}`,
    default: 0.7,
});

/* queueToggleAtom */
export const queueToggleAtom = atom<boolean>({
    key: `queueToggleAtom/${v1()}`,
    default: false,
});

/* Duration */
export const durationAtom = atom<number>({
    key: "durationAtom",
    default: 0,
});

/* CurrentTime */
export const currentTimeAtom = atom<number>({
    key: "currentTimeAtom",
    default: 0,
});
