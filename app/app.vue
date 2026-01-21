<template>
  <UApp :toaster="toaster">
    <NuxtLoadingIndicator color="#059669" />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <NuxtRouteAnnouncer />
  </UApp>
</template>

<script setup>
const toaster = { position: 'top-right' };
</script>
