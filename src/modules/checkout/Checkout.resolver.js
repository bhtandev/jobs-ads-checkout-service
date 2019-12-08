"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const checkout_1 = require("../../lib/models/checkout");
const customer_1 = require("../../lib/models/customer");
const engine_1 = require("../../lib/rules/engine");
async function getPopulatedCheckout(checkoutId) {
    return checkout_1.default.findOne({ _id: checkoutId }).populate('lineItems.product');
}
async function getCheckout(root, args) {
    const data = await getPopulatedCheckout(args.checkoutId);
    if (!data)
        return null;
    const { _id, lineItems, creatorId } = data;
    return {
        id: _id.toString(),
        lineItems,
        creatorId,
    };
}
exports.getCheckout = getCheckout;
async function createCheckout(root, args) {
    const customer = await customer_1.default.findOne({ _id: args.customerId }).populate({
        path: 'checkout',
        model: 'Checkout',
        populate: [
            {
                path: 'lineItems.product',
                model: 'Product',
            },
        ],
    });
    if (!customer)
        throw Error('Customer id not found');
    if (customer.checkout)
        return customer.checkout;
    try {
        return checkout_1.default.create({ creatorId: customer._id });
    }
    catch (err) {
        throw Error('Failed to create checkout session');
    }
    return null;
}
exports.createCheckout = createCheckout;
async function updateCheckout(root, args) {
    const customer = await customer_1.default.findOne({ _id: args.customerId });
    if (!customer)
        throw Error('Customer id not found');
    try {
        await checkout_1.default.findOneAndUpdate({ _id: args.checkoutInput.id }, {
            lineItems: args.checkoutInput.lineItems.map(item => ({
                product: item.product.id,
                quantity: item.quantity,
            })),
        });
    }
    catch (err) {
        throw Error('Failed to update checkout session');
    }
    return getPopulatedCheckout(args.checkoutInput.id);
}
exports.updateCheckout = updateCheckout;
async function getTotal(root) {
    const checkout = root;
    const customer = await customer_1.default.findOne({ _id: checkout.creatorId });
    if (!customer) {
        throw Error('Customer id not found');
    }
    const rules = customer ? customer.priceRules.map(engine_1.createRule) : [];
    return root.lineItems ? engine_1.calculateFinalPrice(root.lineItems, rules) : 0;
}
exports.getTotal = getTotal;
exports.CheckoutResolverMap = {
    total: getTotal,
};
//# sourceMappingURL=Checkout.resolver.js.map