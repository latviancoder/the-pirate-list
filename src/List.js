import ListItem from './ListItem';
import React from 'react';
import styled from 'styled-components';
import { Box } from './stuff';

const StyledList = styled(Box)`
  flex: 1;
  height: 60vh;
  overflow-y: scroll;
`;

export default function List({ pirates, onClick }) {
  return <StyledList>
    {pirates.map((pirate, i) => (
      <ListItem
        key={i}
        onClick={onClick}
        {...pirate}
      />
    ))}
  </StyledList>;
}