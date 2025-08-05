import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StudentForm from './components/StudentForm';
import StudentList from './components/StudentList';
import './App.css'
import { Toaster, toast } from 'react-hot-toast';

const API_URL = import.meta.env.VITE_API_BASE_URL + '/students';

function App() {

  const [students, setStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const fetchStudents = async () => {
    try {
      const res = await axios.get(`${API_URL}/`);
      setStudents(res.data.data);
    } catch (err) {
      console.error('Error fetching students:', err);
      toast.error('Failed to load students');
    }
  };

  const createStudent = async (student) => {
    try {
      const res = await axios.post(`${API_URL}`, student);
      setStudents([...students, res.data.data]);
      toast.success('Student added successfully');
    } catch (err) {
      console.error('Error creating student:', err);
      const msg = err.response?.data?.message || 'Failed to add student';
      toast.error(msg);
    }
  };

  const updateStudent = async (id, updates) => {
    try {
      const res = await axios.put(`${API_URL}/${id}`, updates);
      setStudents(students.map(s => (s._id === id ? res.data.data : s)));
      setEditingStudent(null);
      toast.success('Student updated');
    } catch (err) {
      console.error('Error updating student:', err);
      const msg = err.response?.data?.message || 'Failed to update student';
      toast.error(msg);
    }
  };

  const deleteStudent = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setStudents(students.filter(s => s._id !== id));
      toast.success('Student deleted');
    } catch (err) {
      console.error('Error deleting student:', err);
      const msg = err.response?.data?.message || 'Failed to delete student';
      toast.error(msg);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div className="App">
      <Toaster 
        position="top-left"
        toastOptions={{
          duration: 3000,
          style: { borderRadius: '8px' }
        }} />
      <h1>Student Manager</h1>
  
      <div className={`morph-container ${showForm || editingStudent ? 'expanded' : ''}`}>
        {!showForm && !editingStudent && (
          <button
            className="morph-button"
            onClick={() => {
              setEditingStudent(null);
              setShowForm(true);
            }}
          >
            Add Student
          </button>
        )}
  
        {(showForm || editingStudent) && (
          <StudentForm
            onSubmit={
              editingStudent
                ? (data) => updateStudent(editingStudent._id, data)
                : createStudent
            }
            initialData={editingStudent}
            onCancel={() => {
              setEditingStudent(null);
              setShowForm(false);
            }}
          />
        )}
      </div>
  
      <StudentList
        students={students}
        onEdit={(student) => {
          setEditingStudent(student);
          setShowForm(true);
        }}
        onDelete={deleteStudent}
        editingStudent={editingStudent}
      />
    </div>
  );
  
}

export default App;
