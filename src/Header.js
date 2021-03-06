import React, { memo } from 'react';
import { Handle } from 'rc-slider';
import styled from 'styled-components';

import 'rc-slider/assets/index.css';

const Container = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 30px 0;
`;

const Input = styled.input`
  border: 0;
  background: #fff;
  box-shadow: 1px 1px 3px rgba(0,0,0,.15);
  height: 30px;
  padding: 0 10px 0 38px;
  border-radius: 4px;
  width: 300px;
  color: #333;
  font-size: 14px;
  display: inline-flex;
  ::placeholder {
    color:#989898;
  }
`;

const Select = styled.select`
  appearance: none;
  border: 0;
  background: #fff;
  box-shadow: 1px 1px 5px rgba(0,0,0,.15);
  height: 30px;
  padding: 0 10px;
  border-radius: 4px;
  width: 300px;
  color: #989898;
  font-size: 14px;
`;

const Icon = styled.div`
  position: absolute;
  top: 4px;
  left: 8px;
  color: #989898;
  font-size: 20px;
`;

const Logo = styled.img`
  display: block;
  width: 50px;
`;

function handle(props) {
  const { value, dragging, index, ...restProps } = props;
  return <Handle value={value} {...restProps} />;
}

const Header = memo(({ countries, search, onSearchChange, onCountryChange, selectedCountry }) => {
  return <>
    <Container>
      <div style={{ position: 'relative' }}>
        <Icon>
          <i className="fa fa-search"/>
        </Icon>
        <Input
          placeholder="Search..."
          type="text"
          value={search}
          onChange={e => onSearchChange(e.target.value)}
        />
      </div>

      <Logo src="skull-and-bones.svg"/>

      <div style={{ position: 'relative' }}>
        <Icon style={{ left: 'auto', right: 8 }}>
          <i className="fa fa-caret-down"/>
        </Icon>
        <Select
          onChange={(e) => onCountryChange(e.target.value)}
          value={selectedCountry}
        >
          <option value="">Country</option>
          {countries.map((country) => (
            <option key={country.name} value={country.name}>{country.name}</option>
          ))}
        </Select>
      </div>

      {/*{years && <Range*/}
      {/*  min={years.min}*/}
      {/*  max={years.max}*/}
      {/*  defaultValue={[years.min, years.max]}*/}
      {/*  marks={{ [years.min]: years.min, [years.max]: years.max }}*/}
      {/*  handle={handle}*/}
      {/*  onAfterChange={onYearsChange}*/}
      {/*/>}*/}
    </Container>
  </>;
});

Header.displayName = 'Header';

export default Header;