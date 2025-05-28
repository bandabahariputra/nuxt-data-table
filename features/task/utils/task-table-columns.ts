import type { ColumnDef } from '@tanstack/vue-table';
import type { Task } from '~/types/task';

export const getTaskTableColumns = (): ColumnDef<Task>[] => {
  return [
    {
      accessorKey: 'code',
      header: 'Code',
    },
    {
      accessorKey: 'title',
      header: 'Title',
    },
    {
      accessorKey: 'label',
      header: 'Label',
    },
    {
      accessorKey: 'status',
      header: 'Status',
    },
    {
      accessorKey: 'priority',
      header: 'Priority',
    },
  ];
};
