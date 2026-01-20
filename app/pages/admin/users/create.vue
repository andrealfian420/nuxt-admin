<template>
  <div>
    <div
      class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 space-y-6 mb-2"
    >
      <div class="mb-0">
        <h1 class="text-2xl font-bold text-slate-900">Create User</h1>
        <UBreadcrumb
          :items="links"
          class="my-2"
          :ui="{
            linkLabel:
              'cursor-pointer hover:text-[#00c951] hover:font-semibold',
          }"
        />
      </div>
      <div class="flex gap-2">
        <UButton
          class="flex items-center justify-center mb-4 md:mb-0 w-48 gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 rounded-xl shadow-lg shadow-emerald-600/20 transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed mt-2 cursor-pointer"
          icon="i-lucide-move-left"
          label="Back to Users"
          to="/admin/users"
        />
      </div>
    </div>

    <UCard>
      <AdminUsersForm
        action="/api/users"
        method="POST"
        @success="handleSuccess"
      />
    </UCard>
  </div>
</template>

<script setup>
const router = useRouter();

definePageMeta({
  layout: 'dashboard',
});

useHead({
  title: 'Web Admin - Create New User',
});

// breadcrumb links
const links = ref([
  {
    label: 'Dashboard',
    icon: 'i-lucide-layout-dashboard',
    to: '/admin/dashboard',
  },
  {
    label: 'User Management',
    icon: 'i-lucide-users',
    to: '/admin/users',
  },
  {
    label: 'Create User',
    icon: 'i-lucide-user-plus',
    to: '/admin/users/create',
  },
]);

const handleSuccess = () => {
  router.push('/admin/users');
};
</script>
