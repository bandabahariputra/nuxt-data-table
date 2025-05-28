import { faker } from '@faker-js/faker';
import {
  PrismaClient,
  TaskLabel,
  TaskPriority,
  TaskStatus,
} from '@prisma/client';
import { customAlphabet } from 'nanoid';

const prisma = new PrismaClient();

async function main() {
  const TOTAL_TASKS = 100;

  const tasks = Array.from({ length: TOTAL_TASKS }).map(() => ({
    code: `TASK-${customAlphabet('0123456789', 4)()}`,
    title: faker.hacker
      .phrase()
      .replace(/^./, (letter) => letter.toUpperCase()),
    estimatedHours: faker.number.int({ min: 1, max: 24 }),
    status:
      faker.helpers.shuffle(Object.values(TaskStatus))[0] ?? TaskStatus.TODO,
    label:
      faker.helpers.shuffle(Object.values(TaskLabel))[0] ?? TaskLabel.FEATURE,
    priority:
      faker.helpers.shuffle(Object.values(TaskPriority))[0] ?? TaskPriority.LOW,
    isArchived: faker.datatype.boolean({ probability: 0.2 }),
  }));

  await prisma.task.createMany({
    data: tasks,
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
