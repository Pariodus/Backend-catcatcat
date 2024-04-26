const express = require('express');
const {getPremiumTransactions, getPremiumTransaction, addPremiumTransaction, deletePremiumTransaction} = require('../controllers/premiumtransactions');

const router = express.Router({mergeParams: true});

const {protect, authorize} = require('../middleware/auth');

router.route('/').get(protect, getPremiumTransactions).post(protect, authorize('admin', 'user', 'premium'), addPremiumTransaction);
router.route('/:id').get(protect, authorize('admin', 'user', 'premium'), getPremiumTransaction).delete(protect, authorize('admin', 'user', 'premium'), deletePremiumTransaction);

module.exports = router;