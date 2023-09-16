import { swellFetch } from "@/lib/swell";

export async function cartLinesRemove(itemId, session) {
  const query = `
  mutation removeCartItem($itemId: String) {
    deleteCartItem(itemId: $itemId) {
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
  };

  const response = await swellFetch({ query, variables, session });
  return { cart: response?.body?.data?.deleteCartItem, session: response?.session } ?? [];
}
