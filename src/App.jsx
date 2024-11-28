import React, { useState, useEffect } from 'react';
import personService from './services/personService.js';
import FilterForm from './components/FilterForm.jsx';
import PersonForm from './components/PersonForm.jsx';
import PersonsList from './components/PersonsList.jsx';
import Notification from './components/Notification.jsx';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [notification, setNotification] = useState({ message: '', type: '' });

  useEffect(() => {
    personService.getAll().then(initialPersons => {
      setPersons(initialPersons);
    });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    const existingPerson = persons.find(person => person.name === newName);

    if (existingPerson) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const updatedPerson = { ...existingPerson, number: newNumber };
        personService.update(existingPerson.id, updatedPerson).then(returnedPerson => {
          setPersons(persons.map(person => person.id !== existingPerson.id ? person : returnedPerson));
          setNewName('');
          setNewNumber('');
          showNotification(`Updated ${newName}'s number successfully`, 'success');
        }).catch(error => {
          showNotification(
            `Failed to update ${newName}. They might have been removed from the server.`,
            'error'
          );
          setPersons(persons.filter(person => person.id !== existingPerson.id));
        });
      }
    } else {
      const personObject = { name: newName, number: newNumber };
      personService.create(personObject).then(returnedPerson => {
        setPersons(persons.concat(returnedPerson));
        setNewName('');
        setNewNumber('');
        showNotification(`Added ${newName} successfully`, 'success');
      }).catch(error => {
        showNotification(`Failed to add ${newName}. Please try again later.`, 'error');
      });
    }
  };

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification({ message: '', type: '' });
    }, 5000); 
  };

  const handleNameChange = (event) => setNewName(event.target.value);
  const handleNumberChange = (event) => setNewNumber(event.target.value);
  const handleFilterChange = (event) => setFilter(event.target.value);

  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()));

  return (
    <div>
      <h2>Puhelinluettelo</h2>
      <Notification message={notification.message} type={notification.type} />
      <FilterForm filter={filter} handleFilterChange={handleFilterChange} />
      <h2>Lisää uusi</h2>
      <PersonForm 
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        addPerson={addPerson}
      />
      <h2>Numerot</h2>
      <PersonsList personsToShow={personsToShow} deletePerson={(id) => {
        personService.deletePerson(id).then(() => {
          setPersons(persons.filter(person => person.id !== id));
          showNotification('Deleted successfully', 'error');
        }).catch(error => {
          showNotification('Failed to delete. Please try again.', 'error');
        });
      }} />
    </div>
  );
};

export default App;
