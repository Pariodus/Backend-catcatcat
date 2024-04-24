const mongoose = require('mongoose');

const PremiumTransactionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    membership: {
        type: String,
        required: true,
        enum: ['Student', 'Individual(month)', 'Individual(year)']
    },
    cost: {
        type: String,
        required: true
    },
    bank: {
        type: String,
        required: true,
        enum: ['Kbank', 'SCB', 'PromptPay']
    },
    studentcard: {
        type: String,
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

module.exports = mongoose.model('PremiumTransaction', PremiumTransactionSchema);