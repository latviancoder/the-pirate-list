import React, { useMemo, useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';

import Header from './Header';
import { filterPirates, generateChartData, getCountries, useFetchPirates } from './stuff';
import Details from './Details';
import Chart from './Chart';
import ListItem from './ListItem';
import { FixedSizeList as VirtualisedList } from 'react-window';

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
  const [pirates] = useFetchPirates([]);

  const [selectedPirate, setSelectedPirate] = useState();
  const [selectedCountry, setSelectedCountry] = useState();
  const [search, setSearch] = useState('');

  const chartData = useMemo(
    () => generateChartData(pirates, selectedCountry),
    [pirates, selectedCountry]
  );

  const countries = useMemo(() => getCountries(pirates), [pirates]);
  const filteredPirates = filterPirates(pirates, search, selectedCountry);

  const itemData = useMemo(
    () => ({ pirates: filteredPirates, onClick: setSelectedPirate }),
    [filteredPirates, setSelectedPirate]
  );

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
        <VirtualisedList
          height={500}
          itemSize={28}
          width={'100%'}
          itemData={itemData}
          itemCount={filteredPirates.length}
        >
          {ListItem}
        </VirtualisedList>
        {selectedPirate && <Details {...pirates.find(p => p.id === selectedPirate)}/>}
      </Main>

      <Chart data={chartData}/>
    </Container>
  </>;
}

export default App;
