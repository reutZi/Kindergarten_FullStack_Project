import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, Box } from '@mui/material';

const UploadPictureDialog = ({ open, onClose, onUpload }) => {
  const [title, setTitle] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = () => {
    onUpload(title, selectedFile);
    setTitle('');
    setSelectedFile(null);
    onClose();
  };

  const isUploadDisabled = !title || !selectedFile;

  return (
    <Dialog open={open} onClose={onClose} dir="rtl">
      <DialogTitle>הוסף תמונה חדשה</DialogTitle>
      <DialogContent>
        <Box sx={{ direction: 'rtl' }}>
          <TextField
            label="כותרת"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            variant="outlined"
            fullWidth
            margin="normal"
            sx={{ mb: 2 }}
          />
          <Button
            variant="contained"
            component="label"
          >
            בחר תמונה להעלאה
            <input
              type="file"
              hidden
              onChange={handleFileChange}
            />
          </Button>
        </Box>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'flex-start' }}>
        <Button onClick={onClose} color="secondary">בטל</Button>
        <Button
          onClick={handleUpload}
          color="primary"
          disabled={isUploadDisabled} // Disable the button if title or file is missing
        >
          העלה
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UploadPictureDialog;
