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
  {
    id: "5",
    src: "https://picsum.photos/800/600?random=5",
    alt: "Desert dunes",
  },
  {
    id: "6",
    src: "https://picsum.photos/800/600?random=6",
    alt: "Lake at dawn",
  },
  {
    id: "7",
    src: "https://picsum.photos/800/600?random=7",
    alt: "Snowy peaks",
  },
  {
    id: "8",
    src: "https://picsum.photos/800/600?random=8",
    alt: "Wildflower meadow",
  },
  {
    id: "9",
    src: "https://picsum.photos/800/600?random=9",
    alt: "Night city lights",
  },
  {
    id: "10",
    src: "https://picsum.photos/800/600?random=10",
    alt: "River valley",
  },
  {
    id: "11",
    src: "https://picsum.photos/800/600?random=11",
    alt: "Coastal cliffs",
  },
  {
    id: "12",
    src: "https://picsum.photos/800/600?random=12",
    alt: "Autumn forest",
  },
];

export function getPhoto(id: string): Photo | undefined {
  return photos.find((photo) => photo.id === id);
}
