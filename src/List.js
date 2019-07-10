import React from 'react';
import { FixedSizeList as VirtualisedList } from 'react-window';

import ListItem from './ListItem';

export default function List({ pirates, onClick }) {
  return <VirtualisedList
    height={500}
    itemData={{ pirates, onClick }}
    itemCount={pirates.length}
    itemSize={28}
    width="100%"
  >
    {ListItem}
  </VirtualisedList>;
}