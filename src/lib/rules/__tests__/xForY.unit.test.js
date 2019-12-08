"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mocha_1 = require("mocha");
const chai_1 = require("chai");
const xForY_1 = require("../xForY");
mocha_1.describe('Unit: xForY', () => {
    mocha_1.it('5 for 4 returns 4 * price when quantity is 5', () => {
        const productPrice = 2.5;
        const x = 5;
        const y = 4;
        const price = xForY_1.getXforYPrice(5, productPrice, x, y);
        chai_1.expect(price).to.equals(y * productPrice);
    });
    mocha_1.it('3 for 2 returns 4 * price when quantity is 5', () => {
        const productPrice = 2.5;
        const x = 3;
        const y = 2;
        const price = xForY_1.getXforYPrice(5, productPrice, x, y);
        chai_1.expect(price).to.equals(10);
    });
    mocha_1.it('3 for 2 returns 2 * price when quantity is 2', () => {
        const productPrice = 2.5;
        const x = 3;
        const y = 2;
        const price = xForY_1.getXforYPrice(2, productPrice, x, y);
        chai_1.expect(price).to.equals(5);
    });
});
//# sourceMappingURL=xForY.unit.test.js.map