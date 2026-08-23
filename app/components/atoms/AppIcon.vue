<script setup lang="ts">
defineProps({
  icon: {
    type: Object,
    required: true,
  },
  name: {
    type: String,
    required: false,
    default: undefined,
  },
  filled: {
    type: Boolean,
    required: false,
    default: true,
  },
  fontControlled: {
    type: Boolean,
    required: false,
    default: false,
  },
});
</script>

<template>
  <component
    :is="icon"
    :class="{
      'mb-[0.125em] h-[1em] w-[1em] align-middle': fontControlled,
      'fill-current **:fill-current': !filled,
    }"
  />
</template>
