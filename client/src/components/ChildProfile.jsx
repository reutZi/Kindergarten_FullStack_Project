import React, { useState, useEffect } from 'react';
import { Button, TextField, Typography, Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import axios from 'axios';

const ChildProfile = ({ child }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedChild, setEditedChild] = useState(child);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Update the local state whenever the child prop changes
  useEffect(() => {
    setEditedChild(child);
  }, [child]);

  const handleEdit = () => {
    setIsEditing(true);
    setError(null);
    setSuccess(false);
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(`http://localhost:4000/children/update/${editedChild.id}`, {
        first_name: editedChild.first_name,
        last_name: editedChild.last_name,
        photo_url: editedChild.photo_url,
        allergy_info: editedChild.allergy_info,
        kindergarten_id: editedChild.kindergarten_id
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
      });

      if (response.status === 200) {
        setEditedChild(response.data.child);
        setIsEditing(false);
        setSuccess(true);
        setError(null);
      }
    } catch (err) {
      setError('שגיאה בעדכון פרטי הילד. אנא נסה שוב.');
      console.error('Error updating child:', err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedChild(prev => ({ ...prev, [name]: value }));
  };

  const handleCloseSuccessDialog = () => {
    setSuccess(false);
  };

  return (
    <Box className="p-4 bg-white rounded-lg shadow-md" direction="rtl">
      {isEditing ? (
        <>
          <Box mb={2}>
            <TextField
              name="first_name"
              label="שם פרטי"
              value={editedChild.first_name}
              onChange={handleChange}
              fullWidth
              inputProps={{ style: { textAlign: 'right' }, dir: "rtl" }}
            />
          </Box>
          <Box mb={2}>
            <TextField
              name="last_name"
              label="שם משפחה"
              value={editedChild.last_name}
              onChange={handleChange}
              fullWidth
              inputProps={{ style: { textAlign: 'right' }, dir: "rtl" }}
            />
          </Box>
          <Box mb={2}>
            <TextField
              name="allergy_info"
              label="מידע על אלרגיות"
              value={editedChild.allergy_info || "אין מידע על אלרגיות ידועות"}
              onChange={handleChange}
              fullWidth
              multiline
              rows={3}
              inputProps={{ style: { textAlign: 'right' }, dir: "rtl" }}
            />
          </Box>
          <Button variant="contained" onClick={handleSave}>
            שמור שינויים
          </Button>
        </>
      ) : (
        <>
          <Typography variant="body1" className="mb-4" style={{ textAlign: 'right' }}>שם פרטי: {child.first_name}</Typography>
          <Typography variant="body1" className="mb-4" style={{ textAlign: 'right' }}>שם משפחה: {child.last_name}</Typography>
          <Typography variant="body1" className="mb-4" style={{ textAlign: 'right' }}>מידע על אלרגיות: {child.allergy_info || "אין מידע על אלרגיות ידועות"}</Typography>
          <Button variant="outlined" onClick={handleEdit} className="mt-4">
            עריכת פרטים
          </Button>
        </>
      )}

      {error && <Typography color="error" className="mt-4" style={{ textAlign: 'right' }}>{error}</Typography>}

      <Dialog open={success} onClose={handleCloseSuccessDialog}>
        <DialogTitle style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
          הפרטים עודכנו בהצלחה
          <CheckCircleIcon style={{ marginLeft: 8 }} />
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleCloseSuccessDialog} color="primary">
            סגור
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ChildProfile;
