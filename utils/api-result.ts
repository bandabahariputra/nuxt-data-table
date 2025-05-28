import type { ApiResponse } from 'apisauce';
import type { ApiResult, TransformedResponse } from '~/types/api/api-result';

export const transformResult = <T>(
  response: ApiResponse<ApiResult<T>>,
): TransformedResponse<T> => {
  let error: string | null = null;

  if (response.problem) {
    error = 'Response Problem';
  }

  if (response.status && response.status >= 400) {
    error = 'Response Status >= 400';
  }

  return {
    data: error ? null : (response.data?.data ?? null),
    error,
  };
};
