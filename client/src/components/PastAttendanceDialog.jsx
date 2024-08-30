import React from 'react';
import { Dialog, DialogContent, DialogActions, Button } from '@mui/material';

const PastAttendanceDialog = ({ open, onClose, attendanceData = {}, date }) => {
  const formattedDate = date ? date.toLocaleDateString('he-IL') : 'תאריך לא ידוע'; 
  const isAbsent = attendanceData.is_absent || false;

  const hasData = attendanceData && (attendanceData.check_in_time || attendanceData.check_out_time || attendanceData.absence_reason || attendanceData.is_absent);

  return (
    <Dialog open={open} onClose={onClose} className="attendance-dialog">
      <DialogContent className="dialog-content">
        <h3>נוכחות ל-{formattedDate}</h3>
        {hasData ? (
          isAbsent ? (
            <p>היעדרות - {attendanceData.absence_reason || "לא צוינה סיבה"}</p>
          ) : (
            <>
              <p>שעת כניסה: {attendanceData.check_in_time}</p>
              <p>שעת יציאה: {attendanceData.check_out_time}</p>
            </>
          )
        ) : (
          <p>אין מידע זמין עבור תאריך זה</p>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">סגור</Button>
      </DialogActions>
    </Dialog>
  );
};

export default PastAttendanceDialog;
