const Claim = require('../models/Claim');
const jwt = require('jsonwebtoken');

exports.submitClaim = async (req, res) => {
    try {
        const token = req.header('Authorization');
        if (!token) {
            return res.status(401).json({ message: 'jwt must be provided' });
        }
        const { name, email, claimAmount, description } = req.body;
        const document = req.file ? req.file.filename : null;

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;

        const claim = new Claim({ name, email, claimAmount, description, document, userId });
        await claim.save();
        res.status(201).json({ message: 'Claim submitted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getClaims = async (req, res) => {
    try {
        const token = req.header('Authorization');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;

        const claims = await Claim.find({ userId: userId });
        res.json(claims);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateClaim = async (req, res) => {
    try {
        const { status, approvedAmount, insurerComments } = req.body;
        await Claim.findByIdAndUpdate(req.params.id, { status, approvedAmount, insurerComments });
        res.json({ message: 'Claim updated successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getAllClaims = async (req, res) => {
    try {
        const token = req.header('Authorization');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userRole = decoded.role;

        if (userRole !== 'insurer') {
            return res.status(403).json({ message: 'Forbidden' });
        }

        const claims = await Claim.find();
        res.json(claims);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getClaimById = async (req, res) => {
    try {
        const claim = await Claim.findById(req.params.id);
        if (!claim) {
            return res.status(404).json({ message: 'Claim not found' });
        }
        res.json(claim);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};