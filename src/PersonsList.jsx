import React from 'react';

const PersonsList = ({ personsToShow }) => (
  <ul style={{ listStyleType: 'none' }}>
    {personsToShow.map((person, index) => (
      <li key={index}>{person.name} {person.number}</li>
    ))}
  </ul>
);

export default PersonsList;