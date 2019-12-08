"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const checkout = require("./modules/checkout");
const product = require("./modules/product");
function resolversMap() {
    const Query = {
        checkout: checkout.getCheckout,
        version: () => '1.0.0',
    };
    const Mutation = {
        createCheckout: checkout.createCheckout,
        updateCheckout: checkout.updateCheckout,
    };
    const resolversMap = {
        Query,
        Mutation,
        Checkout: checkout.CheckoutResolverMap,
        Product: product.ProductResolverMap,
    };
    return resolversMap;
}
exports.default = resolversMap;
//# sourceMappingURL=resolversMap.js.map