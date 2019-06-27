import React, { createContext, useMemo, useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';

import Header from './Header';
import { filterPirates, generateChartData, getCountries, getYearsOfLife, useFetchPirates } from './stuff';
import Details from './Details';
import Chart from './Chart';
import List from './List';

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Muli', sans-serif;
    font-size: 22px;
    color: #525f7f; 
    background-color: #F5F8FC;
  }
  * {
    outline: none;
  }
`;

const Main = styled.main`
  display: flex;
  align-items: flex-start;
  max-width: 1000px;
  margin: 0 auto;
`;

const Container = styled.div`
  max-width: 1000px;
  min-height: 100vh;
  margin: 0 auto;
`;

const AppContext = createContext(null);

// App
const App = () => {
  const [pirates] = useFetchPirates([]);
  const [selectedPirate, setSelectedPirate] = useState();

  const handleClick = (pirateId) => {
    setSelectedPirate(pirateId);
  };

  return <List
    pirates={pirates}
    onClick={handleClick}
  />;
};

export default App;
