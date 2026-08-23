<script setup lang="ts">
import type { NewsViewType } from '~/types/view';
import { useNewsStore } from '~/stores/useNewsStore';
import { storeToRefs } from 'pinia';

const route = useRoute();

const newsStore = useNewsStore();

const { items: newsItems, totalItems: totalNewsCount } = storeToRefs(newsStore);

const viewType = useCookie<NewsViewType>('news-view-type', {
  default: () => 'grid',
});

const currentNewsPage = computed(() => Number(route.params.id) || 1);

const serverQueryParams = computed(() => ({
  source: (route.query.source as string) || 'all',
  search: (route.query.search as string) || '',
  page: currentNewsPage.value,
  limit: 10,
}));

const cacheKey = computed(
  () =>
    `news-list-p-${currentNewsPage.value}-s-${serverQueryParams.value.source}-q-${serverQueryParams.value.search}`,
);

const { status, error, refresh } = await useAsyncData(
  cacheKey.value,
  async () => {
    const data = await $fetch('/api/news', { query: serverQueryParams.value });

    newsStore.setNewsData(data?.items || [], data?.total || 0);

    return data;
  },
  {
    watch: [cacheKey],
  },
);
</script>

<template>
  <div>
    <div
      v-if="status === 'pending'"
      class="text-center py-20 text-gray-200 font-bold"
    >
      Загрузка...
    </div>

    <div
      v-else-if="error"
      class="flex flex-col items-center justify-center py-16 text-center bg-white rounded-card shadow-card px-4"
    >
      <div
        class="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-500"
      >
        <span class="text-2xl font-bold">!</span>
      </div>

      <h2 class="text-xl font-bold text-black mb-2">
        Произошла ошибка при загрузке новостей
      </h2>

      <p class="text-sm text-gray-200 max-w-sm leading-5 mb-6">
        Не удалось установить соединение с сервером. Проверьте подключение к
        интернету или попробуйте позже.
      </p>

      <button
        type="button"
        @click="() => refresh()"
        class="px-5 py-2.5 rounded-card bg-primary text-white text-sm font-bold shadow-sm transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]"
      >
        Повторить попытку
      </button>
    </div>

    <OrganismsNewsFeed
      v-else
      :items="newsItems"
      :view-type="viewType"
      :page="currentNewsPage"
      :total-items="totalNewsCount"
      base-path="/news"
    />
  </div>
</template>
