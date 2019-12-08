"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = require("./lib/models/product");
const customer_1 = require("./lib/models/customer");
const mongoose = require("mongoose");
const resolversMap_1 = require("./resolversMap");
const schemaFactory_1 = require("./lib/schemaFactory");
const path = require("path");
const mongodb_memory_server_1 = require("mongodb-memory-server");
const seeder_1 = require("../test/seeder");
async function initDI(config) {
    const dic = {
        models: {
            product: product_1.default,
            customer: customer_1.default,
        },
    };
    // use mongo memory server for simplicity
    const mongod = new mongodb_memory_server_1.MongoMemoryServer({
        instance: {
            ...config.mongo,
        },
    });
    const connectionString = await mongod.getConnectionString();
    // settings to fix all deprecation warnings
    await mongoose.connect(connectionString, {
        useNewUrlParser: true,
        useFindAndModify: false,
        useCreateIndex: true,
        useUnifiedTopology: true,
    });
    // seed with fake data for demo
    await seeder_1.default();
    const resolvers = resolversMap_1.default();
    const resolvedPath = await path.resolve(__dirname, './generated/schemas.graphql');
    const schema = await schemaFactory_1.default(resolvedPath, resolvers);
    return {
        ...dic,
        config,
        schema,
    };
}
exports.default = initDI;
//# sourceMappingURL=di.js.map