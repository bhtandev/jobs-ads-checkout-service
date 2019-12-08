"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DiscountType;
(function (DiscountType) {
    DiscountType["PERCENTAGE"] = "percentage";
    DiscountType["FIXED"] = "fixed";
})(DiscountType = exports.DiscountType || (exports.DiscountType = {}));
function getDiscountedPrice(quantity, price, type, discountValue) {
    let newPrice = price;
    switch (type) {
        case DiscountType.FIXED:
            newPrice = price - discountValue;
            break;
        case DiscountType.PERCENTAGE:
            newPrice = (price * (100 - discountValue)) / 100;
            break;
    }
    // round to 2 decimals
    return newPrice > 0 ? Math.round(quantity * newPrice * 100) / 100 : 0;
}
exports.getDiscountedPrice = getDiscountedPrice;
//# sourceMappingURL=discount.js.map