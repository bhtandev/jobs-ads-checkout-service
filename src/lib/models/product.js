"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const mongoose_1 = require("mongoose");
var ProductType;
(function (ProductType) {
    ProductType["CLASSIC"] = "Classic";
    ProductType["STANDOUT"] = "StandOut";
    ProductType["PREMIUM"] = "Premium";
})(ProductType = exports.ProductType || (exports.ProductType = {}));
const ProductSchema = new mongoose_1.Schema({
    name: { type: String, required: true, unique: true },
    type: { type: String, required: true },
    price: { type: Number, required: true },
    dateAdded: { type: Date, default: Date.now, required: true },
    dateUpdated: { type: Date, default: Date.now, required: true },
});
// create strongly typed mongoose models with TypeScript
exports.default = mongoose.model('Product', ProductSchema);
//# sourceMappingURL=product.js.map