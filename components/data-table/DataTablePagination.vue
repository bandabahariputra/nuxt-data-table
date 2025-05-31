<script setup lang="ts">
import type { Table } from '@tanstack/vue-table';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type TData = any;

const props = defineProps<{
  table: Table<TData>;
  pageSizeOptions?: number[];
}>();

const pageSizeOptions = props.pageSizeOptions ?? [10, 20, 30, 40, 50];

const page = computed({
  get: () => props.table.getState().pagination.pageIndex + 1,
  set: (value) => {
    props.table.setPageIndex(value - 1);
  },
});
const itemsPerPage = computed({
  get: () => props.table.getState().pagination.pageSize,
  set: (value) => {
    props.table.setPageSize(value);
  },
});
const total = computed(
  () => props.table.getPageCount() * props.table.getState().pagination.pageSize,
);
</script>

<template>
  <div
    class="flex flex-col items-center justify-between gap-4 py-4 md:flex-row"
  >
    <div class="flex items-center gap-2">
      <p class="text-sm">Rows per page</p>
      <USelect
        v-model="itemsPerPage"
        :items="pageSizeOptions"
        aria-label="itemsPerPage"
      />
    </div>
    <UPagination
      v-model:page="page"
      :items-per-page="itemsPerPage"
      :total="total"
    />
  </div>
</template>
