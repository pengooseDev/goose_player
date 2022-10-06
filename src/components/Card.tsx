import styled from "styled-components";

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
