const router = require('express').Router();
const User = require("../models/User");
const verifyToken = require('../utils/verifyToken');

router.get('/personal/me', verifyToken(['admin', 'client', 'serviceProvider']), async (req, res) => {
    const user = await User.findById(req.user._id).select('-password -__v');

    return res.send({ user: user })
});

router.get('/', verifyToken(['admin']), async (req, res) => {
    const roleFilter = req.query.role !== '' && typeof req.query.role !== 'undefined' ? { role: req.query.role } : {};
    const statusFilter = req.query.status !== '' && typeof req.query.status !== 'undefined' ? { status: req.query.status } : {};
    const searchQuery = typeof req.query.q !== 'undefined' ? req.query.q : '';
    const filterParams = {
        $and: [
            {
                $or: [
                    { firstName: { $regex: searchQuery, $options: 'i' } },
                    { lastName: { $regex: searchQuery, $options: 'i' } },
                    { email: { $regex: searchQuery, $options: 'i' } },
                ],
            },
            roleFilter,
            statusFilter
        ],
    };
    const totalCount = await User.countDocuments({});
    const users = await User.find(filterParams).select('-password -__v');

    return res.send({
        totalCount,
        users,
        filteredCount: users.length,
    })
});

router.get('/logout', verifyToken(['admin', 'client', 'serviceProvider']), async (req, res) => {
    res.cookie('refreshToken', '', { maxAge: 1 });
    return res.status(200).send({message: 'successfully logout'})
});

module.exports = router;