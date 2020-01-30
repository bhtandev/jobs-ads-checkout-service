import { LineItemInterface } from '../models/checkout'
import { DiscountType, DiscountRule } from './discount'
import { XforYRule } from './xForY'
import { ProductType } from '../models/product'
import { RuleInterface } from '../models/customer'

export interface Rule {
  priority: number
  entitled: ProductType
  label: string

  calculatePrice(quantity: number, price: number): number
}

const discountTypes = [
  {
    test: (ruleData: RuleInterface): boolean => ruleData.discount.fixed !== undefined,
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
    const discountType = discountTypes.find(item => item.test(ruleData))

    if (discountType === undefined) {
      throw new Error('Discount type is unknown!')
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

    if (rule) {
      newPrice = rule.calculatePrice(item.quantity, item.product.price)
    }

    return acc + newPrice
  }, 0)

  return total
}
