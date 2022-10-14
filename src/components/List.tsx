import React from "react";
import styled from "styled-components";
import { queueIndexAtom } from "../atom";
import { useRecoilState } from "recoil";
import DragHandle from "./DragHandle";
import { Draggable } from "react-beautiful-dnd";

interface infoProps {
    info: {
        id: string;
        title: string[];
        thumbnail: string;
        duration: string;
        owner: string;
    };
    index: number;
}

const List = ({ info, index }: infoProps) => {
    const [queueIndex, setQueueIndex] = useRecoilState(queueIndexAtom);
    const { id, duration, owner, thumbnail, title } = info;

    const listClickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
        console.log(e.currentTarget.id);
        //id 찾아서 해당 인덱스 넘겨줘야함.
    };

    return (
        <Draggable draggableId={info.id} index={index}>
            {(provided) => (
                <Wrapper
                    onClick={listClickHandler}
                    index={index}
                    queueIndex={queueIndex}
                    key={`li-${id}`}
                    id={id}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    <DragHandle />
                    <Thumbnail thumbnail={thumbnail} />
                    <Info>
                        <Title>{title}</Title>
                        <SubInfo>
                            <Duration>{duration}</Duration>
                            <Owner>{owner}</Owner>
                        </SubInfo>
                    </Info>
                </Wrapper>
            )}
        </Draggable>
    );
};

export default List;

interface ThumbnailProps {
    thumbnail: string;
}

const Wrapper = styled.div<{ index: number; queueIndex: number }>`
    display: flex;
    color: #cbd5e1;
    background: ${(props) =>
        props.index == props.queueIndex ? "rgba(222,222,222,0.15)" : ""};
    justify-content: space-between;
    border-radius: 3px;
    padding: 10px;
    height: 100px;
    transition: 0.1s ease-in-out;
    border-radius: 5px;

    :hover {
        background: rgba(0, 0, 0, 0.85);
        cursor: pointer;
    }
`;

const Info = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    background: transparent;
    width: 220px;
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
    overflow: hidden;
    text-overflow: ellipsis;
    height: 38px;
    word-wrap: brek-word;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
`;

const Duration = styled.div`
    font-size: 12.5px;
`;

const Owner = styled.div`
    font-size: 12.5px;
`;

const Thumbnail = styled.div<ThumbnailProps>`
    background: url(${(props) => props.thumbnail});
    background-size: contain;
    background-repeat: no-repeat;
    width: 150px;
`;
