"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pkg = require("../../package.json");
const config = {
    stage: 'development',
    app: {
        host: '0.0.0.0',
        port: 9087,
        name: pkg.name,
        debug: false,
    },
    mongo: {
        port: 41934,
        dbName: 'seek_db1',
    },
};
exports.default = config;
//# sourceMappingURL=index.js.map