import { GraphQLResolveInfo } from 'graphql'
import { ProductParent } from '../lib/types'
export type Maybe<T> = T | null | undefined
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } &
  { [P in K]-?: NonNullable<T[P]> }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
}

export type Checkout = {
  __typename: 'Checkout'
  /** id of checkout */
  id: Scalars['ID']
  /** line items */
  lineItems: Array<LineItem>
  /** total cost for whole checkout */
  total: Scalars['Float']
}

export type CheckoutRequest = {
  /** checkout id */
  id: Scalars['ID']
  lineItems: Array<LineItemInput>
}

export type Classic = Product & {
  __typename: 'Classic'
  /** id */
  id: Scalars['ID']
  /** name */
  name: Scalars['String']
  /** price */
  price: Scalars['Float']
}

export type LineItem = {
  __typename: 'LineItem'
  /** product */
  product?: Maybe<Product>
  /** quantity */
  quantity: Scalars['Int']
}

export type LineItemInput = {
  /** product */
  product: ProductInput
  /** quantity */
  quantity: Scalars['Int']
}

export type Mutation = {
  __typename: 'Mutation'
  /** create new checkout session */
  createCheckout?: Maybe<Checkout>
  /** update checkout details */
  updateCheckout?: Maybe<Checkout>
}

export type MutationCreateCheckoutArgs = {
  customerId: Scalars['ID']
}

export type MutationUpdateCheckoutArgs = {
  customerId: Scalars['ID']
  checkoutInput: CheckoutRequest
}

export type Premium = Product & {
  __typename: 'Premium'
  /** id */
  id: Scalars['ID']
  /** name */
  name: Scalars['String']
  /** price */
  price: Scalars['Float']
}

export type Product = {
  /** id */
  id: Scalars['ID']
  /** name */
  name: Scalars['String']
  /** price */
  price: Scalars['Float']
}

export type ProductInput = {
  /** product id */
  id: Scalars['ID']
}

export type Query = {
  __typename: 'Query'
  checkout?: Maybe<Checkout>
  /** need */
  version?: Maybe<Scalars['String']>
}

export type QueryCheckoutArgs = {
  checkoutId: Scalars['ID']
}

export type StandOut = Product & {
  __typename: 'StandOut'
  /** id */
  id: Scalars['ID']
  /** name */
  name: Scalars['String']
  /** price */
  price: Scalars['Float']
}

export type ResolverTypeWrapper<T> = Promise<T> | T

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => Promise<TResult> | TResult

export type StitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>
}

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo,
) => Maybe<TTypes>

export type NextResolverFn<T> = () => Promise<T>

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Query: ResolverTypeWrapper<{}>
  ID: ResolverTypeWrapper<Partial<Scalars['ID']>>
  Checkout: ResolverTypeWrapper<Partial<Omit<Checkout, 'lineItems'> & { lineItems: Array<ResolversTypes['LineItem']> }>>
  LineItem: ResolverTypeWrapper<Partial<Omit<LineItem, 'product'> & { product?: Maybe<ResolversTypes['Product']> }>>
  Product: ResolverTypeWrapper<ProductParent>
  String: ResolverTypeWrapper<Partial<Scalars['String']>>
  Float: ResolverTypeWrapper<Partial<Scalars['Float']>>
  Int: ResolverTypeWrapper<Partial<Scalars['Int']>>
  Mutation: ResolverTypeWrapper<{}>
  CheckoutRequest: ResolverTypeWrapper<Partial<CheckoutRequest>>
  LineItemInput: ResolverTypeWrapper<Partial<LineItemInput>>
  ProductInput: ResolverTypeWrapper<Partial<ProductInput>>
  Boolean: ResolverTypeWrapper<Partial<Scalars['Boolean']>>
  Classic: ResolverTypeWrapper<Partial<Classic>>
  StandOut: ResolverTypeWrapper<Partial<StandOut>>
  Premium: ResolverTypeWrapper<Partial<Premium>>
}

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Query: {}
  ID: Partial<Scalars['ID']>
  Checkout: Partial<Omit<Checkout, 'lineItems'> & { lineItems: Array<ResolversParentTypes['LineItem']> }>
  LineItem: Partial<Omit<LineItem, 'product'> & { product?: Maybe<ResolversParentTypes['Product']> }>
  Product: ProductParent
  String: Partial<Scalars['String']>
  Float: Partial<Scalars['Float']>
  Int: Partial<Scalars['Int']>
  Mutation: {}
  CheckoutRequest: Partial<CheckoutRequest>
  LineItemInput: Partial<LineItemInput>
  ProductInput: Partial<ProductInput>
  Boolean: Partial<Scalars['Boolean']>
  Classic: Partial<Classic>
  StandOut: Partial<StandOut>
  Premium: Partial<Premium>
}

export type CheckoutResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Checkout'] = ResolversParentTypes['Checkout']
> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  lineItems?: Resolver<Array<ResolversTypes['LineItem']>, ParentType, ContextType>
  total?: Resolver<ResolversTypes['Float'], ParentType, ContextType>
}

export type ClassicResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Classic'] = ResolversParentTypes['Classic']
> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  price?: Resolver<ResolversTypes['Float'], ParentType, ContextType>
}

export type LineItemResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['LineItem'] = ResolversParentTypes['LineItem']
> = {
  product?: Resolver<Maybe<ResolversTypes['Product']>, ParentType, ContextType>
  quantity?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
}

export type MutationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']
> = {
  createCheckout?: Resolver<
    Maybe<ResolversTypes['Checkout']>,
    ParentType,
    ContextType,
    RequireFields<MutationCreateCheckoutArgs, 'customerId'>
  >
  updateCheckout?: Resolver<
    Maybe<ResolversTypes['Checkout']>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateCheckoutArgs, 'customerId' | 'checkoutInput'>
  >
}

export type PremiumResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Premium'] = ResolversParentTypes['Premium']
> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  price?: Resolver<ResolversTypes['Float'], ParentType, ContextType>
}

export type ProductResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Product'] = ResolversParentTypes['Product']
> = {
  __resolveType: TypeResolveFn<'Classic' | 'StandOut' | 'Premium', ParentType, ContextType>
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  price?: Resolver<ResolversTypes['Float'], ParentType, ContextType>
}

export type QueryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']
> = {
  checkout?: Resolver<
    Maybe<ResolversTypes['Checkout']>,
    ParentType,
    ContextType,
    RequireFields<QueryCheckoutArgs, 'checkoutId'>
  >
  version?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
}

export type StandOutResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['StandOut'] = ResolversParentTypes['StandOut']
> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  price?: Resolver<ResolversTypes['Float'], ParentType, ContextType>
}

export type Resolvers<ContextType = any> = {
  Checkout?: CheckoutResolvers<ContextType>
  Classic?: ClassicResolvers<ContextType>
  LineItem?: LineItemResolvers<ContextType>
  Mutation?: MutationResolvers<ContextType>
  Premium?: PremiumResolvers<ContextType>
  Product?: ProductResolvers
  Query?: QueryResolvers<ContextType>
  StandOut?: StandOutResolvers<ContextType>
}

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>
