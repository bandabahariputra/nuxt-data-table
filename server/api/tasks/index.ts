import type { Prisma } from '@prisma/client';
import prisma from '~/server/lib/prisma';
import type { Task, TaskLabel, TaskPriority, TaskStatus } from '~/types/task';

export default defineEventHandler(async (event) => {
  const query = getQuery(event);

  const page = query.page ? Number(query.page) : 1;
  const take = query.perPage ? Number(query.perPage) : 10;
  const skip = (page - 1) * take;
  const search = query.search ? String(query.search) : '';

  const taskWhereInput: Prisma.TaskWhereInput = {
    OR: [
      {
        code: {
          contains: search,
          mode: 'insensitive',
        },
      },
      {
        title: {
          contains: search,
          mode: 'insensitive',
        },
      },
    ],
  };

  const [tasks, total] = await Promise.all([
    prisma.task.findMany({
      select: {
        code: true,
        title: true,
        label: true,
        status: true,
        priority: true,
      },
      where: search !== '' ? taskWhereInput : undefined,
      orderBy: [
        {
          createdAt: 'desc',
        },
        {
          title: 'asc',
        },
      ],
      take,
      skip,
    }),
    prisma.task.count({
      where: search !== '' ? taskWhereInput : undefined,
    }),
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
      page,
      perPage: take,
    },
  };
});
