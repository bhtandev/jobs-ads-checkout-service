"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = require("./di");
const config_1 = require("./config");
const apollo_server_koa_1 = require("apollo-server-koa");
const server_1 = require("./server");
const mongoose = require("mongoose");
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
mongoose.Promise = global.Promise;
di_1.default(config_1.default).then((dic) => {
    const app = server_1.default(dic);
    const server = new apollo_server_koa_1.ApolloServer({
        schema: dic.schema,
    });
    server.applyMiddleware({ app });
    const port = dic.config.app.port;
    app.listen({ port }, () => {
        console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`);
    });
});
//# sourceMappingURL=start.js.map