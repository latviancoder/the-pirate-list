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

function App() {
  console.time('custom hook');
  const [pirates] = useFetchPirates([]);
  console.timeEnd('custom hook');

  console.time('multiple hooks');
  const [selectedPirate, setSelectedPirate] = useState();
  const [selectedCountry, setSelectedCountry] = useState();
  const [search, setSearch] = useState('');
  console.timeEnd('multiple hooks');

  console.time('chart data');
  const chartData = useMemo(
    () => generateChartData(pirates, selectedCountry),
    [pirates, selectedCountry]
  );
  console.timeEnd('chart data');

  console.time('countries');
  const countries = getCountries(pirates);
  console.timeEnd('countries');

  return <>
    <GlobalStyle/>

    <Container>
      <Header
        countries={countries}
        selectedCountry={selectedCountry}
        onCountryChange={setSelectedCountry}
        search={search}
        onSearchChange={setSearch}
      />

      <Main>
        <List
          pirates={pirates}
          onClick={setSelectedPirate}
        />
        {selectedPirate && <Details {...pirates.find(p => p.id === selectedPirate)}/>}
      </Main>

      <Chart data={chartData}/>
    </Container>
  </>;
}

export default App;
