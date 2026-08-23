<script setup lang="ts">
const route = useRoute();
const router = useRouter();

const searchQuery = ref((route.query.search as string) || '');

watch(
  () => route.query.search,
  (newSearch) => {
    searchQuery.value = (newSearch as string) || '';
  },
);

const updateSearchQuery = debounce((value: string) => {
  router.push({
    path: '/',
    query: {
      ...route.query,
      search: value.trim() ? value.trim() : undefined,
    },
  });
}, 400);

watch(searchQuery, (newValue) => {
  updateSearchQuery(newValue);
});

const resetFilters = () => {
  searchQuery.value = '';

  router.push({
    path: '/',
    query: {
      source: 'all',
    },
  });
};
</script>

<template>
  <header
    class="flex flex-col justify-between border-b border-gray-300 py-6.75 pb-5.75 md:flex-row lg:py-9"
  >
    <div class="mb-5 flex shrink-0 items-center justify-between md:mb-0">
      <h1
        class="text-[24px] font-bold text-black md:mr-7.5 lg:text-[36px] lg:leading-9"
      >
        Список новостей
      </h1>

      <button
        type="button"
        @click="resetFilters"
        class="group flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-[0_1px_4px_rgba(0,0,0,0.05),0_2px_4px_rgba(0,0,0,0.05)]"
        aria-label="Сбросить фильтры"
      >
        <svgo-reload
          class="h-4 w-5 lg:transition-transform lg:duration-500 lg:group-hover:rotate-180"
        />
      </button>
    </div>

    <MoleculesSearchInput
      v-model="searchQuery"
      placeholder="Поиск по названию и содержанию..."
      class="md:max-w-80.25"
    />
  </header>
</template>
