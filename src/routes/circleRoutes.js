const express = require('express');
const router = express.Router();
const circleController = require('../controllers/circleController');
const { authenticate } = require('../middleware/auth');

router.post('/', authenticate, circleController.createCircle);
router.get('/', authenticate, circleController.getCircles);

module.exports = router;
