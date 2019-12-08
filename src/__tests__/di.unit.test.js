"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mocha_1 = require("mocha");
const chai_1 = require("chai");
const config_1 = require("../config");
const di_1 = require("../di");
mocha_1.describe('Unit: DI', () => {
    mocha_1.it('should return initiated di', async () => {
        const dic = await di_1.default(config_1.default);
        chai_1.expect(dic.config).to.equal(config_1.default);
    });
});
//# sourceMappingURL=di.unit.test.js.map