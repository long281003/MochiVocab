<script setup>
import { ref, computed } from 'vue';
import IconEye from './icons/IconEye.vue';
import IconClockEye from './icons/IconClockEye.vue';
import { toast } from 'vue3-toastify';
import store from '@/store';
import router from '@/router';
import SendOtpEmail from '../Modals/SendOtpEmail.vue';

const email = ref('')
const password = ref('')
const emailError = ref(false)
const passwordError = ref(false)
const showmodalOTP = ref(false)
const showPassword = ref(false)
const isFormValid = computed(() => {
    return email.value.trim() && password.value.trim();
});

const openModalOTPEmail = () => {
    showmodalOTP.value = true
}

const showPasswordIcon = computed(() => password.value.trim().length > 0);
const handleSubmit = async () => {
     if (!email.value.trim() || !password.value.trim() ) {
         toast.error('Vui lòng nhập thông tin')
         emailError.value = true
         passwordError.value = true
            return  
        }
    try {
        const body = {
            email: email.value,
            password: password.value
        }
        const result = await store.dispatch('loginMember', body)
            if (result.token) {
                toast.success("Đăng nhập thành công")
                router.push('/')
            } else {
                emailError.value = true
                passwordError.value = true
                toast.error(result.message)
            }
        } catch (error) {
            console.log(error)
            
        }
}

const toggleShowPassword = () => {
    showPassword.value = !showPassword.value;
};
</script>

<template>
    <div class="flex justify-center">
        <div class="w-[550px] h-[773px] bg-gray-100 flex-colums justify-center">
            <div class="relative bg-amber-400 text-center font-semibold rounded-b-2xl p-3.5 text-2xl">
                <router-link to="/">
                    <img src="../assets/close.png" width="30" height="30" class="absolute cursor-pointer" />
                </router-link>
                <p class="text-center">Đăng nhập</p>
            </div>
            <div class="flex justify-center">
                <div class="w-[450px]">
                    <div class="py-12 mb-12">
                        <h3 class="text-2xl font-semibold text-center">Đăng nhập tài khoản học MochiMochi</h3>
                    </div>
                    <form @submit.prevent="handleSubmit" class="max-w-[370px] mx-auto mt-5">
                        <div class="my-5">
                            <input type="email" placeholder="Nhập email tài khoản học" v-model="email"
                                :class="['w-full text-gray-900 text-sm rounded-xl p-4',emailError ? 'border-red-500' : 'outline-none']" />
                        </div>
                        <div class="relative">
                            <input :type="showPassword ? 'text' : 'password'" placeholder="Nhập chính xác mật khẩu của bạn" v-model="password"
                                :class="['w-full text-gray-900 text-sm rounded-xl p-4', passwordError ? 'border-red-500' : 'outline-none']" />
                                <span v-if="showPasswordIcon" class="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                                    @click="toggleShowPassword">
                                    <IconEye v-if="showPassword" />
                                    <IconClockEye v-else />
                                </span>
                        </div>
                        <div class="flex my-4 justify-center">
                            <div :class="['relative  w-52 h-12 font-semibold mt-2 rounded-full', !isFormValid ? 'bg-gray-300' : 'bg-lime-600 ']"></div>
                            <button :disabled="!isFormValid"
                                :class="['absolute w-52 h-12 font-semibold p-2 rounded-full mb-6', !isFormValid ? 'bg-gray-200 text-white' : 'bg-lime-500 ']">Đăng
                                nhập</button>
                        </div>
                    </form>
                    <div class="max-w-[370px] mx-auto text-center">
                            <button class=" underline decoration-solid text-emerald-400" @click="openModalOTPEmail">Quên mật khẩu?</button>
                        <hr />
                        <div class="my-5 text-center">
                            <span class="mr-1">Chưa có tài khoản?</span>
                            <button>
                                <router-link to="/register" class="text-emerald-400 font-semibold underline decoration-solid">Tạo tài
                                    khoản học mới</router-link>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <SendOtpEmail :show="showmodalOTP" @update:show="showmodalOTP = $event"/>
</template>
