import prisma from '~/server/lib/prisma';
import type { Task, TaskLabel, TaskPriority, TaskStatus } from '~/types/task';

export default defineEventHandler(async (event) => {
  const query = getQuery(event);

  const take = query.perPage ? Number(query.perPage) : 10;
  const skip = query.page ? (Number(query.page ?? 0) - 1) * take : 0;

  const [tasks, total] = await Promise.all([
    prisma.task.findMany({
      select: {
        code: true,
        title: true,
        label: true,
        status: true,
        priority: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take,
      skip,
    }),
    prisma.task.count(),
  ]);

  const data: Task[] = tasks.map((task) => ({
    code: task.code,
    title: task.title,
    label: task.label as TaskLabel,
    status: task.status as TaskStatus,
    priority: task.priority as TaskPriority,
  }));

  return {
    data: {
      data,
      total,
      page: skip + 1,
      perPage: take,
    },
  };
});
