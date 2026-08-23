<script setup lang="ts">
import type { NewsItem } from '~/types/news';
import type { NewsViewType } from '~/types/view';

defineProps<{
  items: NewsItem[];
  viewType: NewsViewType;
  page: number;
  totalItems: number;
  basePath: string;
}>();
</script>

<template>
  <div class="mb-15">
    <OrganismsNewsList
      v-if="items?.length > 0"
      :items="items"
      :view-type="viewType"
    />

    <div
      v-else
      class="flex flex-col items-center justify-center py-16 text-center px-4"
    >
      <h2 class="text-xl font-bold text-black mb-2">
        {{
          totalItems > 0
            ? 'Страница не найдена'
            : 'По вашему запросу ничего не найдено'
        }}
      </h2>

      <p class="text-sm text-gray-200 max-w-sm leading-5">
        {{
          totalItems > 0
            ? `Вы перешли на несуществующую страницу. Всего доступно страниц: ${Math.ceil(totalItems / 10)}.`
            : 'Попробуйте изменить ключевые слова, проверить орфографию или сбросить фильтры в шапке сайта.'
        }}
      </p>
    </div>

    <MoleculesPagination
      v-if="totalItems > 0"
      :page="page"
      :total-items="totalItems"
      :base-path="basePath"
    />
  </div>
</template>
