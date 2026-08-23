<script setup lang="ts">
import type { NewsViewType } from '~/types/view';

const route = useRoute();
const router = useRouter();

const filterTabs = [
  { id: 0, title: 'Все', value: 'all' },
  { id: 1, title: 'Lenta.ru', value: 'lenta-ru' },
  { id: 2, title: 'Mos.ru', value: 'mos-ru' },
];

const viewType = useCookie<NewsViewType>('news-view-type', {
  default: () => 'grid',
  watch: true,
});

const setFilter = (value: string) => {
  router.push({
    query: {
      ...route.query,
      source: value,
    },
  });
};

const setViewType = (type: NewsViewType) => {
  viewType.value = type;
};

const activeFilter = computed(() => (route.query.source as string) || 'all');
</script>

<template>
  <div class="flex justify-between py-4.75 pb-3.5 md:py-6.25 md:pb-6.5">
    <MoleculesFilterTabs
      :items="filterTabs"
      :active="activeFilter"
      @change="setFilter"
    />

    <MoleculesViewSwitcher :value="viewType" @change="setViewType" />
  </div>
</template>
