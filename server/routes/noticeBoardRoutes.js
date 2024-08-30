const express = require('express');
const { getNewsByKindergartenId,postNews,editNews,deleteNews } = require('../controllers/noticeBoardController');
const {authorizeRole}=require('./middleware/auth');



const router = express.Router();
router.post('/',authorizeRole('teacher'), postNews);
router.get('/:kindergarten_id', getNewsByKindergartenId);
router.put('/:newsId',authorizeRole('teacher'), editNews); 
router.delete('/:newsId',authorizeRole('teacher'), deleteNews); 

module.exports = router;
