const express = require('express');
const {
    getAllParents,
    getParentById,
    updateParent,
    deleteParent,
    getChildrenByParentId
} = require('../controllers/parentController');

const router = express.Router();

router.get('/', getAllParents);
router.get('/:id', getParentById);
router.get('/:id/children', getChildrenByParentId);
router.put('/update/:id', updateParent);
router.delete('/delete/:id', deleteParent);

module.exports = router;
