const UserDetails = require('../models/userDetails');

exports.get_user_details = async (req, res) => {
    try {
        const userDetails = await UserDetails.findAll();
        res.json(userDetails);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.get_user_details_by_id = async (req, res) => {
    const userId = req.user.id;
    try {
        const userIdFromToken = userId;
        const isAdmin = req.user.isAdmin;
        const requestedUserId = parseInt(userId);

        if (!isAdmin && userIdFromToken !== requestedUserId) {
            return res.status(403).json({ message: 'Bu kullanıcı ayrıntılarına erişme yetkiniz yok' });
        }

        const userDetails = await UserDetails.findByPk(userId);
        if (!userDetails) {
            return res.status(404).json({ message: 'Kullanıcı detayları bulunamadı' });
        }
        res.json(userDetails);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.get_user_details_by_user_id = async (req, res) => {
    const id = req.params.id;
    try {
        const userDetails = await UserDetails.findByPk(id);
        if (!userDetails) {
            return res.status(404).json({ message: 'Kullanıcı detayları bulunamadı' });
        }
        res.json(userDetails);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.create_user_details = async (req, res) => {
    try {
        const userDetails = await UserDetails.create(req.body);
        res.status(201).json(userDetails);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

exports.update_user_details = async (req, res) => {
    const userId = req.user.id;
    try {
        const userDetails = await UserDetails.findByPk(userId);
        if (!userDetails) {
            return res.status(404).json({ message: 'User details not found' });
        }
        await userDetails.update(req.body);
        res.json(userDetails);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

exports.delete_user_details = async (req, res) => {
    const userId = req.user.id;
    try {
        const userDetails = await UserDetails.findByPk(userId);
        if (!userDetails) {
            return res.status(404).json({ message: 'User details not found' });
        }
        await userDetails.destroy();
        res.json({ message: 'User details deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}