<template>
  <div>
    <div
      class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 space-y-6 mb-2"
    >
      <div class="mb-0">
        <h1 class="text-2xl font-bold text-slate-900">User Management</h1>
        <UBreadcrumb :items="links" class="my-2" />
      </div>
      <UButton
        class="flex items-center justify-center mb-4 md:mb-0 w-48 gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 rounded-xl shadow-lg shadow-emerald-600/20 transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed mt-2 cursor-pointer"
        icon="i-heroicons-plus"
        label="Add New User"
      />
    </div>

    <UCard
      :ui="{
        body: { padding: 'p-0 sm:p-0' },
        header: { padding: 'p-4 sm:px-6' },
      }"
    >
      <template #header>
        <div class="flex justify-between items-center gap-4">
          <div class="w-full sm:w-72">
            <UInput
              v-model="globalFilter"
              icon="i-heroicons-magnifying-glass-20-solid"
              placeholder="Search users..."
              color="white"
              :loading="isLoading"
            />
          </div>
        </div>
      </template>

      <UTable
        ref="table"
        :data="rows"
        :columns="columns"
        :loading="isLoading"
        class="flex-1"
      />

      <template #footer>
        <div
          class="flex flex-col sm:flex-row justify-between items-center gap-4 py-2"
        >
          <span class="text-sm text-slate-500">
            Showing
            <span class="font-medium">{{ (page - 1) * pageCount + 1 }}</span> to
            <span class="font-medium">{{
              Math.min(page * pageCount, totalData)
            }}</span>
            of
            <span class="font-medium">{{ totalData }}</span> results
          </span>

          <UPagination
            v-model="page"
            :page-count="pageCount"
            :total="totalData"
            :active-button="{ color: 'emerald', variant: 'solid' }"
            :inactive-button="{ color: 'gray', variant: 'ghost' }"
          />
        </div>
      </template>
    </UCard>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'dashboard',
});

useHead({
  title: 'Web Admin - Users',
});

// Table Columns
const columns = [
  {
    accessorKey: 'id',
    header: '#',
    label: 'ID',
    cell: ({ row }) => row.getValue('id'),
  },
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => row.getValue('name'),
    sortable: true,
  },
  {
    accessorKey: 'email',
    header: 'Email',
    cell: ({ row }) => row.getValue('email'),
    sortable: true,
  },
  {
    accessorKey: 'role',
    header: 'Role',
    cell: ({ row }) => row.getValue('role'),
    sortable: true,
  },
  {
    accessorKey: 'status',
    header: 'Status',
    meta: {
      th: 'text-right',
      td: 'text-right font-medium',
    },
    cell: ({ row }) => {
      const statusVal = row.getValue('status');
      const colorMap = { Active: 'success', Inactive: 'error' };

      return h(
        UBadge,
        {
          class: 'capitalize',
          variant: 'subtle',
          color: colorMap[statusVal] || 'gray',
        },
        () => statusVal,
      );
    },
    sortable: true,
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => {
      return h(
        UDropdownMenu,
        {
          content: {
            align: 'end',
          },
          items: getRowItems(row),
          'aria-label': 'Actions dropdown',
          ui: {
            item: 'cursor-pointer hover:bg-emerald-50 hover:text-emerald-700! hover:font-semibold transition-colors',
          },
        },
        () =>
          h(UButton, {
            icon: 'i-lucide-ellipsis-vertical',
            color: 'neutral',
            variant: 'ghost',
            'aria-label': 'Actions dropdown',
            class: 'cursor-pointer',
          }),
      );
    },
  },
];

function getRowItems(row) {
  return [
    {
      label: 'Edit User',
    },
    {
      label: 'Delete User',
    },
  ];
}

// Breadcrumb Links
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
]);

const globalFilter = ref('');

// Pagination config
const page = ref(1);
const pageCount = ref(5);
const rows = ref([]);
const totalData = ref(0);
const isLoading = ref(false);

// Fetch Table Data
const fetchData = async () => {
  isLoading.value = true;
  try {
    // Pakai $fetch biasa
    const result = await $fetch('/api/users', {
      method: 'GET',
      query: {
        page: page.value, // Kirim value halaman saat ini
        limit: pageCount.value, // Kirim limit
        q: globalFilter.value, // Kirim keyword search
      },
    });

    // Update state manual
    rows.value = result.users;
    totalData.value = result.total;
  } catch (error) {
    console.error('Gagal ambil data:', error);
  } finally {
    isLoading.value = false;
  }
};

watch(page, () => {
  fetchData();
});

watch(globalFilter, () => {
  page.value = 1;
});

onMounted(() => {
  fetchData();
});
</script>
