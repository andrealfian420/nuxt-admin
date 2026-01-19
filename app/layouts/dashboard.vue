<template>
  <div
    class="flex h-screen font-sans bg-slate-50 text-slate-800 overflow-hidden"
  >
    <AdminSidebar />

    <div
      class="flex-1 flex flex-col transition-all duration-300"
      :class="{ 'lg:ml-64': isOpen }"
    >
      <!-- Header tetap -->
      <AdminHeader />

      <!-- MAIN: scroll di sini -->
      <main class="flex-1 overflow-y-auto p-6 sm:p-10 space-y-8">
        <slot />
      </main>

      <!-- Footer tidak pernah hilang -->
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
