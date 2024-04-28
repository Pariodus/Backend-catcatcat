const User = require('../models/User');

exports.cron = async (req, res) => {
    try {
        const users = await User.find();
        for (const user of users) {
            if (user.role === 'premium' && user.expire && new Date(user.expire) <= new Date()) {
                await User.findByIdAndUpdate(user.id, { $set: { role: 'user' }, $unset: { expire: 1 } }, {
                    new: true,
                    runValidators: true
                });
                console.log(`Successfully remove premium from user ${user.name}`);
            }
        }
        return res.status(200).json({success: true, message: 'Successfully remove expired premium role from user'})
    } catch (err) {
        return res.status(500).json({success: false, message: 'Cannot remove expired premium role from user'})
    }
}