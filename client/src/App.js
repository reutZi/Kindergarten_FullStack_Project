import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import AttendanceTeacher from './components/Teacher/AttendanceTeacher';
import AttendanceParent from './components/Parent/AttendanceParent';
import Welcome from './components/Parent/Welcome';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="parent/attendance" element={<AttendanceParent />} />
        <Route path="teacher/attendance" element={<AttendanceTeacher />} />
        <Route path="parent/welcome" element={<Welcome />} />

      </Routes>
    </Router>
  );
}

export default App;
