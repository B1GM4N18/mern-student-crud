import React, { useState, useEffect } from 'react';

function StudentForm({ onSubmit, initialData, onCancel }) {

  const [name, setName] = useState('');
  const [rollNumber, setRollNumber] = useState('');

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setRollNumber(initialData.rollNumber);
    } else {
      setName('');
      setRollNumber('');
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !rollNumber) return;
    onSubmit({ name, rollNumber });
    if (!initialData) {
      setName('');
      setRollNumber('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>{initialData ? 'Edit Student' : 'Add Student'}</h3>
      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        placeholder="Roll No."
        value={rollNumber}
        onChange={(e) => setRollNumber(e.target.value)}
      />
      <button type="submit">{initialData ? 'Update' : 'Add'}</button>
      {initialData && <button onClick={onCancel} type="button">Cancel</button>}
    </form>
  );
}

export default StudentForm;
