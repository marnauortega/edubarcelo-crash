import { swellFetch } from "@/lib/swell";

export async function getCart(session) {
  const query = `
  query getCart {
    cart {
      checkoutUrl
      subTotal
      itemQuantity
      items {
        id
        quantity
        price
        product {
          id
          name
          currency
          images {
            file {
              url
              width
              height
            }
          }
        }
      }
    }
  }`;

  const variables = {};
  const response = await swellFetch({ query, variables, session });
  return { cart: response.body?.data?.cart, session: response?.session } ?? [];
}
