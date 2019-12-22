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

const discountTypes = [
  {
    test: (ruleData: RuleInterface) => ruleData.discount.fixed,
    rule: DiscountType.FIXED,
    getValue: (ruleData: RuleInterface) => {
      return ruleData.discount.fixed
    },
  },
  {
    test: (ruleData: RuleInterface) => ruleData.discount.percent,
    rule: DiscountType.PERCENTAGE,
    getValue: (ruleData: RuleInterface) => {
      return ruleData.discount.percent
    },
  },
  {
    test: (ruleData: RuleInterface) => ruleData.discount.minPurchased,
    rule: DiscountType.MIN_PURCHASED,
    getValue: (ruleData: RuleInterface) => {
      return ruleData.discount.minPurchased
    },
  },
]

// rule factory
export function createRule(ruleData: RuleInterface): Rule {
  if (ruleData.ruleType === 'discount') {
    const discountType = discountTypes.find(item => item.test(ruleData)) || {
      rule: DiscountType.FIXED,
      getValue: (ruleData: RuleInterface) => 0,
    }

    const { getValue, rule } = discountType

    return new DiscountRule(
      ruleData.label,
      ruleData.entitledProduct,
      rule,
      getValue(ruleData) || 0,
      ruleData.discount.minPurchasedNewPrice || 0,
    )
  }

  return new XforYRule(ruleData.label, ruleData.entitledProduct, ruleData.xForY.x, ruleData.xForY.y)
}

// Simple final price reducer
export function calculateFinalPrice(lineItems: LineItemInterface[], rules: Rule[]) {
  const total = lineItems.reduce((acc, item) => {
    const rule = rules.find(rule => rule.entitled === item.product.type)

    let newPrice = 0
    if (rule instanceof DiscountRule) {
      newPrice = getDiscountedPrice(
        item.quantity,
        item.product.price,
        rule.discountType,
        rule.discountValue,
        rule.minPurchased,
      )
    }

    if (rule instanceof XforYRule) {
      newPrice = getXforYPrice(item.quantity, item.product.price, rule.x, rule.y)
    }

    return acc + newPrice
  }, 0)

  return total
}
