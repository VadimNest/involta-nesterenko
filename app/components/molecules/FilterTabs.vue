<script setup lang="ts">
interface FilterTab {
  id: number;
  title: string;
  value: string;
}

defineProps<{
  items: FilterTab[];
  active: string;
}>();

const emit = defineEmits<{
  change: [value: string];
}>();
</script>

<template>
  <div class="flex items-center">
    <button
      v-for="tab in items"
      :key="tab.id"
      type="button"
      role="tab"
      class="mr-4 inline-block text-sm font-bold last:mr-0 transition-transform duration-300 lg:hover:scale-[1.04]"
      :class="active === tab.value ? 'text-black' : 'text-primary'"
      :aria-selected="active === tab.value"
      @click="emit('change', tab.value)"
    >
      {{ tab.title }}
    </button>
  </div>
</template>
