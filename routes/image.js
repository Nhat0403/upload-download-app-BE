const express = require('express');
const router = express.Router();
const imageControllers = require('../controllers/image');

router.post('/upload', imageControllers.postImage);
router.get('/get', imageControllers.getImages);

module.exports = router;