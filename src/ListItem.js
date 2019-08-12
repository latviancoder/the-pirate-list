import React, { memo } from 'react';
import styled from 'styled-components';
import { areEqual } from 'react-window';

const Container = styled.div`
  display: flex;
  align-items: center;
  height: 60px;
  justify-content: space-between;
  background: #F7FAFC;
  border-bottom: 1px #E4E9EC solid;
  padding: 0 20px;
`;

const Link = styled.a`
  color: #697AD6;
  cursor: pointer;
`;

// ListItem
const ListItem = memo(({ index, style, data }) => {
  const {name, active, id} = data.pirates[index];

  return <Container
    style={style}
    onClick={() => data.onClick(id)}
  >
    <Link>{name}</Link>
    {active}
  </Container>;
}, areEqual);

ListItem.displayName = 'ListItem';

export default ListItem;