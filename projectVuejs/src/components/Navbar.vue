<script setup>
import { computed, onMounted, ref } from 'vue';
import Account from '../components/Account.vue'
import HeaderView from '../components/HeaderView.vue'
import Achievements from '@/views/Achievements.vue';
import store from '@/store';
import router from '@/router';

const isMenuOpen = ref(false)
const showAchie = ref(false)
const showModal = ref(false)

const user = computed(() => store.getters.getMember)

onMounted( async () => {    
    await store.dispatch('fetchMember')
})
const token = sessionStorage.getItem("authtoken");

const openModal = () => {
    showModal.value = true
    isMenuOpen.value = false
}

const openAchie = () => {
   router.push('/admin')
}


const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value
}
</script>

<template>
    <div class="grid min-h-[60px] w-full start-0">
        <div class="max-h-[768px]">
            <nav
                class="fixed top-0 z-10 block w-full px-4 py-2 bg-white border rounded-none shadow-md border-white/80 lg:px-8 lg:py-2">
                <div class="flex items-center justify-between text-blue-gray-900">
                    <router-link to="/">
                        <img src="../assets/VocabLogo.webp" width="200" />
                    </router-link>
                    <HeaderView class="2xl:block xl:block lg:hidden md:hidden sm:hidden " />
                    <div class="relative">
                        <div class="flex items-center gap-4 font-bold text-yellow-300">
                            <div class="text-2xl 2xl:block xl:block lg:hidden md:hidden sm:hidden"> {{ token ? 'Hi ' + user.fullName : "HI GUSET" }}</div>
                            <div @click="toggleMenu"
                                class="border-2 mr-2 cursor-pointer border-lime-500 w-13 rounded-full">
                                <img src="../assets/user_avatar.webp" width="50" />
                            </div>
                        </div>
                        <div v-if="isMenuOpen" class="absolute bg-white mt-5 p-4 mr-6 right-0 w-[260px] rounded-md">
                            <button @click="openAchie" v-if="user.role === 'ROLE_ADMIN'"
                                class="border-2 border-orange-300 hover:bg-orange-100 p-4 text-center w-56 mb-4 rounded-xl cursor-pointer">
                                <div class="relative">
                                    <img src="../assets/cup.webp" class="absolute" width="30" />
                                    <p class="ml-9 text-orange-300 font-semibold text-lg">Trang quản trị</p>
                                </div>
                            </button>
                            <button @click="openModal" 
                                class="border-2 border-orange-300 hover:bg-orange-100 p-4 text-center w-56 mb-4 rounded-xl cursor-pointer">
                                <div class="relative">
                                    <img src="../assets/setting.webp" class="absolute" width="30" />
                                    <p class="ml-9 text-orange-300 font-semibold text-lg">Cài đặt tài khoản</p>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    </div>
    <Account :show="showModal" @update:show="showModal = $event" />
    <Achievements :show="showAchie" @update:show="showAchie = $event"/>
</template>
<style>
@media (min-width:320px) {
    /* smartphones, iPhone, portrait 480x320 phones */
}

@media (min-width:481px) {
    /* portrait e-readers (Nook/Kindle), smaller tablets @ 600 or @ 640 wide. */
}

@media (min-width:641px) {
    /* portrait tablets, portrait iPad, landscape e-readers, landscape 800x480 or 854x480 phones */
}

@media (min-width:961px) {
    /* tablet, landscape iPad, lo-res laptops ands desktops */
}

@media (min-width:1025px) {
    /* big landscape tablets, laptops, and desktops */
}

@media (min-width:1281px) {
    /* hi-res laptops and desktops */
}
</style>