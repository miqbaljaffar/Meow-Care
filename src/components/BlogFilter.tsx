'use client';

import { Search } from 'lucide-react';
interface BlogFilterProps {
  categories: string[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
}

export default function BlogFilter({
  categories,
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
}: BlogFilterProps) {
  return (
    <div className="mb-12">
      {/* Search Bar */}
      <div className="relative mb-6 max-w-lg mx-auto">
        <label htmlFor="search" className="sr-only">Cari Artikel</label>
        <Search className="pointer-events-none absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-gray-500" />
        <input
          id="search"
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Cari artikel berdasarkan judul..."
          className="w-full rounded-full border border-gray-300 py-3 pl-12 pr-4 text-gray-900 placeholder-gray-500 shadow-sm focus:border-brand-green focus:ring-brand-green focus:border-2"
        />
      </div>

      {/* Filter Kategori */}
      <div className="flex flex-wrap justify-center items-center gap-3">
        <button
          onClick={() => setSelectedCategory(null)}
          className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors duration-200 ${
            selectedCategory === null
              ? 'bg-brand-green text-white shadow-md'
              : 'bg-white text-gray-600 hover:bg-gray-200'
          }`}
        >
          Semua
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors duration-200 ${
              selectedCategory === category
                ? 'bg-brand-green text-white shadow-md'
                : 'bg-white text-gray-600 hover:bg-gray-200'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}