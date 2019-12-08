"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mocha_1 = require("mocha");
const chai_1 = require("chai");
const engine_1 = require("../engine");
const product_1 = require("../../models/product");
const discount_1 = require("../discount");
mocha_1.describe('Unit: Rule Engine', () => {
    mocha_1.it('calculates percentage discount correctly', () => {
        const productPrice = 25.4;
        const lineItems = [
            {
                product: {
                    price: productPrice,
                    type: product_1.ProductType.PREMIUM,
                },
                quantity: 2,
            },
        ];
        const discountRule = new engine_1.DiscountRule('20% discount on premium', product_1.ProductType.PREMIUM, discount_1.DiscountType.PERCENTAGE, 20);
        const price = engine_1.calculateFinalPrice(lineItems, [discountRule]);
        chai_1.expect(price).to.equals(40.64);
    });
    mocha_1.it('calculates percentage fixed correctly', () => {
        const productPrice = 25.4;
        const lineItems = [
            {
                product: {
                    price: productPrice,
                    type: product_1.ProductType.PREMIUM,
                },
                quantity: 2,
            },
        ];
        const discountRule = new engine_1.DiscountRule('20 fixed discount on premium', product_1.ProductType.PREMIUM, discount_1.DiscountType.FIXED, 20);
        const price = engine_1.calculateFinalPrice(lineItems, [discountRule]);
        chai_1.expect(price).to.equals(10.8);
    });
    mocha_1.it('calculates final price with discount and xForY rules correctly', () => {
        const lineItems = [
            {
                product: {
                    price: 25.4,
                    type: product_1.ProductType.PREMIUM,
                },
                quantity: 2,
            },
            {
                product: {
                    price: 100,
                    type: product_1.ProductType.CLASSIC,
                },
                quantity: 5,
            },
        ];
        const discountRule = new engine_1.DiscountRule('20% discount on premium', product_1.ProductType.PREMIUM, discount_1.DiscountType.FIXED, 20);
        const xforYRule = new engine_1.XforYRule('5 for 4 discount on classic', product_1.ProductType.CLASSIC, 5, 4);
        const price = engine_1.calculateFinalPrice(lineItems, [discountRule, xforYRule]);
        chai_1.expect(price).to.equals(410.8);
    });
});
//# sourceMappingURL=engine.unit.test.js.map