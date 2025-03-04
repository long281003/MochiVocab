<script setup>
import { ref, computed } from 'vue';
import IconClockEye from '@/components/icons/IconClockEye.vue';
import IconEye from '@/components/icons/IconEye.vue';
import store from '@/store';
import router from '@/router';
import { toast } from 'vue3-toastify';

const email = ref('')
const fullName = ref('')
const password = ref('')
const confirmPassword = ref('')
const emailError = ref(false)
const fullNameError = ref(false)
const passwordError = ref(false)
const showPassword = ref(false)
const showConfirmPassword = ref(false)
const isFormValid = computed(() => {
    return email.value.trim() && password.value.trim() && fullName.value.trim() && confirmPassword.value.trim();
});
const validatePassword = (password) => {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return regex.test(password);
};

const showPasswordIcon = computed(() => password.value.trim().length > 0);
const showConfirmIcon = computed(() => confirmPassword.value.trim().length > 0)

const handleSubmit = async () => {
    if ( password.value.trim()) {
        if (!validatePassword(password.value)) {
            toast.error('Mật khẩu phải có ít nhất 8 ký tự, chứa ký tự đặc biệt, chữ in hoa và chữ thường')
            passwordError.value = true
            return;
        }
    }
    if (password.value !== confirmPassword.value || !email.value.trim() || 
                !password.value.trim() || !confirmPassword.value.trim() || !fullName.value.trim()) {
                toast.error("Nhập thông tin đầy đủ")
                emailError.value = false
                passwordError.value = false
                fullNameError.value = false
            return
    } else {
        try {
            const body = {
                fullName: fullName.value,
                email: email.value,
                password: password.value,
            };
            const result = await store.dispatch('registerMember', body)
            if (result) {
                toast.success('Đăng ký thành công')
                router.push('/login')
            } else {
                 emailError.value = false
                passwordError.value = false
                fullNameError.value = false
                toast.error("Đăng ký thất bại")
                
           }
        } catch (error) {
             console.log(error)
        }
    }
}

const toggleShowPassword = () => {
    showPassword.value = !showPassword.value;
};
const toggleShowConfirmPassword = () => {
    showConfirmPassword.value = !showConfirmPassword.value;
};

</script>

<template>
    <div class="flex justify-center">
        <div class="w-[550px] h-[873px] bg-gray-100 flex-colums justify-center">
            <div class="relative bg-amber-400 text-center font-semibold rounded-b-2xl p-3.5 text-2xl">
                <router-link to="/login">
                    <img src="../assets/back.png" width="30" height="30" class="absolute cursor-pointer" />
                </router-link>
                <p class="text-center">Tạo tài khoản mới</p>
            </div>
            <div class="flex justify-center">
                <div class="w-[450px]">
                    <div class="pt-5 mb-5">
                        <h3 class="text-2xl font-semibold text-center">Cùng tạo tài khoản Mochi nào</h3>
                    </div>
                    <div class="flex justify-center mb-2">
                        <img src="../assets/mochi-icon-register.webp" />
                    </div>
                    <form @submit.prevent="handleSubmit" class="max-w-[370px] mx-auto mt-5">
                        <div>
                            <input type="text" placeholder="Tên của bạn" v-model="fullName"
                                :class="['w-full text-gray-900 text-sm rounded-xl p-4',fullNameError ? 'border-red-500' : 'outline-none']" />
                        </div>
                        <div class="my-5">
                            <input type="email" placeholder="Nhập chính xác email của bạn" v-model="email"
                                :class="['w-full text-gray-900 text-sm rounded-xl p-4',emailError ? 'border-red-500' : 'outline-none']" />
                        </div>
                        <div class="relative">
                            <input :type="showPassword ? 'text' : 'password'" placeholder="Tạo mật khẩu (dễ nhớ chút nhé ^^)" v-model="password"
                                :class="['w-full text-gray-900 text-sm rounded-xl p-4', passwordError ? 'border-red-500' : 'outline-none']" />
                                <span v-if="showPasswordIcon" class="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                                    @click="toggleShowPassword">
                                    <IconEye v-if="showPassword" />
                                    <IconClockEye v-else />
                                </span>
                        </div>
                        <div class="relative mt-5">
                            <input :type="showConfirmPassword ? 'text' : 'password'" placeholder="Nhập lại mật khẩu" v-model="confirmPassword"
                                class="w-full text-gray-900 text-sm rounded-xl p-4 outline-none" />
                                <span v-if="showConfirmIcon" class="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                                    @click="toggleShowConfirmPassword">
                                    <IconEye v-if="showConfirmPassword" />
                                    <IconClockEye v-else />
                                </span>
                        </div>
                        <div class="flex my-4 justify-center">
                            <div
                                :class="['relative  w-40 h-12 font-semibold mt-2 rounded-full', !isFormValid ? 'bg-gray-300' : 'bg-lime-600']">
                            </div>
                            <button :disabled="!isFormValid"
                                :class="['absolute  w-40 h-12 font-semibold p-2 rounded-full mb-6', !isFormValid ? 'bg-gray-200 text-white' : 'bg-lime-500']">Tạo
                                tài
                                khoản</button>
                        </div>
                    </form>
                    <!-- <router-link to="/register" class="flex my-3 justify-center">
                        <div class="relative bg-gray-300 w-72 h-12 font-semibold mt-1 rounded-full">
                        </div>
                        <button class="absolute bg-white w-72 h-12 font-semibold p-2 rounded-full mb-6">Tạo tài khoản
                            với email</button>
                    </router-link> -->
                    <div class="max-w-[370px] mx-auto">
                        <div class="my-5 text-center">
                            <span class="mr-1">Bạn có điều khoản?</span>
                            <button>
                                <router-link to="/login" class="text-emerald-400 font-semibold underline decoration-solid">Đăng nhập ngay</router-link>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
