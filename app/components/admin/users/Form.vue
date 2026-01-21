<template>
  <UForm
    ref="formRef"
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
        name="avatar"
        class="col-span-12 md:col-span-6 flex flex-col space-y-2"
        :required="!isEdit"
      >
        <template #label>
          <div class="flex items-center gap-2">
            <span>Avatar</span>

            <a
              v-if="isEdit && avatar_url"
              :href="avatar_url"
              target="_blank"
              class="text-[12px] font-normal text-emerald-600 hover:text-emerald-700 hover:underline cursor-pointer flex items-center gap-0.5"
            >
              <UIcon name="i-lucide-external-link" class="w-3 h-3" />
              View File
            </a>
          </div>
        </template>

        <UFileUpload
          v-model="form.avatar"
          interactive
          label="JPG/PNG/WEBP. 2MB Max."
          accept="image/jpg,image/jpeg,image/png,image/webp"
          class="rounded-md w-full h-64 focus:ring-1 placeholder-gray-500 text-black disabled:cursor-not-allowed disabled:bg-gray-100"
          :ui="{
            root: 'cursor-pointer',
          }"
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
          :items="statusOptions"
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
        @click.prevent="resetForm"
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
  user: {
    type: Object,
    default: () => ({
      name: '',
      email: '',
      role: '',
      status: '',
      avatar: null,
    }),
  },
});

const formRef = ref(null);
const emit = defineEmits(['success']);
const toast = useToast();
const isLoading = ref(false);
const isEdit = computed(() => props.method.toUpperCase() === 'PUT');
const form = reactive({ ...props.user });
const avatar_url = ref(null);

const roleOptions = ref(['Admin', 'User', 'Reviewer']);
const statusOptions = ref(['Active', 'Inactive']);
const maxSize = 2 * 1024 * 1024; // 2mb
const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

// Validation Schema
const schema = z.object({
  name: z.string().nonempty('Full Name is required'),

  email: z.string().email('Invalid email').nonempty('Email is required'),

  role: z.string().refine((val) => val && val !== null, 'Role is required'),

  status: z.string().refine((val) => val && val !== null, 'Status is required'),

  avatar: z
    .any()
    .refine(
      (file) => {
        if (!isEdit.value) {
          return file instanceof File;
        }

        return true;
      },
      {
        message: 'Please select an image file.',
      },
    )
    .refine(
      (file) => {
        if (file instanceof File) {
          return file.size <= maxSize;
        }
        return true;
      },
      {
        message: `The image is too large. Please choose an image smaller than 2MB.`,
      },
    )
    .refine(
      (file) => {
        if (file instanceof File) {
          return allowedTypes.includes(file.type);
        }
        return true;
      },
      {
        message: 'Please upload a valid image file (JPEG, PNG, or WEBP).',
      },
    ),
});

const resetForm = () => {
  Object.assign(form, { ...props.user });

  // reset validation messages
  formRef.value?.clear();
};

const handleSubmit = async () => {
  isLoading.value = true;
  try {
    const payload = new FormData();

    for (const key in form) {
      if (form[key] !== null && form[key] !== undefined) {
        payload.append(key, form[key]);
      }
    }

    // await $fetch(props.action, {
    //   method: props.method,
    //   body: payload,
    // });

    toast.add({
      title: 'Success',
      description: `User successfully ${isEdit.value ? 'updated' : 'created'}`,
      icon: 'i-lucide-check',
    });

    emit('success');
  } catch (error) {
    toast.add({
      title: 'Error',
      description: error.data?.message || error.message,
      icon: 'i-lucide-x',
    });
  } finally {
    isLoading.value = false;
  }
};

watch(
  () => props.user,
  (newData) => {
    Object.assign(form, newData);
  },
  { deep: true },
);

onMounted(() => {
  if (isEdit.value) {
    avatar_url.value = props.user.avatar_url;
  }
});
</script>
