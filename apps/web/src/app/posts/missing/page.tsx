import { notFound } from "next/navigation";

// Target of the proxy rewrite for unknown post slugs. notFound() runs during
// static prerendering, so the response is a 404 that renders posts/not-found.tsx.
export default function MissingPostPage() {
  notFound();
}
