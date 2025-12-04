const express = require('express');
const router = express.Router();
const acquireController = require('../controllers/acquireController');

router.get('/health', acquireController.getHealth);
router.post('/data', acquireController.postData);

module.exports = router;