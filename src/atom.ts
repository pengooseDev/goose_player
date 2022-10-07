import { atom } from "recoil";
import { v1 } from "uuid";

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
    };
}

interface IThumbnails {
    url: string;
    height: number;
    width: number;
}

/* player Atom */
export const playerAtom = atom({
    key: `playerAtom/${v1()}`,
    default: "",
});
