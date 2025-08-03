import React from 'react';

function StudentList({ students, onEdit, onDelete }) {
  return (
    <div>
      <h3>All Students</h3>
      {students.length === 0 ? (
        <p>No students found.</p>
      ) : (
        <ul>
          {students.map((student) => (
            <li key={student._id}>
              {student.name} (Roll No: {student.rollNumber})
              <button onClick={() => onEdit(student)}>Edit</button>
              <button onClick={() => onDelete(student._id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default StudentList;
