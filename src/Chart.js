import React from 'react';
import { VictoryBar, VictoryChart } from 'victory';
import { generateChartData } from './stuff';

const Chart = ({ pirates, selectedCountry }) => {
  const data = generateChartData(pirates, selectedCountry);

  return <VictoryChart>
    <VictoryBar
      data={data}
    />
  </VictoryChart>;
};

Chart.displayName = 'Chart';

export default Chart;