import Image, { getImageProps } from "next/image";
import Link from "next/link";
import { photos } from "./photos";

// Gray 1x1 placeholder shown while each image loads (blur placeholder)
const blurDataURL =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxIDEiPjxyZWN0IGZpbGw9IiM5Y2EzYWYiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiLz48L3N2Zz4=";

// Art direction: a landscape crop on desktop and a portrait crop on mobile
function HeroWithArtDirection() {
  const common = { alt: "Featured landscape", sizes: "100vw" };

  const {
    props: { srcSet: desktop },
  } = getImageProps({
    ...common,
    width: 1440,
    height: 600,
    quality: 85,
    src: "https://picsum.photos/1440/600?random=hero-desktop",
  });

  const {
    props: { srcSet: mobile, ...rest },
  } = getImageProps({
    ...common,
    width: 750,
    height: 900,
    quality: 75,
    src: "https://picsum.photos/750/900?random=hero-mobile",
  });

  return (
    <picture>
      <source media="(min-width: 1024px)" srcSet={desktop} />
      <source media="(min-width: 640px)" srcSet={mobile} />
      {/* eager + high priority: the hero is an LCP candidate, so it should not wait for lazy loading */}
      <img
        {...rest}
        alt="Featured landscape"
        loading="eager"
        fetchPriority="high"
        style={{ width: "100%", height: "auto" }}
        className="rounded-lg"
      />
    </picture>
  );
}

export default function GalleryPage() {
  return (
    <main className="mx-auto max-w-4xl p-8">
      <h1 className="mb-8 font-bold text-3xl">Photo Gallery</h1>

      <section className="mb-8">
        <HeroWithArtDirection />
      </section>

      {/* Two-column grid: blur placeholders show while each image loads */}
      <div className="grid grid-cols-2 gap-4">
        {photos.map((photo) => (
          <Link
            key={photo.id}
            href={`/gallery/photo/${photo.id}`}
            className="relative aspect-[4/3]"
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              quality={75}
              placeholder="blur"
              blurDataURL={blurDataURL}
              sizes="(max-width: 768px) 100vw, 50vw"
              className="rounded-lg object-cover"
            />
          </Link>
        ))}
      </div>

      <section className="mt-8 rounded bg-blue-50 p-4">
        <h2 className="mb-2 font-semibold text-blue-800">
          Advanced Optimizations Applied
        </h2>
        <ul className="list-inside list-disc text-blue-700 text-sm">
          <li>Blur placeholders while each image loads</li>
          <li>Art direction: landscape on desktop, portrait on mobile</li>
          <li>deviceSizes aligned with Tailwind breakpoints</li>
          <li>Quality values restricted to 75 and 85</li>
          <li>AVIF/WebP format optimization</li>
        </ul>
      </section>
    </main>
  );
}
