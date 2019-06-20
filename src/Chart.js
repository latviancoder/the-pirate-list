import React, { useLayoutEffect, useRef, useState } from 'react';
import { VictoryBar, VictoryChart } from 'victory';

export default function Chart({ data }) {
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
        // data={[
        //   { x: new Date(1986, 1, 1), y: 2 },
        //   { x: new Date(1996, 1, 1), y: 3 },
        //   { x: new Date(2006, 1, 1), y: 5 },
        //   { x: new Date(2016, 1, 1), y: 4 }
        // ]}
      />
    </VictoryChart>
  </div>;
}