import React, { useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';

import Header from './Header';
import { filterPirates, getCountries, useFetchPirates } from './stuff';
import Details from './Details';
import Chart from './Chart';
import List from './List';

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Muli', sans-serif;
    font-size: 22px;
    color: #525f7f; 
    background-color: #E4E8ED;
  }
  * {
    outline: none;
    box-sizing: border-box;
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

  const countries = getCountries(pirates);
  const filteredPirates = filterPirates(pirates, search, selectedCountry);

  return <>
    <GlobalStyle/>

    <Container>
      <Header
        countries={countries}
        selectedCountry={selectedCountry}
        onCountryChange={setSelectedCountry}
        onSearchChange={setSearch}
      />

      <Main>
        <List
          pirates={filteredPirates}
          onClick={setSelectedPirate}
        />
        {selectedPirate && <Details {...pirates.find(p => p.id === selectedPirate)}/>}
      </Main>

      <Chart pirates={pirates} selectedCountry={selectedCountry}/>
    </Container>
  </>;
}

export default App;
