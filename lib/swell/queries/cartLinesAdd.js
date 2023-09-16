import { swellFetch } from "@/lib/swell";

export async function cartLinesAdd(quantity, productId, session) {
  const query = `
  mutation addToCart($input: SwellCartItemInput) {
    addCartItem(input: $input) {
      checkoutUrl
      subTotal
      itemQuantity
      items {
        id
        quantity
        price
        discountTotal
        taxTotal
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

  const variables = {
    input: {
      quantity,
      productId,
    },
  };

  const response = await swellFetch({ query, variables, session });
  return { cart: response?.body?.data?.addCartItem, session: response?.session } ?? [];
}
