export const customers = [
  {
    _id: '5b5348302cfd836b8f98d138',
    name: 'SecondBite',
    dateAdded: '2018-07-21T04:39:31.018Z',
    dateUpdated: '2018-07-21T04:24:26.888Z',
    priceRules: [],
  },
  {
    _id: '5b5348302cfd836b8f98d139',
    name: 'Axil Coffee',
    dateAdded: '2019-07-21T08:52:48.799Z',
    dateUpdated: '2019-07-20T20:10:04.769Z',
    priceRules: [
      {
        ruleType: 'xForY',
        entitledProduct: 'Classic',
        label: '5 for 4',
        xForY: {
          x: 5,
          y: 4,
        },
      },
      {
        ruleType: 'discount',
        entitledProduct: 'Premium',
        label: '10 dollar discount',
        discount: {
          fixed: 10,
        },
      },
    ],
  },
  {
    _id: '5b53e0e3f4d7770c088a36ae',
    name: 'MYER',
    dateAdded: '2019-07-21T12:37:21.910Z',
    dateUpdated: '2019-07-21T19:12:05.214Z',
    checkout: '5b534353da555265a84742a9',
    priceRules: [
      {
        ruleType: 'discount',
        entitledProduct: 'StandOut',
        label: '25% discount',
        discount: {
          percent: 25,
        },
      },
      {
        ruleType: 'xForY',
        entitledProduct: 'Classic',
        label: '2 for 1',
        xForY: {
          x: 2,
          y: 1,
        },
      },
    ],
  },
]

export const products = [
  {
    _id: '5b53df4e8332af0aad759f9c',
    name: 'Classic',
    type: 'Classic',
    price: 50,
    dateAdded: '2018-07-22T00:30:11.592Z',
    dateUpdated: '2018-07-21T22:08:47.541Z',
  },
  {
    _id: '5b53df4e8332af0aad759f9f',
    name: 'Stand Out',
    type: 'StandOut',
    price: 100,
    dateAdded: '2018-07-21T14:32:15.265Z',
    dateUpdated: '2018-07-21T02:07:54.450Z',
  },
  {
    _id: '5decaa7ed3181741d8857949',
    name: 'Premium',
    type: 'Premium',
    price: 200,
    dateAdded: '2018-07-21T14:32:15.265Z',
    dateUpdated: '2018-07-21T02:07:54.450Z',
  },
]

export const checkouts = [
  {
    _id: '5b534353da555265a84742a9',
    creatorId: '5b53e0e3f4d7770c088a36ae',
    lineItems: [
      {
        product: '5b53df4e8332af0aad759f9f',
        quantity: 2,
      },
    ],
    dateAdded: '2018-07-21T14:32:15.265Z',
    dateUpdated: '2018-07-21T02:07:54.450Z',
  },
]
