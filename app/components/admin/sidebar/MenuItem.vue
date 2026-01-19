<template>
  <div v-if="item.separator" class="border-t border-slate-100 my-4" />

  <div v-else-if="item.children">
    <button
      type="button"
      @click="toggleMenu"
      class="group flex w-full items-center gap-3 px-4 py-3 rounded-xl transition-all cursor-pointer"
      :class="[
        isActive
          ? 'bg-emerald-50 text-emerald-700 font-semibold'
          : 'text-slate-600 hover:bg-emerald-50 hover:text-emerald-700',
      ]"
    >
      <Icon
        :name="item.icon"
        class="w-5 h-5 transition-colors"
        :class="
          isActive
            ? 'text-emerald-700'
            : 'text-slate-400 group-hover:text-emerald-600'
        "
      />
      <span class="text-sm font-medium flex-1 text-left">{{ item.label }}</span>

      <Icon
        name="i-lucide-chevron-down"
        class="w-4 h-4 transition-transform"
        :class="isOpen ? 'rotate-180' : ''"
      />
    </button>

    <div v-show="isOpen || isActive" class="mt-1 ml-6 space-y-1">
      <AdminSidebarMenuItem
        v-for="child in item.children"
        :key="child.key"
        :item="child"
        @click="$emit('click')"
      />
    </div>
  </div>

  <NuxtLink
    v-else
    :to="item.to"
    @click="$emit('click')"
    class="group flex items-center gap-3 px-4 py-3 rounded-xl transition-all"
    :class="[
      isActive
        ? 'bg-emerald-50 text-emerald-700 font-semibold'
        : 'text-slate-600 hover:bg-emerald-50 hover:text-emerald-700',
    ]"
  >
    <Icon
      :name="item.icon"
      class="w-5 h-5 transition-colors"
      :class="
        isActive
          ? 'text-emerald-700'
          : 'text-slate-400 group-hover:text-emerald-600'
      "
    />
    <span class="text-sm font-medium">{{ item.label }}</span>
  </NuxtLink>
</template>

<script setup>
const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(['click']);
const route = useRoute();
const isOpen = ref(false);

const isActive = computed(() => {
  if (props.item.to) {
    return route.path.startsWith(props.item.to);
  }
  if (props.item.children) {
    return props.item.children.some((child) => route.path.startsWith(child.to));
  }
  return false;
});

const toggleMenu = () => {
  isOpen.value = !isOpen.value;
};

onMounted(() => {
  if (props.item.children && isActive.value) {
    isOpen.value = true;
  }
});
</script>
