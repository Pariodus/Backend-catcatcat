const express = require('express');
const {getPremiumTransactions, getPremiumTransaction, addPremiumTransaction, updatePremiumTransaction, deletePremiumTransaction} = require('../controllers/premiumtransactions');

const router = express.Router({mergeParams: true});

const {protect, authorize} = require('../middleware/auth');

router.route('/').get(protect, getPremiumTransactions).post(protect, authorize('admin', 'user', 'premium'), addPremiumTransaction);
router.route('/:id').get(protect, authorize('admin', 'user', 'premium'), getPremiumTransaction).put(protect, authorize('admin'), updatePremiumTransaction).delete(protect, authorize('admin', 'user', 'premium'), deletePremiumTransaction);

module.exports = router;

/**
* @swagger
* components:
*   schemas:
*     PremiumTransaction:
*       type: object
*       required:
*         - user
*         - membership
*         - cost
*         - bank
*         - slip
*       properties:
*         id:
*           type: string
*           format: uuid
*           description: The auto-generated id of the premium transaction
*           example: 662c18854c3a89ba2925516f
*         user:
*           type: string
*           description: Reference to the user making the transaction
*         membership:
*           type: string
*           description: Type of membership purchased
*           enum: ['Student', 'Individual(month)', 'Individual(year)']
*         cost:
*           type: string
*           description: Cost of the transaction
*         bank:
*           type: string
*           description: Bank used for the transaction
*           enum: ['Kbank', 'SCB', 'PromptPay']
*         studentcard:
*           type: string
*           description: Image of student card
*         slip:
*           type: string
*           description: Image of transaction slip
*         status:
*           type: string
*           description: Status of the transaction
*           enum: ['pending', 'success', 'failed']
*           default: 'pending'
*         createAt:
*           type: string
*           format: date-time
*           description: Date and time of transaction creation
*       example:
*         id: 662c18854c3a89ba2925516f
*         user: 6602d50adef3150b6cbedb33
*         membership: Student
*         cost: 129
*         bank: Kbank
*         studentcard: data:image/jpeg;base64,/9j/4AAQSkZJRgABAgEASABIAAD...
*         slip: data:image/jpeg;base64,/9j/4AAQSkZJRgABAgEASABIAAD...
*         status: pending
*         createAt: 2024-04-27T12:00:00Z
*/

/**
* @swagger
* tags:
*   name: Premium Transactions
*   description: The premium transactions managing API
*/

/**
* @swagger
* /premiumtransactions:
*   get:
*     summary: Returns the list of all premium transactions
*     tags: [Premium Transactions]
*     responses:
*       200:
*         description: The list of the premium transactions
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                 $ref: '#/components/schemas/PremiumTransaction'
*/

/**
* @swagger
* /premiumtransactions/{id}:
*   get:
*     summary: Get the Premium Transaction by id
*     tags: [Premium Transactions]
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: string
*         required: true
*         description: The premium transaction id
*     responses:
*       200:
*         description: The Premium Transaction description by id
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/PremiumTransaction'
*       404:
*         description: No Premium Transaction with the reservation id
*/

/**
* @swagger
* /premiumtransactions:
*   post:
*     summary: Create a new premium transaction
*     tags: [Premium Transactions]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/PremiumTransaction'
*     responses:
*       201:
*         description: The premiumtransaction was successfully created
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/PremiumTransaction'
*       500:
*         description: Cannot create premium transaction
*/

/**
* @swagger
* /premiumtransactions/{id}:
*   put:
*     summary: Update the premium transactions by id
*     tags: [Premium Transactions]
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: string
*         required: true
*         description: The premium transaction id
*     requestBody:
*         required: true
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/PremiumTransaction'
* 
*     responses:
*       200:
*         description: The premium transaction was updated
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/PremiumTransaction'
*       404:
*         description: The premium transaction was not found
*       500:
*         description: Some error happened
*/

/**
* @swagger
* /premiumtransactions/{id}:
*   delete:
*     summary: Remove the premium transactions by id
*     tags: [Premium Transactions]
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: string
*         required: true
*         description: The premium transaction id
* 
*     responses:
*       200:
*         description: The premium transaction was deleted
*       404:
*         description: The premium transaction was not found
*/