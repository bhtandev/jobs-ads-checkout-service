import * as mongoose from 'mongoose'
import { Schema, Document } from 'mongoose'

import { CheckoutInterface } from './checkout'
import { ProductType } from './product'

export interface RuleInterface {
  ruleType: string
  entitledProduct: ProductType
  label: string
  xForY: {
    x: number
    y: number
  }
  discount: {
    percent?: number
    fixed?: number
  }
}

export interface CustomerInterface extends Document {
  name: string
  checkout: CheckoutInterface
  priceRules: RuleInterface[]
}

const CustomerSchema: Schema = new Schema({
  _id: Schema.Types.ObjectId,
  name: { type: String, required: true, unique: true },
  checkout: { type: Schema.Types.ObjectId, ref: 'Checkout' },
  priceRules: {
    type: [
      {
        entitledProduct: { type: String, required: true },
        label: { type: String, required: true },
        ruleType: { type: String, required: true },
        xForY: {
          // xForY special
          x: { type: Number },
          y: { type: Number },
        },
        discount: {
          // discount by fixed amount or percent deal
          percent: { type: Number },
          fixed: { type: Number },
        },
      },
    ],
    required: true,
  },
  dateAdded: { type: Date, default: Date.now, required: true },
  dateUpdated: { type: Date, default: Date.now, required: true },
})

// create strongly typed mongoose models with TypeScript
export default mongoose.model<CustomerInterface>('Customer', CustomerSchema)
