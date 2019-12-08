export function getXforYPrice(productQuantity: number, productPrice: number, x: number, y: number) {
  let calculatedPrice = 0
  for (let i = 0; i < productQuantity; i++) {
    if ((i + 1) % x !== 0) {
      calculatedPrice = calculatedPrice + productPrice
    }
  }
  return calculatedPrice
}
