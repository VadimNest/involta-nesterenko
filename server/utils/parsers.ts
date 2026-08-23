import type { NewsItem } from '~/types/news';

export const parseMosRu = (
  jsonObj: Record<string, any>,
  label: string,
): NewsItem[] => {
  const urlset = jsonObj?.urlset?.url;

  if (!urlset) return [];

  const newsItems: NewsItem[] = [];
  const rawItems = Array.isArray(urlset) ? urlset : [urlset];

  for (let i = 0; i < rawItems.length; i++) {
    const item = rawItems[i];
    const newsBlock = item['news:news'] || item?.news;

    if (!newsBlock) continue;

    newsItems.push({
      id: 0,
      title: String(newsBlock['news:title'] || newsBlock?.title || ''),
      description:
        'Свежие новости и события столицы на официальном портале Мэра Москвы.',
      source: label,
      date: formatDate(
        newsBlock['news:publication_date'] || newsBlock?.publication_date,
      ),
      link: String(item.loc || ''),
    });
  }

  return newsItems;
};

export const parseLentaRu = (
  jsonObj: Record<string, any>,
  label: string,
): NewsItem[] => {
  const rssRoot = jsonObj?.rss || jsonObj?.RSS;
  const items = rssRoot?.channel?.item;
  if (!items) return [];

  const newsItems: NewsItem[] = [];
  const rawItems = Array.isArray(items) ? items : [items];

  for (let i = 0; i < rawItems.length; i++) {
    const item = rawItems[i];

    const rawTitle = item.title;
    const title =
      typeof rawTitle === 'object'
        ? rawTitle?.__cdata || rawTitle?.['#text'] || ''
        : rawTitle || '';

    const rawDesc = item.description;
    let description =
      typeof rawDesc === 'object'
        ? rawDesc?.__cdata || rawDesc?.['#text'] || ''
        : rawDesc || '';

    description = String(description).replace(HTML_TAGS_REGEXP, '').trim();

    if (!description) {
      description = `Читайте подробности события «${title}» в официальном источнике новостного издания Lenta.ru.`;
    }

    const imageUrl =
      item?.enclosure?.['@_url'] || item?.enclosure?.url || undefined;

    newsItems.push({
      id: 0,
      title: String(title),
      description: description,
      source: label,
      date: formatDate(item.pubDate || item.date),
      link: String(item.link || ''),
      image: imageUrl ? String(imageUrl) : undefined,
    });
  }

  return newsItems;
};
