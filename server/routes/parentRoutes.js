const express = require('express');
const {
    getAllParents,
    getParentById,
    updateParent,
    deleteParent
} = require('../controllers/parentController');

const router = express.Router();

router.get('/', getAllParents);
router.get('/:id', getParentById);
router.put('/update/:id', updateParent);
router.delete('/delete/:id', deleteParent);

module.exports = router;
