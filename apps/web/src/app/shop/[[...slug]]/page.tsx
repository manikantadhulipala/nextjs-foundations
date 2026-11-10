import { Suspense } from "react";
async function ShopPageContent(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;

  // params.slug is undefined when no segments are present
  const categories = params.slug || [];
  const isRoot = categories.length === 0;

  return (
    <div className="p-8">
      <h1 className="mb-4 text-2xl font-bold">
        {isRoot ? "All Products" : "Filtered Products"}
      </h1>
      {isRoot ? (
        <p>Showing all categories</p>
      ) : (
        <div>
          <p className="mb-2">Category path: /{categories.join("/")}</p>
          <p className="mb-4">Depth: {categories.length}</p>
          <ul className="list-disc pl-6">
            {categories.map((category, i) => (
              <li key={category}>
                Level {i + 1}: {category}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default function ShopPage(props: Parameters<typeof ShopPageContent>[0]) {
  return (
    <Suspense fallback={null}>
      <ShopPageContent {...props} />
    </Suspense>
  );
}
