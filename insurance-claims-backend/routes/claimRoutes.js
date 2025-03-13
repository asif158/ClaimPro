// claimRoutes.js
const express = require('express');
const { 
    submitClaim, 
    getClaims, 
    updateClaim, 
    getAllClaims,
    getClaimById // Import the new controller function
} = require('../controllers/claimController');
const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');
const router = express.Router();

router.post('/submit', authMiddleware, upload.single('document'), submitClaim);
router.get('/', authMiddleware, getClaims);
router.get('/all', authMiddleware, getAllClaims);
router.get('/:id', authMiddleware, getClaimById);
router.put('/:id', authMiddleware, updateClaim);

module.exports = router;