import React, { useState, useEffect } from 'react';
import { Button, TextField, Typography, Box } from '@mui/material';
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

  return (
    <Box className="p-4 bg-white rounded-lg shadow-md" direction="rtl">
      {isEditing ? (
        <>
          <TextField
            name="first_name"
            label="שם פרטי"
            value={editedChild.first_name}
            onChange={handleChange}
            fullWidth
            className="mb-4"
            inputProps={{ style: { textAlign: 'right' } }}
          />
          <TextField
            name="last_name"
            label="שם משפחה"
            value={editedChild.last_name}
            onChange={handleChange}
            fullWidth
            className="mb-4"
            inputProps={{ style: { textAlign: 'right' } }}
          />
          <TextField
            name="allergy_info"
            label="מידע על אלרגיות"
            value={editedChild.allergy_info || "לא צוינו אלרגיות"}
            onChange={handleChange}
            fullWidth
            multiline
            rows={3}
            className="mb-4"
            inputProps={{ style: { textAlign: 'right' } }}
          />
          <Button variant="contained" onClick={handleSave} className="mt-4">
            שמור שינויים
          </Button>
        </>
      ) : (
        <>
          <Typography variant="body1" className="mb-4" style={{ textAlign: 'right' }}>שם פרטי: {child.first_name}</Typography>
          <Typography variant="body1" className="mb-4" style={{ textAlign: 'right' }}>שם משפחה: {child.last_name}</Typography>
          <Typography variant="body1" className="mb-4" style={{ textAlign: 'right' }}>מידע על אלרגיות: {child.allergy_info}</Typography>
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
