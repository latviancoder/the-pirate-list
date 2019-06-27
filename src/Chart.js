import React, { memo, useLayoutEffect, useRef, useState } from 'react';
import { VictoryBar, VictoryChart } from 'victory';

const Chart = memo(({ data }) => {
  console.log('rerender chart');
  const ref = useRef();
  const [width, setWidth] = useState(0);

  useLayoutEffect(() => {
    setWidth(ref.current.getBoundingClientRect().width);
  }, []);

  return <div ref={ref}>
    <VictoryChart
      height={250}
      width={width}
      domainPadding={{ x: 50, y: [0, 20] }}
      scale={{ x: 'time' }}
    >
      <VictoryBar
        data={data}
      />
    </VictoryChart>
  </div>;
});

Chart.displayName = 'Chart';

export default Chart;