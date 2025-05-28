import { getTaskService } from '~/services/task.service';

export const getTasks = async ({
  page,
  perPage,
}: {
  page: number;
  perPage: number;
}) => {
  const { data, error } = await getTaskService().getTasks({ page, perPage });

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
