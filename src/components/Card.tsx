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
            <div>
                <h4>{title}</h4>
                <div>id : {id}</div>
            </div>
        </Wrapper>
    );
};

export default Card;

interface ThumbnailProps {
    thumbnail: string;
}

const Wrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);

    background: rgba(0, 0, 0, 0.3);
    padding: 10px;
`;

const Thumbnail = styled.div<ThumbnailProps>`
    background: url(${(props) => props.thumbnail});
    background-size: contain;
    background-repeat: no-repeat;
    width: 200px;
    height: 200px;
`;
