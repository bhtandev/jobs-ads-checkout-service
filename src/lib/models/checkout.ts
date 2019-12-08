import * as mongoose from 'mongoose'
import { Schema, Document } from 'mongoose'
import { ProductInterface } from './product'

export interface LineItemInterface {
  product: ProductInterface
  quantity: number
}

export interface CheckoutInterface extends Document {
  creatorId: string
  lineItems: Array<LineItemInterface>
  dateAdded: string
}

const CheckoutSchema: Schema = new Schema({
  creatorId: { type: Schema.Types.ObjectId, ref: 'Customer' },
  lineItems: [
    {
      product: { type: Schema.Types.ObjectId, ref: 'Product' },
      quantity: { type: Number, required: true },
    },
  ],
  dateAdded: { type: Date, default: Date.now, required: true },
  dateUpdated: { type: Date, default: Date.now, required: true },
})

// create strongly typed mongoose models with TypeScript
export default mongoose.model<CheckoutInterface>('Checkout', CheckoutSchema)
