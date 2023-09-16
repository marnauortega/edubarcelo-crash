import { swellFetch } from "@/lib/swell";

export async function getHomeAnimationsCategory() {
  const query = `query getHomeAnimationsCategory($slug: String) {
    categoryBySlug(slug: $slug) {
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
    slug: "home-images",
  };

  const response = await swellFetch({ query, variables });
  return response.body?.data?.categoryBySlug?.images ?? [];
}
