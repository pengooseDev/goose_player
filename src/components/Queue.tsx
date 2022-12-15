import styled from 'styled-components';
import { Droppable, DropResult, DragDropContext } from 'react-beautiful-dnd';
import { queueAtom, queueIndexAtom, queueToggleAtom } from '../atom';
import { useRecoilState } from 'recoil';
import List from './List';
import { motion } from 'framer-motion';
import { AnimatePresence } from 'framer-motion';

interface Info {
  id: string;
  title: string[];
  thumbnail: string;
  duration: string;
  owner: string;
}

type Queue = Info[];

const Queue = () => {
  const [queue, setQueue] = useRecoilState(queueAtom);
  const [queueToggle, setQueueToggle] = useRecoilState(queueToggleAtom);
  const [queueIndex, setQueueIndex] = useRecoilState(queueIndexAtom);

  const dragEndHandler = (info: DropResult) => {
    const { source, destination } = info;
    if (!destination) return; //Cancel Drag exception

    //데이터 변경.
    setQueue((prev) => {
      const queueData = [...prev];
      const targetData = queueData[source.index];
      queueData.splice(source.index, 1);
      queueData.splice(destination.index, 0, targetData);
      return queueData;
      //이전 데이터 삭제.
      //위치에 추가.
    });

    /* queueIndex Algorithm */
    //재생 중인 곡을 옮길 때, queueIndex유지.
    if (source.index === queueIndex) {
      setQueueIndex((prev) => destination.index);
    }

    //재생 중인 queueIndex가 des인 경우.
    if (destination.index === queueIndex) {
      if (source.index > queueIndex) {
        return setQueueIndex((prev) => prev + 1);
      }

      if (source.index < queueIndex) {
        return setQueueIndex((prev) => prev - 1);
      }
    }

    if (destination.index !== queueIndex) {
      if (source.index < queueIndex) {
        if (destination.index < queueIndex) return;
        return setQueueIndex((prev) => prev - 1);
      }

      if (source.index > queueIndex) {
        if (destination.index > queueIndex) return;
        return setQueueIndex((prev) => prev + 1);
      }
    }
  };

  return (
    <DragDropContext onDragEnd={dragEndHandler}>
      <AnimatePresence>
        {queueToggle ? (
          <Container
            variants={wrapperVariants}
            initial="from"
            animate="to"
            exit="exit"
          >
            <Wrapper>
              <Header>
                <Title>Your Queue</Title>
              </Header>
              <QueueWrapper>
                <Droppable droppableId="queue">
                  {(provided) => (
                    <QueueList
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                    >
                      {Object.entries(queue).map(([v, info], i) => {
                        return (
                          <List
                            key={`${Object(info).id}queue${i}`}
                            info={Object(info)}
                            index={i}
                          />
                        );
                      })}
                      {provided.placeholder}
                    </QueueList>
                  )}
                </Droppable>
              </QueueWrapper>
            </Wrapper>
          </Container>
        ) : null}
      </AnimatePresence>
    </DragDropContext>
  );
};

//Object.entries(queue).map([v,info],i) = > {}
//위 경우 value가 type이 무엇이든 넘어갈 때 string으로 넘어가고 다시 형 변환 되는듯.

export default Queue;

/* Framer */

const wrapperVariants = {
  from: { left: -360, opacity: 1 },
  to: {
    left: 0,
    opacity: 1,
    transition: { type: 'linear', duration: 0.15 },
  },
  exit: { left: -360, opacity: 0, transition: { duration: 0.15 } },
};

const Container = styled(motion.div)`
  position: absolute;
  top: 0px;
  left: 0px;
  transition: ease-in-out;
`;

const Wrapper = styled.div`
  background: rgba(15, 15, 15, 0.5);
  backdrop-filter: blur(10px);
  display: flex;
  flex-direction: column;
  width: 450px;
  padding: 10px;
  border-radius: 5px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 5px 10px 0px;
`;

const Title = styled.div`
  color: whitesmoke;
  font-weight: 600;
  font-size: 20px;
  padding: 5px 0px;
`;

const QueueWrapper = styled.div`
  height: 600px;
  overflow-y: auto;
`;

const QueueList = styled.div`
  display: grid;
  grid-template-rows: repeat(1, minmax(0, 1fr));
  grid-auto-flow: row;
  padding-right: 10px;
`;
