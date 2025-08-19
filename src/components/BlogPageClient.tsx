'use client';

import { useState, useMemo } from 'react';
import { Artikel } from '@prisma/client';
import BlogFilter from './BlogFilter';
import ArticleList from './ArticleList';

interface BlogPageClientProps {
  articles: Artikel[];
  categories: string[];
}

export default function BlogPageClient({ articles, categories }: BlogPageClientProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Gunakan useMemo untuk efisiensi, agar filter hanya berjalan saat dependency berubah
  const filteredArticles = useMemo(() => {
    return articles.filter((article) => {
      const matchesCategory = selectedCategory ? article.kategori === selectedCategory : true;
      const matchesSearch = article.judul.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [articles, searchQuery, selectedCategory]);

  return (
    <div>
      <BlogFilter
        categories={categories}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <ArticleList articles={filteredArticles} />
    </div>
  );
}