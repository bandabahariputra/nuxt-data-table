<script setup lang="ts">
withDefaults(
  defineProps<{
    isLoading?: boolean;
  }>(),
  {
    isLoading: false,
  },
);
</script>

<template>
  <thead
    class="relative [&_tr]:border-b"
    :class="[
      isLoading &&
        'after:bg-primary after:absolute after:inset-x-0 after:bottom-0 after:h-px after:animate-[carousel_2s_ease-in-out_infinite] rtl:after:animate-[carousel-rtl_2s_ease-in-out_infinite]',
    ]"
  >
    <slot />
  </thead>
</template>
