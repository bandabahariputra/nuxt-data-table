export const addQueryParamsToUrl = (
  url: string,
  params: Record<string, string | number | boolean | undefined | null>,
): string => {
  const urlObj = new URL(
    url,
    typeof window !== 'undefined' ? window.location.origin : 'http://localhost',
  );

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      urlObj.searchParams.set(key, String(value));
    }
  });

  return urlObj.toString();
};
