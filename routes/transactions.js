const express = require('express');
const {getTransaction, addTransaction} = require('../controllers/transactions');

const router = express.Router({mergeParams: true});

const {protect, authorize} = require('../middleware/auth');

router.route('/').post(protect, authorize('admin', 'user', 'premium'), addTransaction);
router.route('/:id').get(protect, authorize('admin', 'user', 'premium'), getTransaction);

module.exports = router;

/**
* @swagger
* components:
*   schemas:
*       Transaction:
*           type: object
*           required:
*               - reservation
*               - user
*               - totalcost
*               - bank
*               - slip
*           properties:
*               id:
*                   type: string
*                   format: uuid
*                   description: The auto-generated id of the transaction
*                   example: 5d713995b721c3bb38c1f5d0
*               reservation:
*                   type: string
*                   format: uuid
*                   description: The auto-generated id of the reservation
*                   example: 5d713995b721c3bb38c1f5d0
*               user:
*                   type: string
*                   format: uuid
*                   description: The auto-generated id of the user
*                   example: 5d713995b721c3bb38c1f5d0
*               totalcost:
*                   type: string
*                   description: Total cost of the reservation
*               bank:
*                   type: string
*                   description: Bank name
*               slip:
*                   type: string
*                   description: Slip image
*               createAt:
*                   type: string
*                   format: date-time
*                   description: The timestamp when the record was first created
*                   example: 2021-08-10T08:31:15.000Z
*           example:
*               id: 5d713995b721c3bb38c1f5d0
*               reservation: 6620b95404011823a12f5e45
*               user: 6602d50adef3150b6cbedb33
*               totalcost: 500
*               bank: Kbank
*               slip: data:image/jpeg;base64,/9j/4gIcSUNDX1BST0ZJTEUAAQ
*               createAt: 2021-08-10T08:31:15.000Z
*/

/**
 * @swagger
 * tags:
 *      name: Transactions
 *      description: The Transactions managing API
 */

/**
 * @swagger
 * /transactions/{id}:
 *    get:
 *      summary: Get a transaction by reservation id
 *      tags: [Transactions]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *                type: string
 *            required: true
 *            description: The reservation id
 *      security:
 *          - bearerAuth: []
 *      responses:
 *          200:
 *              description: The transaction description by reservation id
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Transaction'
 *          404:
 *              description: The transaction was not found
 */

/**
 * @swagger
 * /transactions:
 *    post:
 *      summary: Add a transaction
 *      tags: [Transactions]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Transaction'
 *      security:
 *         - bearerAuth: []
 *      responses:
 *          201:
 *              description: Transaction was successfully created
 *              content:
 *                  application/json:
 *                      schema:
 *                      $ref: '#/components/schemas/Transaction'
 *          500:
 *              description: Some server error
 */