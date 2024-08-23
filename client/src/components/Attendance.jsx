import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import axios from 'axios';
import { DatePicker } from './DatePicker'; 
import { Checkbox } from "../componentsSHADCN/ui/checkbox"; 
import { Input } from "../componentsSHADCN/ui/input";

const Attendance = () => {
  const [date, setDate] = useState(new Date());
  const [children, setChildren] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');

  const fetchAttendanceData = async (selectedDate) => {
    try {
      const teacherResponse = await axios.get(`http://localhost:4000/teacher/${user.id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const teacher = teacherResponse.data;

      if (!teacher) {
        alert("Teacher not found.");
        return;
      }

      const childrenResponse = await axios.get(`http://localhost:4000/children/kindergarten/${teacher.kin_id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const fetchedChildren = childrenResponse.data;

      const attendancePromises = fetchedChildren.map(async (child) => {
        const attendanceResponse = await axios.get(`http://localhost:4000/attendance/${child.id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const attendanceRecord = attendanceResponse.data.find(record => record.date === format(selectedDate, 'yyyy-MM-dd'));

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

  useEffect(() => {
    fetchAttendanceData(date);
  }, [date]);

  const handleCheckInOut = (id) => {
    const updatedChildren = children.map((child) => {
      if (child.id === id) {
        const now = format(new Date(), 'HH:mm');
        return {
          ...child,
          attendance: !child.attendance,
          checkInTime: !child.attendance ? now : '',
          checkOutTime: !child.attendance ? '14:00' : '',
          absenceReason: !child.attendance ? child.absenceReason : '', // Clear absence reason if child is present
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
    `${child.first_name.toLowerCase()} ${child.last_name.toLowerCase()}`.includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto mt-4 rtl">
      <div className="flex items-center justify-between mb-4">
        <div className="flex space-x-4 justify-end">
          <DatePicker setDate={setDate} /> {/* Pass setDate to DatePicker */}
          <Input
            type="text"
            placeholder="חפש ילד"
            value={searchTerm}
            className="text-right w-40"
            onChange={handleSearch}
          />
        </div>
        <h1 className="text-4xl font-bold text-right ml-4">נוכחות</h1>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2 text-right">סיבת היעדרות</th>
              <th className="border p-2 text-right">שעת יציאה</th>
              <th className="border p-2 text-right">שעת כניסה</th>
              <th className="border p-2 text-right">שם</th>
              <th className="border p-2 text-right">סמן נוכחות</th>
            </tr>
          </thead>
          <tbody>
            {filteredChildren.map((child) => (
              <tr key={child.id} className="border-t">
                <td className="border p-2 text-right">
                  <Input
                    placeholder="סיבת היעדרות"
                    value={child.absenceReason}
                    onChange={(e) => handleTimeChange(child.id, 'absenceReason', e.target.value)}
                    className="text-right"
                    disabled={child.attendance} // Disable input if the child is present
                  />
                </td>
                <td className="border p-2 text-right">
                  {child.attendance ? (
                    <Input
                      type="time"
                      value={child.checkOutTime}
                      onChange={(e) => handleTimeChange(child.id, 'checkOutTime', e.target.value)}
                      className="text-right"
                    />
                  ) : (
                    ''
                  )}
                </td>
                <td className="border p-2 text-right">
                  {child.attendance ? (
                    <Input
                      type="time"
                      value={child.checkInTime}
                      onChange={(e) => handleTimeChange(child.id, 'checkInTime', e.target.value)}
                      className="text-right"
                      max={child.checkOutTime} // Set max to checkOutTime
                    />
                  ) : (
                    ''
                  )}
                </td>
                <td className="border p-2 text-right">
                  {`${child.first_name} ${child.last_name}`}
                </td>
                <td className="border p-2 text-right">
                  <Checkbox
                    checked={child.attendance}
                    onCheckedChange={() => handleCheckInOut(child.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Attendance;
