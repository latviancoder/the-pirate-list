import React, { memo, useLayoutEffect, useRef, useState } from 'react';
import { VictoryBar, VictoryChart } from 'victory';

const Chart = ({ data }) => (
  <VictoryChart>
    <VictoryBar
      data={data}
    />
  </VictoryChart>
);

Chart.displayName = 'Chart';

export default Chart;