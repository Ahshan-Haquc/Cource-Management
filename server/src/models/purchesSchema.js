const mongoose = require('mongoose');

const purchaseSchema = new mongoose.Schema({
user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
amount: { type: Number, required: true }
},{timestamps: true});

const PurchaseModel = mongoose.model('Purchase', purchaseSchema)
module.exports = PurchaseModel;