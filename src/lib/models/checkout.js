"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const mongoose_1 = require("mongoose");
const CheckoutSchema = new mongoose_1.Schema({
    creatorId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Customer' },
    lineItems: [
        {
            product: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Product' },
            quantity: { type: Number, required: true },
        },
    ],
    dateAdded: { type: Date, default: Date.now, required: true },
    dateUpdated: { type: Date, default: Date.now, required: true },
});
// create strongly typed mongoose models with TypeScript
exports.default = mongoose.model('Checkout', CheckoutSchema);
//# sourceMappingURL=checkout.js.map