<template>
  <div
    class="min-h-screen bg-slate-50 flex flex-col items-center justify-center text-slate-800 font-sans px-4 relative overflow-hidden"
  >
    <div
      class="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none"
    >
      <div
        class="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-emerald-200/20 blur-3xl"
      ></div>
      <div
        class="absolute top-[40%] -right-[10%] w-[40%] h-[40%] rounded-full bg-blue-200/20 blur-3xl"
      ></div>
    </div>

    <div class="relative z-10 text-center max-w-2xl space-y-8">
      <div
        class="inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-white border border-slate-100 shadow-xl mb-4"
      >
        <UIcon
          name="i-lucide-layout-dashboard"
          class="w-12 h-12 text-emerald-600"
        />
      </div>

      <div class="space-y-4">
        <h1
          class="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight"
        >
          Welcome to <span class="text-emerald-600">DreUI</span>
        </h1>
        <p
          class="text-lg md:text-xl text-slate-500 max-w-lg mx-auto leading-relaxed"
        >
          This is a temporary landing page for your application. You can manage
          your users and data securely from the admin panel.
        </p>
      </div>

      <div
        class="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
      >
        <UButton
          to="/admin"
          size="xl"
          color="emerald"
          icon="i-lucide-arrow-right"
          trailing
          class="px-8 py-3 rounded-xl font-bold shadow-lg shadow-emerald-600/20 transition-transform active:scale-95"
        >
          Go to Dashboard
        </UButton>

        <UButton
          to="https://github.com/andrealfian420/nuxt-admin"
          target="_blank"
          size="xl"
          color="white"
          variant="solid"
          icon="i-lucide-github"
          class="px-8 py-3 rounded-xl font-bold border border-slate-200 text-slate-600 hover:bg-slate-50"
        >
          View Source
        </UButton>
      </div>
    </div>

    <div class="absolute bottom-8 text-center">
      <p class="text-sm text-slate-400">
        &copy; {{ new Date().getFullYear() }} Alfian Andre R. All rights
        reserved.
      </p>
    </div>
  </div>
</template>

<script setup>
useHead({
  title: 'Temporary Landing Page',
});
</script>
