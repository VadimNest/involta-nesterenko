export const RSS_SOURCES: Record<string, string> = {
  'mos-ru':
    'https://www.mos.ru/api/aggregation/v1/frontend/rss/ru/google-news-sitemap',
  'lenta-ru': 'https://lenta.ru/rss/news',
};

export const SOURCE_LABELS: Record<string, string> = {
  'mos-ru': 'Mos.ru',
  'lenta-ru': 'Lenta.ru',
};

export const HTML_TAGS_REGEXP = /<[^>]*>/g;
