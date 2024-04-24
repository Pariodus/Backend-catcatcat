const express = require('express');
const {getPremiumTransaction, addPremiumTransaction} = require('../controllers/premiumtransactions');

const router = express.Router({mergeParams: true});

const {protect, authorize} = require('../middleware/auth');

router.route('/').post(protect, authorize('admin', 'user'), addPremiumTransaction);
router.route('/:id').get(protect, authorize('admin', 'user'), getPremiumTransaction);

module.exports = router;