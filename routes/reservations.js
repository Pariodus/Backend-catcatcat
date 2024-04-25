const express = require('express');
const {getReservations, getReservation, addReservation, updateReservation, deleteReservation} = require('../controllers/reservations');

const router = express.Router({mergeParams: true});

const {protect, authorize} = require('../middleware/auth');

router.route('/').get(protect, getReservations).post(protect, authorize('admin', 'user', 'premium'), addReservation);
router.route('/:id').get(protect, getReservation).put(protect, authorize('admin', 'user', 'premium'), updateReservation).delete(protect, authorize('admin', 'user', 'premium'), deleteReservation);

module.exports = router;