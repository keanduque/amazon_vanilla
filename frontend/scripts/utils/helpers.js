export function getCurrentPage(url) {
  const extractUrl = url.split("/");
  const page = extractUrl[5].slice(0, -5);

  return page;
}

export const formatPrice = (price) => (price / 100).toFixed(2);
