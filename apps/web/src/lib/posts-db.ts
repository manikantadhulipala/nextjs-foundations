import "server-only";

// Simulated database: every query waits QUERY_MS to stand in for a network round-trip.
const QUERY_MS = 200;

export type Post = {
  id: string;
  slug: string;
  title: string;
  content: string;
  authorId: string;
};
export type Author = { id: string; name: string };
export type Comment = { id: string; author: string; text: string };

const POSTS: Record<string, Post> = {
  "hello-world": {
    id: "post-hello-world",
    slug: "hello-world",
    title: "Hello World",
    content: "This is the first post. Welcome to the blog!",
    authorId: "user-1",
  },
  "nextjs-tips": {
    id: "post-nextjs-tips",
    slug: "nextjs-tips",
    title: "Next.js Tips",
    content: "Here are some tips for building with Next.js...",
    authorId: "user-1",
  },
};

const AUTHORS: Record<string, Author> = {
  "user-1": { id: "user-1", name: "Demo Author" },
};

const COMMENTS: Record<string, Comment[]> = {
  "post-hello-world": [
    { id: "c1", author: "Reader 1", text: "Great article!" },
    { id: "c2", author: "Reader 2", text: "Very helpful, thanks!" },
  ],
  "post-nextjs-tips": [{ id: "c3", author: "Reader 3", text: "Useful tips." }],
};

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// One query per table, as an ORM would issue them
export async function findPostBySlug(slug: string): Promise<Post | null> {
  await wait(QUERY_MS);
  return POSTS[slug] ?? null;
}

export async function findAuthor(id: string): Promise<Author | null> {
  await wait(QUERY_MS);
  return AUTHORS[id] ?? null;
}

export async function findComments(postId: string): Promise<Comment[]> {
  await wait(QUERY_MS);
  return COMMENTS[postId] ?? [];
}

// One query with joins (like an ORM include): post, author, and comments together
export async function findPostWithRelations(slug: string) {
  await wait(150);
  const post = POSTS[slug];
  if (!post) return null;
  return {
    post,
    author: AUTHORS[post.authorId] ?? null,
    comments: COMMENTS[post.id] ?? [],
  };
}

// Used by proxy.ts to answer unknown post slugs with a real 404 before the page renders
export function isKnownPostSlug(slug: string): boolean {
  return Object.hasOwn(POSTS, slug);
}
