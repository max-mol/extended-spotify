export const imageLoader = (url: string, width?: number) => {
  return width ? `${url}?w=${width}&q=75` : `${url}?q=75`;
};
