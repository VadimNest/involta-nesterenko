<script setup lang="ts">
import type { NewsItem } from '~/types/news';
import type { NewsViewType } from '~/types/view';

defineProps<{
  item: NewsItem;
  viewType: NewsViewType;
}>();
</script>

<template>
  <NuxtLink
    :to="item.link"
    target="_blank"
    rel="noopener noreferrer"
    :class="[
      'w-full h-auto rounded-card bg-white shadow-card transition-transform duration-300 no-underline',
      'lg:hover:scale-[1.01]',
      viewType === 'grid'
        ? 'flex flex-col justify-between px-5.5 pt-7.5 lg:px-7.5'
        : 'block px-5.5 pt-5 lg:grid lg:grid-cols-[200px_auto] lg:gap-x-7.5 lg:gap-y-7 lg:px-7.5 lg:pt-7.5',
    ]"
  >
    <div
      v-if="viewType === 'list' && item.image"
      class="mb-5 flex h-41.5 w-full md:h-120.75 lg:mb-0 lg:h-25"
    >
      <img
        :src="item.image"
        alt="Иллюстрация к новости"
        class="h-full w-full object-cover"
        loading="lazy"
      />
    </div>

    <div
      :class="[
        'mb-3',
        viewType === 'list' ? 'lg:mb-0' : 'lg:mb-3.75',
        !item.image && viewType === 'list' && 'lg:col-span-2',
      ]"
    >
      <h3
        :class="[
          'mb-5 text-[18px] font-bold leading-5.5 text-primary line-clamp-3',
          viewType === 'grid' && 'lg:mb-6.5 lg:min-h-16.5',
        ]"
      >
        {{ item.title }}
      </h3>

      <p
        :class="[
          'mb-5 text-sm leading-5 text-black line-clamp-3',
          viewType === 'list' && 'lg:mb-0',
        ]"
      >
        {{ item.description }}
      </p>

      <span
        :class="[
          'block w-fit border-b border-primary text-sm leading-5 text-primary',
          viewType === 'list' && 'lg:hidden',
        ]"
      >
        Подробнее
      </span>
    </div>

    <div
      :class="[
        'relative flex w-full items-center justify-between py-1 lg:col-span-2',
        'before:absolute before:inset-y-0 before:-left-5.5 before:-right-5.5 before:z-0 before:rounded-card before:bg-gray-100 before:content-[\'\']',
        'lg:before:-left-7.5 lg:before:-right-7.5',
        viewType === 'grid' ? 'lg:pb-4 lg:before:hidden' : '',
      ]"
    >
      <span class="relative z-10 text-sm leading-5 text-gray-200">
        {{ item.source }}
      </span>

      <time
        :datetime="item.date"
        class="relative z-10 text-sm leading-5 text-gray-200"
      >
        {{ item.date }}
      </time>
    </div>
  </NuxtLink>
</template>
