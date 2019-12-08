import { describe, it } from 'mocha'
import { expect } from 'chai'

import { getXforYPrice } from '../xForY'

describe('Unit: xForY', (): void => {
  it('5 for 4 returns 4 * price when quantity is 5', () => {
    const productPrice = 2.5
    const x = 5
    const y = 4
    const price = getXforYPrice(5, productPrice, x, y)
    expect(price).to.equals(y * productPrice)
  })

  it('3 for 2 returns 4 * price when quantity is 5', () => {
    const productPrice = 2.5
    const x = 3
    const y = 2
    const price = getXforYPrice(5, productPrice, x, y)

    expect(price).to.equals(10)
  })

  it('3 for 2 returns 2 * price when quantity is 2', () => {
    const productPrice = 2.5
    const x = 3
    const y = 2
    const price = getXforYPrice(2, productPrice, x, y)

    expect(price).to.equals(5)
  })
})
