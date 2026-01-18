<template>
  <header
    class="h-20 bg-white/80 backdrop-blur-md sticky top-0 z-40 border-b border-slate-200 px-6 sm:px-10 flex items-center justify-between"
  >
    <button
      type="button"
      @click.prevent="toggle"
      class="mr-4 rounded-lg text-slate-500 hover:text-slate-700 transition-colors focus:outline-none cursor-pointer"
      aria-label="Toggle Menu"
    >
      <Icon name="lucide:menu" class="w-10 h-10" />
    </button>

    <div class="flex-1"></div>
  </header>
</template>

<script setup>
const { isOpen, toggle } = useSidebar();
</script>
