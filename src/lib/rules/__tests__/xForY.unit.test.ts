import { describe, it } from 'mocha'
import { expect } from 'chai'

import { XforYRule } from '../xForY'
import { ProductType } from '../../models/product'

describe('Unit: xForY', (): void => {
  it('5 for 4 returns 4 * price when quantity is 5', () => {
    const productPrice = 2.5
    const x = 5
    const y = 4
    const rule = new XforYRule('bla', ProductType.CLASSIC, x, y)
    const price = rule.calculatePrice(5, productPrice)
    expect(price).to.equals(y * productPrice)
  })

  it('3 for 2 returns 4 * price when quantity is 5', () => {
    const productPrice = 2.5
    const x = 3
    const y = 2
    const rule = new XforYRule('bla', ProductType.CLASSIC, x, y)

    const price = rule.calculatePrice(5, productPrice)

    expect(price).to.equals(10)
  })

  it('3 for 2 returns 2 * price when quantity is 2', () => {
    const productPrice = 2.5
    const x = 3
    const y = 2
    const rule = new XforYRule('bla', ProductType.CLASSIC, x, y)

    const price = rule.calculatePrice(2, productPrice)

    expect(price).to.equals(5)
  })
})
