<script setup lang="ts">
import type { Table } from '@tanstack/vue-table';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type TData = any;

const props = withDefaults(
  defineProps<{
    table: Table<TData>;
    placeholder?: string;
  }>(),
  {
    placeholder: 'Search...',
  },
);

const text = computed({
  get: () => props.table.getState().globalFilter,
  set: (value) => {
    props.table.setGlobalFilter(value);
  },
});
</script>

<template>
  <UInput
    v-model="text"
    :placeholder="placeholder"
  />
</template>
