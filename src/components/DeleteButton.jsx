import React from 'react';

const DeleteButton = ({ id, name, deletePerson }) => {
  const handleDelete = () => {
    if (window.confirm(`Delete ${name}?`)) {
      deletePerson(id);
    }
  };

  return (
    <button onClick={handleDelete}>delete</button>
  );
};

export default DeleteButton;