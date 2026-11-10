"use client";

import { useState } from "react";
import { updateProduct } from "@/app/actions/products";
import type { Product } from "@/lib/product-store";

export function ProductForm({ product }: { product: Product }) {
  const [message, setMessage] = useState("");
  const [pending, setPending] = useState(false);

  async function handleSubmit(formData: FormData) {
    setPending(true);
    setMessage("");

    const result = await updateProduct(product.id, {
      name: String(formData.get("name") ?? ""),
      price: Number(formData.get("price")),
      inventory: Number(formData.get("inventory")),
    });

    setPending(false);
    setMessage(result.success ? "Product updated." : result.error);
  }

  return (
    <form action={handleSubmit} className="space-y-3 rounded border p-4">
      <label className="block text-sm">
        Name
        <input
          name="name"
          defaultValue={product.name}
          className="mt-1 w-full rounded border px-3 py-2"
        />
      </label>
      <label className="block text-sm">
        Price
        <input
          name="price"
          type="number"
          defaultValue={product.price}
          className="mt-1 w-full rounded border px-3 py-2"
        />
      </label>
      <label className="block text-sm">
        Inventory
        <input
          name="inventory"
          type="number"
          defaultValue={product.inventory}
          className="mt-1 w-full rounded border px-3 py-2"
        />
      </label>
      <button
        type="submit"
        disabled={pending}
        className="rounded bg-blue-600 px-4 py-2 text-white disabled:bg-gray-400"
      >
        {pending ? "Saving..." : "Save changes"}
      </button>
      {message && <p className="text-sm">{message}</p>}
    </form>
  );
}
