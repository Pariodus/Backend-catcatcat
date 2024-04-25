const express = require('express');
const {getPremiumTransactions, getPremiumTransaction, addPremiumTransaction} = require('../controllers/premiumtransactions');

const router = express.Router({mergeParams: true});

const {protect, authorize} = require('../middleware/auth');

router.route('/').get(protect, getPremiumTransactions).post(protect, authorize('admin', 'user', 'premium'), addPremiumTransaction);
router.route('/:id').get(protect, authorize('admin', 'user', 'premium'), getPremiumTransaction);

module.exports = router;