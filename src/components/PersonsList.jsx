import React from 'react';
import DeleteButton from './DeleteButton';

const PersonsList = ({ personsToShow, deletePerson }) => (
  <ul style={{ listStyleType: 'none' }}>
    {personsToShow.map((person) => (
      <li key={person.id}>
        {person.name} {person.number} 
        <DeleteButton id={person.id} name={person.name} deletePerson={deletePerson} />
      </li>
    ))}
  </ul>
);

export default PersonsList;