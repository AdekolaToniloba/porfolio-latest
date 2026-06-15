import PortfolioRedesign, { type Post } from "@/components/portfolio-redesign";

const fallbackPosts: Post[] = [
  {
    title: "Building products with taste and restraint",
    brief:
      "Notes on frontend decisions, product context, and the tiny details that make interfaces feel trustworthy.",
    publishedAt: "2026-01-12T00:00:00.000Z",
    readTimeInMinutes: 4,
    url: "https://theadekolaexperience.hashnode.dev",
    tags: [{ name: "Frontend" }],
  },
  {
    title: "What Lagos teaches you about software",
    brief:
      "A practical look at building for real users, real constraints, and products that cannot afford to be fragile.",
    publishedAt: "2025-11-19T00:00:00.000Z",
    readTimeInMinutes: 5,
    url: "https://theadekolaexperience.hashnode.dev",
    tags: [{ name: "Product" }],
  },
  {
    title: "From design decision to production component",
    brief:
      "How I move from visual direction to reusable pieces without losing the feeling that made the design work.",
    publishedAt: "2025-09-08T00:00:00.000Z",
    readTimeInMinutes: 3,
    url: "https://theadekolaexperience.hashnode.dev",
    tags: [{ name: "React" }],
  },
];

async function getPosts(): Promise<Post[]> {
  try {
    const res = await fetch("https://gql.hashnode.com", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
          query {
            publication(host: "theadekolaexperience.hashnode.dev") {
              posts(first: 3) {
                edges {
                  node {
                    title
                    brief
                    publishedAt
                    readTimeInMinutes
                    url
                    tags { name }
                  }
                }
              }
            }
          }
        `,
      }),
      next: { revalidate: 3600 },
    });

    if (!res.ok) return fallbackPosts;
    const data = await res.json();
    return (
      data?.data?.publication?.posts?.edges?.map(
        (edge: { node: Post }) => edge.node
      ) ?? fallbackPosts
    );
  } catch {
    return fallbackPosts;
  }
}

export default async function Page() {
  const posts = await getPosts();

  return <PortfolioRedesign posts={posts} />;
}
