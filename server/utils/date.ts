export const formatDate = (dateStr?: string): string => {
  if (!dateStr) return '19.08.2026';

  const dateObj = new Date(dateStr);

  return isNaN(dateObj.getTime())
    ? '19.08.2026'
    : dateObj.toLocaleDateString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      });
};
