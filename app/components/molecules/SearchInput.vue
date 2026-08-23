<script setup lang="ts">
const modelValue = defineModel<string>({
  default: '',
});
</script>

<template>
  <div class="relative flex h-10 w-full">
    <input
      v-model="modelValue"
      type="text"
      class="h-full w-full rounded-card border-none bg-white px-2.5 pr-10 outline-none shadow-[0_2px_4px_0_rgba(0,0,0,0.05),0_1px_4px_0_rgba(0,0,0,0.05)]"
    />

    <button
      type="button"
      class="absolute top-1/2 right-3.25 flex -translate-y-1/2 items-center justify-center"
    >
      <svgo-loupe class="h-5 w-5" />
    </button>
  </div>
</template>
