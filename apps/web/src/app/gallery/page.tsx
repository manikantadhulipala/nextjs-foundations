import Link from "next/link";
import { photos } from "./photos";

// TODO: Convert to next/image (Section 3 Lesson 4)

export default function GalleryPage() {
  return (
    <main className="mx-auto max-w-4xl p-8">
      <h1 className="mb-8 font-bold text-3xl">Photo Gallery</h1>

      <div className="grid grid-cols-2 gap-4">
        {photos.map((photo) => (
          <Link
            key={photo.id}
            href={`/gallery/photo/${photo.id}`}
            className="relative aspect-[4/3]"
          >
            {/* TODO: Replace with next/image for optimization */}
            {/* biome-ignore lint/performance/noImgElement: intentional optimization exercise */}
            <img
              src={photo.src}
              alt={photo.alt}
              className="h-full w-full rounded-lg object-cover"
            />
          </Link>
        ))}
      </div>

      <section className="mt-8 rounded bg-gray-100 p-4">
        <h2 className="mb-2 font-semibold">Performance Issues</h2>
        <ul className="list-inside list-disc text-gray-600 text-sm">
          <li>Images not optimized (no WebP/AVIF)</li>
          <li>No lazy loading</li>
          <li>No responsive sizing</li>
          <li>Layout shift on load</li>
        </ul>
      </section>
    </main>
  );
}
