const PremiumTransaction = require('../models/PremiumTransaction');

//@desc     Get all premium transaction
//@route    GET /api/premiumtransactions
//@access   Public
exports.getPremiumTransactions = async (req, res, next) => {
    let query;

    if (req.user.role !== 'admin') {
        query = PremiumTransaction.find({user: req.user.id}, '_id user membership cost status');
    } else {
        query = PremiumTransaction.find({}, '_id user membership cost status');
    }

    try {
        const premiumTransactions = await query;

        res.status(200).json({
            success: true,
            count: premiumTransactions.length,
            data: premiumTransactions
        });
    } catch (error) {
        console.log(error.stack);
        return res.status(500).json({success: false, message: "Cannot find Premium Transactions"});
    }
};

//@desc     Get single premium transaction
//@route    GET /api/premiumtransactions/:id
//@access   Private
exports.getPremiumTransaction = async (req, res, next) => {
    try {
        const premiumTansaction = await PremiumTransaction.findById(req.params.id)

        if (!premiumTansaction) {
            return res.status(404).json({success: false, message: `No Premium Transaction with the user id of ${req.params.id}`});
        }

        res.status(200).json({success: true, data: premiumTansaction});
    } catch (error) {
        console.log(error.stack);
        return res.status(500).json({success: false, message: 'Cannot find Premium Transaction'});
    }
};

//@desc     Add premium transaction
//@route    POST /api/premiumtransactions/
//@access   Private
exports.addPremiumTransaction = async (req, res, next) => {
    try {
        // Add user Id to req.body
        req.body.user = req.user.id;

        const premiumTransaction = await PremiumTransaction.create(req.body);

        res.status(200).json({success: true, data: premiumTransaction});
    } catch (error) {
        console.log(error.stack);
        return res.status(500).json({success: false, message: 'Cannot create Premium Transaction'});
    }
};

//@desc     Update a premium transaction
//@route    PUT /api/premiumtransactions/:id
//@access   Private
exports.updatePremiumTransaction = async (req,res,next) => {
    try {
        let premiumTransaction = await PremiumTransaction.findById(req.params.id);

        if (!premiumTransaction) {
            return res.status(404).json({success: false, message: `No premium transaction intment with the id of ${req.params.id}`});
        }

        premiumTransaction = await PremiumTransaction.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({success:true, data: premiumTransaction});
    }
    catch (error) {
        console.log(error.stack);
        return res.status(500).json({success: false, message: 'Cannot update Premium Transaction'});
    }
};

//@desc     Delete reservation
//@route    DELETE /api/premiumtransactions/:id
//@access   Private
exports.deletePremiumTransaction = async (req, res, next) => {
    try {
        const premiumTransaction = await PremiumTransaction.findById(req.params.id);

        if (!premiumTransaction) {
            return res.status(404).json({success: false, message: `No Premium Transaction with the id of ${req.params.id}`});
        }

        await premiumTransaction.deleteOne();

        res.status(200).json({success: true, data: {}});
    } catch (error) {
        console.log(error.stack);
        return res.status(500).json({success: false, message: 'Cannot delete Premium Transaction'});
    }
};