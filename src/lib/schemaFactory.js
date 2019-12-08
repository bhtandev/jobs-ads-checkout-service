"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("util");
const fs = require("fs");
const graphql_tools_1 = require("graphql-tools");
async function readFile(path) {
    return (await util_1.promisify(fs.readFile)(path)).toString();
}
async function schemaFactory(schemaRoot, resolvers = {}, directives = {}) {
    return graphql_tools_1.makeExecutableSchema({
        typeDefs: await readFile(schemaRoot),
        resolvers,
        inheritResolversFromInterfaces: true,
        resolverValidationOptions: {
            allowResolversNotInSchema: false,
        },
    });
}
exports.default = schemaFactory;
//# sourceMappingURL=schemaFactory.js.map