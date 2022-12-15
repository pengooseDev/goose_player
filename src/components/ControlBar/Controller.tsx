import styled from 'styled-components';
import NextBtn from './Next';
import PrevBtn from './Prev';
import Loop from './Loop';
import Pause from './Pause';
import Volume from './Volume';
import IconSearch from '../search/IconSearch';
import { useEffect, useState } from 'react';

const Controller = () => {
  const [mount, setMount] = useState(false);
  useEffect(() => {
    if (typeof window !== undefined) {
      setMount((prev) => true);
    }
  }, []);

  return (
    <Wrapper>
      <Right />
      {mount && (
        <>
          <PrevBtn />
          <Pause />
          <NextBtn />
          <Loop />
          <IconSearch />
          <Volume />
        </>
      )}
    </Wrapper>
  );
};

const Right = styled.div`
  background: teal;
`;

const Wrapper = styled.div`
  position: relative;
  top: 10px;
  right: 20px;

  display: flex;
  justify-content: center;
  align-items: flex-end;

  width: 640px;
  background: rgba(0, 0, 0, 0.5);
  padding: 10px;
  border-radius: 0px 0px 5px 5px;

  transform: skew(20deg) rotate(20deg);

  div {
    margin-right: 5px;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.5);
  }
`;

export default Controller;
