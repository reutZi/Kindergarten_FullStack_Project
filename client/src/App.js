import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Login from './components/Login';
import AttendanceTeacher from './components/Teacher/AttendanceTeacher';
import AttendanceParent from './components/Parent/AttendanceParent';
import Welcome from './components/Parent/Welcome';
import Navbar from './components/Navbar'; // Your Sidebar component
import './style/App.css'; // Importing the Tailwind CSS styles

function AppContent() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/'; // Check if it's the login page

  return (
    <div className="main-container">
     {!isLoginPage && <Navbar className="sidebar" />} {/* Sidebar component */}
      <div className="content">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="parent/attendance" element={<AttendanceParent />} />
          <Route path="teacher/attendance" element={<AttendanceTeacher />} />
          <Route path="parent/welcome" element={<Welcome />} />
        </Routes>
      </div>
    </div>
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
