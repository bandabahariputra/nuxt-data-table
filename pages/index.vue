<script setup lang="ts">
import TaskTable from '~/features/task/components/TaskTable.vue';
</script>

<template>
  <div>
    <header class="border-accented/50 h-16 border-b">
      <UContainer
        as="nav"
        class="flex h-full items-center"
      >
        <a
          href="/"
          class="flex items-center gap-2"
        >
          <UIcon
            name="i-lucide-table-2"
            class="size-5"
          />
          <span class="hidden text-lg font-bold md:inline">NuxtDataTable</span>
        </a>
      </UContainer>
    </header>

    <UContainer>
      <ClientOnly>
        <template #fallback>
          <DataTableSkeleton
            :column-count="4"
            :cell-widths="['10%', '60%', '20%', '10%']"
          />
        </template>

        <TaskTable />
      </ClientOnly>
    </UContainer>
  </div>
</template>
