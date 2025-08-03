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
    if (!name.trim() || !rollNumber.trim()) return;
    onSubmit({ name: name.trim(), rollNumber: rollNumber.trim() });
    if (!initialData) {
      setName('');
      setRollNumber('');
    }
  };

  return (
    <form className="student-form" onSubmit={handleSubmit} aria-label="student form">
      <div className="form-header">
        <h3>{initialData ? 'Edit Student' : 'Add Student'}</h3>
        <button
          type="button"
          className="mini-close"
          aria-label="close form"
          onClick={onCancel}
        >
          ✕
        </button>
      </div>
      <div className="fields">
        <input
          aria-label="student name"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          aria-label="roll number"
          placeholder="Roll No."
          value={rollNumber}
          onChange={(e) => setRollNumber(e.target.value)}
        />
      </div>
      <div className="actions">
        <button type="submit" className="primary">
          {initialData ? 'Update' : 'Add'}
        </button>
      </div>
    </form>
  );
}

export default StudentForm;
