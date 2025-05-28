import { TaskRepository } from '~/repositories/task.repository';

export class TaskService {
  constructor(private readonly repository: TaskRepository) {}

  async getTasks({
    page = 1,
    perPage = 10,
  }: {
    page?: number;
    perPage?: number;
  }) {
    const response = await this.repository.fetchTasks({
      page,
      perPage,
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
