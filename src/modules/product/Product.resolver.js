"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = require("../../lib/models/product");
function resolveType(root) {
    switch (root.type) {
        case product_1.ProductType.CLASSIC:
            return 'Classic';
        case product_1.ProductType.STANDOUT:
            return 'StandOut';
        case product_1.ProductType.PREMIUM:
            return 'Premium';
    }
    return undefined;
}
exports.resolveType = resolveType;
exports.ProductResolverMap = {
    __resolveType: resolveType,
};
//# sourceMappingURL=Product.resolver.js.map