import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPhoto, photos } from "../../photos";

// Full page for direct visits, shared links, and refreshes.
export function generateStaticParams() {
  return photos.map((photo) => ({ id: photo.id }));
}

async function PhotoPageContent({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const photo = getPhoto(id);
  if (!photo) notFound();

  return (
    <main className="mx-auto max-w-4xl p-8">
      <Link
        href="/gallery"
        className="mb-4 inline-block text-gray-600 hover:text-gray-900"
      >
        ← Back to gallery
      </Link>
      {/* biome-ignore lint/performance/noImgElement: intentional optimization exercise */}
      <img src={photo.src} alt={photo.alt} className="w-full rounded-lg" />
      <p className="mt-2 text-gray-600 text-sm">{photo.alt}</p>
    </main>
  );
}

export default function PhotoPage(
  props: Parameters<typeof PhotoPageContent>[0]
) {
  return (
    <Suspense fallback={null}>
      <PhotoPageContent {...props} />
    </Suspense>
  );
}
