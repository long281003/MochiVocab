<script setup>
import store from '@/store';
import axios from 'axios';
import { ref } from 'vue';
import { computed } from 'vue';
import { onMounted } from 'vue';
import { toast } from "vue3-toastify";

const email = ref('')
const props = defineProps(['show',])
const emit = defineEmits(['update:show'])
const showModalOTPVerify = ref(false)

const closeModal = () => {
    emit('update:show', false)
}

const handlerSendOTP = async () => {
    try {
        const response = await store.dispatch('SendOtpEmail', {email: email.value});
        if (response.data) {
            toast.success('Gửi otp thành công')
            showModalOTPVerify.value = true; // Mở modal xác thực OTP
        }
        
    } catch (error) {
        toast.error('Gửi OTP thất bại. Vui lòng thử lại.');
        console.error(error);
    }
};
</script>

<template>
    <div class="flex justify-center items-center">
        <div v-show="props.show"
            class="fixed d-login inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50">
            <div class="relative max-w-2xl bg-white rounded-md shadow-xl ">
                <div class="w-[450px]">
                    <button @click="closeModal"
                        class="flex mt-1 mr-1 text-gray-400 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto ">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </button>
                    <div class="text-center">
                        <h1 class="text-2xl font-semibold">Nhập Email</h1>
                    </div>
                    <form @submit.prevent="handlerSendOTP" class="max-w-[370px] mx-auto mt-5">
                        <div>
                            <input type="email" placeholder="email@gmail.com" v-model="email"
                                class="w-full border border-gray-300 text-gray-900 text-sm mb-4 rounded-lg p-3.5" />
                        </div>
                        <div>
                            <button class="bg-emerald-400 w-full font-semibold p-2 rounded-full mb-6">Xác nhận</button>
                        </div>
                        <hr />
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
 .d-login {
     z-index: 999;
 }
</style>