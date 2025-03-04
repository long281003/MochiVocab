<script setup>
import { ref,computed } from 'vue';
import IconEye from '@/components/icons/IconEye.vue';
import IconClockEye from '@/components/icons/IconClockEye.vue';
// import store from '@/store';
import { toast } from "vue3-toastify";
import store from '@/store';

const props = defineProps(['show'])
const emit = defineEmits(['update:show'])

const closeModal = () => {
    emit('update:show', false)
}

const oldPassword = ref('')
const newPassword = ref('')
const confirmPassword = ref('')
const showOldPassword = ref('')
const showPassword = ref(false)
const showConfirmPassword = ref(false)
const oldPasswordErr = ref('')
const newPasswordErr = ref('')
const confirmErr = ref('')

const toggleShowOldPassword = () => {
    showOldPassword.value = !showOldPassword.value
}

const toggleShowPassword = () => {
    showPassword.value = !showPassword.value;
};

const toggleShowConfirmPassword = () => {
    showConfirmPassword.value = !showConfirmPassword.value;
};

const validatePassword = (password) => {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return regex.test(password);
};

const showOldPasswordIcon = computed(() => oldPassword.value.trim().length > 0);
const showNewPasswordIcon = computed(() => newPassword.value.trim().length > 0);
const showConfirmIcon = computed(() => confirmPassword.value.trim().length > 0)

const handleChange = async () => {
    if (newPassword.value.trim()) {
        if (!validatePassword(newPassword.value)) {
        toast.error('Mật khẩu phải có ít nhất 8 ký tự, chứa ký tự đặc biệt, chữ in hoa và chữ thường')
        newPasswordErr.value = true
        confirmErr.value = true
        return;
        }
    }
    if (!oldPassword.value.trim() || !newPassword.value.trim() || newPassword.value !== confirmPassword.value) {
        toast.error('Nhập thông tin đúng')
         newPasswordErr.value = true
        confirmErr.value = true
        return;
    }
    try {
        const body = {
            oldPassword: oldPassword.value,
            newPassword: newPassword.value,
        }
        const result = await store.dispatch('editPassword', body)
        if (result) {
            toast.success('Đổi mật khẩu thành công')
            closeModal()
        } else {
            oldPasswordErr.value = true
            newPasswordErr.value = true
            confirmErr.value = true
            toast.error('Đổi mật khẩu thất bại')
        }
             
    } catch (error) {
        console.log(error)
    }
}


</script>

<template>
    <div v-show="props.show"
        class="d-alog fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50">
        <div class="max-w-2xl p-2 bg-white rounded-md shadow-xl">
            <div class="w-[450px]">
                <div>
                    <button @click="closeModal"
                        class="flex text-gray-400 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto ">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </button>
                    <h3 class="text-2xl text-center pb-3">Đổi mật khẩu</h3>
                </div>
                <form @submit.prevent="handleChange" class="max-w-[370px] mx-auto">
                    <div class="relative mb-4">
                        <input :type="showOldPassword ? 'text' : 'password'" placeholder="Mật khẩu cũ"
                            v-model="oldPassword"
                            :class="['w-full border text-gray-900 text-sm rounded-lg p-3.5', oldPasswordErr ? 'border-red-500' : 'border-gray-300']" />
                        <span v-if="showOldPasswordIcon" class="absolute inset-y-0 right-0 flex items-center pr-3 mb-6 cursor-pointer"
                            @click="toggleShowOldPassword">
                            <IconEye v-if="showOldPassword" />
                            <IconClockEye v-else />
                        </span>
                        <span  class="text-slate-500">Mật khẩu bao gồm 8 ký tự</span>
                        
                    </div>
                    <div class="relative mb-4">
                        <input :type="showPassword ? 'text' : 'password'" placeholder="Mật khẩu mới"
                            v-model="newPassword"
                            :class="['w-full border text-gray-900 text-sm rounded-lg p-3.5', newPasswordErr ? 'border-red-500' : 'border-gray-300']" />
                        <span v-if="showNewPasswordIcon" class="absolute inset-y-0 right-0 flex items-center pr-3 mb-6 cursor-pointer"
                            @click="toggleShowPassword">
                            <IconEye v-if="showPassword" />
                            <IconClockEye v-else />
                        </span>
                        <span  class="text-slate-500">Mật khẩu bao gồm 8 ký tự</span>
                    </div>
                    <div class="relative mb-4">
                        <input :type="showConfirmPassword ? 'text' : 'password'" placeholder="Nhập lại mật khẩu mới"
                            v-model="confirmPassword"
                            :class="['w-full border  text-gray-900 text-sm rounded-lg p-3.5', confirmErr ? 'border-red-500' : 'border-gray-300']" />
                        <span v-if="showConfirmIcon" class="absolute inset-y-0 right-0 flex items-center pr-3 mb-6 cursor-pointer"
                            @click="toggleShowConfirmPassword">
                            <IconEye v-if="showConfirmPassword" />
                            <IconClockEye v-else />
                        </span>
                        <span  class="text-slate-500">Mật khẩu bao gồm 8 ký tự</span>
                    </div>
                    <div>
                        <button class="bg-lime-500 w-full font-semibold p-2 rounded-full mb-6">Lưu mới</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
<style>
    .d-alog{
        z-index: 99;
    }
</style>
