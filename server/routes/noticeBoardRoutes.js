const express = require('express');
const { getNewsByKindergartenId,postNews,editNews,deleteNews } = require('../controllers/noticeBoardController');

const router = express.Router();
router.post('/', postNews);
router.get('/:kindergarten_id', getNewsByKindergartenId);
router.put('/:newsId', editNews); 
router.delete('/:newsId', deleteNews); 

module.exports = router;
