import initDI, { DIContainer } from './di'
import config from './config'
import { ApolloServer } from 'apollo-server-koa'
import Server from './server'
import * as mongoose from 'mongoose'

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
mongoose.Promise = global.Promise

initDI(config).then((dic: DIContainer): void => {
  const app = Server(dic)

  const server = new ApolloServer({
    schema: dic.schema,
  })

  server.applyMiddleware({ app })

  const port = dic.config.app.port

  app.listen({ port }, () => {
    console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`)
  })
})
