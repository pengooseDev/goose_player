import styled from "styled-components";
import { playerAtom } from "../atom";
import { useRecoilState } from "recoil";

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

    const cardClickHandler = (id: string) => {
        console.log(id);
    };

    return (
        <Wrapper>
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
    background: rgba(0, 0, 0, 0.3);
    padding: 10px;
    height: 8rem;
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
