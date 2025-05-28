export type ApiResult<T> = {
  data?: T;
  code?: string;
};

export type ApiPagination<T> = {
  data: T;
  page: number;
  perPage: number;
  total: number;
};

export type TransformedResponse<T> = {
  data: T | null;
  error: string | null;
};
