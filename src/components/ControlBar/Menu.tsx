import QueueToggleBtn from '../../../src/components/QueueToggleBtn';
import IconSearch from '../../../src/components/search/IconSearch';
import styled from 'styled-components';

const Menu = () => {
  return (
    <Wrapper>
      <IconSearch />
      <QueueToggleBtn />
    </Wrapper>
  );
};

export default Menu;

const Wrapper = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 3;
  div {
    margin-bottom: 10px;
  }
`;
