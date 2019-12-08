"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const mongoose_1 = require("mongoose");
const CustomerSchema = new mongoose_1.Schema({
    _id: mongoose_1.Schema.Types.ObjectId,
    name: { type: String, required: true, unique: true },
    checkout: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Checkout' },
    priceRules: {
        type: [
            {
                entitledProduct: { type: String, required: true },
                label: { type: String, required: true },
                ruleType: { type: String, required: true },
                xForY: {
                    // xForY special
                    x: { type: Number },
                    y: { type: Number },
                },
                discount: {
                    // discount by fixed amount or percent deal
                    percent: { type: Number },
                    fixed: { type: Number },
                },
            },
        ],
        required: true,
    },
    dateAdded: { type: Date, default: Date.now, required: true },
    dateUpdated: { type: Date, default: Date.now, required: true },
});
// create strongly typed mongoose models with TypeScript
exports.default = mongoose.model('Customer', CustomerSchema);
//# sourceMappingURL=customer.js.map