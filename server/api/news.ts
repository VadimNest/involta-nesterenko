import { XMLParser } from 'fast-xml-parser';
import type { NewsItem } from '~/types/news';

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const sourceParam = (query.source as string) || 'all';
  const searchParam =
    typeof query.search === 'string' ? query.search.trim().toLowerCase() : '';

  const page = Math.max(1, Number(query.page) || 1);
  const limit = Math.max(1, Number(query.limit) || 10);

  const sourcesToFetch =
    sourceParam === 'all' ? Object.keys(RSS_SOURCES) : [sourceParam];
  const allNews: NewsItem[] = [];

  const parser = new XMLParser({
    ignoreAttributes: false,
    trimValues: true,
    parseAttributeValue: true,
    cdataPropName: '__cdata',
  });

  await Promise.allSettled(
    sourcesToFetch.map(async (key) => {
      const url = RSS_SOURCES[key];

      if (!url) return;

      try {
        const xmlText = await $fetch<string>(url, {
          responseType: 'text',
          headers: {
            Accept: 'application/xml, text/xml, */*',
            'User-Agent':
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          },
        });

        if (!xmlText || typeof xmlText !== 'string') return;

        const jsonObj = parser.parse(xmlText);

        const label = SOURCE_LABELS[key] || key;
        const parsedItems =
          key === 'mos-ru'
            ? parseMosRu(jsonObj, label)
            : parseLentaRu(jsonObj, label);
        allNews.push(...parsedItems);
      }
      catch (error: any) {
        const logger = useLogger('rss-parser');
        logger.error(
          `Failed to fetch or parse source [${key}]:`,
          error?.message || error,
        );
      }
    }),
  );

  const normalizedNews = allNews.map((news, index) => ({
    ...news,
    id: index + 1,
  }));

  let filteredNews = normalizedNews;

  if (searchParam) {
    filteredNews = normalizedNews.filter(
      (news) =>
        news.title.toLowerCase().includes(searchParam) ||
        news.description.toLowerCase().includes(searchParam),
    );
  }

  const totalItems = filteredNews.length;
  const startIndex = (page - 1) * limit;

  return {
    items: filteredNews.slice(startIndex, startIndex + limit),
    total: totalItems,
  };
});
