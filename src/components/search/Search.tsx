import {
    axiosAtom,
    axiosData,
    loadingAtom,
    searchToggleAtom,
} from "../../atom";
import { useRecoilState } from "recoil";
import Card from "../Card";
import styled from "styled-components";
import SearchBar from "../../components/search/SearchBar";
import { motion } from "framer-motion";

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

    //axios가 받아오는 데이터 형식이 local, vercel에 따라 다름. (title에 정규표현식 안먹음!)
    /* Local용 */
    const titleLocalRegex = /^.*? (?=게시자: )/g; //텍스트의 처음부터 "게시자"의 전방탐색까지.
    const title = titleLocalRegex.exec(titleData);

    /* ID */
    const id = axiosData.videoRenderer?.videoId;

    const owner = axiosData.videoRenderer?.ownerText.runs[0].text;

    const duration =
        axiosData.videoRenderer?.lengthText.accessibility.accessibilityData
            .label;

    return {
        title,
        id,
        channelUrl,
        thumbnail,
        duration,
        owner,
    };
}; //

const toggleVariants = {
    from: {
        opacity: 0,
    },
    to: {
        opacity: 1,
    },
    exit: {
        opacity: 0,
    },
};

const Search = () => {
    const [axiosData, setAxiosData] = useRecoilState<axiosData[]>(axiosAtom);
    const [isLoading, setLoading] = useRecoilState<boolean>(loadingAtom);
    const [searchToggle, setSearchToggle] = useRecoilState(searchToggleAtom);

    const overlayToggleHandler = () => {
        setSearchToggle((prev) => false);
    };

    return (
        <>
            <Overlay onClick={overlayToggleHandler}></Overlay>
            <Container>
                <Wrapper
                //variants={toggleVariants}
                //initial="from"
                //animate="to"
                //exit="exit"
                >
                    <Title>
                        <span>Data</span>
                        <Exit />
                    </Title>
                    <SearchBar />
                    {isLoading ? (
                        "Loading"
                    ) : (
                        <Cards>
                            {axiosData.map((v, i) => {
                                const videoData = dataTrimmer(v);
                                // dataTrimmer에서 거르는 data는 return undefined임.
                                //버리는 데이터 컴포넌트 생성하지 않는 예외처리코드.
                                if (!videoData) return;
                                const {
                                    title,
                                    id,
                                    channelUrl,
                                    thumbnail,
                                    duration,
                                    owner,
                                } = videoData;
                                if (
                                    !title ||
                                    !id ||
                                    !channelUrl ||
                                    !thumbnail ||
                                    !duration ||
                                    !owner
                                )
                                    return null;
                                return (
                                    <Card
                                        key={i}
                                        data={{
                                            title,
                                            id,
                                            channelUrl,
                                            thumbnail,
                                            duration,
                                            owner,
                                        }}
                                    />
                                );
                            })}
                        </Cards>
                    )}
                </Wrapper>
            </Container>
        </>
    );
};

export default Search;

const Overlay = styled.div`
    position: fixed;
    z-index: 1;
    top: 0px;
    left: 0px;
    width: 100vw;
    height: 100vh;
`;

const Container = styled.div`
    position: absolute;
    top: 20%;
    display: flex;
    justify-content: center;
`;

const Wrapper = styled(motion.div)`
    background: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(10px);
    position: relative;
    z-index: 5;
    display: flex;
    flex-direction: column;
    width: 570px;
    padding: 10px;
    border-radius: 5px;
    box-shadow: 1px 3px 15px rgba(111, 111, 111, 0.5);
`;

const Title = styled.div`
    background: #111;
    color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 30px;
    font-weight: 600;
    padding: 5px 10px;
    border-radius: 5px;
    margin-bottom: 13.5px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.6);
`;

const Cards = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 10px;
    height: 600px;
    overflow-y: auto;
    padding-right: 10px;
`;

const Exit = () => {
    const [toggleState, setToggleState] = useRecoilState(searchToggleAtom);

    const exitToggleHandler = () => {
        setToggleState((prev) => false);
    };
    return (
        <ExitWrapper onClick={exitToggleHandler}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                />
            </svg>
        </ExitWrapper>
    );
};

const ExitWrapper = styled.div`
    width: 40px;
    height: 40px;
    font-weight: 600;
    display: flex;
    padding: 3px;
    border-radius: 3px;
    :hover {
        cursor: pointer;
    }
`;
