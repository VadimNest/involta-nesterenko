import { defineStore } from 'pinia';
import type { NewsItem } from '~/types/news';

export const useNewsStore = defineStore('news', () => {
  const items = ref<NewsItem[]>([]);
  const totalItems = ref<number>(0);

  const setNewsData = (newItems: NewsItem[], total: number) => {
    items.value = newItems;
    totalItems.value = total;
  };

  const clearNews = () => {
    items.value = [];
    totalItems.value = 0;
  };

  return {
    items,
    totalItems,
    setNewsData,
    clearNews,
  };
});
