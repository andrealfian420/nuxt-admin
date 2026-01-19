<template>
  <div class="flex min-h-screen font-sans bg-slate-50 text-slate-800">
    <AdminSidebar />

    <div
      class="flex-1 flex flex-col transition-all duration-300"
      :class="{ 'lg:ml-64': isOpen }"
    >
      <AdminHeader />

      <main class="flex-1 p-6 sm:p-10 space-y-8">
        <slot />
      </main>

      <AdminFooter />
    </div>
  </div>
</template>

<script setup>
const { isOpen, checkScreenSize } = useSidebar();

onMounted(() => {
  checkScreenSize();
  window.addEventListener('resize', checkScreenSize);
});
</script>
