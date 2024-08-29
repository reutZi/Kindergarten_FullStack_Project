import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Login from './components/Login';
import AttendanceTeacher from './components/Teacher/AttendanceTeacher';
import AttendanceParent from './components/Parent/AttendanceParent';
import Navbar from './components/Navbar';
import NoticeBoard from './components/NoticeBoard';
import ChooseKid from './components/Parent/ChooseKid';
import WhatsNew from './components/WhatsNew';
import './style/App.css';

function AppContent() {
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem('user'));
  const isLoginPage = location.pathname === '/'; // Check if it's the login page

  return (
    <div className="main-container">
     {!isLoginPage && <Navbar className="sidebar" />}
      <div className="content">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="parent/attendance" element={<AttendanceParent />} />
          <Route path="teacher/attendance" element={<AttendanceTeacher />} />
          <Route path="parent/choosekid" element={<ChooseKid />} />
          <Route path="noticeboard" element={<NoticeBoard user={user}/>} />
          <Route path="whatsnew" element={<WhatsNew user={user}/>} />
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
