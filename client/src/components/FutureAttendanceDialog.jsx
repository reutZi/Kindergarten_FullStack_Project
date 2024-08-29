import React, { useState } from 'react';
import { Dialog, DialogContent, DialogActions, Button, RadioGroup, FormControlLabel, Radio, TextField } from '@mui/material';

const FutureAttendanceDialog = ({ open, onClose, onSave, date }) => {
  const formattedDate = date ? date.toLocaleDateString('he-IL') : 'תאריך לא ידוע'; 

  const [attendanceType, setAttendanceType] = useState('late');
  const [expectedInTime, setExpectedInTime] = useState('08:00');
  const [absenceReason, setAbsenceReason] = useState('');

  const childName = JSON.parse(localStorage.getItem('user')).children[0].first_name;

  const handleSave = () => {
    console.log('date:', date);
    const attendanceData = attendanceType === 'late' 
      ? { expected_in_time: expectedInTime , date: date }
      : { is_absent: true, absence_reason: absenceReason , date: date };
    onSave(attendanceData);
  };

  return (
    <Dialog open={open} onClose={onClose} className='attendance-dialog'>
      <div dir="rtl">
        <DialogContent className='dialog-content'>
          <h3>נוכחות ל-{formattedDate}</h3>
          <RadioGroup value={attendanceType} onChange={(e) => setAttendanceType(e.target.value)}>
            <FormControlLabel value="late" control={<Radio />} label={`${childName} יגיע מאוחר`} />
            <FormControlLabel value="absent" control={<Radio />} label={`${childName} לא יגיע`} />
          </RadioGroup>

          {attendanceType === 'late' ? (
            <TextField
              label="שעת כניסה משוערת"
              type="time"
              value={expectedInTime}
              onChange={(e) => setExpectedInTime(e.target.value)}
              fullWidth
              margin="normal"
              InputLabelProps={{ style: { textAlign: 'right', direction: 'rtl' } }} // Ensure the label is RTL
              inputProps={{ style: { direction: 'rtl' } }} // Input text RTL
            />
          ) : (
            <TextField
              label="סיבת היעדרות"
              value={absenceReason}
              onChange={(e) => setAbsenceReason(e.target.value)}
              fullWidth
              dir="rtl"
              margin="normal"
              InputLabelProps={{ style: { textAlign: 'right', direction: 'rtl' } }} // Ensure the label is RTL
              inputProps={{ style: { direction: 'rtl' } }} // Input text RTL
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="secondary">ביטול</Button>
          <Button onClick={handleSave} color="primary">שמור</Button>
        </DialogActions>
      </div>
    </Dialog>
  );
};

export default FutureAttendanceDialog;
