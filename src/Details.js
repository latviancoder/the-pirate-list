import React from 'react';
import styled from 'styled-components';
import { Box } from './stuff';

const Container = styled(Box)`
  flex: 0 0 40%;
  margin-left: 30px;
`;

export default function Details(pirate) {
  return <Container>
    <strong>{pirate.name}</strong> <br/><br/>
    <i>{pirate.desc}</i> <br/><br/>

    <strong>From</strong>: {pirate.country} <br/>
    <strong>Lived</strong>: {pirate.life} <br/>
    <strong>Years active</strong>: {pirate.active} <br/>
  </Container>;
}