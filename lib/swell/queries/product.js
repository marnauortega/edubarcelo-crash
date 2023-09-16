import { swellFetch } from "@/lib/swell";

export async function getProductBySlug(slug) {
  const query = `
  query getProductBySlug($slug: String) {
    productBySlug(slug: $slug) {
        id
        name
        description
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
  }`;

  const variables = {
    slug,
  };

  const response = await swellFetch({ query, variables });
  return response.body?.data?.productBySlug ?? [];
}
