import { ProductType } from '../models/product'
import { Rule } from './engine'

export enum DiscountType {
  PERCENTAGE = 'percentage',
  FIXED = 'fixed',
  MIN_PURCHASED = 'minPurchased',
}

export class DiscountRule implements Rule {
  priority: number
  entitled: ProductType
  discountType: DiscountType
  discountValue: number
  minPurchased: number
  label: string

  constructor(
    label: string,
    entitled: ProductType,
    discountType: DiscountType,
    discountValue: number,
    minPurchased?: number,
  ) {
    this.label = label
    this.entitled = entitled
    this.discountType = discountType
    this.discountValue = discountValue
    this.minPurchased = minPurchased || 0
  }

  calculatePrice(quantity: number, price: number): number {
    let newPrice = price
    switch (this.discountType) {
      case DiscountType.FIXED:
        newPrice = price - this.discountValue
        break
      case DiscountType.PERCENTAGE:
        newPrice = (price * (100 - this.discountValue)) / 100
        break
      case DiscountType.MIN_PURCHASED:
        if (this.minPurchased && quantity >= this.minPurchased) {
          newPrice = this.discountValue
        }
        break
    }

    // round to 2 decimals
    return newPrice > 0 ? Math.round(quantity * newPrice * 100) / 100 : 0
  }
}
