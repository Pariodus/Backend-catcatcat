const express = require('express');
const {getPremiumTransactions, getPremiumTransaction, addPremiumTransaction, deletePremiumTransaction} = require('../controllers/premiumtransactions');

const router = express.Router({mergeParams: true});

const {protect, authorize} = require('../middleware/auth');

router.route('/').get(protect, getPremiumTransactions).post(protect, authorize('admin', 'user', 'premium'), addPremiumTransaction);
router.route('/:id').get(protect, authorize('admin', 'user', 'premium'), getPremiumTransaction).delete(protect, authorize('admin', 'user', 'premium'), deletePremiumTransaction);

module.exports = router;

/**
* @swagger
* components:
*   schemas:
*       PremiumTransaction:
*           type: object
*           required:
*               - user
*               - membership
*               - cost
*               - bank
*               - slip
*           properties:
*               id:
*                   type: string
*                   format: uuid
*                   description: The auto-generated id of the premium transaction
*                   example: 662c18854c3a89ba2925516f
*               user:
*                   type: string
*                   description: Reference to the user making the transaction
*               membership:
*                   type: string
*                   description: Type of membership purchased
*                   enum: ['Student', 'Individual(month)', 'Individual(year)']
*               cost:
*                   type: string
*                   description: Cost of the transaction
*               bank:
*                   type: string
*                   description: Bank used for the transaction
*                   enum: ['Kbank', 'SCB', 'PromptPay']
*               studentcard:
*                   type: string
*                   description: Image of Student card
*               slip:
*                   type: string
*                   description: Image of Transaction slip
*               status:
*                   type: string
*                   description: Status of the transaction
*                   enum: ['pending', 'success', 'failed']
*                   default: 'pending'
*               createAt:
*                   type: string
*                   format: date-time
*                   description: Date and time of transaction creation
*           example:
*               id: 662c18854c3a89ba2925516f
*               user: 6602d50adef3150b6cbedb33
*               membership: Student
*               cost: 129
*               bank: Kbank
*               studentcard: data:image/jpeg;base64,/9j/4AAQSkZJRgABAgEASABIAAD...
*               slip: data:image/jpeg;base64,/9j/4AAQSkZJRgABAgEASABIAAD...
*               status: pending
*               createAt: 2024-04-27T12:00:00Z
*/
