import ListItem from './ListItem';
import React from 'react';
import styled from 'styled-components';
import { Box } from './stuff';

const StyledList = styled(Box)`
  padding: 0;
  flex: 1;
  height: 50vh;
  overflow-y: scroll;
`;

const Header = styled.header`
  height: 60px;
  padding: 0 20px;
  align-items: center;
  display: flex;
  border-bottom: 1px #E4E9EC solid;
  justify-content: space-between;
  color: #989898;
`;

export default function List({ pirates, onClick }) {
  return <StyledList>
    <Header>
      <span>Name</span>
      <span>Years active</span>
    </Header>
    {pirates.map((pirate, i) => (
      <ListItem
        key={i}
        onClick={onClick}
        {...pirate}
      />
    ))}
  </StyledList>;
}