
import React, { useState, useEffect } from 'react';
import { Box, Container, TextField, Checkbox, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { format } from 'date-fns';
import axios from 'axios';
import { DatePicker } from './DatePicker';

const Attendance = () => {
  const [date, setDate] = useState(new Date());
  const [children, setChildren] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem('user'));

  // Check if user is teacher and fetch the corresponding kindergarten
  useEffect(() => {
    const fetchTeacherAndAttendance = async () => {
      try {
        if (!user || user.role !== 'teacher') {
          alert("Unauthorized: Only teachers can access this page.");
          return;
        }

        // Fetch teacher details by user id
        const teacherResponse = await axios.get(`http://localhost:4000/teacher/${user.id}`);
        const teacher = teacherResponse.data;

        if (!teacher) {
          alert("Teacher not found.");
          return;
        }

        // Fetch children by kindergarten ID
        const childrenResponse = await axios.get(`http://localhost:4000/children/kindergarten/${teacher.kin_id}`);
        const fetchedChildren = childrenResponse.data;

        // Initialize children with their attendance records for the selected date
        const attendancePromises = fetchedChildren.map(async (child) => {
          const attendanceResponse = await axios.get(`http://localhost:4000/attendance/${child.id}`);
          const attendanceRecord = attendanceResponse.data.find(record => record.date === format(date, 'yyyy-MM-dd'));

          return {
            ...child,
            attendance: attendanceRecord ? attendanceRecord.is_absent : false,
            checkInTime: attendanceRecord ? attendanceRecord.check_in_time : '',
            checkOutTime: attendanceRecord ? attendanceRecord.check_out_time : '',
            absenceReason: attendanceRecord ? attendanceRecord.absence_reason : '',
          };
        });

        const childrenWithAttendance = await Promise.all(attendancePromises);
        setChildren(childrenWithAttendance);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching attendance data", error);
      }
    };

    fetchTeacherAndAttendance();
  }, [date, user]);

  const handleCheckInOut = (id) => {
    const updatedChildren = children.map((child) => {
      if (child.id === id) {
        const now = format(new Date(), 'HH:mm');
        return {
          ...child,
          attendance: !child.attendance,
          checkInTime: !child.attendance ? now : '',
          checkOutTime: !child.attendance ? '14:00' : '',
        };
      }
      return child;
    });
    setChildren(updatedChildren);
  };

  const handleTimeChange = (id, field, value) => {
    const updatedChildren = children.map((child) => {
      if (child.id === id) {
        return {
          ...child,
          [field]: value,
        };
      }
      return child;
    });
    setChildren(updatedChildren);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredChildren = children.filter((child) =>
    `${child.first_name} ${child.last_name}`.includes(searchTerm)
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Container sx={{ marginTop: 4, direction: 'rtl' }}>
      <h1>נוכחות</h1>

      <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ marginBottom: 2 }}>
        <DatePicker setDate={setDate} />
        <TextField
          label="חפש ילד"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearch}
        />
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="right">סמן נוכחות</TableCell>
              <TableCell align="right">שם</TableCell>
              <TableCell align="right">שעת כניסה</TableCell>
              <TableCell align="right">שעת יציאה</TableCell>
              <TableCell align="right">סיבת היעדרות</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredChildren.map((child) => (
              <TableRow key={child.id}>
                <TableCell align="left">
                  <Checkbox
                    checked={child.attendance}
                    onChange={() => handleCheckInOut(child.id)}
                  />
                </TableCell>
                <TableCell align="left">{`${child.first_name} ${child.last_name}`}</TableCell>
                <TableCell align="left">
                  {child.attendance ? (
                    <TextField
                      type="time"
                      value={child.checkInTime}
                      onChange={(e) => handleTimeChange(child.id, 'checkInTime', e.target.value)}
                    />
                  ) : (
                    ''
                  )}
                </TableCell>
                <TableCell align="left">
                  {child.attendance ? (
                    <TextField
                      type="time"
                      value={child.checkOutTime}
                      onChange={(e) => handleTimeChange(child.id, 'checkOutTime', e.target.value)}
                    />
                  ) : (
                    ''
                  )}
                </TableCell>
                <TableCell align="left">
                  <TextField
                    placeholder="סיבת היעדרות"
                    value={child.absenceReason}
                    onChange={(e) => handleTimeChange(child.id, 'absenceReason', e.target.value)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Attendance;
