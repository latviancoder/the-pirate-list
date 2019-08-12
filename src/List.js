import React from 'react';
import { FixedSizeList as VirtualisedList } from 'react-window';
import styled from 'styled-components';

import { Box } from './stuff';
import ListItem from './ListItem';

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

export default function List({ itemData, itemCount }) {
  return <StyledList>
    <Header>
      <span>Name</span>
      <span>Years active</span>
    </Header>
    <VirtualisedList
      height={500}
      itemData={itemData}
      itemCount={itemCount}
      itemSize={60}
      width="100%"
    >
      {ListItem}
    </VirtualisedList>
  </StyledList>;
}