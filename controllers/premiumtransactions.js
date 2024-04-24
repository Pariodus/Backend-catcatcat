const PremiumTransaction = require('../models/PremiumTransaction');

//@desc     Get single transaction
//@route    GET /api/transactions/:id
//@access   Private
exports.getPremiumTransaction = async (req, res, next) => {
    try {
        const premiumTansaction = await PremiumTransaction.findOne({user: req.params.id})

        if (!premiumTansaction) {
            return res.status(404).json({success: false, message: `No Premium Transaction with the reservation id of ${req.params.id}`});
        }

        res.status(200).json({success: true, data: premiumTansaction});
    } catch (error) {
        console.log(error.stack);
        return res.status(500).json({success: false, message: 'Cannot find Transaction'});
    }
};

//@desc     Add transaction
//@route    POST /api/transactions/
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