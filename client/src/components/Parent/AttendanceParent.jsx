import React, { useState } from 'react';
import Calendar from '../Calendar';
import FutureAttendanceDialog from '../FutureAttendanceDialog';
import PastAttendanceDialog from '../PastAttendanceDialog';
import axios from 'axios';
import "../../style/App.css";
import "../../style/attendance.css"; // Import the custom styles

const AttendanceParent = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [futureDialogOpen, setFutureDialogOpen] = useState(false);
  const [pastDialogOpen, setPastDialogOpen] = useState(false);
  const [attendanceData, setAttendanceData] = useState(null);

  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));
  const childId = user ? user.children[0].id : null;

  const handleFutureDateClick = (date) => {
    setSelectedDate(date);
    setFutureDialogOpen(true);
  };

  const handlePastDateClick = (date, attendance) => { 
    setSelectedDate(date);
    setAttendanceData(attendance);
    setPastDialogOpen(true);
  };

  const handleSaveFutureAttendance = async (data) => {
    try {
      const requestData = {
        cid: childId,
        date: data.date,
        is_absent: data.is_absent || false,
        expected_in_time: data.expected_in_time || '08:00',
        absence_reason: data.absence_reason || '',
      };
      await axios.post(`http://localhost:4000/parent/attendance/${childId}/save`, requestData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert('Attendance record saved successfully!');
      setFutureDialogOpen(false);
    } catch (error) {
      console.error('Failed to save attendance:', error);
    }
  };

  return (
    <div className="attendance-container"> {/* Apply class to the container */}
      <Calendar
        className="attendance-calendar"
        childId={childId}
        onFutureDateClick={handleFutureDateClick}
        onPastDateClick={handlePastDateClick}
        minMonth={new Date(2023, 0, 1)}
        maxMonth={new Date(2024, 11, 31)}
      />

      {futureDialogOpen && (
        <FutureAttendanceDialog
          className="attendance-dialog" 
          open={futureDialogOpen}
          onClose={() => setFutureDialogOpen(false)}
          onSave={handleSaveFutureAttendance}
          date={selectedDate}
        />
      )}

      {pastDialogOpen && (
        <PastAttendanceDialog
          className="attendance-dialog"
          open={pastDialogOpen}
          onClose={() => setPastDialogOpen(false)}
          attendanceData={attendanceData}
          date={selectedDate}
        />
      )}
    </div>
  );
};

export default AttendanceParent;
