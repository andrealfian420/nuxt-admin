<template>
  <div>
    <div
      class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 space-y-6 mb-2"
    >
      <div class="mb-0">
        <h1 class="text-2xl font-bold text-slate-900">Edit User</h1>
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
      <div v-if="pending" class="space-y-4">
        <USkeleton class="h-10 w-full" />
        <USkeleton class="h-10 w-full" />
      </div>

      <AdminUsersForm
        v-else
        :action="`/api/users/${slug}`"
        :user="user"
        method="PUT"
        @success="handleSuccess"
      />
    </UCard>
  </div>
</template>

<script setup>
const route = useRoute();
const router = useRouter();
const slug = route.params.slug;

definePageMeta({
  layout: 'dashboard',
});

useHead({
  title: 'Web Admin - Edit User',
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
    label: 'Edit User',
    icon: 'i-lucide-user-pen',
    to: `/admin/users/${slug}`,
  },
]);

const {
  data: userData,
  pending,
  error,
} = await useFetch(`/api/users/${slug}`, {
  key: `user-${slug}`,
});

const user = computed(() => {
  if (!userData.value) return {};

  return {
    name: userData.value.name,
    email: userData.value.email,
    role: userData.value.role,
    status: userData.value.status,
    avatar: null,
    avatar_url: userData.value.avatar,
  };
});

if (error.value) {
  router.push('/admin/users');
  toast.add({
    title: 'Error',
    description: error.value,
    icon: 'i-lucide-x',
  });
}

const handleSuccess = () => {
  router.push('/admin/users');
};
</script>
