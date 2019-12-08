import { describe, it } from 'mocha'
import { expect } from 'chai'

import { DiscountType, getDiscountedPrice } from '../discount'

describe('Unit: Discount', (): void => {
  it('getDiscountedPrice by percent', () => {
    const productPrice = 2.5
    const price = getDiscountedPrice(5, productPrice, DiscountType.PERCENTAGE, 20)
    expect(price).to.equals(10)
  })

  it('getDiscountedPrice by fixed', () => {
    const productPrice = 100
    const price = getDiscountedPrice(2, productPrice, DiscountType.FIXED, 20)
    expect(price).to.equals(160)
  })
})
