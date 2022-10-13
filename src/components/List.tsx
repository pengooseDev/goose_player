import React from "react";
import styled from "styled-components";
import { queueIndexAtom } from "../atom";
import { useRecoilState } from "recoil";

interface infoProps {
    info: {
        id: string;
        title: string[];
        thumbnail: string;
        duration: string;
        owner: string;
    };
}

const List = ({ info }: infoProps) => {
    const [queueIndex, setQueueIndex] = useRecoilState(queueIndexAtom);

    const { id, duration, owner, thumbnail, title } = info;

    const listClickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
        console.log(e.currentTarget.id);
        //id 찾아서 해당 인덱스 넘겨줘야함.
    };
    return (
        <Wrapper onClick={listClickHandler} key={`li-${id}`} id={id}>
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

export default List;

interface ThumbnailProps {
    thumbnail: string;
}

const Info = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background: transparent;
    width: 250px;
    border-radius: 3px;
    overflow-y: auto;
`;

const SubInfo = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
`;

const Title = styled.div`
    font-size: 13px;
    font-weight: 600;
`;

const Duration = styled.div`
    font-size: 12.5px;
`;

const Owner = styled.div`
    font-size: 12.5px;
`;

const Wrapper = styled.div`
    display: flex;
    color: #cbd5e1;
    justify-content: space-between;
    border-radius: 3px;
    padding: 10px;
    height: 8rem;
    transition: 0.1s ease-in-out;
    border-radius: 5px;
    :hover {
        background: rgba(0, 0, 0, 0.65);
        cursor: pointer;
    }
`;

const Thumbnail = styled.div<ThumbnailProps>`
    background: url(${(props) => props.thumbnail});
    background-size: contain;
    background-repeat: no-repeat;
    border-radius: 5px;
    width: 200px;
`;
