"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const mocha_1 = require("mocha");
const Product_resolver_1 = require("../Product.resolver");
const product_1 = require("../../../lib/models/product");
describe('Unit: Product Resolvers', () => {
    mocha_1.it('resolveType correctly', () => {
        chai_1.expect(Product_resolver_1.resolveType({
            name: 'a',
            price: 10,
            type: product_1.ProductType.CLASSIC,
        })).to.equals('Classic');
        chai_1.expect(Product_resolver_1.resolveType({
            name: 'b',
            price: 10,
            type: product_1.ProductType.STANDOUT,
        })).to.equals('StandOut');
        chai_1.expect(Product_resolver_1.resolveType({
            name: 'c',
            price: 10,
            type: product_1.ProductType.PREMIUM,
        })).to.equals('Premium');
    });
});
//# sourceMappingURL=Product.unit.test.js.map