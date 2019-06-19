import React from 'react';

export default function Details(pirate) {
  return <div>
    <strong>Name</strong>: {pirate.name} <br/>
    <strong>Country</strong>: {pirate.country} <br/>
    <strong>Description</strong>: {pirate.desc} <br/>
    <strong>Life</strong>: {pirate.life} <br/>
    <strong>Years active</strong>: {pirate.active} <br/>
  </div>;
}