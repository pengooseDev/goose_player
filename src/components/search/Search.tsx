import {
  axiosAtom,
  loadingAtom,
  searchToggleAtom,
  queueToggleAtom,
} from '../../atom';
import { useRecoilState } from 'recoil';
import Card from '../Card';
import styled from 'styled-components';
import SearchBar from '../../components/search/SearchBar';
import { AnimatePresence, motion } from 'framer-motion';
import loadingGIF from '../../assets/img/loading.gif';
import React from 'react';
import Image from 'next/image';

const Search = () => {
  const [axiosData, setAxiosData] = useRecoilState(axiosAtom);
  const [isLoading, setLoading] = useRecoilState<boolean>(loadingAtom);
  const [searchToggle, setSearchToggle] = useRecoilState(searchToggleAtom);
  const [queueToggle, setQueueToggle] = useRecoilState(queueToggleAtom);

  const overlayToggleHandler = () => {
    setSearchToggle((prev) => false);
  };

  return (
    <>
      <AnimatePresence>
        {searchToggle ? (
          <>
            <Overlay onClick={overlayToggleHandler}></Overlay>

            <Container
              variants={containerVar}
              initial="from"
              animate="to"
              exit="exit"
            >
              <Wrapper>
                <Title>
                  <span>Search</span>

                  <Exit />
                </Title>
                <SearchBar />
                {isLoading ? (
                  <Loading>
                    <LoadingGif>
                      <Image src={loadingGIF} />
                    </LoadingGif>
                  </Loading>
                ) : (
                  <Cards>
                    {axiosData.map((videoData, i) => {
                      return (
                        <Card
                          key={`${i}search${videoData.id}`}
                          data={videoData}
                        />
                      );
                    })}
                  </Cards>
                )}
              </Wrapper>
            </Container>
          </>
        ) : null}
      </AnimatePresence>
    </>
  );
};

export default Search;

const LoadingGif = styled.div`
  width: 250px;
  height: 250px;
`;

const Loading = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 600px;
`;

const Overlay = styled.div`
  position: fixed;
  z-index: 1;
  top: 0px;
  left: 0px;
  width: 100vw;
  height: 100vh;
`;

const containerVar = {
  from: {
    opacity: 0,
    scale: 0,
    transition: { duration: 0 },
  },
  to: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0 },
  },
  exit: {
    opacity: 0,
    scale: 0,
    transition: { duration: 0.1 },
  },
};

const Container = styled(motion.div)`
  position: absolute;
  top: 10%;
  display: flex;
  justify-content: center;
  transition: 0.2s ease-in-out;
  min-height: 100px;
  max-height: 120%;
`;

const Wrapper = styled(motion.div)`
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  position: relative;
  z-index: 5;
  display: flex;
  flex-direction: column;
  width: 570px;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 1px 3px 15px rgba(111, 111, 111, 0.5);
`;

const Title = styled.div`
  background: #111;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 30px;
  font-weight: 600;
  padding: 5px 10px;
  border-radius: 5px;
  margin-bottom: 13.5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.6);
`;

const Cards = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 10px;
  overflow-y: auto;
  padding-right: 10px;
`;

const Exit = () => {
  const [toggleState, setToggleState] = useRecoilState(searchToggleAtom);

  const exitToggleHandler = () => {
    setToggleState((prev) => false);
  };

  return (
    <ExitWrapper onClick={exitToggleHandler}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </ExitWrapper>
  );
};

const ExitWrapper = styled.div`
  width: 40px;
  height: 40px;
  font-weight: 600;
  display: flex;
  padding: 3px;
  border-radius: 3px;
  :hover {
    cursor: pointer;
  }
`;
