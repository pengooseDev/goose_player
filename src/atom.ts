import { atom } from "recoil";
import { v1 } from "uuid";

/* Axios Atom */
export const axiosAtom = atom<axiosData[]>({
    key: `axiosAtom/${v1()}`,
    default: [],
});

export interface axiosData {
    videoRenderer: {
        channelThumbnailSupportedRenderers: {
            channelThumbnailWithLinkRenderer: {
                navigationEndpoint: {
                    canonicalBaseUrl: string;
                };
            };
        };
        title: {
            accessibility: { accessibilityData: { label: string } };
        };
        thumbnail: {
            thumbnails: IThumbnails[];
        };
        videoId: string;
        ownerText: {
            runs: [{ text: string }];
        };
        lengthText: { accessibility: { accessibilityData: { label: string } } };
    };
}

interface IThumbnails {
    url: string;
    height: number;
    width: number;
}

/* loadingAtom */
export const loadingAtom = atom<boolean>({
    key: `loadingAtom/${v1()}`,
    default: false,
});

/* queueAtom */
export const queueAtom = atom<queueType>({
    key: `queueAtom/${v1()}`,
    default: [],
});

type queueType = string[];

/* searchToggleAtom */
export const searchToggleAtom = atom({
    key: `searchToggleAtom/${v1()}`,
    default: false,
});

/* Queue Index */
export const queueIndexAtom = atom({
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
