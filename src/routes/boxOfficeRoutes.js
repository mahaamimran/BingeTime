const express = require('express');
const router = express.Router();
const boxOfficeController = require('../controllers/boxOfficeController');
const { protect } = require('../middlewares/authMiddleware');

// Box Office Routes
router.get('/box-office/:movieId', protect, boxOfficeController.getBoxOfficeDetails);
router.post('/box-office', protect, boxOfficeController.addBoxOfficeDetails);

// Award Routes
router.get('/awards', protect, boxOfficeController.getAwards);
router.post('/awards', protect, boxOfficeController.addAward);

module.exports = router;
