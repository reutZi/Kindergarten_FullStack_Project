import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { he } from 'date-fns/locale';
import axios from 'axios';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Checkbox, TextField, Button } from '@mui/material';
import { ClipLoader } from 'react-spinners';
import CustomTimePicker from '../CustomTimePicker'; 
import '../../style/App.css';

const Attendance = () => {
  const [date, setDate] = useState(new Date());
  const [childrenWithAttendance, setChildrenWithAttendance] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchAttendanceData = async (selectedDate) => {
      try {
        
        const attendanceResponse = await axios.get(
          `http://localhost:4000/attendance/${user.kindergarten_id}/${format(selectedDate, 'yyyy-MM-dd')}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
  
        const attendances = attendanceResponse.data;
        setChildrenWithAttendance(attendances);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching attendance data', error);
        setIsLoading(false);
      }
    };
    fetchAttendanceData(date);
  }, [date]);

  const handleCheckInOut = (id) => {
    const updatedChildren = childrenWithAttendance.map((child) => {
      if (child.cid === id) {
        return {
          ...child,
          is_absent: !child.is_absent,
          check_in_time: !child.is_absent ? '07:00' : '',
          check_out_time: !child.is_absent ? '16:00' : '',
        };
      }
      return child;
    });
    setChildrenWithAttendance(updatedChildren);
  };

  const handleTimeChange = (id, field, value) => {
    const updatedChildren = childrenWithAttendance.map((child) => {
      if (child.cid === id) {
        return {
          ...child,
          [field]: value,
        };
      }
      return child;
    });
    setChildrenWithAttendance(updatedChildren);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSave = async () => {
    try {
      await axios.post('http://localhost:4000/attendance/save', childrenWithAttendance, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert('הנוכחות נשמרה בהצלחה');
    } catch (error) {
      console.error('Error saving attendance data', error);
    }
  };

  const filteredChildren = childrenWithAttendance.filter((child) => {
    return `${child.first_name.toLowerCase()} ${child.last_name.toLowerCase()}`.includes(searchTerm.toLowerCase());
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader color="#3498db" loading={isLoading} size={150} />
      </div>
    );
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={he}>
      <div className="main-container">
        <div className="content">
          <div className="container mx-auto mt-4 rtl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex space-x-4 justify-end">
                <DatePicker
                  label="בחר תאריך"
                  value={date}
                  onChange={(newDate) => setDate(newDate)}
                  format="dd-MM-yyyy"
                  slotProps={{ textField: { variant: 'outlined' } }}
                />
                <TextField
                  type="text"
                  placeholder="חפש ילד"
                  value={searchTerm}
                  className="text-right w-40"
                  onChange={handleSearch}
                  inputProps={{ dir: 'rtl' }}
                />
              </div>
              <h1 className="text-4xl font-bold text-right ml-4">נוכחות</h1>
            </div>

            {/* Show "No results found" if no children match */}
            {filteredChildren.length === 0 ? (
              <div className="text-center text-xl font-bold mt-6">
                לא נמצאו תוצאות מתאימות
              </div>
            ) : (
              <div className="table-container">
              <table className="w-full min-w-full table-auto border-collapse">            
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="border p-2 text-right">סיבת היעדרות</th>
                      <th className="border p-2 text-right">שעת הגעה צפויה</th>
                      <th className="border p-2 text-right">שעת יציאה</th>
                      <th className="border p-2 text-right">שעת כניסה</th>
                      <th className="border p-2 text-right">שם</th>
                      <th className="border p-2 text-right">סמן נוכחות</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredChildren.map((child) => (
                      <tr key={child.cid} className="border-t">
                        <td className="border p-2 text-right">
                          <TextField
                            placeholder="סיבת היעדרות"
                            value={child.absence_reason || ''}
                            onChange={(e) => handleTimeChange(child.cid, 'absence_reason', e.target.value)}
                            className="text-right"
                            disabled={!child.is_absent}
                            inputProps={{ dir: 'rtl' }}
                          />
                        </td>
                        <td className="border p-2 text-right">
                          {child.absence_reason ? (
                            <span>--:--</span>
                          ) : (
                            <CustomTimePicker
                              label="שעת הגעה צפויה"
                              value={child.expected_in_time || '08:00'}
                              onChange={(time) => handleTimeChange(child.cid, 'expected_in_time', time)}
                              minTime="07:00"
                              maxTime="10:00"
                              step={30} // 30-minute intervals
                            />
                          )}
                        </td>
                        <td className="border p-2 text-right">
                          {!child.is_absent ? (
                            <CustomTimePicker
                              label="שעת יציאה"
                              value={child.check_out_time || '16:00'}
                              onChange={(time) => handleTimeChange(child.cid, 'check_out_time', time)}
                              minTime="07:00"
                              maxTime="16:00"
                              step={30} // 30-minute intervals
                            />
                          ) : null}
                        </td>
                        <td className="border p-2 text-right">
                          {!child.is_absent ? (
                            <CustomTimePicker
                              label="שעת כניסה"
                              value={child.check_in_time || '07:00'}
                              onChange={(time) => handleTimeChange(child.cid, 'check_in_time', time)}
                              minTime="07:00"
                              maxTime={child.check_out_time || '16:00'}
                              step={30} // 30-minute intervals
                            />
                          ) : null}
                        </td>
                        <td className="border p-2 text-right">{`${child.first_name} ${child.last_name}`}</td>
                        <td className="border p-2 text-right">
                          <Checkbox
                            checked={!child.is_absent}
                            onChange={() => handleCheckInOut(child.cid)}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            <div className="flex justify-end mt-4">
              <Button
                variant="contained"
                onClick={handleSave}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                שמירה
              </Button>
            </div>
          </div>
        </div>
      </div>
    </LocalizationProvider>
  );
};

export default Attendance;
