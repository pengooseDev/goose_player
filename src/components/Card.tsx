import styled from "styled-components";
import { queueAtom } from "../atom";
import { useRecoilState } from "recoil";
import { queueUrlTrimmer } from "../../pages/api/controller/urlTrimmer";

interface CardProps {
    data: {
        title: RegExpExecArray;
        id: string;
        channelUrl: string;
        thumbnail: string;
    };
}

const Card = ({ data }: CardProps) => {
    const { title, id, channelUrl, thumbnail } = data;
    const [queue, setQueue] = useRecoilState(queueAtom);

    const cardClickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
        const { id: targetId } = e.currentTarget;
        setQueue((prev) => {
            return [...prev, queueUrlTrimmer(targetId)];
        });
    };

    return (
        <Wrapper id={id} onClick={cardClickHandler}>
            <Thumbnail thumbnail={thumbnail} />
            <Info>
                <div>{title}</div>
            </Info>
        </Wrapper>
    );
};

export default Card;

interface ThumbnailProps {
    thumbnail: string;
}

const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    background: rgba(255, 255, 255, 0.2);
    padding: 10px;
    height: 8rem;
    border-radius: 0px;
    transition: 0.1s ease-in-out;
    :hover {
        background: rgba(0, 0, 0, 0.3);
        cursor: pointer;
    }
`;

const Thumbnail = styled.div<ThumbnailProps>`
    background: url(${(props) => props.thumbnail});
    background-size: contain;
    background-repeat: no-repeat;
    width: 200px;
`;

const Info = styled.div`
    display: flex;
    padding: 10px;
    align-items: flex-start;
    font-weight: 600;
    background: white;
    box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.6);
    width: 300px;
`;
