import React from "react";
import styled from "styled-components";
import { queueAtom, queueIndexAtom } from "../atom";
import { useRecoilState } from "recoil";
import DragHandle from "./DragHandle";
import { Draggable } from "react-beautiful-dnd";
import Delete from "./Delete";

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
  const [queue, setQueue] = useRecoilState(queueAtom);
  const [queueIndex, setQueueIndex] = useRecoilState(queueIndexAtom);
  const { id, duration, owner, thumbnail, title } = info;

  const listClickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    const targetId = e.currentTarget.id;
    //id 찾아서 해당 인덱스 넘겨줘야함.
    const targetIndex = queue.map((i) => i.id === targetId).indexOf(true);
    setQueueIndex((prev) => targetIndex);
  };

  return (
    <Draggable draggableId={info.id} index={index}>
      {(provided) => (
        <Wrapper
          index={index}
          queueIndex={queueIndex}
          key={`li-${id}`}
          id={id}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Content onClick={listClickHandler} id={id}>
            <DragHandle />
            <Thumbnail thumbnail={thumbnail} />
            <Info>
              <Title>{title}</Title>
              <SubInfo>
                <Owner>{owner}</Owner>
                <Duration>{duration}</Duration>
              </SubInfo>
            </Info>
          </Content>
          <Delete id={id} />
        </Wrapper>
      )}
    </Draggable>
  );
};

export default List;

interface ThumbnailProps {
  thumbnail: string;
}

const Content = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Wrapper = styled.div<{ index: number; queueIndex: number }>`
  display: flex;
  justify-content: space-between;
  color: #cbd5e1;
  background: ${(props) =>
    props.index == props.queueIndex ? "rgba(222,222,222,0.15)" : ""};
  padding: 10px 0px 10px 10px;
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
  width: 190px;
  border-radius: 3px;
  overflow-y: auto;
  margin-right: 10px;
`;

const SubInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  margin-top: 0.5rem;
  align-items: flex-end;
  font-size: 10px;
`;

const Title = styled.div`
  font-size: 13px;
  font-weight: 600;
  overflow: hidden;
  text-overflow: ellipsis;
  height: 2rem;
  word-wrap: brek-word;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const Owner = styled.div`
  opacity: 0.5;
`;

const Duration = styled.div`
  opacity: 0.55;
`;

const Thumbnail = styled.div<ThumbnailProps>`
  background: url(${(props) => props.thumbnail});
  background-size: contain;
  background-repeat: no-repeat;
  width: 150px;
`;
