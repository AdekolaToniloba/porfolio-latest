import PortfolioRedesign, { type Post } from "@/components/portfolio-redesign";

const writingPosts: Post[] = [
  {
    title: "From Frontend to Full Stack: A Developer's Journey into Backend Territory",
    brief:
      "As a front-end developer, I've always been comfortable crafting user interfaces and bringing designs to life in the browser. However, I recently decided to venture into the world of backend development, and boy, was it an eye-opening experience!",
    publishedAt: "2024-07-06T00:00:00.000Z",
    readTimeInMinutes: 4,
    url: "https://theadekolaexperience.hashnode.dev/from-frontend-to-full-stack-a-developers-journey-into-backend-territory",
    tags: [{ name: "Full Stack" }],
  },
  {
    title: "Svelte Vs React: Which is best for your project?",
    brief:
      "Javascript is the language of the web. Its frameworks have completely changed how developers approach web development, equipping them with powerful ways to build modern interfaces.",
    publishedAt: "2024-07-05T00:00:00.000Z",
    readTimeInMinutes: 7,
    url: "https://theadekolaexperience.hashnode.dev/svelte-vs-react-which-is-best-for-your-project",
    tags: [{ name: "Frontend" }],
  },
  {
    title: "The Future of Frontend Development",
    brief:
      "If you are new to the programming space, the term “Frontend Development” is one you might have heard often. This post explores where the field is heading and what developers should pay attention to.",
    publishedAt: "2023-07-31T00:00:00.000Z",
    readTimeInMinutes: 21,
    url: "https://theadekolaexperience.hashnode.dev/the-future-of-frontend-development",
    tags: [{ name: "Frontend" }],
  },
];

export default function Page() {
  return <PortfolioRedesign posts={writingPosts} />;
}
