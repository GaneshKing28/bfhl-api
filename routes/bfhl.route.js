const express = require('express');
const router = express.Router();

const { processBFHL } = require('../controllers/bfhl.controller');

router.post('/', processBFHL);

module.exports = router;