"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discount_1 = require("./discount");
const xForY_1 = require("./xForY");
class DiscountRule {
    constructor(label, entitled, discountType, discountValue) {
        this.label = label;
        this.entitled = entitled;
        this.discountType = discountType;
        this.discountValue = discountValue;
    }
}
exports.DiscountRule = DiscountRule;
class XforYRule {
    constructor(label, entitled, x, y) {
        this.label = label;
        this.entitled = entitled;
        this.x = x;
        this.y = y;
    }
}
exports.XforYRule = XforYRule;
// rule factory
function createRule(ruleData) {
    var _a, _b;
    if (ruleData.ruleType === 'discount') {
        const discountType = ruleData.discount.fixed ? discount_1.DiscountType.FIXED : discount_1.DiscountType.PERCENTAGE;
        const discountValue = (_b = (_a = ruleData.discount.fixed, (_a !== null && _a !== void 0 ? _a : ruleData.discount.percent)), (_b !== null && _b !== void 0 ? _b : 0));
        return new DiscountRule(ruleData.label, ruleData.entitledProduct, discountType, discountValue);
    }
    return new XforYRule(ruleData.label, ruleData.entitledProduct, ruleData.xForY.x, ruleData.xForY.y);
}
exports.createRule = createRule;
// Simple final price reducer
function calculateFinalPrice(lineItems, rules) {
    const total = lineItems.reduce((acc, item) => {
        const rule = rules.find(rule => rule.entitled === item.product.type);
        let newPrice = 0;
        if (rule instanceof DiscountRule) {
            newPrice = discount_1.getDiscountedPrice(item.quantity, item.product.price, rule.discountType, rule.discountValue);
        }
        if (rule instanceof XforYRule) {
            newPrice = xForY_1.getXforYPrice(item.quantity, item.product.price, rule.x, rule.y);
        }
        return acc + newPrice;
    }, 0);
    return total;
}
exports.calculateFinalPrice = calculateFinalPrice;
//# sourceMappingURL=engine.js.map