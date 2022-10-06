import { axiosAtom } from "../atom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { axiosData } from "../atom";

const dataTrimmer = (axiosData: axiosData) => {
    //ChannelUrl
    const info =
        axiosData.videoRenderer?.channelThumbnailSupportedRenderers
            .channelThumbnailWithLinkRenderer;
    const channelId = info?.navigationEndpoint.canonicalBaseUrl;
    const channelUrl = `https://www.youtube.com/${channelId}`;

    //thumbnail
    const thumbnail = axiosData.videoRenderer?.thumbnail?.thumbnails[0].url;

    //Title
    const titleData =
        axiosData.videoRenderer?.title.accessibility.accessibilityData.label;

    const titleRegex = /^.*? (?=게시자: )/g; //텍스트의 처음부터 "게시자"의 전방탐색까지.
    const title = titleRegex.exec(titleData);

    //ID
    const id = axiosData.videoRenderer?.videoId;
    console.log(axiosData);
    return { title, id, channelUrl, thumbnail };
};

const Data = () => {
    const [axiosData, setAxiosData] = useRecoilState<axiosData[]>(axiosAtom);
    return (
        <div>
            <h1>data</h1>
            <div>
                {axiosData.map((v, i) => {
                    const videoData = dataTrimmer(v);
                    const { title, id, channelUrl, thumbnail } = videoData;
                    if (!title || !id || !channelUrl || !thumbnail) return null;
                    return (
                        <div key={i}>
                            <h4>{title}</h4>
                            <div>id : {id}</div>
                            <div>channel : {channelUrl}</div>
                            <div>thumbnail : {thumbnail}</div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Data;
