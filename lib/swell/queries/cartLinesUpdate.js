import { swellFetch } from "@/lib/swell";

export async function cartLinesUpdate(quantity, itemId, session) {
  const query = `
  mutation updateCartItem ($itemId: String, $input: SwellCartItemInput){
    updateCartItem(itemId: $itemId, input: $input) {
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
    itemId,
    input: {
      quantity,
    },
  };

  const response = await swellFetch({ query, variables, session });
  return { cart: response?.body?.data?.updateCartItem, session: response?.session } ?? [];
}
