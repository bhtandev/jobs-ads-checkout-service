import { expect } from 'chai'
import { it } from 'mocha'

import { resolveType } from '../Product.resolver'
import { ProductType } from '../../../lib/models/product'

describe('Unit: Product Resolvers', () => {
  it('resolveType correctly', () => {
    expect(
      resolveType({
        name: 'a',
        price: 10,
        type: ProductType.CLASSIC,
      }),
    ).to.equals('Classic')

    expect(
      resolveType({
        name: 'b',
        price: 10,
        type: ProductType.STANDOUT,
      }),
    ).to.equals('StandOut')

    expect(
      resolveType({
        name: 'c',
        price: 10,
        type: ProductType.PREMIUM,
      }),
    ).to.equals('Premium')
  })
})
