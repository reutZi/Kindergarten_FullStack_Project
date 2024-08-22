import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Attendance from './components/Attendance';
import Welcome from './components/Welcome';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="teacher/attendance" element={<Attendance />} />
        <Route path="parent/welcome" element={<Welcome />} />
      </Routes>
    </Router>
  );
}

export default App;
