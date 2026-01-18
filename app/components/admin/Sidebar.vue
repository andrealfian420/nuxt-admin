<template>
  <div>
    <div
      v-if="isOpen"
      class="fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity duration-300"
      @click="close"
    ></div>

    <aside
      class="w-64 bg-white border-r border-slate-200 flex flex-col fixed inset-y-0 z-50 transition-transform duration-300"
      :class="[isOpen ? 'translate-x-0' : '-translate-x-full lg:hidden']"
    >
      <div class="h-20 flex items-center px-8 border-b border-slate-100">
        <Icon name="lucide:zap" class="text-3xl text-emerald-600 mr-2" />
        <span class="text-xl font-bold text-slate-900 tracking-tight"
          >DreUI</span
        >
      </div>

      <nav class="flex-1 p-4 space-y-2 overflow-y-auto">
        <template v-for="item in menuItems" :key="item.key">
          <div
            v-if="item.separator"
            class="border-t border-slate-100 my-4"
          ></div>

          <NuxtLink
            v-else
            :to="item.to"
            @click="checkMobileClose"
            class="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-emerald-50 hover:text-emerald-700 transition-all group"
            :class="[
              route.path === item.to
                ? 'bg-emerald-50 text-emerald-700 font-semibold'
                : 'text-slate-600 hover:bg-emerald-50 hover:text-emerald-700',
            ]"
          >
            <Icon
              :name="item.icon"
              class="w-5 h-5 transition-colors"
              :class="
                route.path === item.to
                  ? 'text-emerald-700'
                  : 'text-slate-400 group-hover:text-emerald-600'
              "
            />
            <span class="font-medium text-sm">{{ item.label }}</span>
          </NuxtLink>
        </template>
      </nav>

      <div class="p-4 border-t border-slate-100 cursor-pointer">
        <div
          class="flex items-center gap-3 p-2 rounded-xl border border-slate-100 bg-slate-50"
        >
          <img
            src="https://ui-avatars.com/api/?name=A+R&background=059669&color=fff&size=128"
            alt="John Doe"
            class="w-10 h-10 rounded-full object-cover border border-slate-200 shadow-sm"
          />
          <div class="flex-1 min-w-0">
            <p class="text-sm font-semibold text-slate-900 truncate">Andre R</p>
            <p class="text-xs text-slate-500 truncate">Admin</p>
          </div>
        </div>
      </div>
    </aside>
  </div>
</template>

<script setup>
const { isOpen, checkMobileClose, close } = useSidebar();
const route = useRoute();

// format icon: "collection:icon-name"
const menuItems = ref([
  {
    label: 'Dashboard',
    icon: 'lucide:layout-dashboard',
    key: 'dash',
    to: '/admin/dashboard',
  },
  {
    label: 'Transactions',
    icon: 'lucide:receipt-text',
    key: 'trans',
    to: '/admin/transactions',
  },
  {
    label: 'Users',
    icon: 'lucide:users',
    key: 'user',
    to: '/admin/users',
  },
  { separator: true },
  {
    label: 'Settings',
    icon: 'lucide:settings',
    key: 'set',
    to: '/admin/settings',
  },
]);
</script>
