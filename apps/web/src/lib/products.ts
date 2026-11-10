import { cacheLife, cacheTag } from "next/cache";
import { type Product, readProduct } from "./product-store";

// Cached product read: the id is part of the cache key, the tags allow invalidation
export async function getProduct(id: string): Promise<Product | undefined> {
  "use cache";
  cacheLife("products"); // 5min fresh, 15min revalidate, 1hr expire
  cacheTag("products", `product-${id}`);

  // Simulated network latency for a remote product API
  await new Promise((resolve) => setTimeout(resolve, 300));
  return readProduct(id);
}
