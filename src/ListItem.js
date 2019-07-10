import React, { memo } from 'react';
import styled from 'styled-components';
import { areEqual } from 'react-window';

const Container = styled.div`
  display: flex;
  align-items: center;
`;

// ListItem
const ListItem = memo(({ index, style, data }) => {
  const pirate = data.pirates[index];

  return <Container
    style={style}
    onClick={() => data.onClick(pirate.id)}
  >
    {pirate.name}
  </Container>;
}, areEqual);

ListItem.displayName = 'ListItem';

export default ListItem;