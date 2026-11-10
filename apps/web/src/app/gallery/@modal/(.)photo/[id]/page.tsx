import { notFound } from "next/navigation";
import { Suspense } from "react";
import { PhotoModal } from "@/components/photo-modal";
import { getPhoto } from "@/app/gallery/photos";

// Params are request-time data, so the lookup lives inside Suspense
async function PhotoModalContent({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const photo = getPhoto(id);
  if (!photo) notFound();

  return (
    <PhotoModal>
      {/* biome-ignore lint/performance/noImgElement: intentional optimization exercise */}
      <img src={photo.src} alt={photo.alt} className="max-h-[80vh] rounded" />
      <p className="mt-2 text-gray-600 text-sm">{photo.alt}</p>
    </PhotoModal>
  );
}

// Intercepts /gallery/photo/[id] during in-app navigation from the gallery and shows it as a modal.
export default function PhotoModalPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <Suspense fallback={null}>
      <PhotoModalContent params={params} />
    </Suspense>
  );
}
