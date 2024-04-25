const express = require('express');
const {getTransactions, getTransaction, addTransaction, updateTransaction, deleteTransaction} = require('../controllers/transactions');

const router = express.Router({mergeParams: true});

const {protect, authorize} = require('../middleware/auth');

router.route('/').post(protect, authorize('admin', 'user', 'premium'), addTransaction);
router.route('/:id').get(protect, authorize('admin', 'user', 'premium'), getTransaction);

module.exports = router;