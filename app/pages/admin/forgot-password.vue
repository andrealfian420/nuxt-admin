<template>
  <div
    class="min-h-screen flex items-center justify-center bg-slate-50 px-4 font-sans text-slate-800"
  >
    <div
      class="w-full max-w-sm bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden"
    >
      <div class="px-8 pt-10 pb-8 text-center">
        <div
          class="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-emerald-50 mb-4 text-emerald-600"
        >
          <Icon name="lucide:key-round" class="w-6 h-6" />
        </div>
        <h1 class="text-2xl font-bold text-slate-900 tracking-tight">
          Forgot Password?
        </h1>
        <p class="text-slate-500 text-sm mt-2">
          {{
            isSent
              ? 'Check your inbox!'
              : "No worries, we'll send you reset instructions."
          }}
        </p>
      </div>

      <form
        v-if="!isSent"
        @submit.prevent="handleReset"
        class="px-8 pb-10 space-y-5"
      >
        <div class="space-y-1.5">
          <label
            for="email"
            class="block text-xs font-semibold text-slate-600 uppercase tracking-wider"
          >
            Email Address
          </label>
          <div class="relative">
            <div
              class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400"
            >
              <Icon name="lucide:mail" class="w-5 h-5" />
            </div>
            <input
              id="email"
              type="email"
              v-model="email"
              placeholder="Enter your registered email"
              required
              class="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 placeholder-slate-400 outline-none transition-all focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
            />
          </div>
        </div>

        <button
          type="submit"
          :disabled="isLoading"
          class="cursor-pointer w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 rounded-xl shadow-lg shadow-emerald-600/20 transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed mt-2"
        >
          <span v-if="!isLoading">Send Reset Link</span>
          <span v-else class="flex items-center gap-2">
            <Icon name="lucide:loader-2" class="w-4 h-4 animate-spin" />
            Sending...
          </span>
        </button>

        <div class="text-center pt-2">
          <NuxtLink
            to="/admin"
            class="cursor-pointer text-sm text-slate-500 hover:text-emerald-600 font-medium transition-colors flex items-center justify-center gap-1"
          >
            <Icon name="lucide:arrow-left" class="w-4 h-4" />
            Back to Login
          </NuxtLink>
        </div>
      </form>

      <div v-else class="px-8 pb-10 text-center space-y-6">
        <div class="bg-emerald-50 border border-emerald-100 rounded-xl p-4">
          <p class="text-sm text-emerald-800">
            We have sent a password reset link to
            <span class="font-semibold">{{ email }}</span
            >.
          </p>
        </div>

        <p class="text-xs text-slate-500">
          Didn't receive the email? Check your spam folder or try again.
        </p>

        <button
          @click="isSent = false"
          class="cursor-pointer w-full flex items-center justify-center gap-2 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-slate-900 font-bold py-2.5 rounded-xl transition-all active:scale-[0.98]"
        >
          Try another email
        </button>

        <div class="text-center">
          <NuxtLink
            to="/admin"
            class="text-sm text-emerald-600 hover:text-emerald-700 font-medium transition-colors cursor-pointer"
          >
            Back to Login
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

useHead({
  title: 'Web Admin - Reset Password',
});

const email = ref('');
const isLoading = ref(false);
const isSent = ref(false);

const handleReset = () => {
  isLoading.value = true;

  // Simulate api call
  setTimeout(() => {
    isLoading.value = false;
    isSent.value = true;
  }, 1500);
};
</script>
