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

const SearchData = () => {
    const [axiosData, setAxiosData] = useRecoilState<axiosData[]>(axiosAtom);
    return (
        <Wrapper>
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
                            <Thumbnail thumbnail={thumbnail}>
                                {thumbnail}
                            </Thumbnail>
                        </div>
                    );
                })}
            </div>
        </Wrapper>
    );
};

//Ref과정에서 Depth 최소화하기.
//위에서 return하는 컴포넌트를 또 세분화해도 될 듯.
//다만, depth를 통해 state변경으로 인한 최적화로 얻는 기댓값은 높지 않음.

export default SearchData;

const Wrapper = styled.div`
    padding: 10px;
    background: #111;
    color: #d8d8d8;
`;

interface imgUrlProp {
    thumbnail: string;
}

const Thumbnail = styled.div<imgUrlProp>`
    background: url(${(props) => props.thumbnail});
    background-size: cover;
`;
