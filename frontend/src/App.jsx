import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StudentForm from './components/StudentForm';
import StudentList from './components/StudentList';
import './App.css'

const API_URL = import.meta.env.VITE_API_BASE_URL + '/students';

function App() {

  const [students, setStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);

  const fetchStudents = async () => {
    try {
      const res = await axios.get(`${API_URL}/`);
      setStudents(res.data.data);
    } catch (err) {
      console.error('Error fetching students:', err);
    }
  };

  const createStudent = async (student) => {
    try {
      const res = await axios.post(`${API_URL}/`, student);
      setStudents([...students, res.data.data]);
    } catch (err) {
      console.error('Error creating student:', err);
    }
  };

  const updateStudent = async (id, updates) => {
    try {
      const res = await axios.put(`${API_URL}/${id}`, updates);
      setStudents(students.map(s => (s._id === id ? res.data.data : s)));
      setEditingStudent(null);
    } catch (err) {
      console.error('Error updating student:', err);
    }
  };

  const deleteStudent = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setStudents(students.filter(s => s._id !== id));
    } catch (err) {
      console.error('Error deleting student:', err);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div className="App">
      <h1>Student Manager</h1>
      <StudentForm
        onSubmit={editingStudent ? (data) => updateStudent(editingStudent._id, data) : createStudent}
        initialData={editingStudent}
        onCancel={() => setEditingStudent(null)}
      />
      <StudentList
        students={students}
        onEdit={setEditingStudent}
        onDelete={deleteStudent}
      />
    </div>
  );
}

export default App;
