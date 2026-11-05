export type Photo = {
  id: string;
  src: string;
  alt: string;
};

export const photos: Photo[] = [
  {
    id: "1",
    src: "https://picsum.photos/800/600?random=1",
    alt: "Mountain landscape",
  },
  {
    id: "2",
    src: "https://picsum.photos/800/600?random=2",
    alt: "Ocean sunset",
  },
  {
    id: "3",
    src: "https://picsum.photos/800/600?random=3",
    alt: "Forest path",
  },
  {
    id: "4",
    src: "https://picsum.photos/800/600?random=4",
    alt: "City skyline",
  },
];

export function getPhoto(id: string): Photo | undefined {
  return photos.find((photo) => photo.id === id);
}
