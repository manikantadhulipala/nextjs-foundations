import Link from 'next/link';
import { Suspense } from 'react';
import { FilterControls } from './filter-controls';

// Listing driven by searchParams (view state); the URL is the source of truth.
type Props = {
  searchParams: Promise<{
    category?: string;
    sort?: string;
    page?: string;
  }>;
};

// Mock data for the listing demo
const allPosts = [
  { id: '1', slug: 'hello-world', title: 'Hello World', category: 'general' },
  {
    id: '2',
    slug: 'nextjs-routing',
    title: 'Next.js Routing',
    category: 'tech',
  },
  { id: '3', slug: 'react-tips', title: 'React Tips', category: 'tech' },
];

export default async function BlogListingPage({ searchParams }: Props) {
  // Await searchParams before reading values
  const { category, sort, page } = await searchParams;

  // Filter and sort posts
  let posts = category
    ? allPosts.filter((p) => p.category === category)
    : allPosts;

  if (sort === 'title') {
    posts = [...posts].sort((a, b) => a.title.localeCompare(b.title));
  }

  const currentPage = Number.parseInt(page || '1', 10);

  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-bold text-4xl">
        Blog Posts{' '}
        {category && <span className="text-gray-500">in {category}</span>}
      </h1>

      {/* Client Component reads searchParams, so it sits inside Suspense */}
      <Suspense fallback={<div className="h-10 animate-pulse bg-gray-100" />}>
        <FilterControls currentCategory={category} currentSort={sort} />
      </Suspense>

      <ul className="flex flex-col gap-4">
        {posts.map((post) => (
          <li key={post.id}>
            <Link
              href={`/${post.slug}`}
              className="block rounded-lg border p-4 hover:bg-gray-50"
            >
              <h2 className="font-semibold text-xl">{post.title}</h2>
              <span className="text-gray-500 text-sm">{post.category}</span>
            </Link>
          </li>
        ))}
      </ul>

      <p className="text-gray-500 text-sm">Page {currentPage}</p>
    </div>
  );
}
