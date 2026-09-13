// Shares one /api/coding-stats request between every component on the page.
let request: Promise<unknown> | null = null;

export function fetchCodingStats<T>() {
  request ??= fetch("/api/coding-stats")
    .then((response) => (response.ok ? response.json() : null))
    .catch(() => null)
    .then((data) => {
      if (data === null) {
        // Allow a later mount to retry after a failed request.
        request = null;
      }
      return data;
    });

  return request as Promise<T | null>;
}
