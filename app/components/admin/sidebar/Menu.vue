<template>
  <nav class="flex-1 p-4 space-y-2 overflow-y-auto">
    <AdminSidebarMenuItem
      v-for="item in items"
      :key="item.key"
      :item="item"
      @click="onItemClick"
    />
  </nav>
</template>

<script setup>
defineProps({
  items: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(['item-click']);

const onItemClick = () => {
  emit('item-click');
};
</script>
