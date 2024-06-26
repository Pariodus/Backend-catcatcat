const mongoose = require('mongoose');

const ReservationSchema = new mongoose.Schema({
    reserveStartTime: {
        type: Date,
        required: true
    },
    reserveEndTime: {
        type: Date,
        required: true
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'user',
        required: true
    },
    coworkingspace: {
        type: mongoose.Schema.ObjectId,
        ref: 'coworkingspace',
        required: true
    },
    totalcost: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['waiting', 'pending', 'success', 'failed'],
        default: 'waiting'
    },
    createAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Reservation', ReservationSchema);