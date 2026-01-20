<template>
  <div>
    <div
      class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 space-y-6 mb-2"
    >
      <div class="mb-0">
        <h1 class="text-2xl font-bold text-slate-900">User Management</h1>
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
          class="flex items-center justify-center mb-4 md:mb-0 w-12 gap-2 bg-white hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 border border-slate-200 font-bold py-2.5 rounded-xl shadow-sm transition-all active:scale-[0.98] mt-2 cursor-pointer"
          icon="i-lucide-refresh-cw"
          @click="refresh"
        />

        <UButton
          class="flex items-center justify-center mb-4 md:mb-0 w-48 gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 rounded-xl shadow-lg shadow-emerald-600/20 transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed mt-2 cursor-pointer"
          icon="i-lucide-plus"
          label="Add New User"
        />
      </div>
    </div>

    <AdminUtilsTable
      ref="tableRef"
      api-url="/api/users"
      :columns="columns"
      search-label="Search User"
      :show-rows-per-page="true"
      :rows-per-page="5"
    />
  </div>
</template>

<script setup>
import { h, resolveComponent } from 'vue';

definePageMeta({
  layout: 'dashboard',
});

useHead({
  title: 'Web Admin - Users',
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
]);

// table columns and row definition
const columns = [
  { accessorKey: 'id', header: '#', cell: ({ row }) => row.getValue('id') },
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
    meta: { th: 'text-right', td: 'text-right font-medium' },
    cell: ({ row }) => {
      const statusVal = row.getValue('status');
      const colorMap = { Active: 'success', Inactive: 'error' };

      return h(
        resolveComponent('UBadge'),
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
        resolveComponent('UDropdownMenu'),
        {
          content: { align: 'end' },
          items: getRowItems(row),
          'aria-label': 'Actions dropdown',
          ui: {
            item: 'cursor-pointer hover:bg-emerald-50 hover:text-emerald-700 transition-colors',
          },
        },
        () =>
          h(resolveComponent('UButton'), {
            icon: 'i-lucide-ellipsis-vertical',
            color: 'neutral',
            variant: 'ghost',
            class: 'cursor-pointer',
          }),
      );
    },
  },
];

const tableRef = ref(null);

function refresh() {
  tableRef.value.refresh();
}

function getRowItems(row) {
  return [
    [
      {
        label: 'Edit User',
      },
      {
        label: 'Delete User',
      },
    ],
  ];
}
</script>
