import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Login from './components/Login';
import AttendanceTeacher from './components/Teacher/AttendanceTeacher';
import AttendanceParent from './components/Parent/AttendanceParent';
import Welcome from './components/Parent/Welcome';
import Navbar from './components/Navbar'; // Assume you have a Navbar component

function AppContent() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/'; // Check if the route is login page

  return (
    <>
      {!isLoginPage && <Navbar />} {/* Conditionally render Navbar */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="parent/attendance" element={<AttendanceParent />} />
        <Route path="teacher/attendance" element={<AttendanceTeacher />} />
        <Route path="parent/welcome" element={<Welcome />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
