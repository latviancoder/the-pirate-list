import React, { memo } from 'react';
import { VictoryLine, VictoryChart, VictoryTheme, VictoryAxis } from 'victory';
import { Box } from './stuff';

const Chart = memo(({ data }) => (
  <Box style={{ marginTop: '30px', paddingBottom: 0 }}>
    <VictoryChart
      theme={VictoryTheme.material}
      height={80}
      domainPadding={10}
      padding={{ top: 5, bottom: 20, left: 15, right: 5 }}
      scale={{ x: 'time' }}
      minDomain={{ y: 2 }}

    >
      <VictoryAxis
        dependentAxis
        style={{
          tickLabels: {
            fontSize: 6,
            padding: 2,
            fill: '#989898'
          }
        }}
      />
      <VictoryAxis
        offsetY={20}
        crossAxis
        style={{
          tickLabels: {
            fontSize: 6,
            padding: 5,
            fill: '#989898'
          }
        }}
      />
      <VictoryLine
        data={data}
        style={{ data: { stroke: '#697AD6', strokeWidth: 1, strokeLinecap: 'round' } }}
        interpolation="catmullRom"
      />
    </VictoryChart>
  </Box>
));

Chart.displayName = 'Chart';

export default Chart;