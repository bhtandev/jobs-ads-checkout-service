import { LineItemInterface } from '../models/checkout'
import { DiscountType, getDiscountedPrice } from './discount'
import { ProductType } from '../models/product'
import { getXforYPrice } from './xForY'
import { RuleInterface } from '../models/customer'

export interface Rule {
  priority: number
  entitled: ProductType
  label: string
}

export class DiscountRule implements Rule {
  priority: number
  entitled: ProductType
  discountType: DiscountType
  discountValue: number
  label: string

  constructor(label: string, entitled: ProductType, discountType: DiscountType, discountValue: number) {
    this.label = label
    this.entitled = entitled
    this.discountType = discountType
    this.discountValue = discountValue
  }
}

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
}

// rule factory
export function createRule(ruleData: RuleInterface): Rule {
  if (ruleData.ruleType === 'discount') {
    const discountType = ruleData.discount.fixed ? DiscountType.FIXED : DiscountType.PERCENTAGE
    const discountValue = ruleData.discount.fixed ?? ruleData.discount.percent ?? 0
    return new DiscountRule(ruleData.label, ruleData.entitledProduct, discountType, discountValue)
  }

  return new XforYRule(ruleData.label, ruleData.entitledProduct, ruleData.xForY.x, ruleData.xForY.y)
}

// Simple final price reducer
export function calculateFinalPrice(lineItems: LineItemInterface[], rules: Rule[]) {
  const total = lineItems.reduce((acc, item) => {
    const rule = rules.find(rule => rule.entitled === item.product.type)

    let newPrice = 0
    if (rule instanceof DiscountRule) {
      newPrice = getDiscountedPrice(item.quantity, item.product.price, rule.discountType, rule.discountValue)
    }

    if (rule instanceof XforYRule) {
      newPrice = getXforYPrice(item.quantity, item.product.price, rule.x, rule.y)
    }

    return acc + newPrice
  }, 0)

  return total
}
