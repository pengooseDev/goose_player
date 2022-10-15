import styled from "styled-components";
import { queueAtom } from "../atom";
import { useRecoilState } from "recoil";
import { Video } from "../types";

const Card = ({ data }: { data: Video }) => {
    const { title, id, thumbnail, duration, owner } = data;
    const [queue, setQueue] = useRecoilState(queueAtom);

    const isDuplicate = Boolean(queue.filter((i) => i.id === id).length);

    const cardClickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
        //id가 이미 queue에 존재한다면 except.
        if (isDuplicate) return;

        setQueue((prev) => {
            return [...prev, data];
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
    background: transparent;
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
`;

const Owner = styled.div`
    font-size: 12.5px;
`;

const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 3px;
    padding: 10px;
    height: 8rem;
    transition: 0.1s ease-in-out;
    color: #111827;
    :hover {
        background: rgba(0, 0, 0, 0.65);
        cursor: pointer;
        color: #cbd5e1;
    }
`;

const Thumbnail = styled.div<ThumbnailProps>`
    background: url(${(props) => props.thumbnail});
    background-size: contain;
    background-repeat: no-repeat;
    border-radius: 5px;
    width: 200px;
`;
