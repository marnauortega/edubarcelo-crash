import { swellFetch } from "@/lib/swell";

export async function getAllCategories() {
  const query = `
  query getAllcategories {
    categories {
      results {
        name
        slug
        products {
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
    }
  }`;

  const response = await swellFetch({ query });
  return response.body?.data?.categories?.results ?? [];
}
