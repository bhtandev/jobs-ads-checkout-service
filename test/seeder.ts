import { products, customers, checkouts } from './seed'
import Product, { ProductInterface } from '../src/lib/models/product'
import Customer, { CustomerInterface } from '../src/lib/models/customer'
import Checkout, { CheckoutInterface } from '../src/lib/models/checkout'

export default async function seed() {
  console.log('Seeding data...')
  const customerCreatePromises = customers.map(data => Customer.create(data))
  const productCreatePromises = products.map(data => Product.create(data))
  const checkoutCreatePromises = checkouts.map(data => Checkout.create(data))

  type SeedDataType = CustomerInterface | ProductInterface | CheckoutInterface
  const combined: Array<Promise<SeedDataType>> = [
    ...customerCreatePromises,
    ...productCreatePromises,
    ...checkoutCreatePromises,
  ]

  return Promise.all(combined)
}
