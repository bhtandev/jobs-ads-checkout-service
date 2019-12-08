import * as mongoose from 'mongoose'
import { Schema, Document } from 'mongoose'

export enum ProductType {
  CLASSIC = 'Classic',
  STANDOUT = 'StandOut',
  PREMIUM = 'Premium',
}

export interface ProductInterface extends Document {
  name: string
  type: ProductType
  price: number
}

const ProductSchema: Schema = new Schema({
  name: { type: String, required: true, unique: true },
  type: { type: String, required: true },
  price: { type: Number, required: true },
  dateAdded: { type: Date, default: Date.now, required: true },
  dateUpdated: { type: Date, default: Date.now, required: true },
})

// create strongly typed mongoose models with TypeScript
export default mongoose.model<ProductInterface>('Product', ProductSchema)
