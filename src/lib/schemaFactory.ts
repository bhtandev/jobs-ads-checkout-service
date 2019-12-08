import { promisify } from 'util'
import * as fs from 'fs'
import { makeExecutableSchema } from 'graphql-tools'
import { GraphQLSchema } from 'graphql'

async function readFile(path: string | number | Buffer | import('url').URL) {
  return (await promisify(fs.readFile)(path)).toString()
}

export default async function schemaFactory(
  schemaRoot: string,
  resolvers = {},
  directives = {},
): Promise<GraphQLSchema> {
  return makeExecutableSchema({
    typeDefs: await readFile(schemaRoot),
    resolvers,
    inheritResolversFromInterfaces: true,
    resolverValidationOptions: {
      allowResolversNotInSchema: false,
    },
  })
}
