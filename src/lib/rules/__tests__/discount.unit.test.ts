import { describe, it } from 'mocha'
import { expect } from 'chai'

import { DiscountRule, DiscountType } from '../discount'
import { ProductType } from '../../models/product'

describe('Unit: Discount', (): void => {
  it('getDiscountedPrice by percent', () => {
    const productPrice = 2.5

    const rule = new DiscountRule('bla', ProductType.CLASSIC, DiscountType.PERCENTAGE, 20)

    const price = rule.calculatePrice(5, productPrice)
    expect(price).to.equals(10)
  })

  it('getDiscountedPrice by fixed', () => {
    const productPrice = 100
    const rule = new DiscountRule('bla', ProductType.CLASSIC, DiscountType.FIXED, 20)

    const price = rule.calculatePrice(2, productPrice)
    expect(price).to.equals(160)
  })

  it('getDiscountedPrice by min purchased is met', () => {
    const productPrice = 100
    const newPrice = 379.99
    const minPurchased = 4
    const rule = new DiscountRule('bla', ProductType.CLASSIC, DiscountType.MIN_PURCHASED, newPrice, minPurchased)

    const price = rule.calculatePrice(4, productPrice)
    expect(price).to.equals(379.99 * 4)
  })

  it('getDiscountedPrice by min purchased is not met', () => {
    const productPrice = 100
    const newPrice = 379.99
    const minPurchased = 4
    const rule = new DiscountRule('bla', ProductType.CLASSIC, DiscountType.MIN_PURCHASED, newPrice, minPurchased)

    const price = rule.calculatePrice(2, productPrice)
    expect(price).to.equals(productPrice * 2)
  })
})
