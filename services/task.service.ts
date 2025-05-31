import { TaskRepository } from '~/repositories/task.repository';

export class TaskService {
  constructor(private readonly repository: TaskRepository) {}

  async getTasks({
    page = 1,
    perPage = 10,
    search,
  }: {
    page?: number;
    perPage?: number;
    search?: string;
  }) {
    const response = await this.repository.fetchTasks({
      page,
      perPage,
      search,
    });

    return transformResult(response);
  }
}

let instance: TaskService | null = null;

export const getTaskService = () => {
  if (!instance) {
    instance = new TaskService(new TaskRepository());
  }
  return instance;
};
