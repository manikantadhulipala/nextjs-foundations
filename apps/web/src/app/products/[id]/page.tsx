import { Suspense } from "react";
import { ProductForm } from "@/components/product-form";
import { getProduct } from "@/lib/products";

// Cached product details: params are request-time data, so they're read inside Suspense
async function ProductDetails({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    return <p className="text-red-600">Product not found.</p>;
  }

  return (
    <div className="space-y-4">
      <h2 className="font-semibold text-xl">{product.name}</h2>
      <p>Price: ${product.price}</p>
      <p>In stock: {product.inventory}</p>
      <ProductForm product={product} />
    </div>
  );
}

export default function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <main className="mx-auto max-w-2xl p-8">
      {/* Static shell: prerendered and instant */}
      <header className="mb-6">
        <h1 className="font-bold text-3xl">Product details</h1>
      </header>

      {/* Cached product data streams into the shell */}
      <Suspense
        fallback={<div className="animate-pulse">Loading product...</div>}
      >
        <ProductDetails params={params} />
      </Suspense>
    </main>
  );
}
