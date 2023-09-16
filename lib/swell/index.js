export async function swellFetch({ query, variables = {}, session }) {
  const URL = process.env.NEXT_PUBLIC_SWELL_ENDPOINT;

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: process.env.NEXT_PUBLIC_SWELL_PUBLIC_KEY,
    },
    body: JSON.stringify({ query, variables }),
    // cache: "force-cache",
    // cache: "no-store",
    next: { revalidate: 60 },
  };

  if (session && session !== "null") {
    options.headers["X-Session"] = session;
  }

  try {
    const result = await fetch(URL, options);
    return {
      status: result.status,
      body: await result.json(),
      session: result.headers.get("X-Session"),
    };
  } catch (error) {
    console.error("Error:", error);

    return {
      error,
      // status: 500,
      // error: "Error receiving data",
    };
  }
}
