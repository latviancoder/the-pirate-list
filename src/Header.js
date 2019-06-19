import React, { useState } from 'react';
import Slider, { Handle, Range } from 'rc-slider';
import styled from 'styled-components';

import 'rc-slider/assets/index.css';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  & > * {
    margin-left: 30px;
    margin-right: 30px;
  }
`;

function handle(props) {
  const { value, dragging, index, ...restProps } = props;
  return <Handle value={value} {...restProps} />;
}

export default function Header({ countries, years, search, onSearchChange, onYearsChange, onCountryChange, selectedCountry }) {
  return <Container>
    <input
      type="text"
      value={search}
      onChange={e => onSearchChange(e.target.value)}
    />

    <select onChange={(e) => onCountryChange(e.target.value)} value={selectedCountry}>
      <option value=""></option>
      {countries.map((country) => (
        <option key={country.name} value={country.name}>{country.name}</option>
      ))}
    </select>

    {years && <Range
      min={years.min}
      max={years.max}
      defaultValue={[years.min, years.max]}
      marks={{ [years.min]: years.min, [years.max]: years.max }}
      handle={handle}
      onAfterChange={onYearsChange}
    />}
  </Container>;
}