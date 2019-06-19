import React, { memo } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const ListItem = memo(({ id, name, onClick, onDelete }) => {
  return <Container>
    <div onClick={() => onClick(id)}>{name}</div>
    <div onClick={() => onDelete(id)}>[del]</div>
  </Container>;
});

export default ListItem;