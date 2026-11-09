// Index for the /posts demo, so the "Browse Posts" link on the nested 404 works
import Link from "next/link";

const slugs = [
  { slug: "hello-world", title: "Hello World" },
  { slug: "nextjs-tips", title: "Next.js Tips" },
];

export default function PostsIndexPage() {
  return (
    <main className="mx-auto max-w-2xl p-8">
      <h1 className="mb-6 font-bold text-3xl">Posts</h1>
      <ul className="list-inside list-disc space-y-2">
        {slugs.map((post) => (
          <li key={post.slug}>
            <Link
              href={`/posts/${post.slug}`}
              className="text-blue-600 hover:underline"
            >
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
