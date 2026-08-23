<script setup lang="ts">
import type { NewsViewType } from '~/types/view';
import svgoList from '@/assets/icons/list.svg';
import svgoGrid from '@/assets/icons/grid.svg';

const props = defineProps<{
  value: NewsViewType;
}>();

const emit = defineEmits<{
  change: [value: NewsViewType];
}>();

const controls = [
  {
    id: 'list',
    icon: svgoList,
  },
  {
    id: 'grid',
    icon: svgoGrid,
  },
] as const;
</script>

<template>
  <div class="flex items-center">
    <button
      v-for="control in controls"
      :key="control.id"
      type="button"
      class="mr-2.5 flex items-center justify-center last:mr-0 group"
      :class="{
        '[&_path]:fill-primary': props.value === control.id,
      }"
      @click="emit('change', control.id)"
    >
      <component
        :is="control.icon"
        class="size-4.5 transition-transform duration-200 ease-in-out lg:hover:scale-110"
      />
    </button>
  </div>
</template>
