const Transaction = require('../models/Transaction');
const CoworkingSpace = require('../models/CoworkingSpace');

//@desc     Get all transactions
//@route    GET /api/transactions
//@access   Public
exports.getTransactions = async (req, res, next) => {
    let query;

    // General users can see only their transactions
    if (req.user.role !== 'admin') {
        query = Transaction.find({user: req.user.id}).populate({
            path: 'coworkingspace',
            select: 'name address tel opentime closetime'
        });
    } else {
        // If you are admin, you can see all
        if (req.params.coworkingspaceId) {
            query = Transaction.find({coworkingspace: req.params.coworkingspaceId}).populate({
                path: 'coworkingspace',
                select: 'name address tel opentime closetime'
            });
        } else {
            query = Transaction.find().populate({
                path: 'coworkingspace',
                select: 'name address tel opentime closetime'
            });
        }
    }

    try {
        const transactions = await query;

        res.status(200).json({
            success: true,
            count: transactions.length,
            data: transactions
        });
    } catch (error) {
        console.log(error.stack);
        return res.status(500).json({success: false, message: "Cannot find Transaction"});
    }
};

//@desc     Get single transaction
//@route    GET /api/transactions/:id
//@access   Public
exports.getTransaction = async (req, res, next) => {
    try {
        const transaction = await Transaction.findById(req.params.id).populate({
            path: 'coworkingspace',
            select: 'name address tel opentime closetime'
        });

        if (!transaction) {
            return res.status(404).json({success: false, message: `No Transaction with the id of ${req.params.id}`});
        }

        res.status(200).json({success: true, data: transaction});
    } catch (error) {
        console.log(error.stack);
        return res.status(500).json({success: false, message: 'Cannot find Transaction'});
    }
};

//@desc     Add transaction
//@route    POST /api/coworkingspaces/:coworkingspaceId/transactions
//@access   Private
exports.addTransaction = async (req, res, next) => {
    try {
        req.body.coworkingspace = req.params.coworkingspaceId;

        const coworkingspace = await CoworkingSpace.findById(req.params.coworkingspaceId);
        
        if (!coworkingspace) {
            return res.status(404).json({success: false, message: `No co-working space with the id of ${req.params.coworkingspaceId}`});
        }

        // Add user Id to req.body
        req.body.user = req.user.id;

        // Check for existed transaction
        const existedTransactions = await Transaction.find({user: req.user.id});

        // If the user is not an admin, they can only create 3 transactions
        if (existedTransactions.length >= 3 && req.user.role !== 'admin') {
            return res.status(400).json({success: false, message: `The user with ID ${req.user.id} has already made 3 transactions`});
        }

        // Check validation of transaction's time
        let reserveStartTime = new Date(req.body.reserveStartTime);
        let reserveEndTime = new Date(req.body.reserveEndTime);
        let reserveStartDate = reserveStartTime.toISOString().slice(0, 10);
        let reserveEndDate = reserveEndTime.toISOString().slice(0, 10);
        let coworkingOpenTime = new Date(reserveStartDate + 'T' + coworkingspace.opentime + ':00.000Z');
        let coworkingCloseTime = new Date(reserveEndDate + 'T' + coworkingspace.closetime + ':00.000Z');

            // Check if it's the same date
            if (reserveStartDate !== reserveEndDate) {
                return res.status(405).json({success: false, message: 'The transaction start time and end time must be in the same date.'});
            }
        
            // Check if end time occurs after start time
            if (reserveEndTime.getTime() <= reserveStartTime.getTime()) {
                return res.status(405).json({success: false, message: 'The transaction end time must occurs after start time.'});
            }

            // Check if transaction time in co-working space's openning hours
            if (reserveStartTime.getTime() < coworkingOpenTime.getTime() || reserveEndTime.getTime() > coworkingCloseTime.getTime()) {
                return res.status(405).json({success: false, message: `The transaction time must be in co-working space's openning hours`});
            }

            // Check if transaction is not more than 2 hours
            if (reserveEndTime.getTime() - reserveStartTime.getTime() > 2 * 60 * 60 * 1000) {
                return res.status(405).json({success: false, message: `The transaction must not more than 2 hours`});
            }

        const transaction = await Transaction.create(req.body);

        res.status(200).json({success: true, data: transaction});
    } catch (error) {
        console.log(error.stack);
        return res.status(500).json({success: false, message: 'Cannot create Transaction'});
    }
};

//@desc     Update transaction
//@route    PUT /api/transactions/:id
//@access   Private
exports.updateTransaction = async (req, res, next) => {
    try {
        let transaction = await Transaction.findById(req.params.id);

        if (!transaction) {
            return res.status(404).json({success: false, message: `No transaction intment with the id of ${req.params.id}`});
        }

        // Make sure user is the transaction owner
        if (transaction.user.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(401).json({success: false, message: `User ${req.user.id} is not authorized to update this transaction`});
        }

        // Check validation of transaction's time
        const coworkingspace = await CoworkingSpace.findById(transaction.coworkingspace);

        let reserveStartTime = new Date(req.body.reserveStartTime || transaction.reserveStartTime);
        let reserveEndTime = new Date(req.body.reserveEndTime || transaction.reserveEndTime);
        let reserveStartDate = reserveStartTime.toISOString().slice(0, 10);
        let reserveEndDate = reserveEndTime.toISOString().slice(0, 10);
        let coworkingOpenTime = new Date(reserveStartDate + 'T' + coworkingspace.opentime + ':00.000Z');
        let coworkingCloseTime = new Date(reserveEndDate + 'T' + coworkingspace.closetime + ':00.000Z');

            // Check if it's the same date
            if (reserveStartDate !== reserveEndDate) {
                return res.status(405).json({success: false, message: 'The transaction start time and end time must be in the same date.'});
            }
        
            // Check if end time occurs after start time
            if (reserveEndTime.getTime() <= reserveStartTime.getTime()) {
                return res.status(405).json({success: false, message: 'The transaction end time must occurs after start time.'});
            }

            // Check if transaction time in co-working space's openning hours
            if (reserveStartTime.getTime() < coworkingOpenTime.getTime() || reserveEndTime.getTime() > coworkingCloseTime.getTime()) {
                return res.status(405).json({success: false, message: `The transaction time must be in co-working space's openning hours`});
            }

            // Check if transaction is not more than 2 hours
            if (reserveEndTime.getTime() - reserveStartTime.getTime() > 2 * 60 * 60 * 1000) {
                return res.status(405).json({success: false, message: `The transaction must not more than 2 hours`});
            }

        transaction = await Transaction.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({success: true, data: transaction});
    } catch (error) {
        console.log(error.stack);
        return res.status(500).json({success: false, message: 'Cannot update Transaction'});
    }
};

//@desc     Delete transaction
//@route    DELETE /api/transactions/:id
//@access   Private
exports.deleteTransaction = async (req, res, next) => {
    try {
        const transaction = await Transaction.findById(req.params.id);

        if (!transaction) {
            return res.status(404).json({success: false, message: `No transaction with the id of ${req.params.id}`});
        }

        // Make sure user is the transaction owner
        if (transaction.user.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(401).json({success: false, message: `User ${req.user.id} is not authorized to delete this transaction`})
        }

        await transaction.deleteOne();

        res.status(200).json({success: true, data: {}});
    } catch (error) {
        console.log(error.stack);
        return res.status(500).json({success: false, message: 'Cannot delete Transaction'});
    }
};