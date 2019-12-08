"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const seed_1 = require("./seed");
const product_1 = require("../src/lib/models/product");
const customer_1 = require("../src/lib/models/customer");
const checkout_1 = require("../src/lib/models/checkout");
async function seed() {
    console.log('Seeding data...');
    const customerCreatePromises = seed_1.customers.map(data => customer_1.default.create(data));
    const productCreatePromises = seed_1.products.map(data => product_1.default.create(data));
    const checkoutCreatePromises = seed_1.checkouts.map(data => checkout_1.default.create(data));
    const combined = [
        ...customerCreatePromises,
        ...productCreatePromises,
        ...checkoutCreatePromises,
    ];
    return Promise.all(combined);
}
exports.default = seed;
//# sourceMappingURL=seeder.js.map