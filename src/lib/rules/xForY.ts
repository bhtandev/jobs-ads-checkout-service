import { ProductType } from '../models/product'
import { Rule } from './engine'

export class XforYRule implements Rule {
  priority: number
  entitled: ProductType
  label: string
  x: number
  y: number

  constructor(label: string, entitled: ProductType, x: number, y: number) {
    this.label = label
    this.entitled = entitled
    this.x = x
    this.y = y
  }

  calculatePrice(quantity: number, price: number): number {
    let calculatedPrice = 0
    for (let i = 0; i < quantity; i++) {
      if ((i + 1) % this.x !== 0) {
        calculatedPrice = calculatedPrice + price
      }
    }
    return calculatedPrice
  }
}
