<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    columnCount: number;
    rowCount?: number;
    cellWidths?: string[];
  }>(),
  {
    rowCount: 10,
    cellWidths: () => ['auto'],
  },
);

const cozyCellWidths = Array.from(
  { length: props.columnCount },
  (_, index) => props.cellWidths[index % props.cellWidths.length] ?? 'auto',
);
</script>

<template>
  <div>
    <div class="flex justify-end py-4">
      <USkeleton class="h-7 w-28" />
    </div>

    <Table>
      <TableHeader>
        <TableRow>
          <TableHead
            v-for="(__, cellIndex) in Array.from({ length: columnCount })"
            :key="`skeleton-head-row-${cellIndex}`"
            :style="{
              width: cozyCellWidths[cellIndex],
            }"
          >
            <USkeleton class="h-5 w-2/3" />
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow
          v-for="(_, rowIndex) in Array.from({ length: rowCount })"
          :key="`skeleton-body-row-${rowIndex}`"
        >
          <TableCell
            v-for="(__, cellIndex) in Array.from({ length: columnCount })"
            :key="`skeleton-body-cell-${cellIndex}`"
          >
            <USkeleton class="h-5" />
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>

    <div class="flex justify-between py-4">
      <div class="flex items-center gap-2">
        <USkeleton class="h-7 w-24" />
        <USkeleton class="h-7 w-16" />
      </div>
      <USkeleton class="h-7 w-56" />
    </div>
  </div>
</template>
