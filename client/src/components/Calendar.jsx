import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { Button, Card, CardHeader, CardContent, IconButton, Typography } from '@mui/material';

const Calendar = ({ onFutureDateClick, onPastDateClick, minMonth, maxMonth }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [attendanceData, setAttendanceData] = useState([]);

  const hebrewDays = ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת'];
  const hebrewMonths = ['ינואר', 'פברואר', 'מרץ', 'אפריל', 'מאי', 'יוני', 'יולי', 'אוגוסט', 'ספטמבר', 'אוקטובר', 'נובמבר', 'דצמבר'];

  const user = JSON.parse(localStorage.getItem('user'));
  const childId = user ? user.children[0].id : null;   

  useEffect(() => {
    if (childId) {
      fetchAttendanceData();
    }
  }, [currentDate, childId]);

  const fetchAttendanceData = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/parent/attendance/${childId}/month`, {
        params: {
          year: currentDate.getFullYear(),
          month: currentDate.getMonth() + 1,
        },
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setAttendanceData(response.data);
    } catch (error) {
      console.error('Error fetching attendance data:', error);
    }
  };

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const handleDateClick = (date) => {
    const today = new Date();
    const selectedAttendance = attendanceData.find(
      (attendance) => new Date(attendance.date).toDateString() === date.toDateString()
    );
    if (date > today) {
      onFutureDateClick(date);
    } else {
      onPastDateClick(date, selectedAttendance);
    }
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDayOfMonth = getFirstDayOfMonth(currentDate);
    const days = [];

    const today = new Date();

    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="p-2"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const isAbsent = attendanceData.some(
        (attendance) => new Date(attendance.date).toDateString() === date.toDateString() && attendance.is_absent
      );
      const isToday = date.toDateString() === today.toDateString();

      days.push(
        <div
          key={day}
          className={`p-2 text-center cursor-pointer ${isAbsent ? 'bg-red-200' : ''} ${isToday ? 'bg-blue-500 font-bold border-2 border-blue-500' : ''}`}
          onClick={() => handleDateClick(date)}
        >
          {day}
        </div>
      );
    }

    return days;
  };

  const changeMonth = (increment) => {
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + increment, 1);
    if (newDate >= minMonth && newDate <= maxMonth) {
      setCurrentDate(newDate);
    }
  };

  const goToCurrentMonth = () => {
    const today = new Date();
    if (today >= minMonth && today <= maxMonth) {
      setCurrentDate(today);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader
        title={
          <div className="flex justify-between items-center">
            <IconButton onClick={() => changeMonth(-1)}>
              <ChevronLeft />
            </IconButton>
            <Typography variant="h6">
              {hebrewMonths[currentDate.getMonth()]} {currentDate.getFullYear()}
            </Typography>
            <IconButton onClick={() => changeMonth(1)}>
              <ChevronRight />
            </IconButton>
          </div>
        }
      />
      <CardContent>
        <div className="grid grid-cols-7 gap-1 mb-2">
          {hebrewDays.map((day) => (
            <Typography key={day} variant="body2" className="text-center font-bold">
              {day}
            </Typography>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">{renderCalendar()}</div>
        <div className="mt-4 flex justify-center">
          <Button variant="outlined" onClick={goToCurrentMonth}>
            <CalendarTodayIcon className="mr-2" /> היום
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Calendar;
