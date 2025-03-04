<script setup>
import ModalChangPassword from '@/Modals/ModalChangPassword.vue';
import ModalMemberShip from '@/Modals/ModalMemberShip.vue';
import router from '@/router';
import store from '@/store';
import { ref } from 'vue';
import { computed, onMounted } from 'vue';
import { toast } from 'vue3-toastify';

const showModalChangePassword = ref(false)
const showModalMemberShip = ref(false)
const props = defineProps(['show'])
const emit = defineEmits(['update:show'])
const token = sessionStorage.getItem("authtoken");
const members = computed(() => store.getters.getMember)

const closeModal = () => {
    emit('update:show', false)
}

const handleOpen = () => {
    showModalChangePassword.value = true
}

const OpenMemberShip = () => {
    showModalMemberShip.value = true
}


const formattedDate = (dateString) => {
    if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('vi-VN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });
}

const formattedCreatedAt = computed(() => formattedDate(members.value.createdAt))
const formattedSubscriptionEndDate = computed(() => formattedDate(members.value.subscriptionEndDate))
const planTranslations = {
        '6_months': '6 tháng',
        '1_year': '1 năm',
        '3_years': '3 năm',
    };

const logout = async () => {
    // await store.dispatch('logoutMember')
    sessionStorage.removeItem('authtoken')
    toast.success("Đăng xuất thành công")
    router.push('/')
    window.location.reload()

}

onMounted(async () => {
    await store.dispatch("fetchMember")
})
</script>

<template>
    <div v-if="props.show" 
        class="fixed z-10 inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50">
        <div class="max-w-[800px] bg-white rounded-md shadow-xl">
            <div class="relative bg-amber-400 text-center font-semibold rounded-b-2xl p-5 text-2xl mt-5">
                <img src="../assets/close.png" width="45" class="absolute cursor-pointer" @click="closeModal" />
                <p class="text-center ">Cài đặt tài sản</p>
            </div>
            <div v-if="token" class="flex justify-center my-10">
                <div class="w-[780px] px-24">
                    <div class="flex justify-center items-center">
                        <div class="w-[230px]" >
                            <div class="border-4 cursor-pointer border-lime-400 w-48  rounded-full">
                                <img src="../assets/profile_user_avatar.webp" width="190" />
                            </div>
                            <p
                                class="relative font-semibold text-white bottom-10 right-4 bg-lime-400 w-56 text-center text-xl p-1.5 rounded-2xl">
                                Free
                                account</p>
                        </div>
                        <div>
                            <p class="text-2xl font-semibold ">{{ members.fullName }}</p>
                            <div class="flex gap-1 my-2">
                                    <img src="../assets/icon_email.svg"/>
                                    <span class="text-lg font-semibold">Email: </span>
                                    <span class="text-lg">{{ members.email }}</span>
                            </div>
                            <div class="flex gap-1">
                                <img src="../assets/icon_calendar.svg"/>
                                <span class="text-lg font-semibold">Ngày kích hoạt:</span>
                                <span class="text-lg"> {{ formattedCreatedAt }}</span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div class="relative bg-gray-200 p-7 rounded-xl w-full">
                            <img src="../assets/box.png" width="40" class="absolute " />
                            <p class="ml-20 text-xl">Gói dịch vụ: 
                                {{ members.subscriptionPlan === 'none' ? 'Chưa đăng ký' :  planTranslations[members.subscriptionPlan] || 'Chưa đăng ký' }}
                            </p>
                        </div>
                    </div>
                    <div class="py-4">
                        <div class="relative bg-gray-200 p-7 rounded-xl w-full">
                            <img src="../assets/alarm.png" width="35" class="absolute" />
                            <p class="ml-20 text-xl">Ngày hết hạn gói: {{ members.subscriptionEndDate ? formattedSubscriptionEndDate : "Không có" }}</p>
                        </div>
                    </div>
                     <div>
                        <a href="https://www.messenger.com/login.php?next=https%3A%2F%2Fwww.messenger.com%2Ft%2F424636081713156%2F%3Fmessaging_source%3Dsource%253Apages%253Amessage_shortlink%26source_id%3D1441792%26recurring_notification%3D0">
                            <div class="relative bg-gray-200 p-7 rounded-xl w-full">
                                <img src="../assets/profile_message.webp" class="absolute" />
                                <p class="ml-20 text-xl">Chat với Mochi</p>
                            </div>
                        </a>
                    </div>
                    <div class=" flex justify-center items-center mt-10">
                        <div class="">
                            <button @click="handleOpen" class="bg-lime-500 text-white font-semibold p-4 rounded-full mr-14">Đổi mật khẩu</button>
                            <button @click="OpenMemberShip" class="bg-lime-500 text-white font-semibold p-4 rounded-full">Đổi gói dịch vụ</button>
                        </div>
                    </div>
                    <div class="text-center my-5">
                        <button class="text-lg underline decoration-solid text-gray-400" @click="logout">Đăng xuất</button>
                    </div>
                </div>
            </div>
            <div v-else class="flex justify-center my-14">
                <div class="w-[750px] px-24">
                    <div class="flex justify-center">
                        <div class="">
                            <div class="border-4 cursor-pointer border-lime-400 w-48  rounded-full">
                                <img src="../assets/profile_user_avatar.webp" width="200" />
                            </div>
                            <p
                                class="relative font-semibold text-white bottom-10 right-4 bg-lime-400 w-56 text-center text-xl p-1.5 rounded-2xl">
                                Guest
                                account</p>
                        </div>
                    </div>
                    <div class="py-4">
                        <a href="https://www.facebook.com/groups/550304875794292">
                            <div class="relative bg-gray-200 p-7 rounded-xl w-full">
                                <img src="../assets/profile_facebook.webp" class="absolute" />
                                <p class="ml-20 text-xl">Tham gia group học viện</p>
                            </div>
                        </a>
                    </div>
                    <div class="py-5">
                        <a href="https://www.messenger.com/login.php?next=https%3A%2F%2Fwww.messenger.com%2Ft%2F424636081713156%2F%3Fmessaging_source%3Dsource%253Apages%253Amessage_shortlink%26source_id%3D1441792%26recurring_notification%3D0">
                            <div class="relative bg-gray-200 p-7 rounded-xl w-full">
                                <img src="../assets/profile_message.webp" class="absolute" />
                                <p class="ml-20 text-xl">Chat với Mochi</p>
                            </div>
                        </a>
                    </div>
                    
                    <router-link to="/login" class="flex my-4 justify-center">
                        <div class="relative bg-lime-600 w-60 h-12 font-semibold mt-1 rounded-full">
                        </div>
                        <button class="absolute bg-lime-500 w-60 h-12 font-semibold p-2 rounded-full mb-6">Đăng
                            nhập</button>
                    </router-link>
                    <router-link to="/register" class="flex my-4 justify-center">
                        <div class="relative bg-gray-300 w-60 h-12 font-semibold mt-1 rounded-full">
                        </div>
                        <button class="absolute bg-white w-60 h-12 font-semibold p-2 rounded-full mb-6">Tạo tài khoản
                            mới</button>
                    </router-link>
                </div>
            </div>
            
        </div>
    </div>
    <ModalChangPassword :show="showModalChangePassword" @update:show="showModalChangePassword = $event"/>
    <ModalMemberShip :show="showModalMemberShip" @update:show="showModalMemberShip = $event"/>
</template>
<style>
.dia-log{
    z-index: 10;
}
</style>