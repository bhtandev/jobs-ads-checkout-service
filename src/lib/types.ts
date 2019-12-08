import { Scalars } from '../generated/graphql'
import { ProductType } from './models/product'

// overwrite generated in src/generated/graphql.ts.
// data source may not be exactly identical to GraphQL Schema.
// e.g _id vs id or data source contains more fields.
interface ProductParentExtended {
  name: Scalars['String']
  price: Scalars['Float']

  // not part of Graphql schema
  type: ProductType
}

export type ProductParent = ProductParentExtended
