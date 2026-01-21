<template>
  <!-- Skeleton loading -->
  <UCard
    v-if="initialLoading"
    :ui="{
      body: { padding: 'p-0 sm:p-0' },
      header: { padding: 'p-4 sm:px-6' },
    }"
  >
    <template #header>
      <div class="flex justify-between items-center gap-4">
        <USkeleton class="h-8 w-full sm:w-72 rounded-md" />
      </div>
    </template>

    <div class="divide-y divide-gray-200 dark:divide-gray-800">
      <div
        class="px-6 py-3.5 grid grid-cols-4 gap-4 bg-gray-50/50 dark:bg-gray-800/50"
      >
        <USkeleton class="h-4 w-8" />
        <USkeleton class="h-4 w-32" />
        <USkeleton class="h-4 w-48" />
        <USkeleton class="h-4 w-24 ml-auto" />
      </div>

      <div
        v-for="i in 5"
        :key="i"
        class="px-6 py-4 grid grid-cols-4 gap-4 items-center"
      >
        <USkeleton class="h-4 w-8" />

        <div class="flex items-center gap-3">
          <USkeleton class="h-8 w-8 rounded-full" />
          <USkeleton class="h-4 w-24" />
        </div>

        <USkeleton class="h-4 w-full max-w-50" />

        <USkeleton class="h-6 w-16 rounded-full ml-auto" />
      </div>
    </div>

    <template #footer>
      <div
        class="flex flex-col sm:flex-row justify-between items-center gap-4 py-2"
      >
        <USkeleton class="h-4 w-48" />

        <div class="flex gap-2 items-center">
          <USkeleton class="h-4 w-24 hidden sm:block" />
          <USkeleton class="h-8 w-16 rounded-md" />

          <USkeleton class="h-8 w-48 rounded-md" />
        </div>
      </div>
    </template>
  </UCard>

  <UCard
    v-else
    :ui="{
      body: { padding: 'p-0 sm:p-0' },
      header: { padding: 'p-4 sm:px-6' },
    }"
  >
    <template #header>
      <div class="flex justify-between items-center gap-4">
        <div class="w-full sm:w-72">
          <UInput
            v-model="search"
            icon="i-lucide-search"
            :placeholder="searchLabel"
            color="white"
            :loading="isLoading"
          />
        </div>
      </div>
    </template>

    <UTable
      :loading="isLoading"
      loading-color="primary"
      loading-animation="carousel"
      :data="rows"
      :columns="columns"
      class="flex-1"
    />

    <template #footer>
      <div
        class="flex flex-col sm:flex-row justify-between items-center gap-4 py-2"
      >
        <span class="text-sm text-slate-500">
          Showing
          <span class="font-medium">{{ (page - 1) * limit + 1 }}</span> to
          <span class="font-medium">{{
            Math.min(page * limit, totalData)
          }}</span>
          of
          <span class="font-medium">{{ totalData }}</span> results
        </span>

        <div class="flex xs:flex-row gap-2">
          <div v-if="showRowsPerPage" class="flex items-center">
            <span class="text-sm text-slate-500 font-medium">
              {{ rowsPerPageLabel }}
            </span>
            <USelect
              v-model="limit"
              :items="[5, 10, 25, 50]"
              class="ms-2 cursor-pointer w-auto h-7"
              :ui="{
                item: 'cursor-pointer hover:bg-emerald-50 hover:text-emerald-700! hover:font-semibold transition-colors',
              }"
            />
          </div>
          <UPagination
            v-if="showPagination"
            :page="page"
            :items-per-page="limit"
            @update:page="onPageChange"
            :total="totalData"
            show-edges
            :active-button="{ color: 'emerald', variant: 'solid' }"
            :inactive-button="{ color: 'gray', variant: 'ghost' }"
            :ui="{
              item: 'cursor-pointer ',
              list: 'cursor-pointer ',
              root: 'cursor-pointer ',
              next: 'cursor-pointer ',
              prev: 'cursor-pointer ',
              first: 'cursor-pointer ',
              last: 'cursor-pointer ',
            }"
          />
        </div>
      </div>
    </template>
  </UCard>
</template>

<script setup>
const UCard = resolveComponent('UCard');
const UTable = resolveComponent('UTable');
const UPagination = resolveComponent('UPagination');
const USelect = resolveComponent('USelect');
const UInput = resolveComponent('UInput');

const props = defineProps({
  apiUrl: {
    type: String,
    required: true,
  },
  columns: {
    type: Array,
    required: true,
  },
  searchLabel: {
    type: String,
    default: '',
  },
  query: {
    type: Object,
    default: () => ({}),
  },
  showRowsPerPage: {
    type: Boolean,
    default: false,
  },
  showPagination: {
    type: Boolean,
    default: true,
  },
  rowsPerPageLabel: {
    type: String,
    default: () => 'Rows per page:',
  },
  rowsPerPage: {
    type: [String, Number],
    default: () => 5,
  },
});

const page = ref(1);
const limit = ref(props.rowsPerPage);
const rows = ref([]);
const totalData = ref(0);
const isLoading = ref(false);
const initialLoading = ref(true);
const search = ref('');

const onPageChange = async (newPage) => {
  page.value = newPage;
  await fetchData();
};

const fetchData = async () => {
  isLoading.value = true;
  try {
    let queryParams = {
      page: page.value,
      limit: limit.value,
      search: search.value,
    };

    if (props.query && typeof props.query === 'object') {
      queryParams = { ...queryParams, ...props.query };
    }

    const result = await $fetch(props.apiUrl, {
      method: 'GET',
      query: queryParams,
    });

    rows.value = result.data;
    totalData.value = result.total;
  } catch (error) {
    console.error('Error fetching data:', error);
  } finally {
    isLoading.value = false;
    initialLoading.value = false;
  }
};

watch(search, async () => {
  page.value = 1;
  await fetchData();
});

watch(limit, async () => {
  page.value = 1;
  await fetchData();
});

watch(
  () => props.query,
  async () => {
    page.value = 1;
    await fetchData();
  },
  { deep: true },
);

defineExpose({
  refresh: fetchData,
});

onMounted(async () => {
  await fetchData();
});
</script>
