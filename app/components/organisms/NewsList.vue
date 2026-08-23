<script setup lang="ts">
import type { NewsItem } from '~/types/news';
import type { NewsViewType } from '~/types/view';

defineProps<{
  items: NewsItem[];
  viewType: NewsViewType;
}>();
</script>

<template>
  <div
    :class="[
      'grid grid-cols-1 gap-5',
      {
        'md:grid-cols-2': viewType === 'grid',
      },
    ]"
  >
    <MoleculesNewsCard
      v-for="item in items"
      :key="item.id"
      :item="item"
      :view-type="viewType"
    />
  </div>
</template>
