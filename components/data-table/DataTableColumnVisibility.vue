<script setup lang="ts">
import type { Table } from '@tanstack/vue-table';
import { upperFirst } from 'scule';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type TData = any;

const props = defineProps<{
  table: Table<TData>;
}>();

const columnItems = computed(() => {
  return props.table
    .getAllColumns()
    .filter((column) => column.getCanHide())
    .map((column) => ({
      label: upperFirst(column.id),
      type: 'checkbox' as const,
      checked: column.getIsVisible(),
      onUpdateChecked: (checked: boolean) => {
        props.table?.getColumn(column.id)?.toggleVisibility(!!checked);
      },
      onSelect: (e?: Event) => {
        e?.preventDefault();
      },
    }));
});
</script>

<template>
  <div class="flex justify-end py-4">
    <UDropdownMenu
      :items="[columnItems]"
      :content="{ align: 'end' }"
    >
      <UButton
        label="Columns"
        color="neutral"
        variant="outline"
        trailing-icon="i-heroicons-chevron-down-20-solid"
      />
    </UDropdownMenu>
  </div>
</template>
