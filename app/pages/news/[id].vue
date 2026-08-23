<script setup lang="ts">
import type { NewsViewType } from '~/types/view';
import type { NewsItem } from '~/types/news';

const route = useRoute();

const viewType = useCookie<NewsViewType>('news-view-type', {
  default: () => 'grid',
});

const currentNewsPage = computed(() => Number(route.params.id) || 1);

const totalNewsCount = ref(25);

const newsItems = ref<NewsItem[]>([
  {
    id: 1,
    title: 'Первые земельные участки реализованы на специальных торгах для малого бизнеса',
    description: 'На каждый участок претендовали в среднем шесть участников. Стоимость одной из сделок выросла в ходе аукциона в рекордные 26 раз. Все подробности соглашений доступны на официальном портале.',
    source: 'Mos.ru',
    date: '23.08.2026',
    link: 'https://mos.ru',
  },
  {
    id: 2,
    title: 'ЦСКА сыграет с «Локомотивом» в центральном матче тура РПЛ',
    description: 'Московское дерби пройдет на домашнем стадионе армейцев. Тренерские штабы уже определились со стартовыми составами команд на эту игру. Читайте подробности события в источнике.',
    source: 'Lenta.ru',
    date: '22.08.2026',
    link: 'https://lenta.ru',
    image: 'https://lenta.ru',
  },
  {
    id: 3,
    title: 'Короткий заголовок',
    description: 'Тестовое описание для проверки минимальной высоты заголовка (min-h) в режиме сетки grid на десктопе. Короткие заголовки не должны ломать ровную линию подвалов карточек.',
    source: 'Mos.ru',
    date: '21.08.2026',
    link: 'https://mos.ru',
  }
]);
</script>

<template>
  <div :key="route.fullPath" class="container mx-auto px-4 py-6">
    <OrganismsNewsFeed
      :items="newsItems"
      :view-type="viewType"
      :page="currentNewsPage"
      :total-items="totalNewsCount"
      base-path="/news"
    />
  </div>
</template>
