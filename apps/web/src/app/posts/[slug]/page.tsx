import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import type { Author, Comment, Post } from "@/lib/posts-db";
import {
  findAuthor,
  findComments,
  findPostBySlug,
  findPostWithRelations,
} from "@/lib/posts-db";

type Mode = "sequential" | "parallel" | "joined";

function parseMode(value: string | undefined): Mode {
  if (value === "sequential" || value === "joined") return value;
  return "parallel";
}

// Loads post, author, and comments. Returns the same shape for every strategy.
async function loadPost(slug: string, mode: Mode) {
  const start = Date.now();
  let result: { post: Post; author: Author | null; comments: Comment[] };

  if (mode === "joined") {
    // One query with joins
    const joined = await findPostWithRelations(slug);
    if (!joined) notFound(); // notFound() throws, so keep it outside try/catch
    result = joined;
  } else if (mode === "sequential") {
    // Baseline: each query waits for the previous one
    const post = await findPostBySlug(slug);
    if (!post) notFound();
    const author = await findAuthor(post.authorId);
    const comments = await findComments(post.id);
    result = { post, author, comments };
  } else {
    // Post first (we need its IDs), then author and comments in parallel
    const post = await findPostBySlug(slug);
    if (!post) notFound();
    const [author, comments] = await Promise.all([
      findAuthor(post.authorId),
      findComments(post.id),
    ]);
    result = { post, author, comments };
  }

  console.log(`[post] ${slug} mode=${mode} loaded in ${Date.now() - start}ms`);
  return result;
}

// Request-time content: searchParams is read inside Suspense
async function PostContent({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ mode?: string }>;
}) {
  const { slug } = await params;
  const { mode } = await searchParams;
  const { post, author, comments } = await loadPost(slug, parseMode(mode));

  return (
    <main className="mx-auto max-w-2xl p-8">
      <Link
        href="/posts"
        className="mb-4 inline-block text-blue-600 hover:underline"
      >
        ← Back to posts
      </Link>
      <h1 className="mb-2 font-bold text-3xl">{post.title}</h1>
      <p className="mb-4 text-gray-600 text-sm">
        By {author?.name ?? "Unknown"}
      </p>
      <p className="mb-8 text-gray-700">{post.content}</p>

      <section>
        <h2 className="mb-2 font-semibold text-xl">
          Comments ({comments.length})
        </h2>
        <ul className="space-y-2">
          {comments.map((comment) => (
            <li key={comment.id} className="rounded bg-gray-50 p-3">
              <strong>{comment.author}</strong>
              <p>{comment.text}</p>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}

export default function PostPage(props: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ mode?: string }>;
}) {
  return (
    <Suspense
      fallback={<div className="p-8 animate-pulse">Loading post...</div>}
    >
      <PostContent params={props.params} searchParams={props.searchParams} />
    </Suspense>
  );
}
