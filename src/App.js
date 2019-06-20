import React, { createContext, useCallback, useContext, useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';

import Header from './Header';
import ListItem from './ListItem';
import { Box, generateChartData, getCountries, getYearsOfLife, useFetchPirates } from './stuff';
import Details from './Details';
import Chart from './Chart';

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

const List = styled(Box)`
  flex: 1;
  height: 60vh;
  overflow-y: scroll;
`;

const Container = styled.div`
  max-width: 1000px;
  min-height: 100vh;
  margin: 0 auto;
`;

const AppContext = createContext(null);

function App() {
  const [pirates, setPirates] = useFetchPirates([]);
  const [selectedPirate, setSelectedPirate] = useState();
  const [selectedCountry, setSelectedCountry] = useState();
  const [search, setSearch] = useState('');

  const countries = getCountries(pirates);
  const years = getYearsOfLife(pirates);

  const chartData = generateChartData(years, pirates, selectedCountry);

  const handleClick = (pirateId) => {
    setSelectedPirate(pirateId);
  };

  let filteredPirates = pirates;

  if (search) {
    filteredPirates = filteredPirates.filter(p => p.name.toLowerCase().includes(search));
  }

  if (selectedCountry) {
    filteredPirates = filteredPirates.filter(p => p.country === selectedCountry);
  }

  return <>
    <GlobalStyle/>

    <AppContext.Provider value={pirates}>
      <Container>
        <Header
          countries={countries}
          selectedCountry={selectedCountry}
          onCountryChange={setSelectedCountry}
          search={search}
          onSearchChange={setSearch}
        />

        <Main>
          <List>
            {filteredPirates.map((pirate, i) => (
              <ListItem
                key={i}
                onClick={handleClick}
                {...pirate}
              />
            ))}
          </List>
          {selectedPirate && <Details {...pirates.find(p => p.id === selectedPirate)}/>}
        </Main>

        <Chart data={chartData}/>
      </Container>
    </AppContext.Provider>
  </>;
}

export default App;
