const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
title: { type: String, required: true },
description: { type: String },
price: { type: Number, required: true, default: 0 },
instructor: { type: String },
}, { timestamps: true });

const CourceModel = mongoose.model("Cource", courseSchema);

module.exports = CourceModel;