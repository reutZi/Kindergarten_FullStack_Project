import React, { useState } from 'react';
import { Button, TextField, Typography, Box } from '@mui/material';
import axios from 'axios';

const ChildProfile = ({ child }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedChild, setEditedChild] = useState(child);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

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
        // Use the updated child data from the response
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

  return (
    <Box className="p-4 bg-white rounded-lg shadow-md" direction="rtl">
      {/* Removed the heading */}

      {isEditing ? (
        <>
          <TextField
            name="first_name"
            label="שם פרטי"
            value={editedChild.first_name}
            onChange={handleChange}
            fullWidth
            className="mb-4" // Added margin bottom for spacing
            inputProps={{ style: { textAlign: 'right' } }} // Align text to the right
          />
          <TextField
            name="last_name"
            label="שם משפחה"
            value={editedChild.last_name}
            onChange={handleChange}
            fullWidth
            className="mb-4" // Added margin bottom for spacing
            inputProps={{ style: { textAlign: 'right' } }} // Align text to the right
          />
          <TextField
            name="allergy_info"
            label="מידע על אלרגיות"
            value={editedChild.allergy_info}
            onChange={handleChange}
            fullWidth
            multiline
            rows={3}
            className="mb-4" // Added margin bottom for spacing
            inputProps={{ style: { textAlign: 'right' } }} // Align text to the right
          />
          <Button variant="contained" onClick={handleSave} className="mt-4">
            שמור שינויים
          </Button>
        </>
      ) : (
        <>
          <Typography variant="body1" className="mb-4" style={{ textAlign: 'right' }}>שם פרטי: {editedChild.first_name}</Typography>
          <Typography variant="body1" className="mb-4" style={{ textAlign: 'right' }}>שם משפחה: {editedChild.last_name}</Typography>
          <Typography variant="body1" className="mb-4" style={{ textAlign: 'right' }}>מידע על אלרגיות: {editedChild.allergy_info}</Typography>
          <Button variant="outlined" onClick={handleEdit} className="mt-4">
            עריכת פרטים
          </Button>
        </>
      )}

      {error && <Typography color="error" className="mt-4" style={{ textAlign: 'right' }}>{error}</Typography>}
      {success && <Typography color="success" className="mt-4" style={{ textAlign: 'right' }}>הפרטים עודכנו בהצלחה!</Typography>}
    </Box>
  );
};

export default ChildProfile;
