const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
    reservation: {
        type: mongoose.Schema.ObjectId,
        ref: 'reservation',
        required: true
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'user',
        required: true
    },
    totalcost: {
        type: String,
        required: true
    },
    slip: {
        type: String,
        required: true
    },
    createAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Transaction', TransactionSchema);