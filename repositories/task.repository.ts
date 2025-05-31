import type { ApiResponse } from 'apisauce';
import type { ApiPagination, ApiResult } from '~/types/api/api-result';
import type { Task } from '~/types/task';

import { api } from './api';

export class TaskRepository {
  fetchTasks({
    page = 1,
    perPage = 10,
    search,
  }: {
    page?: number;
    perPage?: number;
    search?: string;
  }): Promise<ApiResponse<ApiResult<ApiPagination<Task[]>>>> {
    return api.get<ApiResult<ApiPagination<Task[]>>>(
      addQueryParamsToUrl('/api/tasks', {
        page,
        perPage,
        search,
      }),
    );
  }
}
