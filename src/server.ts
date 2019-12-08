import { DIContainer } from './di'
import * as Koa from 'koa'
import * as bodyParser from 'koa-bodyparser'
import { ApolloServer } from 'apollo-server-koa'

export default function(dic: DIContainer): Koa {
  const app = new Koa()
  app.use(bodyParser())

  const apolloServer = new ApolloServer({
    schema: dic.schema,
    introspection: true,
    cacheControl: { calculateHttpHeaders: true, stripFormattedExtensions: false },
  })

  apolloServer.applyMiddleware({ app })

  return app
}
