import { describe, it } from 'mocha'
import { expect } from 'chai'
import { LineItemInterface } from '../../models/checkout'

import { calculateFinalPrice } from '../engine'
import { ProductInterface, ProductType } from '../../models/product'
import { DiscountType, DiscountRule } from '../discount'
import { XforYRule } from '../xForY'

describe('Unit: Rule Engine', (): void => {
  it('calculates percentage discount correctly', () => {
    const productPrice = 25.4
    const lineItems: LineItemInterface[] = [
      {
        product: {
          price: productPrice,
          type: ProductType.PREMIUM,
        } as ProductInterface,
        quantity: 2,
      },
    ]

    const discountRule = new DiscountRule('20% discount on premium', ProductType.PREMIUM, DiscountType.PERCENTAGE, 20)

    const price = calculateFinalPrice(lineItems, [discountRule])
    expect(price).to.equals(40.64)
  })

  it('calculates percentage fixed correctly', () => {
    const productPrice = 25.4
    const lineItems: LineItemInterface[] = [
      {
        product: {
          price: productPrice,
          type: ProductType.PREMIUM,
        } as ProductInterface,
        quantity: 2,
      },
    ]

    const discountRule = new DiscountRule('20 fixed discount on premium', ProductType.PREMIUM, DiscountType.FIXED, 20)
    const price = calculateFinalPrice(lineItems, [discountRule])
    expect(price).to.equals(10.8)
  })

  it('calculates final price with percentage discount and xForY rules correctly', () => {
    const lineItems: LineItemInterface[] = [
      {
        product: {
          price: 25.4,
          type: ProductType.PREMIUM,
        } as ProductInterface,
        quantity: 2,
      },
      {
        product: {
          price: 100,
          type: ProductType.CLASSIC,
        } as ProductInterface,
        quantity: 5,
      },
    ]

    const discountRule = new DiscountRule('20% discount on premium', ProductType.PREMIUM, DiscountType.FIXED, 20)
    const xforYRule = new XforYRule('5 for 4 discount on classic', ProductType.CLASSIC, 5, 4)

    const price = calculateFinalPrice(lineItems, [discountRule, xforYRule])
    expect(price).to.equals(410.8)
  })

  it('calculates final price with min purchase discount and xForY rules correctly', () => {
    const lineItems: LineItemInterface[] = [
      {
        product: {
          price: 25.4,
          type: ProductType.PREMIUM,
        } as ProductInterface,
        quantity: 200,
      },
      {
        product: {
          price: 100,
          type: ProductType.CLASSIC,
        } as ProductInterface,
        quantity: 5,
      },
    ]

    const discountRule = new DiscountRule('min 50', ProductType.PREMIUM, DiscountType.MIN_PURCHASED, 15, 50)
    const xforYRule = new XforYRule('5 for 4 discount on classic', ProductType.CLASSIC, 5, 4)

    const price = calculateFinalPrice(lineItems, [discountRule, xforYRule])
    expect(price).to.equals(3400)
  })
})
