import { Maybe, ProductResolvers } from '../../generated/graphql'
import { ProductType } from '../../lib/models/product'
import { ProductParent } from '../../lib/types'

export function resolveType(root: ProductParent): Maybe<'Classic' | 'StandOut' | 'Premium'> {
  switch (root.type) {
    case ProductType.CLASSIC:
      return 'Classic'
    case ProductType.STANDOUT:
      return 'StandOut'
    case ProductType.PREMIUM:
      return 'Premium'
  }

  return undefined
}

export const ProductResolverMap: ProductResolvers = {
  __resolveType: resolveType,
}
