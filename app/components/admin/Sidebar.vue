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
        <Icon name="i-lucide-zap" class="text-3xl text-emerald-600 mr-2" />
        <span class="text-xl font-bold text-slate-900 tracking-tight"
          >DreUI</span
        >
      </div>

      <AdminSidebarMenu :items="menuItems" @item-click="checkMobileClose" />

      <div class="p-4 border-t border-slate-100 cursor-pointer">
        <UDropdownMenu
          :content="{
            align: 'start',
            side: 'bottom',
            sideOffset: 8,
          }"
          :items="profileItems"
          :ui="{
            item: 'cursor-pointer text-slate-600! hover:bg-emerald-50! hover:text-emerald-700! hover:font-semibold!',
            itemLeadingIcon: 'cursor-pointer  hover:bg-emerald-700!',
            content: 'w-(--reka-dropdown-menu-trigger-width)',
          }"
        >
          <div
            class="flex items-center gap-3 p-2 rounded-xl border border-slate-100 bg-slate-50"
          >
            <UAvatar
              src="https://ui-avatars.com/api/?name=A+R&background=059669&color=fff&size=128"
              size="xl"
              class="w-10 h-10 rounded-full object-cover border border-slate-200 shadow-sm cursor-pointer"
              alt="John Doe"
            />
            <div class="flex-1 min-w-0">
              <p class="text-sm font-semibold text-slate-900 truncate">
                Andre R
              </p>
              <p class="text-xs text-slate-500 truncate">Admin</p>
            </div>
          </div>
        </UDropdownMenu>
      </div>
    </aside>
  </div>
</template>

<script setup>
const { isOpen, checkMobileClose, close } = useSidebar();
const { profileItems } = useProfileMenu();
const menuItems = useAdminMenu().items;
</script>
