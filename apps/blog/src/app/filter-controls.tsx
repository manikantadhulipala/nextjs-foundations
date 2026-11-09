'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useCallback } from 'react';

type Props = {
  currentCategory?: string;
  currentSort?: string;
};

export function FilterControls({ currentCategory, currentSort }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Build a query string that keeps the other params and resets pagination
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(name, value);
      } else {
        params.delete(name);
      }
      // Reset pagination when a filter changes
      if (name !== 'page') {
        params.delete('page');
      }
      return params.toString();
    },
    [searchParams]
  );

  const handleCategoryChange = (category: string) => {
    const query = createQueryString('category', category);
    router.push(query ? `${pathname}?${query}` : pathname);
  };

  const handleSortChange = (sort: string) => {
    const query = createQueryString('sort', sort);
    router.push(query ? `${pathname}?${query}` : pathname);
  };

  const clearFilters = () => {
    router.push(pathname);
  };

  const categoryButton = (value: string, label: string) => (
    <button
      type="button"
      onClick={() => handleCategoryChange(value)}
      className={`rounded px-3 py-1 text-sm ${
        (value === '' && !currentCategory) || currentCategory === value
          ? 'bg-blue-600 text-white'
          : 'bg-gray-100'
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="flex flex-wrap items-center gap-4">
      <div className="flex gap-2">
        {categoryButton('', 'All')}
        {categoryButton('tech', 'Tech')}
        {categoryButton('general', 'General')}
      </div>

      <select
        value={currentSort || ''}
        onChange={(e) => handleSortChange(e.target.value)}
        className="rounded border px-3 py-1 text-sm"
      >
        <option value="">Default order</option>
        <option value="title">Sort by title</option>
      </select>

      {(currentCategory || currentSort) && (
        <button
          type="button"
          onClick={clearFilters}
          className="text-red-600 text-sm hover:underline"
        >
          Clear filters
        </button>
      )}
    </div>
  );
}
