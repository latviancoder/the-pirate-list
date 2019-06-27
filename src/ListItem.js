import React, { memo } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  align-items: center;
`;

// ListItem
const ListItem = memo(({ id, name, onClick }) => (
  <Container onClick={() => onClick(id)}>
    {name}
  </Container>
));

ListItem.displayName = 'ListItem';

export default ListItem;