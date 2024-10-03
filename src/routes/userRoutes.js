const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticate } = require('../middleware/auth');

router.get('/me', authenticate, userController.getCurrentUser);
router.put('/me', authenticate, userController.updateUser);

module.exports = router;
