"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getXforYPrice(productQuantity, productPrice, x, y) {
    let calculatedPrice = 0;
    for (let i = 0; i < productQuantity; i++) {
        if ((i + 1) % x !== 0) {
            calculatedPrice = calculatedPrice + productPrice;
        }
    }
    return calculatedPrice;
}
exports.getXforYPrice = getXforYPrice;
//# sourceMappingURL=xForY.js.map