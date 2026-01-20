<template>
  <UForm
    :state="form"
    :schema="schema"
    @submit="handleSubmit"
    class="space-y-4"
  >
    <div class="grid grid-cols-12 gap-4">
      <UFormField
        label="Full Name"
        name="name"
        class="col-span-12 md:col-span-6 flex flex-col space-y-2"
        required
      >
        <UInput
          type="text"
          v-model="form.name"
          placeholder="Enter your fullname"
          class="rounded-md w-full focus:ring-1 placeholder-gray-500 text-black disabled:cursor-not-allowed disabled:bg-gray-100"
        />
      </UFormField>

      <UFormField
        label="Email"
        name="email"
        class="col-span-12 md:col-span-6 flex flex-col space-y-2"
        required
      >
        <UInput
          type="text"
          v-model="form.email"
          placeholder="Enter your email"
          class="rounded-md w-full focus:ring-1 placeholder-gray-500 text-black disabled:cursor-not-allowed disabled:bg-gray-100"
        />
      </UFormField>

      <UFormField
        label="Role"
        name="role"
        class="col-span-12 md:col-span-6 flex flex-col space-y-2"
        required
      >
        <USelectMenu
          v-model="form.role"
          :items="roleOptions"
          placeholder="Choose role"
          class="rounded-md w-full focus:ring-1 placeholder-gray-500 text-black disabled:cursor-not-allowed disabled:bg-gray-100"
          :ui="{
            item: 'cursor-pointer hover:bg-emerald-50 hover:text-emerald-700! hover:font-semibold transition-colors',
          }"
        />
      </UFormField>

      <UFormField
        label="Status"
        name="status"
        class="col-span-12 md:col-span-6 flex flex-col space-y-2"
        required
      >
        <USelectMenu
          v-model="form.status"
          :items="['Active', 'Inactive']"
          placeholder="Choose status"
          class="rounded-md w-full focus:ring-1 placeholder-gray-500 text-black disabled:cursor-not-allowed disabled:bg-gray-100"
          :ui="{
            item: 'cursor-pointer hover:bg-emerald-50 hover:text-emerald-700! hover:font-semibold transition-colors',
          }"
        />
      </UFormField>
    </div>

    <div class="flex justify-end gap-3 pt-4 mt-6">
      <UButton
        class="flex items-center justify-center mb-4 md:mb-0 w-auto gap-2 bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold py-2.5 rounded-xl transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed mt-2 cursor-pointer"
        icon="i-lucide-rotate-ccw"
        label="Reset"
      />
      <UButton
        type="submit"
        class="flex items-center justify-center mb-4 md:mb-0 w-auto gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2.5 rounded-xl shadow-md shadow-emerald-600/30 transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed mt-2 cursor-pointer"
        icon="i-lucide-save"
        label="Save"
        :loading="isLoading"
      />
    </div>
  </UForm>
</template>

<script setup>
import * as z from 'zod';

const props = defineProps({
  action: {
    type: String,
    required: true,
  },
  method: {
    type: String,
    default: 'POST',
  },
  initialData: {
    type: Object,
    default: () => ({
      name: '',
      email: '',
      role: '',
      status: '',
    }),
  },
});

const emit = defineEmits(['success']);
const toast = useToast();
const isLoading = ref(false);

const isEdit = computed(() => props.method.toUpperCase() === 'PUT');

const form = reactive({ ...props.initialData });

const roleOptions = ref(['Admin', 'User', 'Reviewer']);

watch(
  () => props.initialData,
  (newData) => {
    Object.assign(form, newData);
  },
  { deep: true },
);

// Validation Schema
const schema = z.object({
  name: z.string('Name is required'),
  email: z.email('Invalid email'),
  password: z
    .string('Password is required')
    .min(8, 'Must be at least 8 characters'),
});

const handleSubmit = async () => {
  isLoading.value = true;
  try {
    const payload = {
      ...form,
    };

    await $fetch(props.action, {
      method: props.method,
      body: payload,
    });

    toast.add({
      title: 'Success',
      description: `User successfully ${isEdit.value ? 'updated' : 'created'}`,
      color: 'emerald',
    });

    emit('success');
  } catch (error) {
    toast.add({
      title: 'Error',
      description: error.data?.message || error.message,
      color: 'red',
    });
  } finally {
    isLoading.value = false;
  }
};
</script>
