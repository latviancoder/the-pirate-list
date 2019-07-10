import React, { useMemo } from 'react';
import { FixedSizeList as VirtualisedList } from 'react-window';

import ListItem from './ListItem';

export default function List({ pirates, onClick }) {
  const itemData = useMemo(() => ({ pirates, onClick }), [pirates, onClick]);

  return <VirtualisedList
    height={500}
    itemData={itemData}
    itemCount={pirates.length}
    itemSize={28}
    width="100%"
  >
    {ListItem}
  </VirtualisedList>;
}