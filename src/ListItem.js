import React, { memo } from 'react';
import styled from 'styled-components';

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
const ListItem = ({ id, name, active, onClick }) => (
  <Container onClick={() => onClick(id)}>
    <Link>{name}</Link>
    {active}
  </Container>
);

ListItem.displayName = 'ListItem';

export default ListItem;