import { axiosAtom, axiosData } from "../atom";
import { useRecoilState } from "recoil";
import Card from "./Card";
import styled from "styled-components";

const dataTrimmer = (axiosData: axiosData) => {
    /* ChannelUrl */
    const info =
        axiosData.videoRenderer?.channelThumbnailSupportedRenderers
            .channelThumbnailWithLinkRenderer;
    const channelId = info?.navigationEndpoint.canonicalBaseUrl;
    const channelUrl = `https://www.youtube.com/${channelId}`;

    /* thumbnail */
    const thumbnailData = axiosData.videoRenderer?.thumbnail?.thumbnails[0];
    const thumbnail = thumbnailData?.url;

    //유튜브 쇼츠인 경우, 이미지 크기 맞추기 힘듦. 썸네일 세로>가로면 버리기.
    if (!thumbnailData) return;
    const { height, width } = thumbnailData;
    if (height > width) return;

    /* Title */
    const titleData =
        axiosData.videoRenderer?.title.accessibility.accessibilityData.label;

    const titleRegex = /^.*? (?=게시자: )/g; //텍스트의 처음부터 "게시자"의 전방탐색까지.
    const title = titleRegex.exec(titleData);

    /* ID */
    const id = axiosData.videoRenderer?.videoId;
    return { title, id, channelUrl, thumbnail };
};

const Data = () => {
    const [axiosData, setAxiosData] = useRecoilState<axiosData[]>(axiosAtom);
    return (
        <div>
            <h1>data</h1>
            <Cards>
                {axiosData.map((v, i) => {
                    const videoData = dataTrimmer(v);
                    console.log(videoData);
                    // dataTrimmer에서 거르는 data는 return undefined임.
                    //버리는 데이터 컴포넌트 생성하지 않는 예외처리코드.
                    if (!videoData) return;
                    const { title, id, channelUrl, thumbnail } = videoData;
                    if (!title || !id || !channelUrl || !thumbnail) return null;
                    return (
                        <Card
                            key={i}
                            data={{ title, id, channelUrl, thumbnail }}
                        />
                    );
                })}
            </Cards>
        </div>
    );
};

export default Data;

const Cards = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 10px;
    width: 500px;
`;
