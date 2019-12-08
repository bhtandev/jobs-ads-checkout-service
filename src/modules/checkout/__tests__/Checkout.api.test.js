"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const tester_1 = require("../../../../test/helpers/tester");
describe('API: Checkout Resolvers', () => {
    it('query checkout successfully', async () => {
        const response = await tester_1.test(`query getCheckout {
        checkout(checkoutId: "5b534353da555265a84742a9") {
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
      }`);
        chai_1.expect(response.data.checkout.lineItems[0].product.name).to.equal('Stand Out');
        chai_1.expect(response.data.checkout.lineItems[0].product.price).to.equal(100);
        chai_1.expect(response.data.checkout.total).to.equal(150);
    });
    it('mutation createCheckout returns customer id not found error when customer id does not exists', async () => {
        const response = await tester_1.test(` mutation checkout{
        createCheckout(customerId: "5b5348302cfd836b8f98d140") {
          total
        }
      }`);
        chai_1.expect(response.errors[0].message).to.equal('Customer id not found');
        chai_1.expect(response.data.createCheckout).to.equal(null);
    });
    it('mutation createCheckout returns new empty checkout', async () => {
        const response = await tester_1.test(` mutation checkout{
        createCheckout(customerId: "5b5348302cfd836b8f98d138") {
          total
        }
      }`);
        chai_1.expect(response.data.createCheckout.total).to.equal(0);
    });
    it('mutation createCheckout returns existing checkout if exists', async () => {
        const response = await tester_1.test(` mutation checkout{
        createCheckout(customerId: "5b53e0e3f4d7770c088a36ae") {
          total
        }
      }`);
        chai_1.expect(response.data.createCheckout.total).to.equal(150); // discounted at 25%
    });
    it('mutation updateCheckout returns existing checkout if exists', async () => {
        const response = await tester_1.test(`mutation checkout($customerId :ID!, $checkoutRequest: CheckoutRequest! ) {
               updateCheckout(customerId: $customerId, checkoutInput: $checkoutRequest ) {
                  total
                  lineItems {
                    product {
                      name
                    }
                    quantity
                  }
                }
             }`, {
            customerId: '5b53e0e3f4d7770c088a36ae',
            checkoutRequest: {
                id: '5b534353da555265a84742a9',
                lineItems: [
                    {
                        product: {
                            id: '5b53df4e8332af0aad759f9f',
                        },
                        quantity: 3,
                    },
                    {
                        product: {
                            id: '5b53df4e8332af0aad759f9c',
                        },
                        quantity: 2,
                    },
                ],
            },
        });
        chai_1.expect(response.data.updateCheckout.total).to.equal(275);
        chai_1.expect(response.data.updateCheckout.lineItems.length).to.equal(2);
        chai_1.expect(response.data.updateCheckout.lineItems[0].product.name).to.equal('Stand Out');
        chai_1.expect(response.data.updateCheckout.lineItems[1].product.name).to.equal('Classic');
    });
});
//# sourceMappingURL=Checkout.api.test.js.map