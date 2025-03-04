<script setup>
import { computed, onMounted, ref } from 'vue';
import store from '@/store';
import Account from '@/components/Account.vue';
import { useRoute } from 'vue-router';

const isMenuOpen = ref(false)
const showAchie = ref(false)
const showModal = ref(false)
const user = computed(() => store.getters.getMember)
const route = useRoute();

onMounted( async () => {
    await store.dispatch('fetchMember')
})
const token = sessionStorage.getItem("authtoken");

const openModal = () => {
    showModal.value = true
    isMenuOpen.value = false
}

const openAchie = () => {
    showAchie.value = true
    isMenuOpen.value = false
}


const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value
}


// Menu Items
const menuItems = [
  {
    label: 'Báo cáo thống kê',
    key: 'dashboard',
    img: "/src/assets/bar-chart.png",
    path: '/admin',
  },
  {
    label: 'Quản lý người dùng',
    key: 'userManagement',
    img: '/src/assets/user.png',
      path: '/admin/user',
  },
  {
    label: 'Quản lý khóa học',
    key: 'course',
    img: '/src/assets/management.png',
      path: '/admin/course',
    name: ''
  },
  {
    label: 'Quản lý chủ đề',
    key: 'topic',
    img: '/src/assets/business.png',
    path: '/admin/topic',
  },
  {
    label: 'Quản lý từ vựng',
    key: 'vocab',
    img: '/src/assets/book.png',
    path: '/admin/vocab',
  },
];

</script>

<template>
    <div class="grid min-h-[60px] w-full start-0">
        <div class="max-h-[768px]">
            <nav
                class="fixed top-0 z-10 block w-full px-4 py-2 bg-white border rounded-none border-white/80 lg:px-8 lg:py-2">
                <div class="flex items-center justify-between text-blue-gray-900">
                    <router-link to="/">
                        <img src="../assets/VocabLogo.webp" width="200" />
                    </router-link>
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
    <div class="flex">
        <div class="sidebar h-screen ">
            <ul>
                    <li v-for="item of menuItems" :key="item.key" 
                    :class="['flex items-center cursor-pointer rounded-md',route.path === item.path ? 'bg-gray-300 text-sky-400' : 'hover:bg-gray-200',]">
                        <router-link  :to="item.path"
                         class="flex justify-center items-center py-1 cursor-pointer">
                            <img :src="item.img" width="25"/>
                            <button class="menu-item active">
                            {{ item.label }}
                            </button>
                        </router-link>
                    </li>
            </ul>
        </div>
        <div class="w-[1350px] p-5">
            <router-view/>
        </div>
    </div>
   
</template>

<style>
  .sidebar {
  width: 200px;
  background-color: #fefefe;
  padding: 10px;
  font-family: Arial, sans-serif;
}

.menu-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 10px;
  cursor: pointer;
  text-align: left;
  font-size: 14px;
}

</style>