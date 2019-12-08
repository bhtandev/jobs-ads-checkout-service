"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const apollo_server_koa_1 = require("apollo-server-koa");
function default_1(dic) {
    const app = new Koa();
    app.use(bodyParser());
    const apolloServer = new apollo_server_koa_1.ApolloServer({
        schema: dic.schema,
        introspection: true,
        cacheControl: { calculateHttpHeaders: true, stripFormattedExtensions: false },
    });
    apolloServer.applyMiddleware({ app });
    return app;
}
exports.default = default_1;
//# sourceMappingURL=server.js.map