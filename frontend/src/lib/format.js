const dateFormatter = new Intl.DateTimeFormat('id-ID', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
});

export const formatDate = (value) => {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);
  return dateFormatter.format(date);
};

export const cleanMultiline = (value = '') =>
  String(value)
    .replace(/&#10;|&#13;/g, '\n')
    .replace(/\r\n?/g, '\n');
