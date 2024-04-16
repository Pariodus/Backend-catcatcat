const Transaction = require('../models/Transaction');
const Reservation = require('../models/Reservation')

//@desc     Get single transaction
//@route    GET /api/transactions/:id
//@access   Private
exports.getTransaction = async (req, res, next) => {
    try {
        const transaction = await Transaction.findOne({reservation: req.params.id})

        if (!transaction) {
            return res.status(404).json({success: false, message: `No Transaction with the reservation id of ${req.params.id}`});
        }

        res.status(200).json({success: true, data: transaction});
    } catch (error) {
        console.log(error.stack);
        return res.status(500).json({success: false, message: 'Cannot find Transaction'});
    }
};

//@desc     Add transaction
//@route    POST /api/transactions/
//@access   Private
exports.addTransaction = async (req, res, next) => {
    try {
        // Add user Id to req.body
        req.body.user = req.user.id;

        const transaction = await Transaction.create(req.body);

        res.status(200).json({success: true, data: transaction});
    } catch (error) {
        console.log(error.stack);
        return res.status(500).json({success: false, message: 'Cannot create Transaction'});
    }
};