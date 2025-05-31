<script setup lang="ts">
import { FlexRender, type Table } from '@tanstack/vue-table';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type TData = any;

withDefaults(
  defineProps<{
    table: Table<TData>;
    options?: {
      isLoading?: boolean;
    };
  }>(),
  {
    options: () => ({
      isLoading: false,
    }),
  },
);
</script>

<template>
  <div>
    <div
      class="flex flex-col items-center justify-between gap-4 py-4 md:flex-row"
    >
      <DataTableSearch
        :table="table"
        placeholder="Search code or title..."
      />
      <DataTableColumnVisibility :table="table" />
    </div>

    <Table>
      <TableHeader :is-loading="options?.isLoading">
        <TableRow
          v-for="headerGroup in table.getHeaderGroups()"
          :key="headerGroup.id"
        >
          <TableHead
            v-for="header in headerGroup.headers"
            :key="header.id"
          >
            <FlexRender
              :render="header.column.columnDef.header"
              :props="header.getContext()"
            />
          </TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        <TableRow
          v-for="row in table.getRowModel().rows"
          :key="row.id"
        >
          <TableCell
            v-for="cell in row.getVisibleCells()"
            :key="cell.id"
          >
            <FlexRender
              :render="cell.column.columnDef.cell"
              :props="cell.getContext()"
            />
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>

    <DataTablePagination :table="table" />
  </div>
</template>
