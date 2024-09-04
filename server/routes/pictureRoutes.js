const express = require('express');
const multer = require('multer');
const Picture = require('../models/Picture');
const path = require('path');
const fs = require('fs');
const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

router.get('/', async (req, res) => {
  const { kindergartenId } = req.query;

  // Ensure kindergarten_id is provided
  if (!kindergartenId) {
    return res.status(400).json({ message: 'Kindergarten ID is required' });
  }

  try {
    // Fetch pictures for the specified kindergarten
    const pictures = await Picture.find({ kindergartenId });
    res.json(pictures);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching pictures' });
  }
});


router.post('/upload', upload.single('image'), async (req, res) => {
  const { title, uploadedBy, kindergartenId } = req.body;
  try {
    const newPicture = new Picture({
      title,
      imageUrl: `/uploads/${req.file.filename}`,
      uploadedBy,
      kindergartenId,
      uploadDate: new Date()
    });
    await newPicture.save();
    res.json(newPicture);
  } catch (error) {
    res.status(500).json({ message: 'Error uploading picture' });
  }
});

router.use('/uploads', express.static('uploads'));

router.delete('/:id', async (req, res) => {
  try {
    const picture = await Picture.findById(req.params.id);
    if (!picture) {
      return res.status(404).json({ message: 'Picture not found' });
    }

    // Remove the image file from the uploads folder
    const imagePath = path.join(__dirname, '../uploads', path.basename(picture.imageUrl));
    console.log('Deleting image file:', imagePath);
    fs.unlink(imagePath, (err) => {
      if (err) {
        console.error('Error deleting image file:', err);
      }
    });

    // Remove the picture record from the database
    await Picture.findByIdAndDelete(req.params.id); // Use findByIdAndDelete to remove the document
    res.json({ message: 'Picture deleted successfully' });
  } catch (error) {
    console.error('Error deleting picture:', error);
    res.status(500).json({ message: 'Error deleting picture' });
  }
});

module.exports = router;
