import { getTaskService } from '~/services/task.service';

export const getTasks = async ({
  page,
  perPage,
  search,
}: {
  page: number;
  perPage: number;
  search?: string;
}) => {
  const { data, error } = await getTaskService().getTasks({
    page,
    perPage,
    search,
  });

  if (error || !data) {
    return {
      data: [],
      total: 0,
    };
  }

  return {
    data: data.data,
    total: data.total,
  };
};
