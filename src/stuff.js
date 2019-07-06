import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { compact, maxBy, minBy, sortBy, uniq } from 'lodash';
import parse from 'csv-parse/lib/sync';
import range from 'js-range';

export const Box = styled.div`
  background:#fff;
  box-shadow: 0 0 5px rgba(0,0,0,.2);
  padding: 15px;
  border-radius: 4px;
`;

export function wait(ms) {
  let start = Date.now(),
    now = start;
  while (now - start < ms) {
    now = Date.now();
  }
}

export function useFetchPirates(initialState) {
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

export function getCountries(pirates) {
  // Simulate large dataset
  wait(20);

  const uniqueCountries = compact(uniq(pirates.map(p => p.country)).sort());

  return uniqueCountries.map(country => ({
    name: country,
    count: pirates.filter(p => p.country === country).length
  }));
}

export function getYearsOfLife(pirates) {
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

export function generateChartData(pirates, country) {
  const years = getYearsOfLife(pirates);

  if (!years) {
    return [];
  }

  const allYears = range(years.min, years.max);

  let chartData = allYears.map(year => {
    const piratesThisYear = pirates.filter(pirate => {
      const match = pirate.life.match(/(\d{4})s?–(\d{4})s?/);

      if (country && pirate.country !== country) {
        return false;
      }

      if (match && year >= match[1] && year <= match[2]) {
        return true;
      }

      return false;
    });

    return {
      year,
      piratesCount: piratesThisYear.length
    };
  });

  chartData = chartData
    .filter(e => e.piratesCount)
    .map(e => ({
      x: new Date(e.year, 1, 1),
      y: e.piratesCount
    }));
  return chartData;
}

export function filterPirates(pirates, search, selectedCountry) {
  let filteredPirates = pirates;

  if (search) {
    filteredPirates = filteredPirates.filter(p => p.name.toLowerCase().includes(search));
  }

  if (selectedCountry) {
    filteredPirates = filteredPirates.filter(p => p.country === selectedCountry);
  }
  return filteredPirates;
}