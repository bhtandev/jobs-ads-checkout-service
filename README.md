# Job Ads Checkout Service

- [Features](#features)
- [Setup](#setup)
- [Architecture](#architecture)
- [Error Handling](#error-handling)
- [Testing](#testing)
- [Future Improvements](#future-improvements)
- [GraphQL Endpoints](#graphql-endpoints)
- [Examples](#usage-examples)

## Features
 - service for customers to create and update checkouts with total price
 - customers may special privileges for the different available products eg, 20% discount, pay 5 for 4
 - service will calculate total prices accordingly using the special price rules if available
 - ** Assumption: one rule per product. Multiple rules cannot stack on a product.

## Setup

### Dependencies
- Node 12.8.1

### Getting started

1. `git clone git@github.com:bhtandev/job-ads-checkout && cd job-ads-checkout` clone repository
2. `nvm install v12.8.1` install and use right version of node
3. `npm install` install dependencies
5. `npm run start` start job-ads-checkout-service, viola!
6. Using a GraphQL client tool , run GrahpQL query onto ( look at usage examples below )

   http://localhost:9087/graphql

## Architecture

### Key Technologies
 - NodeJS
 - Typescript
 - GraphQL
 - MongoDB

### Typing and Code Consistency
 - Typescript for safe typing and better developer experience, speed and reduce bugs
 - TSLint and Prettier for code consistency

### Dependency Injection
 - use of dependency injection pattern to allow test mocking

### Code Generation
 - code generate Typescript types from GraphQL schema to speed development

### Database
 - Model Checkout: Persist checkout for users to resume. Contains line items data ( e.g Product: Classic, Quantity: 2 )
 - Model Customer: Will hold reference to checkout instance and contain special price rules
 - Model Product: Product data such as type, name, default price
 - NoSQL used to easily extend schema to add use special price rules

### GraphQL
 - offer strong type system,
 - prevents over fetching

#### Endpoints
 ```
 Query {
  # get checkout session by id
  checkout(checkoutId: ID!): Checkout
  version
 }

 Mutation {
   # create new checkout session
   createCheckout(customerId: ID!): Checkout

   # update checkout details
   updateCheckout(customerId: ID!, checkoutInput: CheckoutRequest!) : Checkout
 }
 ```
 - `updateCheckout` sends entire line item list ( think pure function ) and
 service will resolve and recalculate total price. there isn't any held states
 - if there is existing checkout session, `createCheckout` will return that checkout


## Error Handling
 - Handled by Apollo Server and return response as per GraphQL standard where `response.data` will be null and `response.errors` will contain the error data.
 - e.g
```
{
  "errors": [
      {
        "message": "Customer id not found",
        "path": [
          "createCheckout"
        ],
      }
  ],
  "data": {
    "createCheckout": null
  }
}
```

## Testing

### Run Tests
 - `npm run test` - test all
 - `npm run test:unit` - run unit tests only
 - `npm run test:api` - run API tests only
 - `npm run test:coverage` - code coverage

### Details
 - mocha and chai for unit testing
 - supertest for api testing
 - `mongodb-memory-server` is used to quickly spin up a actual/real MongoDB Server programmatically from node for testing and *demonstration* purpose.
 - Fake data is seeded for demonstration purposes.

## Future Improvements
 - implement dataloader not implemented for external calls. Should for ..
 - implement cache for improve performance

## Usage Examples

Phttp://localhost:9087/graphql

- Get Checkout

```
query getCheckout {
 checkout(checkoutId:"5b534353da555265a84742a9") {
    lineItems {
      product {
        id
        name
        price
        __typename
      }
    }
    total
  }
}
```

Response:
```
{
  "data": {
    "checkout": {
      "lineItems": [
        {
          "product": {
            "id": "5b53df4e8332af0aad759f9f",
            "name": "Stand Out",
            "price": 100,
            "__typename": "StandOut"
          }
        }
      ],
      "total": 150
    }
  }
}
```

- Create Checkout

```
 mutation createCheckout{
  createCheckout(customerId: "5b5348302cfd836b8f98d138") {
    total
    lineItems {
      quantity
      product {
        id
        name
      }
    }
  }
}
```

Response:
```
{
  "data": {
    "createCheckout": {
      "total": 0,
      "lineItems": []
    }
  }
}
```

- Update Checkout

```
mutation updateCheckout($customerId :ID!, $checkoutRequest: CheckoutRequest! ) {
  updateCheckout(customerId: $customerId, checkoutInput: $checkoutRequest ) {
    __typename
    total
    lineItems {
      quantity
      product {
        __typename
      }
    }
  }
}
```

Input variables:
```
{
    customerId: '5b53e0e3f4d7770c088a36ae', //
    checkoutRequest: {
      id: '5b534353da555265a84742a9',
      lineItems: [
        {
          product: {
            id: '5b53df4e8332af0aad759f9f', // stand out
          },
          quantity: 3,
        },
        {
          product: {
            id: '5b53df4e8332af0aad759f9c', // classic
          },
          quantity: 2,
        },
      ],
    },
}
```

Response:
```
{
  "data": {
    "updateCheckout": {
      "__typename": "Checkout",
      "total": 150,
      "lineItems": [
        {
          "quantity": 1,
          "product": {
            "__typename": "Classic"
          }
        },
        {
          "quantity": 2,
          "product": {
            "__typename": "StandOut"
          }
        }
      ]
    }
  }
}
```







