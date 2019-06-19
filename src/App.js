import React, { useCallback, useEffect, useState } from 'react';
import parse from 'csv-parse/lib/sync';
import { sortBy, uniq, compact, minBy, maxBy } from 'lodash';
import styled from 'styled-components';

import Header from './Header';
import ListItem from './ListItem';
import { wait } from './helpers';
import Details from './Details';

const Main = styled.main`
  display: flex;
`;

const List = styled.div`
  flex: 1;
  //overflow-y: scroll;
  //height: 400px;
`;

function useFetchPirates(initialState) {
  const [pirates, setPirates] = useState(initialState);

  useEffect(() => {
    fetch('/pirates.csv')
      .then(r => r.text())
      .then(r => {
        let parsed = parse(r, { delimiter: ';' });

        // convert array to object
        parsed = parsed.map(([id, name, life, active, country, desc]) => ({
          id, name, active, life, country, desc
        }));

        setPirates(sortBy(parsed, p => p.name));
      });
  }, []);

  return [pirates, setPirates];
}

function getCountries(pirates) {
  // Simulate large dataset
  wait(50);

  const uniqueCountries = compact(uniq(pirates.map(p => p.country)).sort());

  return uniqueCountries.map(country => ({
    name: country,
    count: pirates.filter(p => p.country === country).length
  }));
}

function getYearsOfLife(pirates) {
  // Simulate large dataset
  wait(50);

  const years = compact(pirates.map(p => {
    const match = p.life.match(/(\d{4})s?–(\d{4})s?/);

    return match && {
      from: parseInt(match[1]),
      to: parseInt(match[2])
    };
  }));

  const minFrom = minBy(years, 'from');
  const maxTo = maxBy(years, 'to');

  return minFrom && {
    min: minFrom.from,
    max: maxTo.to
  };
}

function App() {
  const [pirates, setPirates] = useFetchPirates([]);

  const [selectedPirate, setSelectedPirate] = useState();
  const [selectedCountry, setSelectedCountry] = useState();
  const [selectedYears, setSelectedYears] = useState([]);
  const [search, setSearch] = useState('');

  const countries = getCountries(pirates);
  const years = getYearsOfLife(pirates);

  const handleClick = useCallback((pirateId) => {
    setSelectedPirate(pirateId);
  }, []);

  let filteredPirates = pirates;

  if (search) {
    filteredPirates = filteredPirates.filter(p => p.name.toLowerCase().includes(search));
  }

  if (selectedCountry) {
    filteredPirates = filteredPirates.filter(p => p.country === selectedCountry);
  }

  return <>
    <Header
      countries={countries}
      selectedCountry={selectedCountry}
      onCountryChange={setSelectedCountry}
      search={search}
      onSearchChange={setSearch}
      years={years}
      onYearsChange={setSelectedYears}
    />

    <Main>
      <List>
        {filteredPirates.map((pirate, i) => (
          <ListItem
            key={pirate.id}
            onClick={handleClick}
            {...pirate}
          />
        ))}
      </List>
      {selectedPirate && <Details {...pirates.find(p => p.id === selectedPirate)}/>}
    </Main>
  </>;
}

export default App;
