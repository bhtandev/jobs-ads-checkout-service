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

  it('getDiscountedPrice by min purchased is met', () => {
    const productPrice = 100
    const newPrice = 379.99
    const minPurchased = 4
    const price = getDiscountedPrice(4, productPrice, DiscountType.MIN_PURCHASED, newPrice, minPurchased)
    expect(price).to.equals(379.99 * 4)
  })

  it('getDiscountedPrice by min purchased is not met', () => {
    const productPrice = 100
    const newPrice = 379.99
    const minPurchased = 4
    const price = getDiscountedPrice(2, productPrice, DiscountType.MIN_PURCHASED, newPrice, minPurchased)
    expect(price).to.equals(productPrice * 2)
  })
})
