import { swellFetch } from "@/lib/swell";

export async function getCategory(slug) {
  const query = `
  query getCategory($slug: String) {
    categoryBySlug( slug: $slug) {
        description
    }
  }`;

  const variables = {
    slug,
  };

  const response = await swellFetch({ query, variables });
  return response.body?.data?.categoryBySlug?.description ?? [];
}
