<script setup lang="ts">
const route = useRoute();
const router = useRouter();

const props = defineProps<{
  page: number;
  totalItems: number;
  basePath: string;
}>();

const currentPage = computed({
  get: () => props.page,
  set: (newPage) => {
    router.push({
      path: `${props.basePath}/${newPage}`,
      query: { ...route.query },
    });
  },
});

const generateUrl = (pageNumber: number) => {
  return {
    path: `${props.basePath}/${pageNumber}`,
    query: { ...route.query },
  };
};

const paginationUiConfig = {
  root: 'flex justify-center items-center mt-[48px]',
  list: 'flex items-end gap-5',
  ellipsis:
    'flex text-black font-sans text-[18px] font-bold leading-normal no-underline cursor-default pointer-events-none select-none',
  item: 'justify-center items-center h-6 p-0 border-none shadow-none rounded-none bg-transparent hover:bg-transparent transition-colors duration-200 focus:ring-0 focus-visible:ring-0 font-sans text-[18px] font-bold leading-normal text-black no-underline hover:text-primary data-[selected=true]:text-primary data-[active=true]:pointer-events-none text-center',
};
</script>

<template>
  <UPagination
    v-if="totalItems > 0"
    v-model:page="currentPage"
    :total="totalItems"
    :to="generateUrl"
    :sibling-count="1"
    :show-controls="false"
    :ui="paginationUiConfig"
    show-edges
  />
</template>
