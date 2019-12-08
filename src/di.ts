import { Config } from './config'

import Product, { ProductInterface } from './lib/models/product'
import Customer, { CustomerInterface } from './lib/models/customer'
import * as mongoose from 'mongoose'
import { Model } from 'mongoose'

import resolversMap from './resolversMap'
import schemaFactory from './lib/schemaFactory'
import * as path from 'path'
import { GraphQLSchema } from 'graphql'

import { MongoMemoryServer } from 'mongodb-memory-server'
import seed from '../test/seeder'

export interface Models {
  product: Model<ProductInterface>
  customer: Model<CustomerInterface>
}

export interface DIContainer {
  config: Config
  models: Models
  schema: GraphQLSchema
}

export default async function initDI(config: Config): Promise<DIContainer> {
  const dic = {
    models: {
      product: Product,
      customer: Customer,
    },
  }

  // use mongo memory server for simplicity
  const mongod = new MongoMemoryServer({
    instance: {
      ...config.mongo,
    },
  })

  const connectionString = await mongod.getConnectionString()

  // settings to fix all deprecation warnings
  await mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })

  // seed with fake data for demo
  await seed()

  const resolvers = resolversMap()
  const resolvedPath = await path.resolve(__dirname, './generated/schemas.graphql')
  const schema = await schemaFactory(resolvedPath, resolvers)

  return {
    ...dic,
    config,
    schema,
  }
}
