<template>
  <header
    class="h-20 bg-white/80 backdrop-blur-md sticky top-0 z-40 border-b border-slate-200 px-6 sm:px-10 flex items-center justify-between"
  >
    <button
      type="button"
      @click.prevent="toggle"
      class="mr-4 rounded-lg text-slate-500 hover:text-slate-700 transition-colors focus:outline-none cursor-pointer"
      aria-label="Toggle Menu"
    >
      <Icon name="lucide:menu" class="w-10 h-10" />
    </button>

    <UDropdownMenu
      :items="profileItems"
      :ui="{
        item: 'cursor-pointer text-slate-600! hover:bg-emerald-50! hover:text-emerald-700! hover:font-semibold!',
        itemLeadingIcon: 'cursor-pointer  hover:bg-emerald-700! ',
      }"
    >
      <UAvatar
        src="https://ui-avatars.com/api/?name=A+R&background=059669&color=fff&size=128"
        size="xl"
        class="w-10 h-10 rounded-full object-cover border border-slate-200 shadow-sm cursor-pointer"
        alt="John Doe"
      />
    </UDropdownMenu>
  </header>
</template>

<script setup>
const { toggle } = useSidebar();
const { profileItems } = useProfileMenu();
</script>
