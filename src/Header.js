import React, { memo, useState } from 'react';
import styled from 'styled-components';
import {
  unstable_IdlePriority,
  unstable_scheduleCallback
} from 'scheduler';

import 'rc-slider/assets/index.css';

const Container = styled.div`
  height: 10vh;
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-left: -30px;
  margin-right: -15px;
  & > * {
    margin-left: 30px;
    margin-right: 30px;
  }
`;

const Header = memo(({ countries, onSearchChange, onCountryChange, selectedCountry }) => {
  const [search, setSearch] = useState('');

  return <Container>
    <input
      type="text"
      value={search}
      onChange={e => {
        const val = e.target.value;
        setSearch(val);
        unstable_scheduleCallback(unstable_IdlePriority, () => {
          onSearchChange(val);
        });
      }}
    />

    <select onChange={(e) => onCountryChange(e.target.value)} value={selectedCountry}>
      <option value=""></option>
      {countries.map((country) => (
        <option key={country.name} value={country.name}>{country.name}</option>
      ))}
    </select>

    {/*{years && <Range*/}
    {/*  min={years.min}*/}
    {/*  max={years.max}*/}
    {/*  defaultValue={[years.min, years.max]}*/}
    {/*  marks={{ [years.min]: years.min, [years.max]: years.max }}*/}
    {/*  handle={handle}*/}
    {/*  onAfterChange={onYearsChange}*/}
    {/*/>}*/}
  </Container>;
});

Header.displayName = 'Header';

export default Header;