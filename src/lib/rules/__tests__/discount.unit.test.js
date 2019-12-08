"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mocha_1 = require("mocha");
const chai_1 = require("chai");
const discount_1 = require("../discount");
mocha_1.describe('Unit: Discount', () => {
    mocha_1.it('getDiscountedPrice by percent', () => {
        const productPrice = 2.5;
        const price = discount_1.getDiscountedPrice(5, productPrice, discount_1.DiscountType.PERCENTAGE, 20);
        chai_1.expect(price).to.equals(10);
    });
    mocha_1.it('getDiscountedPrice by fixed', () => {
        const productPrice = 100;
        const price = discount_1.getDiscountedPrice(2, productPrice, discount_1.DiscountType.FIXED, 20);
        chai_1.expect(price).to.equals(160);
    });
});
//# sourceMappingURL=discount.unit.test.js.map