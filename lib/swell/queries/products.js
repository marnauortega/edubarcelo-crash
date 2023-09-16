import { swellFetch } from "@/lib/swell";

export async function getAllProducts(category, amount = 100) {
  const query = `
  query getAllProducts($category: String, $amount: Int, $sort: String) {
    products(category: $category,limit: $amount,sort: $sort, page: 1) {
      results {
        id
        name
        slug
        price
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
  }`;

  const variables = {
    category,
    amount,
  };

  const response = await swellFetch({ query, variables });
  return response.body?.data?.products?.results ?? [];
}
