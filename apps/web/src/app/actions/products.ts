"use server";

import { updateTag } from "next/cache";
import { type Product, writeProduct } from "@/lib/product-store";

export async function updateProduct(
  id: string,
  data: Partial<Pick<Product, "name" | "price" | "inventory">>
) {
  try {
    writeProduct(id, data);

    // Expire the cached product and the list so this action's next render shows the write
    updateTag(`product-${id}`);
    updateTag("products");

    return { success: true as const };
  } catch (error) {
    console.error("Failed to update product:", error);
    return { success: false as const, error: "Failed to update product" };
  }
}
