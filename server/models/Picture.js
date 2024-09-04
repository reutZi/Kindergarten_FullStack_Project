const mongoose = require('mongoose');

const pictureSchema = new mongoose.Schema({
  title: String,
  imageUrl: String,
  uploadedBy: String,
  kindergartenId: String,  
  uploadDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Picture', pictureSchema);
