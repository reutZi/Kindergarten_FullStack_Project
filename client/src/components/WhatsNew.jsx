import React, { useEffect, useState } from 'react';
import { Typography, Grid, Button, Card, CardMedia, CardContent, Box, IconButton } from '@mui/material';
import axios from 'axios';
import UploadPictureDialog from './UploadPictureDialog';
import DeleteIcon from '@mui/icons-material/Delete'; 
import { useKid } from './KidContext';

const WhatsNew = () => {
  const [pictures, setPictures] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [imageUrls, setImageUrls] = useState({});
  const { kindergartenId } = useKid();
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));
  const role = user?.role;

  useEffect(() => {
    axios.get('http://localhost:4000/pictures', {
      params: { kindergartenId },
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        setPictures(response.data);
        fetchAllImages(response.data);
      })
      .catch(error => console.error('Error fetching pictures:', error));
  }, [kindergartenId]);

  const fetchAllImages = async (pictures) => {
    const urls = {};
    for (const picture of pictures) {
      const url = await fetchImage(picture.imageUrl);
      urls[picture._id] = url;
    }
    setImageUrls(urls);
  };

  const fetchImage = async (imageUrl) => {
    try {
      const response = await axios.get(`http://localhost:4000/pictures/${imageUrl}`, {
        responseType: 'blob',
        headers: { Authorization: `Bearer ${token}` }
      });
      const url = URL.createObjectURL(response.data);
      return url;
    } catch (error) {
      console.error('Error fetching image:', error);
      return '';
    }
  };

  const handleUpload = (title, selectedFile) => {
    const formData = new FormData();
    formData.append('image', selectedFile);
    formData.append('title', title);
    formData.append('uploadedBy', 'teacher_id'); 
    formData.append('kindergartenId', kindergartenId);

    axios.post('http://localhost:4000/pictures/upload', formData, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        const newPicture = response.data;
        setPictures([...pictures, newPicture]);
        fetchImage(newPicture.imageUrl).then(url => {
          setImageUrls((prev) => ({ ...prev, [newPicture._id]: url }));
        });
      })
      .catch(error => console.error('Error uploading image:', error));
  };

  const handleDelete = (pictureId) => {
    axios.delete(`http://localhost:4000/pictures/${pictureId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(() => {
        setPictures(pictures.filter(picture => picture._id !== pictureId));
        setImageUrls(prevUrls => {
          const updatedUrls = { ...prevUrls };
          delete updatedUrls[pictureId];
          return updatedUrls;
        });
      })
      .catch(error => console.error('Error deleting image:', error));
  };

  const openDialog = () => {
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <Box sx={{ direction: 'rtl', position: 'relative', px: { xs: 2, md: 4 } }}>
      {/* Title with responsive font size */}
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          marginTop: '40px',
          marginBottom: '30px',
          textAlign: 'center',
          fontSize: { xs: '1.5rem', md: '2.5rem' } // Smaller font on small screens
        }}
      >
        תמונות מהגן שלנו
      </Typography>

      {/* Button that moves under the title on small screens */}
      {role === 'teacher' && (
        <Button
          variant="contained"
          color="primary"
          onClick={openDialog}
          sx={{
            position: { xs: 'static', md: 'absolute' }, // Static on small screens, absolute on medium and larger
            left: { md: '20px' },
            top: { md: '8px' },
            mt: { xs: 2, md: 0 } // Margin top on small screens
          }}
        >
          הוסף תמונה
        </Button>
      )}

      {/* Grid with spacing adjustments for different screen sizes */}
      <Grid container spacing={3} sx={{ mt: 3 }}>
        {pictures.map(picture => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={picture._id} sx={{ px: { xs: 1, sm: 2 } }}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={imageUrls[picture._id] || ''}
                alt={picture.title}
                sx={{ objectFit: 'cover' }}
              />
              <CardContent sx={{ position: 'relative' }}>
                <Typography variant="subtitle1" align="center" dir="rtl">{picture.title}</Typography>
                {role === 'teacher' && (
                  <IconButton
                    aria-label="delete"
                    onClick={() => handleDelete(picture._id)}
                    sx={{ position: 'absolute', top: '4px', right: '4px' }}
                  >
                    <DeleteIcon />
                  </IconButton>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <UploadPictureDialog
        open={isDialogOpen}
        onClose={closeDialog}
        onUpload={handleUpload}
      />
    </Box>
  );
};

export default WhatsNew;
