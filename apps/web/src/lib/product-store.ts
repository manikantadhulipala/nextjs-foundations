// Stand-in for a product database. Writes here are not cached by themselves:
// the cached read in lib/products.ts only refreshes after updateTag().
export type Product = {
  id: string;
  name: string;
  price: number;
  inventory: number;
};

const store = new Map<string, Product>([
  [
    "123",
    { id: "123", name: "Trail Running Shoes", price: 120, inventory: 14 },
  ],
  [
    "456",
    { id: "456", name: "Insulated Water Bottle", price: 35, inventory: 60 },
  ],
  ["789", { id: "789", name: "Canvas Day Pack", price: 85, inventory: 8 }],
]);

export function listProductIds(): string[] {
  return Array.from(store.keys());
}

export function readProduct(id: string): Product | undefined {
  return store.get(id);
}

export function writeProduct(
  id: string,
  changes: Partial<Omit<Product, "id">>
) {
  const current = store.get(id);
  if (!current) throw new Error(`Product ${id} not found`);
  store.set(id, { ...current, ...changes });
}
