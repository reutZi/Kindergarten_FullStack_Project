const express = require('express');
const {
    getAllParents,
    getParentById,
    updateParent,
    deleteParent,
    getChildrenByParentId,
    getAttendanceByMonth,
    saveAttendanceRecord
} = require('../controllers/parentController');
const {authorizeRole} = require('../middleware/auth');
const router = express.Router();

router.get('/', authorizeRole('parent'),getAllParents);
router.get('/:id', authorizeRole('parent'),getParentById);
router.get('/:id/children',authorizeRole('parent'), getChildrenByParentId);
router.get('/attendance/:cid/month', getAttendanceByMonth);
router.post('/attendance/:cid/save', saveAttendanceRecord);
router.put('/update/:id',authorizeRole('parent'), updateParent);
router.delete('/delete/:id', authorizeRole('parent'),deleteParent);

module.exports = router;
