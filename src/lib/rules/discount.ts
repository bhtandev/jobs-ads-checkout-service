export enum DiscountType {
  PERCENTAGE = 'percentage',
  FIXED = 'fixed',
}

export function getDiscountedPrice(quantity: number, price: number, type: DiscountType, discountValue: number) {
  let newPrice = price
  switch (type) {
    case DiscountType.FIXED:
      newPrice = price - discountValue
      break
    case DiscountType.PERCENTAGE:
      newPrice = (price * (100 - discountValue)) / 100
      break
  }

  // round to 2 decimals
  return newPrice > 0 ? Math.round(quantity * newPrice * 100) / 100 : 0
}
