<script setup lang="ts">
import type { Task } from '~/types/task';

import { getTasks } from '../libs/get-tasks';
import { getTaskTableColumns } from '../utils/task-table-columns';

const { table, isLoading } = useDataTable<Task>({
  fetchKey: 'tasks',
  fetchFn: getTasks,
  columns: getTaskTableColumns(),
});
</script>

<template>
  <div>
    <DataTable
      :table="table"
      :options="{
        isLoading,
      }"
    />
  </div>
</template>
