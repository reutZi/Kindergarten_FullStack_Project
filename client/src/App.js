import React from "react";
import { BrowserRouter as Router, Route, Routes, useLocation, Navigate } from "react-router-dom";
import Login from "./components/Login";
import AttendanceTeacher from "./components/Teacher/AttendanceTeacher";
import AttendanceParent from "./components/Parent/AttendanceParent";
import Navbar from "./components/Navbar";
import NoticeBoard from "./components/NoticeBoard";
import ChooseKid from "./components/Parent/ChooseKid";
import WhatsNew from "./components/WhatsNew";
import "./style/App.css";
import { KidProvider, useKid } from "./components/KidContext"; // Import KidProvider

function AppContent() {
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user"));
  const { selectedKid } = useKid(); // Get the selectedKid from context
  const isLoginPage = location.pathname === "/"; // Check if it's the login page

  // Check if the user is a parent and has not selected a kid
  const isParentWithoutKid = user?.role === "parent" && !selectedKid;

  return (
    <div className="main-container">
      {!isLoginPage && <Navbar className="sidebar" />}
      <div className={`${isLoginPage ? "full-screen-content" : "content"}`}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="parent/attendance" element={isParentWithoutKid ? <Navigate to="/parent/chooseKid" /> : <AttendanceParent />} />
          <Route path="teacher/attendance" element={<AttendanceTeacher />} />
          <Route path="parent/chooseKid" element={<ChooseKid />} />
          <Route path="noticeboard" element={isParentWithoutKid ? <Navigate to="/parent/chooseKid" /> : <NoticeBoard user={user} />} />
          <Route path="whatsNew" element={isParentWithoutKid ? <Navigate to="/parent/chooseKid" /> : <WhatsNew user={user} />} />
        </Routes>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <KidProvider> 
        <AppContent />
      </KidProvider>
    </Router>
  );
}

export default App;
