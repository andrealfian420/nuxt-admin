<template>
  <div>
    <UBreadcrumb :links="links" />

    <div
      class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 space-y-6"
    >
      <div>
        <h1 class="text-2xl font-bold text-slate-900 dark:text-white">
          User Management
        </h1>
        <p class="text-slate-500 mt-1 text-sm">
          Manage access, roles, and user statuses.
        </p>
      </div>
      <UButton
        class="flex items-center justify-center mb-4 md:mb-0 w-[20%] gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 rounded-xl shadow-lg shadow-emerald-600/20 transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed mt-2 cursor-pointer"
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
            />
          </div>
        </div>
      </template>

      <UTable :data="users" :columns="columns" class="flex-1" />

      <!-- <template #footer>
        <div
          class="flex flex-col sm:flex-row justify-between items-center gap-4 py-2"
        >
          <span class="text-sm text-slate-500">
            Showing
            <span class="font-medium">{{ (page - 1) * pageCount + 1 }}</span> to
            <span class="font-medium">{{
              Math.min(page * pageCount, filteredRows.length)
            }}</span>
            of
            <span class="font-medium">{{ filteredRows.length }}</span> results
          </span>

          <UPagination
            v-model="page"
            :page-count="pageCount"
            :total="filteredRows.length"
            :active-button="{ color: 'emerald', variant: 'solid' }"
            :inactive-button="{ color: 'gray', variant: 'ghost' }"
          />
        </div>
      </template> -->
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

// Dummy Data
const users = ref([
  {
    id: 1,
    name: 'Lindsay Walton',
    email: 'lindsay.walton@example.com',
    role: 'Admin',
    status: 'Active',
    avatar: 'https://i.pravatar.cc/150?u=1',
  },
  {
    id: 2,
    name: 'Courtney Henry',
    email: 'courtney.henry@example.com',
    role: 'Editor',
    status: 'Active',
    avatar: 'https://i.pravatar.cc/150?u=2',
  },
  {
    id: 3,
    name: 'Tom Cook',
    email: 'tom.cook@example.com',
    role: 'Viewer',
    status: 'Active',
    avatar: 'https://i.pravatar.cc/150?u=3',
  },
  {
    id: 4,
    name: 'Whitney Francis',
    email: 'whitney.francis@example.com',
    role: 'Editor',
    status: 'Active',
    avatar: 'https://i.pravatar.cc/150?u=4',
  },
  {
    id: 5,
    name: 'Leonard Krasner',
    email: 'leonard.krasner@example.com',
    role: 'Admin',
    status: 'Inactive',
    avatar: 'https://i.pravatar.cc/150?u=5',
  },
  {
    id: 6,
    name: 'Floyd Miles',
    email: 'floyd.miles@example.com',
    role: 'Viewer',
    status: 'Active',
    avatar: 'https://i.pravatar.cc/150?u=6',
  },
  {
    id: 7,
    name: 'Emily Selman',
    email: 'emily.selman@example.com',
    role: 'Editor',
    status: 'Active',
    avatar: 'https://i.pravatar.cc/150?u=7',
  },
]);

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
      const color = {
        Active: 'success',
        Inactive: 'error',
      }[row.getValue('status')];

      return h(UBadge, { class: 'capitalize', variant: 'subtle', color }, () =>
        row.getValue('status')
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
          })
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
const links = [
  {
    label: 'Dashboard',
    icon: 'i-heroicons-home',
    to: '/admin/dashboard',
  },
  {
    label: 'Users',
    icon: 'i-heroicons-users',
  },
];

const globalFilter = ref('');
</script>
