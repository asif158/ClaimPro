// models/Claim.js
const mongoose = require('mongoose');

const ClaimSchema = new mongoose.Schema({
    name: String,
    email: String,
    claimAmount: Number,
    description: String,
    document: String,
    status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
    approvedAmount: Number,
    insurerComments: String,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    submissionDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Claim', ClaimSchema);