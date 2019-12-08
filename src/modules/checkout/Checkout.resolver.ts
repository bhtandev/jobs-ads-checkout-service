import checkoutModel, { CheckoutInterface, LineItemInterface } from '../../lib/models/checkout'
import customerModel from '../../lib/models/customer'

import {
  CheckoutResolvers,
  MutationCreateCheckoutArgs,
  MutationUpdateCheckoutArgs,
  QueryCheckoutArgs,
  ResolversParentTypes,
} from '../../generated/graphql'
import { calculateFinalPrice, createRule, Rule } from '../../lib/rules/engine'

async function getPopulatedCheckout(checkoutId: string) {
  return checkoutModel.findOne({ _id: checkoutId }).populate('lineItems.product')
}

export async function getCheckout(root: ResolversParentTypes['Query'], args: QueryCheckoutArgs) {
  const data = await getPopulatedCheckout(args.checkoutId)

  if (!data) return null

  const { _id, lineItems, creatorId } = data

  return {
    id: _id.toString(),
    lineItems,
    creatorId,
  }
}

export async function createCheckout(root: ResolversParentTypes['Mutation'], args: MutationCreateCheckoutArgs) {
  const customer = await customerModel.findOne({ _id: args.customerId }).populate({
    path: 'checkout',
    model: 'Checkout',
    populate: [
      {
        path: 'lineItems.product',
        model: 'Product',
      },
    ],
  })

  if (!customer) throw Error('Customer id not found')

  if (customer.checkout) return customer.checkout

  try {
    return checkoutModel.create({ creatorId: customer._id })
  } catch (err) {
    throw Error('Failed to create checkout session')
  }

  return null
}

export async function updateCheckout(root: ResolversParentTypes['Mutation'], args: MutationUpdateCheckoutArgs) {
  const customer = await customerModel.findOne({ _id: args.customerId })

  if (!customer) throw Error('Customer id not found')

  try {
    await checkoutModel.findOneAndUpdate(
      { _id: args.checkoutInput.id },
      {
        lineItems: args.checkoutInput.lineItems.map(item => ({
          product: item.product.id,
          quantity: item.quantity,
        })),
      },
    )
  } catch (err) {
    throw Error('Failed to update checkout session')
  }

  return getPopulatedCheckout(args.checkoutInput.id)
}

export async function getTotal(root: ResolversParentTypes['Checkout']) {
  const checkout = root as CheckoutInterface

  const customer = await customerModel.findOne({ _id: checkout.creatorId })
  if (!customer) {
    throw Error('Customer id not found')
  }

  const rules: Rule[] = customer ? customer.priceRules.map(createRule) : []

  return root.lineItems ? calculateFinalPrice(root.lineItems as LineItemInterface[], rules) : 0
}

export const CheckoutResolverMap: CheckoutResolvers = {
  total: getTotal,
}
