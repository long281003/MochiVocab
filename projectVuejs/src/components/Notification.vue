<script setup>
import router from '@/router';
import store from '@/store';
import { computed } from 'vue';

const isOpen = computed(() => store.getters.isAuthModalVisible)


const closeModal = () => {
    store.dispatch('closeAuthModal')
}

const handleRe = () => {
    router.push('/register')
    closeModal()
}
const handleLogin = () => {
    router.push('/login')
    closeModal()
}
</script>

<template>
    <div class="flex justify-center items-center">
        <div v-show="isOpen" class="fixed d-login inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50">
            <div class="relative max-w-2xl bg-white rounded-xl shadow-xl ">
                <div class="w-[550px]">
                    <div class="flex justify-center">
                        <img class="absolute bottom-60 " src="../assets/notice.webp" width="220"/>
                    </div>
                    <button @click="closeModal"
                        class="flex mt-1 mr-1 text-gray-400 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto ">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </button>
                    <h1 class="text-center p-3 text-xl">
                        Tạo tài khoản để lưu kết quả học
                        và kích hoạt tính năng Thời điểm vàng
                    </h1>
                    <div>
                        <div @click="handleLogin" class="flex my-4 justify-center">
                            <div class='relative  w-52 h-12 font-semibold mt-2 rounded-full bg-lime-600 '></div>
                            <button 
                                class='absolute w-52 h-12 font-semibold p-2 rounded-full mb-6 bg-lime-500 '>Đăng nhập</button>
                        </div>
                        <div @click="handleRe" class="flex my-4 justify-center">
                            <div class='relative  w-52 h-12 font-semibold mt-2 rounded-full bg-gray-300 '></div>
                            <button
                                class='absolute w-52 h-12 font-semibold p-2 rounded-full mb-6 bg-gray-200 '>Tạo tài khoản mới</button>
                        </div>
                    </div>
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