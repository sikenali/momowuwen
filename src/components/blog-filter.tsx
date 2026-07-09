'use client';

import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useCallback, useState } from 'react';

interface BlogFilterProps {
  categories: string[];
}

export function BlogFilter({ categories }: BlogFilterProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const activeCategory = searchParams.get('category') || '';
  const [searchText, setSearchText] = useState(searchParams.get('q') || '');

  const updateParams = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      router.push(`${pathname}?${params.toString()}`);
    },
    [searchParams, router, pathname],
  );

  const handleSearch = useCallback(
    (value: string) => {
      setSearchText(value);
      updateParams('q', value);
    },
    [updateParams],
  );

  return (
    <div className="filter-container">
      <div className="category-tags">
        <button
          className={`category-tag ${!activeCategory ? 'active' : ''}`}
          onClick={() => {
            const params = new URLSearchParams(searchParams.toString());
            params.delete('category');
            router.push(`${pathname}?${params.toString()}`);
          }}
        >
          <span>全部文章</span>
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            className={`category-tag ${activeCategory === cat ? 'active' : ''}`}
            onClick={() => updateParams('category', cat)}
          >
            <span>{cat}</span>
          </button>
        ))}
      </div>
      <div className="search-box">
        <i className="ri-search-line"></i>
        <input
          type="text"
          className="search-input"
          placeholder="搜索文章标题或关键词..."
          value={searchText}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>
    </div>
  );
}