import { Resolvers, QueryResolvers, MutationResolvers } from './generated/graphql'

import * as checkout from './modules/checkout'
import * as product from './modules/product'

export default function resolversMap(): Resolvers {
  const Query: QueryResolvers = {
    checkout: checkout.getCheckout,
    version: () => '1.0.0',
  }

  const Mutation: MutationResolvers = {
    createCheckout: checkout.createCheckout,
    updateCheckout: checkout.updateCheckout,
  }

  const resolversMap: Resolvers = {
    Query,
    Mutation,
    Checkout: checkout.CheckoutResolverMap,
    Product: product.ProductResolverMap,
  }

  return resolversMap
}
