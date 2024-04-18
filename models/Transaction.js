const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
    reservation: {
        type: mongoose.Schema.ObjectId,
        ref: 'Reservation',
        required: true
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    totalcost: {
        type: String,
        required: true
    },
    bank: {
        type: String,
        required: true,
        enum: ['Kbank', 'SCB', 'PromptPay']
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