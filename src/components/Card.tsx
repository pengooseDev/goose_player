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
        duration: string;
        owner: string;
    };
}

const Card = ({ data }: CardProps) => {
    const { title, id, thumbnail, duration, owner } = data;
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
                <Title>{title}</Title>
                <SubInfo>
                    <Duration>{duration}</Duration>
                    <Owner>{owner}</Owner>
                </SubInfo>
            </Info>
        </Wrapper>
    );
};

export default Card;

interface ThumbnailProps {
    thumbnail: string;
}

const Info = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 10px;
    font-weight: 600;
    background: white;
    box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.6);
    width: 300px;
    border-radius: 3px;
    overflow-y: auto;
`;

const SubInfo = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
`;

const Title = styled.div``;

const Duration = styled.div`
    font-size: 12.5px;
    color: rgba(0, 0, 0, 0.8);
`;

const Owner = styled.div`
    font-size: 12.5px;
    color: rgba(0, 0, 0, 0.8);
`;

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
