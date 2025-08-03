import React from 'react';

function StudentList({ students, onEdit, onDelete, editingStudent }) {
  return (
    <div className="student-list-container">
      <h3>All Students</h3>
      {students.length === 0 ? (
        <p className="empty">No students found.</p>
      ) : (
        <div className="table-wrapper">
          <table className="student-table">
            <thead>
              <tr>
                <th>Roll Number</th>
                <th>Name</th>
                <th aria-label="actions">Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => {
                const isEditing = editingStudent?._id === student._id;
                return (
                  <tr
                    key={student._id}
                    className={isEditing ? 'editing' : ''}
                    onClick={() => onEdit(student)}
                  >
                    <td>{student.rollNumber}</td>
                    <td>{student.name}</td>
                    <td>
                      <button
                        className="delete"
                        onClick={(e) => {
                          e.stopPropagation();
                          onDelete(student._id);
                        }}
                        aria-label={`Delete ${student.name}`}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default StudentList;
