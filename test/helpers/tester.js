"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const supertest = require("supertest");
const di_1 = require("../../src/di");
const config_1 = require("../../src/config");
const server_1 = require("../../src/server");
let clientInstance = null;
async function createAgent(customConfig) {
    const di = await di_1.default(customConfig || config_1.default);
    const app = await server_1.default(di);
    return supertest(app.callback());
}
exports.createAgent = createAgent;
function query(queryFilePath, variables = {}) {
    return JSON.stringify({ query: queryFilePath, variables: variables });
}
async function createClient(customConfig) {
    const agent = await createAgent(customConfig);
    return async function performQuery(queryFilePath, variables = {}) {
        const instance = agent.post('/graphql').type('application/json');
        for (const key in variables) {
            variables[key] = await variables[key];
        }
        const call = () => instance.send(query(queryFilePath, variables)).then((res) => ({
            ...res.body,
            status: res.status,
            headers: res.headers,
        }));
        return await call();
    };
}
exports.createClient = createClient;
// test helper for calling graphql queries
async function test(query, variables, customHeaders) {
    clientInstance = clientInstance || createClient();
    return (await clientInstance)(query, variables, customHeaders);
}
exports.test = test;
//# sourceMappingURL=tester.js.map