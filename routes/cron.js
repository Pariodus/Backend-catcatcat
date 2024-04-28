const express = require('express');
const {cron}= require('../controllers/cron');

const router = express.Router();

router.get('/',cron);

module.exports = router;