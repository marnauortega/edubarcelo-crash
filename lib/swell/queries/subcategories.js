import { swellFetch } from "@/lib/swell";

export async function getSubcategories(slug) {
  const query = `
  query getsubcategories($slug: String,) {
    categoryBySlug( slug: $slug) {
      children {
        name
        slug
      }
    }
  }`;

  const variables = {
    slug,
  };

  const response = await swellFetch({ query, variables });
  return response.body?.data?.categoryBySlug?.children ?? [];
}
